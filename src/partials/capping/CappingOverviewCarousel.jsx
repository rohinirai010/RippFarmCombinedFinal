import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { useSelector } from "react-redux";
import { FaLock } from "react-icons/fa";

export const CappingOverviewCarousel = () => {
  const { activatedPackages, packages } = useSelector(
    (state) => state.packageDetail
  );
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    if (activatedPackages && activatedPackages.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prev) =>
          prev === activatedPackages.length - 1 ? 0 : prev + 1
        );
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
    if (!packageInfo) return { progress: 0, color: "text-green-400" };

    // Get capping multiplier based on package type
    let cappingMultiplier = 2; 
    if (pkg.type === "legacyVault") {
      cappingMultiplier = 3; 
    }

    const cappingAmount = pkg.amount * cappingMultiplier;
    
    // For demo purposes, created some sample earnings based on package amount
    
    // Use the activation date if it's valid
    let earnedAmount = 0;
    
    if (pkg.activatedAt) {
      const activationDate = new Date(pkg.activatedAt);
      // Check if activation date is valid
      if (!isNaN(activationDate.getTime())) {
        const currentDate = new Date();
        // Calculate days since activation (minimum 1 day)
        const daysSinceActivation = Math.max(
          1,
          Math.floor((currentDate - activationDate) / (1000 * 60 * 60 * 24))
        );
        
        // Calculate daily earning rate based on package type (default to 0.5% if not found)
        const dailyEarningRate = packageInfo.dailyRate ? packageInfo.dailyRate / 100 : 0.005;
        
        // Calculate earned amount based on days since activation
        earnedAmount = Math.min(
          parseFloat((pkg.amount * dailyEarningRate * daysSinceActivation).toFixed(2)),
          cappingAmount
        );
      }
    }
    
    // If earned amount is still 0 or very small, generate a demo value
    // this is just to show some progress in the UI
    if (earnedAmount < pkg.amount * 0.05) {
      // Created a demo value between 10% and 75% of capping amount
      const minProgress = pkg.amount * 0.1;
      const maxProgress = cappingAmount * 0.75;
      earnedAmount = parseFloat((minProgress + Math.random() * (maxProgress - minProgress)).toFixed(2));
    }

    // Ensure earned amount doesn't exceed capping amount
    earnedAmount = Math.min(earnedAmount, cappingAmount);
    
    // Calculate progress percentage
    const progress = Math.round((earnedAmount / cappingAmount) * 100);

    // Determine color based on progress 
    let color = "#34D399"; // green by default
    
    if (progress > 80) {
      color = "#EF4444"; // red for > 80%
    } else if (progress > 50) {
      color = "#F59E0B"; // yellow for 51-80%
    }

    return {
      progress,
      color,
      earnedAmount,
      cappingAmount,
    };
  };

  const nextSlide = () => {
    setActiveIndex((prev) =>
      prev === activatedPackages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? activatedPackages.length - 1 : prev - 1
    );
  };

  const currentPackage = activatedPackages[activeIndex];
  const { progress, color, earnedAmount, cappingAmount } =
    calculateProgress(currentPackage);

  return (
    <>
    
    <div className="relative flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-[#9eb7f3] via-[#2c3595] to-[#171f7d] opacity-80 px-5 py-4">
      <div className="w-full flex flex-col sm:flex-row justify-between">
        <div className="w-full sm:w-[70%]">
          {/* Package info */}
          <div className="w-full mb-3">
            <h2 className="text-white text-2xl sm:text-3xl font-bold">
              Package: ${currentPackage.amount}
            </h2>
            <p className="text-white/80 text-xs sm:text-[13px]">
              {currentPackage.name} | Activation Date:{" "}
              {new Date(currentPackage.activatedAt).toLocaleString("en-US", {
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
          <div className="w-full flex items-center mb-2">
            <FaLock className="mr-2 w-4 sm:w-5 h-4 sm:h-5 text-yellow-600" />
            <p className="text-white text-base sm:text-lg">
              Capping Limit {currentPackage.type === "legacyVault" ? "(3X)" : "(2X)"}: ${cappingAmount.toLocaleString()}
            </p>
          </div>

          {/* Earned amount */}
          <div className="w-full flex items-center mb-2">
            <span className="text-white text-sm sm:text-base mr-2">📝</span>
            <p className="text-white text-base sm:text-lg">
              Earned So Far: <span className="text-xl font-bold"> ${earnedAmount.toLocaleString()} </span> 
            </p>
          </div>
        </div>

        {/* Progress display */}
        <div className="w-full sm:w-[40%] flex flex-col items-center mt-2 sm:mt-0">
          <h3 className="text-white font-medium">Earnings Progress</h3>

          <div className="flex items-center">
            {/* Circular progress indicator */}
            <div className="relative h-24 w-24">
              {/* SVG for circular progress */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle cx="50" cy="50" r="45" fill="#000" fillOpacity="0.3" />

                {/* Progress circle with stroke-dasharray */}
                {progress > 0 && (
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={color}
                    strokeWidth="8"
                    strokeDasharray={`${progress * 2.51} 251`}
                    strokeDashoffset="62.75"
                    transform="rotate(-90 50 50)"
                    className={progress > 80 ? "animate-pulse" : ""}
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
                  {progress}%
                </text>
              </svg>
            </div>
          </div>
          <div className="">
            <p className="text-white text-sm">
              ${earnedAmount.toLocaleString()} / $
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
                onClick={() => setActiveIndex(idx)}
                className={`w-4 h-4 rounded-full ${
                  idx === activeIndex ? "bg-white" : "bg-transparent border border-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
