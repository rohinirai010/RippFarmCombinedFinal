import React, { useState } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { X, Mic } from "lucide-react";

const CardDesign = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow p-4 sm:p-6 flex items-center justify-center">
          <div className="w-full max-w-md h-full max-h-[35rem] rounded-3xl overflow-hidden relative shadow-2xl border-2 border-[#224375]" style={{
            background: "linear-gradient(to bottom, #12315c, #0c1c35, #0a1933, #032796,#0c1c35 )",
            boxShadow: "0 0 40px rgba(0, 89, 255, 0.15)"
          }}>
            
            
            {/* Content */}
            <div className="p-8 text-white">
              <p className="text-3xl font-light leading-relaxed tracking-wide" style={{ color: "#adbac7" }}>
                Hey, GBT, I need your help on one of my new projects that's about the <span className="font-normal text-white">organizing</span>
                <span className="inline-flex space-x-1 ml-1">
                  <span className="h-2 w-2 bg-white rounded-full animate-pulse"></span>
                  <span className="h-2 w-2 bg-white rounded-full animate-pulse delay-100"></span>
                  <span className="h-2 w-2 bg-white rounded-full animate-pulse delay-200"></span>
                </span>
              </p>
            </div>
            
            {/* Wave animation - adjusted colors to match image */}
            <div className="absolute bottom-36 left-0 right-0 flex justify-center overflow-hidden h-24">
              <div className="relative w-full">
                {/* Multiple wave lines with different opacities and animations */}
                <div className="absolute w-full h-28 opacity-30">
                  <svg className="w-full" viewBox="0 0 600 100" preserveAspectRatio="none">
                    <path d="M0,50 C100,20 200,80 300,50 C400,20 500,80 600,50" stroke="#75a9ff" fill="none" strokeWidth="1.5" />
                  </svg>
                </div>
                <div className="absolute w-full h-28 opacity-20">
                  <svg className="w-full" viewBox="0 0 600 100" preserveAspectRatio="none">
                    <path d="M0,60 C150,20 250,80 350,60 C450,20 550,80 600,60" stroke="#ffffff" fill="none" strokeWidth="1.5" />
                  </svg>
                </div>
                <div className="absolute w-full h-28 opacity-60">
                  <svg className="w-full" viewBox="0 0 600 100" preserveAspectRatio="none">
                    <path d="M0,40 C120,80 280,20 400,40 C520,80 580,20 600,40" stroke="#3d85ff" fill="none" strokeWidth="2" />
                  </svg>
                </div>
                <div className="absolute w-full h-28 opacity-90">
                  <svg className="w-full" viewBox="0 0 600 100" preserveAspectRatio="none">
                    <path d="M0,50 C80,30 160,70 240,50 C320,30 400,70 480,50 C560,30 600,70 600,50" stroke="#3d85ff" fill="none" strokeWidth="2.5" />
                    <filter id="blur-filter">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                    </filter>
                    <path d="M0,50 C80,30 160,70 240,50 C320,30 400,70 480,50 C560,30 600,70 600,50" stroke="#ffffff" strokeWidth="1" opacity="0.8" filter="url(#blur-filter)" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Bottom glow effect - adjusted to match image */}
            <div className="absolute -bottom-8 left-0 right-0 h-54 opacity-10" style={{
              background: "radial-gradient(circle, rgba(30, 90, 255, 0.9) 0%, rgba(30, 90, 255, 0.15) 60%, transparent 100%)"
            }}></div>
            
            {/* Dots pattern with improved colors */}
            <div className="absolute bottom-0 left-0 right-0 h-48 overflow-hidden">
              <div className="relative w-full h-full">
                <svg width="100%" height="100%" viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <radialGradient id="dotGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                      <stop offset="0%" stopColor="#4d85ff" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#4d85ff" stopOpacity="0.1" />
                    </radialGradient>
                  </defs>
                  
                  {/* Generate evenly spaced grid of dots with proper alignment */}
                  {Array.from({ length: 12 }).map((_, y) => (
                    Array.from({ length: 20 }).map((_, x) => {
                      const posX = 10 + x * 20;
                      const posY = 10 + y * 10;
                      
                      const centerX = 200;
                      const centerY = 60;
                      const distance = Math.sqrt(Math.pow(posX - centerX, 2) + Math.pow(posY - centerY, 2));
                      const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY * 2, 2));
                      
                      const opacity = Math.max(0.3, 0.15 - (distance / maxDistance * 0.9));
                      
                      const isHighlighted = Math.random() > 0.92;
                      const size = isHighlighted ? 0.8 : 0.5;
                      
                      return (
                        <circle 
                          key={`dot-${x}-${y}`}
                          cx={posX} 
                          cy={posY} 
                          r={size}
                          fill={isHighlighted ? "#ffffff" : "#4d85ff"}
                          opacity={opacity * (isHighlighted ? 1 : 0.7)}
                        />
                      );
                    })
                  ))}
                </svg>
              </div>
            </div>
            
            {/* Mic button with enhanced glow */}
            <div className="absolute bottom-16 left-0 right-0 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full opacity-80" style={{
                  boxShadow: "0 0 25px 10px rgba(30, 90, 255, 0.7)",
                  transform: "scale(1.3)"
                }}></div>
                <button className="relative bg-white rounded-full p-5 shadow-lg z-10">
                  <Mic size={26} className="text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CardDesign;