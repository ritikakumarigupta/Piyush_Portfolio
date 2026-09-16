"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Film, 
  Inbox, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  PlusCircle, 
  ArrowRight,
  TrendingUp,
  Sliders,
  ExternalLink
} from "lucide-react";
import { VideoProject, Enquiry } from "@/lib/db";

export default function AdminDashboardPage() {
  const [videos, setVideos] = useState<VideoProject[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [vRes, eRes] = await Promise.all([
          fetch("/api/videos?all=true"),
          fetch("/api/enquiries"),
        ]);
        if (eRes.status === 401 || vRes.status === 401) {
          window.location.href = "/admin/login?from=/admin";
          return;
        }
        if (vRes.ok) setVideos(await vRes.json());
        if (eRes.ok) setEnquiries(await eRes.json());
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const totalVideos = videos.length;
  const publishedVideos = videos.filter((v) => v.status === "published").length;
  const draftVideos = videos.filter((v) => v.status === "draft").length;

  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === "NEW").length;
  const completedProjects = enquiries.filter((e) => e.status === "COMPLETED").length;

  const statCards = [
    { title: "Total Videos", value: totalVideos, icon: Film, color: "text-gold-400", bg: "bg-gold-500/10" },
    { title: "Published Videos", value: publishedVideos, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { title: "Draft Videos", value: draftVideos, icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
    { title: "Total Enquiries", value: totalEnquiries, icon: Inbox, color: "text-sky-400", bg: "bg-sky-500/10" },
    { title: "New Enquiries", value: newEnquiries, icon: Sparkles, color: "text-rose-400", bg: "bg-rose-500/10" },
    { title: "Completed Projects", value: completedProjects, icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-wide">
            Studio Dashboard
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Welcome to the Karmayog Studio video portfolio &amp; client management suite.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/videos"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-semibold text-xs uppercase tracking-wider shadow-gold-sm transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload New Video</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-obsidian-900 hover:bg-obsidian-800 border border-white/10 text-gray-200 text-xs font-semibold uppercase tracking-wider transition"
          >
            <ExternalLink className="w-4 h-4 text-gold-400" />
            <span>Live Portfolio</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-gold-500/40 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                  {card.title}
                </span>
                <div className={`p-2 rounded-lg ${card.bg} ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className={`text-2xl sm:text-3xl font-cinzel font-black ${card.color}`}>
                {loading ? "..." : card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Two Columns: Recent Enquiries & Portfolio Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Client Enquiries */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Inbox className="w-5 h-5 text-gold-400" />
              <h2 className="text-lg font-cinzel font-bold text-white uppercase tracking-wider">
                Recent Enquiries
              </h2>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs text-gold-400 hover:underline flex items-center gap-1 uppercase tracking-wider font-semibold"
            >
              <span>View All ({enquiries.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {enquiries.length === 0 ? (
            <p className="text-xs text-gray-400 py-6 text-center">No enquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {enquiries.slice(0, 5).map((enq) => (
                <div
                  key={enq.id}
                  className="p-4 rounded-xl bg-obsidian-900/90 border border-white/5 flex items-center justify-between gap-4 hover:border-gold-500/30 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{enq.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                        enq.status === "NEW"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : enq.status === "IN PROGRESS"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      }`}>
                        {enq.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-1">{enq.message}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-medium text-gold-400">{enq.budget}</span>
                    <p className="text-[10px] text-gray-400">{enq.projectType}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Video Catalog Overview */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Film className="w-5 h-5 text-gold-400" />
              <h2 className="text-lg font-cinzel font-bold text-white uppercase tracking-wider">
                Video Catalog
              </h2>
            </div>
            <Link
              href="/admin/videos"
              className="text-xs text-gold-400 hover:underline flex items-center gap-1 uppercase tracking-wider font-semibold"
            >
              <span>Manage Videos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {videos.slice(0, 5).map((vid, idx) => (
              <div
                key={vid.id}
                className="p-3.5 rounded-xl bg-obsidian-900/90 border border-white/5 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="text-xs font-mono font-bold text-gold-400 w-5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-white truncate">{vid.title}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">{vid.category}</p>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0 ${
                  vid.status === "published"
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                    : "bg-gray-500/20 text-gray-300"
                }`}>
                  {vid.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
