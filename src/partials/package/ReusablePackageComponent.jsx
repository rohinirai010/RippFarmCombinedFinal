import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Info, AlertCircle, Zap, ChevronRight, Shield, Clock, BarChart3, ChevronsRight } from 'lucide-react';

export const AnimatedCard = ({ children, delay = 0, className = "" }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`bg-gradient-to-r from-[#0a1631] to-gray-900 rounded-lg border border-gray-800 shadow-glow ${className}`}
    >
      {children}
    </motion.div>
  );
  
 export const SectionTitle = ({ icon, title }) => (
    <h3 className="text-base sm:text-xl font-bold flex items-center mb-3">
      {React.cloneElement(icon, { size: 20, className: "mr-2 text-blue-400" })}
      <span className="text-gradient bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
        {title}
      </span>
    </h3>
  );
  
 export const AnimatedValue = ({ value, formatter = (v) => v }) => (
    <motion.span 
      key={value}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="text-white font-medium"
    >
      {formatter(value)}
    </motion.span>
  );
  
 export const InfoRow = ({ label, value, isHighlighted = false, icon }) => (
    <div className="flex justify-between items-center px-3 py-1 sm:py-2 border-b border-gray-700 last:border-b-0">
      <span className="text-gray-300 text-sm sm:text-base flex items-center">
        {icon && React.cloneElement(icon, { size: 14, className: "mr-1 text-blue-400" })}
        {label}
      </span>
      <span className={`font-medium text-sm sm:text-base ${isHighlighted ? 'text-blue-400' : 'text-white'}`}>
        {value}
      </span>
    </div>
  );
  
 export const AnimatedBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden">
      
      <div className="absolute top-10 left-10">
        <motion.span 
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="text-yellow-300 text-xl">✦</motion.span>
      </div>
      <div className="absolute top-20 right-20">
        <motion.span 
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="text-yellow-300 text-sm">✦</motion.span>
      </div>
      <div className="absolute bottom-10 left-20">
        <motion.span 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-yellow-300 text-xs">✦</motion.span>
      </div>
      <div className="absolute top-1/3 right-1/4">
        <motion.span 
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="text-blue-300 text-md">★</motion.span>
      </div>
      <div className="absolute bottom-1/4 right-1/5">
        <motion.span 
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="text-cyan-300 text-sm">★</motion.span>
      </div>
    </div>
  );
  
 export const LoadingScreen = () => (
    <div className="flex flex-col h-screen bg-black text-white justify-center items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 text-center"
      >
        <div className="mb-4">
          <motion.div
            animate={{ 
              rotate: 360,
              boxShadow: ["0 0 10px rgba(59,130,246,0.4)", "0 0 30px rgba(59,130,246,0.7)", "0 0 10px rgba(59,130,246,0.4)"]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-16 h-16 mx-auto bg-blue-900/30 rounded-full flex items-center justify-center"
          >
            <Zap size={40} className="text-blue-400" />
          </motion.div>
        </div>
        <h2 className="text-xl font-bold mb-2 text-gradient bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
          Loading Package Details...
        </h2>
        <p className="text-gray-400">Please wait while we fetch the package information.</p>
        <motion.div 
          className="h-1 bg-gray-800 rounded-full mt-6 mx-auto max-w-xs overflow-hidden"
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
            animate={{ x: ["-100%", "100%"] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
  
 export const BotMetricCard = ({ title, value, isHighlighted = false, animate = false }) => (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className={`${isHighlighted ? 'bg-gradient-to-r from-blue-500 to-blue-400' : 'bg-gradient-to-b from-[#0a1631] to-gray-900 border border-gray-700'} rounded-lg p-1 text-center shadow-glow`}
    >
      <p className={`text-xs ${isHighlighted ? 'text-white' : 'text-gray-300'} font-medium`}>{title}</p>
      <motion.h4 
        animate={animate ? { scale: [1, 1.1, 1] } : {}}
        transition={animate ? { duration: 2, repeat: Infinity } : {}}
        className={`${isHighlighted ? 'text-white' : 'text-white'} font-bold text-sm sm:text-lg`}
      >
        {value}
      </motion.h4>
    </motion.div>
  );
  
  export const SwipeToActivateButton = ({ packageName, onSwipeComplete }) => {
    const [isComplete, setIsComplete] = useState(false);
    const x = useMotionValue(0);
    const width = useTransform(x, [0, 240], ['0%', '100%']);
    const dragOpacity = useTransform(x, [0, 240], [1, 0]);
    const rotate = useTransform(x, [0, 240], [0, 90]);
  
    const handleDragEnd = (event, info) => {
      if (info.offset.x >= 240) {
        setIsComplete(true);
        onSwipeComplete();
        
        // Reset the button to its original position after a short delay
        setTimeout(() => {
          x.set(0);
          setIsComplete(false);
        }, 1000);
      } else {
        // Spring animation back to start if not fully swiped
        x.set(0);
      }
    };
  
    return (
      <div className="mt-auto px-10 sm:px-4 py-3">
        <motion.div 
          className="relative max-w-xs sm:max-w-sm mx-auto h-12 sm:h-14 border border-blue-500 bg-[#0a1631] backdrop-blur-sm rounded-full overflow-hidden shadow-lg shadow-blue-500/20"
          whileHover={{ boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}
          animate={{ boxShadow: ["0 4px 12px rgba(59,130,246,0.1)", "0 4px 20px rgba(59,130,246,0.2)", "0 4px 12px rgba(59,130,246,0.1)"] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {/* Subtle glow effect inside the button */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5"></div>
          
          <div className="absolute inset-0 flex items-center justify-end pr-6">
            <motion.div
              style={{ opacity: dragOpacity }}
              className="text-white uppercase tracking-wider text-sm z-10 font-light"
            >
              {isComplete ? "COMPLETED" : "SWIPE TO PROCEED"}
            </motion.div>
          </div>
          
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-10 sm:w-11 h-10 sm:h-11 flex items-center justify-center bg-blue-400 rounded-full cursor-grab active:cursor-grabbing z-20 mt-[5px] ml-2 shadow-md shadow-blue-500/30"
            drag="x"
            dragConstraints={{ left: 0, right: 240 }}
            style={{ x }}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.1 }}
            animate={isComplete ? 
              { x: 0, transition: { delay: 0.8, duration: 0.5, type: "spring" } } : 
              { boxShadow: ["0 0 10px rgba(59,130,246,0.4)", "0 0 20px rgba(59,130,246,0.6)", "0 0 10px rgba(59,130,246,0.4)"] }
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div style={{ rotate }}>
              <span className="w-6 h-6 flex items-center justify-center  text-blue-900"> <ChevronsRight /></span>
            </motion.div>
          </motion.div>
          
          {/* Progress indicator */}
          <motion.div 
            className="absolute left-0 top-0 bottom-0 bg-blue-500/10 h-full rounded-full"
            style={{ width }}
          />
          
          {/* Pulsing animation indicator for improved UI feedback */}
          <motion.div
            className="absolute left-12 top-0 h-full flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <motion.div 
              className="w-12 h-8 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent rounded-full blur-sm"
            />
          </motion.div>
        </motion.div>
        
        {/* Subtle instruction */}
        <motion.p
          className="text-center text-xs text-blue-400/60 mt-4 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        >
          {isComplete ? "Action completed" : `Drag the button to activate ${packageName}`}
        </motion.p>
      </div>
    );
};
  
 export const ConfirmationModal = ({ show, packageName, amount, formatNumber, onCancel, onConfirm }) => (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 max-w-xl mx-auto bg-black/80 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gradient-to-r from-[#0a1631] to-gray-900 rounded-lg p-6  max-w-sm border border-gray-700 shadow-glow"
          >
            <motion.h3 
              className="text-xl font-bold mb-4 text-gradient bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: 2 }}
            >
              <Zap size={20} className="inline mr-2 text-blue-400" />
              Confirm Activation
            </motion.h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to activate <span className="text-blue-400 font-bold">{packageName}</span> with <span className="text-blue-400 font-bold">{formatNumber(amount)} USDT</span>?
            </p>
            <div className="flex justify-end gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCancel}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onConfirm}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-bold button-glow"
              >
                Confirm
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  
 export const AlertToast = ({ show, message, title }) => (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="fixed bottom-20 left-0 right-0 mx-auto w-5/6 max-w-md p-4 bg-gradient-to-r from-red-900 to-red-800 rounded-lg border border-red-700 shadow-lg z-50 flex items-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="mr-3"
          >
            <AlertCircle size={24} className="text-red-400" />
          </motion.div>
          <div>
            <p className="font-bold text-white">{title}</p>
            <p className="text-sm text-red-200">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );