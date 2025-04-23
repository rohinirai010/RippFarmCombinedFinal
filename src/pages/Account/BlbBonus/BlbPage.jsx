import { useState, useRef, useEffect } from "react";
import { ChevronLeft, Check, Circle, Award, ChevronDown } from "lucide-react";
import { TbHexagonFilled } from "react-icons/tb";
import leafLeftImg from "../../../images/leafLeftImg.png";
import leafRightImg from "../../../images/leafRightImg.png";
import BlbReport from "./BlbReport";

export default function BLBPage() {
  const [activeTab, setActiveTab] = useState("bonus");
  const [currentSlabInput, setCurrentSlabInput] = useState("8");
  const slabRefs = useRef({});
  // state to track which congratulation cards are visible
  const [hiddenCongrats, setHiddenCongrats] = useState({});

  // BLB data structure
  const blbData = {
    currentTier: 5000,
    totalPAXBonus: 2500,
    holdBonus: 1000,
    currentHoldAmount: 1000,
    lockedAmountAhead: 175000,
    slabs: [
      {
        id: 1,
        bonus: 100,
        status: "success",
        progress: 100,
        currentEarning: 100,
        required: 100,
        legs: [],
      },
      {
        id: 2,
        bonus: 250,
        status: "success",
        progress: 100,
        currentEarning: 250,
        required: 250,
        legs: [],
      },
      {
        id: 3,
        bonus: 500,
        status: "success",
        progress: 100,
        currentEarning: 500,
        required: 500,
        legs: [
          { legId: 1, required: 1667, current: 1667, progress: 100 },
          { legId: 2, required: 1667, current: 1667, progress: 100 },
        ],
      },
      {
        id: 4,
        bonus: 1000,
        status: "success",
        progress: 100,
        currentEarning: 1000,
        required: 1000,
        legs: [
          { legId: 1, required: 1667, current: 1667, progress: 100 },
          { legId: 2, required: 1667, current: 1667, progress: 100 },
          { legId: 3, required: 1667, current: 1667, progress: 100 },
        ],
      },
      {
        id: 5,
        bonus: 2500,
        status: "success",
        progress: 100,
        currentEarning: 2500,
        required: 2500,
        legs: [
          { legId: 1, required: 1667, current: 1667, progress: 100 },
          { legId: 2, required: 1667, current: 1667, progress: 100 },
          { legId: 3, required: 1667, current: 1667, progress: 100 },
        ],
      },
      {
        id: 6,
        bonus: 5000,
        status: "success",
        progress: 100,
        currentEarning: 5000,
        required: 5000,
        legs: [
          { legId: 1, required: 1667, current: 1667, progress: 100 },
          { legId: 2, required: 1667, current: 1667, progress: 100 },
          { legId: 3, required: 1667, current: 1667, progress: 100 },
        ],
      },
      {
        id: 7,
        bonus: 10000,
        status: "success",
        progress: 100,
        currentEarning: 10000,
        required: 10000,
        legs: [
          { legId: 1, required: 10000, current: 10000, progress: 100 },
          { legId: 2, required: 10000, current: 10000, progress: 100 },
          { legId: 3, required: 10000, current: 10000, progress: 100 },
          { legId: 4, required: 10000, current: 10000, progress: 100 },
        ],
      },
      {
        id: 8,
        bonus: 25000,
        status: "in-progress",
        progress: 27,
        currentEarning: 7000,
        required: 25000,
        legs: [
          { legId: 1, required: 10000, current: 8800, progress: 88 },
          { legId: 2, required: 10000, current: 3000, progress: 30 },
          { legId: 3, required: 10000, current: 5200, progress: 52 },
          { legId: 4, required: 10000, current: 10000, progress: 100 },
        ],
      },
      {
        id: 9,
        bonus: 50000,
        status: "not-started",
        progress: 0,
        currentEarning: 0,
        required: 50000,
        legs: [
          { legId: 1, required: 10000, current: 0, progress: 0 },
          { legId: 2, required: 10000, current: 0, progress: 0 },
          { legId: 3, required: 10000, current: 0, progress: 0 },
          { legId: 4, required: 10000, current: 0, progress: 0 },
          { legId: 5, required: 10000, current: 0, progress: 0 },
        ],
      },
      {
        id: 10,
        bonus: 100000,
        status: "not-started",
        progress: 0,
        currentEarning: 0,
        required: 100000,
        legs: [
          { legId: 1, required: 25000, current: 0, progress: 0 },
          { legId: 2, required: 25000, current: 0, progress: 0 },
          { legId: 3, required: 25000, current: 0, progress: 0 },
          { legId: 4, required: 12500, current: 0, progress: 0 },
          { legId: 5, required: 12500, current: 0, progress: 0 },
        ],
      },
    ],
  };

  // Function to scroll to the specified slab
  const scrollToSlab = (slabId) => {
    if (slabRefs.current[slabId]) {
      slabRefs.current[slabId].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Handle view button click
  const handleViewSlab = () => {
    const slabId = parseInt(currentSlabInput);
    if (slabId >= 1 && slabId <= blbData.slabs.length) {
      scrollToSlab(slabId);
    }
  };

  // State to track if a slab is currently being "completed"
  const [simulating, setSimulating] = useState(false);

  return (
    <div className="min-h-screen max-w-xl mx-auto bg-gradient-to-b from-[#000621] via-[#0a0e2e] to-[#141539] text-white">
      {/* Header */}
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/user/account" className="mr-3">
            <ChevronLeft size={24} />
          </a>
          <h1 className="text-xl font-bold">BLB Program</h1>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="px-4 mb-4">
        <div className="bg-indigo-900/40 rounded-full p-1 flex w-48 sm:w-64 mx-auto">
          <button
            onClick={() => setActiveTab("bonus")}
            className={`flex-1 py-1 sm:py-2 rounded-full text-center transition-all duration-300 ${
              activeTab === "bonus"
                ? " bg-gradient-to-r from-blue-500 to-cyan-400  rounded-2xl font-bold button-glow shadow-lg hover:shadow-xl transform hover:scale-105 text-white "
                : "text-indigo-200"
            }`}
          >
            Bonus
          </button>
          <button
            onClick={() => setActiveTab("report")}
            className={`flex-1 py-1 sm:py-2 rounded-full text-center transition-all duration-300 ${
              activeTab === "report"
                ? "bg-gradient-to-r from-blue-500 to-cyan-400  rounded-2xl font-bold button-glow shadow-lg hover:shadow-xl transform hover:scale-105 text-white "
                : "text-indigo-200"
            }`}
          >
            Report
          </button>
        </div>
      </div>

      {/* Bonus Tab Content */}
      {activeTab === "bonus" && (
        <div className="p-4">
          {/* Beyond Limit Bonus Header */}
          <div className="mb-8 ml-4">
            <h2 className="text-2xl sm:text-4xl font-bold mb-1">
              Beyond Limit Bonus
            </h2>
            <p className="text-gray-300 text-[13px] sm:text-sm">
              Keep growing and aim for the next BLB slab!
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-gradient-to-br from-[#001956] to-[#0036b7] rounded-3xl px-4 sm:px-7 py-3 sm:py-4 mb-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-3">
              BLB Stats & Earning Details
            </h3>

            <div className="flex gap-2 sm:gap-4 mb-4">
              <div className="bg-indigo-100 text-indigo-900 rounded-2xl p-2 sm:p-4 flex-1">
                <div className="text-[13px] sm:text-base">Current Tier</div>
                <div className="text-2xl sm:text-3xl font-bold">
                  {blbData.currentTier.toLocaleString()}
                </div>
              </div>

              <div className="bg-[#000e30] rounded-2xl p-2 sm:p-4 flex-1">
                <div className="text-[12px] sm:text-sm text-indigo-200">
                  Total paid Bonus
                </div>
                <div className="text-2xl sm:text-3xl font-bold">
                  {blbData.totalPAXBonus.toLocaleString()}
                </div>
              </div>

              <div className="bg-[#4c0c0e] rounded-2xl p-2 sm:p-4 flex-1">
                <div className="text-[12px] sm:text-sm text-gray-100">
                  HOLD Bonus
                </div>
                <div className="text-2xl sm:text-3xl font-bold">
                  {blbData.holdBonus.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="">
              <h4 className="mb-2 text-[17px] sm:text-lg font-bold">
                Summary Details
              </h4>
              <div className="flex items-center mb-1">
                <span className="text-yellow-500 mr-2">★</span>
                <span className="text-sm sm:text-base tracking-wider">
                  Current Hold Amount: $
                  {blbData.currentHoldAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-indigo-400 mr-2">🔒</span>
                <span className="text-sm sm:text-base tracking-wider">
                  Locked Amount Ahead: $
                  {blbData.lockedAmountAhead.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Current BLB Slab Input */}
          <div className="flex justify-between items-center mb-4 sm:pl-4">
            <div className="flex items-center">
              <h3 className="text-xl sm:text-2xl font-bold mr-2 sm:mr-3">
                Current BLB Slab :{" "}
              </h3>
              <div className="relative">
                <input
                  type="number"
                  value={currentSlabInput}
                  onChange={(e) => setCurrentSlabInput(e.target.value)}
                  min="1"
                  max={blbData.slabs.length}
                  className="bg-indigo-900 border border-indigo-500 rounded-lg w-10 sm:w-16 text-center sm:px-2 py-1 text-white"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleViewSlab}
                className="bg-gray-200 text-indigo-900 rounded-full px-4 sm:px-6 py-[3px] sm:py-[5px] font-medium cursor-pointer hover:bg-white transition-colors"
              >
                View
              </button>
            </div>
          </div>

          {/* BLB Slabs */}
          <div className="space-y-4">
            {blbData.slabs.map((slab) => (
              <div
                key={slab.id}
                ref={(el) => (slabRefs.current[slab.id] = el)}
                data-slab-id={slab.id}
                className="border border-[#4fc0e1] bg-gradient-to-br from-[#1d2062] via-[#111349] to-[#010529] rounded-4xl overflow-hidden relative py-4"
              >
                {/* Congratulations Card - shows automatically when status is success and not hidden */}
                {slab.status === "success" && !hiddenCongrats[slab.id] && (
                  <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#1d2062] via-[#111349] to-[#010529] rounded-4xl flex flex-col items-center justify-center text-center p-6 animate-fade-in">
                    <div className="border-3 border-[#9392f8] rounded-full p-1 sm:p-2 mb-3">
                      <Check size={36} className="text-[#9392f8]" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold  text-[#9392f8]">
                      Congratulations!
                    </h3>
                    <p className="text-xl sm:text-2xl font-semibold mb-2 text-[#9392f8] px-3 sm:px-0">
                      BLB{slab.id} Milestone Achieved!
                    </p>
                    <p className="text-[15px] text-indigo-100">
                      You've Successfully Unlocked Your $
                      {slab.bonus.toLocaleString()} BLB Bonus!
                    </p>
                    <img
                      src={leafLeftImg}
                      alt="Left Leaf Image"
                      className="h-20 absolute left-6 sm:left-17"
                    />
                    <img
                      src={leafRightImg}
                      alt="Left Leaf Image"
                      className="h-20 absolute right-6 sm:right-17"
                    />
                  </div>
                )}

                <div className="px-2 sm:px-8 py-3">
                  <div className="flex justify-between mb-1 border-b border-gray-500 pb-1">
                    <h4 className="text-xl sm:text-3xl font-bold">
                      BLB {slab.id}
                    </h4>
                    <div className="flex items-center">
                      <span className="text-sm sm:text-base mr-2 sm:mr-3">
                        Status:{" "}
                      </span>
                      {slab.status === "success" && (
                        <span className="flex items-center text-white">
                          <Check className="mr-1 border p-[2px] w-5 h-5 bg-green-600 rounded-xl" />{" "}
                          Success
                        </span>
                      )}
                      {slab.status === "in-progress" && (
                        <span className="flex items-center text-yellow-400 text-sm sm:text-base">
                          <Circle className="mr-1 w-3 sm:w-5 h-3 sm:h-5 fill-yellow-400" />{" "}
                          In Progress
                        </span>
                      )}
                      {slab.status === "not-started" && (
                        <span className="flex items-center text-red-400 text-sm sm:text-base">
                          <Circle className="mr-1 w-3 sm:w-5 h-3 sm:h-5 fill-red-400" />{" "}
                          Not Started
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between mt-2 mb-3">
                    <h5 className="text-[22px] font-bold">
                      Bonus ${slab.bonus.toLocaleString()}
                    </h5>

                    {slab.legs.length > 0 ? (
                      <div className="text-[13px] text-gray-300">
                        <div className="flex items-center">
                          <span className="inline-block w-2 h-2 bg-indigo-400 mr-1"></span>
                          <span>
                            Overall Progress: $
                            {slab.currentEarning.toLocaleString()} / $
                            {slab.bonus.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-block w-2 h-2 bg-purple-400 mr-1"></span>
                          <span>
                            Qualified Legs:{" "}
                            {
                              slab.legs.filter((leg) => leg.progress === 100)
                                .length
                            }{" "}
                            / {slab.legs.length}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-[13px] text-gray-300">
                        <div className="flex items-center">
                          <span className="inline-block w-2 h-2 bg-indigo-400 mr-1"></span>
                          <span>
                            Overall Progress: $
                            {slab.currentEarning.toLocaleString()} / $
                            {slab.required.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Simple BLB Slabs (1-2) */}
                  {slab.legs.length === 0 && (
                    <div className="grid grid-cols-4 gap-x-2 sm:gap-x-8 gap-y-1 bg-[#000e30] rounded-2xl px-2 sm:px-4 py-2 mt-3">
                      <div className="text-xs">Required</div>
                      <div className="text-xs">Current Earning</div>
                      <div className="text-xs">Progress</div>
                      <div className="text-xs">Status</div>

                      <div>$ {slab.required.toLocaleString()}</div>
                      <div>$ {slab.currentEarning.toLocaleString()}</div>
                      <div className="relative pt-2">
                        <div className="overflow-hidden h-[13px] text-xs flex rounded-3xl bg-gray-200">
                          <div
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center border border-white rounded-3xl ${
                              slab.status === "success"
                                ? "bg-gradient-to-r from-[#71f38f] via-[#67d73b] to-[#53b32c]"
                                : slab.status === "in-progress"
                                ? "bg-gradient-to-r from-[#fbd84a] to-[#def74c]"
                                : "bg-gradient-to-r from-[#ed3a4d] to-[#7e191c]"
                            }`}
                            style={{ width: `${slab.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div
                        className={`
                        ${
                          slab.status === "success"
                            ? "text-green-400 font-bold"
                            : slab.status === "in-progress"
                            ? "bg-gradient-to-r from-[#fbd84a] to-[#def74c] "
                            : "text-gray-400"
                        }
                      `}
                      >
                        {slab.progress}%
                      </div>
                    </div>
                  )}

                  {/* Complex BLB Slabs (3-10) with legs */}
                  {slab.legs.length > 0 && (
                    <div className="space-y-[7px]">
                      {slab.legs.map((leg) => (
                        <div
                          key={`${slab.id}-${leg.legId}`}
                          className="grid grid-cols-5 gap-x-2 sm:gap-x-6 bg-[#000e30] rounded-2xl  sm:px-4 py-2 text-sm"
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-xs">Leg {leg.legId}</span>
                            <span className="text-indigo-400 mr-1 mt-[3px] text-xs sm:text-sm">
                              👤
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <div className="text-xs">Required</div>
                            <div className="text-[13px] sm:text-base mt-[2px]">
                              $ {leg.required.toLocaleString()}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="text-xs">Current</div>
                            <div className="text-[13px] sm:text-base mt-[2px]">
                              $ {leg.current.toLocaleString()}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="text-xs">Progress</div>
                            <div className="relative pt-2">
                              <div className="overflow-hidden h-[13px] text-xs flex border border-white rounded-3xl bg-gray-200">
                                <div
                                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                    leg.progress >= 100
                                      ? "bg-gradient-to-r from-[#71f38f] via-[#67d73b] to-[#53b32c]"
                                      : leg.progress >= 50
                                      ? "bg-gradient-to-r from-[#fbd84a] to-[#def74c]"
                                      : leg.progress > 0
                                      ? "bg-gradient-to-r from-[#ed3a4d] to-[#7e191c]"
                                      : "bg-gray-600"
                                  }`}
                                  style={{ width: `${leg.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="text-xs">Status</div>
                            <div
                              className={`text-[14px] sm:text-base font-bold mt-[2px] ${
                                leg.progress >= 100
                                  ? "text-green-400"
                                  : leg.progress >= 50
                                  ? "text-yellow-400"
                                  : leg.progress > 0
                                  ? "text-red-400"
                                  : "text-gray-400"
                              }`}
                            >
                              {leg.progress}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Report Tab Content */}
      {activeTab === "report" && <BlbReport />}

      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .rounded-4xl {
          border-radius: 1.5rem;
        }
      `}</style>
    </div>
  );
}