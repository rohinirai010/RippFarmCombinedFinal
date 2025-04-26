import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { useSelector } from "react-redux";
import { FaLock } from "react-icons/fa";

export const CappingOverviewCarousel = () => {
  const { activatedPackages, packages } = useSelector(
    (state) => state.packageDetail
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-rotate carousel
  useEffect(() => {
    if (activatedPackages && activatedPackages.length > 1) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setActiveIndex((prev) =>
            prev === activatedPackages.length - 1 ? 0 : prev + 1
          );
          setTimeout(() => {
            setIsAnimating(false);
          }, 50);
        }, 150);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [activatedPackages]);

  // Handle empty state
  if (!activatedPackages || activatedPackages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-[#9eb7f3] via-[#2c3595] to-[#171f7d] px-6 py-8">
        <Lock className="text-white mb-2" size={32} />
        <p className="text-white text-center">No active packages</p>
        <p className="text-white/70 text-sm text-center mt-1">
          Activate a package to view capping details
        </p>
      </div>
    );
  }

  const calculateProgress = (pkg) => {
    // Get package info based on type
    const packageInfo = packages[pkg.type];
    if (!packageInfo)
      return {
        progress: 0,
        color: "text-green-400",
        earnedAmount: 0,
        cappingAmount: 0,
      };

    // Get capping multiplier based on package type
    let cappingMultiplier = packageInfo.capping || 2;

    // Calculate the capping amount 
    const cappingAmount = pkg.amount * cappingMultiplier;

    // Calculate earnings based on activation date and daily rate
    let earnedAmount = 0;

    // For demonstration purposes, created create a past activation date
    // to ensure there's always visible progress
    const demoActivationDate = new Date();

    // for demo set the activation date to in the past
    // This will vary based on package type to show different progress levels
    let daysAgo;

    if (pkg.type === "igniteFund") {
      daysAgo = 45; // ~45% progress for Ignite Fund
    } else if (pkg.type === "elevatePlus") {
      daysAgo = 500; // ~30% progress for Elevate Plus
    } else if (pkg.type === "legacyVault") {
      daysAgo = 380; // ~30% progress for Legacy Vault
    } else {
      // Random number of days between 30-90 for any other package types
      daysAgo = 30 + Math.floor(Math.random() * 60);
    }

    demoActivationDate.setDate(demoActivationDate.getDate() - daysAgo);

    // Get daily earning rate from package info
    const dailyEarningRate = packageInfo.dailyRate / 100;

    // Calculate earned amount
    earnedAmount = pkg.amount * dailyEarningRate * daysAgo;

    // Ensure earned amount doesn't exceed capping amount
    earnedAmount = Math.min(earnedAmount, cappingAmount);

    // Format to 2 decimal places
    earnedAmount = parseFloat(earnedAmount.toFixed(2));

    // Calculate progress percentage
    const progress = Math.round((earnedAmount / cappingAmount) * 100);

    // Determine color based on progress
    let color = "#34D399"; // green by default

    if (progress >= 100) {
      color = ""; // red for 100%
    } else if (progress > 80) {
      color = ""; // red for > 80%
    } else if (progress > 50) {
      color = "#F59E0B"; // yellow for 51-80%
    }

    // For demo purpose, formatted the activation date to display
    const formattedActivationDate = demoActivationDate.toISOString();

    return {
      progress,
      color,
      earnedAmount,
      cappingAmount,
      demoActivationDate: formattedActivationDate,
    };
  };

  const currentPackage = activatedPackages[activeIndex];
  const { progress, color, earnedAmount, cappingAmount, demoActivationDate } =
    calculateProgress(currentPackage);

  // Calculate circumference for the circle with radius 40
  const circumference = 2 * Math.PI * 40;

  return (
    <>
      <div
        className={`relative flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-[#9eb7f3] via-[#2c3595] to-[#171f7d] opacity-80 px-3 sm:px-5 py-3 sm:py-4 transition-opacity duration-300 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-full flex flex-row justify-between">
          <div className="w-full sm:w-[70%]">
            {/* Package info */}
            <div className="w-full mb-2 sm:mb-3">
              <h2 className="text-white text-base sm:text-3xl font-bold">
                Package: ${currentPackage.amount}
              </h2>
              <p className="text-white/80 text-[11px] sm:text-[13px]">
                {currentPackage.name} | Activation Date:{" "}
                {new Date(
                  demoActivationDate || currentPackage.activatedAt
                ).toLocaleString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
              </p>
            </div>

            {/* Capping limit  */}
            <div className="w-full flex items-center mb-1 sm:mb-2">
              <FaLock className="mr-1 sm:mr-2 w-4 sm:w-5 h-4 sm:h-5 text-yellow-600" />
              <p className="text-white text-[13px] sm:text-lg">
                Capping Limit ({packages[currentPackage.type]?.capping || 2}X):
                ${cappingAmount.toLocaleString()}
              </p>
            </div>

            {/* Earned amount */}
            <div className="w-full flex items-center mb-2">
              <span className="text-white text-xs sm:text-base mr-1 sm:mr-2">📝</span>
              <p className="text-white text-[13px] sm:text-lg">
                Earned So Far:{" "}
                <span className="text-sm sm:text-xl font-bold">
                  {" "}
                  ${earnedAmount.toLocaleString()}{" "}
                </span>
              </p>
            </div>
          </div>

          {/* Progress display */}
          <div className="w-full sm:w-[40%] flex flex-col items-center mt-2 sm:mt-0">
            <h3 className="text-white font-medium text-sm sm:text-base mb-2 sm:mb-0">Earnings Progress</h3>

            <div className="flex items-center">
              {/* Circular progress indicator */}
              <div className="relative h-20 sm:h-24 w-20 sm:w-24">
                {/* SVG for circular progress */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="#000"
                    fillOpacity="0.3"
                  />

                  {/* Progress circle with stroke-dasharray */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={
                      progress >= 100 ? "#EF4444 " : "rgba(255, 255, 255, 0.2)"
                    }
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-in-out"
                  />

                  {/* Actual progress circle */}
                  {progress > 0 && (
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke={color}
                      strokeWidth="8"
                      strokeDasharray={`${
                        (progress * circumference) / 100
                      } ${circumference}`}
                      strokeDashoffset={circumference * 0.25}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      className={`transition-all duration-700 ease-in-out ${
                        progress > 80 ? "animate-pulse" : ""
                      }`}
                    />
                  )}

                  {/* Center text */}
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dy=".3em"
                    fill="white"
                    fontSize="24"
                    fontWeight="bold"
                  >
                    {progress >= 100 ? 100 : progress}%
                  </text>
                </svg>
              </div>
            </div>
            <div>
              <p className="text-white font-semibold text-xs sm:text-sm mt-[3px] sm:mt-1">
              <span className="text-sm sm:text-base">${earnedAmount.toLocaleString()} </span> / $
                {cappingAmount.toLocaleString()} Earned
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation controls */}
      {activatedPackages.length > 1 && (
        <div className="mt-2 w-full flex justify-center space-x-2">
          {/* Indicator dots */}
          <div className="flex space-x-2">
            {activatedPackages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setActiveIndex(idx);
                    setTimeout(() => {
                      setIsAnimating(false);
                    }, 50);
                  }, 150);
                }}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "bg-white scale-110"
                    : "bg-transparent border border-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
