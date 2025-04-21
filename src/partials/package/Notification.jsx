import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const Notification = ({ type, message, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (!message) return;
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 300); // Allow time for exit animation
    }, duration);
    
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);
  
  const icons = {
    success: <CheckCircle size={24} className="text-green-400" />,
    error: <AlertCircle size={24} className="text-red-400" />,
    warning: <AlertCircle size={24} className="text-yellow-400" />,
    info: <Info size={24} className="text-blue-400" />
  };
  
  const bgColors = {
    success: 'from-green-900 to-green-800 border-green-700',
    error: 'from-red-900 to-red-800 border-red-700',
    warning: 'from-yellow-900 to-yellow-800 border-yellow-700',
    info: 'from-blue-900 to-blue-800 border-blue-700'
  };
  
  const textColors = {
    success: 'text-green-200',
    error: 'text-red-200',
    warning: 'text-yellow-200',
    info: 'text-blue-200'
  };
  
  return (
    <AnimatePresence>
      {isVisible && message && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className={`fixed top-20 left-0 right-0 mx-auto w-5/6 max-w-md p-4 bg-gradient-to-r ${bgColors[type] || bgColors.info} rounded-lg border shadow-lg z-50 flex items-center`}
        >
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 0.5, times: [0, 0.2, 0.5, 0.8, 1] }}
            className="mr-3"
          >
            {icons[type] || icons.info}
          </motion.div>
          <div className="flex-1">
            <p className="font-bold text-white">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
            <p className={`text-sm ${textColors[type] || textColors.info}`}>{message}</p>
          </div>
          <button 
            onClick={() => {
              setIsVisible(false);
              if (onClose) setTimeout(onClose, 300);
            }}
            className="ml-4 p-1 rounded-full hover:bg-black/20"
          >
            <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;