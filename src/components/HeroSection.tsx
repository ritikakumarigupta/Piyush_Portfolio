"use client";

import { useState, useEffect } from "react";
import { Play, Send, Sparkles, Box } from "lucide-react";
import WhiteLightBloom from "./WhiteLightBloom";
import Hero3DPortrait from "./Hero3DPortrait";

interface HeroSectionProps {
  portraitDarkUrl?: string;
  portraitTransparentUrl?: string;
}

export default function HeroSection({
  portraitDarkUrl = "/assets/portrait-hero-dark.jpg",
  portraitTransparentUrl = "/assets/portrait-hero-transparent.png",
}: HeroSectionProps) {
  const roles = [
    "VIDEO EDITOR & MOTION DESIGNER",
    "AI VIDEO CREATOR",
    "CREATIVE VISUAL DEVELOPER",
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Role rotator interval
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setIsFading(false);
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#0A0A0A] select-none"
    >
      {/* Top subtle radial spotlight glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial from-white/[0.07] via-white/[0.02] to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Cinematic White Light Bloom Effect (Recreated from Reference Video) */}
      <WhiteLightBloom isTriggering={isFading} variant="hero" />

      {/* Main Responsive Hero Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center pt-4 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Greeting + Animated Rotating Titles + Bio Statement + CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-4 sm:space-y-5">
            {/* Small caps greeting with underlined name */}
            <div className="inline-flex items-center gap-2">
              <span className="eyebrow-tag">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                SYSTEM ACTIVE
              </span>
              <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-400">
                HI, I&apos;M{" "}
                <span className="text-white underline decoration-white/50 underline-offset-4 font-bold">
                  PIYUSH KUMAR GUPTA
                </span>
              </p>
            </div>

            {/* Rotating roles headline (refined, smaller font size as requested) */}
            <div className="min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] flex items-center">
              <h1
                className={`font-archivo text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] uppercase text-white transition-all duration-300 transform ${
                  isFading
                    ? "opacity-0 -translate-y-2 blur-sm"
                    : "opacity-100 translate-y-0 blur-0"
                }`}
              >
                {roles[currentRoleIndex]}
              </h1>
            </div>

            {/* Bio statement */}
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-lg">
              3+ years turning raw footage and half-formed ideas into videos
              people actually watch till the end. Cutting, coloring, and animating
              across DaVinci Resolve, Premiere Pro, and After Effects with modern AI workflows.
            </p>

            <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
              <span className="text-neutral-300">// BASED IN INDIA</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">WORLDWIDE REMOTE</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
              >
                <Play className="w-3.5 h-3.5 fill-black text-black" />
                <span>View My Work</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full border border-neutral-700 bg-neutral-900/60 text-white text-xs font-semibold uppercase tracking-wider hover:border-white hover:bg-neutral-800 transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
              >
                <Send className="w-3.5 h-3.5 text-neutral-400" />
                <span>Contact Me</span>
              </a>
            </div>
          </div>

          {/* Right Column: Dedicated Responsive 3D Interactive Portrait Rig */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative w-full">
            <Hero3DPortrait
              portraitTransparentUrl={portraitTransparentUrl}
              portraitDarkUrl={portraitDarkUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
