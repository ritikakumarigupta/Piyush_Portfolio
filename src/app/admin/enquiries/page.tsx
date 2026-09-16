"use client";

import { useEffect, useState } from "react";
import { 
  Inbox, 
  Trash2, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  ExternalLink, 
  Download, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  RefreshCw
} from "lucide-react";
import { Enquiry } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const fetchEnquiries = async (silent = false) => {
    if (!silent) setIsRefreshing(true);
    try {
      const res = await fetch("/api/enquiries");
      if (res.status === 401) {
        window.location.href = "/admin/login?from=/admin/enquiries";
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
    // Auto-poll every 5 seconds to catch new messages in real-time
    const interval = setInterval(() => {
      fetchEnquiries(true);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (id: string, newStatus: "NEW" | "IN PROGRESS" | "COMPLETED") => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries(enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e)));
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries(enquiries.filter((e) => e.id !== id));
        if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch = 
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.includes(searchQuery) ||
      e.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-wide">
            Client Enquiries &amp; Leads
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Review incoming production requests, update workflow status, and access client files.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE SYNC</span>
          </div>

          <button
            onClick={() => fetchEnquiries(false)}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-obsidian-900 border border-white/10 hover:border-gold-500/40 text-xs text-gray-200 transition disabled:opacity-50"
            title="Refresh list now"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-gold-400 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </button>

          <span className="px-3.5 py-1.5 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold">
            {enquiries.length} Total Enquiries
          </span>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by client name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:border-gold-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {["ALL", "NEW", "IN PROGRESS", "COMPLETED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
                statusFilter === st
                  ? "bg-gold-500 text-obsidian-950 font-bold shadow-gold-sm"
                  : "bg-obsidian-900 text-gray-300 border border-white/10 hover:border-gold-500/40"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-obsidian-900 border-b border-white/10 text-gray-400 font-cinzel tracking-wider uppercase">
              <tr>
                <th className="py-4 px-6">Client Name</th>
                <th className="py-4 px-4">Contact</th>
                <th className="py-4 px-4">Project Type</th>
                <th className="py-4 px-4">Budget</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-gray-400">
                    No enquiries match the current filter.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/5 transition-colors">
                    
                    {/* Name */}
                    <td className="py-4 px-6">
                      <div 
                        onClick={() => setSelectedEnquiry(enq)}
                        className="cursor-pointer group"
                      >
                        <p className="font-semibold text-white text-sm group-hover:text-gold-400 transition-colors">
                          {enq.name}
                        </p>
                        <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                          {enq.message}
                        </p>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-4 space-y-0.5">
                      <p className="text-gray-300 font-mono">{enq.email}</p>
                      <p className="text-gray-400">{enq.phone}</p>
                    </td>

                    {/* Project Type */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-obsidian-800 text-gold-300 border border-white/10">
                        {enq.projectType}
                      </span>
                    </td>

                    {/* Budget */}
                    <td className="py-4 px-4 font-mono font-semibold text-gold-400">
                      {enq.budget}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-4 text-center">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value as "NEW" | "IN PROGRESS" | "COMPLETED")}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer border focus:outline-none ${
                          enq.status === "NEW"
                            ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                            : enq.status === "IN PROGRESS"
                            ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                            : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                        }`}
                      >
                        <option value="NEW" className="bg-obsidian-900 text-rose-300">NEW</option>
                        <option value="IN PROGRESS" className="bg-obsidian-900 text-amber-300">IN PROGRESS</option>
                        <option value="COMPLETED" className="bg-obsidian-900 text-emerald-300">COMPLETED</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-gray-400 whitespace-nowrap">
                      {formatDate(enq.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="px-3 py-1.5 rounded-lg bg-obsidian-800 hover:bg-gold-500/20 text-gray-300 hover:text-gold-400 border border-white/10 transition text-[11px] uppercase font-semibold"
                        >
                          View
                        </button>

                        <button
                          onClick={() => handleDelete(enq.id)}
                          className="p-1.5 rounded-lg bg-obsidian-800 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/10 transition"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ENQUIRY DETAILS MODAL */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
          <div className="w-full max-w-xl glass-panel-gold p-6 sm:p-8 rounded-3xl border border-gold-500/30 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] text-gold-400 uppercase font-bold tracking-widest">
                  Client Enquiry Brief
                </span>
                <h3 className="text-xl font-cinzel font-bold text-white">
                  {selectedEnquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-obsidian-900 border border-white/5 text-xs">
              <div>
                <p className="text-gray-400">Email:</p>
                <a href={`mailto:${selectedEnquiry.email}`} className="text-white hover:text-gold-400 font-mono">
                  {selectedEnquiry.email}
                </a>
              </div>
              <div>
                <p className="text-gray-400">Phone:</p>
                <a href={`tel:${selectedEnquiry.phone}`} className="text-white hover:text-gold-400 font-mono">
                  {selectedEnquiry.phone}
                </a>
              </div>
              <div>
                <p className="text-gray-400">Project Type:</p>
                <p className="text-gold-400 font-bold">{selectedEnquiry.projectType}</p>
              </div>
              <div>
                <p className="text-gray-400">Budget:</p>
                <p className="text-gold-400 font-mono font-bold">{selectedEnquiry.budget}</p>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Project Scope &amp; Requirements
              </label>
              <div className="p-4 rounded-xl bg-obsidian-900/90 border border-white/10 text-xs text-gray-200 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Reference Link & File */}
            {(selectedEnquiry.referenceLink || selectedEnquiry.uploadedFile) && (
              <div className="space-y-2 pt-2 border-t border-white/10">
                {selectedEnquiry.referenceLink && (
                  <div className="flex items-center justify-between text-xs p-3 rounded-lg bg-obsidian-900 border border-white/5">
                    <span className="text-gray-400">Reference Link:</span>
                    <a
                      href={selectedEnquiry.referenceLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gold-400 hover:underline flex items-center gap-1 font-mono"
                    >
                      <span>Open Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {selectedEnquiry.uploadedFile && (
                  <div className="flex items-center justify-between text-xs p-3 rounded-lg bg-obsidian-900 border border-white/5">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-gold-400" />
                      Client Attachment:
                    </span>
                    <a
                      href={selectedEnquiry.uploadedFile}
                      download
                      className="text-gold-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download File</span>
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Status Selector Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Current Status:</span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value as "NEW" | "IN PROGRESS" | "COMPLETED")}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase bg-obsidian-800 text-white border border-white/10"
                >
                  <option value="NEW">NEW</option>
                  <option value="IN PROGRESS">IN PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
