"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { VideoProject } from "@/lib/db";

interface FullscreenVideoModalProps {
  video: VideoProject | null;
  allVideos: VideoProject[];
  onClose: () => void;
  onSelectVideo: (video: VideoProject) => void;
  logoUrl?: string;
}

export default function FullscreenVideoModal({
  video,
  allVideos,
  onClose,
  onSelectVideo,
  logoUrl = "/assets/karmayogi-logo.svg",
}: FullscreenVideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [video]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = isMuted;
    videoRef.current.volume = volume;
    if (isPlaying) {
      videoRef.current.play().catch(() => {
        if (!isMuted) {
          setIsMuted(true);
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        }
      });
    }
  }, [video, isPlaying, isMuted, volume]);

  if (!video) return null;

  const currentIndex = allVideos.findIndex((v) => v.id === video.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % allVideos.length;
    onSelectVideo(allVideos[nextIdx]);
    setProgress(0);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + allVideos.length) % allVideos.length;
    onSelectVideo(allVideos[prevIdx]);
    setProgress(0);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    if (dur > 0) setProgress((cur / dur) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-6">
      {/* Top Controls: Logo Watermark + Close Button */}
      <div className="absolute top-4 inset-x-6 flex items-center justify-between z-50 pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="font-archivo text-xl font-bold tracking-tight text-white">
            Piyush<span className="text-emerald-400">.</span>
          </span>
          <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            // THEATRICAL PLAYBACK
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-neutral-900 border border-white/20 hover:bg-white hover:text-black text-white transition-all duration-200 shadow-xl"
          title="Close Modal (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Cinema Content Container */}
      <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col lg:flex-row items-center justify-center gap-6 mt-10">
        {/* VIDEO DISPLAY AREA */}
        <div className="relative w-full lg:flex-1 aspect-video rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl group">
          {/* Theatrical Cinematic Moving White Bloom Halo around Video */}
          <div
            className="absolute -inset-10 sm:-inset-16 rounded-3xl bg-radial from-white/[0.3] via-white/[0.09] to-transparent filter blur-3xl pointer-events-none -z-10"
            style={{
              mixBlendMode: "screen",
              animation: "movingAmbientBloom 5.5s ease-in-out infinite alternate",
            }}
          />

          <video
            ref={videoRef}
            src={video.videoUrl}
            poster={video.thumbnailUrl}
            playsInline
            loop
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Sound & Play/Pause Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex items-center justify-between z-30 opacity-90 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
              </button>

              {/* Sound Toggle */}
              <button
                onClick={toggleMute}
                className={`px-3 py-1.5 rounded-full transition flex items-center gap-2 text-xs font-mono font-medium ${
                  isMuted
                    ? "bg-red-500/20 text-red-300 border border-red-500/40"
                    : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                }`}
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                <span>{isMuted ? "MUTED" : "SOUND ON"}</span>
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setVolume(val);
                  if (val > 0) setIsMuted(false);
                }}
                className="w-20 accent-white hidden sm:inline-block cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-400 font-mono">
                {String(currentIndex + 1).padStart(2, "0")} / {String(allVideos.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Scrubber Progress Bar */}
          <div
            className="absolute bottom-0 inset-x-0 h-1.5 bg-white/20 cursor-pointer z-40"
            onClick={handleSeek}
          >
            <div className="h-full bg-white" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* PROJECT INFO SIDEBAR */}
        <div className="w-full lg:w-80 spotlight-card p-6 rounded-2xl space-y-4 text-left border border-white/10 shrink-0 bg-[#121212]">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              {video.categoryBadge || video.category}
            </span>
            <h3 className="text-lg font-archivo font-bold text-white uppercase leading-snug">
              {video.title}
            </h3>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed max-h-36 overflow-y-auto font-sans">
            {video.description}
          </p>

          <div className="space-y-2 pt-2 border-t border-white/10">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-neutral-400" />
              Software &amp; Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(video.tools && video.tools.length > 0 ? video.tools : video.tags)?.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-neutral-900 text-neutral-300 border border-white/10"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Prev / Next Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-200 hover:text-white transition border border-white/5"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              PREV
            </button>
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-200 hover:text-white transition border border-white/5"
            >
              NEXT
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
