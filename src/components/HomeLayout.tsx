"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext.jsx";
import { CAILogo } from "./CAILogo";
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  Atom,
  Smartphone,
  BrainCircuit,
  Binary,
  CalendarDays,
  Users2,
  BookmarkCheck,
  TrendingUp,
  Settings,
  HelpCircle,
  CreditCard,
  LogOut,
  LogIn,
  Search,
  Flame,
  Coins,
  Sparkles,
  ChevronDown,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";

interface HomeLayoutProps {
  children?: React.ReactNode;
}

export function HomeLayout({ children }: HomeLayoutProps) {
  const { account, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const prepSection = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Prep Hub", href: "/progress", icon: BookOpen },
  ];

  const practiceSection = [
    { label: "JavaScript 180", href: "/javascript", icon: Code2 },
    { label: "React & Next.js", href: "/react", icon: Atom },
    { label: "React Native", href: "/react-native", icon: Smartphone },
    { label: "Tricky Output", href: "/output", icon: BrainCircuit },
    { label: "Strings & DSA", href: "/strings", icon: Binary },
  ];

  const planlySection = [
    { label: "Daily Planner", href: "/dashboard#planner", icon: CalendarDays },
  ];

  const communitySection = [
    { label: "Mock Arena", href: "/mock", icon: Users2 },
  ];

  const additionalsSection = [
    { label: "Progress Tracking", href: "/progress", icon: TrendingUp },
    { label: "Bookmarks", href: "/bookmarks", icon: BookmarkCheck },
  ];

  const mySpacesSection = [
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  const renderNavItem = (item: { label: string; href: string; icon: any }) => {
    const IconComponent = item.icon;
    const isActive =
      item.href === "/dashboard"
        ? pathname === "/dashboard"
        : pathname.startsWith(item.href) && item.href !== "/dashboard#planner";

    return (
      <Link
        key={item.label}
        href={item.href}
        title={collapsed ? item.label : undefined}
        className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
          isActive
            ? "bg-zinc-800 text-white shadow-sm font-semibold border-l-2 border-amber-400"
            : "text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200"
        } ${collapsed ? "justify-center px-2" : ""}`}
      >
        <IconComponent
          className={`h-4 w-4 shrink-0 transition-colors ${
            isActive ? "text-amber-400" : "text-zinc-400 group-hover:text-zinc-200"
          }`}
        />
        {!collapsed && <span className="truncate">{item.label}</span>}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#09090b] text-zinc-100 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-300">
      {/* 1. Left Sidebar (takeUforward Style) */}
      <aside
        className={`sticky top-0 h-screen shrink-0 border-r border-[#1f1f23] bg-[#0c0c0e] flex flex-col justify-between transition-all duration-300 z-30 select-none ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        {/* Sidebar Header & Brand Logo */}
        <div>
          <div className="flex h-14 items-center justify-between border-b border-[#1f1f23] px-3.5">
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

          {/* Navigation Sections */}
          <div className="space-y-4 px-2.5 py-3 overflow-y-auto max-h-[calc(100vh-140px)] scrollbar-thin scrollbar-thumb-zinc-800">
            {/* Prep */}
            <div>
              {!collapsed && (
                <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Prep
                </div>
              )}
              <div className="space-y-0.5">{prepSection.map(renderNavItem)}</div>
            </div>

            {/* Practice */}
            <div>
              {!collapsed && (
                <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Practice
                </div>
              )}
              <div className="space-y-0.5">{practiceSection.map(renderNavItem)}</div>
            </div>

            {/* Planly */}
            <div>
              {!collapsed && (
                <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Planly
                </div>
              )}
              <div className="space-y-0.5">{planlySection.map(renderNavItem)}</div>
            </div>

            {/* Community */}
            <div>
              {!collapsed && (
                <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Community
                </div>
              )}
              <div className="space-y-0.5">{communitySection.map(renderNavItem)}</div>
            </div>

            {/* Additionals */}
            <div>
              {!collapsed && (
                <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Additionals
                </div>
              )}
              <div className="space-y-0.5">{additionalsSection.map(renderNavItem)}</div>
            </div>

            {/* My Spaces */}
            <div>
              {!collapsed && (
                <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  My Spaces
                </div>
              )}
              <div className="space-y-0.5">{mySpacesSection.map(renderNavItem)}</div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-[#1f1f23] p-2.5 space-y-1">
          <Link
            href="/settings"
            className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200 transition-colors ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <HelpCircle className="h-4 w-4 shrink-0 text-zinc-400" />
            {!collapsed && <span>Contact support</span>}
          </Link>
          <Link
            href="/dashboard"
            className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200 transition-colors ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <CreditCard className="h-4 w-4 shrink-0 text-zinc-400" />
            {!collapsed && <span>See plans and pricing</span>}
          </Link>

          {/* User Auth Pill */}
          {account ? (
            <div className="relative pt-1">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`w-full flex items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 p-1.5 hover:border-zinc-700 transition ${
                  collapsed ? "justify-center" : ""
                }`}
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-xs font-bold text-amber-400 border border-amber-500/30">
                  {account.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                {!collapsed && (
                  <div className="flex-1 text-left leading-tight truncate">
                    <p className="text-xs font-semibold text-zinc-200 truncate">{account.name}</p>
                    <p className="text-[10px] text-zinc-500 truncate">{account.email}</p>
                  </div>
                )}
                {!collapsed && <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />}
              </button>

              {userMenuOpen && (
                <div className="absolute bottom-12 left-2 right-2 rounded-xl border border-zinc-800 bg-[#121215] p-1.5 shadow-2xl z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      router.push("/settings");
                    }}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 rounded-lg flex items-center gap-2"
                  >
                    <Settings className="h-3.5 w-3.5 text-zinc-400" /> Settings
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
              className={`flex items-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-2 text-xs font-medium transition ${
                collapsed ? "justify-center px-2" : ""
              }`}
            >
              <LogIn className="h-4 w-4" />
              {!collapsed && <span>Log in / Sign up</span>}
            </Link>
          )}
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar (TUF Search, Streak, Coin, +Plus button) */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#1f1f23] bg-[#0c0c0e]/90 backdrop-blur-md px-6">
          {/* Quick Search */}
          <div className="relative w-72 md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search problems, sheets, roadmaps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-[#121215] py-1.5 pl-8 pr-12 text-xs text-zinc-200 placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500">
              ⌘K
            </kbd>
          </div>

          {/* Right Tools (Coin, Streak, +Plus badge) */}
          <div className="flex items-center gap-3">
            {/* Coins Badge */}
            <div
              className="flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-400"
              title="Prep Coins"
            >
              <Coins className="h-3.5 w-3.5 text-amber-400" />
              <span>120</span>
            </div>

            {/* Streak Badge */}
            <div
              className="flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-orange-400"
              title="Daily Active Streak"
            >
              <Flame className="h-3.5 w-3.5 text-orange-500 animate-pulse" />
              <span>7</span>
            </div>

            {/* + Plus Gold Button */}
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 px-3 py-1.5 text-xs font-bold text-black shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition"
            >
              <Sparkles className="h-3.5 w-3.5 fill-black" />
              <span>+ Plus</span>
            </button>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 bg-[#09090b] p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
