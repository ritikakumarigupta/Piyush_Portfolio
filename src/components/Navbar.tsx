"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, FileText } from "lucide-react";

interface NavbarProps {
  logoUrl?: string;
}

export default function Navbar({ logoUrl = "/assets/karmayogi-logo.svg" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Enquire", href: "#contact" },
    { name: "Skills", href: "#skills" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Projects", href: "#projects" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl shadow-black/80"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Larger Prominent Brand Logo & Typography */}
          <Link
            href="#home"
            className="flex items-center gap-3.5 group transition-transform duration-200 hover:scale-[1.02]"
          >
            {/* Logo size increased to h-14 w-14 (sm:h-16 sm:w-16) */}
            <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden border border-amber-400/50 shadow-[0_0_20px_rgba(212,175,55,0.5)] flex-shrink-0 bg-black">
              <Image
                src={logoUrl || "/assets/karmayogi-gold-logo.jpg"}
                alt="Karmayog Studio"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Wordmark */}
            <div className="flex flex-col">
              <span className="font-archivo text-base sm:text-lg font-black tracking-wider text-white leading-tight">
                KARMAYOG
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">
                PRODUCTION HOUSE
              </span>
              <span className="text-[7px] sm:text-[8px] font-mono tracking-tight text-amber-200/80 uppercase mt-0.5 hidden sm:block">
                Video Editing • VFX • Story Telling • AI Creator
              </span>
            </div>
          </Link>

          {/* Center: Clean Spaced Nav links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium uppercase tracking-widest text-neutral-400 hover:text-white transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right: Status Pill + Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* "Available" status pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="hidden xl:inline">Available for Work</span>
              <span className="xl:hidden">Available</span>
            </div>

            {/* Dispatch Form Button */}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all duration-200 hover:scale-[1.03] shadow-lg shadow-white/10"
            >
              <FileText className="w-3.5 h-3.5 text-black" />
              <span>Dispatch</span>
            </a>

            {/* Admin CMS Button */}
            <Link
              href="/admin"
              className="text-[11px] font-mono text-neutral-400 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-neutral-800 hover:border-amber-400/50 bg-neutral-900/50"
            >
              CMS
            </Link>
          </div>

          {/* Mobile & Tablet Menu Button */}
          <div className="flex xl:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0F0F0F] border-b border-white/10 px-6 py-6 mt-3 space-y-3 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold tracking-wider text-neutral-300 hover:text-white uppercase py-2 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider"
            >
              Dispatch / Enquiry Form
            </a>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 rounded-full border border-neutral-800 text-neutral-400 text-xs font-mono"
            >
              Admin Dashboard (CMS)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}