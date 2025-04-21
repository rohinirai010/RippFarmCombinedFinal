import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdArrowRoundDown } from "react-icons/io";
import Footer from "../../../partials/Footer";
import bgLogo from "../../../images/accountPageLogo.png";
import ODLImg from "../../../images/ODlbg.png";
import { Section } from "../../../partials/account/AccountsPageReusableComponents";

const AccountInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { activatedPackages } = useSelector((state) => state.packageDetail);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("account");

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

  const openWhatsApp = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  const getUserDetails = () => {
    // visible fields from registration
    const details = [
      { label: "Username", value: user?.username },
      { label: "Full Name", value: user?.fullName },
      { label: "Email", value: user?.email },
      { label: "Mobile", value: user?.mobile },
      { label: "Sponsor ID", value: user?.sponsorId },
    ];

    // Added optional hidden fields 
    if (user?.firstName) details.push({ label: "First Name", value: user.firstName });
    if (user?.lastName) details.push({ label: "Last Name", value: user.lastName });
    if (user?.gender) details.push({ label: "Gender", value: user.gender });
    if (user?.birthdate) details.push({ label: "Birthdate", value: user.birthdate });
    if (user?.panCardNo) details.push({ label: "PAN Card No", value: user.panCardNo });
    
    // Add registration date if available
    if (user?.createdAt) {
      details.push({ 
        label: "Registration Date", 
        value: new Date(user.createdAt).toLocaleDateString() 
      });
    }

    return details;
  };

  // Render each user detail field
  const DetailField = ({ label, value }) => (
    <div className="flex flex-col w-full">
      <span className="text-gray-400 text-sm mb-1">{label}:</span>
      <div className="bg-[#061758]/70 backdrop-blur-md rounded-2xl w-full flex items-center px-4 py-3 border border-blue-500/20 mb-4">
        <h1 className="bg-transparent border-none outline-none text-blue-300">{value}</h1>
      </div>
    </div>
  );

  return (
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

      {/* Header */}
      <motion.header className="sticky top-0 z-30 transition-all duration-300">
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
            <h1 className="text-xl font-semibold text-blue-300">Account Details</h1>
          </div>
        </div>
      </motion.header>

      {/* User Profile */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="p-4 z-10 border-b border-blue-500/10"
      >
        <div className="flex flex-col sm:flex-row items-center w-full">
          {/* Info and Actions */}
          <div className="sm:mt-0 sm:ml-4 flex-grow w-full sm:w-[80%]">
            <div className="flex flex-row gap-5  sm:gap-8 items-center justify-center">
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
              <div className="flex flex-col">
                <div className="flex flex-row gap-4">
                  <h2 className="font-bold text-2xl sm:text-3xl text-[#b5befa] text-center">
                    {user?.username || "RippFarm User"}
                  </h2>
                  <h2
                    className={`rounded-4xl px-4 sm:px-6 flex items-center text-sm sm:text-base font-medium shadow-md z-20 ${
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
          </div>
        </div>
      </motion.div>

      {/* Main Content Sections */}
      <div className="px-4 sm:px-6 overflow-y-auto pb-24 z-10 mt-5 sm:space-y-6">
        {/* Personal Information Section */}
        <div className="w-full flex flex-col items-center justify-center px-3 py-4 rounded-4xl bg-gradient-to-r from-[#14173d] via-[#282f5b] to-[#12153b] border-t-1 border-r-1 border-[#3b497e] shadow-lg">
          <Section title="Personal Information" />
          <div className="w-full mt-2 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-4">
            {getUserDetails().map((detail, index) => (
              <DetailField key={index} label={detail.label} value={detail.value} />
            ))}
          </div>
         
        </div>
      </div>

      {/* Footer */}
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

export default AccountInfo;