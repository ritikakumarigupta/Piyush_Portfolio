"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Settings, 
  Save, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Shield,
  RefreshCw
} from "lucide-react";
import { StudioSettings } from "@/lib/db";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<StudioSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to update settings");
      setSuccessMsg("Studio settings saved successfully!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Failed to save settings");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoFile || !settings) return;
    setUploadingLogo(true);
    setErrorMsg("");

    try {
      const data = new FormData();
      data.append("file", logoFile);
      data.append("type", "logo");

      const res = await fetch("/api/upload", { method: "POST", body: data });
      if (!res.ok) throw new Error("Logo upload failed");
      const json = await res.json();

      const newSettings = { ...settings, logoUrl: json.url };
      setSettings(newSettings);

      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings),
      });

      setSuccessMsg("Brand logo updated successfully!");
      setLogoFile(null);
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Logo update failed");
      }
    } finally {
      setUploadingLogo(false);
    }
  };

  if (loading || !settings) {
    return <div className="p-10 text-center text-gray-400">Loading settings...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Header */}
      <div className="pb-6 border-b border-white/10 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-wide">
          Website &amp; Brand Settings
        </h1>
        <p className="text-xs text-gray-400">
          Configure official brand identity, studio copy, contact details, social links, and official logo.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-300 text-xs font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-red-300 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* BRAND LOGO CARD */}
      <div className="glass-panel-gold p-6 sm:p-8 rounded-3xl border border-gold-500/30 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-cinzel font-bold text-white uppercase tracking-wider">
              Official Studio Brand Logo
            </h2>
            <p className="text-xs text-gold-400/90">
              Golden Karmayog emblem with peacock feathers, traditional chakra wheel, Hindi &ldquo;कर्मयोग&rdquo;, and Studio typography.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            Active Brand Identity
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-8 p-6 rounded-2xl bg-obsidian-900 border border-white/5">
          {/* Logo Preview */}
          <div className="relative w-64 h-24 bg-obsidian-950 rounded-xl p-3 border border-gold-500/20 flex items-center justify-center">
            <Image
              src={settings.logoUrl || "/assets/karmayogi-logo.svg"}
              alt="Karmayog Studio Brand Logo"
              fill
              className="object-contain p-2 filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
            />
          </div>

          {/* Upload New Logo */}
          <form onSubmit={handleLogoUpload} className="flex-1 space-y-3 w-full">
            <label className="text-xs text-gray-300 uppercase font-semibold tracking-wider block">
              Secure Logo Replacement
            </label>
            <input
              type="file"
              accept="image/svg+xml,image/png,image/jpeg"
              onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-3.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gold-500 file:text-obsidian-950 cursor-pointer"
            />
            <button
              type="submit"
              disabled={!logoFile || uploadingLogo}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider disabled:opacity-40 transition"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{uploadingLogo ? "Uploading Logo..." : "Update Official Logo"}</span>
            </button>
          </form>
        </div>
      </div>

      {/* GENERAL STUDIO SETTINGS FORM */}
      <form onSubmit={handleSave} className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <h2 className="text-lg font-cinzel font-bold text-white uppercase tracking-wider pb-3 border-b border-white/10">
          Studio Identity &amp; Copy
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
              Studio Name
            </label>
            <input
              type="text"
              value={settings.studioName}
              onChange={(e) => setSettings({ ...settings, studioName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
              Tagline
            </label>
            <input
              type="text"
              value={settings.studioTagline}
              onChange={(e) => setSettings({ ...settings, studioTagline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:border-gold-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
            Hero Heading
          </label>
          <input
            type="text"
            value={settings.heroHeading}
            onChange={(e) => setSettings({ ...settings, heroHeading: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:border-gold-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
            Hero Description
          </label>
          <textarea
            rows={4}
            value={settings.heroDescription}
            onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:border-gold-500 focus:outline-none"
          />
        </div>

        <h2 className="text-lg font-cinzel font-bold text-white uppercase tracking-wider pt-4 pb-3 border-b border-white/10">
          Contact Channels &amp; Social Links
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
              Contact Email
            </label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
              Phone / WhatsApp Number
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value, whatsapp: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
              Instagram Profile URL
            </label>
            <input
              type="url"
              value={settings.instagram}
              onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
              YouTube Channel URL
            </label>
            <input
              type="url"
              value={settings.youtube}
              onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:border-gold-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
            Footer Copyright Text
          </label>
          <input
            type="text"
            value={settings.footerContent}
            onChange={(e) => setSettings({ ...settings, footerContent: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:border-gold-500 focus:outline-none"
          />
        </div>

        {/* Cinematic White Light Bloom Effect Controls (Requested) */}
        <div className="p-6 rounded-2xl bg-obsidian-900/60 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-cinzel">
                  Cinematic White Light Bloom Controls
                </h3>
                <p className="text-[11px] text-gray-400 font-mono">
                  Configure the soft diffused white halo around subject &amp; background.
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              GPU ACCELERATED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-mono text-[11px]">Bloom Intensity (Default: 75%)</label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                defaultValue="0.75"
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  const saved = JSON.parse(localStorage.getItem("piyush_bloom_config") || "{}");
                  localStorage.setItem("piyush_bloom_config", JSON.stringify({ ...saved, intensity: val }));
                  document.documentElement.style.setProperty("--bloom-intensity", String(val));
                }}
                className="w-full accent-white h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-mono text-[11px]">Blur Amount (Default: 85px)</label>
              <input
                type="range"
                min="20"
                max="180"
                step="5"
                defaultValue="85"
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  const saved = JSON.parse(localStorage.getItem("piyush_bloom_config") || "{}");
                  localStorage.setItem("piyush_bloom_config", JSON.stringify({ ...saved, blur: val }));
                  document.documentElement.style.setProperty("--bloom-blur", `${val}px`);
                }}
                className="w-full accent-white h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-mono text-[11px]">Opacity (Default: 85%)</label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                defaultValue="0.85"
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  const saved = JSON.parse(localStorage.getItem("piyush_bloom_config") || "{}");
                  localStorage.setItem("piyush_bloom_config", JSON.stringify({ ...saved, opacity: val }));
                  document.documentElement.style.setProperty("--bloom-opacity", String(val));
                }}
                className="w-full accent-white h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-mono text-[11px]">Glow Duration (Default: 3.8s)</label>
              <input
                type="range"
                min="1.0"
                max="8.0"
                step="0.2"
                defaultValue="3.8"
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  const saved = JSON.parse(localStorage.getItem("piyush_bloom_config") || "{}");
                  localStorage.setItem("piyush_bloom_config", JSON.stringify({ ...saved, duration: val }));
                  document.documentElement.style.setProperty("--bloom-duration", `${val}s`);
                }}
                className="w-full accent-white h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-mono text-[11px]">Fade-In (Default: 0.8s)</label>
              <input
                type="range"
                min="0.1"
                max="2.5"
                step="0.1"
                defaultValue="0.8"
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  const saved = JSON.parse(localStorage.getItem("piyush_bloom_config") || "{}");
                  localStorage.setItem("piyush_bloom_config", JSON.stringify({ ...saved, fadeIn: val }));
                  document.documentElement.style.setProperty("--bloom-fade-in", `${val}s`);
                }}
                className="w-full accent-white h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-mono text-[11px]">Fade-Out (Default: 1.2s)</label>
              <input
                type="range"
                min="0.1"
                max="2.5"
                step="0.1"
                defaultValue="1.2"
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  const saved = JSON.parse(localStorage.getItem("piyush_bloom_config") || "{}");
                  localStorage.setItem("piyush_bloom_config", JSON.stringify({ ...saved, fadeOut: val }));
                  document.documentElement.style.setProperty("--bloom-fade-out", `${val}s`);
                }}
                className="w-full accent-white h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs uppercase tracking-widest shadow-gold-sm hover:shadow-gold-md hover:scale-102 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save Website Settings"}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
