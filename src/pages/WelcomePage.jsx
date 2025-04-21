import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { TerminalSquare } from "lucide-react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { loadUser } from "../ReduxStateManagement/slices/authSlice";
import welcomePageLogo from "../images/mainLogo.png";
import { LoadingScreen } from "../partials/package/ReusablePackageComponent";
import {
  AnimatedStar,
  DataStream,
  FlowingLine,
  CornerGlow,
  TypingCursor,
  ActivityIndicator,
  useTypewriter,
  ProfileShimmer,
  ProfileData,
  SwipeButton,
} from "../partials/welcomePage/WelcomePageReusableComponents";

// Memoized profile data to prevent unnecessary re-renders
const MemoizedProfileData = React.memo(ProfileData);
const MemoizedProfileShimmer = React.memo(ProfileShimmer);

// Main Component
export default function WelcomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  // Motion values for swipe functionality
  const x = useMotionValue(0);
  const width = useTransform(x, [0, 240], ["0%", "100%"]);
  const dragOpacity = useTransform(x, [0, 240], [1, 0]);
  const rotate = useTransform(x, [0, 240], [0, 90]);

  // For cursor blinking - reduced update frequency
  const [showCursor, setShowCursor] = useState(true);

  // For profile animation
  const [profileRevealed, setProfileRevealed] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // typewriter effect for multiple text elements
  const nameText = useMemo(
    () => (user ? user.fullName || user.username : ""),
    [user]
  );
  const accountReadyText = "Your account is ready to use";
  const welcomeMessage =
    "We're excited to have you on board. Your journey to success begins now. Explore the dashboard to discover all the amazing features waiting for you.";

  const {
    displayedText: displayedName,
    isComplete: nameTypingComplete,
    textIndex: nameIndex,
  } = useTypewriter(nameText, 80);

  const { displayedText: displayedStatus, isComplete: statusTypingComplete } =
    useTypewriter(accountReadyText, 60, [], nameTypingComplete);

  const { displayedText, textIndex } = useTypewriter(
    welcomeMessage,
    40,
    [],
    statusTypingComplete
  );

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Load user data when component mounts
  useEffect(() => {
    let isMounted = true;
    const loadUserData = async () => {
      try {
        await dispatch(loadUser()).unwrap();
        if (isMounted) setInitialLoadComplete(true);
      } catch (error) {
        console.error("Error loading user data:", error);
        if (isMounted) setInitialLoadComplete(true);
      }
    };

    loadUserData();
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  // Redirect if not authenticated - only after initial load is complete
  useEffect(() => {
    if (initialLoadComplete && !isLoading && !isAuthenticated) {
      navigate("/user/login");
    }
  }, [isAuthenticated, isLoading, navigate, initialLoadComplete]);

  // Profile animation timing
  useEffect(() => {
    if (statusTypingComplete && textIndex === welcomeMessage.length) {
      const timeout1 = setTimeout(() => {
        setProfileLoading(false);
        const timeout2 = setTimeout(() => setProfileRevealed(true), 1000); // Reduced from 1500ms
        return () => clearTimeout(timeout2);
      }, 300);
      return () => clearTimeout(timeout1);
    }
  }, [textIndex, welcomeMessage.length, statusTypingComplete]);

  // Handle drag end and redirect to dashboard
  const handleDragEnd = (event, info) => {
    if (info.offset.x >= 240) {
      navigate("/user/dashboard");
    }
  };

  // background elements
  const renderOptimizedBackgroundElements = () => {
    return (
      <>
        <AnimatedStar size="lg" delay={0} position="top-16 right-6" />
        <AnimatedStar size="md" delay={0.5} position="top-32 right-16" />
        <AnimatedStar size="sm" delay={1} position="bottom-64 right-24" />

        {/*  flowing lines */}
        <FlowingLine position="top-1/2 left-4" delay={0} />

        {/*  data streams */}
        <DataStream position="left-1/4" delay={0} height="16" />

        {/* corner decorations */}
        <CornerGlow position="bottom-16 left-6" />

        {/* Pulse effect behind the logo  */}
        <motion.div
          className="absolute top-16 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-blue-500/5"
          animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </>
    );
  };

  return (
    <div className="relative max-w-xl mx-auto min-h-screen flex flex-col bg-[#0a1631] overflow-hidden">
      {/* Background with gradient and decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1d1e35] via-[#0a1631] to-[#1d1e35]">
        {/*  background elements */}
        {renderOptimizedBackgroundElements()}

        <div className="absolute inset-0 z-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="20" cy="20" r="1" fill="#3b82f6" />
              </pattern>
              <linearGradient
                id="networkLine"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <line
              x1="10%"
              y1="30%"
              x2="30%"
              y2="60%"
              stroke="url(#networkLine)"
              strokeWidth="0.5"
            >
              <animate
                attributeName="opacity"
                values="0.1;0.3;0.1"
                dur="7s"
                repeatCount="indefinite"
              />
            </line>
            <line
              x1="80%"
              y1="20%"
              x2="50%"
              y2="50%"
              stroke="url(#networkLine)"
              strokeWidth="0.5"
            >
              <animate
                attributeName="opacity"
                values="0.1;0.4;0.1"
                dur="8s"
                repeatCount="indefinite"
              />
            </line>
          </svg>
        </div>

        {/* bottom right curved lines with animation  */}
        <div className="absolute bottom-0 right-0">
          <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
            <path
              d="M160 160C90 160 20 90 20 20"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              fill="none"
            >
              <animate
                attributeName="stroke-dasharray"
                values="0,20;10,10;20,0"
                dur="4s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      </div>

      {/* Content container */}
      <div className="relative w-full max-w-lg mx-auto px-5 sm:px-8 py-10 text-white flex-1 flex flex-col gap-1 z-10">
        {/* Logo */}
        <motion.div
          className="w-full flex justify-left mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className=" px-6 py-3 rounded-full inline-flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-6">
                <span className="text-[#8196f5]/80 text-xl">✦</span>
              </div>
              <div className="absolute -top-4 -left-2">
                <span className="text-[#8196f5]/20 text-xs">✦</span>
              </div>
              <div className="absolute -top-1 -left-3">
                <span className="text-[#8196f5]/40 text-sm">✦</span>
              </div>
              <img
                src={welcomePageLogo}
                alt="Welcome page logo"
                className="w-32 sm:w-52 h-6 sm:h-10"
                loading="eager"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-left"
        >
          <h1 className="text-2xl sm:text-4xl font-bold  relative">
            Welcome,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300 inline-block min-h-8 sm:min-h-12">
              {displayedName}
              {nameIndex < nameText.length && (
                <TypingCursor show={showCursor} height="h-8" />
              )}
            </span>
          </h1>

          <motion.div className="relative">
            {nameTypingComplete && (
              <p className="text-xs tracking-wide opacity-80">
                {displayedStatus}
                {!statusTypingComplete && <TypingCursor show={showCursor} />}
              </p>
            )}
          </motion.div>

          {/* typing effect */}
          {statusTypingComplete && (
            <motion.div
              className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-200 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="font-light">
                {displayedText}
                {textIndex < welcomeMessage.length && (
                  <TypingCursor show={showCursor} />
                )}
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="my-4 sm:my-6 bg-[#0a1631] bg-opacity-90 backdrop-blur-sm rounded-xl border border-gray-700 px-3 sm:px-6 py-5 sm:py-6 shadow-lg shadow-blue-500/10 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Shimmer highlights animated across the top  */}
          <motion.div
            className="absolute left-0 top-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: !profileLoading ? [0, 250, 0] : 0,
              opacity: !profileLoading ? [0, 0.7, 0] : 0,
            }}
            transition={{ duration: 4, ease: "linear", repeat: 0 }}
          />

          {/* Ambient corner glows */}
          <CornerGlow position="top-0 left-0" isProfile={!profileLoading} />
          <CornerGlow
            position="bottom-0 right-0"
            isProfile={!profileLoading}
            delay={1.25}
          />

          <div className="flex items-center justify-between mb-4">
            <motion.h2
              className="text-xl font-medium text-blue-400 flex flex-row items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Account Details
              <ActivityIndicator isLoading={profileLoading} />
            </motion.h2>

            {/* Status indicator */}
            <motion.div
              className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                boxShadow: !profileLoading
                  ? [
                      "0 0 0px rgba(59,130,246,0.1)",
                      "0 0 8px rgba(59,130,246,0.3)",
                      "0 0 0px rgba(59,130,246,0.1)",
                    ]
                  : "none",
              }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.7, type: "spring" },
                boxShadow: { duration: 2, repeat: Infinity },
              }}
            >
              {/* Animate pulse if loading, solid if loaded */}
              <motion.div
                className={`${
                  profileLoading ? "w-4 h-4" : "w-3 h-3"
                } rounded-full ${
                  profileLoading ? "bg-blue-400/30" : "bg-blue-400"
                }`}
                animate={
                  profileLoading
                    ? { scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }
                    : { scale: [1, 0.8, 1] }
                }
                transition={{
                  duration: profileLoading ? 1 : 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          </div>

          {/* Profile content area - using memoized components */}
          <div className="space-y-4">
            {!profileRevealed && <MemoizedProfileShimmer />}
            {profileRevealed && <MemoizedProfileData user={user} />}
          </div>
        </motion.div>

        <motion.div
          className=""
          initial={{ opacity: 0, y: 20 }}
          animate={
            profileRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5 }}
        >
          {profileRevealed && (
            <SwipeButton onSwipeComplete={() => navigate("/user/dashboard")} />
          )}
        </motion.div>

        {/* Animated terminal icon at bottom */}
        <motion.div
          className="hidden absolute bottom-6 left-1/2 transform -translate-x-1/2 text-[#b6a2f9] opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <TerminalSquare size={20} />
        </motion.div>
      </div>
    </div>
  );
}
