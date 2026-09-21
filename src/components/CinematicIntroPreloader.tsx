"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Maximize2, Minimize2, Play, Pause, Volume2, VolumeX, ArrowRight } from "lucide-react";

interface CinematicIntroPreloaderProps {
  onComplete: () => void;
}

export default function CinematicIntroPreloader({ onComplete }: CinematicIntroPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const startTime = Date.now();
    const duration = 2500; // 2.5s loading cycle

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          handleEnter();
        }, 500);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center select-none overflow-hidden transition-all duration-700 ${
        isExiting ? "opacity-0 scale-105 pointer-events-none filter blur-sm" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Ambient Radial Purple Glow */}
      <div className="absolute inset-0 bg-radial from-purple-950/20 via-black to-black pointer-events-none" />

      {/* Floating Top-Right Skip Button */}
      <button
        onClick={handleEnter}
        className="absolute top-4 right-4 z-50 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono tracking-wider transition-all backdrop-blur-md flex items-center gap-1.5 hover:scale-105"
      >
        <span>SKIP INTRO</span>
        <ArrowRight className="w-3 h-3" />
      </button>

      {/* Main Exact Framing Matching media_1790000280566.png */}
      <div className="relative w-full max-w-[455px] h-full max-h-[92vh] aspect-[455/622] rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-black flex flex-col justify-between">
        
        {/* Exact Base Graphic with Clean Piyush Kumar Gupta on Laptop */}
        <Image
          src="/assets/piyush_intro_screen.png"
          alt="Piyush Kumar Gupta Portfolio Intro"
          fill
          priority
          className="object-contain object-center select-none pointer-events-none"
        />

        {/* Top Interactive Icons: Fullscreen & Popout (Matching exact placement) */}
        <div className="relative z-20 p-4 flex items-center justify-between pointer-events-auto">
          {/* Top-Left Fullscreen Icon */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-black/40 hover:bg-black/80 border border-white/10 text-white transition-all hover:scale-110"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>

          {/* Top-Right Pip Icon */}
          <button
            onClick={handleEnter}
            className="p-2 rounded-lg bg-black/40 hover:bg-black/80 border border-white/10 text-white transition-all hover:scale-110"
            title="Open Full Portfolio"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Center Live Animated Progress Bar Over Laptop Screen */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto pointer-events-none">
          {/* Animated live glowing progress line over the screen */}
          <div className="w-[45%] h-1 bg-black/60 rounded-full overflow-hidden border border-white/20 mt-14 sm:mt-16">
            <div
              className="h-full bg-gradient-to-r from-purple-300 via-white to-purple-200 transition-all duration-75 shadow-[0_0_12px_rgba(255,255,255,0.9)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-neutral-300 mt-1 tracking-wider">
            {progress < 100 ? "LOADING ASSETS..." : "SYSTEM READY"}
          </span>
        </div>

        {/* Bottom Exact Player Controls Bar matching Screenshot */}
        <div className="relative z-20 p-4 pb-5 flex items-center justify-between pointer-events-auto bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          <div className="flex items-center gap-3 w-full">
            {/* Play / Pause Toggle Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-lg bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-105 shrink-0"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
            </button>

            {/* Bottom Scrubber Line */}
            <div 
              className="flex-1 h-1.5 bg-neutral-700/60 rounded-full overflow-hidden cursor-pointer relative"
              onClick={handleEnter}
            >
              <div 
                className="h-full bg-white transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Speed Indicator 1.0x */}
            <span className="text-xs font-mono font-bold text-white px-2 py-1 rounded bg-black/50 border border-white/10 shrink-0">
              1.0x
            </span>

            {/* Sound Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg bg-black/50 hover:bg-black/80 text-white transition-all shrink-0"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>

        {/* Subtle Click Anywhere to Enter Overlay */}
        <div 
          onClick={handleEnter}
          className="absolute inset-0 z-0 cursor-pointer"
          title="Click to enter portfolio"
        />
      </div>
    </div>
  );
}
