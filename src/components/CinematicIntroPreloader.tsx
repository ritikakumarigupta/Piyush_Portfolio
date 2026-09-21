"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Terminal, Sparkles, CheckCircle2 } from "lucide-react";

interface CinematicIntroPreloaderProps {
  onComplete: () => void;
}

export default function CinematicIntroPreloader({ onComplete }: CinematicIntroPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SYSTEM...");
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Smooth cinematic progress counter
    const startTime = Date.now();
    const duration = 2600; // 2.6 seconds total intro

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      setProgress(pct);

      if (pct < 25) {
        setStatusText("INITIALIZING SYSTEM ARCHITECTURE...");
      } else if (pct < 55) {
        setStatusText("CALIBRATING 4K REELS AND COLOR SCIENCE...");
      } else if (pct < 85) {
        setStatusText("SYNCING MOTION GRAPHICS AND AUDIO LAYERS...");
      } else if (pct < 100) {
        setStatusText("FINALIZING VOLUMETRIC LIGHTING AND VFX...");
      } else {
        setStatusText("SYSTEM READY // ACCESS GRANTED");
        setIsReady(true);
        clearInterval(timer);
        
        // Auto transition into portfolio after brief pause at 100%
        setTimeout(() => {
          handleEnter();
        }, 600);
      }
    }, 25);

    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center select-none overflow-hidden transition-all duration-700 ${
        isExiting ? "opacity-0 scale-105 pointer-events-none filter blur-sm" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Ambient Radial Purple and Indigo Bloom */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[500px] bg-radial from-purple-900/25 via-indigo-950/15 to-transparent blur-[120px] pointer-events-none" />
      
      {/* Subtle Scanline CRT Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "100% 3px"
        }}
      />

      {/* Top Header: Skip Button and Terminal Status */}
      <div className="absolute top-6 inset-x-6 sm:inset-x-10 flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Terminal className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-neutral-300 uppercase">
            // KARMAYOG PIPELINE v2.6
          </span>
        </div>

        <button
          onClick={handleEnter}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg"
        >
          <span>SKIP INTRO</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Center Cinematic Showcase Area */}
      <div className="relative z-10 w-full max-w-lg sm:max-w-xl px-4 flex flex-col items-center text-center space-y-6">
        
        {/* Exact Top Hook Text from User Screenshot */}
        <div className="space-y-1 animate-fade-in">
          <h1 className="font-archivo text-xl sm:text-2xl lg:text-3xl font-black italic tracking-tight text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.35)]">
            Resume gets you shortlisted.
          </h1>
          <h2 className="font-archivo text-xl sm:text-2xl lg:text-3xl font-black italic tracking-tight text-white flex items-center justify-center gap-2 drop-shadow-[0_2px_15px_rgba(255,255,255,0.35)]">
            <span>Portfolio gets you hired.</span>
            <span className="not-italic">💼🔥</span>
          </h2>
        </div>

        {/* The 3D Angled Laptop Frame Display */}
        <div className="relative w-full aspect-[497/450] sm:aspect-[497/420] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.95)] bg-[#09090b] group">
          
          {/* Static Realistic 3D Laptop Perspective Image with Piyush Kumar Gupta */}
          <Image
            src="/assets/piyush_portfolio_laptop_reel.png"
            alt="Piyush Kumar Gupta Laptop Preloader"
            fill
            priority
            className="object-cover object-center filter brightness-[1.03] contrast-[1.05]"
          />

          {/* Dynamic Live Glowing Percentage Overlay (Tilted to match screen perspective) */}
          <div 
            className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center"
            style={{
              transform: "perspective(800px) rotateX(12deg) rotateY(-8deg) rotateZ(1.5deg)",
            }}
          >
            {/* Live Progress Bar Layer over the Laptop Screen */}
            <div className="absolute bottom-[28%] sm:bottom-[30%] left-[22%] right-[22%] h-1 sm:h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <div 
                className="h-full bg-gradient-to-r from-purple-300 via-white to-purple-200 transition-all duration-75 shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Live Changing Status Text right below the bar */}
            <div className="absolute bottom-[21%] sm:bottom-[23%] left-[18%] right-[18%] flex items-center justify-between text-[8px] sm:text-[10px] font-mono tracking-wider text-neutral-300">
              <span className="truncate">{statusText}</span>
              <span className="text-white font-bold ml-2 shrink-0">{progress}%</span>
            </div>
          </div>

          {/* Interactive Screen Tap Ripple / Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Status Tracker & Quick Launch Action */}
        <div className="w-full space-y-3 pt-2">
          {/* Main Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span className="text-neutral-300">{statusText}</span>
            </span>
            <span className="font-bold font-mono text-white tracking-widest text-sm">
              {progress}%
            </span>
          </div>

          {/* Smooth Global Bar */}
          <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-emerald-400 to-white transition-all duration-75 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Big Action Button */}
          <div className="pt-2">
            <button
              onClick={handleEnter}
              className={`px-8 py-3 rounded-full font-archivo text-xs uppercase tracking-widest font-black transition-all duration-300 shadow-xl flex items-center gap-2 mx-auto ${
                isReady
                  ? "bg-white text-black hover:bg-neutral-200 hover:scale-105 shadow-white/20 animate-pulse"
                  : "bg-white/10 text-neutral-300 hover:bg-white/20 border border-white/10"
              }`}
            >
              <span>{isReady ? "ENTER PORTFOLIO NOW" : "INITIALIZING WORKSPACE..."}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
