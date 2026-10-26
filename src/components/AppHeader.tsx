"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { initials } from "../lib/auth.js";
import { searchQuestions } from "../lib/catalog.js";
import { useTheme } from "../context/ThemeContext";
import { CAILogo } from "./CAILogo";
import {
  Search,
  Flame,
  ChevronDown,
  LayoutDashboard,
  Bookmark,
  Settings,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

export function AppHeader({ home, account, topicId, onLogout, modules }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const matches = searchQuestions(query);

  useEffect(() => {
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  function openMatch(match: any) {
    setQuery("");
    router.push(match.path);
  }

  const navLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "JavaScript", href: "/javascript" },
    { label: "React & Next.js", href: "/react" },
    { label: "React Native", href: "/react-native" },
    { label: "Tricky Output", href: "/output" },
    { label: "Strings & DSA", href: "/strings" },
    { label: "Mock Arena", href: "/mock" },
    { label: "Progress", href: "/progress" },
  ];

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-[#1e1e24] bg-black/95 backdrop-blur-md px-4 sm:px-6">
      {/* Brand & CAI Logo */}
      <div className="flex items-center gap-6">
        <CAILogo href={account ? "/dashboard" : "/login"} />

        {/* Center Nav Links */}
        {account && (
          <nav className="hidden lg:flex items-center gap-1 ml-4" aria-label="Main Navigation">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                    isActive
                      ? "bg-zinc-800 text-white font-semibold border border-zinc-700"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>

      {/* Right Tools: Search, Streak, Theme Toggle, Profile */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative w-44 sm:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="search"
            placeholder="Search problems..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-[#121214] py-1.5 pl-8 pr-8 text-xs text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none"
          />
          {matches.length > 0 && query.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-11 rounded-xl border border-zinc-800 bg-[#121214] p-1.5 shadow-2xl z-50 max-h-80 overflow-y-auto">
              {matches.slice(0, 8).map((match: any) => (
                <button
                  type="button"
                  key={match.question.id}
                  onClick={() => openMatch(match)}
                  className="w-full text-left p-2 rounded-lg hover:bg-zinc-800 text-xs text-white flex flex-col gap-0.5"
                >
                  <span className="text-[10px] text-zinc-400 font-semibold uppercase">
                    {match.topic.title}
                  </span>
                  <span className="truncate">{match.question.q}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Streak */}
        {account && (
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-zinc-200">
            <Flame className="h-3.5 w-3.5 text-zinc-400" />
            <span>7-Day Streak</span>
          </div>
        )}

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white transition"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>

        {/* Profile Popover */}
        {account ? (
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
              className="flex items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 p-1 hover:border-zinc-700 transition"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-bold text-white shadow">
                {initials(account.name)}
              </span>
              <span className="hidden md:inline text-xs font-semibold text-white">
                {account.name}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
            </button>

            {open && (
              <div
                className="absolute right-0 top-11 w-52 rounded-xl border border-zinc-800 bg-[#121214] p-1.5 shadow-2xl z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-3 py-2 border-b border-zinc-800">
                  <div className="text-xs font-bold text-white">{account.name}</div>
                  <div className="text-[10px] text-zinc-500 truncate">{account.email}</div>
                </div>
                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      router.push("/dashboard");
                    }}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 rounded-lg flex items-center gap-2"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5 text-zinc-400" /> Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      router.push("/bookmarks");
                    }}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 rounded-lg flex items-center gap-2"
                  >
                    <Bookmark className="h-3.5 w-3.5 text-zinc-400" /> Revision Vault
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      router.push("/settings");
                    }}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 rounded-lg flex items-center gap-2"
                  >
                    <Settings className="h-3.5 w-3.5 text-zinc-400" /> Goals & Settings
                  </button>
                </div>
                <div className="border-t border-zinc-800 pt-1">
                  <button
                    type="button"
                    onClick={onLogout}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg flex items-center gap-2"
                  >
                    <LogOut className="h-3.5 w-3.5 text-rose-500" /> Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </header>
  );
}
