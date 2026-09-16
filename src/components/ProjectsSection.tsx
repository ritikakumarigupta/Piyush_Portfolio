"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Eye,
  Film,
  TrendingUp,
  Star,
  CheckCircle2,
  FolderGit2
} from "lucide-react";
import { VideoProject } from "@/lib/db";

interface ProjectsSectionProps {
  videos: VideoProject[];
  onOpenModal: (video: VideoProject) => void;
}

export default function ProjectsSection({ videos, onOpenModal }: ProjectsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);

  // Category filter state: null means no category chosen yet (User asked: "don't show it, give me option that i will select it then show video")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Available Category Options Requested by User:
  // 1. Personal Brand
  // 2. AI Content
  // 3. VFX
  // 4. Upcoming Project
  const categoryOptions = [
    {
      id: "Personal Brand",
      label: "Personal Brand",
      badge: "CREATOR & COMMERCIAL",
      description: "High-ticket commercial cuts, luxury product launches & founder authority reels.",
      icon: Film,
      color: "from-amber-500/20 via-amber-500/5 to-transparent border-amber-500/30 text-amber-400",
    },
    {
      id: "AI Content",
      label: "AI Content",
      badge: "SYNTHETIC & NEURAL CINEMA",
      description: "Next-gen generative AI cinematic productions, Runway Gen-3 & Midjourney workflows.",
      icon: Sparkles,
      color: "from-cyan-500/20 via-cyan-500/5 to-transparent border-cyan-500/30 text-cyan-400",
    },
    {
      id: "VFX",
      label: "VFX",
      badge: "VISUAL EFFECTS & COMPOSITING",
      description: "Complex age progression, neural tracking, celestial elements & DaVinci science.",
      icon: FolderGit2,
      color: "from-purple-500/20 via-purple-500/5 to-transparent border-purple-500/30 text-purple-400",
    },
    {
      id: "Upcoming Project",
      label: "Upcoming Project",
      badge: "IN PRODUCTION & CONCEPT",
      description: "Unreleased teasers, epic cinematic sagas, and conceptual production trailers.",
      icon: Star,
      color: "from-emerald-500/20 via-emerald-500/5 to-transparent border-emerald-500/30 text-emerald-400",
    },
  ];

  // Default fallback projects if DB is empty
  const displayProjects: VideoProject[] = videos.length > 0 ? videos : [
    {
      id: "proj-1",
      title: "Aurabella Luxury Skincare Commercial",
      category: "Personal Brand",
      categoryBadge: "BRAND COMMERCIAL",
      description: "High-end cinematic commercial featuring fluid macro water simulations, golden aesthetic, and sound design.",
      tools: ["DaVinci Resolve", "Color Science", "After Effects", "Sound Mix"],
      tags: ["DaVinci Resolve", "Color Science", "After Effects", "Sound Mix"],
      videoUrl: "/uploads/videos/aurabella_luxury_brand.mp4",
      thumbnailUrl: "/uploads/thumbnails/aurabella_luxury_brand.jpg",
      duration: "0:45",
      views: "1.4M+",
      featured: true,
      order: 1,
      status: "published",
      createdAt: "2026-01-01",
    },
    {
      id: "proj-2",
      title: "Bald Lion High-Retention Viral Reel",
      category: "AI Content",
      categoryBadge: "AI CHARACTER & REEL",
      description: "Fast-paced kinetic short-form edit with snappy zooms, sound impact risers, and high viewer retention.",
      tools: ["Premiere Pro", "Sound FX", "Kinetic Cut", "Speed Ramps"],
      tags: ["Premiere Pro", "Sound FX", "Kinetic Cut", "Speed Ramps"],
      videoUrl: "/uploads/videos/bald_lion_reel.mp4",
      thumbnailUrl: "/uploads/thumbnails/bald_lion_reel.jpg",
      duration: "0:32",
      views: "890K+",
      featured: true,
      order: 2,
      status: "published",
      createdAt: "2026-01-02",
    },
    {
      id: "proj-3",
      title: "AI Age Transformation VFX Scene",
      category: "VFX",
      categoryBadge: "NEURAL VFX",
      description: "Deep-neural age progression sequence combining temporal face tracking with ComfyUI and Runway Gen-3.",
      tools: ["Runway Gen-3", "ComfyUI", "After Effects", "Neural VFX"],
      tags: ["Runway Gen-3", "ComfyUI", "After Effects", "Neural VFX"],
      videoUrl: "/uploads/videos/age_transformation_vfx.mp4",
      thumbnailUrl: "/uploads/thumbnails/age_transformation_vfx.jpg",
      duration: "0:58",
      views: "2.8M+",
      featured: true,
      order: 3,
      status: "published",
      createdAt: "2026-01-03",
    },
    {
      id: "proj-4",
      title: "Mahadev Mythological Epic Visuals",
      category: "AI Content",
      categoryBadge: "3D & MYTHOLOGY",
      description: "Epic mythological environment assembly with atmospheric volumetric lighting and cinematic grade.",
      tools: ["Blender 3D", "After Effects", "Cinematic Grade", "Orchestral Audio"],
      tags: ["Blender 3D", "After Effects", "Cinematic Grade", "Orchestral Audio"],
      videoUrl: "/uploads/videos/mahadev_shiv_concept.mp4",
      thumbnailUrl: "/uploads/thumbnails/mahadev_shiv_concept.jpg",
      duration: "1:15",
      views: "3.5M+",
      featured: true,
      order: 4,
      status: "published",
      createdAt: "2026-01-04",
    },
    {
      id: "proj-5",
      title: "Kingdom Momo Brand Commercial",
      category: "Personal Brand",
      categoryBadge: "BRAND ADS",
      description: "Sensory-rich food commercial emphasizing steaming visuals, sizzle sound design, and viral pacing.",
      tools: ["Premiere Pro", "CapCut Pro", "Color Finale"],
      tags: ["Commercial", "Food Edit"],
      videoUrl: "/uploads/videos/kingdom_momo_ad.mp4",
      thumbnailUrl: "/uploads/thumbnails/kingdom_momo_ad.jpg",
      duration: "0:25",
      views: "650K+",
      featured: true,
      order: 5,
      status: "published",
      createdAt: "2026-01-05",
    },
    {
      id: "proj-6",
      title: "Siwon Premium Brand Master Commercial",
      category: "Personal Brand",
      categoryBadge: "LUXURY PRODUCT",
      description: "Minimalist luxury product commercial with fluid infinity-loop motion graphics and golden embers.",
      tools: ["Cinema 4D", "After Effects", "Premiere Pro"],
      tags: ["Luxury", "Product 3D"],
      videoUrl: "/uploads/videos/siwon_premium_brand.mp4",
      thumbnailUrl: "/uploads/thumbnails/siwon_premium_brand.jpg",
      duration: "0:50",
      views: "1.9M+",
      featured: true,
      order: 6,
      status: "published",
      createdAt: "2026-01-06",
    },
    {
      id: "proj-7",
      title: "Epic Mahabharat Concept Scene",
      category: "Upcoming Project",
      categoryBadge: "TRAILER PREVIEW",
      description: "Atmospheric teaser exploring ancient battlefields, mythical lighting, and high-impact sound design.",
      tools: ["Unreal Engine", "After Effects", "Premiere Pro"],
      tags: ["Concept", "Cinematic"],
      videoUrl: "/uploads/videos/mahabharat_scene.mp4",
      thumbnailUrl: "/uploads/thumbnails/mahabharat_scene.jpg",
      duration: "0:30",
      views: "1.1M+",
      featured: true,
      order: 7,
      status: "published",
      createdAt: "2026-01-07",
    }
  ];

  // Manual scroll handler
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Requirement 3: "Featured portfolio work all slide automatic work don't be slide left or right shift hona chaiye don't be flick"
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        // Shift right smoothly without flicking
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
        }
      }
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Filtered videos for Requirement 5 (integrated category section)
  const categoryVideos = selectedCategory
    ? displayProjects.filter((p) => {
        const pCat = (p.category || "").toLowerCase();
        const sel = selectedCategory.toLowerCase();
        if (sel === "personal brand") {
          return pCat.includes("personal") || pCat.includes("brand") || pCat.includes("ads") || pCat.includes("reel");
        }
        if (sel === "ai content") {
          return pCat.includes("ai") || pCat.includes("cinema") || pCat.includes("motion");
        }
        if (sel === "vfx") {
          return pCat.includes("vfx") || pCat.includes("reels");
        }
        if (sel === "upcoming project") {
          return pCat.includes("upcoming") || pCat.includes("corporate") || pCat.includes("trailer") || pCat.includes("concept");
        }
        return pCat.includes(sel);
      })
    : [];

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial from-white/[0.05] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Eyebrow */}
        <div className="mb-4">
          <span className="eyebrow-tag">
            // PORTFOLIO WORK
          </span>
        </div>

        {/* Section Heading + Shift Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="font-archivo text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Featured Portfolio Work
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl">
              Smooth auto-shifting showcase. Click any project to play full cinematic resolution with sound.
            </p>
          </div>

          {/* Carousel Left/Right Shift Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-full bg-neutral-900 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
              aria-label="Shift left"
              title="Shift Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-full bg-neutral-900 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
              aria-label="Shift right"
              title="Shift Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontally Scrollable Row with Smooth Auto-Shift */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex items-stretch gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayProjects.map((project, idx) => {
            const projectNum = String(idx + 1).padStart(2, "0");
            const isCenter = idx === activeCardIndex;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveCardIndex(idx)}
                className={`flex-none w-[310px] sm:w-[380px] snap-center spotlight-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between group cursor-pointer transition-all duration-300 relative ${
                  isCenter
                    ? "ring-1 ring-white/30 shadow-2xl shadow-black/80 scale-[1.01]"
                    : "opacity-90 hover:opacity-100"
                }`}
                onClick={() => onOpenModal(project)}
              >
                {/* Moving blurred aura behind each video container */}
                <div className="moving-card-aura" />

                {/* Card Header: Project Label & Category Pill */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono font-bold text-neutral-400 tracking-wider">
                      // PROJECT {projectNum}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/5 border border-white/10 text-neutral-300">
                      {project.category}
                    </span>
                  </div>

                  {/* Thumbnail & Video Preview Container with Moving Blurred Bloom */}
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/60 mb-4 border border-white/10 group-hover:border-white/30 transition-all">
                    {/* Moving White Bloom Aura behind thumbnail */}
                    <div
                      className="absolute -inset-3 rounded-xl bg-white/[0.16] filter blur-xl opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 pointer-events-none -z-10"
                      style={{
                        mixBlendMode: "screen",
                        animation: "movingAmbientBloom 5s ease-in-out infinite alternate",
                      }}
                    />

                    {project.thumbnailUrl ? (
                      <Image
                        src={project.thumbnailUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-600">
                        <Play className="w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-emerald-400 transition-all duration-300">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom Metadata Badges */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-white/90">
                      {project.duration && (
                        <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10">
                          {project.duration}
                        </span>
                      )}
                      {project.views && (
                        <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10">
                          {project.views} views
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-archivo text-lg sm:text-xl font-bold uppercase tracking-tight text-white mb-2 group-hover:text-white transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  {/* 2-line Description */}
                  <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Card Footer: Tech-tags + Action Link */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5 overflow-hidden max-h-6">
                    {(project.tools || project.tags || []).slice(0, 2).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-neutral-900 border border-white/10 text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                    {(project.tools || project.tags || []).length > 2 && (
                      <span className="text-[10px] font-mono text-neutral-500">
                        +{(project.tools || project.tags || []).length - 2}
                      </span>
                    )}
                  </div>

                  {/* Action Link Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenModal(project);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-emerald-400 transition-colors uppercase tracking-wider flex-shrink-0"
                  >
                    <span>WATCH →</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* =================================================================== */}
        {/* REQUIREMENT 4: "Uski niche Total View, Video Edit, Average Retention, Reviews" */}
        {/* =================================================================== */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Stat 1: Total Views */}
            <div className="spotlight-card rounded-2xl p-5 sm:p-6 border border-white/10 relative overflow-hidden bg-gradient-to-br from-neutral-900/60 to-black/80">
              <div className="moving-card-aura" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold">
                  Total Views
                </span>
                <Eye className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="font-archivo text-2xl sm:text-3xl font-black text-white tracking-tight">
                12.8M+
              </div>
              <span className="text-[11px] font-mono text-neutral-500 mt-1 block">
                Across YouTube &amp; Reels
              </span>
            </div>

            {/* Stat 2: Videos Edited */}
            <div className="spotlight-card rounded-2xl p-5 sm:p-6 border border-white/10 relative overflow-hidden bg-gradient-to-br from-neutral-900/60 to-black/80">
              <div className="moving-card-aura" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold">
                  Videos Edited
                </span>
                <Film className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="font-archivo text-2xl sm:text-3xl font-black text-white tracking-tight">
                50+
              </div>
              <span className="text-[11px] font-mono text-neutral-500 mt-1 block">
                Commercials, VFX &amp; Reels
              </span>
            </div>

            {/* Stat 3: Average Retention */}
            <div className="spotlight-card rounded-2xl p-5 sm:p-6 border border-white/10 relative overflow-hidden bg-gradient-to-br from-neutral-900/60 to-black/80">
              <div className="moving-card-aura" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold">
                  Average Retention
                </span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <div className="font-archivo text-2xl sm:text-3xl font-black text-white tracking-tight">
                84.2%
              </div>
              <span className="text-[11px] font-mono text-neutral-500 mt-1 block">
                High-Pacing Hook Retention
              </span>
            </div>

            {/* Stat 4: Client Reviews */}
            <div className="spotlight-card rounded-2xl p-5 sm:p-6 border border-white/10 relative overflow-hidden bg-gradient-to-br from-neutral-900/60 to-black/80">
              <div className="moving-card-aura" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold">
                  Client Reviews
                </span>
                <Star className="w-4 h-4 text-purple-400 fill-purple-400" />
              </div>
              <div className="font-archivo text-2xl sm:text-3xl font-black text-white tracking-tight">
                100%
              </div>
              <span className="text-[11px] font-mono text-neutral-500 mt-1 block">
                5-Star Satisfied Creators
              </span>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* REQUIREMENT 5: "Add Section by video and integrate it. Don't show it, give me option that i will select it then show video. Matlab ki option rahega jaise: Personal brand, AI Content, VFX, or Upcoming project ka section hona chaiye. Video show nahi hona chaiye jab hum click karege us option pe to uska sara video aana chaiye, har ek video ko alag alag fix karna." */}
        {/* =================================================================== */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="mb-8">
            <span className="eyebrow-tag">
              // PRODUCTION VAULT ARCHIVE
            </span>
            <h3 className="font-archivo text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-3">
              Explore By Category Vault
            </h3>
            <p className="text-sm sm:text-base text-neutral-400 mt-1 max-w-xl">
              Choose a discipline below to unlock its dedicated video showcase. Videos remain hidden until an option is selected.
            </p>
          </div>

          {/* 4 Interactive Category Option Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {categoryOptions.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    // Toggle category or select new one
                    setSelectedCategory(isSelected ? null : cat.id);
                  }}
                  className={`text-left p-5 rounded-2xl border transition-all relative overflow-hidden group cursor-pointer ${
                    isSelected
                      ? `bg-gradient-to-br ${cat.color} ring-2 ring-white/40 shadow-2xl scale-[1.02]`
                      : "bg-white/[0.03] border-white/10 hover:border-white/30 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? "bg-white/15 text-white" : "bg-black/50 text-neutral-400 group-hover:text-white"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {isSelected ? (
                      <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> ACTIVE
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">
                        TAP TO VIEW →
                      </span>
                    )}
                  </div>

                  <h4 className="font-archivo text-lg sm:text-xl font-bold uppercase tracking-tight text-white mb-1">
                    {cat.label}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans line-clamp-2">
                    {cat.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Dynamic Video Display: Only shows videos when a category option is clicked */}
          {selectedCategory ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-black/70 border border-white/15 relative overflow-hidden">
              {/* Category Active Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">
                      SHOWING CATEGORY VAULT
                    </span>
                  </div>
                  <h4 className="font-archivo text-2xl sm:text-3xl font-black uppercase text-white mt-1">
                    {selectedCategory}
                  </h4>
                </div>

                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-4 py-1.5 rounded-full text-xs font-mono text-neutral-400 hover:text-white bg-neutral-900 border border-white/15 transition-all self-start sm:self-auto cursor-pointer"
                >
                  ✕ Close Vault View
                </button>
              </div>

              {/* Video Grid for Selected Category */}
              {categoryVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryVideos.map((vid, vIdx) => (
                    <div
                      key={vid.id}
                      onClick={() => onOpenModal(vid)}
                      className="spotlight-card rounded-2xl p-4 border border-white/15 hover:border-white/40 transition-all group cursor-pointer bg-neutral-950/80 flex flex-col justify-between"
                    >
                      <div>
                        {/* Video Thumbnail with Play Hover */}
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black mb-3 border border-white/10">
                          {vid.thumbnailUrl ? (
                            <Image
                              src={vid.thumbnailUrl}
                              alt={vid.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                              <Play className="w-8 h-8 text-neutral-500" />
                            </div>
                          )}

                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-400 transition-all shadow-xl">
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            </div>
                          </div>

                          {/* Duration Badge */}
                          {vid.duration && (
                            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white border border-white/10">
                              {vid.duration}
                            </span>
                          )}
                          {vid.views && (
                            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white border border-white/10">
                              {vid.views} views
                            </span>
                          )}
                        </div>

                        {/* Title & Desc */}
                        <h5 className="font-archivo text-base font-bold text-white uppercase line-clamp-1 mb-1 group-hover:text-emerald-400 transition-colors">
                          {vid.title}
                        </h5>
                        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
                          {vid.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                        <span className="text-neutral-500 text-[11px]">
                          {(vid.tools || []).slice(0, 2).join(" · ")}
                        </span>
                        <span className="text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                          PLAY VIDEO →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-sm font-mono text-neutral-400">
                    No videos registered under {selectedCategory} yet.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950/40 border border-dashed border-white/10 text-center flex flex-col items-center justify-center">
              <Sparkles className="w-8 h-8 text-neutral-500 mb-3" />
              <h5 className="font-archivo text-lg sm:text-xl font-bold uppercase text-neutral-300">
                Category Vault Is In Idle State
              </h5>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-md mt-1">
                Click any of the 4 options above (Personal Brand, AI Content, VFX, or Upcoming Project) to dynamically load its curated video library.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
