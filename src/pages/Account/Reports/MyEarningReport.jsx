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
import {DatePicker, Dropdown, SearchInput, DataTable, BackgroundEffect, exportData as exportDataUtil } from "../../../partials/account/ReportsReusableComponents";


const MyEarningReportPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  
  // State for filters
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pageSize, setPageSize] = useState('5');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for table data
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  
  // Mock data 
  const [allData, setAllData] = useState([
    { id: 1, date: '2024-06-27', dailyGrowth: 0.00, levelIncome: 1.20 },
    { id: 2, date: '2024-06-28', dailyGrowth: 0.00, levelIncome: 1.20 },
    { id: 3, date: '2024-06-29', dailyGrowth: 0.00, levelIncome: 1.20 },
    { id: 4, date: '2024-06-30', dailyGrowth: 0.00, levelIncome: 1.20 },
    { id: 5, date: '2024-07-01', dailyGrowth: 0.00, levelIncome: 1.20 },
    { id: 6, date: '2024-07-02', dailyGrowth: 0.00, levelIncome: 1.20 },
    { id: 7, date: '2024-07-03', dailyGrowth: 0.00, levelIncome: 1.20 },
    { id: 8, date: '2024-07-04', dailyGrowth: 0.00, levelIncome: 1.20 },
    { id: 9, date: '2024-07-05', dailyGrowth: 0.00, levelIncome: 1.20 },
    { id: 10, date: '2024-07-06', dailyGrowth: 0.00, levelIncome: 1.20 },
    { id: 11, date: '2024-07-07', dailyGrowth: 0.00, levelIncome: 1.20 },
    { id: 12, date: '2024-07-08', dailyGrowth: 0.00, levelIncome: 1.20 },
    { id: 13, date: '2024-07-09', dailyGrowth: 0.00, levelIncome: 1.20 },
    { id: 14, date: '2024-07-10', dailyGrowth: 0.00, levelIncome: 1.20 },
    { id: 15, date: '2024-07-11', dailyGrowth: 0.00, levelIncome: 1.20 },
    { id: 16, date: '2024-07-12', dailyGrowth: 0.00, levelIncome: 2.40 },
  ]);
  
  // State for filtered and displayed data
  const [displayData, setDisplayData] = useState([]);
  
  // Calculate summary data
  const [summaryData, setSummaryData] = useState({
    totalEarnings: 0,
    averageDaily: 0,
    percentChange: 0
  });
  
  // Table columns configuration 
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
      key: 'dailyGrowth', 
      header: 'DAILY GROWTH', 
      sortable: true,
      render: (value) => <span className="font-medium text-blue-400">{value.toFixed(2)}</span>
    },
    { 
      key: 'levelIncome', 
      header: 'LEVEL INCOME', 
      sortable: true,
      render: (value) => <span className="font-medium text-green-400">{value.toFixed(2)}</span>
    }
  ];
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Calculated summary stats from filtered data
  const calculateSummaryStats = (filteredData) => {
    // Calculated total earnings (sum of dailyGrowth and levelIncome)
    const totalEarnings = filteredData.reduce((sum, item) => 
      sum + item.dailyGrowth + item.levelIncome, 0);
    
    // Calculated average daily earnings
    const averageDaily = filteredData.length > 0 ? 
      totalEarnings / filteredData.length : 0;
    
    // Calculated percent change (compare last 7 days to previous 7 days)
    let percentChange = 0;
    if (filteredData.length >= 14) {
      const last7Days = filteredData.slice(0, 7);
      const previous7Days = filteredData.slice(7, 14);
      
      const last7Sum = last7Days.reduce((sum, item) => 
        sum + item.dailyGrowth + item.levelIncome, 0);
      const previous7Sum = previous7Days.reduce((sum, item) => 
        sum + item.dailyGrowth + item.levelIncome, 0);
      
      if (previous7Sum > 0) {
        percentChange = ((last7Sum - previous7Sum) / previous7Sum) * 100;
      }
    }
    
    setSummaryData({
      totalEarnings: totalEarnings,
      averageDaily: averageDaily,
      percentChange: percentChange
    });
  };
  
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
        return new Date(item.date) <= new Date(endDate);
      });
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.filter(item => {
        return (
          item.date.toLowerCase().includes(query) ||
          item.dailyGrowth.toString().includes(query) ||
          item.levelIncome.toString().includes(query)
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
    
    // Calculate summary stats
    calculateSummaryStats(filteredData);
    
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
    setPageSize('10');
    setCurrentPage(1);
    setSortConfig({ key: 'date', direction: 'desc' });
    setIsFilterOpen(false);
  };
  
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
    
        exportDataUtil(formattedData, format, "earning-report");
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
            <h1 className="text-lg font-bold text-blue-100">My Earning Report</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <img src={headerLogo} alt="Header Logo" className="w-8 h-8" />
            </div>
          </div>
        </div>
      </motion.header>
      
      {/* Filter Panel  */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1d1e35]/90 backdrop-blur-md border-y border-blue-500/10  shadow-lg z-20"
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
                  label="Entries per page"
                  options={['5', '10', '25', '50']}
                  value={pageSize}
                  onChange={setPageSize}
                />
                
                <SearchInput 
                  label="Search"
                  placeholder="Search..."
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
          {!startDate && !endDate && !searchQuery && (
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
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div 
            className="bg-gradient-to-br from-[#1d1e35] to-[#141529] p-2 sm:p-4 rounded-xl shadow-lg border border-blue-500/20"
            whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(59,130,246,0.2)" }}
          >
            <div className="text-xs sm:text-sm text-gray-400 mb-1">Total Earnings</div>
            <div className="text-base sm:text-xl font-bold text-green-400">{summaryData.totalEarnings.toFixed(2)} USDT</div>
            <div className="text-[11px] sm:text-xs text-blue-300 mt-1">All filtered entries</div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-[#1d1e35] to-[#141529] p-2 sm:p-4 rounded-xl shadow-lg border border-blue-500/20"
            whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(59,130,246,0.2)" }}
          >
            <div className="text-xs sm:text-sm text-gray-400 mb-1">Average Daily</div>
            <div className="text-base sm:text-xl font-bold text-blue-400">{summaryData.averageDaily.toFixed(2)} USDT</div>
            <div className="text-[11px] sm:text-xs text-blue-300 mt-1">
              {summaryData.percentChange > 0 ? '+' : ''}{summaryData.percentChange.toFixed(1)}% from previous period
            </div>
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

export default MyEarningReportPage;