import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Lock,
  Filter,
  ChevronDown,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

// Import the shared components
import Footer from "../../../partials/Footer";

export default function CappingDetailPage() {
  const navigate = useNavigate();
  const { activatedPackages, packages } = useSelector(
    (state) => state.packageDetail
  );
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Banner carousel state
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const bannerMessages = [
    {
      icon: "📝",
      message:
        "Once you reach your earning cap, the system will automatically ensure further payouts. Stay ahead by topping up early.",
    },
    {
      icon: "🔔",
      message:
        "Upgrade your package before reaching 100% to maintain continuous earnings without interruption.",
    },
    {
      icon: "💡",
      message:
        "Did you know? Legacy Vault packages have a 3X capping limit compared to the standard 2X for other packages.",
    },
  ];

  // Calculate circumference for the circle with radius 40
  const circumference = 2 * Math.PI * 40;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDirection(1);
      setCurrentBannerIndex((prevIndex) =>
        prevIndex === bannerMessages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [bannerMessages.length]);

  // Calculate progress for each package
  const packageWithProgress = activatedPackages.map((pkg) => {
    // Get package info based on type
    const packageInfo = packages[pkg.type];
    if (!packageInfo) return { ...pkg, progress: 0, color: "#34D399", earnedAmount: 0, cappingAmount: 0 };

    // Get capping multiplier based on package type
    let cappingMultiplier = packageInfo.capping || 2;
    if (pkg.type === "legacyVault") {
      cappingMultiplier = 3;
    }

    // Calculate the capping amount 
    const cappingAmount = pkg.amount * cappingMultiplier;

    // For demonstration purpose, created a past activation date
    // to ensure there's always visible progress
    const demoActivationDate = new Date();

    // for demo set the activation date 
    // This will vary based on package type to show different progress levels
    let daysAgo;

    if (pkg.type === "igniteFund") {
      daysAgo = 45; // ~45% progress for Ignite Fund
    } else if (pkg.type === "elevatePlus") {
      daysAgo = 500; // ~30% progress for Elevate Plus
    } else if (pkg.type === "legacyVault") {
      daysAgo = 380; // ~30% progress for Legacy Vault
    } else {
      // Random number of days between 30-90 for any other package types
      daysAgo = 30 + Math.floor(Math.random() * 60);
    }

    demoActivationDate.setDate(demoActivationDate.getDate() - daysAgo);

    // Get daily earning rate from package info
    const dailyEarningRate = packageInfo.dailyRate / 100;

    // Calculate earned amount
    let earnedAmount = pkg.amount * dailyEarningRate * daysAgo;

    // Ensure earned amount doesn't exceed capping amount
    earnedAmount = Math.min(earnedAmount, cappingAmount);

    // Format to 2 decimal places
    earnedAmount = parseFloat(earnedAmount.toFixed(2));

    // Calculate progress percentage
    const progress = Math.round((earnedAmount / cappingAmount) * 100);

    // Determine color based on progress
    let color = "#34D399"; // green by default

    if (progress >= 100) {
      color = "#EF4444"; // red for 100%
    } else if (progress > 80) {
      color = "#EF4444"; // red for > 80%
    } else if (progress > 50) {
      color = "#F59E0B"; // yellow for 51-80%
    }

    // For demo , format the activation date to display
    const formattedActivationDate = demoActivationDate.toISOString();

    return {
      ...pkg,
      progress,
      color,
      earnedAmount,
      cappingAmount,
      status: progress >= 100 ? "completed" : "active",
      demoActivationDate: formattedActivationDate,
    };
  });

  // Filter packages based on type and search term
  const filteredPackages = packageWithProgress.filter((pkg) => {
    const matchesStatus = filterStatus === "all" || pkg.status === filterStatus;
    const matchesType = filterType === "all" || pkg.type === filterType;
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  // package upgrade navigation
  const handleUpgradePackage = (packageType) => {
    navigate(`/user/package/${packageType}`);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col h-screen bg-gradient-to-b from-[#000621] via-[#0a0e2e] to-[#141539] text-white overflow-y-auto relative">
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
            className="mr-3 bg-white/10 rounded-full p-1 sm:p-2"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg sm:text-2xl font-bold">Earnings Capping Overview</h1>
        </div>
      </motion.div>

      {/* Informational banner carousel */}
      <div className="px-4 mb-4 relative z-10">
        <div className="bg-blue-100/10 backdrop-blur-sm rounded-lg p-1">
          <div className="flex items-center justify-between">
            <div className="h-14 flex-1 relative overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentBannerIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0 flex items-start px-1 py-1"
                >
                  <div className="mr-2 sm:mr-3 mt-1 flex-shrink-0">
                    <span role="img" aria-label="icon" className="text-sm sm:text-lg">
                      {bannerMessages[currentBannerIndex].icon}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-white/90 sm:tracking-wider">
                    {bannerMessages[currentBannerIndex].message}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        {/* Banner dots indicator */}
        <div className="flex justify-center mt-2 space-x-2">
          {bannerMessages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentBannerIndex === index ? "bg-white w-4" : "bg-white/30"
              }`}
              onClick={() => {
                setDirection(index > currentBannerIndex ? 1 : -1);
                setCurrentBannerIndex(index);
              }}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Search and filter */}
      <div className="px-4 mb-4 mt-6 flex justify-between items-center space-x-2 relative z-10">
        {/* Total Package Counter */}
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
              Total Package: {filteredPackages.length}
            </h2>
          </div>
        </div>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="bg-white/10 rounded-lg px-3 py-1 sm:py-2 flex items-center"
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
            <div className=" bg-white/10 rounded-lg flex items-center px-3 mb-4 sm:mb-5 ">
              <Search size={18} className="text-white/60 mr-2" />
              <input
                type="text"
                placeholder="Search packages"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none text-white w-full py-1 sm:py-2 focus:outline-none withdraw-input"
              />
            </div>

            <p className="mb-2 font-medium">Package Type</p>
            <div className="flex space-x-1 sm:space-x-2 flex-wrap">
              <button
                onClick={() => setFilterType("all")}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-xl sm:rounded-full mb-1 ${
                  filterType === "all" ? "bg-blue-500" : "bg-white/10"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType("igniteFund")}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-xl sm:rounded-full mb-1 ${
                  filterType === "igniteFund" ? "bg-blue-500" : "bg-white/10"
                }`}
              >
                Ignite Fund
              </button>
              <button
                onClick={() => setFilterType("elevatePlus")}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-xl sm:rounded-full mb-1 ${
                  filterType === "elevatePlus" ? "bg-blue-500" : "bg-white/10"
                }`}
              >
                Elevate Plus
              </button>
              <button
                onClick={() => setFilterType("legacyVault")}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-xl sm:rounded-full mb-1 ${
                  filterType === "legacyVault" ? "bg-blue-500" : "bg-white/10"
                }`}
              >
                Legacy Vault
              </button>
            </div>
          </div>
        </motion.div>
      )}

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

      {/* Package cards  */}
      <div className="px-4 mb-4 relative z-10">
        {filteredPackages.map((pkg, index) => (
          <motion.div
            key={`${pkg.type}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4 rounded-3xl bg-gradient-to-br from-[#9eb7f3] via-[#2c3595] to-[#171f7d] p-4"
          >
            <div className="flex flex-col sm:flex-row justify-between">
              <div className="w-full sm:w-[70%]">
                {/* Package header */}
                <div className="w-full mb-3">
                  <h2 className="text-white text-2xl sm:text-3xl font-bold">
                    Package: ${pkg.amount}
                  </h2>
                  <p className="text-white/80 text-xs sm:text-[13px]">
                    {pkg.name} | Activation Date:{" "}
                    {new Date(
                      pkg.demoActivationDate || pkg.activatedAt
                    ).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                  </p>
                </div>
                {/* Capping limit */}
                <div className="w-full flex items-center mb-2">
                  <FaLock className="mr-2 w-4 sm:w-5 h-4 sm:h-5 text-yellow-600" />
                  <p className="text-white text-base sm:text-lg">
                    Capping Limit ({pkg.type === "legacyVault" ? "3X" : "2X"}):
                    ${pkg.cappingAmount.toLocaleString()}
                  </p>
                </div>

                {/* Earned amount */}
                <div className="flex items-center mb-3">
                  <span className="text-white text-sm sm:text-base mr-2">
                    📝
                  </span>
                  <p className="text-white text-base sm:text-lg">
                    Earned So Far:{" "}
                    <span className="text-xl font-bold">
                      {" "}
                      ${pkg.earnedAmount.toLocaleString()}{" "}
                    </span>
                  </p>
                </div>
              </div>

              {/* Circular progress */}
              <div className="w-full sm:w-[40%] flex flex-col items-center mt-2 sm:mt-0">
                <p className="text-white font-medium">Earnings Progress</p>

                <div className="relative h-24 w-24">
                  {/* SVG for circular progress */}
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="#000"
                      fillOpacity="0.3"
                    />

                    {/* Progress circle with stroke-dasharray */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke={
                        pkg.progress >= 100 ? "#EF4444" : "rgba(255, 255, 255, 0.2)"
                      }
                      strokeWidth="8"
                      strokeLinecap="round"
                      className="transition-all duration-500 ease-in-out"
                    />

                    {/* Actual progress circle */}
                    {pkg.progress > 0 && (
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke={pkg.color}
                        strokeWidth="8"
                        strokeDasharray={`${
                          (pkg.progress * circumference) / 100
                        } ${circumference}`}
                        strokeDashoffset={circumference * 0.25}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                        className={`transition-all duration-700 ease-in-out ${
                          pkg.progress > 80 ? "animate-pulse" : ""
                        }`}
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
                      {pkg.progress >= 100 ? 100 : pkg.progress}%
                    </text>
                  </svg>
                </div>

                <p className="text-white text-sm mt-1">
                  ${pkg.earnedAmount.toLocaleString()} / $
                  {pkg.cappingAmount.toLocaleString()} Earned
                </p>
              </div>
            </div>

            {/* For packages that are nearing completion, show upgrade message */}
            {pkg.progress > 80 && (
              <div className="mt-2 pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                <p className="text-red-700 text-sm sm:text-base">
                 <span className="text-gray-200 text-base sm:text-lg font-medium">{user?.fullName || "User"}</span>, don't let your income stop
                </p>
                <button
                  className="bg-gray-100 text-red-700 text-xs sm:text-sm font-medium rounded-full px-6 py-2 cursor-pointer animate-pulse"
                  onClick={() => handleUpgradePackage(pkg.type)}
                >
                  Upgrade Package
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Spacer for footer */}
      <div className="mb-20"></div>

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