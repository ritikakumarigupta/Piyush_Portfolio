"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Instagram, Linkedin, Youtube, Mail, MessageSquare, Sparkles } from "lucide-react";

interface FooterProps {
  logoUrl?: string;
  studioName?: string;
}

export default function Footer({
  logoUrl = "/assets/karmayog-logo.svg",
  studioName = "KARMAYOG STUDIO",
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050508] border-t border-white/10 pt-16 pb-10 overflow-hidden text-neutral-400 font-sans">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-purple-950/20 via-white/[0.02] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section: Karmayog Studio Branding + Direct Connect */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10 items-start">
          
          {/* Left Column: Brand Emblem + Identity */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden border-2 border-amber-400/40 shadow-[0_0_25px_rgba(212,175,55,0.4)] flex-shrink-0 bg-black">
                <Image
                  src={logoUrl || "/assets/karmayog-logo.svg"}
                  alt={studioName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-archivo text-lg sm:text-xl font-black text-white tracking-tight block">
                    KARMAYOG STUDIO
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 uppercase font-bold tracking-wider">
                    // DIRECT CONTACT &amp; CONNECT
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold block mt-0.5">
                  Karmayog Production House
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-lg leading-relaxed">
              Professional Video Editing · Motion Graphics · AI-Powered Video Content for YouTube, Reels, Ads &amp; Corporate Productions.
            </p>
          </div>

          {/* Right Column: Direct Contact & Socials */}
          <div className="md:col-span-5 md:ml-auto w-full max-w-md space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href="https://wa.me/916202842908?text=Hi%20Piyush,%20I%20would%20like%20to%20discuss%20a%20project"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/60 transition-all text-white group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-emerald-400 uppercase font-bold">WhatsApp</div>
                    <div className="text-xs font-mono font-bold text-white">+91 6202842908</div>
                  </div>
                </div>
                <span className="text-xs text-emerald-400 group-hover:translate-x-0.5 transition-transform">↗</span>
              </a>

              <a
                href="mailto:piyushkumargupta159@gmail.com?subject=Project%20Enquiry%20-%20Karmayogi%20Studio"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-neutral-300">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-neutral-400 uppercase font-bold">Official Email</div>
                    <div className="text-xs font-mono text-white truncate max-w-[110px]">Email Direct</div>
                  </div>
                </div>
                <span className="text-xs text-neutral-400 group-hover:translate-x-0.5 transition-transform">↗</span>
              </a>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/40 transition-all hover:scale-105"
                  title="YouTube"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/40 transition-all hover:scale-105"
                  title="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/40 transition-all hover:scale-105"
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>

              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-emerald-400 underline underline-offset-4 transition-colors"
              >
                <span>CMS Portal</span>
                <span>→</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Middle Metadata Columns (Matching User Screenshot Layout Exactly) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 pb-6 text-xs font-mono">
          
          {/* Column 1: Production Discipline */}
          <div className="space-y-1">
            <span className="text-neutral-500 uppercase tracking-widest font-semibold block text-[10px]">
              // Production Disciplines
            </span>
            <p className="text-neutral-300 font-medium leading-relaxed">
              Cinematic Video Editing<br />
              Motion Graphics &amp; VFX<br />
              AI Neural Video Direction
            </p>
          </div>

          {/* Column 2: Status */}
          <div className="space-y-1 sm:text-center">
            <span className="text-neutral-500 uppercase tracking-widest font-semibold block text-[10px]">
              // Status
            </span>
            <div className="inline-flex items-center gap-2 text-emerald-400 font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Open to Opportunities</span>
            </div>
            <p className="text-neutral-400">Available for Remote &amp; Global Projects</p>
          </div>

          {/* Column 3: Region */}
          <div className="space-y-1 sm:text-right">
            <span className="text-neutral-500 uppercase tracking-widest font-semibold block text-[10px]">
              // Region
            </span>
            <p className="text-neutral-300 font-medium">India / Worldwide</p>
            <p className="text-neutral-500">UTC +05:30 (IST)</p>
          </div>

        </div>

        {/* MASSIVE GIGANTIC TYPOGRAPHY: "PIYUSH" (Exact Color Match from Reference Photo) */}
        <div className="w-full py-6 sm:py-10 md:py-14 text-center select-none overflow-hidden flex items-center justify-center relative">
          {/* Subtle Ambient Diffuse Halo Matching Photo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-36 bg-[#9da0a6]/10 blur-3xl rounded-full pointer-events-none -z-10" />

          <h1 className="font-archivo text-[19vw] sm:text-[20vw] md:text-[21vw] lg:text-[22vw] leading-[0.8] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#b8bac2] via-[#9ca0a6] to-[#73757d] drop-shadow-[0_0_35px_rgba(156,160,166,0.28)] hover:scale-[1.01] transition-transform duration-500 cursor-default">
            PIYUSH
          </h1>
        </div>

        {/* Bottom Transmission & Back to Top Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 font-mono gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <span className="text-[11px] uppercase tracking-wider text-neutral-300 font-bold block">
              Contact Transmission
            </span>
            <p className="text-[11px] text-neutral-500">
              &copy; {new Date().getFullYear()} Piyush Kumar Gupta · {studioName} | Built with Next.js &amp; Tailwind
            </p>
          </div>

          <a
            href="mailto:piyushkumargupta159@gmail.com?subject=Project%20Enquiry%20-%20Karmayogi%20Studio"
            className="text-neutral-300 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors font-medium text-xs sm:text-sm"
          >
            piyushkumargupta159@gmail.com
          </a>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
