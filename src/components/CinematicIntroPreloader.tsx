"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface CinematicIntroPreloaderProps {
  onComplete: () => void;
}

export default function CinematicIntroPreloader({ onComplete }: CinematicIntroPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Smooth high-frequency progress counter from 0 to 100%
    const startTime = Date.now();
    const duration = 2600; // 2.6 seconds total

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          handleEnter();
        }, 300);
      }
    }, 25);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleEnter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  // Status message determined by progress
  const getStatusText = (p: number) => {
    if (p < 25) return "INITIALIZING SYSTEM CORE...";
    if (p < 50) return "SYNCING MOTION GRAPHICS & AUDIO LAYERS...";
    if (p < 75) return "CALIBRATING 4K TIMELINES & REELS...";
    if (p < 95) return "FINALIZING PIYUSH KUMAR GUPTA WORKSPACE...";
    return "WORKSPACE READY. ENTERING...";
  };

  return (
    <div
      onClick={handleEnter}
      className={`fixed inset-0 z-[100] bg-[#050508] flex flex-col items-center justify-center select-none overflow-hidden cursor-pointer transition-all duration-700 ${
        isExiting ? "opacity-0 scale-105 pointer-events-none filter blur-sm" : "opacity-100 scale-100"
      }`}
    >
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-900/20 via-indigo-600/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

      {/* Floating Top-Right Skip Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleEnter();
        }}
        className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-neutral-300 hover:text-white text-xs font-mono tracking-wider transition-all duration-300 backdrop-blur-md flex items-center gap-2 hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
      >
        <span>SKIP INTRO</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-2xl px-4 sm:px-6 flex flex-col items-center pointer-events-none">
        
        {/* Top Story Quote Header (Razor-sharp 100% crisp vector typography) */}
        <div className="text-center mb-6 sm:mb-8 space-y-1 animate-fade-in">
          <p className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight italic drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Resume gets you shortlisted.
          </p>
          <p className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight italic flex items-center justify-center gap-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            <span>Portfolio gets you hired.</span>
            <span className="inline-block text-2xl not-italic filter drop-shadow">💼🔥</span>
          </p>
        </div>

        {/* Crisp High-Definition Laptop Workstation Frame */}
        <div className="w-full max-w-[560px] rounded-2xl bg-neutral-950 border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(147,51,234,0.15)] overflow-hidden transition-transform duration-500">
          
          {/* Laptop Screen Bezel */}
          <div className="p-3 sm:p-4 bg-gradient-to-b from-[#181820] to-[#0c0c12] border-b border-white/10">
            
            {/* Screen Inner Display (100% Sharp OLED Feel) */}
            <div className="relative rounded-xl bg-gradient-to-b from-[#13111c] via-[#0d0c14] to-[#08070d] border border-white/10 p-6 sm:p-10 flex flex-col items-center justify-between min-h-[290px] sm:min-h-[330px] overflow-hidden">
              
              {/* Screen Ambient Backlight */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 bg-purple-600/15 rounded-full blur-[80px] pointer-events-none" />

              {/* Screen Top System Bar */}
              <div className="w-full flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-widest text-neutral-400 border-b border-white/5 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span className="text-neutral-300 font-semibold uppercase">INITIALIZING SYSTEM</span>
                </div>
                <span className="text-neutral-500 uppercase">PORTFOLIO // V2.6</span>
              </div>

              {/* Screen Core Identity */}
              <div className="text-center my-auto space-y-2 py-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white tracking-[0.18em] drop-shadow-[0_0_25px_rgba(255,255,255,0.35)]">
                  PIYUSH KUMAR GUPTA
                </h1>
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-purple-300/90 drop-shadow">
                  VIDEO EDITOR &amp; MOTION DESIGNER
                </p>

                {/* Animated Percentage Counter */}
                <div className="pt-3 sm:pt-4">
                  <div className="text-5xl sm:text-6xl md:text-7xl font-bold font-mono tracking-tight text-white/95 drop-shadow-[0_0_35px_rgba(168,85,247,0.45)]">
                    {progress}%
                  </div>
                </div>
              </div>

              {/* Screen Bottom Loading Track & Status */}
              <div className="w-full space-y-2.5 pt-2">
                {/* Slim Gradient Progress Bar */}
                <div className="w-full h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(168,85,247,0.9)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Dynamic Status Text */}
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-neutral-400">
                  <span className="text-neutral-300 truncate tracking-wider">
                    {getStatusText(progress)}
                  </span>
                  <span className="text-purple-400 font-bold ml-2 shrink-0">
                    {progress}%
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Laptop Bottom Base / Keyboard Notch Simulation */}
          <div className="h-4 sm:h-5 bg-gradient-to-b from-[#1c1c24] to-[#0e0e14] flex items-center justify-center border-t border-white/5">
            <div className="w-16 sm:w-20 h-1 rounded-full bg-white/20" />
          </div>

        </div>

        {/* Bottom Hint */}
        <p className="mt-5 text-[11px] font-mono text-neutral-500 tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>Click anywhere or press ENTER to skip</span>
        </p>

      </div>
    </div>
  );
}
