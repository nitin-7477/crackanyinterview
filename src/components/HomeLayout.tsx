"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext.jsx";
import { useStudy } from "../context/StudyContext.jsx";
import { useTheme } from "../context/ThemeContext";
import { loadDailyHistory, calculateStreakStats } from "../lib/streak";
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
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";

interface HomeLayoutProps {
  children?: React.ReactNode;
}

export function HomeLayout({ children }: HomeLayoutProps) {
  const { account, logout } = useAuth();
  const { state } = useStudy();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const streakStats = useMemo(() => {
    if (!mounted) return { currentStreak: 0, maxStreak: 0, longestStreak: 0, totalActiveDays: 0, todaySolved: 0 };
    const history = loadDailyHistory(state?.activity);
    return calculateStreakStats(history);
  }, [mounted, state?.activity]);

  const mainNav = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  ];

  const sheetsNav = [
    { label: "JavaScript Core", href: "/javascript", icon: Code2, tag: "200 Qs" },
    { label: "React & Next.js", href: "/react", icon: Atom, tag: "150 Qs" },
    { label: "React Native", href: "/react-native", icon: Smartphone, tag: "220 Qs" },
    { label: "Tricky JS Output", href: "/output", icon: BrainCircuit, tag: "50 Qs" },
    { label: "DSA & LeetCode", href: "/strings", icon: Binary, tag: "65+ Qs" },
  ];

  const practiceNav = [
    { label: "Mock Arena", href: "/mock", icon: Swords, tag: "Timed" },
    { label: "Progress & Mastery", href: "/progress", icon: TrendingUp },
    { label: "Revision Vault", href: "/bookmarks", icon: BookmarkCheck },
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
        onClick={() => setMobileOpen(false)}
        title={collapsed ? item.label : undefined}
        className={`group flex items-center rounded-xl text-xs font-medium transition-colors ${
          collapsed
            ? "justify-center w-10 h-10 mx-auto p-0"
            : "justify-between px-3 py-2"
        } ${
          isActive
            ? "bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-100 font-semibold border border-zinc-700/60 shadow-sm"
            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-zinc-200"
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          <IconComponent
            className={`h-4 w-4 shrink-0 transition-colors ${
              isActive
                ? "text-zinc-100"
                : "text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300"
            }`}
          />
          {!collapsed && <span className="truncate">{item.label}</span>}
        </div>

        {/* Question Count Tag */}
        {!collapsed && item.tag && (
          <span
            className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition-colors ${
              isActive
                ? "bg-zinc-700 text-zinc-200"
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 group-hover:text-zinc-700 dark:group-hover:text-zinc-300"
            }`}
          >
            {item.tag}
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--ink)] font-sans antialiased transition-colors duration-200">
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between border-r border-[var(--line)] bg-[var(--surface)] transition-all duration-300 select-none lg:sticky lg:top-0 lg:h-screen ${
          mobileOpen ? "translate-x-0 w-64 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        } ${collapsed ? "lg:w-16" : "lg:w-64"}`}
      >
        {/* Brand Header */}
        <div>
          <div
            className={`flex h-14 items-center border-b border-[var(--line)] ${
              collapsed ? "justify-center px-0" : "justify-between px-3.5"
            }`}
          >
            {collapsed ? (
              <button
                type="button"
                onClick={() => setCollapsed(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-700/80 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors shadow-sm"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
            ) : (
              <>
                <CAILogo />
                <button
                  type="button"
                  onClick={() => setCollapsed(true)}
                  className="hidden lg:flex rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-850 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                  title="Collapse sidebar"
                  aria-label="Collapse sidebar"
                >
                  <PanelLeftClose className="h-4 w-4" />
                </button>
              </>
            )}

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex lg:hidden rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-850 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors mr-3"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Groups */}
          <div
            className={`space-y-5 py-4 overflow-y-auto max-h-[calc(100vh-140px)] scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-800 ${
              collapsed ? "px-1.5" : "px-3"
            }`}
          >
            {/* Dashboard */}
            <div className="space-y-1">{mainNav.map(renderNavItem)}</div>

            {/* Curated Sheets */}
            <div>
              {!collapsed && (
                <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Curated Sheets
                </div>
              )}
              <div className="space-y-1">{sheetsNav.map(renderNavItem)}</div>
            </div>

            {/* Practice & Tests */}
            <div>
              {!collapsed && (
                <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Practice & Tests
                </div>
              )}
              <div className="space-y-1">{practiceNav.map(renderNavItem)}</div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className={`border-t border-[var(--line)] relative ${collapsed ? "p-2 flex justify-center" : "p-3"}`}>
          {mounted && account ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={
                  collapsed
                    ? "flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-xs font-bold text-white shadow hover:border-zinc-500 transition"
                    : "w-full flex items-center gap-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1.5 hover:border-zinc-400 dark:hover:border-zinc-700 transition"
                }
                title={collapsed ? `${account.name} (Account Settings)` : undefined}
                aria-label="User menu"
              >
                <div
                  className={
                    collapsed
                      ? ""
                      : "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-bold text-white shadow"
                  }
                >
                  {account.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                {!collapsed && (
                  <div className="flex-1 text-left leading-tight truncate">
                    <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200 truncate">
                      {account.name}
                    </p>
                    <p className="text-[10px] text-zinc-500 truncate">{account.email}</p>
                  </div>
                )}
                {!collapsed && <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />}
              </button>

              {/* User Dropdown Popover */}
              {userMenuOpen && (
                <div
                  className={`rounded-xl border border-[var(--line)] bg-[var(--surface)] p-1.5 shadow-2xl z-50 ${
                    collapsed
                      ? "fixed left-18 bottom-4 w-52"
                      : "absolute bottom-12 left-0 right-0"
                  }`}
                >
                  <div className="px-3 py-2 border-b border-[var(--line)]">
                    <div className="text-xs font-semibold text-[var(--ink)]">{account.name}</div>
                    <div className="text-[10px] text-[var(--ink-secondary)] truncate">
                      {account.email}
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        setMobileOpen(false);
                        router.push("/settings");
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-[var(--ink)] hover:bg-[var(--paper-hover)] rounded-lg flex items-center gap-2"
                    >
                      <Settings className="h-3.5 w-3.5 text-zinc-400" /> Settings & Goals
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        setMobileOpen(false);
                        logout();
                        router.push("/login");
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-rose-500 hover:bg-rose-500/10 rounded-lg flex items-center gap-2"
                    >
                      <LogOut className="h-3.5 w-3.5 text-rose-500" /> Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className={`flex items-center gap-2 rounded-xl bg-zinc-900 text-white hover:bg-black dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 font-medium px-3 py-2 text-xs transition border border-zinc-700 ${
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
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[var(--line)] bg-[var(--surface)]/90 backdrop-blur-md px-3 sm:px-6 transition-colors duration-200">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 pr-2">
            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex lg:hidden rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-850 hover:text-zinc-700 dark:hover:text-zinc-200 transition shrink-0"
              aria-label="Open mobile menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Quick Search Input */}
            <div className="relative w-full max-w-[150px] xs:max-w-[210px] sm:max-w-xs md:max-w-md">
              <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search 665+ questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] py-1.5 pl-8 pr-3 sm:pr-10 text-xs text-[var(--ink)] placeholder-[var(--muted)] focus:border-zinc-500 focus:outline-none"
              />
              <kbd className="hidden sm:inline absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-[var(--line)] bg-[var(--surface)] px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right Status Badges & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Target Role Badge */}
            <div
              className="hidden md:flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1 text-xs font-medium text-[var(--ink-secondary)]"
              title="Target Preparation Goal"
            >
              <Target className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-zinc-400">Target:</span>
              <span className="font-medium text-[var(--ink)]">{mounted ? (state?.goal || "Frontend SDE") : "Frontend SDE"}</span>
            </div>

            {/* Streak Badge */}
            <div
              className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-[var(--line)] bg-[var(--paper)] px-2 sm:px-2.5 py-1 text-xs font-medium text-[var(--ink)]"
              title={`Daily Active Streak: ${streakStats.currentStreak} day${streakStats.currentStreak === 1 ? "" : "s"} (Best: ${streakStats.longestStreak} days)`}
            >
              <Flame className={`h-3.5 w-3.5 ${streakStats.currentStreak > 0 ? "text-zinc-100 dark:text-zinc-100" : "text-zinc-400"}`} />
              <span className="hidden sm:inline">
                {streakStats.currentStreak > 0 ? `${streakStats.currentStreak}-Day Streak` : "0-Day Streak"}
              </span>
              <span className="sm:hidden text-[11px]">{streakStats.currentStreak}d</span>
            </div>

            {/* Theme Toggle (Dark / Light) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--paper)] text-[var(--ink-secondary)] hover:text-[var(--ink)] transition"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 bg-[var(--bg)] p-3 sm:p-6 lg:p-8 overflow-y-auto transition-colors duration-200">
          {children}
        </main>
      </div>
    </div>
  );
}
