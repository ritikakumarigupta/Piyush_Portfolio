"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, MessageSquare, Mail, Zap, Check, Shield, Clock } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    projectType: "Brand Commercial / Reel",
    message: "",
    consent: false,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const fullName = `${formData.firstName} ${formData.lastName}`.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !fullName || !formData.message) {
      setStatus("error");
      setErrorMessage("Please complete all required fields before dispatching.");
      return;
    }
    if (!formData.consent) {
      setStatus("error");
      setErrorMessage("Please accept the permission checkbox to proceed.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: fullName,
          email: formData.email,
          projectType: formData.projectType,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to transmit dispatch message.");
      }

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        projectType: "Brand Commercial / Reel",
        message: "",
        consent: false,
      });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again or email directly.");
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Large Watermark Word "CONTACT" in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span className="font-archivo text-[14vw] sm:text-[16vw] font-black uppercase text-white/[0.02] tracking-tighter leading-none">
          CONTACT
        </span>
      </div>

      {/* Top subtle radial spotlight glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-radial from-white/[0.06] via-white/[0.01] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Eyebrow */}
        <div className="mb-4">
          <span className="eyebrow-tag">
            // LIVE DISPATCH MODE
          </span>
        </div>

        {/* Section Heading & Subtext */}
        <div className="mb-14 sm:mb-16 max-w-3xl">
          <h2 className="font-archivo text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-4">
            Start A Project.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Submit your project requirements directly to Piyush Kumar Gupta and Karmayogi Studio. We review every transmission and reply within a few hours.
          </p>
        </div>

        {/* Two Columns: Studio Info Card on Left, Transmission Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Direct Studio Dispatch Channels (Replaced Code Card as requested) */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="spotlight-card rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  // OFFICIAL STUDIO CHANNELS
                </span>
                <h3 className="font-archivo text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                  Direct Production Dispatch
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                  Have urgent footage or an active campaign ready to launch? Reach out directly via WhatsApp or email for instant turnaround quotes.
                </p>
              </div>

              {/* Direct Quick Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href="https://wa.me/916202842908?text=Hi%20Piyush,%20I%20would%20like%20to%20discuss%20a%20video%20project%20with%20Karmayogi%20Studio"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-white transition-all group shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                        WhatsApp Fast Chat
                      </span>
                      <span className="text-xs text-neutral-300 font-mono">
                        +91 6202842908 · Direct Studio Messenger
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>

                <a
                  href="mailto:piyushkumargupta159@gmail.com?subject=Project%20Commission%20-%20Karmayogi%20Studio"
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 text-white transition-all group shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-neutral-300 group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="block text-xs font-mono font-bold text-white uppercase tracking-wider">
                        Official Email
                      </span>
                      <span className="text-xs text-neutral-300 font-mono">
                        piyushkumargupta159@gmail.com
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-white group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              </div>

              {/* Production Perks */}
              <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Avg Response Time: &lt; 2 Hours</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Fast 24-48h First Cut Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Shield className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>100% Commercial &amp; Broadcast Rights</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <div className="spotlight-card rounded-2xl p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name & Last Name (Two Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-400">
                      First Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="e.g. Rahul"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900/80 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all text-sm font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-400">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="e.g. Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900/80 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all text-sm font-sans"
                    />
                  </div>
                </div>

                {/* Email Address (Full Width) */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-400">
                    Email Address <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. client@brand.com"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900/80 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all text-sm font-sans"
                  />
                </div>

                {/* Service / Project Type */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-400">
                    Project Category
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900/80 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all text-sm font-sans"
                  >
                    <option value="Brand Commercial / Ad">Brand Commercial / Ad</option>
                    <option value="Viral Social Reel / Shorts">Viral Social Reel / Shorts</option>
                    <option value="AI Video Generation / VFX">AI Video Generation / VFX</option>
                    <option value="Kinetic Motion Graphics / 3D">Kinetic Motion Graphics / 3D</option>
                    <option value="Full Post-Production Package">Full Post-Production Package</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-400">
                    Project Overview &amp; Footage Details <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your footage, visual references, target deadline, and editing requirements..."
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900/80 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all text-sm font-sans resize-none"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-white focus:ring-white/30 cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-neutral-400 leading-relaxed cursor-pointer select-none">
                    I give permission to contact me at this email address regarding this project transmission.
                  </label>
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Success Banner */}
                {status === "success" && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                    <div>
                      <strong className="block font-semibold">Transmission Dispatched Successfully!</strong>
                      <span>Piyush Kumar Gupta and Karmayogi Studio will review your specs and respond shortly.</span>
                    </div>
                  </div>
                )}

                {/* Solid White Pill Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-archivo text-xs uppercase tracking-wider font-black hover:bg-neutral-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-white/10 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-black" />
                  <span>{status === "submitting" ? "Transmitting..." : "Send the message"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
