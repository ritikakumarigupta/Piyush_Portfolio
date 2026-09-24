"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import TechStackSection from "@/components/TechStackSection";
import RoadmapSection from "@/components/RoadmapSection";
import ProjectsSection from "@/components/ProjectsSection";
import FullscreenVideoModal from "@/components/FullscreenVideoModal";
import BloomFXController from "@/components/BloomFXController";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CinematicIntroPreloader from "@/components/CinematicIntroPreloader";
import { VideoProject, StudioSettings } from "@/lib/db";

export default function HomePage() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [videos, setVideos] = useState<VideoProject[]>([]);
  const [settings, setSettings] = useState<StudioSettings | null>(null);
  const [activeModalVideo, setActiveModalVideo] = useState<VideoProject | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [vRes, sRes] = await Promise.all([
          fetch("/api/videos"),
          fetch("/api/settings"),
        ]);
        if (vRes.ok) {
          const vData = await vRes.json();
          setVideos(vData);
        }
        if (sRes.ok) {
          const sData = await sRes.json();
          setSettings(sData);
        }
      } catch (err) {
        console.error("Failed to load portfolio data:", err);
      }
    }
    loadData();
  }, []);

  // Global mobile audio unlock on first user interaction
  useEffect(() => {
    const unlockGlobalAudio = () => {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          if (ctx.state === "suspended") {
            ctx.resume().catch(() => {});
          }
        }
      } catch {}
    };

    window.addEventListener("touchstart", unlockGlobalAudio, { passive: true, once: true });
    window.addEventListener("click", unlockGlobalAudio, { passive: true, once: true });

    return () => {
      window.removeEventListener("touchstart", unlockGlobalAudio);
      window.removeEventListener("click", unlockGlobalAudio);
    };
  }, []);

  const logoUrl = settings?.logoUrl || "/assets/karmayogi-logo.svg";

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] relative overflow-hidden selection:bg-white selection:text-black">
      {/* 0) Ultra-smooth 60/120fps Kinetic Inertia Scroll */}
      <SmoothScroll />

      {/* 0.5) Cinematic Intro Preloader (Resume gets you shortlisted. Portfolio gets you hired) */}
      {showPreloader && (
        <CinematicIntroPreloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* 1) Fixed Navbar with Prominent Logo */}
      <Navbar logoUrl={logoUrl} />

      {/* 2) Hero Section with Full-Bleed Desaturated Portrait & White Light Bloom */}
      <HeroSection
        portraitDarkUrl="/assets/portrait-hero-dark.jpg"
        portraitTransparentUrl="/assets/portrait-hero-transparent.png"
      />

      {/* 3) About Section: System Profile, Framed Portrait with White Bloom, 3 Stat Cards, Karmayogi Studio Block */}
      <AboutSection
        portraitUrl="/assets/portrait-hero-dark.jpg"
        logoUrl={logoUrl}
      />

      {/* 4) Tech Stack: # TECHNICAL STACK Dual Infinite Horizontal Marquee (Pure Editing & AI Tools) */}
      <TechStackSection />

      {/* 5) Engineering Roadmap: // ENGINEERING ROADMAP 4 Execution Root Cards */}
      <RoadmapSection />

      {/* 6) Projects: // PORTFOLIO WORK Horizontal Scrollable Cards with Video Player Modal */}
      <ProjectsSection
        videos={videos}
        onOpenModal={(video) => setActiveModalVideo(video)}
      />

      {/* 7) Form Fill Section: Start A Project (Moved to bottom above Footer) */}
      <ContactSection />

      {/* 8) Footer with Direct WhatsApp (+91 6202842908) and Email (piyushkumargupta159@gmail.com) */}
      <Footer logoUrl={logoUrl} studioName="KARMAYOG STUDIO" />

      {/* 9) Floating Real-time Cinematic Bloom FX Controller */}
      <BloomFXController />

      {/* Interactive Theatrical Video Modal */}
      {activeModalVideo && (
        <FullscreenVideoModal
          video={activeModalVideo}
          allVideos={videos}
          onClose={() => setActiveModalVideo(null)}
          onSelectVideo={(v) => setActiveModalVideo(v)}
          logoUrl={logoUrl}
        />
      )}
    </main>
  );
}
