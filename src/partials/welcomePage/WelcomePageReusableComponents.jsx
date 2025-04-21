import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaLongArrowAltRight } from "react-icons/fa";

// Reusable components 
export const AnimatedStar = ({ size, delay, position, isRotated = false }) => (
    <motion.div 
      className={`absolute ${position} ${isRotated ? 'rotate-12' : ''}`}
      animate={{ 
        scale: [1, size === 'lg' ? 1.2 : 1.15, 1], 
        opacity: [size === 'lg' ? 0.4 : 0.2, size === 'lg' ? 1 : 0.6, size === 'lg' ? 0.4 : 0.2],
        y: isRotated ? [0, -5, 0] : undefined
      }}
      transition={{ 
        duration: size === 'lg' ? 4 : 3, 
        repeat: Infinity, 
        delay,
        repeatType: "mirror" 
      }}
    >
      <div className={`text-[#8196f5] ${size === 'lg' ? 'text-5xl' : size === 'md' ? 'text-2xl' : 'text-lg'}`}>
        {size === 'lg' ? '✦' : '✧'}
      </div>
    </motion.div>
  );
  
 export const DataStream = ({ position, delay, height }) => (
    <div className={`absolute h-full w-1 ${position} top-0 opacity-10`}>
      <motion.div 
        className={`w-full h-${height} bg-gradient-to-b from-transparent via-blue-500 to-transparent`}
        animate={{ y: [-100, 500] }}
        transition={{ 
          duration: delay > 1 ? 5 : 7, 
          repeat: Infinity, 
          repeatType: "loop", 
          ease: "linear", 
          delay 
        }}
      />
    </div>
  );
  
 export const FlowingLine = ({ position, delay }) => (
    <motion.div 
      className={`absolute ${position} w-1 h-${delay > 1 ? '16' : '12'} bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-${delay > 1 ? '20' : '30'}`}
      animate={{ 
        opacity: [delay > 1 ? 0.1 : 0.2, delay > 1 ? 0.3 : 0.4, delay > 1 ? 0.1 : 0.2], 
        y: [0, delay > 1 ? 15 : 10, 0] 
      }}
      transition={{ duration: delay > 1 ? 6 : 5, repeat: Infinity, delay }}
    />
  );
  
 export const CornerGlow = ({ position, delay = 0, isProfile = false }) => (
    <motion.div
      className={`absolute ${position} w-${isProfile ? '16' : delay > 0 ? '24' : '16'} h-${isProfile ? '16' : delay > 0 ? '24' : '16'} 
      border-${position.includes('bottom') ? 'b' : 't'} 
      border-${position.includes('right') ? 'r' : 'l'} 
      border-${isProfile ? 'blue-500/40' : 'white'} 
      opacity-${delay > 0 ? (delay > 1 ? '20' : '10') : (isProfile ? '' : '30')} 
      ${position.includes('bottom') && position.includes('right') ? 'rounded-br-xl' : 
        position.includes('bottom') ? 'rounded-bl-full' : 
        position.includes('right') ? 'rounded-tr-full' : 
        isProfile ? 'rounded-tl-xl' : 'rounded-tl-full'}`}
      animate={isProfile ? {
        opacity: [0, 0.7, 0.2],
        boxShadow: [
          "0 0 0px rgba(59,130,246,0)", 
          "0 0 10px rgba(59,130,246,0.3)", 
          "0 0 5px rgba(59,130,246,0.1)"
        ]
      } : 
      delay > 0 ? { opacity: [delay > 1 ? 0.05 : 0.1, delay > 1 ? 0.15 : 0.25, delay > 1 ? 0.05 : 0.1] } : undefined}
      transition={{ duration: isProfile ? 2.5 : (delay > 1 ? 6 : 4), repeat: Infinity, delay }}
    />
  );
  
 export const TypingCursor = ({ show, height = 'h-4' }) => (
    <motion.span 
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className={`ml-1 inline-block w-1 ${height} bg-blue-300 align-middle`}
    />
  );
  
 export const ActivityIndicator = ({ isLoading }) => (
    <motion.div 
      className=" flex space-x-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0.8 : 0.4 }}
      transition={{ duration: 0.5, delay: isLoading ? 0 : 1.5 }}
    >
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="w-1 h-1 bg-blue-500 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            delay: dot * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
  
  //  TypeWriter Effect Hook 
 export const useTypewriter = (text, delay = 10, dependencies = [], startCondition = true) => {
    const [displayedText, setDisplayedText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    
    useEffect(() => {
      let timeout;
      if (startCondition && textIndex < text.length) {
        timeout = setTimeout(() => {
          setDisplayedText(prev => prev + text[textIndex]);
          setTextIndex(prev => prev + 1);
        }, delay);
        return () => clearTimeout(timeout);
      } else if (startCondition && textIndex === text.length) {
        setIsComplete(true);
      }
      return () => clearTimeout(timeout);
    }, [textIndex, text, delay, startCondition, ...dependencies]);
    
    return { displayedText, isComplete, textIndex };
  };
  
  
  
  //  ProfileShimmer Component
  export const ProfileShimmer = () => (
    <>
      {Array(8).fill(0).map((_, index) => (
        <motion.div 
          key={index}
          className="flex justify-between border-b border-blue-500 border-opacity-30 pb-2 relative overflow-hidden"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }}
        >
          {/* Shimmer effect animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
            animate={{ x: [-200, 300] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "linear",
              repeatDelay: 0.5
            }}
          />
          
          {/* Shimmer placeholder */}
          <div className="h-5 w-20 bg-blue-500/10 rounded-md"></div>
          <div className="h-5 w-32 bg-blue-500/10 rounded-md"></div>
        </motion.div>
      ))}
    </>
  );
  
  // ProfileData Component 
  export const ProfileData = ({ user }) => {
    const profileData = useMemo(() => {
      return {
        'Username': user.username,
        'Password': user.password,
        'Full Name': user.fullName,
        'Email': user.email,
        'Mobile': user.mobile,
        'Sponsor ID': user.sponsorId,
        'First Name': user.firstName,
        'Last Name': user.lastName,
        'Gender': user.gender,
        'Birthdate': user.birthdate,
        'PAN Card': user.panCardNo
      };
    }, [user]);
    
    return (
      <>
        {Object.entries(profileData)
          .filter(([_, value]) => value)
          .map(([label, value], index) => (
            <motion.div 
              key={label}
              className="flex justify-between border-b border-blue-500 border-opacity-30 relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
            >
              {/* Subtle highlight sweep animation - reduced animation complexity */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
                initial={{ x: -200, opacity: 0 }}
                animate={{ 
                  x: [-200, 300, 300],
                  opacity: [0, 0.7, 0]
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: 0.4 + (index * 0.15), 
                  ease: "easeInOut"
                }}
              />
              
              <span className="text-sm sm:text-base text-gray-300">{label}</span>
              <motion.span 
                className="text-sm sm:text-base font-medium"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  color: [
                    "rgb(191, 219, 254)", // Light blue
                    "rgb(255, 255, 255)", // White
                    "rgb(191, 219, 254)"  // Back to light blue
                  ]
                }}
                transition={{ 
                  opacity: { duration: 0.3, delay: 0.5 + (index * 0.12) },
                  color: { delay: 0.5 + (index * 0.12), duration: 2.5 }
                }}
              >
                {value}
              </motion.span>
            </motion.div>
          ))}
      </>
    );
  };


// Swipe Button Component
export const SwipeButton = ({ onSwipeComplete }) => {
    const x = useMotionValue(0);
    const width = useTransform(x, [0, 240], ["0%", "100%"]);
    const dragOpacity = useTransform(x, [0, 240], [1, 0]);
    const rotate = useTransform(x, [0, 240], [0, 90]);
  
    const handleDragEnd = (event, info) => {
      if (info.offset.x >= 240) {
        onSwipeComplete();
      }
    };
  
    return (
      <div className="relative mb-8 mt-8">
        {/* Main button container */}
        <motion.div
          className="relative w-[80%]  sm:max-w-sm mx-auto h-14 sm:h-16 border-2 border-blue-500 bg-gradient-to-r from-[#020424] to-[#0a1a4d] backdrop-blur-sm rounded-full overflow-hidden shadow-lg shadow-blue-500/30"
          whileHover={{ boxShadow: "0 0 25px rgba(59,130,246,0.4)" }}
          animate={{
            boxShadow: [
              "0 4px 16px rgba(59,130,246,0.2)",
              "0 4px 24px rgba(59,130,246,0.4)",
              "0 4px 16px rgba(59,130,246,0.2)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Animated shimmer effect */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["100% 0%", "-100% 0%"],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
  
          {/* Pulsating background glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-400/20 to-blue-500/10 rounded-full"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.98, 1, 0.98],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
  
         
  
          {/* Swipe text */}
          <div className="absolute inset-0 flex items-center justify-center ml-8 sm:ml-0">
            <motion.div
              style={{ opacity: dragOpacity }}
              className="text-white uppercase tracking-wider text-sm sm:text-base z-10 font-medium"
              animate={{
                
                textShadow: [
                  "0 0 4px rgba(255,255,255,0.3)",
                  "0 0 8px rgba(255,255,255,0.6)",
                  "0 0 4px rgba(255,255,255,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SWIPE TO CONTINUE
            </motion.div>
          </div>
  
          {/* Draggable handle */}
          <motion.div
            className="absolute left-1 top-0 bottom-0 w-12 sm:w-14 h-12 sm:h-14 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-400 rounded-full cursor-grab active:cursor-grabbing z-20 shadow-md shadow-blue-500/50 mt-[1.5px]"
            drag="x"
            dragConstraints={{ left: 0, right: 240 }}
            style={{ x }}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.1 }}
           
            animate={{
              x: [0, 15, 0],
              boxShadow: [
                "0 0 10px rgba(59,130,246,0.5)",
                "0 0 20px rgba(59,130,246,0.8)",
                "0 0 10px rgba(59,130,246,0.5)",
              ],
            }}
            transition={{
              x: {
                duration: 1.4,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              },
              boxShadow: {
                duration: 1.5,
                repeat: Infinity,
              },
            }}
          >
            {/* Inner glowing effect for the handle */}
            <motion.div
              className="absolute inset-1 bg-gradient-to-r from-blue-300 to-blue-200 rounded-full opacity-50"
              animate={{ 
                opacity: [0.5, 0.8, 0.5] 
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            
            {/* Inner glow pulse */}
            <motion.div
              className="absolute inset-2 bg-white rounded-full"
              animate={{ 
                opacity: [0.1, 0.4, 0.1],
                scale: [0.8, 1.1, 0.8]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            <motion.div 
              style={{ rotate }} 
              className="text-xl text-blue-900 font-bold"
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <FaLongArrowAltRight />
            </motion.div>
          </motion.div>
  
          {/* Progress indicator */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-500/40 to-blue-400/20 h-full rounded-full"
            style={{ width }}
          />
        </motion.div>
  
        {/* Pulsating instruction text */}
        <motion.div 
          className="absolute -bottom-8 left-0 right-0 flex justify-center"
          animate={{
            y: [0, -2, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.p
            className="text-center text-xs tracking-wide text-blue-400"
            animate={{ 
              opacity: [0.7, 1, 0.7],
              textShadow: [
                "0 0 4px rgba(59,130,246,0.3)",
                "0 0 8px rgba(59,130,246,0.5)",
                "0 0 4px rgba(59,130,246,0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Slide to access your dashboard
          </motion.p>
        </motion.div>
      </div>
    );
  };