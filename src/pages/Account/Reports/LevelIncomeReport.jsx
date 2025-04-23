import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoFilterOutline,
  IoChevronBack,
  IoRefreshOutline
} from 'react-icons/io5';

import Footer from '../../../partials/Footer';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import headerLogo from "../../../images/sidebarLogoCollapsed.png";
import {DatePicker, Dropdown, SearchInput, DataTable, BackgroundEffect, exportData as exportDataUtil, } from "../../../partials/account/ReportsReusableComponents";


// Level Income Page Component
const LevelIncomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  
  // State for filters
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pageSize, setPageSize] = useState('5');
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  
  // State for table data
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  
  // Mock data for the table - matching the column structure in the image
  const [allData, setAllData] = useState([
    { id: 1, date: '2025-04-11 00:45:13', particulars: 'Level 1 Income from user392', amount: 15.50, status: 'Active' },
    { id: 2, date: '2025-04-11 00:15:22', particulars: 'Level 2 Income from user219', amount: 7.75, status: 'Active' },
    { id: 3, date: '2025-04-10 12:30:45', particulars: 'Level 1 Income from user522', amount: 15.50, status: 'Active' },
    { id: 4, date: '2025-04-10 10:22:11', particulars: 'Level 3 Income from user418', amount: 3.88, status: 'Active' },
    { id: 5, date: '2025-04-09 22:16:38', particulars: 'Level 1 Income from user651', amount: 15.50, status: 'Active' },
    { id: 6, date: '2025-04-09 18:45:09', particulars: 'Level 2 Income from user109', amount: 7.75, status: 'Active' },
    { id: 7, date: '2025-04-08 23:11:27', particulars: 'Level 1 Income from user342', amount: 15.50, status: 'Active' },
    { id: 8, date: '2025-04-08 14:36:42', particulars: 'Level 2 Income from user587', amount: 7.75, status: 'Active' },
    { id: 9, date: '2025-04-07 21:22:18', particulars: 'Level 3 Income from user204', amount: 3.88, status: 'Active' },
    { id: 10, date: '2025-04-07 17:09:35', particulars: 'Level 1 Income from user763', amount: 15.50, status: 'Active' },
    { id: 11, date: '2025-04-06 22:47:03', particulars: 'Level 2 Income from user125', amount: 7.75, status: 'Active' },
    { id: 12, date: '2025-04-06 19:31:19', particulars: 'Level 1 Income from user429', amount: 15.50, status: 'Active' },
    { id: 13, date: '2025-04-05 23:55:39', particulars: 'Level 3 Income from user612', amount: 3.88, status: 'Active' },
    { id: 14, date: '2025-04-05 16:14:25', particulars: 'Level 1 Income from user298', amount: 15.50, status: 'Active' },
    { id: 15, date: '2025-04-04 20:37:11', particulars: 'Level 2 Income from user533', amount: 7.75, status: 'Active' },
    { id: 16, date: '2025-04-04 14:22:33', particulars: 'Level 1 Income from user171', amount: 15.50, status: 'Active' },
    { id: 17, date: '2025-04-03 22:18:47', particulars: 'Level 3 Income from user845', amount: 3.88, status: 'Active' },
    { id: 18, date: '2025-04-03 17:35:09', particulars: 'Level 2 Income from user267', amount: 7.75, status: 'Active' },
    { id: 19, date: '2025-04-02 23:42:28', particulars: 'Level 1 Income from user519', amount: 15.50, status: 'Active' },
  ]);
  
  // State for filtered and displayed data
  const [displayData, setDisplayData] = useState([]);
  
  // Table columns configuration - matching the image
  const columns = [
    { 
      key: 'id', 
      header: 'SR.NO', 
      sortable: true,
      render: (value) => <span className="font-medium">{value}</span>
    },
    { 
      key: 'date', 
      header: 'DATE & TIME', 
      sortable: true 
    },
    { 
      key: 'particulars', 
      header: 'PARTICULARS', 
      sortable: true 
    },
    { 
      key: 'amount', 
      header: 'AMOUNT', 
      sortable: true,
      render: (value) => <span className="font-medium text-green-400">{value.toFixed(2)}</span>
    },
    { 
      key: 'status', 
      header: 'STATUS', 
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
  ];
  
  // Filter options for level
  const extractLevelFromParticulars = (particulars) => {
    if (particulars.includes('Level 1')) return 'Level 1';
    if (particulars.includes('Level 2')) return 'Level 2';
    if (particulars.includes('Level 3')) return 'Level 3';
    return 'Unknown';
  };
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Filter and sort data function
  const filterAndSortData = () => {
    setLoading(true);
    
    // Apply filters
    let filteredData = [...allData];
    
    // Filter by date range
    if (startDate) {
      filteredData = filteredData.filter(item => {
        return new Date(item.date) >= new Date(startDate);
      });
    }
    
    if (endDate) {
      filteredData = filteredData.filter(item => {
        return new Date(item.date) <= new Date(endDate + " 23:59:59");
      });
    }
    
    // Filter by level
    if (levelFilter !== 'All') {
      filteredData = filteredData.filter(item => item.particulars.includes(levelFilter));
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.filter(item => {
        return (
          item.particulars.toLowerCase().includes(query) ||
          item.status.toLowerCase().includes(query) ||
          item.date.toLowerCase().includes(query) ||
          item.amount.toString().includes(query)
        );
      });
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    // Calculate total pages
    const numPages = Math.ceil(filteredData.length / parseInt(pageSize));
    setTotalPages(numPages > 0 ? numPages : 1);
    
    // Check if current page is still valid
    if (currentPage > numPages) {
      setCurrentPage(1);
    }
    
    // Apply pagination
    const startIndex = (currentPage - 1) * parseInt(pageSize);
    const paginatedData = filteredData.slice(startIndex, startIndex + parseInt(pageSize));
    
    setDisplayData(paginatedData);
    setLoading(false);
  };
  
  // Handle sort column click
  const handleSortChange = (key) => {
    setSortConfig(prevConfig => {
      if (prevConfig.key === key) {
        return { key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };
  
  // Handle filter application
  const applyFilters = () => {
    setIsFilterOpen(false);
    filterAndSortData();
  };
  
  // Handle filter reset
  const resetFilters = () => {
    setStartDate('');
    setEndDate('');
    setSearchQuery('');
    setLevelFilter('All');
    setPageSize('10');
    setCurrentPage(1);
    setSortConfig({ key: 'date', direction: 'desc' });
    setIsFilterOpen(false);
  };
  
  // Calculate totals for summary cards
  const calculateLevelSummary = () => {
    const summary = {
      level1: { total: 0, count: 0 },
      level2: { total: 0, count: 0 },
      level3: { total: 0, count: 0 }
    };
    
    allData.forEach(item => {
      if (item.particulars.includes('Level 1')) {
        summary.level1.total += item.amount;
        summary.level1.count += 1;
      } else if (item.particulars.includes('Level 2')) {
        summary.level2.total += item.amount;
        summary.level2.count += 1;
      } else if (item.particulars.includes('Level 3')) {
        summary.level3.total += item.amount;
        summary.level3.count += 1;
      }
    });
    
    return summary;
  };
  
  const levelSummary = calculateLevelSummary();
  
  // Update data when filters, sorting, or pagination changes
  useEffect(() => {
    filterAndSortData();
  }, [currentPage, pageSize, sortConfig]);
  
  // Initial data load
  useEffect(() => {
    filterAndSortData();
  }, []);

  // Handle export functionality
    const handleExport = (format, dataToExport) => {
      const formattedData = dataToExport.map((item) => ({
        ...item,
        date: new Date(item.date).toLocaleString(),
      }));
  
      exportDataUtil(formattedData, format, "level-income-report");
    };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col min-h-screen max-w-xl mx-auto bg-gradient-to-b from-[#0a1631] to-[#071020] text-white relative overflow-hidden"
    >
      <BackgroundEffect />
      
      {/* Header  */}
      <motion.header 
        className={`sticky top-0 bg-[#1d1e35] z-30 transition-all duration-300 ${
          isScrolled ? 'bg-opacity-95 backdrop-blur-md shadow-lg shadow-blue-900/10' : 'bg-opacity-80 backdrop-blur-sm'
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center">
            <motion.button 
              onClick={() => navigate("/user/account")} 
              className="mr-4 bg-blue-500/10 p-2 rounded-lg"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoChevronBack className="text-xl text-blue-400" />
            </motion.button>
            <h1 className="text-lg font-bold text-blue-100">Level Income Summary</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <img src={headerLogo} alt="Header Logo" className="w-8 h-8" />
            </div>
          </div>
        </div>
      </motion.header>
      
      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1d1e35]/90 backdrop-blur-md border-y border-blue-500/10 shadow-lg z-20"
          >
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-blue-300 font-medium">Filter Options</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-white"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <MdClose className="text-xl" />
                </motion.button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <DatePicker 
                  label="Minimum date" 
                  placeholder="Select start date" 
                  value={startDate}
                  onChange={setStartDate}
                />
                
                <DatePicker 
                  label="Maximum date" 
                  placeholder="Select end date" 
                  value={endDate}
                  onChange={setEndDate}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Dropdown 
                  label="Level"
                  options={['All', 'Level 1', 'Level 2', 'Level 3']}
                  value={levelFilter}
                  onChange={setLevelFilter}
                />
                
                <Dropdown 
                  label="Entries per page"
                  options={['5', '10', '25', '50']}
                  value={pageSize}
                  onChange={setPageSize}
                />
              </div>
              
              <div className="w-full">
                <SearchInput 
                  label="Search"
                  placeholder="Search particulars, status, etc..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2 sm:px-4 py-1 sm:py-2 bg-gray-700/50 text-gray-300 rounded-lg text-xs sm:text-sm flex items-center"
                  onClick={resetFilters}
                >
                  <IoRefreshOutline className="mr-1" />
                  Reset
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm flex items-center"
                  onClick={applyFilters}
                >
                  Apply Filters
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-row justify-between mt-2 pr-4">
        {/* Current Filter Display */}
        <div className="px-4 py-2 flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span>Filters:</span>
          {startDate && (
            <span className="bg-blue-900/30 rounded-full px-2 py-0.5 flex items-center">
              From: {startDate}
              <button 
                onClick={() => { setStartDate(''); filterAndSortData(); }}
                className="ml-1 text-blue-400 hover:text-blue-300"
              >
                ×
              </button>
            </span>
          )}
          {endDate && (
            <span className="bg-blue-900/30 rounded-full px-2 py-0.5 flex items-center">
              To: {endDate}
              <button 
                onClick={() => { setEndDate(''); filterAndSortData(); }}
                className="ml-1 text-blue-400 hover:text-blue-300"
              >
                ×
              </button>
            </span>
          )}
          {levelFilter !== 'All' && (
            <span className="bg-blue-900/30 rounded-full px-2 py-0.5 flex items-center">
              {levelFilter}
              <button 
                onClick={() => { setLevelFilter('All'); filterAndSortData(); }}
                className="ml-1 text-blue-400 hover:text-blue-300"
              >
                ×
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="bg-blue-900/30 rounded-full px-2 py-0.5 flex items-center">
              Search: {searchQuery}
              <button 
                onClick={() => { setSearchQuery(''); filterAndSortData(); }}
                className="ml-1 text-blue-400 hover:text-blue-300"
              >
                ×
              </button>
            </span>
          )}
          {!startDate && !endDate && !searchQuery && levelFilter === 'All' && (
            <span>None applied</span>
          )}
        </div>

        <motion.button 
          className="bg-blue-500/10 p-2 rounded-lg text-blue-400"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <IoFilterOutline className="text-xl" />
        </motion.button>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto pb-24 z-10">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div 
            className="bg-gradient-to-br from-[#1d1e35] to-[#141529] p-2 sm:p-4 rounded-xl shadow-lg border border-purple-500/20"
            whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(126,34,206,0.2)" }}
          >
            <div className="text-xs sm:text-sm text-gray-400 mb-1">Level 1</div>
            <div className="text-base sm:text-xl font-bold text-purple-400">{levelSummary.level1.total.toFixed(2)} USDT</div>
            <div className="text-[11px] sm:text-xs text-blue-300 mt-1">{levelSummary.level1.count} referrals</div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-[#1d1e35] to-[#141529] p-2 sm:p-4 rounded-xl shadow-lg border border-blue-500/20"
            whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(59,130,246,0.2)" }}
          >
            <div className="text-xs sm:text-sm text-gray-400 mb-1">Level 2</div>
            <div className="text-base sm:text-xl font-bold text-blue-400">{levelSummary.level2.total.toFixed(2)} USDT</div>
            <div className="text-[11px] sm:text-xs text-blue-300 mt-1">{levelSummary.level2.count} referrals</div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-[#1d1e35] to-[#141529] p-2 sm:p-4 rounded-xl shadow-lg border border-cyan-500/20"
            whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(34,211,238,0.2)" }}
          >
            <div className="text-xs sm:text-sm text-gray-400 mb-1">Level 3</div>
            <div className="text-base sm:text-xl font-bold text-cyan-400">{levelSummary.level3.total.toFixed(2)} USDT</div>
            <div className="text-[11px] sm:text-xs text-blue-300 mt-1">{levelSummary.level3.count} referrals</div>
          </motion.div>
        </div>
        
        {/* Data Table */}
        <DataTable 
          columns={columns}
          data={displayData}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onSortChange={handleSortChange}
          sortConfig={sortConfig}
          onExport={handleExport}
        />
      </div>
      
      {/* Footer */}
      <div className="relative z-20">
        <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </motion.div>
  );
};

export default LevelIncomePage;