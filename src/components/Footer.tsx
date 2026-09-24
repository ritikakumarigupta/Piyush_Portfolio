"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Instagram, Linkedin, Youtube, Mail, MessageSquare } from "lucide-react";

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
    <footer className="relative bg-[#070707] border-t border-white/10 pt-16 pb-12 overflow-hidden text-neutral-400 font-sans">
      {/* Subtle top spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-radial from-white/[0.03] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5 items-start">
          
          {/* Left Column: Big Karmayog Studio Logo + Wordmark + Identity */}
          <div className="md:col-span-7 space-y-5">
            {/* Big Karmayog Studio Logo Emblem */}
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden border-2 border-amber-400/40 shadow-[0_0_25px_rgba(212,175,55,0.45)] flex-shrink-0 bg-black">
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

              <div className="flex items-center gap-2">
                <span className="font-archivo text-xl sm:text-2xl font-black text-white tracking-tight">
                  Piyush Kumar Gupta
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  LEAD CREATOR
                </span>
              </div>
            </div>

            {/* Studio Tagline & Description */}
            <div className="space-y-1.5 max-w-md">
              <span className="text-xs font-mono text-amber-400 tracking-wider uppercase block font-semibold">
                // KARMAYOG STUDIO PRODUCTION PIPELINE
              </span>
              <p className="text-sm text-neutral-200 font-medium">
                Professional Video Editing · Motion Graphics · AI-Powered Video Content
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We specialize in professional Video Editing, Motion Graphics &amp; AI-Powered Video Content for YouTube, Reels, Ads &amp; Corporate projects. Share your requirements here, and we&apos;ll get back to you shortly! 🎬
              </p>
            </div>

            {/* Green Status Line */}
            <div className="inline-flex items-center gap-2 pt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-emerald-400 font-medium">
                // Status: Open for Commission &amp; Remote Contracts 2026
              </span>
              <h2 className="text-3xxl">PIYUSH</h2>
            </div>
          </div>

          {/* Right Column: Direct Contact (WhatsApp & Email) & Socials */}
          <div className="md:col-span-5 md:ml-auto space-y-4">
            <span className="text-xs font-mono text-neutral-400 tracking-wider uppercase block font-semibold">
              // Direct Contact & Connect
            </span>
            
            {/* Direct WhatsApp & Email Buttons */}
            <div className="space-y-2.5">
              <a
                href="https://wa.me/916202842908?text=Hi%20Piyush,%20I%20would%20like%20to%20discuss%20a%20project"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/60 transition-all text-white group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                      WhatsApp Direct
                    </div>
                    <div className="text-sm font-mono font-bold text-white tracking-wide">
                      +91 6202842908
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                  Chat ↗
                </span>
              </a>

              <a
                href="mailto:piyushkumargupta159@gmail.com?subject=Project%20Enquiry%20-%20Karmayogi%20Studio"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-neutral-300 group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-semibold">
                      Official Email
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-medium text-neutral-200">
                      piyushkumargupta159@gmail.com
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-neutral-400 group-hover:translate-x-0.5 transition-transform">
                  Send ↗
                </span>
              </a>
            </div>

            {/* Social handles + CMS link */}
            <div className="flex items-center justify-between pt-2">
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
                className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-emerald-400 underline underline-offset-4 transition-colors"
              >
                <span>CMS Panel</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-600 font-mono gap-4">
          <p>
            &copy; {new Date().getFullYear()} Piyush Kumar Gupta · {studioName}. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
