import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActivePackageType } from "../../ReduxStateManagement/slices/packageSlice";
import { ArrowLeft, Lock, Shield, TrendingUp, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../../partials/Footer";

// Package Card component defined within the same file 
const PackageCard = ({
  icon,
  title,
  subtitle,
  activeCount,
  totalSlots = 8,
  index,
  link,
  isDisabled
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (isDisabled) return; // Prevent click when disabled
    console.log("Navigating to:", link);
    navigate(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
      whileHover={{ scale: isDisabled ? 1 : 1.02, y: isDisabled ? 0 : -5 }}
      className={`p-1 rounded-xl relative ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={handleCardClick}
    >
      <div className={` rounded-xl relative ${isDisabled ? ' filter blur-[1px]' : ''}`}>
        {isDisabled && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/10  rounded-xl">

          </div>
        )}
        <div className="absolute inset-x-0 top-0 p-2 bg-gradient-to-b from-[#1f2984] via-[#5569c1] to-blue-300 rounded-2xl border-b-7 border-[#fdffff]">
          <div className="flex items-center mb-1">
            {icon}
            <h3 className="text-sm sm:text-lg ml-1">{title}</h3>
          </div>
          <p className="text-base sm:text-xl font-bold">{subtitle}</p>
        </div>

        <div className="pt-18 sm:pt-20 p-3 bg-[#465187] rounded-2xl">
          <p className="text-xs sm:text-sm">{activeCount} Active</p>
          <div className="flex mt-1">
            {Array.from({ length: totalSlots }).map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full mx-0.5 ${
                  i < activeCount ? "bg-green-400" : "bg-gray-300/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main component
const LivePackagePage = () => {
  const [activeTab, setActiveTab] = useState("live");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get the active package from Redux state
  const { activePackageType } = useSelector((state) => state.packageDetail);

  // Package data with level information
  const packages = [
    { 
      id: 1, 
      level: 1, // Lowest level
      icon: <Zap size={18} />, 
      title: "Ignite", 
      subtitle: "Fund", 
      activeCount: 2, 
      link: "/user/package/igniteFund",
      packageType: "igniteFund"
    },
    { 
      id: 2, 
      level: 2, // Middle level
      icon: <TrendingUp size={18} />, 
      title: "Elevate", 
      subtitle: "Plus", 
      activeCount: 4, 
      link: "/user/package/elevatePlus",
      packageType: "elevatePlus"
    },
    { 
      id: 3, 
      level: 3, // Highest level
      icon: <Shield size={18} />, 
      title: "Legacy", 
      subtitle: "Vault", 
      activeCount: 1, 
      link: "/user/package/legacyVault",
      packageType: "legacyVault"
    },
  ];

  // Get the selected package level
  const getSelectedPackageLevel = () => {
    const selectedPackage = packages.find(pkg => pkg.packageType === activePackageType);
    return selectedPackage ? selectedPackage.level : 0;
  };

  const selectedLevel = getSelectedPackageLevel();

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto bg-gradient-to-b from-[#0b104e] via-[#080c26] to-[#060e22] text-white relative">
      {/* Header */}
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft className="text-white" />
        </button>
        <h1 className="text-2xl font-semibold text-blue-300 flex-1 text-center">
          Packages
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20 px-4 sm:px-10 mt-8">
        {/* Packages */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex justify-between items-center mb-2">
            <p className="text-base text-gray-300">Our Packages</p>
          </div>
          <div className="grid grid-cols-3 sm:gap-2">
            {packages.map((pkg, index) => {
              const isDisabled = selectedLevel > pkg.level;
              
              return (
                <PackageCard
                  key={pkg.id}
                  icon={pkg.icon}
                  title={pkg.title}
                  subtitle={pkg.subtitle}
                  activeCount={pkg.activeCount}
                  index={index}
                  link={`/user/package/start/${pkg.packageType}`}
                  isDisabled={isDisabled}
                />
              );
            })}
          </div>
        </motion.div>
      </div>

      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default LivePackagePage;