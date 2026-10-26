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
import { DailyQuestCard } from "@/components/DailyQuestCard";
import { ReadinessScoreCard } from "@/components/ReadinessScoreCard";
import { ActivityRadar } from "@/components/ActivityRadar";
import { TrophyCabinet } from "@/components/TrophyCabinet";
import {
  Code2,
  Atom,
  Smartphone,
  BrainCircuit,
  Binary,
  Swords,
  Layers,
  Zap,
  Target,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const { account } = useAuth();
  const { state } = useStudy();
  const router = useRouter();
  const [greeting, setGreeting] = useState("Good day");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!account) {
      router.replace("/login");
      return;
    }

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, [mounted, account, router]);

  if (!mounted || !account) {
    return (
      <HomeLayout>
        <div className="space-y-8 max-w-[1400px] mx-auto animate-pulse">
          <div className="h-44 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-24 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
            <div className="h-24 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
            <div className="h-24 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
            <div className="h-24 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
          </div>
          <div className="h-72 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
        </div>
      </HomeLayout>
    );
  }

  const stats = catalogStats(state);
  const diff = difficultyStats(state);
  const next = continueTarget(state);

  const coreSheets = [
    {
      id: "javascript",
      title: "JavaScript 10-Day Mastery",
      category: "Language Core",
      desc: "Deep dive into Event Loop, Closures, Prototypes, Garbage Collection, WeakMaps & Async Microtasks.",
      total: stats.rows.find((r: any) => r.topic.id === "javascript")?.total || 200,
      done: stats.rows.find((r: any) => r.topic.id === "javascript")?.done || 0,
      icon: Code2,
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
      path: "/strings",
    },
  ];

  return (
    <HomeLayout>
      <div className="space-y-8 max-w-[1400px] mx-auto">
        {/* 1. Developer Command Center Header */}
        <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 lg:p-8 shadow-sm">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--ink-secondary)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 animate-pulse" />
                  Prep Session Active
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--ink-secondary)]">
                  <Code2 className="h-3 w-3 text-zinc-400" />
                  <span>665+ Questions</span>
                </span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-[var(--ink)]">
                {greeting}, {account?.name}
              </h1>
              <p className="text-xs lg:text-sm text-[var(--ink-secondary)] max-w-xl leading-relaxed">
                Track your interview preparation, conquer curated frontend sheets, and run timed mock technical rounds.
              </p>
            </div>

            {/* Quick Action Dock */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => router.push(next.path || "/javascript")}
                className="flex items-center gap-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-100 hover:bg-black dark:hover:bg-zinc-700 border border-zinc-700/80 font-medium px-4 py-2.5 text-xs transition active:scale-95 shadow-sm"
              >
                <Zap className="h-3.5 w-3.5" />
                <span>Resume: {next.title}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => router.push("/mock")}
                className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--paper-hover)] text-[var(--ink)] font-medium px-4 py-2.5 text-xs transition active:scale-95"
              >
                <Swords className="h-3.5 w-3.5 text-zinc-400" />
                <span>Mock Arena</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Real Performance Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4 space-y-1 shadow-sm">
            <span className="text-[11px] font-medium text-[var(--ink-secondary)]">Overall Solved</span>
            <div className="text-xl font-bold text-[var(--ink)] flex items-baseline gap-1.5">
              <span>{stats.done}</span>
              <span className="text-xs font-normal text-[var(--ink-secondary)]">/ {stats.total} Qs</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[var(--line)] overflow-hidden mt-2">
              <div
                className="h-full rounded-full bg-zinc-800 dark:bg-zinc-200 transition-all duration-500"
                style={{ width: `${stats.pct}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4 space-y-1 shadow-sm">
            <span className="text-[11px] font-medium text-[var(--ink-secondary)]">Difficulty Split</span>
            <div className="flex items-center gap-2 text-xs font-medium pt-1">
              <span className="text-[var(--ink)] font-semibold">{diff.easy.done} Easy</span>
              <span className="text-zinc-400">•</span>
              <span className="text-[var(--ink-secondary)]">{diff.medium.done} Med</span>
              <span className="text-zinc-400">•</span>
              <span className="text-[var(--muted)]">{diff.hard.done} Hard</span>
            </div>
            <p className="text-[10px] text-[var(--muted)] pt-1">Across all 5 interview sheets</p>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4 space-y-1 shadow-sm">
            <span className="text-[11px] font-medium text-[var(--ink-secondary)]">Mock Quiz Accuracy</span>
            <div className="text-xl font-bold text-[var(--ink)] flex items-baseline gap-1">
              <span>{Object.values(state?.plan?.results || {}).filter((r: any) => r?.passed).length}</span>
              <span className="text-xs font-normal text-[var(--ink-secondary)]">Quizzes Passed</span>
            </div>
            <p className="text-[10px] text-[var(--muted)] pt-1">Timed 20-Q interview quizzes</p>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4 space-y-1 shadow-sm">
            <span className="text-[11px] font-medium text-[var(--ink-secondary)]">Revision Vault</span>
            <div className="text-xl font-bold text-[var(--ink)] flex items-baseline gap-1">
              <span>{state?.bookmarks?.length || 0}</span>
              <span className="text-xs font-normal text-[var(--ink-secondary)]">Starred Qs</span>
            </div>
            <Link
              href="/bookmarks"
              className="inline-block text-[10px] font-medium text-[var(--ink-secondary)] hover:text-[var(--ink)] underline pt-1"
            >
              Review saved questions →
            </Link>
          </div>
        </div>

        {/* 3. Daily SDE Workout & Interview Readiness Score */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <DailyQuestCard
            activity={state?.activity}
            nextPath={next.path || "/javascript"}
            nextTitle={next.title || "JavaScript Core"}
          />
          <ReadinessScoreCard state={state} />
        </div>

        {/* 4. Bespoke Activity Velocity Stream & Streak Matrix */}
        <ActivityRadar activity={state?.activity} />

        {/* 5. Core Curated Sheets Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-[var(--ink)] flex items-center gap-2">
                <Layers className="h-4 w-4 text-zinc-400" />
                Curated Interview Sheets
              </h2>
              <p className="text-xs text-[var(--ink-secondary)] mt-0.5">
                Structured day-by-day roadmaps covering core concepts tested in SDE interviews.
              </p>
            </div>
            <Link
              href="/progress"
              className="text-xs font-medium text-[var(--ink-secondary)] hover:text-[var(--ink)] transition flex items-center gap-1"
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
                  className="group flex flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] group-hover:scale-105 transition-transform">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink-secondary)]">
                        {sheet.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[var(--ink)] transition-colors">
                        {sheet.title}
                      </h3>
                      <p className="text-xs text-[var(--ink-secondary)] mt-1 line-clamp-2 leading-relaxed">
                        {sheet.desc}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[var(--line)] pt-4 mt-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[var(--ink-secondary)] font-medium">
                        {sheet.done} of {sheet.total} solved
                      </span>
                      <span className="font-medium text-[var(--ink)]">{pct}%</span>
                    </div>

                    <div className="h-1.5 w-full rounded-full bg-[var(--line)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-zinc-800 dark:bg-zinc-200 transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => router.push(sheet.path)}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--paper-hover)] py-2 text-xs font-medium text-[var(--ink)] transition"
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

        {/* 6. Gamified Unlockable Achievement Trophy Cabinet */}
        <TrophyCabinet state={state} />

        {/* 7. Split Row: Today's Spotlight & Mock Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Spotlight Question */}
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--ink)] bg-[var(--surface)] border border-[var(--line)] px-2.5 py-0.5 rounded-full">
                Today's Daily Spotlight
              </span>
              <span className="text-xs text-[var(--ink-secondary)] font-medium">Core Concept</span>
            </div>

            <div>
              <h3 className="text-base font-semibold text-[var(--ink)]">
                Implement a Custom Event Emitter with Once & Unsubscribe
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] mt-1.5 leading-relaxed">
                Frequently asked at Uber, Atlassian, and Stripe. Tests closure encapsulation, memory leak prevention, and callback cleanup.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[var(--line)]">
              <span className="text-xs text-[var(--ink-secondary)] font-medium">Medium • JavaScript Sheet</span>
              <button
                type="button"
                onClick={() => router.push("/javascript")}
                className="flex items-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--paper-hover)] px-3.5 py-1.5 text-xs font-medium text-[var(--ink)] transition"
              >
                <span>Solve Question</span>
                <ArrowRight className="h-3 w-3 text-zinc-400" />
              </button>
            </div>
          </div>

          {/* Timed Mock Interview Simulator */}
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 flex flex-col justify-between space-y-4 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Swords className="h-5 w-5 text-zinc-400" />
                <h3 className="text-base font-bold text-[var(--ink)]">Timed Mock Arena</h3>
              </div>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Test your interview reflexes with a randomized 20-question timed challenge replicating real frontend coding screening rounds.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[var(--line)]">
              <span className="text-xs text-[var(--ink-secondary)] font-medium">20 Questions • 30 Mins</span>
              <button
                type="button"
                onClick={() => router.push("/mock")}
                className="flex items-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--paper-hover)] text-[var(--ink)] font-medium px-4 py-2 text-xs transition active:scale-95"
              >
                <span>Launch Mock Arena</span>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
