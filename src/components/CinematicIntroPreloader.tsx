"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Volume2 } from "lucide-react";

interface CinematicIntroPreloaderProps {
  onComplete: () => void;
}

export default function CinematicIntroPreloader({ onComplete }: CinematicIntroPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Global Audio Unlocker for Mobile Browsers (iOS Safari / Android Chrome)
  const unlockMobileAudio = () => {
    try {
      if (typeof window !== "undefined") {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          if (ctx.state === "suspended") {
            ctx.resume().catch(() => {});
          }
        }
      }
    } catch {}
  };

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
    unlockMobileAudio();
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
      onTouchStart={unlockMobileAudio}
      className={`fixed inset-0 z-[100] w-full h-full min-h-screen min-h-[100dvh] bg-[#050508] flex flex-col justify-between select-none overflow-hidden cursor-pointer transition-all duration-700 ${
        isExiting ? "opacity-0 scale-105 pointer-events-none filter blur-sm" : "opacity-100 scale-100"
      }`}
    >
      {/* Cinematic Ambient Glow filling entire screen */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[80vh] max-w-[1000px] max-h-[800px] bg-gradient-to-tr from-purple-900/25 via-indigo-600/20 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

      {/* TOP SYSTEM & BRAND BAR (Edge to Edge Full Size) */}
      <header className="relative z-20 w-full px-4 sm:px-8 pt-4 sm:pt-6 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2.5 text-[10px] sm:text-xs font-mono tracking-widest text-neutral-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
          <span className="text-neutral-200 font-semibold uppercase">INITIALIZING SYSTEM</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-[10px] sm:text-xs font-mono tracking-widest text-neutral-500 uppercase">
            PORTFOLIO // V2.6
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEnter();
            }}
            className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-neutral-200 hover:text-white text-xs font-mono tracking-wider transition-all duration-300 backdrop-blur-md flex items-center gap-1.5 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <span>SKIP INTRO</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* FULL-SIZE HERO CONTENT (Covers entire screen cleanly) */}
      <main className="relative z-10 w-full flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-6 my-auto pointer-events-none">
        
        {/* Top Story Quote Header */}
        <div className="text-center mb-6 sm:mb-10 space-y-1.5 animate-fade-in max-w-xl">
          <p className="text-white font-extrabold text-2xl sm:text-4xl md:text-5xl tracking-tight italic drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
            Resume gets you shortlisted.
          </p>
          <p className="text-white font-extrabold text-2xl sm:text-4xl md:text-5xl tracking-tight italic flex items-center justify-center gap-2 sm:gap-3 drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
            <span>Portfolio gets you hired.</span>
            <span className="inline-block text-2xl sm:text-4xl not-italic filter drop-shadow">💼🔥</span>
          </p>
        </div>

        {/* Identity & Live Animated Metrics (Full Size Screen Experience) */}
        <div className="w-full max-w-2xl flex flex-col items-center text-center space-y-3 sm:space-y-4">
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-[0.16em] sm:tracking-[0.22em] drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]">
            PIYUSH KUMAR GUPTA
          </h1>

          <p className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.3em] sm:tracking-[0.38em] text-purple-300/90 drop-shadow">
            VIDEO EDITOR &amp; MOTION DESIGNER
          </p>

          {/* Huge Animated Percentage Counter */}
          <div className="py-2 sm:py-4">
            <div className="text-6xl sm:text-8xl md:text-9xl font-black font-mono tracking-tight text-white drop-shadow-[0_0_45px_rgba(168,85,247,0.55)]">
              {progress}%
            </div>
          </div>

          {/* Full-Width Glowing Progress Bar */}
          <div className="w-full max-w-xl sm:max-w-2xl space-y-3 pt-2">
            <div className="w-full h-2.5 sm:h-3.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/20 backdrop-blur-md shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 rounded-full transition-all duration-75 shadow-[0_0_16px_rgba(168,85,247,0.95)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Dynamic Status Text */}
            <div className="w-full flex items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-300 px-1">
              <span className="truncate tracking-wider font-medium">
                {getStatusText(progress)}
              </span>
              <span className="text-purple-400 font-bold ml-3 shrink-0">
                {progress}%
              </span>
            </div>
          </div>

        </div>

      </main>

      {/* FOOTER BAR (Full Screen Bottom Hint & Sound Enable) */}
      <footer className="relative z-20 w-full px-4 sm:px-8 pb-4 sm:pb-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center pointer-events-none">
        <p className="text-[11px] sm:text-xs font-mono text-neutral-400 tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>Tap anywhere or press ENTER to enter</span>
        </p>

        <p className="text-[10px] sm:text-[11px] font-mono text-neutral-500 tracking-wider flex items-center gap-1">
          <Volume2 className="w-3 h-3 text-emerald-400" />
          <span>Audio engine automatically primed for mobile</span>
        </p>
      </footer>
    </div>
  );
}
