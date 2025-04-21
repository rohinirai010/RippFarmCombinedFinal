import { ArrowDownRight, ArrowRight, ArrowUpRight, BarChart2, ChevronDown, ChevronRight, Copy, MinusIcon, Wallet, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link, Navigate, useNavigate } from "react-router-dom";
import bgImg from "../../images/dashboardBgImg.png";
import { useState } from "react";


export const ActivityItem = ({ icon, title, amount, time, index }) => {
  const isPositive = amount.startsWith("+");
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="bg-[#2f3059] p-2 sm:p-4 rounded-2xl flex items-start hover:shadow-lg hover:shadow-blue-900/30 transition-all cursor-pointer"
      onClick={() => navigate('/user/transactions')}
    >
      <div className="bg-[#5b60b2] h-6 sm:h-8 w-6 sm:w-8 rounded-full mr-2 sm:mr-3 flex items-center justify-center">
        <motion.div whileHover={{ rotate: 15 }}>{icon}</motion.div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-xs sm:text-base truncate text-gray-200">
          {title}
        </p>
        <div className="flex flex-row justify-between items-center mt-1">
          <span
            className={`text-xs sm:text-sm font-bold ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {amount}
          </span>
          <span className="text-[11px] sm:text-xs opacity-70 ml-2">{time}</span>
        </div>
      </div>
    </motion.div>
  );
};

export const PackageCard = ({
  icon,
  title,
  subtitle,
  activeCount,
  totalSlots = 8,
  index,
  link
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log("Navigating to:", link); // Add this logging to debug
    navigate(link);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
      whileHover={{ scale: 1, y: -5 }}
      className="p-1 rounded-xl relative cursor-pointer"
      onClick={handleCardClick}
    >
      
      <div className="p-1 rounded-xl relative">
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

export const WalletToggleButton = ({ view, currentView, onClick, label }) => (
  <motion.button
    onClick={() => onClick(view)}
    whileTap={{ scale: 0.95 }}
    className={`w-16 sm:w-24 md:w-32 h-8 rounded-full transition duration-300 flex items-center justify-center ${
      currentView === view
        ? "bg-[#5563c8] shadow-md shadow-blue-500/30"
        : "bg-[white] text-gray-700"
    }`}
    aria-label={`Switch to ${label} view`}
  >
    <span className="text-xs font-medium">{label}</span>
  </motion.button>
);

export const BackgroundImage = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <img
        src={bgImg}
        alt="background image"
        className="w-full h-50 object-cover"
      />
    </motion.div>
  </div>
);

// Simple LineChart component for wallet chart view
export const SimpleLineChart = () => {
  const data = [40, 30, 60, 70, 55, 90, 80];
  const maxValue = Math.max(...data);

  return (
    <div className="h-32 w-full flex items-end justify-between px-2 pt-4">
      {data.map((value, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: `${(value / maxValue) * 100}%` }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-blue-400 w-6 rounded-t-md relative group"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-300 text-blue-900 text-xs px-2 py-0.5 rounded-md"
          >
            ${value}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// Helper Components
export const MetricCard = ({
  title,
  value,
  icon,
  category,
  link
}) => {
  const navigate = useNavigate();
  
  // Category-based styling
  const categoryStyles = {
    team: {
      iconColor: "text-indigo-600 dark:text-indigo-400",
      bgLight: "from-indigo-50 to-white/80",
      bgDark: "dark:from-indigo-950/30 dark:to-gray-900/40",
      ringLight: "ring-indigo-100",
      ringDark: "dark:ring-indigo-900/20",
      accentColor: "text-indigo-600 dark:text-indigo-400",
      iconBgLight: "bg-indigo-100/70",
      iconBgDark: "dark:bg-indigo-900/30",
    },
    referrals: {
      iconColor: "text-emerald-600 dark:text-emerald-400",
      bgLight: "from-emerald-50 to-white/80",
      bgDark: "dark:from-emerald-950/30 dark:to-gray-900/40",
      ringLight: "ring-emerald-100",
      ringDark: "dark:ring-emerald-900/20",
      accentColor: "text-emerald-600 dark:text-emerald-400",
      iconBgLight: "bg-emerald-100/70",
      iconBgDark: "dark:bg-emerald-900/30",
    },
    deposit: {
      iconColor: "text-blue-600 dark:text-blue-400",
      bgLight: "from-blue-50 to-white/80",
      bgDark: "dark:from-blue-950/30 dark:to-gray-900/40",
      ringLight: "ring-blue-100",
      ringDark: "dark:ring-blue-900/20",
      accentColor: "text-blue-600 dark:text-blue-400",
      iconBgLight: "bg-blue-100/70",
      iconBgDark: "dark:bg-blue-900/30",
    },
    withdrawal: {
      iconColor: "text-violet-600 dark:text-violet-400",
      bgLight: "from-violet-50 to-white/80",
      bgDark: "dark:from-violet-950/30 dark:to-gray-900/40",
      ringLight: "ring-violet-100",
      ringDark: "dark:ring-violet-900/20",
      accentColor: "text-violet-600 dark:text-violet-400",
      iconBgLight: "bg-violet-100/70",
      iconBgDark: "dark:bg-violet-900/30",
    },
  };

  const style = categoryStyles[category];

  const handleCardClick = () => {
    navigate(link);
  };

  return (
    <div
      className={`bg-gradient-to-br ${style.bgLight} ${style.bgDark} rounded-xl p-3 shadow-sm ring-1 ${style.ringLight} ${style.ringDark}  transition-all hover:shadow-md hover:scale-[1.01] cursor-pointer`}
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="text-[13px] sm:text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </div>
          <div className="text-xl sm:text-2xl font-bold mt-1 text-gray-900 dark:text-white">
            {value}
          </div>
          
        </div>
        <div
          className={`p-1 rounded-lg ${style.iconBgLight} ${style.iconBgDark}`}
        >
          <div className={style.iconColor}>{icon}</div>
        </div>
      </div>
      <div className="mt-2 sm:mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(link);
          }}
          className={`text-xs ${style.accentColor} flex items-center font-medium transition-all hover:underline`}
        >
          View Details <ArrowRight size={12} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export const WalletCard = ({
  title,
  amount,
  buttonText,
  secondButtonText,
  isHighlighted = false,
  link
}) => {
  const navigate = useNavigate();
  
  // Determine category based on title or isHighlighted
  const category = title.toLowerCase().includes('deposit') ? 'deposit' : 
                  title.toLowerCase().includes('earning') ? 'withdrawal' : 
                  isHighlighted ? 'withdrawal' : 'deposit';
  
  const categoryStyles = {
    deposit: {
      iconColor: "text-blue-600 dark:text-blue-400",
      bgLight: "from-blue-50 to-white/80",
      bgDark: "dark:from-blue-950/30 dark:to-gray-900/40",
      ringLight: "ring-blue-100",
      ringDark: "dark:ring-blue-900/50",
      accentColor: "text-blue-600 dark:text-blue-400",
      iconBgLight: "bg-blue-100/70",
      iconBgDark: "dark:bg-blue-900/30",
      btnPrimary: "bg-blue-600 hover:bg-blue-700",
      btnSecondary: "bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/50"
    },
    withdrawal: {
      iconColor: "text-violet-600 dark:text-violet-400",
      bgLight: "from-violet-50 to-white/80",
      bgDark: "dark:from-violet-950/30 dark:to-gray-900/40",
      ringLight: "ring-violet-100",
      ringDark: "dark:ring-violet-900/50",
      accentColor: "text-violet-600 dark:text-violet-400",
      iconBgLight: "bg-violet-100/70",
      iconBgDark: "dark:bg-violet-900/30",
      btnPrimary: "bg-violet-600 hover:bg-violet-700",
      btnSecondary: "bg-violet-100 text-violet-600 hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:hover:bg-violet-800/50"
    }
  };

  const style = categoryStyles[category];

  const handlePrimaryAction = () => {
    if (title === "Deposit Wallet") {
      navigate('/user/deposit');
    } else if (title === "Earning Wallet") {
      navigate('/user/earnings');
    }
  };

  const handleSecondaryAction = () => {
    if (secondButtonText === "Withdraw") {
      navigate('/user/withdraw');
    } else if (secondButtonText === "Transfer") {
      // Handle transfer action
    }
  };

  return (
    <div
      className={`bg-gradient-to-br ${style.bgLight} ${style.bgDark} rounded-xl p-3 shadow-sm ring-1 ${style.ringLight} ${style.ringDark}  transition-all hover:shadow-md hover:scale-[1.01] cursor-pointer`}
      onClick={handlePrimaryAction}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="text-[13px] sm:text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </div>
          <div className="text-xl sm:text-2xl font-bold mt-1 text-gray-900 dark:text-white">
            ${amount}
          </div>
        </div>
        <div
          className={`p-1 rounded-lg ${style.iconBgLight} ${style.iconBgDark}`}
        >
          <div className={style.iconColor}>
            {category === 'deposit' ? <Wallet size={18} /> : <BarChart2 size={18} />}
          </div>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button 
          className={`flex-1 ${style.btnPrimary} text-white py-1.5 text-xs font-medium rounded-full transition shadow-sm`}
          onClick={(e) => {
            e.stopPropagation();
            handlePrimaryAction();
          }}
        >
          {buttonText}
        </button>
        {secondButtonText && (
          <button 
            className={`flex-1 ${style.btnSecondary} py-1.5 text-xs font-medium rounded-full transition`}
            onClick={(e) => {
              e.stopPropagation();
              handleSecondaryAction();
            }}
          >
            {secondButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

export const TeamInfoCard = ({ title, value, subtitle, icon }) => {
  const navigate = useNavigate();
  
  // Using the team category styles 
  const categoryStyles = {
    iconColor: "text-indigo-600 dark:text-indigo-400",
    bgLight: "from-indigo-50 to-white/80",
    bgDark: "dark:from-indigo-950/30 dark:to-gray-900/40",
    ringLight: "ring-indigo-100",
    ringDark: "dark:ring-indigo-900/60",
    accentColor: "text-indigo-600 dark:text-indigo-400",
    iconBgLight: "bg-indigo-100/70",
    iconBgDark: "dark:bg-indigo-900/30",
  };
  
  const handleCardClick = () => {
    if (title === "Today's Team Deposit") {
      navigate('/user/team-deposits');
    } else if (title === "Team Business") {
      navigate('/user/team-business');
    }
  };

  return (
    <div 
      className={`bg-gradient-to-br ${categoryStyles.bgLight} ${categoryStyles.bgDark} rounded-xl p-3 shadow-sm ring-1 ${categoryStyles.ringLight} ${categoryStyles.ringDark}  transition-all hover:shadow-md hover:scale-[1.01] cursor-pointer`}
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="text-[13px] sm:text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </div>
          <div className="text-xl sm:text-2xl font-bold mt-1 text-gray-900 dark:text-white">
            {value}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </div>
        </div>
        <div
          className={`p-1 rounded-lg ${categoryStyles.iconBgLight} ${categoryStyles.iconBgDark}`}
        >
          <div className={categoryStyles.iconColor}>
            {icon}
          </div>
        </div>
      </div>
      <div className="mt-2 sm:mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          className={`text-xs ${categoryStyles.accentColor} flex items-center font-medium transition-all hover:underline`}
        >
          View Details <ArrowRight size={12} className="ml-1" />
        </button>
      </div>
    </div>
  );
};




export const SocialCard = ({ title, icon, color, buttonText = "Connect" }) => {
  const navigate = useNavigate();
  
  const bgColors = {
    green: "bg-green-500 dark:bg-green-600",
    blue: "bg-blue-500 dark:bg-blue-600",
    purple: "bg-purple-600 dark:bg-purple-700",
  };

  const buttonGradients = {
    green: "from-green-500 to-green-600 dark:from-green-600 dark:to-green-700",
    blue: "from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800",
    purple:
      "from-purple-600 to-purple-800 dark:from-purple-700 dark:to-purple-900",
  };

  const hoverEffects = {
    green:
      "hover:shadow-lg hover:shadow-green-500/30 dark:hover:shadow-green-600/30",
    blue: "hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-600/30",
    purple:
      "hover:shadow-lg hover:shadow-purple-500/30 dark:hover:shadow-purple-600/30",
  };

  const handleSocialConnect = () => {
    const socialLinks = {
      "Twitter": "https://twitter.com/rippfarm",
      "Telegram": "https://t.me/rippfarm"
    };
    
    if (socialLinks[title]) {
      window.open(socialLinks[title], '_blank');
    }
  };

  return (
    <div className="bg-gray-800 dark:bg-gray-700 rounded-lg overflow-hidden">
      <div className="p-3">
        <div
          className={`${bgColors[color]} w-10 h-10 rounded-full flex items-center justify-center text-white mx-auto mb-2 cursor-pointer`}
          onClick={handleSocialConnect}
        >
          {icon}
        </div>
        <h3 className="text-white dark:text-gray-200 text-sm font-medium text-center mb-2">
          {title}
        </h3>

        <button
          onClick={handleSocialConnect}
          className={`w-full bg-gradient-to-r ${buttonGradients[color]} text-white py-1 px-2 rounded-2xl text-xs font-medium transform transition-all duration-300 cursor-pointer ${hoverEffects[color]} hover:-translate-y-0.5 flex items-center justify-center gap-1`}
        >
          <span>{buttonText}</span>
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};



// Add additional helper components for the Dashboard
export const ViewAllButton = ({ label, navigateTo }) => {
  const navigate = useNavigate();
  
  return (
    <motion.button
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.95 }}
      className="text-sm text-blue-300 flex items-center"
      onClick={() => navigate(navigateTo)}
    >
      {label} <ChevronRight size={16} />
    </motion.button>
  );
};

export const TeamDistributionFilter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Last 30 days");
  const options = ["Last 7 days", "Last 30 days", "Last 90 days", "All time"];

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onFilterChange) {
      onFilterChange(option);
    }
  };

  return (
    <div className="relative">
      <div 
        className="flex items-center text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-2 text-gray-700 dark:text-gray-300">
          {selected}
        </span>
        <ChevronDown
          size={14}
          className={`text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 w-36">
          {options.map((option) => (
            <div
              key={option}
              className={`px-3 py-1 text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                selected === option ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const TradingSummaryItem = ({ title, value, subtitle, icon, trend, navigateTo }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-750 transition-all cursor-pointer border border-gray-200 dark:border-gray-700"
      onClick={() => navigate(navigateTo)}
    >
      <div className="flex justify-between items-start">
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {title}
        </div>
        <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          {icon}
        </div>
      </div>
      <div className="text-lg font-bold mt-2 text-gray-900 dark:text-white">
        {value}{" "}
        <span className="text-xs text-gray-500 dark:text-gray-400">
          USDT
        </span>
      </div>
      <div className={`mt-1 text-xs flex items-center ${
        trend?.includes('+') ? 'text-green-600 dark:text-green-400' : 
        trend?.includes('-') ? 'text-red-600 dark:text-red-400' : 
        'text-indigo-600 dark:text-indigo-400'
      }`}>
        {trend ? (
          <>
            {trend.includes('+') ? <ArrowUpRight size={10} className="mr-1" /> : 
             trend.includes('-') ? <ArrowDownRight size={10} className="mr-1" /> : 
             <MinusIcon size={10} className="mr-1" />}
            <span>{trend}</span>
          </>
        ) : subtitle ? (
          <span>{subtitle}</span>
        ) : null}
      </div>
    </div>
  );
};

export const AiBotControls = ({ isActive, onToggle }) => {
  return (
    <button
      className={`px-4 sm:px-8 py-2 rounded-lg font-medium transition-all shadow-sm hover:shadow-md active:scale-95 transform flex items-center cursor-pointer ${
        isActive
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-indigo-600 hover:bg-indigo-700 text-white"
      }`}
      onClick={onToggle}
    >
      {isActive ? "Stop AI" : "Start AI"}
      <Zap size={16} className="ml-2" />
    </button>
  );
};

export const ReferralLinkCopy = ({ referralLink, onCopy }) => {
  return (
    <div className="mt-4">
      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm mb-3 overflow-hidden text-ellipsis border border-gray-200 dark:border-gray-600">
        {referralLink}
      </div>
      <button
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md active:scale-95 transform transition-transform flex items-center justify-center"
        onClick={onCopy}
      >
        <Copy size={16} className="mr-2" />
        Copy Referral Link
      </button>
    </div>
  );
};
