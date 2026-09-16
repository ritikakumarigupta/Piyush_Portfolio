"use client";

import { Sparkles } from "lucide-react";

export default function TechStackSection() {
  const row1Skills = [
    { name: "DaVinci Resolve", category: "Color & NLE", hot: true },
    { name: "Adobe Premiere Pro", category: "Editing", hot: true },
    { name: "After Effects", category: "Motion & VFX", hot: true },
    { name: "Photoshop", category: "Asset Prep", hot: false },
    { name: "Blender 3D", category: "Modeling", hot: false },
    { name: "Cinema 4D", category: "3D Motion", hot: false },
    { name: "Color Grading (LUTs)", category: "Post-Production", hot: true },
    { name: "Sound Design & Mix", category: "Fairlight/Audition", hot: false },
    { name: "Kinetic Typography", category: "Animation", hot: false },
    { name: "Final Cut Pro", category: "Cutting", hot: false },
    { name: "Unreal Engine 5", category: "Virtual Cinema", hot: false },
  ];

  const row2Skills = [
    { name: "Runway Gen-3 Alpha", category: "AI Video", hot: true },
    { name: "Midjourney v6", category: "Concept Art", hot: true },
    { name: "OpenAI Sora", category: "Synthetic", hot: true },
    { name: "Pika Labs", category: "Generative", hot: false },
    { name: "Topaz Video AI (4K)", category: "Neural Upscale", hot: true },
    { name: "ElevenLabs Voice AI", category: "Audio Synthesis", hot: false },
    { name: "ComfyUI & SDXL", category: "Neural Control", hot: true },
    { name: "CapCut Pro", category: "Short Form & Reels", hot: true },
    { name: "Boris FX Mocha", category: "Planar Tracking", hot: false },
    { name: "Luma Dream Machine", category: "Camera Motion", hot: true },
    { name: "Kling AI", category: "Cinematic Gen", hot: true },
  ];

  return (
    <section id="skills" className="relative py-20 bg-[#0A0A0A] overflow-hidden border-y border-white/5">
      {/* Background spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-radial from-white/[0.04] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center relative z-10">
        <div className="inline-block mb-3">
          <span className="eyebrow-tag">
            # TECHNICAL STACK
          </span>
        </div>
        <h2 className="font-archivo text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
          Technologies I Work With
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
          Creative post-production, kinetic motion graphics, ACES color grading, spatial sound design, and generative AI cinematic tools.
        </p>
      </div>

      {/* Marquee Row 1 - Left to Right */}
      <div className="relative w-full overflow-hidden py-3">
        <div className="animate-marquee-left flex items-center gap-3">
          {/* Double items for seamless infinite loop */}
          {[...row1Skills, ...row1Skills].map((skill, index) => (
            <div
              key={`r1-${index}`}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#141414] border border-white/10 hover:border-white/30 text-white transition-all duration-300 hover:scale-105 cursor-pointer shadow-md group"
            >
              {skill.hot && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:animate-ping" />
              )}
              <span className="text-sm font-semibold tracking-wide">{skill.name}</span>
              <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                {skill.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 - Right to Left */}
      <div className="relative w-full overflow-hidden py-3">
        <div className="animate-marquee-right flex items-center gap-3">
          {/* Double items for seamless infinite loop */}
          {[...row2Skills, ...row2Skills].map((skill, index) => (
            <div
              key={`r2-${index}`}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#141414] border border-white/10 hover:border-white/30 text-white transition-all duration-300 hover:scale-105 cursor-pointer shadow-md group"
            >
              {skill.hot && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:animate-ping" />
              )}
              <span className="text-sm font-semibold tracking-wide">{skill.name}</span>
              <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                {skill.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom hint */}
      <div className="text-center mt-6">
        <span className="text-[11px] font-mono text-neutral-400 tracking-wider">
          // HOVER TO PAUSE STREAM
        </span>
      </div>
    </section>
  );
}
