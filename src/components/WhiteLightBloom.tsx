"use client";

import { useEffect, useState } from "react";

export interface BloomConfig {
  intensity: number;   // 0.1 to 1.0 (default 0.75)
  blur: number;        // 20 to 180 px (default 85)
  opacity: number;     // 0.1 to 1.0 (default 0.85)
  duration: number;    // 1.0 to 10.0 s (default 3.8)
  fadeIn: number;      // 0.1 to 3.0 s (default 0.8)
  fadeOut: number;     // 0.1 to 3.0 s (default 1.2)
  blendMode: "screen" | "plus-lighter" | "overlay" | "color-dodge";
  enabled: boolean;
}

export const DEFAULT_BLOOM_CONFIG: BloomConfig = {
  intensity: 0.75,
  blur: 85,
  opacity: 0.85,
  duration: 3.8,
  fadeIn: 0.8,
  fadeOut: 1.2,
  blendMode: "screen",
  enabled: true,
};

interface WhiteLightBloomProps {
  className?: string;
  isTriggering?: boolean; // When hero title changes or user scrolls
  variant?: "hero" | "card" | "subtle";
}

export default function WhiteLightBloom({
  className = "",
  isTriggering = false,
  variant = "hero",
}: WhiteLightBloomProps) {
  const [config, setConfig] = useState<BloomConfig>(DEFAULT_BLOOM_CONFIG);

  useEffect(() => {
    // Load from localStorage if present
    const saved = localStorage.getItem("piyush_bloom_config");
    if (saved) {
      try {
        setConfig((prev) => ({ ...prev, ...JSON.parse(saved) }));
      } catch (e) {
        // ignore
      }
    }

    // Listen for real-time config updates from BloomFXController
    const handleConfigUpdate = (e: CustomEvent<BloomConfig>) => {
      if (e.detail) {
        setConfig(e.detail);
      }
    };

    window.addEventListener("bloomConfigChanged" as any, handleConfigUpdate);
    return () => window.removeEventListener("bloomConfigChanged" as any, handleConfigUpdate);
  }, []);

  if (!config.enabled) return null;

  // Compute layered gradient styles based on intensity
  const coreAlpha = Math.min(0.95, config.intensity * 0.9);
  const midAlpha = Math.min(0.7, config.intensity * 0.45);
  const outerAlpha = Math.min(0.3, config.intensity * 0.15);

  const transitionStyle = {
    transition: `opacity ${isTriggering ? config.fadeIn : config.fadeOut}s cubic-bezier(0.16, 1, 0.3, 1), transform ${config.fadeIn}s cubic-bezier(0.16, 1, 0.3, 1)`,
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-visible flex items-center justify-center ${className}`}
      style={{
        mixBlendMode: config.blendMode,
        zIndex: 1,
      }}
    >
      {/* 1. Ambient Background White Glow (Diffused wide atmosphere) */}
      <div
        className="white-bloom-glow rounded-full"
        style={{
          width: variant === "hero" ? "880px" : "420px",
          height: variant === "hero" ? "880px" : "420px",
          background: `radial-gradient(circle at center, rgba(255, 255, 255, ${coreAlpha}) 0%, rgba(255, 255, 255, ${midAlpha}) 35%, rgba(255, 255, 255, ${outerAlpha}) 60%, transparent 75%)`,
          filter: `blur(${config.blur}px)`,
          opacity: isTriggering ? config.opacity : config.opacity * 0.7,
          animationDuration: `${config.duration}s`,
          ...transitionStyle,
        }}
      />

      {/* 2. Concentrated Subject Rim / Halo Bloom (Directly behind portrait & shoulders) */}
      <div
        className="white-bloom-glow rounded-[50%]"
        style={{
          width: variant === "hero" ? "560px" : "280px",
          height: variant === "hero" ? "680px" : "340px",
          background: `radial-gradient(ellipse 60% 70% at 50% 45%, rgba(255, 255, 255, ${coreAlpha * 1.1}) 0%, rgba(255, 255, 255, ${midAlpha}) 45%, transparent 70%)`,
          filter: `blur(${Math.max(25, config.blur * 0.6)}px)`,
          opacity: isTriggering ? Math.min(1, config.opacity * 1.15) : config.opacity * 0.8,
          animationDuration: `${config.duration * 0.85}s`,
          ...transitionStyle,
        }}
      />

      {/* 3. Flare Burst Layer (Flares synchronously when title shifts or scrubs) */}
      {isTriggering && (
        <div
          className="white-bloom-flare rounded-full"
          style={{
            width: variant === "hero" ? "750px" : "350px",
            height: variant === "hero" ? "750px" : "350px",
            background: `radial-gradient(circle, rgba(255, 255, 255, ${coreAlpha}) 0%, rgba(255, 255, 255, ${midAlpha * 0.8}) 40%, transparent 70%)`,
            filter: `blur(${Math.max(30, config.blur * 0.7)}px)`,
            opacity: config.opacity,
            animationDuration: `${config.fadeIn}s`,
          }}
        />
      )}
    </div>
  );
}
