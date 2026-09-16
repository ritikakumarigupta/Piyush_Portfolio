"use client";

import { Scissors, Sparkles, Cpu, Disc3 } from "lucide-react";

export default function RoadmapSection() {
  const rootCards = [
    {
      rootId: "// ROOT 01",
      icon: Scissors,
      title: "Post-Production & Narrative Cut",
      description: "Architecting high-retention storytelling, rhythmic pacing, and seamless visual flow for commercials and reels.",
      tag: "DaVinci & Premiere",
      tagColor: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    },
    {
      rootId: "// ROOT 02",
      icon: Sparkles,
      title: "Motion Graphics & Visual Effects",
      description: "Designing kinetic typography, 3D broadcast elements, and custom VFX composites that captivate audiences.",
      tag: "After Effects & Blender",
      subTag: "DaVinci Resolve",
      tagColor: "border-purple-500/30 text-purple-400 bg-purple-500/10",
    },
    {
      rootId: "// ROOT 03",
      icon: Cpu,
      title: "AI Video Generation & VFX",
      description: "Integrating next-gen generative AI video pipelines, neural upscaling, and hyper-realistic synthetic scenes.",
      tag: "Runway & ComfyUI",
      tagColor: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
    },
    {
      rootId: "// ROOT 04",
      icon: Disc3,
      title: "Color Grading & Sound Master",
      description: "Commercial-grade color science, custom LUT pipelines, cinematic acoustics, and spatial sound design.",
      tag: "DaVinci Color & Fairlight",
      tagColor: "border-amber-500/30 text-amber-400 bg-amber-500/10",
    },
  ];

  return (
    <section id="roadmap" className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Background spotlight */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[300px] bg-radial from-white/[0.04] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Eyebrow */}
        <div className="mb-4">
          <span className="eyebrow-tag">
            // ENGINEERING ROADMAP
          </span>
        </div>

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <h2 className="font-archivo text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Core Execution Roadmap
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl">
              From raw concept and assembly cut to neural generation and final theatrical finish.
            </p>
          </div>
          <div className="text-xs font-mono text-neutral-500">
            [ 4-PHASE PRODUCTION PIPELINE ]
          </div>
        </div>

        {/* 4 Cards in a Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rootCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="spotlight-card rounded-2xl p-6 flex flex-col justify-between group relative overflow-visible"
              >
                {/* Moving blurred white bloom aura behind each container */}
                <div className="moving-card-aura" />

                {/* Top: Root Label & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-semibold text-neutral-400 tracking-wider">
                      {card.rootId}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-white group-hover:scale-110 group-hover:border-white/30 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-archivo text-lg sm:text-xl font-bold uppercase tracking-tight text-white mb-3 group-hover:text-white transition-colors">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                              {/* Bottom: Pill Tag */}
<div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
  <div className="flex items-center">
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-semibold border ${card.tagColor}`}
    >
      {/* Agar subTag hai toh dono ko ek sath dikhayega, nahi toh sirf tag dikhayega */}
      {card.subTag ? `${card.tag} & ${card.subTag}` : card.tag}
    </span>
  </div>
  <span className="text-[10px] font-mono text-neutral-600 group-hover:text-neutral-400 transition-colors">
    ROOT_OK
  </span>
</div>

              
                
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
