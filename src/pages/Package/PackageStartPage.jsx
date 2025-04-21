import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Zap,
  TrendingUp,
  Shield,
  ArrowUpRight,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import userLoginLogo from "../../images/sidebarLogoCollapsed.png";

// Reusable components for visual enhancements
const AnimatedStar = ({ size, delay, position }) => (
  <motion.div 
    className={`absolute ${position}`}
    animate={{ 
      scale: [1, size === 'lg' ? 1.2 : 1.15, 1], 
      opacity: [size === 'lg' ? 0.4 : 0.2, size === 'lg' ? 1 : 0.6, size === 'lg' ? 0.4 : 0.2]
    }}
    transition={{ duration: size === 'lg' ? 4 : 3, repeat: Infinity, delay }}
  >
    <div className={`text-yellow-300 ${size === 'lg' ? 'text-5xl' : size === 'md' ? 'text-2xl' : 'text-lg'}`}>
      {size === 'lg' ? '✦' : '✧'}
    </div>
  </motion.div>
);

const DataStream = ({ position, delay, height }) => (
  <div className={`absolute h-full w-1 ${position} top-0 opacity-10`}>
    <motion.div 
      className={`w-full h-${height} bg-gradient-to-b from-transparent via-blue-500 to-transparent`}
      animate={{ y: [-100, 500] }}
      transition={{ duration: delay > 1 ? 5 : 7, repeat: Infinity, repeatType: "loop", ease: "linear", delay }}
    />
  </div>
);

const CornerGlow = ({ position, delay = 0 }) => (
  <motion.div
    className={`absolute ${position} w-16 h-16 
    border-${position.includes('bottom') ? 'b' : 't'} 
    border-${position.includes('right') ? 'r' : 'l'} 
    border-blue-500/40 
    ${position.includes('bottom') && position.includes('right') ? 'rounded-br-xl' : 
      position.includes('bottom') ? 'rounded-bl-full' : 
      position.includes('right') ? 'rounded-tr-full' : 
      'rounded-tl-xl'}`}
    animate={{
      opacity: [0.2, 0.7, 0.2],
      boxShadow: [
        "0 0 0px rgba(59,130,246,0)", 
        "0 0 10px rgba(59,130,246,0.3)", 
        "0 0 5px rgba(59,130,246,0.1)"
      ]
    }}
    transition={{ duration: 2.5, repeat: Infinity, delay }}
  />
);

export default function PackageStartPage() {
  const { packageType } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);
  const { packages } = useSelector((state) => state.packageDetail);

  // Get the selected package details
  const packageData = packages[packageType] || {};
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Start animation after loading
      setTimeout(() => setAnimateIn(true), 100);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    // Navigate to the package detail page
    navigate(`/user/package/${packageType}`);
  };

  // Set package-specific styling
  const getPackageStyle = () => {
    switch(packageType) {
      case 'igniteFund':
        return {
          title: "Ignite Fund",
          bgClass: "from-[#0a1631] via-[#1d1e35] to-[#0a1631]",
          rate: "0.3",
          iconBg: "bg-indigo-600",
          btnClass: "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600",
          min: "$100",
          max: "$999",
          icon: <Zap className="w-5 h-5" />,
          accentColor: "indigo"
        };
      case 'elevatePlus':
        return {
          title: "Elevate Plus",
          bgClass: "from-[#0a1631] via-[#1d1e35] to-[#0a1631]",
          rate: "0.4",
          iconBg: "bg-purple-600",
          btnClass: "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600",
          min: "$1,000",
          max: "$9,999",
          icon: <TrendingUp className="w-5 h-5" />,
          accentColor: "purple"
        };
      case 'legacyVault':
        return {
          title: "Legacy Vault",
          bgClass: "from-[#0a1631] via-[#1d1e35] to-[#0a1631]",
          rate: "0.5",
          iconBg: "bg-blue-600",
          btnClass: "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
          min: "$10,000",
          max: "and above",
          icon: <Shield className="w-5 h-5" />,
          accentColor: "blue"
        };
      default:
        return {
          title: "Investment",
          bgClass: "from-[#0a1631] via-[#1d1e35] to-[#0a1631]",
          rate: "0.0",
          iconBg: "bg-gray-600",
          btnClass: "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700",
          min: "$0",
          max: "$0",
          icon: <TrendingUp className="w-5 h-5" />,
          accentColor: "gray"
        };
    }
  };

  const style = getPackageStyle();
  
  // Format network bounty levels for display
  const formatNetworkBounty = () => {
    if (!packageData.networkBounty) return [];
    
    // Split into two arrays for column display if more than 5 levels
    const bounty = packageData.networkBounty;
    if (bounty.length <= 5) {
      return [bounty];
    } 
    
    return [
      bounty.slice(0, 5),
      bounty.slice(5)
    ];
  };
  
  const networkBountyColumns = formatNetworkBounty();

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto flex flex-col h-screen bg-gradient-to-b from-[#1d1e35] via-[#1d1e35] to-[#7789e5] text-white justify-center items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <img src={userLoginLogo} alt="User Logo" className="h-12 w-12" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-bold"
        >
          RippFarm App
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-1 bg-blue-500 mt-6 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen max-w-xl mx-auto bg-gradient-to-b ${style.bgClass} text-white relative overflow-hidden`}>
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Digital network effect - grid dots */}
        <div className="absolute inset-0 z-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#3b82f6" />
              </pattern>
              <linearGradient id="networkLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <line x1="10%" y1="30%" x2="30%" y2="60%" stroke="url(#networkLine)" strokeWidth="0.5">
              <animate attributeName="opacity" values="0.1;0.3;0.1" dur="7s" repeatCount="indefinite" />
            </line>
            <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="url(#networkLine)" strokeWidth="0.5">
              <animate attributeName="opacity" values="0.1;0.4;0.1" dur="8s" repeatCount="indefinite" />
            </line>
            <line x1="20%" y1="80%" x2="60%" y2="60%" stroke="url(#networkLine)" strokeWidth="0.5">
              <animate attributeName="opacity" values="0.1;0.3;0.1" dur="6s" repeatCount="indefinite" />
            </line>
          </svg>
        </div>
        
        {/* Decorative stars */}
        <AnimatedStar size="lg" delay={0} position="top-16 right-6" />
        <AnimatedStar size="md" delay={0.5} position="top-32 right-16" />
        <AnimatedStar size="sm" delay={1} position="top-48 left-14" />
        <AnimatedStar size="sm" delay={1.5} position="bottom-64 right-24" />
        
        {/* Data streams */}
        <DataStream position="left-1/4" delay={0} height="16" />
        <DataStream position="right-1/4" delay={2} height="12" />
        
        {/* Pulse effect */}
        <motion.div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full"
          animate={{ 
            boxShadow: [
              `0 0 0 0 rgba(${style.accentColor === 'blue' ? '59,130,246' : style.accentColor === 'purple' ? '139,92,246' : '99,102,241'},0)`,
              `0 0 70px 40px rgba(${style.accentColor === 'blue' ? '59,130,246' : style.accentColor === 'purple' ? '139,92,246' : '99,102,241'},0.05)`,
              `0 0 0 0 rgba(${style.accentColor === 'blue' ? '59,130,246' : style.accentColor === 'purple' ? '139,92,246' : '99,102,241'},0)`
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
      
      {/* Content Container */}
      <div className="relative min-h-screen flex flex-col items-center justify-between z-10 py-8 px-4">
        {/* Corner glows */}
        <CornerGlow position="top-0 left-0" />
        <CornerGlow position="bottom-0 right-0" delay={1.25} />
        
        {/* Header */}
        <motion.div 
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: animateIn ? 1 : 0, y: animateIn ? 0 : -20 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.div 
                className={`${style.iconBg} p-1 sm:p-2 rounded-lg mr-3 shadow-lg`}
                whileHover={{ scale: 1.05 }}
                animate={{ 
                  boxShadow: [
                    "0 0 0px rgba(79,70,229,0.1)",
                    "0 0 15px rgba(79,70,229,0.3)",
                    "0 0 0px rgba(79,70,229,0.1)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {style.icon}
              </motion.div>
              <motion.h1 
                className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300"
                animate={{ 
                  textShadow: [
                    "0 0 5px rgba(255,255,255,0.1)",
                    "0 0 8px rgba(255,255,255,0.2)",
                    "0 0 5px rgba(255,255,255,0.1)"
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                {style.title}
              </motion.h1>
            </div>
            <motion.div 
              className="bg-black/30 backdrop-blur-xs px-6 sm:px-8 sm:py-1 rounded-lg border border-blue-500/20"
              whileHover={{ scale: 1.05 }}
              animate={{ 
                boxShadow: [
                  "0 0 0px rgba(59,130,246,0)",
                  "0 0 10px rgba(59,130,246,0.15)",
                  "0 0 0px rgba(59,130,246,0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-xl sm:text-2xl font-bold text-center">
                <motion.span
                  animate={{ 
                    color: [
                      "rgb(191, 219, 254)", // Light blue
                      "rgb(255, 255, 255)", // White
                      "rgb(191, 219, 254)"  // Back to light blue
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  {style.rate}%
                </motion.span>
              </div>
              <div className="text-xs opacity-70">XRP Daily</div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Card Info */}
        <motion.div 
          className="w-full max-w-lg bg-[#0a1631]/80 backdrop-blur-sm rounded-2xl border border-blue-500/30 shadow-lg shadow-blue-500/20 p-4 sm:p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: animateIn ? 1 : 0, 
            scale: animateIn ? 1 : 0.95,
            boxShadow: animateIn ? [
              "0 4px 15px rgba(59,130,246,0.1)",
              "0 4px 25px rgba(59,130,246,0.2)",
              "0 4px 15px rgba(59,130,246,0.1)"
            ] : "none"
          }}
          transition={{ 
            opacity: { duration: 0.7 },
            scale: { duration: 0.7 },
            boxShadow: { duration: 3, repeat: Infinity, delay: 0.5 }
          }}
        >
          <motion.div 
            className="bg-blue-500/10 rounded-lg px-4 py-1 sm:py-3 mb-4 sm:mb-6 border border-blue-500/30"
            whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.15)" }}
          >
            <p className="text-base sm:text-lg font-medium">Start from <span className="font-bold text-blue-300">{style.min}</span> to <span className="font-bold text-blue-300">{style.max}</span></p>
          </motion.div>
          
          <div className="space-y-2 sm:space-y-4 mb-8">
            {/* Bounty item with animation */}
            <motion.div 
              className="flex items-center"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: animateIn ? 0 : -10, opacity: animateIn ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div 
                className="w-3 h-3 rounded-full bg-blue-400 mr-3"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm sm:text-lg group flex items-center">
                Daily XRP Bounty {style.rate}% 
                <motion.span 
                  className="ml-2 text-xs bg-blue-500/20 px-1.5 py-0.5 rounded border border-blue-500/30"
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                >
                  XRP
                </motion.span>
              </span>
            </motion.div>
            
            {/* ODL Profit with animation */}
            <motion.div 
              className="flex items-center"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: animateIn ? 0 : -10, opacity: animateIn ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div 
                className="w-3 h-3 rounded-full bg-blue-400 mr-3"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              <span className="text-sm sm:text-lg">ODL Profit upto <span className="text-blue-300">{packageData.odlProfitMax}%</span></span>
            </motion.div>
            
            {/* Direct Ripple Bounty with animation */}
            <motion.div 
              className="flex items-center"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: animateIn ? 0 : -10, opacity: animateIn ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.div 
                className="w-3 h-3 rounded-full bg-blue-400 mr-3"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              />
              <span className="text-sm sm:text-lg">Direct Ripple Bounty <span className="text-blue-300">{packageData.directRippleBounty}%</span></span>
            </motion.div>
            
            {/* Network Bounty section with animation */}
            <motion.div 
              className="space-y-2"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: animateIn ? 0 : -10, opacity: animateIn ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center">
                <motion.div 
                  className="w-3 h-3 rounded-full bg-blue-400 mr-3"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                />
                <span className="text-sm sm:text-lg">User Network Bounty</span>
              </div>
              
              <div className="flex gap-10 pl-6">
  {networkBountyColumns.map((column, colIndex) => (
    <div key={colIndex} className="space-y-1">
      {column.map((level, index) => (
        <motion.div 
          key={index} 
          className="flex items-center space-x-3"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: animateIn ? 0 : 10, opacity: animateIn ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.7 + (index * 0.05) }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="w-10 text-center px-2 py-1 bg-blue-400/20 border border-blue-500/30 rounded-md text-sm">
            {level.level}
          </span>
          <span className="w-14 text-center px-2 py-1 bg-blue-400/20 border border-blue-500/30 rounded-md text-sm text-blue-300">
            {level.percent}%
          </span>
        </motion.div>
      ))}
    </div>
  ))}
</div>

            </motion.div>
          </div>
          
          <div className="flex justify-center">
  <motion.button 
    onClick={handleStart} 
    className={`bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-10 py-2 sm:py-3 rounded-lg font-bold text-lg flex items-center shadow-xl`}
    whileHover={{ 
      scale: 1.05, 
      boxShadow: "0 0 25px rgba(59,130,246,0.6)" // bluish glow
    }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ 
      opacity: animateIn ? 1 : 0, 
      y: animateIn ? 0 : 20,
      boxShadow: [
        "0 0 10px rgba(59,130,246,0.4)",
        "0 0 20px rgba(59,130,246,0.6)",
        "0 0 10px rgba(59,130,246,0.4)"
      ]
    }}
    transition={{ 
      opacity: { duration: 0.7, delay: 0.8 },
      y: { duration: 0.7, delay: 0.8 },
      boxShadow: { duration: 2, repeat: Infinity, delay: 1 }
    }}
  >
    START
    <motion.div
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
    >
      <ArrowUpRight className="ml-2 w-5 h-5" />
    </motion.div>
  </motion.button>
</div>

        </motion.div>
        
        {/* Footer */}
        <motion.div 
          className="w-full max-w-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animateIn ? 0.8 : 0, y: animateIn ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <div className="text-xs text-gray-300 bg-blue-900/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-500/20">
            Trading involves inherent risk. Profit and loss are possible, and results may vary based on market conditions and user setting.
          </div>
          
          {/* Star icon at bottom */}
          <motion.div 
            className="mt-4 text-yellow-300 flex justify-center"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Star size={16} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}