import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Info,
  AlertCircle,
  Zap,
  ChevronRight,
  Shield,
  Clock,
  BarChart3,
  X,
} from "lucide-react";
import {
  updateActivationAmount,
  setActivePackageType,
  activatePackage,
  clearNotification,
} from "../../ReduxStateManagement/slices/packageSlice";
import CustomRangeSlider from "../../partials/package/CustomRangeSlider";
import Notification from "../../partials/package/Notification";
import {
  AnimatedCard,
  SectionTitle,
  InfoRow,
  AnimatedBackground,
  LoadingScreen,
  BotMetricCard,
  SwipeToActivateButton,
  ConfirmationModal,
  AlertToast,
} from "../../partials/package/ReusablePackageComponent";

// Sound imports
import sliderSoundFile from "../../images/slider-tick.mp3";
import errorSoundFile from "../../images/error-alert.mp3";
import successSoundFile from "../../images/success-chime.mp3";
import buttonClickSoundFile from "../../images/button-click.mp3";

const PackageDetail = () => {
  const { packageType } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.packageDetail);

  // Access the packageDetail state from Redux store
  const { packages, walletBalance } = useSelector(
    (state) => state.packageDetail
  );

  // Get the specific package data using packageType
  const packageData = packages?.[packageType];

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showOutOfBoundsAlert, setShowOutOfBoundsAlert] = useState(false);
  const [showDepositPopup, setShowDepositPopup] = useState(false);
  const [animatedBalance, setAnimatedBalance] = useState(0);
  const [animatedDailyProfit, setAnimatedDailyProfit] = useState(0);
  const prevSliderValueRef = useRef(0);

  const audioRefs = useRef({
    sliderSound: null,
    errorSound: null,
    successSound: null,
    buttonClickSound: null,
    notificationSound: null,
  });

  const animationFrameRef = useRef();
  const depositPopupTimerRef = useRef(null);

  // sliderValue from Redux
  const sliderValue =
    packageData?.activationAmount || packageData?.minAmount || 0;

  // Set up audio objects only once
  useEffect(() => {
    // Initialize audio objects
    audioRefs.current = {
      sliderSound: new Audio(sliderSoundFile),
      errorSound: new Audio(errorSoundFile),
      successSound: new Audio(successSoundFile),
      buttonClickSound: new Audio(buttonClickSoundFile),
    };

    // Preload all audio files
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) audio.load();
    });

    // Cleanup function
    return () => {
      // Pause and remove all audio elements when component unmounts
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.src = "";
        }
      });
    };
  }, []);

  // Safe audio playback function
  const safePlayAudio = (audioRef) => {
    if (!audioRef) return;

    // Reset audio to beginning
    audioRef.currentTime = 0;

    // Only play if the document has received user interaction
    if (document.body.getAttribute("data-user-interacted") === "true") {
      const playPromise = audioRef.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio playback error:", error.message);
        });
      }
    }
  };

  // effect to track user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      document.body.setAttribute("data-user-interacted", "true");
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  // audio effects
  const playSlideSound = () => safePlayAudio(audioRefs.current.sliderSound);
  const playErrorSound = () => safePlayAudio(audioRefs.current.errorSound);
  const playSuccessSound = () => safePlayAudio(audioRefs.current.successSound);
  const playButtonClickSound = () =>
    safePlayAudio(audioRefs.current.buttonClickSound);

  useEffect(() => {
    if (!packageData) {
      return;
    }

    dispatch(setActivePackageType(packageType));

    // Set default slider value to minimum amount
    const defaultValue = packageData.minAmount;
    setAnimatedBalance(walletBalance);
    setAnimatedDailyProfit((defaultValue * packageData.dailyRate) / 100);

    // Initialize with default value if activationAmount is not set
    if (!packageData.activationAmount) {
      dispatch(updateActivationAmount({ packageType, amount: defaultValue }));
    }

    prevSliderValueRef.current = defaultValue;
  }, [packageType, packageData, dispatch, walletBalance]);

  // Animate values when slider changes
  useEffect(() => {
    if (!packageData) return;

    const animationDuration = 500; // ms
    const startTime = Date.now();
    const startDailyProfit = animatedDailyProfit;
    const targetDailyProfit = (sliderValue * packageData.dailyRate) / 100;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // easing function for smoother animation
      const easeProgress = 1 - (1 - progress) * (1 - progress);

      setAnimatedDailyProfit(
        startDailyProfit + (targetDailyProfit - startDailyProfit) * easeProgress
      );

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Clean up animation frame on unmount or when dependencies change
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [sliderValue, packageData]);

  // If no package data and packages are loaded, redirect
  useEffect(() => {
    if (!packageData && Object.keys(packages || {}).length > 0) {
      navigate("/user/dashboard");
    }
  }, [packageData, packages, navigate]);

  // Clean up deposit popup timer
  useEffect(() => {
    return () => {
      if (depositPopupTimerRef.current) {
        clearTimeout(depositPopupTimerRef.current);
      }
    };
  }, []);

  if (!packageData) {
    return <LoadingScreen />;
  }

  const handleSliderChange = (newValue) => {
    const numericValue = Number(newValue);

    // Dispatch the Redux action to update activation amount
    dispatch(updateActivationAmount({ packageType, amount: numericValue }));

    // Only play if the slider value changed by a significant amount
    if (
      Math.abs(numericValue - prevSliderValueRef.current) >
      (packageData.maxAmount - packageData.minAmount) / 100
    ) {
      playSlideSound();
      prevSliderValueRef.current = numericValue;
    }

    // Check and handle wallet balance exceeding
    if (numericValue > walletBalance) {
      if (!showOutOfBoundsAlert) {
        setShowOutOfBoundsAlert(true);
        playErrorSound();
        setTimeout(() => setShowOutOfBoundsAlert(false), 3000);
        
        // Show deposit popup
        setShowDepositPopup(true);
        
        // Auto close deposit popup after 6 seconds
        if (depositPopupTimerRef.current) {
          clearTimeout(depositPopupTimerRef.current);
        }
        depositPopupTimerRef.current = setTimeout(() => {
          setShowDepositPopup(false);
        }, 6000);
      }
    }
  };

  const handleActivate = () => {
    if (sliderValue <= walletBalance) {
      setShowConfirmation(true);
      // Delay to ensure it doesn't interfere with state update
      setTimeout(() => playSuccessSound(), 100);
    } else {
      // Show insufficient balance warning
      setShowOutOfBoundsAlert(true);
      setTimeout(() => playErrorSound(), 100);
      setTimeout(() => setShowOutOfBoundsAlert(false), 3000);
      
      // Show deposit popup on activation attempt with insufficient balance
      setShowDepositPopup(true);
      
      // Auto close deposit popup after 6 seconds
      if (depositPopupTimerRef.current) {
        clearTimeout(depositPopupTimerRef.current);
      }
      depositPopupTimerRef.current = setTimeout(() => {
        setShowDepositPopup(false);
      }, 6000);
    }
  };

  // for cleanup on unmount or navigation away
  useEffect(() => {
    return () => {
      // Clear any notifications when leaving the component
      dispatch(clearNotification());
    };
  }, [dispatch]);

  const confirmActivation = () => {
    // Activate the package and show success notification
    dispatch(activatePackage({ packageType, amount: sliderValue }));
    setShowConfirmation(false);

    // Play success sound
    setTimeout(() => playSuccessSound(), 100);

    setTimeout(() => {
      // Clear notification before navigating
      dispatch(clearNotification());

      setTimeout(() => {
        navigate("/user/dashboard");
      }, 500);
    }, 3000);
  };

  const handleBackClick = () => {
    playButtonClickSound();
    navigate("/user/dashboard");
  };

  const handleDepositNow = () => {
    playButtonClickSound();
    navigate("/user/deposit");
  };

  // Format numbers with thousands separators
  const formatNumber = (num) => {
    return parseFloat(num).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="flex flex-col max-w-xl mx-auto h-full bg-black text-white relative overflow-hidden">
      {/* Animated Background  */}
      <AnimatedBackground />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-4 flex items-center"
        >
          <button
            onClick={handleBackClick}
            className="text-gray-300 hover:text-white hover:bg-[#0a1631] p-2 rounded-full transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="ml-2 text-xl font-bold flex items-center">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
              className="mr-2"
            >
              <Zap size={20} className="text-blue-400" />
            </motion.div>
            <span className="text-gradient bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
              {packageData.name}
            </span>
          </h1>
        </motion.div>

        {/* Wallet Balance */}
        <AnimatedCard
          delay={0.1}
          className="flex flex-row justify-between items-center px-4 py-2 mx-4 sm:mx-8 glow-effect"
        >
          <div>
            <p className="text-gray-400 flex items-center">
              <Shield size={16} className="mr-1" /> Wallet Balance
            </p>
            <motion.h2
              className="text-xl sm:text-2xl font-bold text-blue-400"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              $ {formatNumber(walletBalance)}
            </motion.h2>
          </div>

          {/* Deposit Button */}
          <motion.button
            onClick={handleDepositNow}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-2 py-2 text-sm bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/50 transition duration-200 flex items-center cursor-pointer"
          >
            <motion.span
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="mr-1"
            >
              <Zap size={16} />
            </motion.span>
            Deposit Now
          </motion.button>
        </AnimatedCard>

        {/* Bot Activation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="sm:px-4 py-4 mx-4 mt-2"
        >
          <SectionTitle
            icon={<Zap />}
            title={`Activation ${packageData.name}`}
          />

          <AnimatedCard className="px-4 py-2 power-pulse">
            <p className="text-sm sm:text-base text-gray-300  flex items-center">
              <motion.span
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ChevronRight size={16} className="mr-1 text-blue-400" />
              </motion.span>
              Select {packageData.name} Activation Amount
            </p>

            <CustomRangeSlider
              value={sliderValue}
              min={packageData.minAmount}
              max={packageData.maxAmount || packageData.minAmount * 10}
              onChange={handleSliderChange}
              formatValue={(val) => `${val} USDT`}
              walletBalance={walletBalance}
            />

            {/* Bot Activation Amount */}
            <div className="mt-2 flex flex-row justify-between items-center">
              <div>
                <p className="text-xs sm:text-base text-gray-400">
                  Bot Activation Amount
                </p>
                <motion.h3
                  key={sliderValue}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-base sm:text-xl font-bold text-blue-400  digital-counter"
                >
                  $ {formatNumber(sliderValue)}
                </motion.h3>
              </div>
              <div className="flex text-xs mt-1">
                <span className="text-gray-400 flex items-center">
                  <Info size={12} className="mr-1" />
                  Available: $ {formatNumber(walletBalance)}
                </span>
              </div>
            </div>
          </AnimatedCard>
        </motion.div>

        {/* Bot Tariff */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="sm:px-4 py-2 mx-4"
        >
          <SectionTitle
            icon={<BarChart3 />}
            title={`${packageData.name} Tariff`}
          />

          <AnimatedCard className="overflow-hidden cyber-panel">
            <InfoRow
              label="Bot Activation Amount"
              value={formatNumber(sliderValue)}
            />
            <InfoRow
              label="Bot Profit Period"
              value={`${packageData.botProfitPeriod} Days`}
              icon={<Clock />}
            />
            <InfoRow
              label="Deposit Takecare"
              value={`${packageData.depositTakecare} Days`}
            />
            <InfoRow
              label="Daily Bot Profit"
              value={`${packageData.dailyRate}%`}
              isHighlighted={true}
            />
            <InfoRow
              label="Total Bot Profit"
              value={`${
                packageData.totalBotProfit ||
                (packageData.dailyRate * packageData.botProfitPeriod).toFixed(2)
              }%`}
              isHighlighted={true}
            />
          </AnimatedCard>
        </motion.div>

        {/* Bot Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="sm:px-4 py-4 mx-4"
        >
          <SectionTitle icon={<Shield />} title="Bot Summary" />

          <div className="mt-2 grid grid-cols-3 gap-2">
            <BotMetricCard
              title="Daily Rate"
              value={`${packageData.dailyRate}%`}
              isHighlighted={true}
              animate={true}
            />

            <BotMetricCard
              title="Bot Deposit"
              value={formatNumber(sliderValue)}
            />

            <BotMetricCard
              title="Daily Profit"
              value={`$${formatNumber(animatedDailyProfit)}`}
            />
          </div>

          <AnimatedCard className="mt-4 p-2 pulse-warning">
            <div className="flex items-start">
              <motion.div
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="mt-1 mr-2"
              >
                <AlertCircle size={16} className="text-yellow-500" />
              </motion.div>
              <p className="text-xs text-gray-400">
                Caution: The profit and loss estimates displayed are
                hypothetical and based on current market conditions. Actual
                results may vary based on real-time market fluctuations.
                Exercise caution and trade responsibly!
              </p>
            </div>
          </AnimatedCard>
        </motion.div>

        {/* Swipe to Activate Button */}
        <SwipeToActivateButton
          packageName={packageData.name}
          onSwipeComplete={handleActivate}
        />
      </div>

      {/* Deposit Modal Popup */}
      <AnimatePresence>
        {showDepositPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4 max-w-xl mx-auto"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-xs bg-opacity-20" 
                 onClick={() => setShowDepositPopup(false)}></div>
            
            <motion.div 
              className="mx-0 sm:mx-8 bg-gradient-to-br from-[#0f2c5c] to-[#051428] rounded-xl shadow-lg p-6  relative z-10 border border-blue-500/30"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              <button
                onClick={() => setShowDepositPopup(false)}
                className="absolute top-2 right-2 text-gray-300 hover:text-white p-1 rounded-full hover:bg-blue-500/20"
              >
                <X size={20} />
              </button>
              
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="text-blue-400 mb-2"
                >
                  <Zap size={32} />
                </motion.div>
                
                <h3 className="text-xl font-bold text-white mb-2">Insufficient Balance</h3>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6 }}
                  className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-4"
                />
                
                <p className="text-gray-300 text-center mb-6">
                  Your wallet balance is too low for this activation amount. Add funds to your wallet to continue.
                </p>
                
                <motion.button
                  onClick={handleDepositNow}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-500/50 transition duration-200 flex items-center justify-center w-full"
                >
                  <Zap size={18} className="mr-2" />
                  Deposit Now
                </motion.button>
                
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showConfirmation}
        packageName={packageData.name}
        amount={sliderValue}
        formatNumber={formatNumber}
        onCancel={() => {
          playButtonClickSound();
          setShowConfirmation(false);
        }}
        onConfirm={() => {
          playButtonClickSound();
          confirmActivation();
        }}
      />

      {/* Out of Bounds Alert */}
      <AlertToast
        show={showOutOfBoundsAlert}
        title="Insufficient Balance!"
        message="Amount exceeds your available wallet balance."
      />

      {notification.show && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => {
            playButtonClickSound();
            dispatch(clearNotification());
          }}
        />
      )}
    </div>
  );
};

export default PackageDetail;