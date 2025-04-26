import React, { useState, useEffect } from "react";
import { IoMdArrowRoundDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  addAddress,
  verifyAddress,
} from "../../../ReduxStateManagement/slices/addressSlice";
import { RxLapTimer } from "react-icons/rx";
import usdtImg from "../../../images/usdtImg.svg";
import xrpImg from "../../../images/xrpImg.svg";

const AddressDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get addresses from Redux store
  const addresses = useSelector((state) => state.addresses.addresses);

  // State for new addresses
  const [newAddresses, setNewAddresses] = useState({
    usdt: "",
    xrp: "",
  });

  const [editingAddress, setEditingAddress] = useState({
    usdt: false,
    xrp: false,
  });

  // State for validation errors
  const [addressErrors, setAddressErrors] = useState({
    usdt: "",
    xrp: "",
  });

  // State for address fee warning
  const [showFeeWarning, setShowFeeWarning] = useState(false);
  const [addressToChange, setAddressToChange] = useState(null);

  // State for countdown timers
  const [timeRemaining, setTimeRemaining] = useState({
    usdt: null,
    xrp: null,
  });

  // Function to check and verify addresses after 24 hours
  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeRemaining = { ...timeRemaining };
      let needUpdate = false;

      Object.entries(addresses).forEach(([type, addressData]) => {
        if (addressData?.addedAt && !addressData.isVerified) {
          const addedTime = new Date(addressData.addedAt).getTime();
          const currentTime = new Date().getTime();
          const verificationTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
          const remainingMs = addedTime + verificationTime - currentTime;

          // Update the remaining time
          updatedTimeRemaining[type] = remainingMs > 0 ? remainingMs : 0;
          needUpdate = true;

          // If time is up, verify the address
          if (remainingMs <= 0) {
            dispatch(verifyAddress({ type }));
          }
        } else {
          updatedTimeRemaining[type] = null;
        }
      });

      // Only update state if needed to prevent unnecessary re-renders
      if (needUpdate) {
        setTimeRemaining(updatedTimeRemaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [addresses, dispatch]);

  const handleAddressChange = (type, value) => {
    setNewAddresses({
      ...newAddresses,
      [type]: value,
    });

    // Clear error when user starts typing
    if (addressErrors[type]) {
      setAddressErrors({
        ...addressErrors,
        [type]: "",
      });
    }
  };

  const validateAddress = (type, address) => {
    if (!address || address.length < 20) {
      const errorMessage =
        type === "usdt"
          ? "Please add correct BEP20 Address (min characters above 20)"
          : "Please add correct XRP Address (min characters above 20)";

      setAddressErrors({
        ...addressErrors,
        [type]: errorMessage,
      });
      return false;
    }
    return true;
  };

  const handleAddAddress = (type) => {
    // Check if this is a fee-required change that was previously confirmed
    const requiresFee =
      addressToChange === type && addresses[type]?.changeCount >= 3;

    // If not editing and there's already a verified address, enable edit mode
    if (
      !editingAddress[type] &&
      addresses[type]?.address &&
      addresses[type]?.isVerified
    ) {
      // Before enabling edit mode, check if this would exceed the free changes limit
      if (addresses[type]?.changeCount >= 3 && !requiresFee) {
        setAddressToChange(type);
        setShowFeeWarning(true);
        return;
      }

      setEditingAddress({
        ...editingAddress,
        [type]: true,
      });
      return;
    }

    // Validate address first
    if (!validateAddress(type, newAddresses[type])) {
      return;
    }

    // If this change requires a fee and the user hasn't confirmed yet
    if (addresses[type]?.changeCount >= 3 && !requiresFee) {
      setAddressToChange(type);
      setShowFeeWarning(true);
      return;
    }

    // First address can always be added
    if (!addresses[type]?.address) {
      submitAddress(type);
      return;
    }

    // Can only change address if it's already verified
    if (!addresses[type]?.isVerified) {
      return; // Can't change an address that's still being verified
    }

    submitAddress(type);

    // Reset address to change if this was the one requiring a fee
    if (addressToChange === type) {
      setAddressToChange(null);
    }

    // Reset editing state
    setEditingAddress({
      ...editingAddress,
      [type]: false,
    });
  };

  const submitAddress = (type) => {
    // Dispatch action to add/update address
    dispatch(
      addAddress({
        type,
        address: newAddresses[type],
      })
    );

    // Reset input field
    setNewAddresses({
      ...newAddresses,
      [type]: "",
    });

    // Reset editing state
    setEditingAddress({
      ...editingAddress,
      [type]: false,
    });
  };

  const cancelEditing = (type) => {
    setEditingAddress({
      ...editingAddress,
      [type]: false,
    });
    setNewAddresses({
      ...newAddresses,
      [type]: "",
    });
  };

  const confirmAddressChange = () => {
    if (addressToChange) {
      // If the user has already entered a new address in the input field
      if (
        newAddresses[addressToChange] &&
        newAddresses[addressToChange].length > 0
      ) {
        // Validate address first
        if (!validateAddress(addressToChange, newAddresses[addressToChange])) {
          return;
        }

        // Here, you would implement the actual fee deduction logic
        console.log("$1 fee deducted for address change");

        // Submit the address change
        submitAddress(addressToChange);
      } else {
        // If no address was entered yet, enable editing mode for this address
        setEditingAddress({
          ...editingAddress,
          [addressToChange]: true,
        });
      }

      // Close the modal
      setShowFeeWarning(false);
    }
  };

  const cancelAddressChange = () => {
    setShowFeeWarning(false);
    setAddressToChange(null);

    // Also reset editing state for the address
    if (addressToChange) {
      setEditingAddress({
        ...editingAddress,
        [addressToChange]: false,
      });

      // Reset the input field
      setNewAddresses({
        ...newAddresses,
        [addressToChange]: "",
      });
    }
  };

  const formatRemainingTime = (type) => {
    const remainingMs = timeRemaining[type];

    if (remainingMs === null || remainingMs <= 0) return null;

    const hours = Math.floor(remainingMs / (60 * 60 * 1000));
    const minutes = Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((remainingMs % (60 * 1000)) / 1000);

    return `${hours.toString().padStart(2, "0")}H ${minutes
      .toString()
      .padStart(2, "0")}M ${seconds.toString().padStart(2, "0")}S`;
  };

  return (
    <div className="max-w-xl mx-auto h-screen bg-gradient-to-b from-[#000621] via-[#0a0e2e] to-[#141539] text-white">
      {/* Header */}
      <motion.header className="top-0 left-0 z-30 transition-all duration-300">
        <div className="px-4 sm:px-6 pt-6 pb-14 flex justify-between items-center">
          <div className="flex items-center">
            <motion.button
              onClick={() => navigate("/user/account")}
              className="mr-4 bg-[#070d25]/80 p-2 rounded-lg border border-blue-500/20"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoMdArrowRoundDown className="text-xl transform rotate-90 text-blue-400" />
            </motion.button>
            <h1 className="text-2xl font-bold text-blue-400">
              Address Details
            </h1>
          </div>
        </div>
      </motion.header>
      <div className="flex flex-col items-center px-4 sm:px-6">
        {/* USDT Address Section */}
        <div className="w-full bg-gray-800/40 rounded-2xl border border-blue-400 px-2 sm:px-4 pb-4 mb-10 sm:mb-12 relative">
          <div className="flex items-center ">
            <div className="relative -top-6 sm:-top-8 w-18 sm:w-22 h-18 sm:h-22  flex items-center justify-center mr-3">
              <img src={usdtImg} alt="usdt Image" />
            </div>
            <span className="text-xl font-bold">USDT BEP 20</span>
          </div>

          {addresses.usdt?.address && !editingAddress.usdt ? (
            <div className="">
              <div className="bg-[#08062d] p-3 rounded-3xl flex justify-between items-center">
                <div className="truncate pr-2">{addresses.usdt.address}</div>
                {addresses.usdt.isVerified && (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-2xl"
                    onClick={() => handleAddAddress("usdt")}
                  >
                    Change
                  </button>
                )}
              </div>

              {addresses.usdt.isVerified ? (
                <div className="flex items-center text-green-400 mt-2">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Address Verified
                </div>
              ) : (
                <div className="flex flex-row items-center gap-6 mt-2">
                  <div className="text-yellow-500 ">Address Adding...</div>
                  <div className="text-gray-200 flex items-center gap-1">
                    <RxLapTimer /> {formatRemainingTime("usdt")}
                  </div>
                </div>
              )}

              <div className="text-sm text-gray-400 mt-1">
                {addresses.usdt.changeCount}/3 Changed
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <div className="bg-[#08062d] px-2 py-1 sm:py-2 rounded-full flex items-center">
                <input
                  type="text"
                  value={newAddresses.usdt}
                  onChange={(e) => handleAddressChange("usdt", e.target.value)}
                  placeholder="Enter USDT BEP 20 address"
                  className="bg-transparent border-none outline-none w-full withdraw-input"
                />

                <div className="flex">
                  {editingAddress.usdt && (
                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white text-sm px-3 py-[3px] sm:py-1 rounded-full mr-2"
                      onClick={() => cancelEditing("usdt")}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-6 sm:px-5 py-[3px] sm:py-1 rounded-full"
                    onClick={() => handleAddAddress("usdt")}
                    disabled={!newAddresses.usdt}
                  >
                    {editingAddress.usdt ? "Save" : "Add"}
                  </button>
                </div>
              </div>
              {addressErrors.usdt && (
                <div className="text-red-500 mt-2 pl-2">
                  {addressErrors.usdt}
                </div>
              )}
            </div>
          )}
        </div>

        {/* XRP Address Section */}
        <div className="w-full bg-gray-800/40 rounded-2xl border border-blue-400 px-2 sm:px-4 pb-4  mb-10 relative">
          <div className="flex items-center">
            <div className="relative -top-6 sm:-top-8 w-18 sm:w-22 h-18 sm:h-22  flex items-center justify-center mr-3">
              <img src={xrpImg} alt="xrp Image" />
            </div>
            <span className="text-xl font-bold">XRP (Ledger)</span>
          </div>

          {addresses.xrp?.address && !editingAddress.xrp ? (
            <div className="">
              <div className="bg-[#07062d] p-3 rounded-3xl flex justify-between items-center">
                <div className="truncate pr-2">{addresses.xrp.address}</div>
                {addresses.xrp.isVerified && (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-2xl"
                    onClick={() => handleAddAddress("xrp")}
                  >
                    Change
                  </button>
                )}
              </div>

              {addresses.xrp.isVerified ? (
                <div className="flex items-center text-green-400 mt-2">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Address Verified
                </div>
              ) : (
                <div className="flex flex-row items-center gap-6 mt-2">
                  <div className="text-yellow-500 ">Address Adding...</div>
                  <div className="text-gray-200 flex items-center gap-1">
                    <RxLapTimer /> {formatRemainingTime("xrp")}
                  </div>
                </div>
              )}

              <div className="text-sm text-gray-400 mt-1">
                {addresses.xrp.changeCount}/3 Changed
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <div className="bg-[#08062d] px-2 py-1 sm:py-2 rounded-full flex items-center">
                <input
                  type="text"
                  value={newAddresses.xrp}
                  onChange={(e) => handleAddressChange("xrp", e.target.value)}
                  placeholder="Enter XRP Ledger address"
                  className="bg-transparent border-none outline-none w-full withdraw-input"
                />
               <div className="flex">
                  {editingAddress.xrp && (
                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white text-sm px-3 py-[3px] sm:py-1 rounded-full mr-2"
                      onClick={() => cancelEditing("xrp")}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-6 sm:px-5 py-[3px] sm:py-1 rounded-full"
                    onClick={() => handleAddAddress("xrp")}
                    disabled={!newAddresses.xrp}
                  >
                    {editingAddress.xrp ? "Save" : "Add"}
                  </button>
                </div>
              </div>
              {addressErrors.xrp && (
                <div className="text-red-500 mt-2 pl-2">
                  {addressErrors.xrp}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/user/account/withdraw")}
          className="flex flex-row items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-2xl font-bold button-glow shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Back to Withdrawal
        </button>

        {/* Fee Warning Modal */}
        {showFeeWarning && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs bg-opacity-75 flex items-center justify-center z-50 max-w-xl mx-auto">
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg max-w-sm w-full m-3">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
                Address Change Fee
              </h3>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                You have already changed this address 3 times. Additional
                changes will incur a $1 fee from your Withdrawal Wallet. Do you
                want to continue?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-3 sm:px-4 py-[6px] sm:py-2 text-sm sm:text-base bg-gray-700 rounded-md"
                  onClick={cancelAddressChange}
                >
                  Cancel
                </button>
                <button
                  className="px-3 sm:px-4 py-[6px] sm:py-2 text-sm sm:text-base bg-blue-500 rounded-md"
                  onClick={confirmAddressChange}
                >
                  Pay $1 and Change
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressDetailPage;
