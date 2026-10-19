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
  Code2,
  Atom,
  Smartphone,
  BrainCircuit,
  Binary,
  Swords,
  BookmarkCheck,
  TrendingUp,
  ArrowRight,
  Flame,
  Target,
  Sparkles,
  CheckCircle2,
  Layers,
  Compass,
  Zap,
} from "lucide-react";

export default function DashboardPage() {
  const { account } = useAuth();
  const { state } = useStudy();
  const router = useRouter();
  const [greeting, setGreeting] = useState("Good day");

  useEffect(() => {
    if (!account) {
      router.replace("/login");
      return;
    }

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, [account, router]);

  if (!account) return null;

  const stats = catalogStats(state);
  const diff = difficultyStats(state);
  const next = continueTarget(state);

  // CAI's authentic core curriculum sheets
  const coreSheets = [
    {
      id: "javascript",
      title: "JavaScript 10-Day Mastery",
      category: "Language Core",
      desc: "Deep dive into Event Loop, Closures, Prototypes, Garbage Collection, WeakMaps & Async Microtasks.",
      total: stats.rows.find((r: any) => r.topic.id === "javascript")?.total || 200,
      done: stats.rows.find((r: any) => r.topic.id === "javascript")?.done || 0,
      icon: Code2,
      accent: "from-amber-500/20 to-amber-500/5",
      badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      path: "/javascript",
    },
    {
      id: "react",
      title: "React 19 & Next.js Architecture",
      category: "Frontend Framework",
      desc: "Fiber reconciler, Server Components, Suspense boundaries, SSR/SSG caching, and custom state machines.",
      total: stats.rows.find((r: any) => r.topic.id === "react")?.total || 150,
      done: stats.rows.find((r: any) => r.topic.id === "react")?.done || 0,
      icon: Atom,
      accent: "from-cyan-500/20 to-cyan-500/5",
      badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
      path: "/react",
    },
    {
      id: "react-native",
      title: "React Native Mobile SDE",
      category: "Mobile Architecture",
      desc: "JSI, TurboModules, Fabric renderer, Reanimated 3, Gesture Handler, bridging & native memory optimization.",
      total: stats.rows.find((r: any) => r.topic.id === "react-native")?.total || 220,
      done: stats.rows.find((r: any) => r.topic.id === "react-native")?.done || 0,
      icon: Smartphone,
      accent: "from-blue-500/20 to-blue-500/5",
      badgeColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
      path: "/react-native",
    },
    {
      id: "output",
      title: "Tricky JS Output & Edge Cases",
      category: "Interview Traps",
      desc: "50 tricky code puzzles: type coercion, scope hoisting, temporal dead zone, and event loop microtask order.",
      total: stats.rows.find((r: any) => r.topic.id === "output")?.total || 50,
      done: stats.rows.find((r: any) => r.topic.id === "output")?.done || 0,
      icon: BrainCircuit,
      accent: "from-purple-500/20 to-purple-500/5",
      badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
      path: "/output",
    },
    {
      id: "strings",
      title: "Strings & Algorithm Drills",
      category: "Coding Rounds",
      desc: "45 high-frequency coding round challenges: sliding window, anagrams, prefix trees & two pointers.",
      total: stats.rows.find((r: any) => r.topic.id === "strings")?.total || 45,
      done: stats.rows.find((r: any) => r.topic.id === "strings")?.done || 0,
      icon: Binary,
      accent: "from-emerald-500/20 to-emerald-500/5",
      badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      path: "/strings",
    },
  ];

  return (
    <HomeLayout>
      <div className="space-y-8 max-w-[1400px] mx-auto">
        {/* 1. Developer Command Center Header */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-r from-[#121216] via-[#101014] to-[#0c0c0f] p-6 lg:p-8 shadow-2xl">
          {/* Subtle glow orb */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Prep Session Active
                </span>
                <span className="flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-0.5 text-[11px] font-medium text-zinc-400">
                  <Target className="h-3 w-3 text-amber-400" />
                  Target: <strong className="text-zinc-200">{state?.goal || "Frontend SDE"}</strong>
                </span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
                {greeting}, {account?.name}
              </h1>
              <p className="text-xs lg:text-sm text-zinc-400 max-w-xl">
                Track your interview preparation, conquer curated frontend sheets, and run timed mock technical rounds.
              </p>
            </div>

            {/* Quick Action Dock */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => router.push(next.path || "/javascript")}
                className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold px-4 py-2.5 text-xs transition shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <Zap className="h-4 w-4 fill-black" />
                <span>Resume: {next.title}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => router.push("/mock")}
                className="flex items-center gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-white font-medium px-4 py-2.5 text-xs transition active:scale-95"
              >
                <Swords className="h-4 w-4 text-amber-400" />
                <span>Mock Arena</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Real Performance Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-zinc-800/80 bg-[#101014] p-4 space-y-1">
            <span className="text-[11px] font-medium text-zinc-400">Overall Solved</span>
            <div className="text-xl font-bold text-white flex items-baseline gap-1.5">
              <span>{stats.done}</span>
              <span className="text-xs font-normal text-zinc-400">/ {stats.total} Qs</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden mt-2">
              <div
                className="h-full rounded-full bg-amber-400 transition-all duration-500"
                style={{ width: `${stats.pct}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-[#101014] p-4 space-y-1">
            <span className="text-[11px] font-medium text-zinc-400">Difficulty Split</span>
            <div className="flex items-center gap-2 text-xs font-semibold pt-1">
              <span className="text-cyan-400">{diff.easy.done} Easy</span>
              <span className="text-zinc-600">•</span>
              <span className="text-amber-400">{diff.medium.done} Med</span>
              <span className="text-zinc-600">•</span>
              <span className="text-rose-400">{diff.hard.done} Hard</span>
            </div>
            <p className="text-[10px] text-zinc-400 pt-1">Across all 5 interview sheets</p>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-[#101014] p-4 space-y-1">
            <span className="text-[11px] font-medium text-zinc-400">Mock Quiz Accuracy</span>
            <div className="text-xl font-bold text-white flex items-baseline gap-1">
              <span>{Object.values(state?.plan?.results || {}).filter((r: any) => r?.passed).length}</span>
              <span className="text-xs font-normal text-zinc-400">Quizzes Passed</span>
            </div>
            <p className="text-[10px] text-zinc-400 pt-1">Timed 20-Q interview quizzes</p>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-[#101014] p-4 space-y-1">
            <span className="text-[11px] font-medium text-zinc-400">Revision Vault</span>
            <div className="text-xl font-bold text-white flex items-baseline gap-1">
              <span>{state?.bookmarks?.length || 0}</span>
              <span className="text-xs font-normal text-zinc-400">Starred Qs</span>
            </div>
            <Link
              href="/bookmarks"
              className="inline-block text-[10px] font-medium text-amber-400 hover:underline pt-1"
            >
              Review saved questions →
            </Link>
          </div>
        </div>

        {/* 3. Core Curated Sheets Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                <Layers className="h-4 w-4 text-amber-400" />
                Curated Interview Sheets
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Structured day-by-day roadmaps covering core concepts tested in SDE interviews.
              </p>
            </div>
            <Link
              href="/progress"
              className="text-xs font-semibold text-zinc-400 hover:text-white transition flex items-center gap-1"
            >
              View Full Roadmap <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreSheets.map((sheet) => {
              const IconComp = sheet.icon;
              const pct = sheet.total ? Math.round((sheet.done / sheet.total) * 100) : 0;

              return (
                <div
                  key={sheet.id}
                  className="group flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-[#101014] p-5 hover:border-zinc-700/80 transition-all hover:shadow-xl hover:shadow-black/50"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 text-amber-400 transition">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${sheet.badgeColor}`}>
                        {sheet.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                        {sheet.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                        {sheet.desc}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-zinc-850 pt-4 mt-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400 font-medium">
                        {sheet.done} of {sheet.total} solved
                      </span>
                      <span className="font-bold text-zinc-200">{pct}%</span>
                    </div>

                    <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-400 transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => router.push(sheet.path)}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 py-2 text-xs font-semibold text-zinc-200 hover:text-white transition group-hover:border-zinc-700"
                    >
                      <span>Open Sheet</span>
                      <ArrowRight className="h-3 w-3 text-zinc-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Split Row: Today's Spotlight & Mock Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Spotlight Question */}
          <div className="rounded-2xl border border-zinc-800/80 bg-[#101014] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                Today's Daily Spotlight
              </span>
              <span className="text-xs text-zinc-400 font-medium">Core Concept</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">
                Implement a Custom Event Emitter with Once & Unsubscribe
              </h3>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                Frequently asked at Uber, Atlassian, and Stripe. Tests closure encapsulation, memory leak prevention, and callback cleanup.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-850">
              <span className="text-xs text-zinc-400 font-medium">Medium • JavaScript Sheet</span>
              <button
                type="button"
                onClick={() => router.push("/javascript")}
                className="flex items-center gap-1.5 rounded-xl bg-zinc-850 hover:bg-zinc-750 border border-zinc-700 px-3.5 py-1.5 text-xs font-semibold text-white transition"
              >
                <span>Solve Question</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Timed Mock Interview Simulator */}
          <div className="rounded-2xl border border-zinc-800/80 bg-gradient-to-br from-[#121216] to-[#0d0d10] p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Swords className="h-5 w-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Timed Mock Arena</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Test your interview reflexes with a randomized 20-question timed challenge replicating real frontend coding screening rounds.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-850">
              <span className="text-xs text-zinc-400 font-medium">20 Questions • 30 Mins</span>
              <button
                type="button"
                onClick={() => router.push("/mock")}
                className="flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold px-4 py-2 text-xs transition active:scale-95 shadow-md shadow-amber-500/20"
              >
                <span>Launch Mock Arena</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
