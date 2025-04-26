import { Info } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

const CustomRangeSlider = ({
  value,
  min = 0,
  max = 100,
  onChange,
  formatValue = (v) => `${v}`,
  walletBalance, 
}) => {
  const sliderContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [exceedsBalance, setExceedsBalance] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());
  const [isInputFocused, setIsInputFocused] = useState(false);



  // Format numbers with thousands separators
  const formatNumber = (num) => {
    return parseFloat(num).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Calculate percentage for styling
  const percentage = ((value - min) / (max - min)) * 100;

  // Update input value when external value changes
  useEffect(() => {
    if (!isInputFocused) {
      setInputValue(value.toString());
    }
  }, [value, isInputFocused]);

  // Calculate value from mouse/touch position with 10x increments
  const calculateValueFromPosition = (clientX) => {
    if (!sliderContainerRef.current) return min;
  
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = offsetX / rect.width;
  
    let rawValue = min + percentage * (max - min);
    
    // Round to nearest 10 multiple
    let newValue = Math.round(rawValue / 10) * 10;
    
    // Ensure minimum value is at least the specified min
    if (newValue < min) {
      newValue = min;
    }
  
    return Math.max(min, Math.min(max, newValue)); // Ensure value is within bounds
  };

  // noraml calculation function ( for future use)
  const calculateValueFromPositionOriginal = (clientX) => {
    if (!sliderContainerRef.current) return min;
  
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = offsetX / rect.width;
  
    let newValue = min + percentage * (max - min);
    newValue = Math.round(newValue);
  
    return Math.max(min, Math.min(max, newValue));
  };

  // Check if value exceeds wallet balance
  useEffect(() => {
    if (walletBalance !== undefined) {
      setExceedsBalance(value > walletBalance);
    }
  }, [value, walletBalance]);

  // Event handlers for mouse
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setShowTooltip(true);
    
    // Update value immediately on click with 10x increments
    const newValue = calculateValueFromPosition(e.clientX);
    onChange(newValue); 
  };

  // Event handlers for touch
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setShowTooltip(true);
    
    // Update value immediately on touch with 10x increments
    const newValue = calculateValueFromPosition(e.touches[0].clientX);
    onChange(newValue); 
  };

  // Set up event listeners
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const newValue = calculateValueFromPosition(e.clientX);
      onChange(newValue); 
    };
  
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      e.preventDefault(); // Prevent scrolling while dragging
  
      const newValue = calculateValueFromPosition(e.touches[0].clientX);
      onChange(newValue); 
    };
  
    const handleEnd = () => {
      setIsDragging(false);
      setTimeout(() => setShowTooltip(false), 1000);
    };
  
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchend", handleEnd);
    }
  
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, onChange, min, max]); 

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    
    // Allow empty string for input
    if (newValue === '') {
      setInputValue('');
      return;
    }
    
    // Only accept numbers
    if (!/^\d*$/.test(newValue)) {
      return;
    }
    
    setInputValue(newValue);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    
    // Convert to number and validate
    let numValue = parseInt(inputValue, 10);
    
    // If input is empty or NaN, reset to current value
    if (isNaN(numValue)) {
      setInputValue(value.toString());
      return;
    }
    
    // Ensure within min/max bounds
    numValue = Math.max(min, Math.min(max, numValue));
    
    // Update both local input and parent state
    setInputValue(numValue.toString());
    onChange(numValue);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  const handleIncrement = () => {
    // Increment by 10 to match slider behavior
    const newValue = Math.min(max, value + 10);
    onChange(newValue);
  };

  const handleDecrement = () => {
    // Decrement by 10 to match slider behavior
    const newValue = Math.max(min, value - 10);
    onChange(newValue);
  };

  return (
    <div className="mt-5 mb-2">
      <div 
        ref={sliderContainerRef}
        className="relative h-2 bg-gray-800 rounded-full cursor-pointer"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => !isDragging && setShowTooltip(false)}
      >
        {/* Balance Indicator - shows maximum value you can select */}
        {walletBalance !== undefined && (
          <div
            className="absolute h-full w-px bg-green-500 z-10"
            style={{ 
              left: `${Math.min(100, ((walletBalance - min) / (max - min)) * 100)}%`,
              display: walletBalance < max ? 'block' : 'none'
            }}
          />
        )}

        {/*  change color when exceeding balance */}
        <div
          className={`absolute h-2 rounded-full ${
            exceedsBalance 
              ? "bg-gradient-to-r from-red-500 to-red-400" 
              : "bg-gradient-to-r from-blue-500 to-blue-400"
          }`}
          style={{ width: `${percentage}%` }}
        />

        {/* Slider Thumb */}
        <div
          className={`absolute w-5 sm:w-6 h-5 sm:h-6 rounded-full shadow-xl border-2 border-blue-300 transform -translate-x-1/2 -translate-y-1/2 cursor-grab ${
            isDragging ? 'cursor-grabbing scale-110' : ''
          } ${
            exceedsBalance 
              ? 'bg-gradient-to-r from-red-500 to-red-400' 
              : 'bg-gradient-to-r from-blue-500 to-blue-400'
          }`}
          style={{ 
            left: `${percentage}%`, 
            top: "50%",
            transition: isDragging ? 'none' : 'transform 0.1s ease',
            boxShadow: isDragging 
              ? exceedsBalance 
                ? '0 0 0 3px rgba(239, 68, 68, 0.3)' 
                : '0 0 0 3px rgba(59, 130, 246, 0.3)' 
              : '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Tooltip */}
          {(showTooltip || isDragging) && (
            <div 
              className={`absolute -top-10 left-1/2 transform -translate-x-1/2 text-white text-[11px] sm:text-xs font-semibold px-2 py-1 rounded-md shadow ${
                exceedsBalance ? 'bg-red-500' : 'bg-blue-500'
              }`}
              style={{
                opacity: isDragging ? 1 : 0.8,
                transition: 'opacity 0.2s ease'
              }}
            >
              {formatValue(value)}
              {exceedsBalance && (
                <div className="text-[10px] text-red-200 whitespace-nowrap">
                  Exceeds balance
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tick Marks */}
      <div className="flex justify-between mt-4 px-1">
        <span className="text-xs text-gray-400">{formatValue(min)}</span>
        <span className="text-xs text-gray-400 ml-auto">{formatValue(max)}</span>
      </div>

      <div className="flex flex-row  justify-between mt-2">

      {/* Custom Input  */}
      <div className="mt-2 flex flex-col ">
      <p className="text-xs sm:text-base text-gray-400">
                  Bot Activation Amount
                </p>
                <div className="mt-1 flex  items-center">

        <button 
          onClick={handleDecrement}
          className={`flex items-center justify-center w-4 sm:w-8 h-6 sm:h-8 rounded-l-lg ${
            value <= min 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          disabled={value <= min}
        >
          <span className="text-base sm:text-xl font-bold">−</span>
        </button>
        
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onKeyPress={handleKeyPress}
            className={`w-[6rem] sm:w-full h-6 sm:h-8 px-2 sm:px-3 py-1 text-center text-white bg-gray-800 border-y ${
              exceedsBalance ? 'border-red-500' : 'border-blue-600'
            } focus:outline-none focus:ring-2 ${
              exceedsBalance 
                ? 'focus:ring-red-500/30' 
                : 'focus:ring-blue-500/30'
            }`}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
            $
          </div>
        </div>
        
        <button 
          onClick={handleIncrement}
          className={`flex items-center justify-center w-4 sm:w-8 h-6 sm:h-8 rounded-r-lg ${
            value >= max 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          disabled={value >= max}
        >
          <span className="text-base sm:text-xl font-bold">+</span>
        </button>
                </div>
      </div>
      <div className="flex text-[11px] sm:text-sm ">
                <span className="text-gray-400 flex items-center">
                  <Info size={12} className="mr-1" />
                  Available: $ {formatNumber(walletBalance)}
                </span>
              </div>
      </div>
      
    </div>
  );
};

export default CustomRangeSlider;
