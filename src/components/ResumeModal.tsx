"use client";

import { useEffect, useRef, useState } from "react";
import { 
  X, 
  Printer, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  Cpu, 
  Award, 
  Languages, 
  Check, 
  Share2,
  FileText
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyContact = () => {
    navigator.clipboard.writeText("Piyush Kumar Gupta\nEmail: piyushkumarg52@gmail.com\nPhone: +91 6202842908\nLocation: Dahisar East, Mumbai, Maharashtra");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Resume Card Container */}
      <div 
        ref={dialogRef}
        className="relative w-full max-w-4xl bg-[#0D0D10] border border-white/15 rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Top Control Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-8 py-4 bg-[#141418]/95 border-b border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-archivo text-xs sm:text-sm font-bold tracking-wider uppercase text-white">
              Official Resume
            </span>
            <span className="text-[10px] font-mono text-neutral-400 px-2 py-0.5 rounded-full bg-white/5 border border-white/5 hidden sm:inline">
              // VERIFIED CREDENTIALS
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-bold font-mono transition-all duration-200 cursor-pointer shadow-md"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleCopyContact}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono transition-all duration-200 cursor-pointer border border-white/10"
              title="Copy contact info"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? "Copied!" : "Share"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-neutral-800 hover:bg-white hover:text-black text-neutral-300 transition-all duration-200 cursor-pointer border border-white/10"
              aria-label="Close Resume Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div id="printable-resume" className="overflow-y-auto p-6 sm:p-10 space-y-8 text-neutral-200 font-sans print:p-0 print:bg-white print:text-black">
          
          {/* Header Profile */}
          <div className="border-b border-white/10 pb-6 print:border-black print:pb-4">
            <h1 className="font-archivo text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white print:text-black">
              PIYUSH KUMAR GUPTA
            </h1>
            <p className="text-sm sm:text-base text-emerald-400 font-semibold tracking-wide uppercase mt-1 print:text-neutral-800">
              Video Editor &nbsp;|&nbsp; Motion Graphics Designer &nbsp;|&nbsp; AI Video Creator
            </p>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-xs font-mono text-neutral-400 print:text-neutral-600">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 print:text-black" />
                Dahisar East, Mumbai, Maharashtra
              </span>
              <span>•</span>
              <a href="tel:6202842908" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-emerald-400 print:text-black" />
                6202842908
              </a>
              <span>•</span>
              <a href="mailto:piyushkumarg52@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-emerald-400 print:text-black" />
                piyushkumarg52@gmail.com
              </a>
            </div>
          </div>

          {/* Section: Professional Summary */}
          <div>
            <h2 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold mb-2 flex items-center gap-2 print:text-black">
              <Sparkles className="w-3.5 h-3.5" />
              // PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-300 print:text-neutral-900">
              Creative and dedicated <strong>Video Editor</strong>, <strong>Motion Graphics Designer</strong>, and <strong>AI Video Creator</strong> with <strong>2 years</strong> of professional experience at <strong>Social Popcorn</strong> — 1 year as a Video Editor, followed by 1 year as Team Leader after being promoted within the same company. Skilled in professional video editing, motion graphics, AI-generated videos, and AI-powered advertising content. Experienced in developing engaging visual content for digital platforms with a strong focus on storytelling, creativity, quality, and timely delivery.
            </p>
          </div>

          {/* Section: Professional Experience */}
          <div className="space-y-6">
            <h2 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold flex items-center gap-2 print:text-black">
              <Briefcase className="w-3.5 h-3.5" />
              // PROFESSIONAL EXPERIENCE
            </h2>

            {/* Company Banner */}
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 print:border-black print:bg-transparent">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h3 className="font-archivo text-lg sm:text-xl font-bold uppercase text-white print:text-black">
                  Social Popcorn
                </h3>
                <span className="text-xs font-mono text-emerald-400 font-bold print:text-black">
                  Total Experience: 2 Years
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400">
                Promoted from Video Editor to Team Leader
              </p>
            </div>

            {/* Role 1: Team Leader */}
            <div className="space-y-3 pl-3 sm:pl-4 border-l-2 border-emerald-500/40 print:border-black">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="font-archivo text-base font-bold text-white print:text-black">
                  Team Leader, Video Editing &amp; Creative Production
                </h4>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold self-start sm:self-auto print:border-none print:text-black">
                  1 Year
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400 italic">
                Promoted within the same company after 1 year as Video Editor
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 list-disc list-inside leading-relaxed print:text-neutral-900">
                <li>Led and coordinated the team’s video editing and creative production workflows.</li>
                <li>Assigned tasks, reviewed edits, and gave creative direction and feedback to team members.</li>
                <li>Managed projects from concept development to final video delivery, ensuring deadlines were met.</li>
                <li>Maintained high-quality visual output across social media videos, promotional content, and advertisements.</li>
                <li>Continued hands-on work on motion graphics, visual effects, and AI-generated video and ad creatives.</li>
              </ul>
            </div>

            {/* Role 2: Video Editor */}
            <div className="space-y-3 pl-3 sm:pl-4 border-l-2 border-white/20 print:border-black">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="font-archivo text-base font-bold text-white print:text-black">
                  Video Editor
                </h4>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-white/10 font-bold self-start sm:self-auto print:border-none print:text-black">
                  1 Year
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400 italic">
                Joined Social Popcorn as an employee in the video editing team
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 list-disc list-inside leading-relaxed print:text-neutral-900">
                <li>Worked from client briefs and scripts to edit social media videos, promotional content, and advertisements using <strong>DaVinci Resolve</strong>, <strong>Adobe Premiere Pro</strong>, and <strong>Adobe After Effects</strong>.</li>
                <li>Followed a structured workflow: raw footage review, rough cut, motion graphics and effects, colour and sound polish, then final export.</li>
                <li>Created motion graphics, transitions, visual effects, and cinematic edits to make content more engaging.</li>
                <li>Started creating AI-generated videos and AI-powered advertisement creatives.</li>
                <li>Adapted content for different social media platforms and digital formats.</li>
                <li>Incorporated feedback from the team lead and clients, and delivered work on time.</li>
              </ul>
            </div>
          </div>

          {/* Section: Software Skills */}
          <div>
            <h2 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold mb-3 flex items-center gap-2 print:text-black">
              <Cpu className="w-3.5 h-3.5" />
              // SOFTWARE SKILLS
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {["DaVinci Resolve", "Adobe Premiere Pro", "Adobe After Effects"].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-xl bg-neutral-900 border border-white/15 text-sm font-semibold text-white tracking-wide print:border-black print:text-black"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Section: Core Skills & AI Creative Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Core Skills */}
            <div className="p-5 rounded-2xl bg-neutral-900/40 border border-white/10 print:border-black">
              <h3 className="font-archivo text-xs uppercase font-bold text-emerald-400 mb-3 tracking-wider print:text-black">
                CORE SKILLS
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-neutral-300 print:text-neutral-900">
                <li>▪ Video Editing</li>
                <li>▪ Motion Graphics</li>
                <li>▪ AI Video Creation</li>
                <li>▪ AI Advertisement Videos</li>
                <li>▪ Social Media Content</li>
                <li>▪ Short-Form Video Editing</li>
                <li>▪ Promotional &amp; Brand</li>
                <li>▪ Visual Storytelling</li>
                <li>▪ Video Compositing</li>
                <li>▪ Transitions &amp; VFX</li>
                <li>▪ Creative Direction</li>
                <li>▪ Team Leadership</li>
                <li>▪ Project Coordination</li>
              </ul>
            </div>

            {/* AI & Creative Skills */}
            <div className="p-5 rounded-2xl bg-neutral-900/40 border border-white/10 print:border-black">
              <h3 className="font-archivo text-xs uppercase font-bold text-amber-400 mb-3 tracking-wider print:text-black">
                AI &amp; CREATIVE SKILLS
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-neutral-300 print:text-neutral-900">
                <li>▪ AI Video Generation</li>
                <li>▪ AI Advertisement Creation</li>
                <li>▪ AI Image Generation</li>
                <li>▪ AI-Assisted Production</li>
                <li>▪ Prompt-Based Visuals</li>
                <li>▪ Product Ad Videos</li>
                <li>▪ Cinematic AI Visuals</li>
                <li>▪ AI Storyboarding &amp; Concepts</li>
              </ul>
            </div>

          </div>

          {/* Section: Education */}
          <div>
            <h2 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold mb-3 flex items-center gap-2 print:text-black">
              <GraduationCap className="w-3.5 h-3.5" />
              // EDUCATION
            </h2>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-neutral-900/50 border border-white/10 print:border-black">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h4 className="font-archivo text-sm font-bold text-white print:text-black">
                    Graduation — B.Sc. Information Technology
                  </h4>
                  <span className="text-xs font-mono text-neutral-400">Doranda College, Ranchi</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/50 border border-white/10 print:border-black">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h4 className="font-archivo text-sm font-bold text-white print:text-black">
                    Intermediate — B.Sc.
                  </h4>
                  <span className="text-xs font-mono text-neutral-400">S.S. Memorial College, Ranchi</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/50 border border-white/10 print:border-black">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h4 className="font-archivo text-sm font-bold text-white print:text-black">
                    Matriculation
                  </h4>
                  <span className="text-xs font-mono text-neutral-400">Corona Universal School, Pandra, Ranchi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Languages & Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Languages */}
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10 print:border-black">
              <h3 className="font-archivo text-xs uppercase font-bold text-neutral-400 mb-2 print:text-black">
                LANGUAGES
              </h3>
              <div className="space-y-1 text-xs font-mono text-neutral-200 print:text-black">
                <p><strong>Hindi</strong> — Native</p>
                <p><strong>English</strong> — Professional Working Proficiency</p>
              </div>
            </div>

            {/* Address */}
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10 print:border-black">
              <h3 className="font-archivo text-xs uppercase font-bold text-neutral-400 mb-2 print:text-black">
                ADDRESS
              </h3>
              <div className="space-y-1 text-xs font-mono text-neutral-200 print:text-black">
                <p><strong>Current:</strong> Dahisar East, Mumbai, Maharashtra</p>
                <p><strong>Permanent:</strong> Piska More, Ranchi, Jharkhand</p>
              </div>
            </div>

          </div>

          {/* Section: Career Objective */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 print:border-black print:bg-transparent">
            <h2 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold mb-2 print:text-black">
              // CAREER OBJECTIVE
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic font-serif print:text-neutral-900">
              &ldquo;To build a successful career in Video Editing, Motion Graphics, and AI-powered Content Creation, where I can utilize my creative and technical skills to produce high-quality visual content, contribute to innovative advertising campaigns, and grow as a creative professional.&rdquo;
            </p>
          </div>

          {/* Section: Declaration & Sign-off */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-neutral-400 gap-3 print:text-black print:border-black">
            <p className="max-w-md text-[11px]">
              I hereby declare that the information provided above is true and correct to the best of my knowledge and belief.
            </p>
            <div className="text-right">
              <span className="font-archivo text-sm font-bold text-white block print:text-black">
                Piyush Kumar Gupta
              </span>
              <span className="text-[10px] text-emerald-400 font-mono print:text-black">
                // Video Editor &amp; Motion Designer
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
