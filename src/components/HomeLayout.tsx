"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext.jsx";
import { useStudy } from "../context/StudyContext.jsx";
import { CAILogo } from "./CAILogo";
import {
  LayoutDashboard,
  Code2,
  Atom,
  Smartphone,
  BrainCircuit,
  Binary,
  Swords,
  TrendingUp,
  BookmarkCheck,
  Settings,
  LogOut,
  LogIn,
  Search,
  Flame,
  Target,
  ChevronDown,
  PanelLeftClose,
  PanelLeft,
  Sparkles,
} from "lucide-react";

interface HomeLayoutProps {
  children?: React.ReactNode;
}

export function HomeLayout({ children }: HomeLayoutProps) {
  const { account, logout } = useAuth();
  const { state } = useStudy();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const mainNav = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  ];

  const sheetsNav = [
    { label: "JavaScript Core", href: "/javascript", icon: Code2, tag: "200 Qs" },
    { label: "React & Next.js", href: "/react", icon: Atom, tag: "150 Qs" },
    { label: "React Native", href: "/react-native", icon: Smartphone, tag: "220 Qs" },
    { label: "Tricky JS Output", href: "/output", icon: BrainCircuit, tag: "50 Qs" },
    { label: "Strings & DSA", href: "/strings", icon: Binary, tag: "45 Qs" },
  ];

  const practiceNav = [
    { label: "Mock Arena", href: "/mock", icon: Swords, tag: "Timed" },
    { label: "Progress & Mastery", href: "/progress", icon: TrendingUp },
    { label: "Revision Vault", href: "/bookmarks", icon: BookmarkCheck },
  ];

  const personalNav = [
    { label: "Settings & Goals", href: "/settings", icon: Settings },
  ];

  const renderNavItem = (item: { label: string; href: string; icon: any; tag?: string }) => {
    const IconComponent = item.icon;
    const isActive =
      item.href === "/dashboard"
        ? pathname === "/dashboard"
        : pathname.startsWith(item.href);

    return (
      <Link
        key={item.label}
        href={item.href}
        title={collapsed ? item.label : undefined}
        className={`group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
          isActive
            ? "bg-zinc-800/90 text-white shadow-sm font-semibold border border-zinc-700/60"
            : "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200"
        } ${collapsed ? "justify-center px-2" : ""}`}
      >
        <div className="flex items-center gap-2.5 truncate">
          <IconComponent
            className={`h-4 w-4 shrink-0 transition-colors ${
              isActive ? "text-amber-400" : "text-zinc-400 group-hover:text-zinc-300"
            }`}
          />
          {!collapsed && <span className="truncate">{item.label}</span>}
        </div>

        {!collapsed && item.tag && (
          <span
            className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
              isActive
                ? "bg-amber-400/10 text-amber-300"
                : "bg-zinc-800 text-zinc-500 group-hover:text-zinc-400"
            }`}
          >
            {item.tag}
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#08080a] text-zinc-100 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-300">
      {/* 1. Left Sidebar (Unique Modern Dev-Tool Navigation) */}
      <aside
        className={`sticky top-0 h-screen shrink-0 border-r border-zinc-800/80 bg-[#0c0c0f] flex flex-col justify-between transition-all duration-300 z-30 select-none ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="flex h-14 items-center justify-between border-b border-zinc-800/80 px-3.5">
            <CAILogo collapsed={collapsed} />
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800/80 hover:text-white transition-colors"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-label="Toggle sidebar"
            >
              {collapsed ? (
                <PanelLeft className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Navigation Groups */}
          <div className="space-y-5 px-3 py-4 overflow-y-auto max-h-[calc(100vh-140px)] scrollbar-thin scrollbar-thumb-zinc-800">
            {/* Dashboard */}
            <div className="space-y-1">{mainNav.map(renderNavItem)}</div>

            {/* Study Sheets */}
            <div>
              {!collapsed && (
                <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Study Sheets
                </div>
              )}
              <div className="space-y-1">{sheetsNav.map(renderNavItem)}</div>
            </div>

            {/* Practice & Analytics */}
            <div>
              {!collapsed && (
                <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Practice & Tests
                </div>
              )}
              <div className="space-y-1">{practiceNav.map(renderNavItem)}</div>
            </div>

            {/* Workspace Settings */}
            <div>
              {!collapsed && (
                <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Preferences
                </div>
              )}
              <div className="space-y-1">{personalNav.map(renderNavItem)}</div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-zinc-800/80 p-3 space-y-2">
          {/* 100% Free Badge */}
          {!collapsed && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-2.5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-zinc-200">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>100% Free & Open</span>
              </div>
              <p className="text-[10px] text-zinc-400 mt-0.5">
                No paywalls, subscriptions, or pay-to-win.
              </p>
            </div>
          )}

          {/* User Profile Pill */}
          {account ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`w-full flex items-center gap-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 p-1.5 hover:border-zinc-700 transition ${
                  collapsed ? "justify-center" : ""
                }`}
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-xs font-bold text-black shadow">
                  {account.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                {!collapsed && (
                  <div className="flex-1 text-left leading-tight truncate">
                    <p className="text-xs font-semibold text-zinc-200 truncate">{account.name}</p>
                    <p className="text-[10px] text-zinc-400 truncate">{account.email}</p>
                  </div>
                )}
                {!collapsed && <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />}
              </button>

              {userMenuOpen && (
                <div className="absolute bottom-12 left-0 right-0 rounded-xl border border-zinc-800 bg-[#121216] p-1.5 shadow-2xl z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      router.push("/settings");
                    }}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 rounded-lg flex items-center gap-2"
                  >
                    <Settings className="h-3.5 w-3.5 text-zinc-400" /> Goal & Settings
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      logout();
                      router.push("/login");
                    }}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-2"
                  >
                    <LogOut className="h-3.5 w-3.5 text-red-400" /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className={`flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold px-3 py-2 text-xs transition ${
                collapsed ? "justify-center px-2" : ""
              }`}
            >
              <LogIn className="h-4 w-4" />
              {!collapsed && <span>Log in / Sign up</span>}
            </Link>
          )}
        </div>
      </aside>

      {/* 2. Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-zinc-800/80 bg-[#0c0c0f]/90 backdrop-blur-md px-6">
          {/* Quick Search */}
          <div className="relative w-72 md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search 665+ interview questions & sheets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-[#121216] py-1.5 pl-8 pr-12 text-xs text-zinc-200 placeholder-zinc-400 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400">
              ⌘K
            </kbd>
          </div>

          {/* Right Status Badges */}
          <div className="flex items-center gap-3">
            {/* Target Role Badge */}
            <div
              className="hidden sm:flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-xs font-medium text-zinc-300"
              title="Target Preparation Goal"
            >
              <Target className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-zinc-400">Target:</span>
              <span className="font-semibold text-zinc-100">{state?.goal || "Frontend SDE"}</span>
            </div>

            {/* Streak Badge */}
            <div
              className="flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400"
              title="Daily Active Streak"
            >
              <Flame className="h-3.5 w-3.5 text-orange-500 animate-pulse" />
              <span>7-Day Streak</span>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 bg-[#08080a] p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
