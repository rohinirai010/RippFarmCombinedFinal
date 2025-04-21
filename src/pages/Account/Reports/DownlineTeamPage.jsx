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
import {DatePicker, Dropdown, SearchInput, DataTable } from "../../../partials/account/ReportsReusableComponents";

// Background effect component 
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

// Downline Team Page Component
const DownlineTeamPage = () => {
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
  const [totalPages, setTotalPages] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'sr_no', direction: 'asc' });

  // State for team stats (now calculated dynamically)
  const [teamStats, setTeamStats] = useState({
    totalTeam: 0,
    totalActive: 0,
    totalInactive: 0
  });
  
  // Mock data 
  const [allData, setAllData] = useState([
    { 
      sr_no: 1, 
      member_id: 'mtxone', 
      member_name: 'mTxeRlzp7IS0Grt8BC4', 
      package_amount: 200, 
      activation_status: 'Active', 
      level: 'Level 1', 
      date_of_activation: '2024-07-10 17:53:01',
      date_of_joining: '2024-06-25 10:33:41'
    },
    { 
      sr_no: 2, 
      member_id: 'MTXTWO', 
      member_name: 'mTxNv5jX86MmU3hwsZF', 
      package_amount: 200, 
      activation_status: 'Active', 
      level: 'Level 1', 
      date_of_activation: '2024-07-10 18:51:50',
      date_of_joining: '2024-06-25 10:36:36'
    },
    { 
      sr_no: 3, 
      member_id: 'MTXthree', 
      member_name: 'mTxl3LkPiEvWRJhoGDj', 
      package_amount: 100, 
      activation_status: 'Active', 
      level: 'Level 1', 
      date_of_activation: '2024-06-25 11:16:25',
      date_of_joining: '2024-06-25 10:38:49'
    },
    { 
      sr_no: 4, 
      member_id: 'test1', 
      member_name: 'test test', 
      package_amount: 0, 
      activation_status: 'Inactive', 
      level: 'Level 1', 
      date_of_activation: '0000-00-00 00:00:00',
      date_of_joining: '2024-07-01 13:06:12'
    },
    { 
      sr_no: 5, 
      member_id: 'Htkgjj', 
      member_name: 'Hfhjdfj', 
      package_amount: 0, 
      activation_status: 'Inactive', 
      level: 'Level 1', 
      date_of_activation: '0000-00-00 00:00:00',
      date_of_joining: '2025-01-08 19:56:50'
    },
    { 
      sr_no: 6, 
      member_id: 'AMOL', 
      member_name: 'AMOL', 
      package_amount: 5000, 
      activation_status: 'Active', 
      level: 'Level 1', 
      date_of_activation: '2025-03-19 02:06:53',
      date_of_joining: '2025-03-19 01:17:24'
    },
    { 
      sr_no: 7, 
      member_id: 'RohiniR', 
      member_name: 'Prashnat', 
      package_amount: 0, 
      activation_status: 'Inactive', 
      level: 'Level 1', 
      date_of_activation: '0000-00-00 00:00:00',
      date_of_joining: '2025-04-09 19:56:36'
    },
    { 
      sr_no: 8, 
      member_id: 'rohini010', 
      member_name: 'Rohini Rai', 
      package_amount: 0, 
      activation_status: 'Inactive', 
      level: 'Level 1', 
      date_of_activation: '0000-00-00 00:00:00',
      date_of_joining: '2025-04-09 19:57:22'
    },
    { 
      sr_no: 9, 
      member_id: 'mtxfour', 
      member_name: 'mTx3AjkXob7GBTZs2Vy', 
      package_amount: 100, 
      activation_status: 'Active', 
      level: 'Level 2', 
      date_of_activation: '2024-06-25 11:14:58',
      date_of_joining: '2024-06-25 10:56:03'
    },
    { 
      sr_no: 10, 
      member_id: 'SKY1', 
      member_name: 'AMOL', 
      package_amount: 0, 
      activation_status: 'Inactive', 
      level: 'Level 2', 
      date_of_activation: '0000-00-00 00:00:00',
      date_of_joining: '2025-03-19 23:00:10'
    },
  ]);
  
  // State for filtered and displayed data
  const [displayData, setDisplayData] = useState([]);
  
  // Table columns configuration
  const columns = [
    { 
      key: 'sr_no', 
      header: 'SR.NO', 
      sortable: true,
      render: (value) => <span className="font-medium">{value}</span>
    },
    { 
      key: 'member_id', 
      header: 'MEMBER ID', 
      sortable: true 
    },
    { 
      key: 'member_name', 
      header: 'MEMBER NAME', 
      sortable: true 
    },
    { 
      key: 'package_amount', 
      header: 'PACKAGE AMOUNT', 
      sortable: true,
      render: (value) => <span className="font-medium">${value}</span>
    },
    { 
      key: 'activation_status', 
      header: 'ACTIVATION STATUS', 
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'level', 
      header: 'LEVEL', 
      sortable: true,
    },
    { 
      key: 'date_of_activation', 
      header: 'DATE OF ACTIVATION', 
      sortable: true,
    },
    { 
      key: 'date_of_joining', 
      header: 'DATE OF JOINING', 
      sortable: true,
    },
  ];
  
  // Calculate summary stats based on data
  const calculateTeamStats = (data) => {
    const totalTeam = data.length;
    const totalActive = data.filter(item => item.activation_status === 'Active').length;
    const totalInactive = data.filter(item => item.activation_status === 'Inactive').length;
    
    setTeamStats({
      totalTeam,
      totalActive,
      totalInactive
    });
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
    
    // Filter by date range (for activation date)
    if (startDate) {
      filteredData = filteredData.filter(item => {
        return new Date(item.date_of_activation) >= new Date(startDate);
      });
    }
    
    if (endDate) {
      filteredData = filteredData.filter(item => {
        return new Date(item.date_of_activation) <= new Date(endDate + " 23:59:59");
      });
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.filter(item => {
        return (
          item.member_id.toLowerCase().includes(query) ||
          item.member_name.toLowerCase().includes(query) ||
          item.activation_status.toLowerCase().includes(query) ||
          item.level.toLowerCase().includes(query) ||
          item.package_amount.toString().includes(query)
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
    
    // Calculate summary stats based on filtered data
    calculateTeamStats(filteredData);
    
    // Calculate total pages
    const numPages = Math.ceil(filteredData.length / parseInt(pageSize));
    setTotalPages(numPages > 0 ? numPages : 1);
    
    // Check if current page is still valid
    if (currentPage > numPages && numPages > 0) {
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
    setSortConfig({ key: 'sr_no', direction: 'asc' });
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
            <h1 className="text-lg font-bold text-blue-100">Downline Summary</h1>
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

      {/* Summary Cards  */}
      <div className="grid grid-cols-3 gap-2 mt-4 px-4">
        <motion.div 
          className="bg-gradient-to-b from-[#1d1e35]/90 to-[#141529] p-4 rounded-xl border border-blue-500/10 flex flex-col items-center justify-center"
          whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(59,130,246,0.1)" }}
        >
          <div className="text-2xl font-bold text-white">{teamStats.totalTeam}</div>
          <div className="text-xs text-gray-400 mt-1">Total Team</div>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-b from-[#1d1e35]/90 to-[#141529] p-4 rounded-xl border border-blue-500/10 flex flex-col items-center justify-center"
          whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(59,130,246,0.1)" }}
        >
          <div className="text-2xl font-bold text-green-400">{teamStats.totalActive}</div>
          <div className="text-xs text-green-400 mt-1">Total Active</div>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-b from-[#1d1e35]/90 to-[#141529] p-4 rounded-xl border border-blue-500/10 flex flex-col items-center justify-center"
          whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(59,130,246,0.1)" }}
        >
          <div className="text-2xl font-bold text-red-400">{teamStats.totalInactive}</div>
          <div className="text-xs text-red-400 mt-1">Total Inactive</div>
        </motion.div>
      </div>

      <div className="flex flex-row justify-between mt-4 px-4">
        {/* Current Filter Display */}
        <div className="py-2 flex flex-wrap items-center gap-2 text-xs text-gray-400">
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
      <div className="flex-grow p-4 space-y-4 overflow-x-auto pb-24 z-10">
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

export default DownlineTeamPage;