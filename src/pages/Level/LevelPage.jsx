import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActivePackageType } from "../../ReduxStateManagement/slices/packageSlice";
import { ArrowLeft, ArrowRight, HelpCircle, Lock, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  StatCard,
  TierLevel,
  InfoModal,
  UpgradeBar,
} from "../../partials/level/LevelReusableComponents";
import Footer from "../../partials/Footer";

// Main component
const LevelPage = () => {
    const [activeTab, setActiveTab] = useState("level");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activePackageType } = useSelector((state) => state.packageDetail);

  const [showLevels, setShowLevels] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [levelStats, setLevelStats] = useState([]);

  // Package details with data from Redux state
  const packageDetails = {
    igniteFund: {
      name: "Ignite Fund",
      dailyReturn: "0.3%",
      range: "$100 to $999",
      unlockedLevels: 5,
      totalLevels: 10,
    },
    elevatePlus: {
      name: "Elevate Plus",
      dailyReturn: "0.4%",
      range: "$1000 to $9999",
      unlockedLevels: 5,
      totalLevels: 10,
    },
    legacyVault: {
      name: "Legacy Vault",
      dailyReturn: "0.5%",
      range: "$10000+",
      unlockedLevels: 10,
      totalLevels: 10,
    },
  };

  // all 10 tier levels with percentages
  const allTierLevels = [
    { level: "1", percent: "5%" },
    { level: "2", percent: "3%" },
    { level: "3", percent: "2%" },
    { level: "4", percent: "1%" },
    { level: "5", percent: "1%" },
    { level: "6", percent: "1%" },
    { level: "7", percent: "0.5%" },
    { level: "8", percent: "0.5%" },
    { level: "9", percent: "0.5%" },
    { level: "10", percent: "0.5%" },
  ];

  // level stats with  data
  useEffect(() => {
    if (activePackageType) {
      const pkg = packageDetails[activePackageType];
      const unlockedLevels = pkg.unlockedLevels;

      // Generate stats for all 10 levels
      const stats = allTierLevels.map((level, index) => {
        const isUnlocked = index < unlockedLevels;
        return {
          level: level.level,
          percent: level.percent,
          unlocked: isUnlocked,
          members: isUnlocked ? Math.floor(50 + Math.random() * 30) : 0,
          bonus: isUnlocked ? Math.floor(1000 + Math.random() * 9000) : 0,
        };
      });

      setLevelStats(stats);
    }
  }, [activePackageType]);

  useEffect(() => {
    //  default package 
    if (!activePackageType) {
      dispatch(setActivePackageType(""));
    }
  }, [activePackageType, dispatch]);

  useEffect(() => {
    // Updating selected package when active package type changes
    if (activePackageType) {
      setSelectedPackage(packageDetails[activePackageType]);
    }
  }, [activePackageType]);

  const handleViewTier = () => {
    setShowLevels(!showLevels);
  };

  const getUpgradeOptions = () => {
    if (!activePackageType) return [];

    const packageTypes = ["igniteFund", "elevatePlus", "legacyVault"];
    const currentIndex = packageTypes.indexOf(activePackageType);

    if (currentIndex === -1 || currentIndex === packageTypes.length - 1) {
      return []; // if already at highest tier or invalid package
    }

    return packageTypes.slice(currentIndex + 1);
  };

  const upgradeOptions = getUpgradeOptions();

  const handleUpgrade = (packageType) => {
    // Navigate to package detail page for upgrade
    navigate(`/user/package/${packageType}`);
  };

  // Calculate team statistics (using mock data)
  const teamStats = {
    totalTeam: 278,
    todayTierBonus: 89754,
    totalTierBonus: 89754,
    highestTeamBusiness: 8600,
    biggerTeamTier: 4,
  };

  if (!selectedPackage) {
    return (
     <div className="flex flex-col items-center justify-center max-w-xl mx-auto h-screen bg-gradient-to-b from-blue-900 via-blue-950 to-black">
      <div className="text-center mb-8">
        <h1 className="text-blue-300 text-xl sm:text-2xl font-semibold mb-2">Select Your Package to view tier details</h1>
        <p className="text-blue-200 text-base sm:text-lg">Choose the plan that's right for you</p>
      </div>
      
     
      <button
        onClick={() => navigate('/user/packages')}
      
        className="flex flex-row items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-2xl font-bold button-glow shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Go to Packages  
        <ArrowRight 
          size={20} 
          className={`transition-all duration-300 `}
        />
      </button>
      
      <div className="mt-8 flex items-center gap-2 text-blue-300">
        <Package size={16} />
        <p className="text-xs sm:text-sm">Compare all features across packages</p>
      </div>
    </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto bg-gradient-to-b from-[#0b104e] via-[#080c26] to-[#060e22] text-white relative">
      {/* Header */}
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft className="text-white" />
        </button>
        <h1 className="text-2xl font-semibold text-blue-300 flex-1 text-center">
          Wealth Tier
        </h1>
        <button onClick={() => setShowInfoModal(true)}>
          <HelpCircle className="text-white opacity-70" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20 px-4 sm:px-10">
        {/* Stats Card */}
        <div
          className="bg-gradient-to-r from-[#0d1333] via-[#28305a] to-[#0d1333] border border-[#3b497e] rounded-3xl p-3 sm:p-6 mb-4 sm:mb-6 mt-4 cursor-pointer"
        >
          <div className="flex flex-row gap-6 sm:gap-9">
            <StatCard
              label="Total Team"
              value={teamStats.totalTeam}
              icon="👤"
            />

            <div className="grid grid-cols-2 gap-1 sm:gap-x-6 sm:gap-y-3">
              <StatCard
                label="Today Tier Bonus"
                value={teamStats.todayTierBonus}
              />
              <StatCard
                label="Total Tier Bonus"
                value={teamStats.totalTierBonus}
              />
              <StatCard
                label="Highest Team Business"
                value={teamStats.highestTeamBusiness}
              />
              <StatCard
                label="Bigger Team Tier"
                value={teamStats.biggerTeamTier}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {showInfoModal && (
        <InfoModal
          onClose={() => setShowInfoModal(false)}
          packageDetails={packageDetails}
        />
      )}

      {/* Sticky Upgrade Bar */}
      {upgradeOptions.length > 0 && (
        <UpgradeBar
          packageName={packageDetails[upgradeOptions[0]].name}
          onUpgrade={() => handleUpgrade(upgradeOptions[0])}
        />
      )}

      {/* overlay when tier card is shown */}
      {showLevels && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40"
          onClick={() => setShowLevels(false)}
        ></div>
      )}

      {/* Tier Card */}
      <div
        className={`fixed top-60 sm:top-74 left-0 right-0 max-w-xl mx-auto bg-[#04101e] rounded-t-[2rem] sm:rounded-t-[3rem] shadow-xl border-t  transition-all duration-500 ease-in-out mb-30 sm:mb-36 
        `}
        style={{
          bottom: 0,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div className="p-4 sm:p-6">
          <div className="w-16 h-1 bg-gray-600 rounded-full mx-auto mb-4"></div>

          <h2 className="text-blue-300 text-lg sm:text-xl mb-2 font-bold text-center">
            {selectedPackage?.name} - Tier Levels
          </h2>

          {/* Unlocked Tiers Indicator */}
          <div className="flex items-center justify-center mb-4">
            <div className="px-4 py-1 bg-blue-900/40 rounded-lg">
              <span className="text-blue-300 text-sm">
                {selectedPackage.unlockedLevels} of{" "}
                {selectedPackage.totalLevels} Tiers Unlocked
              </span>
            </div>
          </div>

          {/* Level List */}
          <div className="space-y-3">
            {levelStats.map((level, index) => (
              <TierLevel
                key={`level-${index}`}
                level={level}
                unlocked={level.unlocked}
              />
            ))}
          </div>

          {activePackageType !== "legacyVault" && (
            <div className="mt-6 text-center">
              <p className="text-blue-300 mb-2 text-sm sm:text-base">
                {activePackageType === "igniteFund"
                  ? "Unlock 5 more tiers with Elevate Plus or all 10 tiers with Legacy Vault"
                  : "Unlock all 10 tiers with Legacy Vault"}
              </p>
              {upgradeOptions.length > 0 && (
                <button
                  className="flex flex-row items-center mx-auto gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-2xl font-bold button-glow shadow-lg hover:shadow-xl transform hover:scale-105 mt-4 cursor-pointer"
                  onClick={() => {
                    setShowLevels(false);
                    handleUpgrade(upgradeOptions[0]);
                  }}
                >
                  Upgrade to {packageDetails[upgradeOptions[0]].name}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default LevelPage;
