"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext.jsx";
import { useStudy } from "@/context/StudyContext.jsx";
import { HomeLayout } from "@/components/HomeLayout";
import { useTheme } from "@/context/ThemeContext";
import {
  Settings,
  Target,
  User,
  Mail,
  Sun,
  Moon,
  Check,
  Sparkles,
  ShieldAlert,
  RotateCcw,
  Save,
} from "lucide-react";

const SUGGESTED_GOALS = [
  "Senior Frontend Engineer",
  "Fullstack SDE-II (React & Node)",
  "Staff UI/UX Systems Architect",
  "React Native Mobile Engineer",
  "FAANG Frontend Specialist",
];

export default function SettingsPage() {
  const { account, rename } = useAuth();
  const { state, dispatch } = useStudy();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [goalValue, setGoalValue] = useState("");
  const [note, setNote] = useState("");
  const [resetConfirm, setResetConfirm] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!account) {
      router.replace("/login");
      return;
    }
    setGoalValue(state?.goal || "Frontend SDE");
  }, [mounted, account, state?.goal, router]);

  if (!mounted || !account) {
    return (
      <HomeLayout>
        <div className="space-y-6 max-w-4xl mx-auto pb-20 animate-pulse">
          <div className="h-36 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
            <div className="h-64 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
          </div>
        </div>
      </HomeLayout>
    );
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newName = String(data.get("name") || "").trim();
    const newGoal = String(data.get("goal") || "").trim() || "Frontend SDE";

    if (newName && rename) {
      rename(newName);
    }
    dispatch({ type: "set-goal", goal: newGoal });
    setGoalValue(newGoal);
    setNote("✓ Profile & target goal saved successfully.");
    setTimeout(() => setNote(""), 3500);
  };

  const handleResetProgress = () => {
    if (!resetConfirm) {
      setResetConfirm(true);
      return;
    }
    // Clear study keys in localStorage
    try {
      localStorage.removeItem("interview-js-plan-v1");
      localStorage.removeItem("interview-react-plan-v1");
      localStorage.removeItem("interview-react-native-plan-v1");
      localStorage.removeItem("interview-activity-v1");
      localStorage.removeItem("interview-visits-v1");
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <HomeLayout>
      <div className="space-y-6 max-w-4xl mx-auto pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/dashboard" className="hover:text-zinc-200 transition">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-[var(--ink)] font-medium">Settings & Goals</span>
        </div>

        {/* 1. Header Banner */}
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200">
              <Settings className="h-5 w-5" />
            </div>
            <span className="rounded-full border border-zinc-700/60 bg-zinc-800/40 px-3 py-1 text-[11px] font-semibold tracking-wider text-zinc-300 uppercase">
              Preferences & Configuration
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
            Account & Target Settings
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] max-w-xl leading-relaxed">
            Personalize your interview preparation goals, adjust your display name, and toggle dark or light mode.
          </p>
        </div>

        {/* 2. Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile & Target Role Card */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-5 shadow-sm"
          >
            <div className="flex items-center gap-2 border-b border-[var(--line)] pb-3">
              <User className="h-4 w-4 text-zinc-400" />
              <h2 className="text-sm font-bold text-[var(--ink)]">
                Profile & Career Target
              </h2>
            </div>

            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Full Display Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={account?.name || ""}
                required
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] p-2.5 text-xs text-[var(--ink)] focus:border-zinc-500 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>

            {/* Email (Read-only) */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">
                Email Address (Read-only)
              </label>
              <input
                type="email"
                value={account?.email || ""}
                disabled
                readOnly
                className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 p-2.5 text-xs text-zinc-500 cursor-not-allowed select-none"
              />
            </div>

            {/* Target Role with Suggestions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-300">
                  Target Role / Interview Goal
                </label>
              </div>
              <input
                type="text"
                name="goal"
                value={goalValue}
                onChange={(e) => setGoalValue(e.target.value)}
                required
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] p-2.5 text-xs text-[var(--ink)] focus:border-zinc-500 focus:outline-none"
                placeholder="e.g. Senior Frontend Engineer"
              />

              {/* Quick suggestion tags */}
              <div className="pt-1 space-y-1.5">
                <span className="text-[10px] text-zinc-500 block">
                  Quick suggestions:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_GOALS.map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => setGoalValue(sug)}
                      className={`text-[10px] px-2 py-0.5 rounded-lg border transition ${
                        goalValue === sug
                          ? "border-zinc-600 bg-zinc-800 text-zinc-100 font-semibold"
                          : "border-zinc-800 bg-[#121215] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                      }`}
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-100 hover:bg-zinc-700 transition shadow-sm active:scale-95"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Profile & Goals</span>
              </button>

              {note && (
                <p className="mt-2 text-xs font-medium text-zinc-200">{note}</p>
              )}
            </div>
          </form>

          {/* Theme & Display Preferences Card */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-5 shadow-sm">
              <div className="flex items-center gap-2 border-b border-[var(--line)] pb-3">
                <Sun className="h-4 w-4 text-zinc-400" />
                <h2 className="text-sm font-bold text-[var(--ink)]">
                  Appearance & Theme
                </h2>
              </div>

              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Choose the visual theme that suits your working environment. Designed for maximum code legibility and zero distraction.
              </p>

              {/* Theme Selector Cards */}
              <div className="grid grid-cols-2 gap-3">
                {/* Dark Theme */}
                <button
                  type="button"
                  onClick={() => {
                    if (theme !== "dark") toggleTheme();
                  }}
                  className={`flex flex-col items-start gap-2.5 rounded-xl border p-3.5 text-left transition select-none ${
                    theme === "dark"
                      ? "border-zinc-500 bg-[#0d0d10] ring-1 ring-zinc-600"
                      : "border-zinc-800 bg-[#0d0d10] opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <Moon className="h-4 w-4 text-zinc-200" />
                    {theme === "dark" && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-800 text-[10px] text-zinc-100 font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-100 block">
                      Stealth Dark
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      LeetCode-grade pure black
                    </span>
                  </div>
                </button>

                {/* Light Theme */}
                <button
                  type="button"
                  onClick={() => {
                    if (theme !== "light") toggleTheme();
                  }}
                  className={`flex flex-col items-start gap-2.5 rounded-xl border p-3.5 text-left transition select-none ${
                    theme === "light"
                      ? "border-zinc-400 bg-white ring-1 ring-zinc-400 text-zinc-900"
                      : "border-zinc-300 bg-zinc-100 text-zinc-900 opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <Sun className="h-4 w-4 text-zinc-900" />
                    {theme === "light" && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-200 text-[10px] text-zinc-900 font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-900 block">
                      Clean Light
                    </span>
                    <span className="text-[10px] text-zinc-600">
                      High-contrast daylight mode
                    </span>
                  </div>
                </button>
              </div>

              {/* Study Tip Callout */}
              <div className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3.5 text-xs space-y-1">
                <span className="font-semibold text-[var(--ink)] flex items-center gap-1.5 text-[11px]">
                  <Sparkles className="h-3.5 w-3.5 text-zinc-400" /> Interview Study Tip
                </span>
                <p className="text-[11px] text-[var(--ink-secondary)] leading-relaxed">
                  Consistently completing 1 Day Module (20 questions + quiz) per day results in 4x higher retention than cramming all sheets over the weekend.
                </p>
              </div>
            </div>

            {/* Danger Zone: Reset Data */}
            <div className="rounded-2xl border border-zinc-850 bg-[#0c0c0e] p-5 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-zinc-400" />
                <h3 className="text-xs font-bold text-zinc-200">
                  Data & Progress Management
                </h3>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Clear all local study progress, completed question marks, and quiz records to restart from Day 1.
              </p>

              <div className="pt-1">
                {resetConfirm ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleResetProgress}
                      className="rounded-xl border border-rose-600 bg-rose-950/40 px-3.5 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-900/60 transition"
                    >
                      Confirm: Reset All Progress
                    </button>
                    <button
                      type="button"
                      onClick={() => setResetConfirm(false)}
                      className="rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setResetConfirm(true)}
                    className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset Study Progress...</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
