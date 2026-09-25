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
    consent: true,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const fullName = `${formData.firstName} ${formData.lastName}`.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !fullName || !formData.message) {
      setStatus("error");
      setErrorMessage("Please complete all required fields (Name, Email, Message) before dispatching.");
      return;
    }
    if (!formData.consent) {
      setStatus("error");
      setErrorMessage("Please accept the contact permission checkbox to proceed.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          clientName: fullName,
          email: formData.email,
          projectType: formData.projectType,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        let serverErr = "";
        try {
          const data = await res.json();
          serverErr = data?.error || "";
        } catch {
          // ignore json parse error
        }
        throw new Error(serverErr || "Failed to transmit message. Please try WhatsApp or Email directly.");
      }

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        projectType: "Brand Commercial / Reel",
        message: "",
        consent: true,
      });
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again or reach out directly.";
      setErrorMessage(msg);
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

        {/* Centered Transmission Form */}
        <div className="max-w-3xl mx-auto relative">
          <div className="spotlight-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl bg-[#0d0d0d]/80 backdrop-blur-xl">
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
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                    <a
                      href={`https://wa.me/916202842908?text=${encodeURIComponent(
                        `Hi Piyush, from ${fullName || "Client"} (${formData.email || "Email"}): ${formData.message || "Project Inquiry"}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-medium text-[11px] uppercase tracking-wider transition-all self-start sm:self-auto flex-shrink-0"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Send via WhatsApp</span>
                    </a>
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
      </section>
  );
}
