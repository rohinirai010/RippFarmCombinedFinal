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
import headerLogo from "../../../images/sidebarLogoCollapsed.png"
import {DatePicker, Dropdown, SearchInput, DataTable } from "../../../partials/account/ReportsReusableComponents"

// Background effect
const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {/* Dynamic grid patterns */}
    <div className="absolute inset-0 opacity-5">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.3"/>
          </pattern>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="url(#smallGrid)"/>
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.5"/>
          </pattern>
          <radialGradient id="sphereGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <circle cx="20%" cy="80%" r="100" fill="url(#sphereGradient)" />
        <circle cx="85%" cy="20%" r="120" fill="url(#sphereGradient)" />
      </svg>
    </div>
    
    {/* Animated data streams */}
    {[...Array(5)].map((_, i) => (
      <div key={i} className={`absolute h-full w-0.5 opacity-10 left-${Math.floor(Math.random() * 100)}%`}>
        <motion.div 
          className="w-full h-20 bg-gradient-to-b from-transparent via-blue-500 to-transparent"
          animate={{ y: [-100, 1000] }}
          transition={{ 
            duration: 5 + Math.random() * 7, 
            repeat: Infinity, 
            repeatType: "loop", 
            ease: "linear", 
            delay: Math.random() * 5 
          }}
        />
      </div>
    ))}
    
    {/* Animated particles */}
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-blue-400"
        initial={{ 
          x: Math.random() * 100 + '%', 
          y: Math.random() * 100 + '%', 
          opacity: 0.2 + Math.random() * 0.3 
        }}
        animate={{ 
          x: Math.random() * 100 + '%', 
          y: Math.random() * 100 + '%',
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 10 + Math.random() * 20, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
    ))}
    
    {/* Glowing orbs */}
    <motion.div 
      className="absolute bottom-20 right-8 w-32 h-32 rounded-full bg-gradient-to-br from-blue-700/10 to-purple-700/5 blur-xl"
      animate={{ 
        scale: [1, 1.2, 1], 
        opacity: [0.1, 0.2, 0.1]
      }}
      transition={{ duration: 8, repeat: Infinity }}
    />
    
    <motion.div 
      className="absolute top-40 left-5 w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500/10 to-cyan-500/5 blur-xl"
      animate={{ 
        scale: [1, 1.15, 1], 
        opacity: [0.1, 0.15, 0.1]
      }}
      transition={{ duration: 6, repeat: Infinity, delay: 2 }}
    />
  </div>
);

// Bot Profit Report Page Component
const BotProfitPage = () => {
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
  
  // Summary data state
  const [summaryData, setSummaryData] = useState({
    totalProfit: 0,
    averageDaily: 0,
    percentChange: 0
  });
  
  //  Mock data
  const [allData, setAllData] = useState([
    { id: 1, date: '2025-04-11 00:30:02', particulars: 'Daily Bot Profit', amount: 6.75, status: 'Active' },
    { id: 2, date: '2025-04-11 00:30:02', particulars: 'Daily Bot Profit', amount: 25.00, status: 'Active' },
    { id: 3, date: '2025-04-10 00:30:02', particulars: 'Daily Bot Profit', amount: 6.75, status: 'Active' },
    { id: 4, date: '2025-04-10 00:30:02', particulars: 'Daily Bot Profit', amount: 25.00, status: 'Active' },
    { id: 5, date: '2025-04-09 00:30:03', particulars: 'Daily Bot Profit', amount: 6.75, status: 'Active' },
    { id: 6, date: '2025-04-09 00:30:03', particulars: 'Daily Bot Profit', amount: 25.00, status: 'Active' },
    { id: 7, date: '2025-04-08 00:30:02', particulars: 'Daily Bot Profit', amount: 6.75, status: 'Active' },
    { id: 8, date: '2025-04-08 00:30:02', particulars: 'Daily Bot Profit', amount: 25.00, status: 'Active' },
    { id: 9, date: '2025-04-07 00:30:02', particulars: 'Daily Bot Profit', amount: 6.75, status: 'Active' },
    { id: 10, date: '2025-04-07 00:30:02', particulars: 'Daily Bot Profit', amount: 25.00, status: 'Active' },
    { id: 11, date: '2025-04-06 00:30:02', particulars: 'Daily Bot Profit', amount: 6.75, status: 'Active' },
    { id: 12, date: '2025-04-06 00:30:02', particulars: 'Daily Bot Profit', amount: 25.00, status: 'Active' },
    { id: 13, date: '2025-04-05 00:30:02', particulars: 'Daily Bot Profit', amount: 6.75, status: 'Active' },
    { id: 14, date: '2025-04-05 00:30:02', particulars: 'Daily Bot Profit', amount: 25.00, status: 'Active' },
    { id: 15, date: '2025-04-04 00:30:03', particulars: 'Daily Bot Profit', amount: 6.75, status: 'Active' },
  ]);
  
  // State for filtered and displayed data
  const [displayData, setDisplayData] = useState([]);
  
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
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Calculate summary data from filtered data
  const calculateSummaryData = (filteredData) => {
    // Get current date for calculations
    const today = new Date();
    
    // Calculate total profit from all data
    const totalProfit = filteredData.reduce((sum, item) => sum + item.amount, 0);
    
    // Group profits by date for daily average calculation
    const profitsByDate = {};
    filteredData.forEach(item => {
      const dateOnly = item.date.split(' ')[0]; // Extract only the date part
      profitsByDate[dateOnly] = (profitsByDate[dateOnly] || 0) + item.amount;
    });
    
    // Calculate average daily profit
    const uniqueDates = Object.keys(profitsByDate);
    const averageDaily = uniqueDates.length > 0 
      ? totalProfit / uniqueDates.length 
      : 0;
    
    // Calculate percent change from previous month (mock calculation)
    // In a real app, you'd compare with actual previous month data
    // Here we're simulating a 5.2% increase
    const percentChange = 5.2;
    
    setSummaryData({
      totalProfit,
      averageDaily,
      percentChange
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
          item.status.toLowerCase().includes(query) ||
          item.date.toLowerCase().includes(query) ||
          item.amount.toString().includes(query)
        );
      });
    }
    
    // Calculate summary data based on filtered data
    calculateSummaryData(filteredData);
    
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
  
  // Initial data load
  useEffect(() => {
    filterAndSortData();
  }, []);
  
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
            <h1 className="text-lg font-bold text-blue-100">BOT Profit Summary</h1>
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
            className="bg-[#1d1e35]/90 backdrop-blur-md border-y border-blue-500/10  shadow-lg relative z-10"
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
            <div className="text-xs sm:text-sm text-gray-400 mb-1">Total Profits</div>
            <div className="text-base sm:text-xl font-bold text-green-400">{summaryData.totalProfit.toFixed(2)} USDT</div>
            <div className="text-[11px] sm:text-xs text-blue-300 mt-1">Last 30 days</div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-[#1d1e35] to-[#141529] p-2 sm:p-4 rounded-xl shadow-lg border border-blue-500/20"
            whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(59,130,246,0.2)" }}
          >
            <div className="text-xs sm:text-sm text-gray-400 mb-1">Average Daily</div>
            <div className="text-base sm:text-xl font-bold text-blue-400">{summaryData.averageDaily.toFixed(2)} USDT</div>
            <div className="text-[11px] sm:text-xs text-blue-300 mt-1">
              {summaryData.percentChange > 0 ? '+' : ''}{summaryData.percentChange.toFixed(1)}% from last month
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
        />
      </div>
      
      {/* Footer */}
      <div className="relative z-20">
        <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </motion.div>
  );
};

export default BotProfitPage;