import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineArrowForwardIos,MdKeyboardArrowDown } from "react-icons/md";


// Active Plans List Component
export const ActivePlansList = ({ activatedPackages }) => {
    const activePackages =
      activatedPackages?.filter((pkg) => pkg.status === "active") || [];
  
    if (activePackages.length === 0) {
      return null;
    }
  
    return (
      <div className=" flex flex-row items-center justify-center gap-1 bg-[#061758]/70 backdrop-blur-md rounded-full w-auto px-3 py-1.5 border border-blue-500/20">
        <h3 className="text-xs text-center sm:text-left text-blue-300 ">
          <span className="text-gray-400 text-sm ">Active Plan :</span>
        </h3>
        <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
          {activePackages.map((pkg, index) => (
            <motion.div
              key={index}
              className=" text-sm sm:text-xs  flex-grow text-blue-300 "
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {pkg.name}
              {pkg.amount && ` (${pkg.amount} USDT)`}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };
  
  // menu card component
 export const MenuCard = ({ icon: Icon, label, onClick }) => (
    <motion.div
      onClick={onClick}
      className="flex flex-col items-center justify-center"
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <motion.div className=" mb-2 text-[#6473c0] ">
        <Icon className="w-8 sm:w-10 h-8 sm:h-10" />
      </motion.div>
      <span className="text-xs sm:text-sm font-semibold text-center text-[#6e75b7]">
        {label}
      </span>
    </motion.div>
  );
  
  // special menu item
 export const SpecialMenuCard = ({
    icon: Icon,
    label,
    onClick,
    variant = "danger",
  }) => {
    const colorClasses = {
      danger: {
        text: "text-red-400",
        bg: "from-red-900/30 to-red-800/20",
        border: "border-red-500/30",
        iconBg: "bg-[#270a0a]/80",
        glow: "rgba(239,68,68,0.25)",
      },
      primary: {
        text: "text-blue-400",
        bg: "from-blue-900/30 to-blue-800/20",
        border: "border-blue-500/30",
        iconBg: "bg-[#070d25]/80",
        glow: "rgba(59,130,246,0.25)",
      },
    };
  
    const colors = colorClasses[variant];
  
    return (
      <motion.div
        onClick={onClick}
        className={`bg-gradient-to-br ${colors.bg} backdrop-blur-md p-3 sm:p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer shadow-lg border ${colors.border} h-24`}
        whileHover={{
          scale: 1.05,
          boxShadow: `0 10px 25px -5px ${colors.glow}`,
          y: -2,
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <motion.div
          className={`text-xl sm:text-2xl mb-2 ${colors.text} ${
            colors.iconBg
          } p-2 rounded-full border border-opacity-20 ${
            variant === "danger" ? "border-red-500" : "border-blue-500"
          }`}
          whileHover={{
            rotate: variant === "danger" ? -12 : 10,
            y: -2,
          }}
        >
          <Icon />
        </motion.div>
        <span className={`text-sm font-medium text-center ${colors.text}`}>
          {label}
        </span>
      </motion.div>
    );
  };
  
  // section component
 export const Section = ({ title, className }) => (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 sm:mb-8"
    >
      <h3 className="text-base sm:text-xl font-semibold  text-[#a8b0f1] flex gap-5 w-full items-center">
        <div className="rotate-180 flex flex-col gap-[2px]">
          <div className="w-6 h-[5px] bg-gradient-to-r from-transparent  to-[#abb2eb]/60 rounded-xl"></div>
          <div className="w-4 h-[5px] bg-gradient-to-r from-transparent  to-[#a8b0f1]/60 rounded-xl"></div>
          <div className="w-2 h-[5px] bg-gradient-to-r from-transparent  to-[#a8b0f1]/60 rounded-xl"></div>
        </div>
        <motion.span
          className="inline-block  w-[100%]"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {title}
        </motion.span>
        <div className="flex flex-col gap-[2px]">
          <div className="w-2 h-[5px] bg-gradient-to-r from-transparent  to-[#a8b0f1]/60 rounded-xl"></div>
          <div className="w-4 h-[5px] bg-gradient-to-r from-transparent  to-[#a8b0f1]/60 rounded-xl"></div>
          <div className="w-6 h-[5px] bg-gradient-to-r from-transparent  to-[#a8b0f1]/60 rounded-xl"></div>
        </div>
      </h3>
    </motion.section>
  );
  
  
  
  export const AboutLink = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };
  
    const rippFarmPoints = [
      {
        title: "Decentralized Trading",
        description: "RippFarm utilizes cutting-edge blockchain technology to provide secure and transparent decentralized trading solutions."
      },
      {
        title: "Automated Bot Systems",
        description: "Our AI-powered trading bots help maximize your investments with minimal effort through sophisticated algorithms."
      },
      {
        title: "Multi-level Rewards",
        description: "Benefit from our comprehensive referral system with multiple tiers of rewards and bonuses."
      },
      {
        title: "Secure Infrastructure",
        description: "End-to-end encryption and advanced security protocols ensure your assets remain protected at all times."
      },
      {
        title: "Global Community",
        description: "Join thousands of traders worldwide who trust RippFarm for their automated trading needs."
      }
    ];
  
    return (
      <div className="mb-6">
        <motion.div
          onClick={toggleAccordion}
          className="bg-gradient-to-r from-[#061758]/90 to-[#0e1738]/90 backdrop-blur-md p-4 rounded-xl flex justify-between items-center cursor-pointer shadow-lg border border-blue-400/20"
          whileHover={{
            scale: 1.02,
            boxShadow: "0 10px 25px -5px rgba(59,130,246,0.3)",
            borderColor: "rgba(96, 165, 250, 0.5)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center">
            <div className="bg-[#070d25]/80 p-2 rounded-lg mr-3 border border-blue-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-400"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <span className="font-bold text-blue-100">About RippFarm</span>
          </div>
  
          <motion.div
            className="bg-[#070d25]/80 p-2 rounded-lg border border-blue-500/20"
            animate={{ rotate: isOpen ? 0 : 0 }}
          >
            {isOpen ? 
              <MdKeyboardArrowDown className="text-blue-400" /> : 
              <MdOutlineArrowForwardIos className="text-blue-400" />}
          </motion.div>
        </motion.div>
  
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-2 bg-[#0a112d] border border-blue-500/20 rounded-xl p-2 sm:p-4 shadow-inner shadow-blue-900/20">
                <h3 className="text-blue-300 font-medium text-center mb-3">About Our Platform</h3>
                
                <div className="space-y-3">
                  {rippFarmPoints.map((point, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start border-b border-blue-500/10 pb-2 last:border-b-0"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="bg-blue-500/20 rounded-full w-10 sm:w-8 h-5 sm:h-6 flex items-center justify-center mr-1 mt-0.5 text-xs font-bold text-blue-300">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-blue-200 font-medium">{point.title}</h4>
                        <p className="text-blue-100/70 text-[13px]  sm:text-sm">{point.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-4 bg-[#061242] p-3 rounded-lg border border-blue-600/20">
                  <p className="text-blue-100/80 text-sm text-center">
                    RippFarm is committed to providing innovative 
                    blockchain-based financial solutions for traders worldwide.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
  
