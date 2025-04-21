import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../ReduxStateManagement/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoKeyOutline,
  IoDocumentTextOutline,
  IoPerson,
} from "react-icons/io5";
import {
  BiChart,
  BiBarChartAlt2,
  BiLineChart,
  BiDownArrowCircle,
  BiTransfer,
  BiHistory,
} from "react-icons/bi";
import { FaMoneyBillWave } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { IoMdArrowRoundDown, IoMdMenu } from "react-icons/io";
import { PiHandDepositBold, PiHandWithdrawBold } from "react-icons/pi";
import {
  MdOutlineArrowForwardIos,
  MdSupportAgent,
  MdHelpOutline,
  MdClose,
} from "react-icons/md";
import { FiShare2, FiLink } from "react-icons/fi";
import { AiOutlineLogout } from "react-icons/ai";
import { BsArrowDownUp, BsThreeDotsVertical } from "react-icons/bs";
import { SiWhatsapp } from "react-icons/si";
import Footer from "../../partials/Footer";
import headerLogo from "../../images/sidebarLogoCollapsed.png";
import ODLImg from "../../images/ODlbg.png";
import bgLogo from "../../images/accountPageLogo.png";
import { GiBottleCap, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import ReferralLink from "./ReferralProgram/ReferralLink";
import {ActivePlansList, MenuCard, SpecialMenuCard, Section, AboutLink} from "../../partials/account/AccountsPageReusableComponents"


const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { walletBalance, activatedPackages } = useSelector(
    (state) => state.packageDetail
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  // state for the referral modal
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);

  // Get the referral link based on the user's username
  const getReferralLink = () => {
    if (user && user.username) {
      return `https://rippfarm.com/register?ref=${user.username}`;
    }
    return "https://rippfarm.com/register";
  };


  // Function to check if user has any active packages
  const hasActivePackages = () => {
    return (
      activatedPackages &&
      activatedPackages.some((pkg) => pkg.status === "active")
    );
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/user/login");
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/");
    });
  };

  const copyReferralId = () => {
    if (user && user.username) {
      navigator.clipboard.writeText(user.username);

      showNotification("Referral ID copied to clipboard!");
    }
  };

  // Mock function for notification system
  const showNotification = (message) => {
    const notification = document.createElement("div");
    notification.className =
      "fixed top-10 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg z-50";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add(
        "opacity-0",
        "transition-opacity",
        "duration-300"
      );
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 2000);
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  return (
    // Main wrapper
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col min-h-screen max-w-xl mx-auto text-white bg-gradient-to-b from-[#000621] via-[#0a0e2e] to-[#141539] relative overflow-hidden"
    >
      <img
        src={bgLogo}
        alt="Header Logo"
        className="w-72 sm:w-90 h-72 sm:h-90 absolute opacity-50 top-0 -left-12 sm:-left-16"
      />
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={ODLImg}
          alt="Background"
          className="w-full h-full opacity-10"
        />
      </div>

      {/* Header  */}
      <motion.header className="sticky top-0 z-30 transition-all duration-300 ">
        <div className="px-4 pt-3 pb-1 flex justify-between items-center">
          <div className="flex items-center">
            <motion.button
              onClick={() => navigate(-1)}
              className="mr-4 bg-[#070d25]/80 p-2 rounded-lg border border-blue-500/20"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoMdArrowRoundDown className="text-xl transform rotate-90 text-blue-400" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* User Profile  */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="p-4 z-10 border-b border-blue-500/10"
      >
        <div className="flex flex-col sm:flex-row items-center w-full">
          {/* Profile + Status  */}

          {/* Info and Actions  */}
          <div className=" sm:mt-0 sm:ml-4 flex-grow w-full sm:w-[80%]">
            <div className="flex flex-row gap-5 sm:gap-8 items-center justify-center">
              <div className="relative sm:w-[20%] flex justify-center sm:justify-start">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-70 blur-md"></div>
                  <img
                    src={
                      user?.profilePic ||
                      `https://ui-avatars.com/api/?name=${
                        user?.username || "RippFarm user"
                      }&background=0f122c&color=fff`
                    }
                    alt="Profile"
                    className="w-16 sm:w-24 h-16 sm:h-24 rounded-full border-2 border-[#7f7ff1] shadow-md shadow-blue-500/20 relative z-10"
                  />
                  {/* Dynamic status badge */}
                  <motion.div
                    className={`absolute top-1 sm:top-2 -right-[1px] rounded-full w-4 sm:w-5 h-4 sm:h-5 shadow-md z-20 ${
                      hasActivePackages()
                        ? "bg-gradient-to-r from-green-500 to-green-700 border border-green-300/30"
                        : "bg-gradient-to-r from-gray-600 to-gray-500 border border-gray-400/30"
                    }`}
                    animate={{ scale: hasActivePackages() ? [1, 1.1, 1] : 1 }}
                    transition={{
                      duration: 2,
                      repeat: hasActivePackages() ? Infinity : 0,
                    }}
                  ></motion.div>
                </motion.div>
              </div>
              <div className="flex flex-col ">
                <div className="flex flex-row gap-4">
                  <h2 className="font-bold text-2xl sm:text-3xl text-[#b5befa] text-center  ">
                    {user?.username || "RippFarm User"}
                  </h2>
                  <h2
                    className={` rounded-4xl px-4 sm:px-6  flex items-center text-sm sm:text-base  font-medium shadow-md z-20 ${
                      hasActivePackages()
                        ? "bg-[#010c44] border-2 border-[#162a8d] text-[#888fcf] shadow-sm shadow-[#162a8d]"
                        : "bg-gradient-to-r from-gray-600 to-gray-500 border border-gray-400/30"
                    }`}
                  >
                    {hasActivePackages() ? "Active" : "Inactive"}
                  </h2>
                </div>
                <h1 className="text-[#676c96] font-medium text-lg sm:text-xl">
                  {user?.fullName || "RippFarm User"}
                </h1>
              </div>
            </div>

            <div
              className={`flex flex-col sm:flex-row items-center justify-enter gap-3 sm:gap-4 mt-6 ${
                hasActivePackages() ? "" : "justify-center"
              }`}
            >
              {/* Show all active packages */}
              <ActivePlansList activatedPackages={activatedPackages} />

              <div className="flex flex-row items-center ">
                <div className="bg-[#061758]/70 backdrop-blur-md rounded-full w-full sm:w-auto flex items-center px-3 py-1.5 border border-blue-500/20">
                  <span className="text-gray-400 text-sm  mr-2">
                    Referral ID:
                  </span>
                  <h1 className="bg-transparent border-none outline-none text-sm  flex-grow text-blue-300">
                    {user?.sponsorId || "RippFarm"}
                  </h1>
                  <motion.button
                    onClick={copyReferralId}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-blue-400  ml-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </motion.button>
                </div>
                <motion.button
                  onClick={openWhatsApp}
                  className=" ml-3 bg-gradient-to-br from-green-600 to-green-700 p-2 rounded-full shadow-md shadow-green-500/20 border border-green-500/30"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 12px rgba(34,197,94,0.4)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SiWhatsapp className="text-white" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Sections */}
      <div className="px-4 sm:px-6 overflow-y-auto pb-24 z-10 mt-5 space-y-6">
        {/* Profile Section */}
        <div className="w-full flex flex-col items-center justify-center px-3 py-4 rounded-4xl bg-gradient-to-r from-[#14173d] via-[#282f5b] to-[#12153b] border-t-1 border-r-1   border-[#3b497e]   cursor-pointer shadow-lg">
          <Section title="Account Privileges" />
          <div className="grid grid-cols-3 gap-3 sm:gap-10">
            <MenuCard
              icon={IoPerson}
              label="Account Info"
              onClick={() => navigate("/user/account/account-info")}
            />

            <MenuCard
              icon={IoKeyOutline}
              label="Change Password"
              onClick={() => navigate("/user/account/change-password")}
            />

            <MenuCard
              icon={IoDocumentTextOutline}
              label="Address Details"
              onClick={() => navigate("/user/account/address-detail")}
            />
          </div>
        </div>

        {/* Reports Section */}
        <div className="w-full flex flex-col items-center justify-center px-3 py-4 rounded-4xl bg-gradient-to-r from-[#0d1333] via-[#28305a] to-[#0d1333] border-t-1 border-l-1   border-[#3b497e]   cursor-pointer shadow-lg">
          <Section title="Reports" />
          <div className="grid grid-cols-3 gap-x-8 sm:gap-x-14 gap-y-3 sm:gap-y-6">
            <MenuCard
              icon={BiChart}
              label="Bot profit"
              onClick={() => navigate("/user/report/bot-profit")}
            />

            <MenuCard
              icon={BiBarChartAlt2}
              label="Level income"
              onClick={() => navigate("/user/report/level-income")}
            />

            <MenuCard
              icon={BiLineChart}
              label="Direct team"
              onClick={() => navigate("/user/report/direct")}
            />
            <MenuCard
              icon={GiReceiveMoney}
              label="ODL Bonus"
              onClick={() => navigate("/user/report/odl-bonus")}
            />
            <MenuCard
              icon={GiTakeMyMoney}
              label="BLB Bonus"
              onClick={() => navigate("/user/report/blb-bonus")}
            />
            <MenuCard
              icon={FaMoneyBillWave}
              label="Earning Report"
              onClick={() => navigate("/user/report/my-earning")}
            />
          </div>
        </div>

        {/* Transaction details Section */}
        <div className="w-full flex flex-col items-center justify-center px-3 py-4 rounded-4xl bg-gradient-to-r from-[#0d1333] via-[#28305a] to-[#0d1333] border-t-1 border-l-1   border-[#3b497e]   cursor-pointer shadow-lg">
          <Section title="Transaction Details" />
          <div className="grid grid-cols-3 gap-x-8 sm:gap-x-14 gap-y-3 sm:gap-y-6">
            <MenuCard
              icon={BiChart}
              label="Top Up History"
              onClick={() => navigate("/user/transaction/topup-history")}
            />
            <MenuCard
              icon={BiTransfer}
              label="Transactions"
              onClick={() => navigate("/user/transaction/transaction-report")}
            />

            <MenuCard
              icon={GiBottleCap}
              label="Capping"
              onClick={() => navigate("/user/transaction/capping")}
            />
          </div>
        </div>

        {/* Deposit/Withdrawal Section */}
        <div className="w-full flex flex-col items-center justify-center px-3 py-4 rounded-4xl bg-gradient-to-r from-[#0d1333] via-[#28305a] to-[#0d1333] border-t-1 border-r-1   border-[#3b497e]  cursor-pointer shadow-lg">
          <Section title="Deposit / Withdrawal" />
          <div className="grid grid-cols-3 gap-x-10 sm:gap-x-20 gap-y-6">
            <MenuCard
              icon={PiHandDepositBold}
              label="Deposit"
              onClick={() => navigate("/user/deposit")}
            />
            <MenuCard
              icon={PiHandWithdrawBold}
              label="Withdrawal"
              onClick={() => navigate("/user/account/withdraw")}
            />
            <MenuCard
              icon={BiHistory}
              label="History"
              onClick={() => navigate("/user/account/history")}
            />
          </div>
        </div>

        {/* Referral Program */}
        <div className="w-full flex flex-col items-center justify-center px-3 py-4 rounded-4xl bg-gradient-to-r from-[#0d1333] via-[#28305a] to-[#0d1333] border-t-1 border-l-1   border-[#3b497e]   cursor-pointer shadow-lg">
          <Section title="Referral Program" />
          <div className="grid grid-cols-3 gap-x-3 sm:gap-x-10 gap-y-6">
            <MenuCard
              icon={FiLink}
              label="Share Referral Link"
              onClick={() => setIsReferralModalOpen(true)}
            />
            <MenuCard
              icon={BiDownArrowCircle}
              label="Downline team"
              onClick={() => navigate("/user/report/downline")}
            />
            <MenuCard
              icon={RiTeamLine}
              label="My Network"
              onClick={() => navigate("/user/account/my-network")}
            />
          </div>
        </div>

        {/* Help Center */}
        <div className="w-full flex flex-col items-center justify-center px-3 py-4 rounded-4xl bg-gradient-to-r from-[#0d1333] via-[#28305a] to-[#0d1333] border-t-1 border-r-1   border-[#3b497e]  cursor-pointer shadow-lg">
          <Section title="Help center" />
          <div className="grid grid-cols-3 gap-x-6 sm:gap-x-18 gap-y-6">
            <MenuCard
              icon={MdSupportAgent}
              label="Support"
              onClick={() => navigate("/user/account/helpdesk")}
            />
            <MenuCard
              icon={MdHelpOutline}
              label="FAQ"
              onClick={() => navigate("/faq")}
            />
            <SpecialMenuCard
              icon={AiOutlineLogout}
              label="Logout"
              onClick={handleLogout}
              variant="danger"
            />
          </div>
        </div>

        {/* About Section */}
        <AboutLink onClick={() => navigate("/about-rippfarm")} />
      </div>

      {/* ReferralLink component */}
      <ReferralLink
        isOpen={isReferralModalOpen}
        setIsOpen={setIsReferralModalOpen}
        referralLink={getReferralLink()}
      />

      {/* Footer with animation */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="z-10"
      >
        <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
      </motion.div>
    </motion.div>
  );
};

export default AccountPage;
