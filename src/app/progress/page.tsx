"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext.jsx";
import { useStudy } from "@/context/StudyContext.jsx";
import { HomeLayout } from "@/components/HomeLayout";
import {
  PLAN_DAYS,
  PLAN_TOPIC,
  READ_PLANS,
  activityLabel,
  catalogStats,
  dayQuestions,
  difficultyStats,
  isDayUnlocked,
  planQuestionList,
  questionsForDay,
  questionsOf,
  readDayUnlocked,
  timeAgo,
} from "@/lib/catalog.js";
import { ActivityRadar } from "@/components/ActivityRadar";
import { ReadinessScoreCard } from "@/components/ReadinessScoreCard";
import { TrophyCabinet } from "@/components/TrophyCabinet";
import { calculateStreakStats, loadDailyHistory } from "@/lib/streak";
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Target,
  ArrowRight,
  Code2,
  Atom,
  Smartphone,
  BrainCircuit,
  Binary,
  Layers,
  Lock,
  Circle,
  Activity,
  Flame,
} from "lucide-react";

const TOPIC_ICONS: Record<string, any> = {
  javascript: Code2,
  react: Atom,
  "react-native": Smartphone,
  output: BrainCircuit,
  strings: Binary,
};

export default function ProgressPage() {
  const { account } = useAuth();
  const { state } = useStudy();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!account) {
      router.replace("/login");
    }
  }, [mounted, account, router]);

  const stats = useMemo(() => catalogStats(state), [state]);
  const diff = useMemo(() => difficultyStats(state), [state]);
  const passedQuizzes = useMemo(
    () => Object.values(state?.plan?.results || {}).filter((r: any) => r?.passed).length,
    [state?.plan?.results]
  );
  const streakStats = useMemo(() => {
    const history = loadDailyHistory(state?.activity);
    return calculateStreakStats(history);
  }, [state?.activity]);

  if (!mounted || !account) {
    return (
      <HomeLayout>
        <div className="space-y-8 max-w-5xl mx-auto pb-20 animate-pulse">
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

  return (
    <HomeLayout>
      <div className="space-y-8 max-w-5xl mx-auto pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/dashboard" className="hover:text-zinc-200 transition">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-[var(--ink)] font-medium">Progress & Mastery</span>
        </div>

        {/* 1. Overall Progress Header Card */}
        <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-zinc-700/60 bg-zinc-800/40 px-3 py-1 text-[11px] font-semibold tracking-wider text-zinc-300 uppercase">
                  Interview Readiness Engine
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
                  Progress & Mastery Analytics
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
                  Track your mastery across core language sheets, frameworks, and tricky interview rounds. Maintain daily momentum to clear upcoming technical screens.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Goal: <strong className="text-zinc-200 font-semibold">{state?.goal || "Frontend SDE"}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{streakStats.currentStreak}-Day Active Streak</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{passedQuizzes}/10 Quizzes Cleared</span>
                </div>
              </div>
            </div>

            {/* Read / Solved Big Donut / Stat Card */}
            <div className="w-full md:w-64 rounded-xl border border-zinc-800 bg-[#0d0d10] p-5 space-y-3 shrink-0">
              <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                Overall Completion
              </span>
              <div className="text-2xl font-bold font-mono text-zinc-100">
                {stats.done} / {stats.total} Qs
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-zinc-200 transition-all duration-500 rounded-full"
                  style={{ width: `${stats.pct}%` }}
                />
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">
                {stats.pct}% of full curriculum mastered
              </p>
            </div>
          </div>
        </div>

        {/* 2. Difficulty Distribution Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-300">Beginner / Easy</span>
              <span className="font-mono text-zinc-400">{diff.easy.done} / {diff.easy.total}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[var(--line)] overflow-hidden">
              <div
                className="h-full bg-zinc-400 rounded-full transition-all duration-500"
                style={{ width: `${diff.easy.total ? Math.round((diff.easy.done / diff.easy.total) * 100) : 0}%` }}
              />
            </div>
            <p className="text-[10px] text-zinc-500">Core fundamental syntax & basics</p>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-200">Intermediate / Medium</span>
              <span className="font-mono text-zinc-400">{diff.medium.done} / {diff.medium.total}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[var(--line)] overflow-hidden">
              <div
                className="h-full bg-zinc-300 rounded-full transition-all duration-500"
                style={{ width: `${diff.medium.total ? Math.round((diff.medium.done / diff.medium.total) * 100) : 0}%` }}
              />
            </div>
            <p className="text-[10px] text-zinc-500">Closures, React reconciler & hooks</p>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-100">Advanced / Hard</span>
              <span className="font-mono text-zinc-400">{diff.hard.done} / {diff.hard.total}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[var(--line)] overflow-hidden">
              <div
                className="h-full bg-zinc-100 rounded-full transition-all duration-500"
                style={{ width: `${diff.hard.total ? Math.round((diff.hard.done / diff.hard.total) * 100) : 0}%` }}
              />
            </div>
            <p className="text-[10px] text-zinc-500">Event loop traps, memory leaks & DSA</p>
          </div>
        </div>

        {/* 3. SDE Readiness Benchmark & Bespoke Velocity Stream Matrix */}
        <ReadinessScoreCard state={state} />
        <ActivityRadar activity={state?.activity} />

        {/* 4. Detailed Sheet Breakdown Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[var(--ink)] flex items-center gap-2">
                <Layers className="h-4 w-4 text-zinc-400" />
                Sheet-by-Sheet Breakdown
              </h2>
              <p className="text-xs text-[var(--ink-secondary)] mt-0.5">
                Track Day-by-Day progress and practice status for each curated study sheet.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {stats.rows.map((row: any) => {
              const pct = row.total ? Math.round((row.done / row.total) * 100) : 0;
              const TopicIcon = TOPIC_ICONS[row.topic.id] || Layers;

              return (
                <div
                  key={row.topic.id}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-4 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200">
                        <TopicIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[var(--ink)]">
                          {row.topic.title}
                        </h3>
                        <p className="text-xs text-[var(--ink-secondary)]">
                          {row.done} of {row.total} questions completed ({pct}%)
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/${row.topic.id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-1.5 text-xs font-semibold text-zinc-100 hover:bg-zinc-700 transition"
                    >
                      <span>Continue Sheet</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-[var(--line)] overflow-hidden">
                    <div
                      className="h-full bg-zinc-200 transition-all duration-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  {/* Day Pills Grid if multi-day track */}
                  {row.topic.id === PLAN_TOPIC && (
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                      {Array.from({ length: PLAN_DAYS }, (_, index) => {
                        const day = index + 1;
                        const todayQuestions = dayQuestions(planQuestionList(), day);
                        const readSet = new Set(state?.plan?.read?.[day] || []);
                        const dayDone = todayQuestions.filter((item: any) => readSet.has(item.id)).length;
                        const isPassed = Boolean(state?.plan?.results?.[day]?.passed);
                        const isUnlocked = isDayUnlocked(day, state?.plan?.results);

                        return (
                          <button
                            key={day}
                            type="button"
                            disabled={!isUnlocked}
                            onClick={() => router.push(`/javascript/day/${day}`)}
                            className={`flex items-center justify-between rounded-xl border p-2.5 text-xs transition ${
                              isPassed
                                ? "border-zinc-700 bg-zinc-900 text-zinc-200"
                                : isUnlocked
                                ? "border-zinc-800 bg-[#121215] text-zinc-400 hover:border-zinc-700 hover:text-zinc-100"
                                : "border-zinc-850 bg-zinc-950/40 text-zinc-600 opacity-60 cursor-not-allowed"
                            }`}
                          >
                            <span className="font-medium">Day {day}</span>
                            {isPassed ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-zinc-200" />
                            ) : isUnlocked ? (
                              <span className="text-[10px] font-mono text-zinc-400">{dayDone}/{todayQuestions.length}</span>
                            ) : (
                              <Lock className="h-3 w-3 text-zinc-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {READ_PLANS[row.topic.id] && (
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                      {Array.from({ length: row.days }, (_, index) => {
                        const day = index + 1;
                        const questions = questionsOf(row.topic.id);
                        const todayQuestions = questionsForDay(questions, day, READ_PLANS[row.topic.id].perDay);
                        const plan = state?.readPlans?.[row.topic.id];
                        const readSet = new Set(plan?.read?.[day] || []);
                        const dayDone = todayQuestions.filter((item: any) => readSet.has(item.id)).length;
                        const isUnlocked = readDayUnlocked(day, plan?.read, questions, READ_PLANS[row.topic.id].perDay);
                        const isComplete = dayDone === todayQuestions.length && todayQuestions.length > 0;

                        return (
                          <button
                            key={day}
                            type="button"
                            disabled={!isUnlocked}
                            onClick={() => router.push(`/${row.topic.id}/day/${day}`)}
                            className={`flex items-center justify-between rounded-xl border p-2.5 text-xs transition ${
                              isComplete
                                ? "border-zinc-700 bg-zinc-900 text-zinc-200"
                                : isUnlocked
                                ? "border-zinc-800 bg-[#121215] text-zinc-400 hover:border-zinc-700 hover:text-zinc-100"
                                : "border-zinc-850 bg-zinc-950/40 text-zinc-600 opacity-60 cursor-not-allowed"
                            }`}
                          >
                            <span className="font-medium">Day {day}</span>
                            {isComplete ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-zinc-200" />
                            ) : isUnlocked ? (
                              <span className="text-[10px] font-mono text-zinc-400">{dayDone}/{todayQuestions.length}</span>
                            ) : (
                              <Lock className="h-3 w-3 text-zinc-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Achievement Trophy Cabinet */}
        <TrophyCabinet state={state} />

        {/* 6. Chronological Activity Log */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-[var(--ink)] flex items-center gap-2">
              <Activity className="h-4 w-4 text-zinc-400" />
              Recent Activity Feed
            </h2>
            <span className="text-xs text-zinc-500">
              Last {Math.min(state?.activity?.length || 0, 15)} Actions
            </span>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] divide-y divide-[var(--line)] overflow-hidden">
            {!state?.activity || state.activity.length === 0 ? (
              <div className="p-8 text-center text-xs text-zinc-500">
                No activity recorded yet. Start reading questions or running arena quizzes to track your momentum.
              </div>
            ) : (
              state.activity.slice(0, 15).map((item: any) => (
                <div
                  key={item.id || item.at}
                  className="flex items-center justify-between p-4 text-xs hover:bg-[var(--paper)] transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-[10px] font-bold text-zinc-300">
                      ✓
                    </span>
                    <div>
                      <strong className="text-[var(--ink)] font-medium block">
                        {activityLabel(item.kind)}: {item.title}
                      </strong>
                      {item.detail && (
                        <span className="text-[11px] text-zinc-500">{item.detail}</span>
                      )}
                    </div>
                  </div>
                  <span className="text-[11px] text-zinc-500 shrink-0 font-mono">
                    {timeAgo(item.at)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
