import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineArrowForwardIos } from "react-icons/md";

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
  
 export const AboutLink = ({ onClick }) => (
    <motion.div
      onClick={onClick}
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
        whileHover={{ x: 4 }}
      >
        <MdOutlineArrowForwardIos className="text-blue-400" />
      </motion.div>
    </motion.div>
  );