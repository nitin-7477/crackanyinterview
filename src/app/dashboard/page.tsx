"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext.jsx";
import { useStudy } from "@/context/StudyContext.jsx";
import { HomeLayout } from "@/components/HomeLayout";
import {
  catalogStats,
  difficultyStats,
  continueTarget,
} from "@/lib/catalog.js";
import {
  Pin,
  Plus,
  ArrowRight,
  ExternalLink,
  Clock,
  Coins,
  CheckCircle2,
  Sparkles,
  BookMarked,
  Layers,
  Code2,
  Atom,
  Binary,
  BrainCircuit,
  Smartphone,
  CalendarCheck2,
} from "lucide-react";

export default function DashboardPage() {
  const { account } = useAuth();
  const { state } = useStudy();
  const router = useRouter();
  const [greeting, setGreeting] = useState("Good afternoon 👋");
  const [greetingSub, setGreetingSub] = useState("The day gets heavy around now. Good to see you still going.");

  useEffect(() => {
    if (!account) {
      router.replace("/login");
      return;
    }

    // Dynamic TUF-style greeting based on local time
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning ☀️");
      setGreetingSub("Consistency is built before the world wakes up. Time to grind.");
    } else if (hour < 17) {
      setGreeting("Good afternoon 👋");
      setGreetingSub("The day gets heavy around now. Good to see you still going.");
    } else {
      setGreeting("Good evening 🌙");
      setGreetingSub("Finish your daily goals strong before wrapping up today.");
    }
  }, [account, router]);

  if (!account) return null;

  const stats = catalogStats(state);
  const diff = difficultyStats(state);
  const next = continueTarget(state);

  // Popular Topics (TUF style)
  const popularTopics = [
    {
      id: "javascript",
      code: "180",
      title: "JS 180 — Master JS Patterns",
      subtitle: "Closures, Event Loop, Prototypes & Curated Patterns",
      topicsCount: 179,
      hours: "65 hrs",
      path: "/javascript",
      badge: "Core",
    },
    {
      id: "a2z",
      code: "A2Z",
      title: "CAI A2Z Frontend SDE Sheet",
      subtitle: "Full roadmap from HTML/CSS to Senior Architecture",
      topicsCount: 495,
      hours: "132 hrs",
      path: "/javascript",
      badge: "Popular",
    },
    {
      id: "react",
      code: "⚛️",
      title: "React 19 & Next.js Deep Dive",
      subtitle: "Fiber, Server Components, SSR, Suspense & Hooks",
      topicsCount: 217,
      hours: "27 hrs",
      path: "/react",
      badge: "Must Have",
    },
    {
      id: "lld",
      code: "LLD",
      title: "Frontend Architecture & LLD",
      subtitle: "Machine Coding, State Machines, Virtualization",
      topicsCount: 72,
      hours: "31 hrs",
      path: "/output",
      badge: "Senior",
    },
  ];

  // Must-Have for Interviews
  const mustHaveTopics = [
    {
      title: "Tricky Output Predictor",
      desc: "50+ tricky JS execution, coercion & async puzzles.",
      icon: BrainCircuit,
      path: "/output",
    },
    {
      title: "Strings & DSA Algorithms",
      desc: "45 high-frequency coding rounds challenges.",
      icon: Binary,
      path: "/strings",
    },
    {
      title: "React Native Mobile SDE",
      desc: "220 questions on JSI, Reanimated & Native Modules.",
      icon: Smartphone,
      path: "/react-native",
    },
  ];

  return (
    <HomeLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1440px] mx-auto">
        {/* LEFT / MAIN COLUMN (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* 1. Dynamic Greeting Header (takeUforward Style) */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              {greeting}
            </h1>
            <p className="text-sm text-zinc-400 mt-1">{greetingSub}</p>
          </div>

          {/* 2. Pin your subjects */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <Pin className="h-3.5 w-3.5 text-zinc-500" />
              <span>Pin your subjects</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {/* Add Subject Placeholder */}
              <button
                type="button"
                onClick={() => router.push("/javascript")}
                className="flex h-20 w-32 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-[#0e0e11] hover:border-zinc-600 hover:bg-zinc-900/60 text-zinc-500 hover:text-zinc-200 transition group"
                title="Pin a subject"
              >
                <Plus className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] mt-1">Add topic</span>
              </button>

              {/* Pinned Card 1: JavaScript */}
              <Link
                href="/javascript"
                className="flex h-20 w-44 flex-col justify-between rounded-2xl border border-zinc-800/80 bg-[#121216] p-3 hover:border-zinc-700 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                    JS
                  </span>
                  <span className="text-[11px] text-zinc-500">{stats.done}/200</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">JavaScript 180</div>
                  <div className="text-[10px] text-zinc-400">Core Patterns</div>
                </div>
              </Link>

              {/* Pinned Card 2: React */}
              <Link
                href="/react"
                className="flex h-20 w-44 flex-col justify-between rounded-2xl border border-zinc-800/80 bg-[#121216] p-3 hover:border-zinc-700 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded">
                    REACT
                  </span>
                  <span className="text-[11px] text-zinc-500">150 topics</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">React & Next.js</div>
                  <div className="text-[10px] text-zinc-400">Hooks & Architecture</div>
                </div>
              </Link>
            </div>
          </div>

          {/* 3. PLANLY Banner (takeUforward Style) */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#121216] p-6 shadow-xl">
            {/* Subtle background grid pattern */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #71717a 1px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700/60 bg-zinc-800/60 px-3 py-1 text-[11px] font-medium text-zinc-300">
                  <Sparkles className="h-3 w-3 text-amber-400" />
                  PLANLY — Your personal planner
                </span>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white max-w-lg">
                  Know what to study every day and readjust as you go
                </h2>

                {/* Social proof avatars */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex -space-x-2 overflow-hidden">
                    <div className="inline-block h-6 w-6 rounded-full bg-amber-500 text-[10px] font-bold text-black flex items-center justify-center ring-2 ring-[#121216]">
                      A
                    </div>
                    <div className="inline-block h-6 w-6 rounded-full bg-blue-500 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-[#121216]">
                      R
                    </div>
                    <div className="inline-block h-6 w-6 rounded-full bg-purple-500 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-[#121216]">
                      S
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400 font-medium">
                    <strong className="text-zinc-200">49.4k+</strong> plans created with Planly
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => router.push(next.path || "/javascript")}
                  className="flex items-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/80 px-5 py-2.5 text-xs font-semibold text-white transition hover:scale-105 active:scale-95 shadow-lg shadow-black/40"
                >
                  <span>Build my plan</span>
                  <ArrowRight className="h-3.5 w-3.5 text-zinc-300" />
                </button>
              </div>
            </div>
          </div>

          {/* 4. Explore Popular Topics (takeUforward Style Cards) */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold tracking-tight text-white">
              Explore Popular Topics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-[#121216] p-5 hover:border-zinc-700 transition group"
                >
                  <div className="flex items-start gap-3.5">
                    {/* TUF-style topic box icon */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 font-bold text-xs text-zinc-200 shadow-inner group-hover:border-zinc-700 transition">
                      {topic.code}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                        {topic.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-800/60 pt-4 mt-4">
                    <div className="flex items-center gap-3 text-[11px] text-zinc-500">
                      <span>📖 {topic.topicsCount} total topics</span>
                      <span>🕒 {topic.hours}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => router.push(topic.path)}
                      className="flex items-center gap-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white transition"
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Must-Have for Interviews */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold tracking-tight text-white">
              Must-Have for Interviews
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mustHaveTopics.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.path}
                    className="flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-[#121216] p-4 hover:border-zinc-700 hover:bg-[#15151a] transition group"
                  >
                    <div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-amber-400 mb-3">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                    <div className="pt-3 text-[11px] font-medium text-zinc-500 flex items-center gap-1 group-hover:text-zinc-300 transition-colors">
                      Start Practice <ArrowRight className="h-3 w-3" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 cols) (TUF Widgets) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Widget 1: "Too many tabs open?" (Gold/Dark grid banner) */}
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#181510] to-[#121214] p-6 shadow-xl">
            <span className="inline-block rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-amber-400 uppercase tracking-wider mb-3">
              One-stop platform
            </span>
            <h3 className="text-xl font-bold italic tracking-tight text-white">
              Too many tabs open?
            </h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Time lost never comes back. Find all SDE interview sheets, tricky outputs, and mock tests at{" "}
              <span className="text-amber-400 font-medium">one place</span>.
            </p>

            <button
              type="button"
              onClick={() => router.push("/settings")}
              className="mt-5 w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-2.5 text-xs font-bold text-black shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition"
            >
              Upgrade to Plus
            </button>
          </div>

          {/* Widget 2: "Problem Of The Day ↗" */}
          <div className="rounded-2xl border border-zinc-800/80 bg-[#121216] p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <Link
                href="/output"
                className="text-xs font-bold text-white hover:text-amber-400 flex items-center gap-1 transition-colors"
              >
                <span>Problem Of The Day</span>
                <ExternalLink className="h-3 w-3 text-zinc-500" />
              </Link>
              <span className="flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                <Coins className="h-3 w-3" /> +20
              </span>
            </div>

            <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/80 p-3">
              <div className="text-xs font-medium text-zinc-200">
                Flatten Nested Array & Object with Prototype Inheritance
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 mt-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" /> Medium • JS Core
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <Clock className="h-3.5 w-3.5 text-zinc-500" />
                <span>8 hrs left</span>
              </div>
              <button
                type="button"
                onClick={() => router.push("/output")}
                className="rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-3.5 py-1.5 text-xs font-semibold text-white transition active:scale-95"
              >
                Solve Problem
              </button>
            </div>
          </div>

          {/* Widget 3: "Daily Planner" */}
          <div className="rounded-2xl border border-zinc-800/80 bg-[#121216] p-5 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Daily Planner
            </h3>

            <div className="rounded-xl border border-zinc-800/60 bg-[#0e0e11] p-4 text-center space-y-3">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-amber-400">
                <CalendarCheck2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-200">Target: 5 Problems / Day</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  Target Role: <span className="text-zinc-300 font-semibold">{state.goal}</span>
                </p>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-zinc-400">
                  <span>Today's Progress</span>
                  <span>{stats.pct}% Solved</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-500"
                    style={{ width: `${Math.max(5, stats.pct)}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => router.push(next.path || "/javascript")}
                className="w-full rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 py-1.5 text-xs font-semibold text-white transition"
              >
                Continue Practice →
              </button>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
