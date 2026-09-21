"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Film, Sparkles, Cpu, Award } from "lucide-react";

interface AboutSectionProps {
  portraitUrl?: string;
  logoUrl?: string;
}

export default function AboutSection({
  portraitUrl = "/assets/portrait-hero-dark.jpg",
  logoUrl = "/assets/karmayogi-logo.svg",
}: AboutSectionProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / (rect.height / 2)) * 15;
    const rotY = (x / (rect.width / 2)) * 15;
    setTilt({ x: rotX, y: rotY });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };
  const statCards = [
    {
      topLabel: "Full-Stack",
      bottomLabel: "ARCHITECTURE",
      subtext: "Post-Production",
    },
    {
      topLabel: "DaVinci & Adobe",
      bottomLabel: "CORE SUITE",
      subtext: "Color & Motion",
    },
    {
      topLabel: "AI Cinema",
      bottomLabel: "WORKFLOW",
      subtext: "Runway & Neural",
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Top subtle radial spotlight glow */}
      <div className="absolute top-10 left-1/3 w-[600px] h-[300px] bg-radial from-white/[0.05] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Eyebrow */}
        <div className="mb-4">
          <span className="eyebrow-tag">
            // SYSTEM PROFILE
          </span>
        </div>

        {/* Section Heading */}
        

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Framed profile photo card with bottom overlay bar */}
          <div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleCardMouseLeave}
            className="lg:col-span-5 relative"
            style={{ perspective: "1100px" }}
          >
            {/* Cinematic White Light Bloom behind profile card */}
            <div className="absolute -inset-4 pointer-events-none -z-10 flex items-center justify-center">
              <div
                className="w-full h-full rounded-3xl bg-white/[0.12] filter blur-3xl opacity-70 transition-all duration-700 group-hover:opacity-100"
                style={{ mixBlendMode: "screen" }}
              />
            </div>

            <div
              className="spotlight-card rounded-2xl p-2.5 sm:p-3 relative overflow-hidden group cursor-pointer"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
                  isHovered ? "scale3d(1.02, 1.02, 1.02)" : "scale3d(1, 1, 1)"
                }`,
                transformStyle: "preserve-3d",
                transition: isHovered
                  ? "transform 0.08s ease-out, box-shadow 0.3s ease"
                  : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
              }}
            >
              <div
                className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-neutral-900"
                style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
              >
                <Image
                  src={portraitUrl}
                  alt="Piyush Kumar Gupta"
                  fill
                  className="object-cover object-center filter grayscale contrast-110 brightness-95 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Bar with pulsing green dot */}
                <div
                  className="absolute bottom-3 left-3 right-3 py-2.5 px-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between pointer-events-none"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                      OPEN TO OPPORTUNITIES
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 font-semibold">
                    2026
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bio + 3 Stat Cards + Karmayogi Studio Greeting Card */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            {/* Paragraph Bio */}
            <div className="space-y-4">
              <h2 className="font-archivo text-7xl sm:text-5xl font-black uppercase tracking-tight text-white mb-12 sm:mb-16">
             <span className="text-5xl  text-white sm:text-5xl">Piyush Kumar Gupta</span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-normal">
                3+ years turning raw footage and half-formed ideas into videos
                people actually watch till the end. I cut, color, and animate
                across <strong className="text-white font-semibold">DaVinci Resolve</strong>,{" "}
                <strong className="text-white font-semibold">Premiere Pro</strong>, and{" "}
                <strong className="text-white font-semibold">After Effects</strong> — and
                lately I&apos;ve been folding AI video tools into that workflow to
                move faster without losing craft.
              </p>
              
              {/* Italic skillset highlight form */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed italic font-serif">
                  &ldquo;Specialized across Video Editing, VFX, Production, and Story Telling, &amp; AI Creator.&rdquo;
                </p>
              </div>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Whether it&apos;s a high-impact narrative edit, a kinetic motion graphics package,
                or a fully AI-assisted cinematic piece, the goal stays the same:{" "}
                <em className="text-white font-medium not-italic underline decoration-neutral-600 underline-offset-4">
                  make every frame earn its place.
                </em>
              </p>
            </div>

            {/* 3 Small Dark Pill/Stat Cards in a Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {statCards.map((card, idx) => (
                <div
                  key={idx}
                  className="spotlight-card rounded-2xl p-4 flex flex-col justify-center border border-white/5 hover:border-white/20 transition-all group relative overflow-visible"
                >
                  <div className="moving-card-aura" />
                  <span className="text-xs font-mono text-neutral-400 tracking-wider uppercase mb-1">
                    {card.topLabel}
                  </span>
                  <span className="font-archivo text-base sm:text-lg font-bold uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                    {card.bottomLabel}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500 mt-1">
                    // {card.subtext}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
