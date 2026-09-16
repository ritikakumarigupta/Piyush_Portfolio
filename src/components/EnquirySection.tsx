"use client";

import { useState } from "react";
import { Send, Sparkles, CheckCircle2, UploadCloud, AlertCircle, Phone, Mail, Instagram, Youtube } from "lucide-react";

interface EnquirySectionProps {
  contactEmail?: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  youtube?: string;
}

export default function EnquirySection({
  contactEmail = "karmayogistudio@gmail.com",
  phone = "+91 98765 43210",
  whatsapp = "+91 98765 43210",
  instagram = "https://instagram.com/karmayogistudio",
  youtube = "https://youtube.com/@karmayogistudio",
}: EnquirySectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "YouTube Video",
    budget: "₹10,000 – ₹25,000",
    message: "",
    referenceLink: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const projectTypes = [
    "YouTube Video",
    "Instagram Reel",
    "Advertisement",
    "Motion Graphics",
    "Corporate Video",
    "AI Video",
    "Short-form Content",
    "Other",
  ];

  const budgetRanges = [
    "Under ₹5,000",
    "₹5,000 – ₹10,000",
    "₹10,000 – ₹25,000",
    "₹25,000+",
    "Custom",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("projectType", formData.projectType);
      data.append("budget", formData.budget);
      data.append("message", formData.message);
      data.append("referenceLink", formData.referenceLink);
      if (file) {
        data.append("file", file);
      }

      const res = await fetch("/api/enquiries", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to submit enquiry. Please try again.");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "YouTube Video",
        budget: "₹10,000 – ₹25,000",
        message: "",
        referenceLink: "",
      });
      setFile(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Failed to submit enquiry. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enquiry" className="py-20 lg:py-28 bg-obsidian-950 relative border-t border-white/5">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-gold-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white tracking-tight">
            Start Your <span className="text-gold-gradient">Next Project</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Tell us about your requirements, reference links, and creative vision. We respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Info Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-panel-gold p-8 rounded-2xl space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-cinzel font-bold text-white uppercase tracking-wider">
                  Karmayogi Studio
                </h3>
                <p className="text-xs text-gold-400 tracking-widest uppercase font-medium">
                  Direct Inquiries &amp; Bookings
                </p>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                Whether you need a high-converting Instagram reel, an AI-powered commercial, or YouTube video editing — we deliver world-class cinema quality.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 text-gray-300 hover:text-gold-400 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center border border-gold-500/20 text-gold-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Email Address</p>
                    <a href={`mailto:${contactEmail}`} className="text-xs font-medium text-white truncate hover:underline">
                      {contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-300 hover:text-gold-400 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center border border-gold-500/20 text-gold-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Phone / WhatsApp</p>
                    <a href={`tel:${phone}`} className="text-xs font-medium text-white hover:underline">
                      {phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-3">Connect on Socials</p>
                <div className="flex items-center gap-3">
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-obsidian-900 border border-white/10 hover:border-gold-500/50 text-gray-300 hover:text-gold-400 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-obsidian-900 border border-white/10 hover:border-gold-500/50 text-gray-300 hover:text-gold-400 transition-colors"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-8">
            <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-white/10 relative">
              
              {submitted ? (
                <div className="py-12 px-6 text-center space-y-6 animate-fadeIn">
                  <div className="w-20 h-20 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center mx-auto border border-gold-500/40 shadow-gold-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-3 max-w-lg mx-auto">
                    <h3 className="text-2xl font-cinzel font-bold text-white">
                      Enquiry Received!
                    </h3>
                    <p className="text-sm sm:text-base text-gold-200/90 leading-relaxed font-medium bg-obsidian-900/90 p-4 rounded-xl border border-gold-500/20">
                      “Thank you! Your enquiry has been submitted successfully. Karmayog Studio will get back to you shortly.”
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-obsidian-800 hover:bg-obsidian-700 text-gold-400 border border-gold-500/30 text-xs font-semibold uppercase tracking-wider transition"
                  >
                    Submit Another Project
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-300 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                        Full Name <span className="text-gold-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-900/90 border border-white/10 text-white text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                        Email Address <span className="text-gold-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-900/90 border border-white/10 text-white text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition"
                      />
                    </div>
                  </div>

                  {/* Phone & Project Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                        Phone Number <span className="text-gold-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-900/90 border border-white/10 text-white text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                        Project Type <span className="text-gold-400">*</span>
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-900/90 border border-white/10 text-white text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition"
                      >
                        {projectTypes.map((pt) => (
                          <option key={pt} value={pt} className="bg-obsidian-900 text-white">
                            {pt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Budget Range & Reference Link */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                        Budget Range <span className="text-gold-400">*</span>
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-900/90 border border-white/10 text-white text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition"
                      >
                        {budgetRanges.map((b) => (
                          <option key={b} value={b} className="bg-obsidian-900 text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                        Reference / Project Link
                      </label>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/..."
                        value={formData.referenceLink}
                        onChange={(e) => setFormData({ ...formData, referenceLink: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-900/90 border border-white/10 text-white text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                      Project Requirements &amp; Scope <span className="text-gold-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share video count, pacing, references, target audience, deadline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-900/90 border border-white/10 text-white text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition"
                    />
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-gray-300 font-medium flex items-center justify-between">
                      <span>Upload Reference File / Brief (Optional)</span>
                      {file && <span className="text-gold-400 text-[11px] font-normal">{file.name}</span>}
                    </label>
                    <div className="relative border-2 border-dashed border-white/15 hover:border-gold-500/40 rounded-xl p-4 text-center cursor-pointer bg-obsidian-900/50 hover:bg-gold-500/5 transition">
                      <input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFile(e.target.files[0]);
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex flex-col items-center justify-center gap-1.5 text-gray-400">
                        <UploadCloud className="w-6 h-6 text-gold-400" />
                        <span className="text-xs">Drag &amp; drop brief or click to browse</span>
                        <span className="text-[10px] text-gray-400">PDF, ZIP, MP4, PNG (Max 50MB)</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-obsidian-950 font-bold text-sm uppercase tracking-widest shadow-gold-md hover:shadow-gold-lg hover:scale-[1.01] transition-all duration-300 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-obsidian-900" />
                    <span>{isSubmitting ? "Submitting Enquiry..." : "Submit Enquiry"}</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
