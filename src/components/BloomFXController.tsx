"use client";

import { useState, useEffect } from "react";
import { Sparkles, Sliders, X, RotateCcw, Eye, Sun, Wind, Clock } from "lucide-react";
import { BloomConfig, DEFAULT_BLOOM_CONFIG } from "./WhiteLightBloom";

export default function BloomFXController() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<BloomConfig>(DEFAULT_BLOOM_CONFIG);

  useEffect(() => {
    const saved = localStorage.getItem("piyush_bloom_config");
    if (saved) {
      try {
        setConfig((prev) => ({ ...prev, ...JSON.parse(saved) }));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const updateConfig = (updates: Partial<BloomConfig>) => {
    const next = { ...config, ...updates };
    setConfig(next);
    localStorage.setItem("piyush_bloom_config", JSON.stringify(next));

    // Update CSS root variables in real time for immediate 60fps GPU rendering
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--bloom-intensity", String(next.intensity));
      root.style.setProperty("--bloom-blur", `${next.blur}px`);
      root.style.setProperty("--bloom-opacity", String(next.opacity));
      root.style.setProperty("--bloom-duration", `${next.duration}s`);
      root.style.setProperty("--bloom-fade-in", `${next.fadeIn}s`);
      root.style.setProperty("--bloom-fade-out", `${next.fadeOut}s`);
      root.style.setProperty("--bloom-blend", next.blendMode);
    }

    // Dispatch custom event for React components
    window.dispatchEvent(
      new CustomEvent("bloomConfigChanged", { detail: next })
    );
  };

  const handleReset = () => {
    updateConfig(DEFAULT_BLOOM_CONFIG);
  };

  return (
    <aside aria-label="Cinematic Bloom FX Controller" className="fixed bottom-6 right-6 z-50">
      {/* Trigger Floating Pill Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-neutral-900/90 hover:bg-white border border-white/20 text-white hover:text-black shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 text-xs font-mono font-medium"
        >
          <Sparkles className="w-4 h-4 text-emerald-400 group-hover:text-black animate-pulse" />
          <span>Cinematic Light FX</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        </button>
      )}

      {/* Expanded Control Panel */}
      {isOpen && (
        <div className="w-80 sm:w-96 rounded-2xl bg-[#121212]/95 border border-white/20 shadow-2xl backdrop-blur-xl p-5 text-neutral-200 font-sans space-y-4 animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-white" />
              <h3 className="font-archivo text-sm font-bold uppercase tracking-wider text-white">
                Cinematic Bloom Light
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                title="Reset to video match defaults"
                className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-[11px] font-mono text-neutral-400 leading-relaxed">
            Recreated soft white bloom &amp; rim light around subject and background.
          </p>

          {/* Sliders Grid */}
          <div className="space-y-3.5 text-xs">
            {/* 1. Glow Intensity */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-neutral-300">Glow Intensity</span>
                <span className="text-emerald-400 font-bold">
                  {Math.round(config.intensity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={config.intensity}
                onChange={(e) => updateConfig({ intensity: parseFloat(e.target.value) })}
                className="w-full accent-white cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
              />
            </div>

            {/* 2. Blur Amount */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-neutral-300">Blur Amount</span>
                <span className="text-emerald-400 font-bold">{config.blur}px</span>
              </div>
              <input
                type="range"
                min="20"
                max="180"
                step="5"
                value={config.blur}
                onChange={(e) => updateConfig({ blur: parseInt(e.target.value) })}
                className="w-full accent-white cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
              />
            </div>

            {/* 3. Opacity */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-neutral-300">Opacity</span>
                <span className="text-emerald-400 font-bold">
                  {Math.round(config.opacity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={config.opacity}
                onChange={(e) => updateConfig({ opacity: parseFloat(e.target.value) })}
                className="w-full accent-white cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
              />
            </div>

            {/* 4. Glow Duration */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-neutral-300">Glow Duration (Breathing)</span>
                <span className="text-emerald-400 font-bold">{config.duration}s</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="8.0"
                step="0.2"
                value={config.duration}
                onChange={(e) => updateConfig({ duration: parseFloat(e.target.value) })}
                className="w-full accent-white cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
              />
            </div>

            {/* 5. Fade In & Fade Out (Two Columns) */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[10px]">
                  <span>Fade-In</span>
                  <span className="text-emerald-400">{config.fadeIn}s</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.5"
                  step="0.1"
                  value={config.fadeIn}
                  onChange={(e) => updateConfig({ fadeIn: parseFloat(e.target.value) })}
                  className="w-full accent-white cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[10px]">
                  <span>Fade-Out</span>
                  <span className="text-emerald-400">{config.fadeOut}s</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.5"
                  step="0.1"
                  value={config.fadeOut}
                  onChange={(e) => updateConfig({ fadeOut: parseFloat(e.target.value) })}
                  className="w-full accent-white cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
                />
              </div>
            </div>

            {/* 6. Blend Mode */}
            <div className="space-y-1 pt-1">
              <span className="font-mono text-[11px] text-neutral-300 block">Blend Mode</span>
              <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
                {(["screen", "plus-lighter", "overlay"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => updateConfig({ blendMode: mode })}
                    className={`py-1.5 px-2 rounded-lg border text-center transition-colors uppercase ${
                      config.blendMode === mode
                        ? "bg-white text-black font-bold border-white"
                        : "bg-neutral-900 border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer toggle & close */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
            <label className="flex items-center gap-2 cursor-pointer text-neutral-400 hover:text-white">
              <input
                type="checkbox"
                checked={config.enabled}
                onChange={(e) => updateConfig({ enabled: e.target.checked })}
                className="rounded accent-white"
              />
              <span>Effect Enabled</span>
            </label>
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 rounded-full bg-white text-black font-bold text-[10px] uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
