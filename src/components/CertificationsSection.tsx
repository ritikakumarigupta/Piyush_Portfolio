"use client";

import { Award, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";

export default function CertificationsSection() {
  const certifications = [
    {
      id: "cert-1",
      code: "// CREDENTIAL 01",
      title: "DaVinci Resolve Certified End-User",
      issuer: "Blackmagic Design",
      platform: "Blackmagic Official Training",
      date: "2024",
      tag: "Color & Editing",
      verified: true,
    },
    {
      id: "cert-2",
      code: "// CREDENTIAL 02",
      title: "Adobe Certified Professional: Video Design",
      issuer: "Adobe Systems",
      platform: "Adobe Creative Cloud",
      date: "2023",
      tag: "Premiere & After Effects",
      verified: true,
    },
    {
      id: "cert-3",
      code: "// CREDENTIAL 03",
      title: "Generative AI Video & Neural Synthesis",
      issuer: "DeepLearning.AI",
      platform: "AI Synthesis Track",
      date: "2025",
      tag: "Runway & Diffusion",
      verified: true,
    },
    {
      id: "cert-4",
      code: "// CREDENTIAL 04",
      title: "Advanced 3D Motion & Kinetic Typography",
      issuer: "School of Motion",
      platform: "Motion Design Masterclass",
      date: "2024",
      tag: "C4D & Blender",
      verified: true,
    },
  ];

  return (
    <section id="certifications" className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden border-t border-white/5">
      {/* Spotlight background */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-radial from-white/[0.04] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Eyebrow */}
        <div className="mb-4">
          <span className="eyebrow-tag">
            // ACCREDITATIONS
          </span>
        </div>

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <h2 className="font-archivo text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Certifications &amp; Credentials
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl">
              Verified certifications in modern non-linear editing, color grading pipelines, and generative AI synthesis.
            </p>
          </div>
          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ALL VERIFIED CREDENTIALS</span>
          </div>
        </div>

        {/* Grid of Certificate Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="spotlight-card rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                {/* Code Eyebrow & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono text-neutral-400 font-semibold tracking-wider">
                    {cert.code}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all">
                    <Award className="w-4 h-4" />
                  </div>
                </div>

                {/* Certificate Name */}
                <h3 className="font-archivo text-base sm:text-lg font-bold uppercase tracking-tight text-white mb-2 group-hover:text-white transition-colors">
                  {cert.title}
                </h3>

                {/* Issuer & Platform */}
                <p className="text-xs font-mono text-neutral-300 mb-1">
                  {cert.issuer}
                </p>
                <p className="text-[11px] text-neutral-400">
                  {cert.platform}
                </p>
              </div>

              {/* Bottom Details */}
              <div className="pt-5 mt-5 border-t border-white/5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {cert.date}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-neutral-400">
                  {cert.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
