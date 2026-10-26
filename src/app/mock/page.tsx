"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext.jsx";
import { useStudy } from "@/context/StudyContext.jsx";
import { HomeLayout } from "@/components/HomeLayout";
import {
  ArenaExam,
  ArenaResult,
  generateArenaExam,
  loadArenaHistory,
} from "@/lib/arena";
import { ProctoredExamCockpit } from "@/components/ProctoredExamCockpit";
import {
  PASS_SCORE,
  PLAN_DAYS,
  QUIZ_SIZE,
  dayQuestions,
  planQuestionList,
  selectedJsDay,
  timeAgo,
} from "@/lib/catalog.js";
import {
  Swords,
  Timer,
  Zap,
  Target,
  Trophy,
  CheckCircle2,
  Lock,
  ArrowRight,
  Flame,
  Code2,
  Atom,
  BrainCircuit,
  Sparkles,
  RotateCcw,
  BookOpen,
  ShieldCheck,
  ShieldAlert,
  Binary,
  Layers,
  Smartphone,
  MonitorOff,
} from "lucide-react";

export default function MockPage() {
  const { account } = useAuth();
  const { state } = useStudy();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [selectedMode, setSelectedMode] = useState<"sprint" | "standard" | "deep">("standard");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [activeDay, setActiveDay] = useState(1);

  // Proctored Exam Cockpit State
  const [activeExam, setActiveExam] = useState<ArenaExam | null>(null);
  const [arenaHistory, setArenaHistory] = useState<ArenaResult[]>([]);

  useEffect(() => {
    setMounted(true);
    setArenaHistory(loadArenaHistory());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!account) {
      router.replace("/login");
    }
  }, [mounted, account, router]);

  const defaultDay = selectedJsDay(state?.plan) || 1;
  useEffect(() => {
    if (defaultDay) setActiveDay(defaultDay);
  }, [defaultDay]);

  const today = useMemo(() => dayQuestions(planQuestionList(), activeDay), [activeDay]);
  const read = useMemo(() => new Set(state?.plan?.read?.[activeDay] || []), [state?.plan?.read, activeDay]);
  const done = today.filter((item: any) => read.has(item.id)).length;
  const dayResult = state?.plan?.results?.[activeDay];

  // Start proctored exam
  const handleStartExam = (topic = selectedTopic, mode = selectedMode) => {
    const count = mode === "sprint" ? 10 : mode === "deep" ? 30 : 20;
    const exam = generateArenaExam({ topicId: topic, mode, count });
    setActiveExam(exam);
  };

  if (!mounted || !account) {
    return (
      <HomeLayout>
        <div className="space-y-8 max-w-5xl mx-auto pb-20 animate-pulse">
          <div className="h-44 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-36 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
            <div className="h-36 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
            <div className="h-36 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
          </div>
          <div className="h-64 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
        </div>
      </HomeLayout>
    );
  }

  // Active Proctored Technical Screening Overlay
  if (activeExam) {
    return (
      <ProctoredExamCockpit
        exam={activeExam}
        onClose={() => {
          setActiveExam(null);
          setArenaHistory(loadArenaHistory());
        }}
        onFinish={() => {
          setArenaHistory(loadArenaHistory());
        }}
      />
    );
  }

  const assessmentModes = [
    {
      id: "sprint",
      title: "Sprint Recall Drill",
      time: "15 Mins",
      questions: "10 Questions",
      badge: "Fast Pace",
      desc: "Rapid-fire core syntax, variable hoisting, microtask queuing, and quick output puzzles.",
    },
    {
      id: "standard",
      title: "Standard Technical Screen",
      time: "30 Mins",
      questions: "20 Questions",
      badge: "Recommended",
      desc: "Full comprehensive screening round mirroring Tier-1 tech interviews with deep conceptual probing.",
    },
    {
      id: "deep",
      title: "SDE-II Architecture Round",
      time: "45 Mins",
      questions: "30 Questions",
      badge: "Deep Dive",
      desc: "Advanced async patterns, event loop starvation, prototype inheritance, and framework mechanics.",
    },
  ];

  const topicsList = [
    { id: "all", label: "Full-Stack SDE Screening (Mixed)", icon: Zap },
    { id: "javascript", label: "JavaScript Core Engine", icon: Code2 },
    { id: "react", label: "React 19 & Next.js", icon: Atom },
    { id: "react-native", label: "React Native Mobile SDE", icon: Smartphone },
    { id: "output", label: "Tricky JS Output & Traps", icon: BrainCircuit },
    { id: "strings", label: "DSA & LeetCode Patterns", icon: Binary },
  ];

  return (
    <HomeLayout>
      <div className="space-y-8 max-w-5xl mx-auto pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/dashboard" className="hover:text-zinc-200 transition">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-[var(--ink)] font-medium">Mock Arena</span>
        </div>

        {/* 1. Arena Header Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200">
                  <Swords className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-zinc-700/60 bg-zinc-800/40 px-3 py-1 text-[11px] font-semibold tracking-wider text-zinc-300 uppercase">
                  Proctored Technical Arena
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
                  Timed Mock Technical Arena
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
                  Put your interview preparation to the test under strict proctored conditions. Fullscreen lock, tab-switch detection, and timed rounds replicate real technical coding assessments.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Anti-Cheat Proctoring Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Timer className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Timed Simulation (15–45m)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Trophy className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{arenaHistory.filter((r) => r.passed).length} Assessments Cleared</span>
                </div>
              </div>
            </div>

            {/* Quick Readiness Card */}
            <div className="w-full md:w-72 rounded-xl border border-zinc-800 bg-[#0d0d10] p-4 space-y-3 shrink-0">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">Arena Quick Status</span>
                <span className="font-mono font-semibold text-zinc-200">
                  {arenaHistory.length > 0 ? `${arenaHistory.length} Exams Taken` : "Ready to Start"}
                </span>
              </div>

              <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-zinc-200 transition-all duration-500 rounded-full"
                  style={{
                    width: `${Math.min(100, arenaHistory.length * 20)}%`,
                  }}
                />
              </div>

              <p className="text-[11px] text-zinc-500 leading-snug">
                Select your target interview track below to launch a proctored technical screening session.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Topic Domain Selector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-[var(--ink)] flex items-center gap-2">
              <Target className="h-4 w-4 text-zinc-400" />
              1. Choose Interview Domain
            </h2>
            <span className="text-xs text-zinc-500">{topicsList.length} Curated Tracks Available</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {topicsList.map((top) => {
              const isSelected = selectedTopic === top.id;
              const Icon = top.icon;

              return (
                <button
                  key={top.id}
                  type="button"
                  onClick={() => setSelectedTopic(top.id)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition active:scale-95 ${
                    isSelected
                      ? "border-zinc-400 bg-zinc-800 text-white ring-1 ring-zinc-500 font-semibold"
                      : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink-secondary)] hover:border-zinc-700 hover:text-[var(--ink)]"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0 text-zinc-400" />
                  <span className="text-xs truncate">{top.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Assessment Mode Selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[var(--ink)] flex items-center gap-2">
                <Timer className="h-4 w-4 text-zinc-400" />
                2. Select Simulation Intensity
              </h2>
              <p className="text-xs text-[var(--ink-secondary)] mt-0.5">
                Choose the round duration and question density matching your target screen.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {assessmentModes.map((mode) => {
              const isSelected = selectedMode === mode.id;

              return (
                <div
                  key={mode.id}
                  onClick={() => {
                    setSelectedMode(mode.id as any);
                    handleStartExam(selectedTopic, mode.id as any);
                  }}
                  className={`group relative flex flex-col justify-between rounded-2xl border p-5 cursor-pointer transition-all active:scale-[0.99] ${
                    isSelected
                      ? "border-zinc-400 bg-[var(--surface)] shadow-lg ring-1 ring-zinc-500"
                      : "border-[var(--line)] bg-[var(--surface)] hover:border-zinc-600"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-zinc-700/80 bg-zinc-800 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-300 uppercase tracking-wider">
                        {mode.badge}
                      </span>
                      <span className="text-xs font-mono font-medium text-zinc-400">
                        {mode.time}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[var(--ink)]">
                        {mode.title}
                      </h3>
                      <p className="text-xs text-[var(--ink-secondary)] mt-1 leading-relaxed">
                        {mode.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-[var(--line)]/60 text-xs mt-3">
                    <span className="font-mono text-zinc-400 text-[11px]">
                      {mode.questions}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMode(mode.id as any);
                        handleStartExam(selectedTopic, mode.id as any);
                      }}
                      className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 text-[11px] font-semibold text-zinc-100 hover:bg-zinc-700 hover:border-zinc-500 transition active:scale-95"
                    >
                      <Sparkles className="h-3 w-3 text-zinc-300" />
                      <span>Start {mode.badge}</span>
                      <ArrowRight className="h-3 w-3 text-zinc-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Primary Proctored Launcher Dock */}
        <div className="rounded-2xl border border-zinc-800 bg-[#0c0c0e] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                Targeted Technical Screen
              </span>
              <h2 className="text-xl font-bold text-zinc-100 mt-1">
                {topicsList.find((t) => t.id === selectedTopic)?.label} · Proctored Round
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                {selectedMode === "sprint" ? "10 Questions · 15 Mins" : selectedMode === "deep" ? "30 Questions · 45 Mins" : "20 Questions · 30 Mins"} · Anti-Cheat Monitoring Enforced
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleStartExam(selectedTopic, selectedMode)}
                className="flex items-center gap-2 rounded-xl border border-zinc-600 bg-zinc-800 px-5 py-2.5 text-xs font-semibold text-zinc-100 hover:bg-zinc-750 hover:border-zinc-400 transition shadow-sm active:scale-95"
              >
                <Sparkles className="h-4 w-4" />
                <span>Launch Proctored Assessment</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Proctored Exam Rules Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div className="rounded-xl border border-zinc-850 bg-[#121215] p-3.5 text-xs space-y-1.5">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-zinc-300" />
                <span className="font-semibold text-zinc-200">Tab-Switch Lockdown</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Leaving the browser tab or minimizing the window registers a violation strike. 3 strikes triggers automated exam termination.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-850 bg-[#121215] p-3.5 text-xs space-y-1.5">
              <div className="flex items-center gap-2">
                <MonitorOff className="h-4 w-4 text-zinc-300" />
                <span className="font-semibold text-zinc-200">Extended Screen Block</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Dual monitors and extended displays are blocked. Cursor boundary departure and external clicks register anti-cheat strikes.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-850 bg-[#121215] p-3.5 text-xs space-y-1.5">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-zinc-300" />
                <span className="font-semibold text-zinc-200">Fullscreen Required</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                The assessment runs exclusively in fullscreen mode to replicate strict enterprise interview environments.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-850 bg-[#121215] p-3.5 text-xs space-y-1.5">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-zinc-300" />
                <span className="font-semibold text-zinc-200">Hard Time Expiration</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Countdown timer runs continuously. When time reaches 00:00, all answered questions are automatically settled.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Past Arena Cleared Rounds History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-[var(--ink)] flex items-center gap-2">
              <Trophy className="h-4 w-4 text-zinc-400" />
              Proctored Performance History
            </h2>
            <span className="text-xs text-zinc-500">
              {arenaHistory.length} Total Assessments Logged
            </span>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] divide-y divide-[var(--line)] overflow-hidden">
            {arenaHistory.length === 0 ? (
              <div className="p-8 text-center text-xs text-zinc-500 space-y-2">
                <p>No proctored arena assessments completed yet.</p>
                <p className="text-[11px]">Select any domain and intensity mode above to begin your first technical mock interview.</p>
              </div>
            ) : (
              arenaHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 text-xs hover:bg-[var(--paper)] transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200">
                      {item.passed ? <CheckCircle2 className="h-4 w-4" /> : <Timer className="h-4 w-4 text-zinc-400" />}
                    </div>
                    <div>
                      <strong className="text-[var(--ink)] font-semibold block">
                        {item.topicTitle} ({item.mode.toUpperCase()})
                      </strong>
                      <span className="text-[11px] text-zinc-500">
                        {timeAgo(item.completedAt)} • {item.violations === 0 ? "Clean Proctoring" : `${item.violations} Warnings`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-mono font-semibold text-zinc-200">
                      {item.score} / {item.total} ({item.percentage}%)
                    </span>
                    <button
                      type="button"
                      onClick={() => handleStartExam(item.topicId, item.mode as any)}
                      className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 text-[11px] font-medium text-zinc-200 hover:bg-zinc-700 transition"
                    >
                      Retake
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
