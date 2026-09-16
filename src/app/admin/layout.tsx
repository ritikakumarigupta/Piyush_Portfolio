"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Film, 
  Inbox, 
  Settings, 
  LogOut, 
  Globe, 
  Sparkles,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If on login page, don't show sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Videos", href: "/admin/videos", icon: Film },
    { name: "Enquiries", href: "/admin/enquiries", icon: Inbox },
    { name: "Website Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-obsidian-950 text-gray-100 flex flex-col md:flex-row">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-obsidian-900 border-b border-white/10">
        <div className="relative w-36 h-10">
          <Image src="/assets/karmayogi-gold-logo.jpg" alt="Karmayog Studio" fill className="object-contain" />
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-obsidian-800 text-gray-300"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside
        className={`${
          mobileOpen ? "block" : "hidden"
        } md:flex flex-col justify-between w-full md:w-64 bg-obsidian-900 border-r border-gold-500/20 p-6 z-40 shrink-0 min-h-screen`}
      >
        <div className="space-y-8">
          {/* Logo */}
          <div className="hidden md:block space-y-2">
            <div className="relative w-48 h-12">
              <Image
                src="/assets/karmayogi-gold-logo.jpg"
                alt="Karmayog Studio"
                fill
                priority
                className="object-contain object-left filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]"
              />
            </div>
            <p className="text-[10px] text-gold-400 font-cinzel tracking-widest uppercase">
              Admin CMS Control Room
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-gold-500 text-obsidian-950 shadow-gold-sm"
                      : "text-gray-300 hover:text-gold-400 hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar Actions */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-medium text-gray-400 hover:text-gold-400 hover:bg-white/5 transition"
          >
            <Globe className="w-4 h-4" />
            <span>View Live Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin View Content */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
