import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActivePackageType } from "../../ReduxStateManagement/slices/packageSlice";
import { ArrowLeft, HelpCircle, Lock, Shield, TrendingUp, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PackageCard, ViewAllButton } from "../../partials/dashboard/HelperComponents";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../../partials/Footer";

// Main component
const LivePackagePage = () => {
    const [activeTab, setActiveTab] = useState("live");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activePackageType } = useSelector((state) => state.packageDetail);

  // Package data
   const packages = [
     {
       id: 1,
       icon: <Zap size={18} />,
       title: "Ignite",
       subtitle: "Fund",
       activeCount: 2,
       link: "/user/package/igniteFund"
     },
     {
       id: 2,
       icon: <TrendingUp size={18} />,
       title: "Elevate",
       subtitle: "Plus",
       activeCount: 4,
       link: "/user/package/elevatePlus"
     },
     {
       id: 3,
       icon: <Shield size={18} />,
       title: "Legacy",
       subtitle: "Vault",
       activeCount: 1,
       link: "/user/package/legacyVault"
     },
   ];


  


  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto bg-gradient-to-b from-[#0b104e] via-[#080c26] to-[#060e22] text-white relative">
      {/* Header */}
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft className="text-white" />
        </button>
        <h1 className="text-2xl font-semibold text-blue-300 flex-1 text-center">
          Packages
        </h1>
        
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20 px-4 sm:px-10 mt-8">
         {/* Packages */}
         <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 md:mb-8"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-base text-gray-300">Our Packages</p>
              
            </div>
            <div className="grid grid-cols-3 sm:gap-2">
              {packages.map((pkg, index) => (
                <PackageCard
                  key={pkg.id}
                  icon={pkg.icon}
                  title={pkg.title}
                  subtitle={pkg.subtitle}
                  activeCount={pkg.activeCount}
                  index={index}
                  link={`/user/package/start/${pkg.link.split('/').pop()}`}
                />
              ))}
            </div>
          </motion.div>
      </div>

      <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
        </motion.div>

    </div>
  );
};

export default LivePackagePage;
