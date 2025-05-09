import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

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
  
  // Create overlay effect for success notifications
  const isSuccess = type === 'success';
  
  return (
    <AnimatePresence>
      {isVisible && message && (
        <>
          {/* Background overlay/blur for success notifications */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={(e) => e.preventDefault()} 
            />
          )}
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className={`fixed top-20 left-0 right-0 mx-auto w-5/6 max-w-md p-4 bg-gradient-to-r ${bgColors[type] || bgColors.info} rounded-lg border shadow-lg ${isSuccess ? 'z-50' : 'z-40'} flex items-center`}
          >
            <motion.div
              animate={{ 
                rotate: isSuccess ? [0, 15, 0, -15, 0] : [0, 10, 0, -10, 0], 
                scale: isSuccess ? [1, 1.2, 1] : [1, 1.1, 1]
              }}
              transition={{ 
                duration: isSuccess ? 0.7 : 0.5, 
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: isSuccess ? 1 : 0
              }}
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
              className={`ml-4 p-1 rounded-full hover:bg-black/20 ${isSuccess ? "hidden" : "block"} `}
            >
              <X size={16} className="text-white/70" />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Notification;