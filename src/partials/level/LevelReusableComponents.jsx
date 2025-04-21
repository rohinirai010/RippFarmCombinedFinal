import { Lock } from "lucide-react";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { GrUnlock } from "react-icons/gr";
import { MdOutlineTipsAndUpdates } from "react-icons/md";


// Reusable components

export const StatCard = ({ label, value, icon = null }) => (
    <div className="flex flex-col">
      <span className="text-[#9ba2d6] font-semibold text-[10px] sm:text-[13px]">{label}</span>
      <div className="flex items-center">
        {icon && (
         
            <span className="text-blue-300 text-[11px] sm:text-xl mr-2">{<BsFillPersonLinesFill />}</span>
          
        )}
        <span className={`${icon ? "text-xl sm:text-4xl text-[#a2ade4]" : "text-xl sm:text-4xl text-[#6e7cbe]"} font-bold`}>
          {value}
        </span>
      </div>
    </div>
  );
  
 export const PackageOption = ({ packageKey, packageInfo, isActive, onClick }) => (
    <div 
      className={`p-3 rounded-lg cursor-pointer ${isActive ? 'bg-blue-900/70 border border-blue-500' : 'bg-blue-900/30'}`}
      onClick={() => onClick(packageKey)}
    >
      <div className="flex justify-between items-center sm:block">
        <div>
          <h3 className="text-blue-300 text-sm mb-1">{packageInfo.name}</h3>
          <div className="flex items-end sm:block">
            <p className="text-xl text-blue-200">{packageInfo.dailyReturn}</p>
            <p className="text-xs text-blue-300/70 ml-1 sm:ml-0 mb-1 sm:mb-0">PER DAY</p>
          </div>
        </div>
        <p className="text-sm text-blue-300 sm:mt-2">{packageInfo.range}</p>
      </div>
    </div>
  );
  
 export const TierLevel = ({ level, unlocked }) => (
    <div 
      className={`flex justify-between items-center px-3 py-1 sm:py-2 rounded-4xl ${
        unlocked ? 'bg-gradient-to-r from-[#0d1333] via-[#28305a] to-[#0d1333] border border-[#3b497e]' : 'bg-gray-800/60'
      }`}
    >
      <div className="flex items-center">
        {unlocked ? (
          <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center mr-3">
            <GrUnlock size={16} className="text-gray-200"/>
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-3">
            <Lock size={16} className="text-gray-400" />
          </div>
        )}
        <div>
          <span className={unlocked ? 'text-blue-300 font-medium text-lg' : 'text-gray-400'}>
            Tier {level.level}
          </span>
          {unlocked && (
            <div className="flex flex-row items-center justify-center gap-8 sm:gap-0 sm:mt-2">
              <div className="flex items-center  sm:mb-0 sm:mr-12">
                <span className="text-blue-300 text-sm sm:text-base mr-2"><BsFillPersonLinesFill /></span>
                <span className="text-xl sm:text-3xl text-blue-300">{level.members}</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-300 text-base sm:mr-2">$</span>
                <span className="text-xl sm:text-3xl text-blue-300">{level.bonus}</span>
              </div>
            </div>
          )}
          {!unlocked && (
            <div className="flex flex-row items-center justify-center gap-8 sm:gap-0 sm:mt-2">
              <div className="flex items-center mb-2 sm:mb-0 sm:mr-12">
                <span className="text-gray-500 text-base mr-2"><BsFillPersonLinesFill /></span>
                <span className="text-xl sm:text-3xl text-gray-500">-</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 text-base mr-2">$</span>
                <span className="text-xl sm:text-3xl text-gray-500">-</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <span className={unlocked ? 'text-blue-300 font-bold' : 'text-gray-400'}>
        {level.percent}
      </span>
    </div>
  );
  
 export const InfoModal = ({ onClose, packageDetails }) => (
    <div 
      className="fixed inset-0 z-50 max-w-xl mx-auto flex items-center justify-center bg-black/30 backdrop-blur-xs bg-opacity-70"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gradient-to-b from-[#061758] to-[#0d1233] p-3 sm:p-6 rounded-xl border border-[#4b4a92] max-w-md m-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold text-[#afb7f9]">Wealth Tier Info</h3>
          <button 
            onClick={onClose}
            className="text-[#afb7f9] hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-3">
          <p className="text-[#a8b1f9] text-sm">Wealth Tiers are earned as you build your network and increase your team size.</p>
          <p className="text-[#a8b1f9] text-sm">Important points:</p>
          <ul className="list-disc pl-5 text-[#a8b1f9] space-y-1 text-[13px] tracking-wide">
            <li>Higher packages unlock more tier levels</li>
            <li>Each tier provides percentage bonuses on team activity</li>
            <li>Unlocked tiers provide passive income</li>
            <li>Team statistics update daily</li>
            <li>Upgrade your package to unlock more tiers</li>
          </ul>
          {Object.entries(packageDetails).map(([key, pkg]) => (
            <p key={key} className="text-[#a8b1f9] text-sm">
              <span className="font-bold">{pkg.name}:</span> Unlocks {pkg.unlockedLevels} tiers
            </p>
          ))}
        </div>
      </div>
    </div>
  );

  export const UpgradeBar = ({ packageName, onUpgrade }) => (
      <div className="fixed bottom-19 sm:bottom-21 left-0 right-0 max-w-xl mx-auto bg-gradient-to-tl from-[#570e0c] via-[#570e0c] to-[#bf5b58] px-3 py-1 sm:py-2 flex justify-between items-center z-30 shadow-lg">
        <div className="flex items-center">
          <div className=" bg-[#2e0404] rounded-full h-7 sm:h-9 w-7 sm:w-9 p-1 flex items-center justify-center mr-2 ">
          <MdOutlineTipsAndUpdates className="text-white w-5 sm:w-6 h-5 sm:h-6" />
          </div>
          <div>
            <p className="font-bold text-white text-xs sm:text-sm">Upgrade with <span className="font-extrabold">{packageName}</span></p>
            <p className="text-[11px] sm:text-xs text-white/80">to never miss your tier bonus again</p>
          </div>
        </div>
        <button 
          className="bg-[#2e0404] hover:bg-[#491e1e] text-[#ca5250] hover:text-[white] border border-[#ca5250] px-3 sm:px-5 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer shadow-xs shadow-[#ca5250f1]/70"
          onClick={onUpgrade}
        >
          Upgrade
        </button>
      </div>
    );
  