"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface CinematicIntroPreloaderProps {
  onComplete: () => void;
}

export default function CinematicIntroPreloader({ onComplete }: CinematicIntroPreloaderProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Automatically transition to portfolio after 2.5 seconds
    const timer = setTimeout(() => {
      handleEnter();
    }, 2500);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleEnter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div
      onClick={handleEnter}
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center select-none overflow-hidden cursor-pointer transition-all duration-700 ${
        isExiting ? "opacity-0 scale-105 pointer-events-none filter blur-sm" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 bg-radial from-purple-950/25 via-black to-black pointer-events-none" />

      {/* Floating Top-Right Skip Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleEnter();
        }}
        className="absolute top-5 right-5 sm:top-7 sm:right-8 z-50 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-300 hover:text-white text-xs font-mono tracking-wider transition-all backdrop-blur-md flex items-center gap-1.5 hover:scale-105"
      >
        <span>SKIP</span>
        <ArrowRight className="w-3 h-3" />
      </button>

      {/* Clean Full-Bleed Image Frame Matching Image 2 Exactly */}
      <div className="relative w-full h-full max-w-[560px] max-h-[96vh] flex items-center justify-center p-2 sm:p-4 pointer-events-none">
        <Image
          src="/assets/piyush_clean_hero_intro.png"
          alt="Resume gets you shortlisted. Portfolio gets you hired. - Piyush Kumar Gupta"
          fill
          priority
          className="object-contain object-center select-none"
        />
      </div>
    </div>
  );
}
