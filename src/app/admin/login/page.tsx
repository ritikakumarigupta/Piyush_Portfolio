"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ArrowLeft, AlertCircle, Key, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      setLoginSuccess(true);
      // Full document navigation ensures the browser transmits the fresh session cookie cleanly
      window.location.href = "/admin";
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Authentication error");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 w-96 h-96 bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        
        {/* Brand Logo */}
        <div className="text-center space-y-3">
          <div className="relative w-64 h-16 mx-auto">
            <Image
              src="/assets/karmayogi-gold-logo.jpg"
              alt="Karmayog Studio"
              fill
              priority
              className="object-contain filter drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]"
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-cinzel font-bold text-white tracking-wide">
              ADMIN CMS PORTAL
            </h2>
            <p className="text-xs text-gold-400/90 uppercase tracking-widest font-medium">
              Portfolio &amp; Client Management
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="glass-panel-gold p-8 rounded-3xl border border-gold-500/30 shadow-2xl">
          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Credentials quick tip */}
          <div className="mb-6 p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 text-center space-y-1">
            <p className="text-[11px] text-gold-300 font-medium">
              Credentials Hint:
            </p>
            <p className="text-xs text-gold-400/90 font-mono">
              Username: <span className="text-white font-bold">admin</span> &nbsp;|&nbsp; Password: <span className="text-white font-bold">karmayogi2026</span>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                Username / Email
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                  Password
                </label>
                <span className="text-[10px] text-gold-400/80 font-mono">
                  Default: karmayogi2026
                </span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition"
                />
                <Key className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || loginSuccess}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs uppercase tracking-widest shadow-gold-md hover:shadow-gold-lg hover:scale-102 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loginSuccess ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-obsidian-950 animate-bounce" />
                  <span>Access Granted! Redirecting...</span>
                </>
              ) : loading ? (
                "Authenticating..."
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 hover:text-gold-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Portfolio</span>
            </Link>
            <span className="flex items-center gap-1 text-[11px] text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
              <span>Secure Session</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
