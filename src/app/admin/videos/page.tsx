"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  Check, 
  X, 
  Film, 
  UploadCloud, 
  AlertCircle,
  Sparkles,
  Layers
} from "lucide-react";
import { VideoProject } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<VideoProject | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Upload Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "AI Video",
    categoryBadge: "AI & COMMERCIAL",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    tools: "Premiere Pro, After Effects, Midjourney",
    status: "published" as "published" | "draft",
    views: "500K+",
    duration: "30s",
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/videos?all=true");
      if (res.ok) {
        const data = await res.json();
        setVideos(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Reorder Videos: Move Up / Down
  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= videos.length) return;

    const newVideos = [...videos];
    const temp = newVideos[index];
    newVideos[index] = newVideos[targetIndex];
    newVideos[targetIndex] = temp;

    setVideos(newVideos);

    try {
      const orderedIds = newVideos.map((v) => v.id);
      await fetch("/api/videos/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
      });
    } catch (err) {
      console.error("Reorder failed:", err);
      fetchVideos();
    }
  };

  // Toggle Published / Draft Status
  const handleToggleStatus = async (video: VideoProject) => {
    const newStatus = video.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/videos/${video.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setVideos(videos.map((v) => (v.id === video.id ? { ...v, status: newStatus } : v)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Video
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/videos/${id}`, { method: "DELETE" });
      if (res.ok) {
        setVideos(videos.filter((v) => v.id !== id));
        setDeleteConfirmId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Upload and Submit Video Form
  const handleCreateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setUploadError("");

    try {
      let finalVideoUrl = formData.videoUrl;
      let finalThumbUrl = formData.thumbnailUrl;

      // 1. Upload Video File if selected
      if (videoFile) {
        const vData = new FormData();
        vData.append("file", videoFile);
        vData.append("type", "video");
        const res = await fetch("/api/upload", { method: "POST", body: vData });
        if (!res.ok) throw new Error("Video file upload failed");
        const json = await res.json();
        finalVideoUrl = json.url;
      }

      // 2. Upload Thumbnail File if selected
      if (thumbFile) {
        const tData = new FormData();
        tData.append("file", thumbFile);
        tData.append("type", "thumbnail");
        const res = await fetch("/api/upload", { method: "POST", body: tData });
        if (!res.ok) throw new Error("Thumbnail upload failed");
        const json = await res.json();
        finalThumbUrl = json.url;
      }

      if (!finalVideoUrl) {
        throw new Error("Please upload a video file or enter a video URL");
      }

      // 3. Create Video Entry in DB
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          videoUrl: finalVideoUrl,
          thumbnailUrl: finalThumbUrl || "/uploads/thumbnails/placeholder.jpg",
          tools: formData.tools.split(",").map((t) => t.trim()),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create video project");
      }

      setShowUploadModal(false);
      setFormData({
        title: "",
        category: "AI Video",
        categoryBadge: "AI & COMMERCIAL",
        description: "",
        videoUrl: "",
        thumbnailUrl: "",
        tools: "Premiere Pro, After Effects, Midjourney",
        status: "published",
        views: "500K+",
        duration: "30s",
      });
      setVideoFile(null);
      setThumbFile(null);
      fetchVideos();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setUploadError(err.message);
      } else {
        setUploadError("Upload failed");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-wide">
            Manage Video Portfolio
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Upload new portfolio reels, modify video order, change publish state, or remove projects.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-semibold text-xs uppercase tracking-wider shadow-gold-sm transition hover:scale-102"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Video</span>
        </button>
      </div>

      {/* Videos List / Table */}
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-obsidian-900 border-b border-white/10 text-gray-400 font-cinzel tracking-wider uppercase">
              <tr>
                <th className="py-4 px-4 w-16 text-center">Order</th>
                <th className="py-4 px-4">Preview</th>
                <th className="py-4 px-6">Project Title &amp; Details</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-4">Date Added</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {videos.map((video, idx) => (
                <tr key={video.id} className="hover:bg-white/5 transition-colors">
                  
                  {/* Order & Reorder Controls */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-mono font-bold text-gold-400 text-sm w-6">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <button
                          onClick={() => handleMove(idx, "up")}
                          disabled={idx === 0}
                          className="p-1 rounded bg-obsidian-800 hover:bg-gold-500/20 text-gray-400 hover:text-gold-400 disabled:opacity-20"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleMove(idx, "down")}
                          disabled={idx === videos.length - 1}
                          className="p-1 rounded bg-obsidian-800 hover:bg-gold-500/20 text-gray-400 hover:text-gold-400 disabled:opacity-20"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Thumbnail */}
                  <td className="py-4 px-4">
                    <div 
                      onClick={() => setPreviewVideo(video)}
                      className="relative w-20 h-12 rounded-lg overflow-hidden bg-obsidian-950 border border-white/10 cursor-pointer group shrink-0"
                    >
                      <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-4 h-4 text-gold-400" />
                      </div>
                    </div>
                  </td>

                  {/* Project Title & Tools */}
                  <td className="py-4 px-6">
                    <div className="space-y-1 max-w-sm">
                      <p className="font-semibold text-white text-sm hover:text-gold-400 transition-colors">
                        {video.title}
                      </p>
                      <p className="text-[11px] text-gray-400 line-clamp-1">{video.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {video.tools?.map((t) => (
                          <span key={t} className="px-1.5 py-0.5 rounded text-[9px] bg-obsidian-800 text-gray-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gold-500/10 text-gold-300 border border-gold-500/20 whitespace-nowrap">
                      {video.category}
                    </span>
                  </td>

                  {/* Status Button Toggle */}
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleToggleStatus(video)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition ${
                        video.status === "published"
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
                          : "bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30"
                      }`}
                      title="Click to toggle publish status"
                    >
                      {video.status}
                    </button>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-4 text-gray-400 whitespace-nowrap">
                    {formatDate(video.createdAt)}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setPreviewVideo(video)}
                        className="p-2 rounded-lg bg-obsidian-800 hover:bg-gold-500/20 text-gray-300 hover:text-gold-400 border border-white/10 transition"
                        title="Preview Video"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(video.id)}
                        className="p-2 rounded-lg bg-obsidian-800 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/10 transition"
                        title="Delete Video"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UPLOAD VIDEO MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
          <div className="w-full max-w-2xl glass-panel-gold p-6 sm:p-8 rounded-3xl border border-gold-500/30 max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-gold-400" />
                <h2 className="text-xl font-cinzel font-bold text-white uppercase tracking-wider">
                  Upload Project Video
                </h2>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadError && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{uploadError}</span>
              </div>
            )}

            <form onSubmit={handleCreateVideo} className="space-y-4">
              
              {/* Video File Upload or URL */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-gray-300 font-medium flex items-center justify-between">
                  <span>Video File (MP4, MOV, WebM)</span>
                  {videoFile && <span className="text-gold-400 text-[11px]">{videoFile.name}</span>}
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  className="w-full p-3 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-gray-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gold-500 file:text-black cursor-pointer"
                />
                <p className="text-[10px] text-gray-500">
                  Or enter direct URL if hosted externally:
                </p>
                <input
                  type="text"
                  placeholder="https://.../video.mp4"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Thumbnail Upload or URL */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-gray-300 font-medium flex items-center justify-between">
                  <span>Custom Thumbnail (JPG, PNG)</span>
                  {thumbFile && <span className="text-gold-400 text-[11px]">{thumbFile.name}</span>}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbFile(e.target.files?.[0] || null)}
                  className="w-full p-3 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-gray-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gold-500 file:text-black cursor-pointer"
                />
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brand Commercial Launch"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value, categoryBadge: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:border-gold-500 focus:outline-none"
                  >
                    <option value="AI Video">AI Video</option>
                    <option value="Reels">Reels / Shorts</option>
                    <option value="Ads">Commercial Ads</option>
                    <option value="Motion Graphics">Motion Graphics</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                  Project Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Editing techniques, pacing, motion style, narrative hooks..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Tools & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                    Tools / Software (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Premiere Pro, After Effects, Midjourney"
                    value={formData.tools}
                    onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                    Publish Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "published" | "draft" })}
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:border-gold-500 focus:outline-none"
                  >
                    <option value="published">Publish Immediately</option>
                    <option value="draft">Save as Draft</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-obsidian-800 text-gray-300 text-xs uppercase font-semibold hover:bg-obsidian-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-gold-sm transition disabled:opacity-50"
                >
                  {uploading ? "Uploading & Saving..." : "Save Project"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* PREVIEW VIDEO MODAL */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fadeIn">
          <div className="w-full max-w-4xl glass-panel-gold rounded-3xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-cinzel font-bold text-white text-lg">{previewVideo.title}</h3>
              <button
                onClick={() => setPreviewVideo(null)}
                className="p-2 rounded-lg bg-white/10 text-gray-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden">
              <video
                src={previewVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-fadeIn">
          <div className="max-w-md w-full glass-panel-gold p-6 rounded-3xl border border-red-500/30 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-cinzel font-bold text-white">
              Delete Video?
            </h3>
            <p className="text-xs text-gray-300">
              “Are you sure you want to delete this video?” It will be immediately removed from the public portfolio.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-5 py-2.5 rounded-xl bg-obsidian-800 text-gray-300 text-xs uppercase font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg"
              >
                Yes, Delete Video
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
