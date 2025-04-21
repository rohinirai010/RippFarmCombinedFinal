import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Filter, ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

// Import the shared components
import Footer from "../../../partials/Footer";
import { BackgroundImage } from "../../../partials/dashboard/HelperComponents";

export default function CappingDetailPage() {
  const navigate = useNavigate();
  const { activatedPackages, packages } = useSelector((state) => state.packageDetail);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate progress for each package
  const packageWithProgress = activatedPackages.map(pkg => {
    // Get package info based on type
    const packageInfo = packages[pkg.type];
    if (!packageInfo) return { ...pkg, progress: 0, color: "#34D399" };
    
    // Get capping multiplier based on package type
    let cappingMultiplier = 2; 
    if (pkg.type === "legacyVault") {
      cappingMultiplier = 3; 
    }
    
    // Get total capping amount
    const cappingAmount = pkg.amount * cappingMultiplier;
    
    // For demo purposes, created some sample earnings based on package amount
    // Use the activation date if it's valid
    let earnedAmount = 0;
    
    if (pkg.activatedAt) {
      const activationDate = new Date(pkg.activatedAt);
      // Check if activation date is valid
      if (!isNaN(activationDate.getTime())) {
        const currentDate = new Date();
        // Calculate days since activation (minimum 1 day)
        const daysSinceActivation = Math.max(
          1,
          Math.floor((currentDate - activationDate) / (1000 * 60 * 60 * 24))
        );
        
        // Calculate daily earning rate based on package type (default to 0.5% if not found)
        const dailyEarningRate = packageInfo.dailyRate ? packageInfo.dailyRate / 100 : 0.005;
        
        // Calculate earned amount based on days since activation
        earnedAmount = Math.min(
          parseFloat((pkg.amount * dailyEarningRate * daysSinceActivation).toFixed(2)),
          cappingAmount
        );
      }
    }
    
    // If earned amount is still 0 or very small, generate a demo value
    // this is just to show some progress in the UI
    if (earnedAmount < pkg.amount * 0.05) {
      // Created a demo value between 10% and 75% of capping amount
      const minProgress = pkg.amount * 0.1;
      const maxProgress = cappingAmount * 0.75;
      earnedAmount = parseFloat((minProgress + Math.random() * (maxProgress - minProgress)).toFixed(2));
    }
    
    // Ensure earned amount doesn't exceed capping amount
    earnedAmount = Math.min(earnedAmount, cappingAmount);
    
    // Calculate progress percentage
    const progress = Math.round((earnedAmount / cappingAmount) * 100);
    
    // Determine color based on progress
    let color = "#34D399"; // green by default
    
    if (progress > 80) {
      color = "#EF4444"; // red for > 80%
    } else if (progress > 50) {
      color = "#F59E0B"; // yellow for 51-80%
    }
    
    return {
      ...pkg,
      progress,
      color,
      earnedAmount,
      cappingAmount,
      status: progress >= 100 ? "completed" : "active"
    };
  });
  
  // Filter packages based on status and search term
  const filteredPackages = packageWithProgress.filter(pkg => {
    const matchesStatus = filterStatus === "all" || pkg.status === filterStatus;
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pkg.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-xl mx-auto flex flex-col h-screen bg-gradient-to-b from-[#1d1e35] via-[#1d1e35] to-[#7789e5] text-white overflow-y-auto relative">
      {/* Background elements */}
      <BackgroundImage />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-4 pt-6 mb-4 relative z-10"
      >
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="mr-3 bg-white/10 rounded-full p-2"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Earnings Capping Overview</h1>
        </div>
      </motion.div>
      
      {/* Informational banner */}
      <div className="px-4 mb-4 relative z-10">
        <div className="bg-blue-100/20 backdrop-blur-sm rounded-lg p-3 flex items-start">
          <div className="mr-2 mt-1">
            <span role="img" aria-label="note">📝</span>
          </div>
          <p className="text-sm text-white/90">
            Once you reach your earning cap, the system will automatically ensure further payouts. Stay ahead by topping up early.
          </p>
        </div>
      </div>
      
      {/* Search and filter */}
      <div className="px-4 mb-4 flex space-x-2 relative z-10">
       
        
        <button 
          onClick={() => setFilterOpen(!filterOpen)}
          className="bg-white/10 rounded-lg px-3 py-2 flex items-center"
        >
          <Filter size={18} className="mr-1" />
          <span>Filter</span>
          <ChevronDown size={16} className="ml-1" />
        </button>
      </div>
      
      {/* Filter dropdown */}
      {filterOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 mb-4 relative z-10"
        >
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <div className="flex-1 bg-white/10 rounded-lg flex items-center px-3">
          <Search size={18} className="text-white/60 mr-2" />
          <input
            type="text"
            placeholder="Search packages"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none text-white w-full py-2 focus:outline-none"
          />
        </div>
            <p className="mb-2 font-medium">Status</p>
            <div className="flex space-x-2">
              <button 
                onClick={() => setFilterStatus("all")}
                className={`px-3 py-1 rounded-full ${filterStatus === "all" ? "bg-blue-500" : "bg-white/10"}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilterStatus("active")}
                className={`px-3 py-1 rounded-full ${filterStatus === "active" ? "bg-blue-500" : "bg-white/10"}`}
              >
                Active
              </button>
              <button 
                onClick={() => setFilterStatus("completed")}
                className={`px-3 py-1 rounded-full ${filterStatus === "completed" ? "bg-blue-500" : "bg-white/10"}`}
              >
                Completed
              </button>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Total Package Counter */}
      <div className="px-4 mb-2 relative z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Total Package: {filteredPackages.length}</h2>
          <div className="flex items-center">
            {/* You can add sorting options here if needed */}
          </div>
        </div>
      </div>
      
      {/* No packages state */}
      {filteredPackages.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8">
          <Lock size={48} className="text-white/60 mb-4" />
          <p className="text-xl font-medium">No packages found</p>
          <p className="text-white/60 text-center mt-2">
            {activatedPackages.length === 0 
              ? "Activate a package to view capping details" 
              : "No packages match your filter criteria"}
          </p>
        </div>
      )}
      
      {/* Package cards - vertical list */}
      <div className="px-4 mb-4 relative z-10">
        {filteredPackages.map((pkg, index) => (
          <motion.div
            key={`${pkg.type}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4 rounded-3xl bg-gradient-to-br from-[#9eb7f3] via-[#2c3595] to-[#171f7d] p-4"
          >
            {/* Package header */}
            <div className="mb-3">
              <h2 className="text-white text-xl font-bold">
                Package: ${pkg.amount}
              </h2>
              <p className="text-white/80 text-xs">
                {pkg.name} | Activated: {new Date(pkg.activatedAt).toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="w-full sm:w-2/3">
                {/* Capping limit */}
                <div className="flex items-center mb-2">
                  <FaLock className="text-yellow-600 mr-2" size={16} />
                  <p className="text-white text-sm">
                    Capping Limit ({pkg.type === "legacyVault" ? "3X" : "2X"}): ${pkg.cappingAmount.toLocaleString()}
                  </p>
                </div>
                
                {/* Earned amount */}
                <div className="flex items-center mb-3">
                  <span className="text-white text-sm mr-2">📝</span>
                  <p className="text-white text-sm">
                    Earned So Far: ${pkg.earnedAmount.toLocaleString()}
                  </p>
                </div>
              </div>
              
              {/* Circular progress - using the same style as in CappingOverviewCarousel */}
              <div className="w-full sm:w-1/3 flex flex-col items-center">
                <p className="text-white text-sm font-medium mb-1">Earnings Progress:</p>
                
                <div className="relative h-20 w-20">
                  {/* SVG for circular progress */}
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle cx="50" cy="50" r="45" fill="#000" fillOpacity="0.3" />
                    
                    {/* Progress circle with stroke-dasharray */}
                    {pkg.progress > 0 && (
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke={pkg.color}
                        strokeWidth="8"
                        strokeDasharray={`${pkg.progress * 2.51} 251`}
                        strokeDashoffset="62.75"
                        transform="rotate(-90 50 50)"
                        className={pkg.progress > 80 ? "animate-pulse" : ""}
                      />
                    )}
                    
                    {/* Center text */}
                    <text
                      x="50"
                      y="50"
                      textAnchor="middle"
                      dy=".3em"
                      fill="white"
                      fontSize="24"
                      fontWeight="bold"
                    >
                      {pkg.progress}%
                    </text>
                  </svg>
                </div>
                
                <p className="text-white text-xs mt-1">
                  ${pkg.earnedAmount.toLocaleString()} / ${pkg.cappingAmount.toLocaleString()} Earned
                </p>
              </div>
            </div>
            
            {/* For packages that are nearing completion, show upgrade message */}
            {pkg.progress > 80 && (
              <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between">
                <p className="text-white text-sm">
                  Don't let your income stop
                </p>
                <button className="bg-yellow-500 text-black text-xs font-medium rounded-full px-3 py-1">
                  Upgrade Package
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Spacer for footer */}
      <div className="h-24"></div>
      
      {/* Footer */}
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Footer activeTab="package" />
      </motion.div>
    </div>
  );
}