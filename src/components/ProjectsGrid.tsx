"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Sparkles, Film, Clock } from "lucide-react";
import { VideoProject } from "@/lib/db";

interface ProjectsGridProps {
  videos: VideoProject[];
  onOpenModal: (video: VideoProject) => void;
}

export default function ProjectsGrid({ videos, onOpenModal }: ProjectsGridProps) {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = [
    "All",
    "YouTube",
    "Reels",
    "Ads",
    "Motion Graphics",
    "Corporate",
    "AI Video",
  ];

  const filteredVideos = selectedFilter === "All"
    ? videos
    : videos.filter((v) => {
        const cat = v.category.toLowerCase();
        const filt = selectedFilter.toLowerCase();
        return cat.includes(filt) || (v.categoryBadge && v.categoryBadge.toLowerCase().includes(filt));
      });

  return (
    <section id="projects" className="py-20 lg:py-28 bg-[#f8fafc] border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-gold-500/30 text-gold-800 text-xs font-bold uppercase tracking-widest">
              <Film className="w-3.5 h-3.5 text-gold-600" />
              <span>Complete Portfolio Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-slate-950 tracking-tight">
              Selected Works &amp; <span className="text-gold-gradient">Commercials</span>
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Filter through our commercial advertisements, social media reels, and AI motion pieces.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  selectedFilter === filter
                    ? "bg-gold-500 text-slate-950 shadow-gold-sm scale-105"
                    : "bg-white text-slate-700 border border-slate-300 hover:border-gold-500 hover:text-gold-700 shadow-xs"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onOpenModal(video)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-gold-500 transition-all duration-500 cursor-pointer hover:-translate-y-1.5 shadow-md hover:shadow-xl"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover transform transition-transform duration-700 group-hover:scale-108"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Center Hover Play Circle */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-gold-500 text-slate-950 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
                  </div>
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-900 border border-slate-200 shadow-sm">
                    {video.category}
                  </span>
                </div>

                {/* Duration / Views */}
                {video.duration && (
                  <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-black/75 backdrop-blur-sm text-white flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold-400" />
                      {video.duration}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <h3 className="text-base font-cinzel font-bold text-slate-900 group-hover:text-gold-700 transition-colors line-clamp-1">
                  {video.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {video.description}
                </p>

                {/* Tools / Software */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {video.tools?.slice(0, 3).map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tool}
                    </span>
                  ))}
                  {(video.tools?.length || 0) > 3 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] text-slate-500 font-medium">
                      +{video.tools.length - 3}
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
