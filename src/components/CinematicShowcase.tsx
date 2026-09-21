"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  ExternalLink,
  MoveHorizontal
} from "lucide-react";
import { VideoProject } from "@/lib/db";

interface CinematicShowcaseProps {
  videos: VideoProject[];
  onOpenModal: (video: VideoProject) => void;
  logoUrl?: string;
}

export default function CinematicShowcase({
  videos,
  onOpenModal,
  logoUrl = "/assets/karmayogi-logo.svg",
}: CinematicShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.85);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDeltaX, setDragDeltaX] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentVideo = videos[currentIndex] || videos[0];
  const totalCount = videos.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalCount);
    setProgress(0);
  }, [totalCount]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalCount) % totalCount);
    setProgress(0);
  }, [totalCount]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Handle Video Playback & Sound
  useEffect(() => {
    if (!videoRef.current) return;
    const vid = videoRef.current;
    vid.muted = isMuted;
    vid.volume = volume;
    if (isPlaying) {
      const p = vid.play();
      if (p !== undefined) {
        p.catch(() => {
          // If browser blocked unmuted autoplay on initial render
          if (!isMuted) {
            vid.muted = true;
            setIsMuted(true);
            vid.play().catch(() => {});
          }
        });
      }
    } else {
      vid.pause();
    }
  }, [currentIndex, isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      const vol = volume > 0 ? volume : 1;
      videoRef.current.volume = vol;
      setVolume(vol);
      videoRef.current.play().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    if (dur > 0) {
      setProgress((current / dur) * 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  // TOUCH SWIPE & MOUSE DRAG (Movable functionality)
  const onTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    setDragDeltaX(currentX - dragStartX);
  };

  const onTouchEnd = () => {
    if (!isDragging) return;
    if (dragDeltaX < -50) {
      handleNext();
    } else if (dragDeltaX > 50) {
      handlePrev();
    }
    setIsDragging(false);
    setDragDeltaX(0);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("input")) return;
    setDragStartX(e.clientX);
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragDeltaX(e.clientX - dragStartX);
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    if (dragDeltaX < -60) {
      handleNext();
    } else if (dragDeltaX > 60) {
      handlePrev();
    }
    setIsDragging(false);
    setDragDeltaX(0);
  };

  if (!currentVideo) return null;

  const projectNumberFormatted = String(currentIndex + 1).padStart(2, "0");
  const totalCountFormatted = String(totalCount).padStart(2, "0");

  return (
    <section id="showcase" className="relative py-20 lg:py-28 bg-[#fafafc] overflow-hidden select-none border-t border-slate-200/80">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 right-1/4 w-[40rem] h-[40rem] bg-amber-300/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-gold-500/30 text-gold-800 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Cinematic Portfolio Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-slate-950 tracking-tight">
            Featured Works <span className="text-gold-gradient">One by One</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base flex items-center justify-center gap-2">
            <span>Swipe or click arrows to explore curated video masterpieces</span>
            <MoveHorizontal className="w-4 h-4 text-gold-600 inline animate-pulse" />
          </p>
        </div>

        {/* ONE-BY-ONE CINEMATIC SLIDE CARD (Movable & Interactive) */}
        <div
          ref={containerRef}
          className="relative max-w-5xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-gold-400/40 via-slate-200 to-gold-400/20 shadow-2xl shadow-slate-900/10 transition-transform duration-300"
          style={{
            transform: isDragging ? `translateX(${dragDeltaX * 0.4}px)` : "translateX(0)",
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        >
          {/* Main Card Frame */}
          <div className="relative rounded-[22px] overflow-hidden bg-white border border-slate-200 shadow-xl">
            
            {/* Top Bar: Project ID, Category Badge, Fullscreen Trigger */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/90 backdrop-blur-md z-20">
              <div className="flex items-center gap-3">
                <span className="text-xs font-cinzel font-bold tracking-[0.2em] text-gold-700">
                  PROJECT {projectNumberFormatted}
                </span>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-300" />
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-gold-800 border border-gold-500/30">
                  {currentVideo.categoryBadge || currentVideo.category}
                </span>
              </div>

              {/* Counter Pagination: 01 / 07 */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-cinzel font-bold tracking-widest text-slate-800">
                  <span className="text-gold-700">{projectNumberFormatted}</span> / {totalCountFormatted}
                </span>
                <button
                  onClick={() => onOpenModal(currentVideo)}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-gold-500/20 text-slate-700 hover:text-gold-700 border border-slate-200 transition-colors"
                  title="Open Fullscreen Cinema Mode"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* VIDEO PLAYER AREA */}
            <div className="relative aspect-video sm:aspect-[16/9] w-full bg-black overflow-hidden group">
              
              {/* Karmayogi Studio Subtle Watermark */}
              <div className="absolute top-4 right-4 z-30 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="relative w-28 h-8">
                  <Image
                    src={logoUrl}
                    alt="Karmayogi Studio Watermark"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* The Video Element */}
              <video
                key={currentVideo.videoUrl}
                ref={videoRef}
                src={currentVideo.videoUrl}
                poster={currentVideo.thumbnailUrl}
                playsInline
                loop
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full h-full object-contain cursor-pointer"
              />

              {/* Floating Sound Toggle Badge */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className={`absolute bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border transition-all duration-300 ${
                  isMuted 
                    ? "bg-slate-900/80 text-white border-white/20 hover:bg-slate-900" 
                    : "bg-gold-500 text-slate-950 border-gold-400 font-bold shadow-lg hover:scale-105"
                }`}
                title={isMuted ? "Click to Enable Audio" : "Click to Mute"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-red-400" />
                    <span className="text-xs font-bold tracking-wider uppercase">Sound Off</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-slate-950 animate-bounce" />
                    <span className="text-xs font-bold tracking-wider uppercase">Audio On</span>
                  </>
                )}
              </button>

              {/* Center Play/Pause Overlay Icon when paused */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer z-20"
                >
                  <div className="w-16 h-16 rounded-full bg-gold-500 text-slate-950 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-slate-950 ml-1" />
                  </div>
                </div>
              )}

              {/* Custom Scrubbing Progress Bar at bottom of video */}
              <div 
                className="absolute bottom-0 inset-x-0 h-1.5 bg-white/30 cursor-pointer z-30 group-hover:h-2 transition-all"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-gold-500 relative"
                  style={{ width: `${progress}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

            </div>

            {/* PROJECT INFORMATION & CONTROLS FOOTER */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-white to-slate-50 border-t border-slate-100 space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Titles and Copy */}
                <div className="space-y-2 max-w-2xl">
                  <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-slate-900 tracking-wide">
                    {currentVideo.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {currentVideo.description}
                  </p>
                </div>

                {/* Direct Action Button */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => onOpenModal(currentVideo)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-gold-sm hover:scale-105 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Project</span>
                  </button>
                </div>
              </div>

              {/* Software / Tools Tags & Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-slate-500 font-bold mr-1 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-gold-600" />
                    Tools:
                  </span>
                  {currentVideo.tools?.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 hover:border-gold-500/40"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {currentVideo.views && (
                  <div className="text-xs text-slate-600 font-medium">
                    <span className="text-gold-700 font-bold">{currentVideo.views}</span> Views • {currentVideo.duration}
                  </div>
                )}
              </div>

              {/* NAVIGATION CONTROLS & PAGINATION */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 hover:text-gold-700 border border-slate-300 shadow-xs transition-all"
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-gold-600" />
                  <span className="text-xs font-bold uppercase tracking-wider">Previous</span>
                </button>

                {/* Dots / Indicators */}
                <div className="flex items-center gap-2">
                  {videos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex
                          ? "w-8 bg-gradient-to-r from-amber-400 to-gold-500 shadow-sm"
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                      aria-label={`Jump to project ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 hover:text-gold-700 border border-slate-300 shadow-xs transition-all"
                  aria-label="Next Project"
                >
                  <span className="text-xs font-bold uppercase tracking-wider">Next</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold-600" />
                </button>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
