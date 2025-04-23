import React, { useState } from "react";
import { IoMdArrowRoundDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FaqPage = () => {
  const navigate = useNavigate();
  
  // FAQ data
  const faqItems = [
    {
      id: 1,
      question: "How long does address verification take?",
      answer: "Address verification takes 24 hours from the time of submission. During this period, you won't be able to modify the address. Once verified, you can change your address up to 3 times for free."
    },
    {
      id: 2,
      question: "What is USDT BEP 20?",
      answer: "USDT BEP 20 is a version of Tether (USDT) that operates on Binance Smart Chain. It offers faster transaction speeds and lower fees compared to USDT on the Ethereum network."
    },
    {
      id: 3,
      question: "What happens after I've changed my address 3 times?",
      answer: "After you've changed your address 3 times, additional changes will incur a $1 fee that will be deducted from your Withdrawal Wallet."
    },
    {
      id: 4,
      question: "Can I add multiple addresses for the same cryptocurrency?",
      answer: "No, you can only have one active address per cryptocurrency at a time. If you need to use a different address, you can change your existing one."
    },
    {
      id: 5,
      question: "Is there a fee for withdrawals?",
      answer: "Withdrawal fees vary depending on the cryptocurrency and network congestion. The exact fee will be displayed before you confirm your withdrawal."
    }
  ];

  // State to track which accordion items are open
  const [openItems, setOpenItems] = useState({});

  // Toggle accordion item
  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="max-w-xl mx-auto h-screen bg-gradient-to-b from-[#000621] via-[#0a0e2e] to-[#141539] text-white">
      {/* Header */}
      <motion.header className="top-0 left-0 z-30 transition-all duration-300">
        <div className="px-4 sm:px-6 pt-6 pb-10 sm:pb-14 flex justify-between items-center">
          <div className="flex items-center">
            <motion.button
              onClick={() => navigate("/user/account")}
              className="mr-4 bg-[#070d25]/80 p-2 rounded-lg border border-blue-500/20"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoMdArrowRoundDown className="text-xl transform rotate-90 text-blue-400" />
            </motion.button>
            <h1 className="text-lg sm:text-2xl font-bold text-blue-400">
              Frequently Asked Questions
            </h1>
          </div>
        </div>
      </motion.header>

      <div className="flex flex-col items-center px-4 sm:px-6 pb-18">
        {/* FAQ Accordions */}
        {faqItems.map((item) => (
          <div 
            key={item.id}
            className="w-full bg-gray-800/40 rounded-2xl border border-blue-400 px-2 sm:px-6 py-2 sm:py-4 mb-4 overflow-hidden"
          >
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleItem(item.id)}
            >
              <h3 className="text-[15px] sm:text-lg font-semibold text-blue-300">{item.question}</h3>
              <motion.div
                animate={{ rotate: openItems[item.id] ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-blue-400"
              >
                <IoMdArrowRoundDown />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: openItems[item.id] ? "auto" : 0,
                opacity: openItems[item.id] ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-3 text-gray-300 text-sm sm:text-base">
                {item.answer}
              </div>
            </motion.div>
          </div>
        ))}

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-5 flex flex-row items-center gap-2 px-16 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-2xl font-bold button-glow shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default FaqPage;