import React, { useState, useEffect } from 'react';
import loaderimg from "../../images/rippfarm-white-logo.png";

const Loader = ({ onLoaderComplete }) => {
  const [count, setCount] = useState(0);
  const [showBackground, setShowBackground] = useState(false);
  const [isDone, setIsDone] = useState(false); // add a separate state to trigger callback

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= 100) {
          clearInterval(timer);
          setIsDone(true); // set flag instead of calling directly
          return prevCount;
        }
        return prevCount + 1;
      });
    }, 40);

    const bgTimer = setTimeout(() => {
      setShowBackground(true);
    }, 500);

    return () => {
      clearInterval(timer);
      clearTimeout(bgTimer);
    };
  }, []);

  // ⏱️ Separate effect just for completion callback
  useEffect(() => {
    if (isDone) {
      onLoaderComplete(); // ✅ safe to call here
    }
  }, [isDone, onLoaderComplete]);

  return (
    <div className="preloader fixed inset-0 bg-primary flex items-center justify-center overflow-hidden z-50">
      {showBackground && (
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="w-[400px] h-[400px] rounded-full bg-gradient-light blur-3xl opacity-70 animate-fade-in"></div>
        </div>
      )}

      <div className="loadercontainer relative z-10 flex flex-col justify-between items-center h-full w-full mx-auto ">
        <div className="w-full flex justify-between items-center pt-10 px-4">
          <h2 className="loaderTitle !text-[15px] lg:text-[22px] leading-tight font-normal">
            Loading <br /> Your Experience
          </h2>
          <p className="Counter text-[70px] lg:text-[112px] font-normal">{count}%</p>
        </div>

        <div className="Loaderimgwrapper mt-10 px-10">
          <img src={loaderimg} alt="Loading" className="max-w-[100%] md:max-w-[35%] mx-auto"  />
        </div>

        <div className="lineparent relative w-full py-20 flex justify-center">
          <div className="flex flex-col mb-[50px] items-center px-4 md:flex-row md:justify-between md:text-left w-full">
            <div>
              <p className="light-bg">Farming Program</p>
            </div>
            <div>
              <p className="light-bg">Powering Success Stories Worldwide</p>
            </div>
            <div>
              <p className="light-bg">Begin Your Experience The Easy Way</p>
            </div>
          </div>
          <div className="h-[2px] absolute top-1/2 left-0 w-0 mt-[30px] rounded-full line-gradient animate-line-expand md:mt-[50px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
