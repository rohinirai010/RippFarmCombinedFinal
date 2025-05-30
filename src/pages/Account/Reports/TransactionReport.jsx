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

  
// Transaction Report Page Component
const TransactionReport = () => {
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
  
  // FULL Mock data for the table - based on the image format
  const [allData, setAllData] = useState([
    { id: 1, date: '2024-06-27 00:30:04', particulars: 'Level Income', credit: 0.30, debit: 0.00, balance: 0.3 },
    { id: 2, date: '2024-06-27 00:30:04', particulars: 'Level Income', credit: 0.10, debit: 0.00, balance: 0.4 },
    { id: 3, date: '2024-06-27 00:30:04', particulars: 'Level Income', credit: 0.20, debit: 0.00, balance: 0.6 },
    { id: 4, date: '2024-06-27 00:30:04', particulars: 'Level Income', credit: 0.30, debit: 0.00, balance: 0.9 },
    { id: 5, date: '2024-06-27 00:30:04', particulars: 'Level Income', credit: 0.30, debit: 0.00, balance: 1.2 },
    { id: 6, date: '2024-06-28 00:30:03', particulars: 'Level Income', credit: 0.30, debit: 0.00, balance: 1.5 },
    { id: 7, date: '2024-06-28 00:30:03', particulars: 'Level Income', credit: 0.10, debit: 0.00, balance: 1.6 },
    { id: 8, date: '2024-06-28 00:30:03', particulars: 'Level Income', credit: 0.20, debit: 0.00, balance: 1.8 },
    { id: 9, date: '2024-06-28 00:30:03', particulars: 'Level Income', credit: 0.30, debit: 0.00, balance: 2.1 },
    { id: 10, date: '2024-06-28 00:30:03', particulars: 'Level Income', credit: 0.30, debit: 0.00, balance: 2.4 },
    { id: 11, date: '2024-06-29 00:30:02', particulars: 'Level Income', credit: 0.30, debit: 0.00, balance: 2.7 },
    { id: 12, date: '2024-06-29 00:30:02', particulars: 'Level Income', credit: 0.10, debit: 0.00, balance: 2.8 },
    { id: 13, date: '2024-06-29 00:30:02', particulars: 'Level Income', credit: 0.20, debit: 0.00, balance: 3.0 },
    { id: 14, date: '2024-06-29 00:30:02', particulars: 'Level Income', credit: 0.30, debit: 0.00, balance: 3.3 },
    { id: 15, date: '2024-06-29 00:30:02', particulars: 'Level Income', credit: 0.30, debit: 0.00, balance: 3.6 },
    { id: 16, date: '2024-06-30 00:30:02', particulars: 'Level Income', credit: 0.30, debit: 0.00, balance: 3.9 },
  ]);
  
  // State for filtered and displayed data
  const [displayData, setDisplayData] = useState([]);
  
  // State for summary calculations
  const [summaryData, setSummaryData] = useState({
    totalCredit: 0,
    netBalance: 0,
    last30DaysCredit: 0
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
      key: 'particulars', 
      header: 'PARTICULARS', 
      sortable: true 
    },
    { 
      key: 'credit', 
      header: 'CREDIT', 
      sortable: true,
      render: (value) => <span className="font-medium text-green-400">{value.toFixed(2)}</span>
    },
    { 
      key: 'debit', 
      header: 'DEBIT', 
      sortable: true,
      render: (value) => <span className="font-medium text-red-400">{value.toFixed(2)}</span>
    },
    { 
      key: 'balance', 
      header: 'BALANCE', 
      sortable: true,
      render: (value) => <span className="font-medium text-blue-300">{value.toFixed(1)}</span>
    },
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
  
  // Calculate summary data
  const calculateSummaryData = () => {
    // Calculate total credit from all transactions
    const totalCredit = allData.reduce((sum, transaction) => sum + transaction.credit, 0);
    
    // Get the net balance (should be the balance of the last transaction)
    const netBalance = allData.length > 0 ? allData[allData.length - 1].balance : 0;
    
    // Calculate credit for last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const last30DaysCredit = allData
      .filter(transaction => new Date(transaction.date) >= thirtyDaysAgo)
      .reduce((sum, transaction) => sum + transaction.credit, 0);
    
    setSummaryData({
      totalCredit,
      netBalance,
      last30DaysCredit
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
        return new Date(item.date) <= new Date(endDate + " 23:59:59");
      });
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.filter(item => {
        return (
          item.particulars.toLowerCase().includes(query) ||
          item.date.toLowerCase().includes(query) ||
          item.credit.toString().includes(query) ||
          item.debit.toString().includes(query) ||
          item.balance.toString().includes(query)
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
    setPageSize('10');
    setCurrentPage(1);
    setSortConfig({ key: 'date', direction: 'desc' });
    setIsFilterOpen(false);
  };
  
  // Update data when filters, sorting, or pagination changes
  useEffect(() => {
    filterAndSortData();
  }, [currentPage, pageSize, sortConfig]);
  
  // Calculate summary data when allData changes
  useEffect(() => {
    calculateSummaryData();
  }, [allData]);
  
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
      
          exportDataUtil(formattedData, format, "transaction-report");
        };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col min-h-screen max-w-xl mx-auto bg-gradient-to-b from-[#0a1631] to-[#071020] text-white relative overflow-hidden"
    >
      <BackgroundEffect />
      
      {/* Header with glass effect */}
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
            <h1 className="text-lg font-bold text-blue-100">All Transaction Summary</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <img src={headerLogo} alt="Header Logo" className="w-8 h-8" />
            </div>
          </div>
        </div>
      </motion.header>
      
      {/* Filter Panel - Slides down when open */}
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
        {/* Summary Cards  */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div 
            className="bg-gradient-to-br from-[#1d1e35] to-[#141529] p-2 sm:p-4 rounded-xl shadow-lg border border-blue-500/20"
            whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(59,130,246,0.2)" }}
          >
            <div className="text-xs sm:text-sm text-gray-400 mb-1">Total Credit</div>
            <div className="text-base sm:text-xl font-bold text-green-400">{summaryData.last30DaysCredit.toFixed(2)} USDT</div>
            <div className="text-[11px] sm:text-xs text-blue-300 mt-1">Last 30 days</div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-[#1d1e35] to-[#141529] p-2 sm:p-4 rounded-xl shadow-lg border border-blue-500/20"
            whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(59,130,246,0.2)" }}
          >
            <div className="text-xs sm:text-sm text-gray-400 mb-1">Net Balance</div>
            <div className="text-base sm:text-xl font-bold text-blue-400">{summaryData.netBalance.toFixed(2)} USDT</div>
            <div className="text-[11px] sm:text-xs text-blue-300 mt-1">Current balance</div>
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

export default TransactionReport;