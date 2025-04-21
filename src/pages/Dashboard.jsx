import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  TrendingUp,
  Shield,
  Award,
  Gift,
  Briefcase,
  Calendar,
  ChevronRight,
  LogOut,
  Activity,
  Copy,
  ThumbsUp,
  Users,
  Repeat,
  ArrowUpRight,
  Clock,
  BarChart2,
  RefreshCcw,
  BarChart3,
  ChevronDown,
  ArrowRight,
  Package,
} from "lucide-react";
import Footer from "../partials/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setActivePackageType } from "../ReduxStateManagement/slices/packageSlice";
import { loadUser, logoutUser } from "../ReduxStateManagement/slices/authSlice";
import userLoginLogo from "../images/sidebarLogoCollapsed.png";
import {
  WalletCard,
  MetricCard,
  SocialCard,
  TeamInfoCard,
  ActivityItem,
  PackageCard,
  WalletToggleButton,
  BackgroundImage,
  SimpleLineChart,
  ViewAllButton,
  TeamDistributionFilter,
  TradingSummaryItem,
  AiBotControls,
  ReferralLinkCopy,
} from "../partials/dashboard/HelperComponents";
import { FaTelegram } from "react-icons/fa";
import { PiHandDepositDuotone, PiHandWithdrawDuotone } from "react-icons/pi";
import { BsTwitter } from "react-icons/bs";
import aiBotImage from "../images/aiBotImg.png";
import { CountdownBar } from "../partials/odl/CountdownBar";
import { CappingOverviewCarousel } from "../partials/capping/CappingOverviewCarousel";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [walletView, setWalletView] = useState("balance");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [aiActive, setAiActive] = useState(false);
  const [teamFilter, setTeamFilter] = useState("Last 30 days");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { walletBalance } = useSelector((state) => state.packageDetail);
  const { activePackageType } = useSelector((state) => state.packageDetail);

  // Sample activities data
  const activities = [
    {
      id: 1,
      title: "Daily Reward",
      amount: "+$25",
      icon: <Gift className="w-4 sm:w-5 h-4 sm:h-5" />,
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Investment Return",
      amount: "+$120",
      icon: <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5" />,
      time: "Yesterday",
    },
    {
      id: 3,
      title: "Premium Subscription",
      amount: "-$15",
      icon: <Shield className="w-4 sm:w-5 h-4 sm:h-5" />,
      time: "Apr 05",
    },
    {
      id: 4,
      title: "Referral Bonus",
      amount: "+$50",
      icon: <Award className="w-4 sm:w-5 h-4 sm:h-5" />,
      time: "Apr 03",
    },
    {
      id: 5,
      title: "Task Completion",
      amount: "+$35",
      icon: <Briefcase className="w-4 sm:w-5 h-4 sm:h-5" />,
      time: "Apr 02",
    },
    {
      id: 6,
      title: "Monthly Dividend",
      amount: "+$78",
      icon: <Calendar className="w-4 sm:w-5 h-4 sm:h-5" />,
      time: "Apr 01",
    },
  ];

  // Sample data from the images
  const dashboardData = {
    totalTeam: 17,
    totalReferrals: 2,
    totalDeposit: 0,
    totalWithdrawal: 0,
    earningWallet: 603.3,
    depositWallet: 0,
    todaysTeamDeposit: 0,
    teamBusiness: 0,
    totalProfit: 0,
    referralIncome: 0,
    ibId: "900015/Bampas",
    openPositions: 0,
    closedPositions: 0,
  };

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

  useEffect(() => {
    dispatch(loadUser())
      .unwrap()
      .catch(() => {
        // If loading user fails, redirect to login
        navigate("/user/login");
      });
  }, [dispatch, navigate]);

  useEffect(() => {
    // Updating selected package when active package type changes
    if (activePackageType) {
      setSelectedPackage(packageDetails[activePackageType]);
    }
  }, [activePackageType]);

  // Simulate app loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Show balance with a slight delay after loading
      setTimeout(() => setBalanceVisible(true), 300);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Check if user is not authenticated or still loading
  if (isLoading || !isAuthenticated) {
    return (
      <div className="max-w-lg mx-auto flex flex-col h-screen bg-gradient-to-b from-[#1d1e35] via-[#1d1e35] to-[#7789e5] text-white justify-center items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <img src={userLoginLogo} alt="User Logo" className="h-12 w-12" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-bold"
        >
          RippFarm App
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-1 bg-blue-500 mt-6 rounded-full"
        />
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `http://bampasfx.com/m/join.aspx?spid=${user?.username || "TOP"}`
    );
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/");
    });
  };

  const toggleAiBot = () => {
    setAiActive(!aiActive);
  };

  const displayName = user ? user.fullName || user.username || "User" : "Guest";

  return (
    <>
      <div className="max-w-xl mx-auto flex flex-col h-screen bg-gradient-to-b from-[#1d1e35] via-[#1d1e35] to-[#7789e5] text-white overflow-y-auto relative">
        {/* Background elements */}
        <BackgroundImage />

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 px-3 sm:px-4 relative bottom-16 z-10 mt-24"
        >
          <div className="flex items-center justify-between w-full">
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 md:mb-8"
            >
              <p className="text-base md:text-lg opacity-80">Hello,</p>
              <h1 className="text-2xl md:text-4xl font-bold">{displayName}</h1>
            </motion.div>

            {/* Logout Button */}
            <div className="flex items-center mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center px-4 py-2 rounded-full bg-[#5563c8] hover:bg-[#4351b4] text-white font-medium text-sm transition-colors"
              >
                <LogOut size={16} className="mr-1" />
                Logout
              </motion.button>
            </div>
          </div>

          {/* Wallet Balance */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 md:mb-8 bg-blue-900/10 px-2 py-4 rounded-xl backdrop-blur-xs shadow-lg shadow-blue-900/30"
          >
            <p className="text-sm md:text-base opacity-80 mb-1">
              R-Wallet Balance
            </p>
            <div className="flex justify-between items-center">
              <AnimatePresence>
                {balanceVisible && (
                  <motion.h2
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl md:text-4xl font-bold"
                  >
                    ${walletBalance.toLocaleString()}
                  </motion.h2>
                )}
              </AnimatePresence>
              <div className="flex gap-2">
                <WalletToggleButton
                  view="balance"
                  currentView={walletView}
                  onClick={setWalletView}
                  label="Balance"
                />
                <WalletToggleButton
                  view="chart"
                  currentView={walletView}
                  onClick={setWalletView}
                  label="Chart"
                />
              </div>
            </div>

            <AnimatePresence>
              {walletView === "chart" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden"
                >
                  <div className="bg-blue-800/30 rounded-lg p-2">
                    <SimpleLineChart />
                    <div className="flex justify-between px-2 mt-1 text-xs text-gray-300">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Activities & Earnings */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-base text-gray-300">Activities & Earnings</p>
              <ViewAllButton label="See All" navigateTo="/user/transactions" />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              {activities.map((item, index) => (
                <ActivityItem
                  key={item.id}
                  icon={item.icon}
                  title={item.title}
                  amount={item.amount}
                  time={item.time}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Capping Overview */}
          {selectedPackage && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex justify-between items-center mb-3 mt-5">
                <p className="text-base text-gray-300"> Capping Overview </p>
                <ViewAllButton
                  label="See All"
                  navigateTo="/user/account/capping"
                />
              </div>

             <CappingOverviewCarousel />
            </motion.div>
          )}

          {/* Key Metrics */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6">
              <MetricCard
                title="Total Team"
                value={dashboardData.totalTeam}
                icon={<Users size={20} />}
                category="team"
                link="/user/team"
              />
              <MetricCard
                title="Total Referrals"
                value={dashboardData.totalReferrals}
                icon={<Gift size={20} />}
                category="referrals"
                link="/user/referrals"
              />
              <MetricCard
                title="Total Deposit"
                value={`$${dashboardData.totalDeposit.toLocaleString()}`}
                icon={<PiHandDepositDuotone size={20} />}
                category="deposit"
                link="/user/deposits"
              />
              <MetricCard
                title="Total Withdrawal"
                value={`$${dashboardData.totalWithdrawal.toLocaleString()}`}
                icon={<PiHandWithdrawDuotone size={20} />}
                category="withdrawal"
                link="/user/withdrawals"
              />
            </div>

            {/* Team Distribution and Trading Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Team Distribution Card */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-3 shadow-lg border border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-base font-medium text-gray-800 dark:text-white flex items-center">
                    <Users className="mr-2 text-violet-500" size={18} />
                    Team Distribution
                  </h2>
                  <TeamDistributionFilter onFilterChange={setTeamFilter} />
                </div>

                {/* Donut Chart */}
                <div className="relative h-48 flex items-center justify-center">
                  <div className="relative w-36 h-36">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <circle
                        cx="18"
                        cy="18"
                        r="15.91549430918954"
                        fill="transparent"
                        stroke="#e5e7eb"
                        strokeWidth="3.8"
                        className="dark:stroke-gray-700"
                      ></circle>
                      <circle
                        cx="18"
                        cy="18"
                        r="15.91549430918954"
                        fill="transparent"
                        stroke="#3b82f6"
                        strokeWidth="3.8"
                        strokeDasharray="12 88"
                        strokeDashoffset="25"
                        className="transform -rotate-90 origin-center"
                        style={{
                          animation: "donutGrow 1.5s ease-out forwards",
                        }}
                      ></circle>
                      <circle
                        cx="18"
                        cy="18"
                        r="15.91549430918954"
                        fill="transparent"
                        stroke="#8b5cf6"
                        strokeWidth="3.8"
                        strokeDasharray="88 12"
                        strokeDashoffset="100"
                        className="transform -rotate-90 origin-center"
                        style={{
                          animation: "donutGrow 1.2s ease-out forwards",
                        }}
                      ></circle>
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center bg-white dark:bg-gray-900 rounded-full w-24 h-24 flex flex-col items-center justify-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          {dashboardData.totalTeam}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Total Members
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-8 mt-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-violet-500 mr-2"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      Total Team (88%)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      Referrals (12%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Trading Summary Card */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-base font-medium text-gray-800 dark:text-white flex items-center">
                    <BarChart3 className="mr-2 text-blue-500" size={18} />
                    Trading Summary
                  </h2>
                  <button
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={() => console.log("Refresh data")}
                  >
                    <RefreshCcw size={14} className="hover:animate-spin" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <TradingSummaryItem
                    title="Today's Deposit"
                    value={dashboardData.todaysTeamDeposit}
                    icon={<Activity size={14} />}
                    trend="+5.2% from yesterday"
                    navigateTo="/user/deposits"
                  />
                  <TradingSummaryItem
                    title="Total Deposit"
                    value={dashboardData.totalDeposit}
                    icon={<BarChart2 size={14} />}
                    subtitle="Account lifetime"
                    navigateTo="/user/deposits"
                  />
                  <TradingSummaryItem
                    title="Total Profit"
                    value={dashboardData.totalProfit}
                    icon={<TrendingUp size={14} />}
                    trend="+12.3% this month"
                    navigateTo="/user/profits"
                  />
                  <TradingSummaryItem
                    title="Referral Income"
                    value={dashboardData.referralIncome}
                    icon={<Repeat size={14} />}
                    subtitle={`From ${dashboardData.totalTeam} members`}
                    navigateTo="/user/referrals"
                  />
                </div>
              </div>
            </div>

            {/* AI Trading Bot and Wallets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
              {/* AI Trading Bot */}
              <div className="bg-white dark:bg-gray-800/30 border border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${
                    aiActive
                      ? "from-green-500/40 to-blue-500/10"
                      : "from-gray-200 to-gray-300 dark:from-gray-700/20 dark:to-gray-700/20"
                  } transition-colors`}
                ></div>

                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-16 h-16 bg-gray-600 dark:bg-[#101726] rounded-2xl">
                      <img
                        src={aiBotImage}
                        alt="AI Bot"
                        className="rounded-lg"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          aiActive ? "bg-green-500" : "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">AI Trading Bot</h2>
                      <div className="text-sm text-gray-500">
                        {dashboardData.ibId}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          aiActive ? "text-green-500" : "text-gray-400"
                        }`}
                      >
                        {aiActive ? "AI Trading Active" : "AI Trading Inactive"}
                      </div>
                    </div>
                  </div>

                  <AiBotControls isActive={aiActive} onToggle={toggleAiBot} />

                  {aiActive && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-sm text-green-700 dark:text-green-300 flex items-center mt-4">
                      <Activity size={16} className="mr-2 text-green-500" />
                      AI bot is analyzing market conditions...
                    </div>
                  )}
                </div>
              </div>

              {/* Referral Link */}
              <div className="bg-white dark:bg-gray-800/30 border border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Invite Customer</h2>
                  {linkCopied && (
                    <div className="flex items-center text-green-500 text-sm">
                      <ThumbsUp size={14} className="mr-1" /> Copied!
                    </div>
                  )}
                </div>
                <ReferralLinkCopy
                  referralLink={`http://bampasfx.com/m/join.aspx?spid=${
                    user?.username || "TOP"
                  }`}
                  onCopy={handleCopyLink}
                />
              </div>
            </div>

            {/* Wallets and Social */}
            <div className="grid grid-cols-1 gap-3 mt-6">
              {/* Wallet Cards */}
              <div className="grid grid-cols-2 gap-3">
                <WalletCard
                  title="Deposit Wallet"
                  amount={dashboardData.depositWallet}
                  buttonText="Deposit"
                  secondButtonText="Transfer"
                  link="/user/deposit"
                />
                <WalletCard
                  title="Earning Wallet"
                  amount={dashboardData.earningWallet}
                  buttonText="Details"
                  secondButtonText="Withdraw"
                  isHighlighted={true}
                  link="/user/earnings"
                />
              </div>

              {/* Team Info Cards */}
              <div className="grid grid-cols-2 gap-3">
                <TeamInfoCard
                  title="Today's Team Deposit"
                  value={`$${dashboardData.todaysTeamDeposit}`}
                  subtitle="Updated just now"
                  icon={<Clock size={16} className="text-indigo-400" />}
                />
                <TeamInfoCard
                  title="Team Business"
                  value={`$${dashboardData.teamBusiness}`}
                  subtitle={`From ${dashboardData.totalTeam} team members`}
                  icon={<Users size={16} className="text-indigo-400" />}
                />
              </div>

              {/* Social Links */}
              <div className="bg-gray-600 dark:bg-gray-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-white dark:text-gray-200 text-lg font-bold">
                      Connect with Community
                    </h2>
                    <p className="text-gray-400 dark:text-gray-500 text-xs">
                      Join thousands of members worldwide
                    </p>
                  </div>
                  <div className="bg-purple-600 dark:bg-purple-500 text-white dark:text-gray-800 text-xs font-medium px-1 sm:px-3 py-1 rounded-full">
                    Join us
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <SocialCard
                    title="Twitter"
                    icon={<BsTwitter className="w-5 h-5" />}
                    color="blue"
                  />
                  <SocialCard
                    title="Telegram"
                    icon={<FaTelegram className="w-5 h-5" />}
                    color="green"
                  />
                </div>

                <div className="text-center mt-3">
                  <p className="text-gray-400 dark:text-gray-500 text-xs">
                    Joining our community means you'll never miss important
                    updates
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="h-22"></div>
        </motion.div>

        {/* sticky odl CountdownBar */}
        <CountdownBar />

        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
        </motion.div>
      </div>
    </>
  );
}

