"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Maximize, 
  Minimize, 
  Maximize2,
  Sparkles,
  Gauge
} from "lucide-react";
import { VideoProject } from "@/lib/db";

interface FullscreenVideoModalProps {
  video: VideoProject | null;
  allVideos: VideoProject[];
  onClose: () => void;
  onSelectVideo: (video: VideoProject) => void;
  logoUrl?: string;
}

const PLAYBACK_RATES = [1.0, 1.25, 1.5, 2.0, 0.75];

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
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showUnmuteHint, setShowUnmuteHint] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        } else {
          onClose();
        }
      }
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "f" || e.key === "F") toggleFullscreen();
      if (e.key === "m" || e.key === "M") toggleMute();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [video, isPlaying, isMuted]);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // When active video changes, reset and play with audio
  useEffect(() => {
    if (!videoRef.current) return;
    const vid = videoRef.current;
    vid.currentTime = 0;
    vid.playbackRate = playbackRate;
    vid.volume = volume;
    vid.muted = isMuted;

    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setShowUnmuteHint(false);
        })
        .catch(() => {
          // Browser prevented unmuted autoplay, mute temporarily and show un-mute hint
          vid.muted = true;
          setIsMuted(true);
          setShowUnmuteHint(true);
          vid.play().catch(() => {});
        });
    }
  }, [video]);

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

  const unlockMobileAudio = () => {
    try {
      if (typeof window !== "undefined") {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          if (ctx.state === "suspended") {
            ctx.resume().catch(() => {});
          }
        }
      }
    } catch {}
  };

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      // If video is muted on phone, user tap should immediately unmute and play with sound!
      handleEnableAudio();
    } else {
      togglePlay();
    }
  };

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
    unlockMobileAudio();
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    setShowUnmuteHint(false);
    if (!nextMuted) {
      try {
        videoRef.current.volume = 1;
      } catch {}
      setVolume(1);
      videoRef.current.play().catch(() => {});
    }
  };

  const handleEnableAudio = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (!videoRef.current) return;
    unlockMobileAudio();
    const vid = videoRef.current;
    vid.muted = false;
    try {
      vid.volume = 1;
    } catch {}
    setIsMuted(false);
    setVolume(1);
    setShowUnmuteHint(false);
    vid.play().catch(() => {});
  };

  const cyclePlaybackRate = () => {
    if (!videoRef.current) return;
    const nextIdx = (PLAYBACK_RATES.indexOf(playbackRate) + 1) % PLAYBACK_RATES.length;
    const nextRate = PLAYBACK_RATES[nextIdx];
    videoRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const toggleFullscreen = () => {
    const target = containerRef.current || videoRef.current;
    if (!target) return;

    if (!document.fullscreenElement) {
      target.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
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
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-6 overflow-y-auto"
    >
      {/* Top Controls: Logo Watermark + Fullscreen Toggle + Close Button */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-6 flex items-center justify-between z-50 pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="font-archivo text-lg sm:text-xl font-bold tracking-tight text-white">
            Piyush<span className="text-emerald-400">.</span>
          </span>
          <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 uppercase font-semibold">
            // LIVE THEATRICAL CINEMA
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Top Fullscreen Toggle Button (Matching user screenshot) */}
          <button
            onClick={toggleFullscreen}
            className="p-2 sm:p-2.5 rounded-full bg-neutral-900 border border-white/20 hover:bg-white hover:text-black text-white transition-all duration-200 shadow-xl"
            title={isFullscreen ? "Exit Fullscreen (F)" : "Enter Fullscreen (F)"}
          >
            {isFullscreen ? <Minimize className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-neutral-900 border border-white/20 hover:bg-white hover:text-black text-white transition-all duration-200 shadow-xl"
            title="Close Modal (Esc)"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Main Cinema Content Container */}
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col lg:flex-row items-center justify-center gap-6 mt-12 sm:mt-10">
        
        {/* VIDEO DISPLAY AREA */}
        <div className="relative w-full lg:flex-1 max-h-[80vh] flex items-center justify-center rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl group">
          
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
            webkit-playsinline="true"
            x5-playsinline="true"
            crossOrigin="anonymous"
            preload="auto"
            loop
            onTimeUpdate={handleTimeUpdate}
            onClick={handleVideoClick}
            className="w-full max-h-[75vh] object-contain cursor-pointer bg-black"
          />

          {/* Unmute Prompt Banner if autoplay was muted by browser */}
          {isMuted && (
            <button
              onClick={handleEnableAudio}
              onTouchEnd={handleEnableAudio}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-obsidian-950 font-black font-mono text-xs sm:text-sm flex items-center gap-2.5 shadow-[0_0_35px_rgba(16,185,129,0.85)] backdrop-blur-md active:scale-95 transition-all z-40 border-2 border-white cursor-pointer animate-pulse"
            >
              <Volume2 className="w-5 h-5 text-obsidian-950 animate-bounce" />
              <span className="uppercase tracking-wider">TAP FOR SOUND 🔊</span>
            </button>
          )}

          {/* Sound & Play/Pause Controls Bar (Matching exact user screenshot with 1.0x & sound) */}
          <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-center justify-between z-30 opacity-95 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition"
                title={isPlaying ? "Pause (Space)" : "Play (Space)"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
              </button>

              {/* Speed Controller 1.0x (Matches user screenshot) */}
              <button
                onClick={cyclePlaybackRate}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs font-bold transition"
                title="Change Playback Speed"
              >
                {playbackRate.toFixed(1)}x
              </button>

              {/* Sound Toggle (High Priority Fix: Sound ON/MUTED) */}
              <button
                onClick={toggleMute}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className={`px-3 py-1.5 rounded-full transition flex items-center gap-2 text-xs font-mono font-medium cursor-pointer ${
                  isMuted
                    ? "bg-amber-500/25 text-amber-300 border border-amber-500/50 animate-pulse"
                    : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                }`}
                title={isMuted ? "Click to Unmute (M)" : "Mute (M)"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                <span className="font-bold">{isMuted ? "TAP FOR SOUND 🔊" : "SOUND ON"}</span>
              </button>

              <span className="hidden md:inline-block text-[10px] text-neutral-400 font-mono">
                {isMuted ? "Audio muted — tap to unmute" : "Audio active (Check phone silent switch 🔕)"}
              </span>

              {/* Volume Slider */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setVolume(val);
                  if (videoRef.current) {
                    videoRef.current.volume = val;
                    videoRef.current.muted = val === 0;
                  }
                  setIsMuted(val === 0);
                  setShowUnmuteHint(false);
                }}
                className="w-16 sm:w-20 accent-emerald-400 hidden sm:inline-block cursor-pointer"
                title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
              />
            </div>

            {/* Right side of control bar: Video counter + Fullscreen button */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-400 font-mono">
                {String(currentIndex + 1).padStart(2, "0")} / {String(allVideos.length).padStart(2, "0")}
              </span>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Scrubber Progress Bar */}
          <div
            className="absolute bottom-0 inset-x-0 h-1.5 bg-white/20 cursor-pointer z-40 hover:h-2 transition-all"
            onClick={handleSeek}
          >
            <div className="h-full bg-emerald-400" style={{ width: `${progress}%` }} />
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
