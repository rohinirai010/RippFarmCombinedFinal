import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Gift, ArrowRight, Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { initializeTimer, updateTimer, setPulseEffect } from "../../ReduxStateManagement/slices/timerSlice";

export function CountdownBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { timeLeft, pulseEffect } = useSelector(state => state.timer);
  
  // Initialize timer when component mounts
  useEffect(() => {
    dispatch(initializeTimer());
  }, [dispatch]);
  
  // Set up timer update interval
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(updateTimer());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [dispatch]);
  
  // Pulse effect every 10 seconds 
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      dispatch(setPulseEffect(true));
      setTimeout(() => dispatch(setPulseEffect(false)), 1000);
    }, 10000);
    
    // Pulse effect on every minute change
    if (timeLeft.seconds === 0) {
      dispatch(setPulseEffect(true));
      setTimeout(() => dispatch(setPulseEffect(false)), 1000);
    }
    
    return () => clearInterval(pulseInterval);
  }, [dispatch, timeLeft.seconds]);

  const handleClick = () => {
    navigate("/user/odl");
  };

  // Format numbers to always show two digits
  const formatTime = (num) => num.toString().padStart(2, '0');

  // Calculate progress percentage for visual indicator
  const totalSecondsMax = 72 * 3600; // 72 hours in seconds
  const currentTotalSeconds = timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;
  const progressPercentage = 100 - (currentTotalSeconds / totalSecondsMax * 100);

  return (
    <div className="fixed bottom-20 sm:bottom-22 left-0 right-0 max-w-xl mx-auto px-2 z-30">
      <div
        onClick={handleClick}
        className={`relative w-full bg-gradient-to-r from-indigo-800 via-blue-900 to-purple-900/60 
                   text-white rounded-lg shadow-lg overflow-hidden cursor-pointer
                   transform transition-all duration-300 ${pulseEffect ? 'scale-102' : 'scale-100'}`}
      >
        {/* Progress bar */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-indigo-400"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        
        <div className="flex items-center justify-between px-1 sm:px-3 py-2">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="bg-indigo-700/40 p-1 sm:p-1.5 rounded-full">
              <Gift size={16} className="text-indigo-200" />
            </div>
            <div>
              <div className="font-bold text-indigo-200 flex items-center text-[11px] sm:text-sm">
                
                <span className="truncate">Claim ODL Rewards before time runs out!</span>
              </div>
             
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center bg-indigo-700/70 px-1.5 sm:px-3 py-1 rounded-lg mr-1 sm:mr-2">
              <Clock size={12} className="mr-1 text-indigo-200 hidden sm:block" />
              <span className="font-mono tracking-wider font-bold text-[11px] sm:text-sm">
                {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
              </span>
            </div>
            <ArrowRight size={16} className="text-indigo-200 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}