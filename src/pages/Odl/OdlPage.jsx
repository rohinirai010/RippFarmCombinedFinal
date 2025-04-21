import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeTimer, updateTimer, claimRewards } from '../../ReduxStateManagement/slices/timerSlice';
import ODLImg from "../../images/ODlbg.png";

export default function ODLClaimPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { timeLeft, claimed, loading } = useSelector(state => state.timer);
  
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  // Check if claiming is available
  const canClaim = !claimed && !loading && (timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0);
  
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
  
  const handleClaim = () => {
    if (!canClaim) return;
    
    dispatch(claimRewards());
    setShowConfirmation(true);
    
    // Hide confirmation after 5 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 5000);
  };
  
  const handleBackClick = () => {
    navigate('/user/dashboard');
  };
  
  return (
    <div className="flex flex-col items-center justify-center max-w-xl mx-auto min-h-screen bg-gradient-to-b from-[#0b104e] via-[#080c26] to-[#060e22] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <img src={ODLImg} alt="Background" className="w-full h-full opacity-20" />
      </div>
      
      {/* Confirmation message */}
      {showConfirmation && (
        <div className="absolute top-20 z-50 bg-gradient-to-r from-blue-600 to-indigo-800 px-6 py-4 rounded-lg shadow-xl border border-blue-400 transform transition-all duration-300 flex items-center">
          <div className="mr-3 text-green-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-white font-medium">Successfully claimed!</p>
            <p className="text-blue-200 text-sm ">
              Next claim available when timer expires
            </p>
          </div>
        </div>
      )}
      
      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 max-w-xl mx-auto flex items-center justify-center bg-black/30 backdrop-blur-xs bg-opacity-70">
          <div className="bg-gradient-to-b from-[#061758] to-[#0d1233] p-3 sm:p-6 rounded-xl border border-[#4b4a92] max-w-md m-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-[#afb7f9]">ODL Rewards Info</h3>
              <button 
                onClick={() => setShowInfoModal(false)}
                className="text-[#afb7f9] hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <p className="text-[#a8b1f9] text-sm">ODL (On-Demand Liquidity) rewards are earned for providing liquidity to the network.</p>
              <p className="text-[#a8b1f9] text-sm">Important points:</p>
              <ul className="list-disc pl-5 text-[#a8b1f9] space-y-1 text-[13px] tracking-wide">
                <li>Rewards must be claimed every 72 hours</li>
                <li>Unclaimed rewards are forfeited at the end of each cycle</li>
                <li>You can track your rewards in the dashboard</li>
                <li>Rewards are calculated based on your contribution to the liquidity pool</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <div className="z-10 flex flex-col px-9 sm:px-0 items-left pb-16 max-w-md w-full">
        {/* ODL Logo */}
        <div className="text-7xl sm:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#a8b1f9] via-[#a8b1f9] to-[#29298b] mb-2">ODL</div>
        
        {/* Info text */}
        <p className="text-[#a8b1f9] tracking-wide text-left text-sm sm:text-base mb-7 sm:mb-10">
          {claimed 
            ? <>Your ODL have been successfully claimed. <br /> Next ODL will be available after the timer expires.</>
            : "Claim your ODL earnings every 72 hours. If you miss claiming within the window, you will lose that cycle's income."
          }
        </p>

        {/* Border top */}
        <div className="w-full max-w-xl mb-2 relative">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#4b4a92] to-transparent"></div>
          <div className="h-4 bg-gradient-to-r from-transparent via-[#4b4a92] to-transparent opacity-80 transform translate-y-1 blur-md"></div>
        </div>
        
        {/* Timer */}
        <div className="flex justify-center space-x-6">
          <div className="flex flex-col items-center">
            <div className={`text-5xl sm:text-6xl font-extrabold ${claimed ? 'text-[#6a72a6]' : 'text-[#afb7f9]'}`}>
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className={`text-xs ${claimed ? 'text-[#6a72a6]' : 'text-[#afb7f9]'} tracking-wide mt-1`}>Hours</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`text-5xl sm:text-6xl font-extrabold ${claimed ? 'text-[#6a72a6]' : 'text-[#afb7f9]'}`}>
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className={`text-xs ${claimed ? 'text-[#6a72a6]' : 'text-[#afb7f9]'} tracking-wide mt-1`}>Minutes</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`text-5xl sm:text-6xl font-extrabold ${claimed ? 'text-[#6a72a6]' : 'text-[#afb7f9]'}`}>
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className={`text-xs ${claimed ? 'text-[#6a72a6]' : 'text-[#afb7f9]'} tracking-wide mt-1`}>Seconds</div>
          </div>
        </div>
      </div>

      {/* Claim button */}
      <button 
        onClick={handleClaim}
        disabled={!canClaim}
        className={`px-8 py-3 w-[12rem] h-[4rem] rounded-full bg-gradient-to-br from-[#061758] via-[#061758] to-[#405395] text-[#6b86ee] font-medium border border-[#6b86ee] shadow-lg transition-all transform ${
          !canClaim 
            ? 'opacity-40 cursor-not-allowed filter blur-[0.5px]' 
            : 'hover:from-blue-700 hover:to-blue-500 hover:scale-105 cursor-pointer'
        }`}
      >
        {claimed ? 'Claimed' : 'Claim Now'}
      </button>
      
      {/* Bottom text */}
      <p className="text-gray-500 text-xs sm:text-sm mt-4 opacity-70">
        {claimed 
          ? "Next claim available when timer expires." 
          : "This bonus is available once every 72 hours"
        }
      </p>
    
      {/* Left arrow navigation */}
      <button 
        onClick={handleBackClick}
        className="absolute top-4 left-4 text-blue-400 hover:text-blue-300 transition-colors p-2 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Info icon */}
      <button 
        onClick={() => setShowInfoModal(true)}
        className="absolute top-4 right-4 text-blue-400 hover:text-blue-300 transition-colors p-2 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  );
}