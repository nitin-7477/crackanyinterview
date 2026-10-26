"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { HomeLayout } from "./HomeLayout";
import { RichAnswer, QuizPrompt, answerHtml } from "./RichAnswer";
import { useAuth } from "../context/AuthContext.jsx";
import { useStudy } from "../context/StudyContext.jsx";
import { quizMatchesBank } from "../lib/plan.js";
import {
  PASS_SCORE,
  PLAN_DAYS,
  PLAN_TOPIC,
  QUIZ_SIZE,
  READ_PER_DAY,
  READ_PLANS,
  dayComplete,
  dayQuestions,
  isDayUnlocked,
  minutes,
  planQuestionList,
  questionsForDay,
  questionsOf,
  readCount,
  readDayUnlocked,
  readPlanDayCount,
  resolvedJsDay,
  resolvedReadDay,
  topicById,
  withNotes,
} from "../lib/catalog.js";
import {
  Code2,
  Atom,
  Smartphone,
  BrainCircuit,
  Binary,
  CheckCircle2,
  Circle,
  Star,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Search,
  Clock,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Lock,
  Check,
  Plus,
  Trash2,
  Edit3,
  X,
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";

const TOPIC_ICONS: Record<string, any> = {
  javascript: Code2,
  react: Atom,
  "react-native": Smartphone,
  output: BrainCircuit,
  strings: Binary,
};

const DIFFICULTY_CONFIG: Record<string, { label: string; badgeClass: string }> = {
  basic: {
    label: "Beginner",
    badgeClass: "border-zinc-700/60 bg-zinc-800/50 text-zinc-300",
  },
  intermediate: {
    label: "Intermediate",
    badgeClass: "border-zinc-600/70 bg-zinc-800/80 text-zinc-200",
  },
  advanced: {
    label: "Advanced",
    badgeClass: "border-zinc-500 bg-zinc-700/70 text-zinc-100 font-medium",
  },
};

export function TopicView({
  topicId,
  dayParam,
}: {
  topicId: string;
  dayParam?: string;
}) {
  const topic = topicById(topicId);
  const router = useRouter();
  const searchParams = useSearchParams();
  const focusParam = searchParams.get("focus") || "";
  const quizParam = searchParams.get("quiz") === "true";

  const { account } = useAuth();
  const { state, dispatch } = useStudy();

  const [activeQuestionId, setActiveQuestionId] = useState<string>(focusParam);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [quizIndex, setQuizIndex] = useState(0);
  const [editor, setEditor] = useState<any>(null);
  const [tipOpen, setTipOpen] = useState(true);
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

  const jsDay = topicId === PLAN_TOPIC ? resolvedJsDay(state?.plan, dayParam) : 1;
  const readDay = READ_PLANS[topicId]
    ? resolvedReadDay(topicId, state?.readPlans?.[topicId], dayParam)
    : 1;

  useEffect(() => {
    if (!topic) return;
    if (topicId === PLAN_TOPIC && String(jsDay) !== String(dayParam || "")) {
      router.replace(`/javascript/day/${jsDay}`);
    }
    if (READ_PLANS[topicId] && String(readDay) !== String(dayParam || "")) {
      router.replace(`/${topicId}/day/${readDay}`);
    }
    if (topicId === PLAN_TOPIC) dispatch({ type: "select-js-day", day: jsDay });
    if (READ_PLANS[topicId]) dispatch({ type: "select-read-day", topicId, day: readDay });
  }, [topic, topicId, dayParam, jsDay, readDay, router, dispatch]);

  const jsQuestions = useMemo(() => planQuestionList(), []);
  const today = useMemo(() => {
    if (topicId === PLAN_TOPIC) {
      return dayQuestions(jsQuestions, jsDay);
    }
    if (READ_PLANS[topicId]) {
      return questionsForDay(questionsOf(topicId), readDay, READ_PLANS[topicId].perDay);
    }
    return withNotes(topicId, state?.notes);
  }, [topicId, jsQuestions, jsDay, readDay, state?.notes]);

  // Set initial focus
  useEffect(() => {
    if (!today.length) return;
    if (focusParam) {
      setActiveQuestionId(focusParam);
      setExpandedIds((prev) => new Set([...prev, focusParam]));
      const node = document.getElementById(`q-${focusParam}`);
      node?.scrollIntoView({ block: "start", behavior: "smooth" });
    } else if (!activeQuestionId && today[0]) {
      setActiveQuestionId(today[0].id);
    }
  }, [today, focusParam, activeQuestionId]);

  // Auto expand when question is focused
  useEffect(() => {
    if (activeQuestionId) {
      setExpandedIds((prev) => new Set([...prev, activeQuestionId]));
    }
  }, [activeQuestionId]);

  // Visit tracking for standalone modules
  useEffect(() => {
    if (topicId !== "strings" && topicId !== "output") return;
    const current = today.find((item: any) => item.id === activeQuestionId);
    if (!current) return;
    dispatch({ type: "visit", topicId, id: current.id, title: current.q, detail: topic?.title });
  }, [topicId, activeQuestionId, today, dispatch, topic]);

  // Auto trigger quiz if requested via URL param
  useEffect(() => {
    if (topicId !== PLAN_TOPIC || !quizParam) return;
    if (today.length === 0) return;
    if (state?.plan?.activeQuiz?.day === jsDay) return;
    dispatch({ type: "start-quiz", day: jsDay });
  }, [topicId, quizParam, today, jsDay, state?.plan, dispatch]);

  const bookmarked = useMemo(() => new Set(state?.bookmarks || []), [state?.bookmarks]);
  const isJs = topicId === PLAN_TOPIC;
  const isReadPlan = Boolean(READ_PLANS[topicId]);
  const hasDays = isJs || isReadPlan;
  const totalDays = isJs ? PLAN_DAYS : isReadPlan ? readPlanDayCount(topicId) : 1;
  const currentDay = isJs ? jsDay : readDay;

  // Determine read/completed set for current view
  const readIds = useMemo(() => {
    return new Set<string>(
      isJs
        ? state?.plan?.read?.[jsDay] || []
        : isReadPlan
        ? state?.readPlans?.[topicId]?.read?.[readDay] || []
        : state?.visits?.[topicId] || []
    );
  }, [isJs, isReadPlan, topicId, jsDay, readDay, state?.plan?.read, state?.readPlans, state?.visits]);

  const completedCount = today.filter((item: any) => readIds.has(item.id)).length;
  const dayFinished = today.length > 0 && completedCount === today.length;
  const activeQuiz =
    isJs &&
    state?.plan?.activeQuiz?.day === jsDay &&
    quizMatchesBank(state?.plan?.activeQuiz)
      ? state?.plan?.activeQuiz
      : null;

  // Filter questions hook must run before any return statements
  const filteredQuestions = useMemo(() => {
    return today.filter((item: any) => {
      const matchQuery =
        !searchQuery.trim() ||
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.section?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchDifficulty =
        difficultyFilter === "all" || item.level === difficultyFilter;

      const isCompleted = readIds.has(item.id);
      const isBookmarked = bookmarked.has(item.id);

      const matchStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "done"
          ? isCompleted
          : statusFilter === "todo"
          ? !isCompleted
          : statusFilter === "starred"
          ? isBookmarked
          : true;

      return matchQuery && matchDifficulty && matchStatus;
    });
  }, [today, searchQuery, difficultyFilter, statusFilter, readIds, bookmarked]);

  // Handlers
  const handleToggleComplete = (id: string, title: string) => {
    if (isJs) {
      dispatch({ type: "toggle-js-read", day: jsDay, id, title });
    } else if (isReadPlan) {
      dispatch({ type: "toggle-read", topicId, day: readDay, id, title, detail: topic?.title });
    } else {
      dispatch({ type: "visit", topicId, id, title, detail: topic?.title });
    }
  };

  const handleToggleBookmark = (id: string) => {
    dispatch({ type: "bookmark", id });
  };

  const handleAccordionToggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setActiveQuestionId(id);
  };

  const handleToggleAll = () => {
    if (expandedIds.size === today.length) {
      setExpandedIds(new Set());
    } else {
      setExpandedIds(new Set(today.map((item: any) => item.id)));
    }
  };

  const handlePickDay = (day: number) => {
    router.push(isJs ? `/javascript/day/${day}` : `/${topicId}/day/${day}`);
  };

  if (!mounted || !account) {
    return (
      <HomeLayout>
        <div className="max-w-6xl mx-auto space-y-6 pb-24 animate-pulse">
          <div className="h-40 rounded-2xl border border-[var(--line)] bg-[var(--surface)]" />
          <div className="h-16 rounded-2xl border border-[var(--line)] bg-[var(--surface)]" />
          <div className="space-y-3">
            <div className="h-20 rounded-2xl border border-[var(--line)] bg-[var(--surface)]" />
            <div className="h-20 rounded-2xl border border-[var(--line)] bg-[var(--surface)]" />
            <div className="h-20 rounded-2xl border border-[var(--line)] bg-[var(--surface)]" />
          </div>
        </div>
      </HomeLayout>
    );
  }

  if (!topic) {
    router.replace("/dashboard");
    return null;
  }

  const TopicIcon = TOPIC_ICONS[topicId] || Code2;
  const totalMins = today.reduce((sum: number, item: any) => sum + minutes(item), 0);

  return (
    <HomeLayout>
      <div className="max-w-6xl mx-auto space-y-6 pb-24">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/dashboard" className="hover:text-zinc-200 transition">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-zinc-400">Curated Sheets</span>
          <span>/</span>
          <span className="text-[var(--ink)] font-medium">{topic.title}</span>
          {hasDays && (
            <>
              <span>/</span>
              <span className="text-zinc-300 font-semibold">Day {currentDay}</span>
            </>
          )}
        </div>

        {/* 1. Track Overview Header Card */}
        <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 transition-colors">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200">
                  <TopicIcon className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-zinc-700/60 bg-zinc-800/40 px-3 py-1 text-[11px] font-semibold tracking-wider text-zinc-300 uppercase">
                  {hasDays ? `${totalDays}-Day Mastery Track` : "Comprehensive Catalog"}
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
                  {topic.title} Interview Questions
                </h1>
                <p className="mt-1.5 text-sm text-[var(--ink-secondary)] leading-relaxed">
                  {topic.lede || topic.heading}
                </p>
              </div>

              {/* Meta metrics strip */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-zinc-400" />
                  <span>
                    {hasDays ? `Day ${currentDay}: ${today.length} Qs` : `${today.length} Total Questions`}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-zinc-400" />
                  <span>~{totalMins} min review time</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Targeted SDE Prep</span>
                </div>
              </div>
            </div>

            {/* Progress Metric Card */}
            <div className="w-full md:w-64 rounded-xl border border-zinc-800 bg-[#0d0d10] p-4 space-y-3 shrink-0">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">
                  {hasDays ? `Day ${currentDay} Progress` : "Sheet Progress"}
                </span>
                <span className="font-mono font-semibold text-zinc-200">
                  {completedCount}/{today.length} ({today.length ? Math.round((completedCount / today.length) * 100) : 0}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-zinc-200 dark:bg-zinc-100 transition-all duration-500 rounded-full"
                  style={{
                    width: `${today.length ? Math.round((completedCount / today.length) * 100) : 0}%`,
                  }}
                />
              </div>

              <p className="text-[11px] text-zinc-500 text-left">
                {dayFinished
                  ? isJs
                    ? "All questions read! Quiz unlocked."
                    : "Module completed. Continue forward."
                  : `${today.length - completedCount} questions remaining.`}
              </p>
            </div>
          </div>
        </div>

        {/* Interviewer Tip Banner */}
        {topic.tip && tipOpen && (
          <aside className="relative flex items-start justify-between gap-4 rounded-xl border border-zinc-800 bg-[#0c0c0e] p-4 text-xs text-zinc-300">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-bold">
                💡
              </span>
              <div>
                <p className="font-semibold text-zinc-100 uppercase tracking-wider text-[10px] mb-0.5">
                  Interviewer Mindset
                </p>
                <p className="leading-relaxed text-zinc-300">{topic.tip}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setTipOpen(false)}
              className="text-zinc-500 hover:text-zinc-300 transition p-1"
              aria-label="Dismiss tip"
            >
              <X className="h-4 w-4" />
            </button>
          </aside>
        )}

        {/* 2. Interactive Day Stepper (Only for Multi-Day Tracks) */}
        {hasDays && (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--ink)]">
              <div className="flex items-center gap-2">
                <span>10-Day Module Roadmap</span>
                <span className="text-[11px] font-normal text-zinc-500">
                  (Day {currentDay} of {totalDays})
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                Score &gt; {PASS_SCORE} to unlock next
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
              {Array.from({ length: totalDays }, (_, index) => {
                const dayNum = index + 1;
                const isCurrent = dayNum === currentDay;
                const isUnlocked = isJs
                  ? isDayUnlocked(dayNum, state?.plan?.results)
                  : readDayUnlocked(
                      dayNum,
                      state?.readPlans?.[topicId]?.read,
                      questionsOf(topicId),
                      READ_PLANS[topicId]?.perDay
                    );
                const isPassed = isJs
                  ? Boolean(state?.plan?.results?.[dayNum]?.passed)
                  : dayComplete(
                      state?.readPlans?.[topicId]?.read?.[dayNum],
                      questionsForDay(questionsOf(topicId), dayNum, READ_PLANS[topicId]?.perDay)
                    );

                return (
                  <button
                    key={dayNum}
                    type="button"
                    disabled={!isUnlocked}
                    onClick={() => handlePickDay(dayNum)}
                    className={`group relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition shrink-0 ${
                      isCurrent
                        ? "bg-zinc-800 border border-zinc-600 text-zinc-100 shadow-sm"
                        : isUnlocked
                        ? "border border-zinc-800 bg-[#111114] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                        : "border border-zinc-850 bg-zinc-950/40 text-zinc-600 cursor-not-allowed opacity-50"
                    }`}
                  >
                    {isPassed ? (
                      <Check className="h-3.5 w-3.5 text-zinc-200" />
                    ) : isUnlocked ? (
                      <Circle className="h-3 w-3 text-zinc-500 group-hover:text-zinc-300" />
                    ) : (
                      <Lock className="h-3 w-3 text-zinc-600" />
                    )}
                    <span>Day {dayNum}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Quiz Mode vs Deep Reading Mode */}
        {activeQuiz ? (
          <QuizSession
            quiz={activeQuiz}
            day={jsDay}
            result={state?.plan?.results?.[jsDay]}
            onChoice={(questionIndex: number, optionIndex: number) =>
              dispatch({ type: "pick-choice", questionIndex, optionIndex })
            }
            onStartQuiz={() => dispatch({ type: "start-quiz", day: jsDay })}
            onNext={() => router.push(`/javascript/day/${jsDay + 1}`)}
          />
        ) : (
          <>
            {/* 4. Filter & Practice Control Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 sm:p-4">
              {/* Left Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder={`Search ${today.length} questions in this view...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] py-1.5 pl-8 pr-8 text-xs text-[var(--ink)] placeholder-[var(--muted)] focus:border-zinc-500 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Right Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Difficulty selector */}
                <div className="flex items-center rounded-xl border border-[var(--line)] bg-[var(--paper)] p-1 text-[11px]">
                  {["all", "basic", "intermediate", "advanced"].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setDifficultyFilter(lvl)}
                      className={`px-2.5 py-1 rounded-lg capitalize transition ${
                        difficultyFilter === lvl
                          ? "bg-zinc-800 text-zinc-100 font-medium border border-zinc-700"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {lvl === "all" ? "All Levels" : lvl}
                    </button>
                  ))}
                </div>

                {/* Status selector */}
                <div className="flex items-center rounded-xl border border-[var(--line)] bg-[var(--paper)] p-1 text-[11px]">
                  {[
                    { key: "all", label: "All" },
                    { key: "todo", label: "To Do" },
                    { key: "done", label: "Done" },
                    { key: "starred", label: "★" },
                  ].map((st) => (
                    <button
                      key={st.key}
                      type="button"
                      onClick={() => setStatusFilter(st.key)}
                      className={`px-2.5 py-1 rounded-lg transition ${
                        statusFilter === st.key
                          ? "bg-zinc-800 text-zinc-100 font-medium border border-zinc-700"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>

                {/* Expand / Collapse All */}
                <button
                  type="button"
                  onClick={handleToggleAll}
                  className="flex items-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-[11px] font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition"
                  title="Toggle all question answers"
                >
                  <ChevronsUpDown className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">
                    {expandedIds.size === today.length ? "Collapse All" : "Expand All"}
                  </span>
                </button>

                {/* Add Custom Note */}
                <button
                  type="button"
                  onClick={() =>
                    setEditor({
                      id: crypto.randomUUID(),
                      q: "",
                      a: "",
                      level: "basic",
                    })
                  }
                  className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-[11px] font-medium text-zinc-100 hover:bg-zinc-700 transition"
                  title="Add custom question or personal note"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Add Note</span>
                </button>
              </div>
            </div>

            {/* Questions List Count */}
            <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
              <span>
                Showing {filteredQuestions.length} of {today.length} questions
              </span>
              {filteredQuestions.length < today.length && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setDifficultyFilter("all");
                    setStatusFilter("all");
                  }}
                  className="text-zinc-300 hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>

            {/* 5. Modern Question Accordions */}
            <div className="space-y-3">
              {filteredQuestions.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface)] p-12 text-center space-y-3">
                  <p className="text-sm font-medium text-[var(--ink)]">
                    No questions found matching your filter criteria.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setDifficultyFilter("all");
                      setStatusFilter("all");
                    }}
                    className="inline-flex rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-100 hover:bg-zinc-700 transition"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                filteredQuestions.map((item: any, index: number) => {
                  const isExpanded = expandedIds.has(item.id);
                  const isCompleted = readIds.has(item.id);
                  const isBookmarked = bookmarked.has(item.id);
                  const diffConfig =
                    DIFFICULTY_CONFIG[item.level] || DIFFICULTY_CONFIG.basic;

                  return (
                    <article
                      key={item.id}
                      id={`q-${item.id}`}
                      className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                        isCompleted
                          ? "border-zinc-800/80 bg-[var(--surface)]"
                          : "border-[var(--line)] bg-[var(--surface)] hover:border-zinc-700"
                      }`}
                    >
                      {/* Accordion Header Row */}
                      <div
                        className="flex items-start sm:items-center justify-between gap-3 p-4 sm:p-5 cursor-pointer select-none"
                        onClick={() => handleAccordionToggle(item.id)}
                      >
                        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                          {/* Completion Toggle Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleComplete(item.id, item.q);
                            }}
                            className={`mt-0.5 sm:mt-0 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition ${
                              isCompleted
                                ? "border-zinc-600 bg-zinc-800 text-zinc-100"
                                : "border-zinc-700/80 bg-[#121214] text-transparent hover:border-zinc-500"
                            }`}
                            title={isCompleted ? "Mark incomplete" : "Mark completed"}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>

                          {/* Index Pill */}
                          <span className="font-mono text-xs text-zinc-500 shrink-0 mt-0.5 sm:mt-0">
                            #{String(index + 1).padStart(2, "0")}
                          </span>

                          {/* Title & Metadata */}
                          <div className="min-w-0">
                            <h2
                              className={`text-sm sm:text-base font-semibold leading-snug transition-colors ${
                                isCompleted
                                  ? "text-zinc-400 line-through decoration-zinc-600"
                                  : "text-[var(--ink)]"
                              }`}
                            >
                              {item.q}
                            </h2>

                            <div className="flex flex-wrap items-center gap-2 mt-1.5">
                              {/* Level Badge */}
                              <span
                                className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${diffConfig.badgeClass}`}
                              >
                                {diffConfig.label}
                              </span>

                              {/* Section Badge */}
                              {item.section && (
                                <span className="text-[11px] text-zinc-500">
                                  {item.section}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right Tools: Bookmark & Chevron */}
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleBookmark(item.id);
                            }}
                            className={`p-1.5 rounded-lg border border-transparent hover:border-zinc-800 hover:bg-zinc-850 transition ${
                              isBookmarked
                                ? "text-zinc-100 fill-zinc-100"
                                : "text-zinc-500 hover:text-zinc-300"
                            }`}
                            title={isBookmarked ? "Remove bookmark" : "Bookmark question"}
                          >
                            <Star
                              className={`h-4 w-4 ${isBookmarked ? "fill-zinc-100 text-zinc-100" : ""}`}
                            />
                          </button>

                          <button
                            type="button"
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 transition"
                            aria-label={isExpanded ? "Collapse" : "Expand"}
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Accordion Body: Explanation, Code, & Controls */}
                      {isExpanded && (
                        <div className="border-t border-[var(--line)] bg-[var(--paper)]/40 p-5 sm:p-6 space-y-4">
                          {/* Pure React Answer Render */}
                          <div className="answer">
                            <RichAnswer content={answerHtml(item)} />
                          </div>

                          {/* Action Footer for this Question */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--line)]/60 text-xs">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleToggleComplete(item.id, item.q)}
                                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition border ${
                                  isCompleted
                                    ? "bg-zinc-800 border-zinc-600 text-zinc-100"
                                    : "bg-zinc-900 dark:bg-zinc-800 border-zinc-700 text-zinc-200 hover:border-zinc-500"
                                }`}
                              >
                                <Check className="h-3.5 w-3.5" />
                                <span>{isCompleted ? "Completed" : "Mark as Complete"}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleToggleBookmark(item.id)}
                                className="flex items-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition"
                              >
                                <Star
                                  className={`h-3.5 w-3.5 ${
                                    isBookmarked ? "fill-zinc-100 text-zinc-100" : ""
                                  }`}
                                />
                                <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
                              </button>
                            </div>

                            {/* User custom note actions */}
                            {item.source === "you" && (
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setEditor(item)}
                                  className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 transition"
                                >
                                  <Edit3 className="h-3.5 w-3.5" /> Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    dispatch({ type: "delete-note", id: item.id })
                                  }
                                  className="flex items-center gap-1 text-rose-500 hover:text-rose-400 transition ml-2"
                                >
                                  <Trash2 className="h-3.5 w-3.5" /> Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })
              )}
            </div>

            {/* 6. Day Completion / Progression Action Footer */}
            {hasDays && (
              <div className="sticky bottom-4 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-[#0a0a0c]/95 backdrop-blur-md p-4 sm:p-5 shadow-2xl">
                <div>
                  <div className="text-xs font-semibold text-zinc-200">
                    Day {currentDay} Checklist: {completedCount} / {today.length} Read
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    {dayFinished
                      ? isJs
                        ? "Every question marked as read! Practice quiz is ready."
                        : `All ${today.length} questions completed for Day ${currentDay}.`
                      : `Mark all ${today.length} questions complete to open the next milestone.`}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {currentDay > 1 && (
                    <button
                      type="button"
                      onClick={() => handlePickDay(currentDay - 1)}
                      className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-700 transition"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Day {currentDay - 1}</span>
                    </button>
                  )}

                  {isJs ? (
                    <button
                      type="button"
                      disabled={!dayFinished}
                      onClick={() => dispatch({ type: "start-quiz", day: jsDay })}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition border ${
                        dayFinished
                          ? "bg-zinc-800 border-zinc-600 text-zinc-100 hover:bg-zinc-700 shadow-sm"
                          : "bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed"
                      }`}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Start Day {currentDay} Quiz</span>
                    </button>
                  ) : currentDay < totalDays ? (
                    <button
                      type="button"
                      disabled={!dayFinished}
                      onClick={() => handlePickDay(currentDay + 1)}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition border ${
                        dayFinished
                          ? "bg-zinc-800 border-zinc-600 text-zinc-100 hover:bg-zinc-700 shadow-sm"
                          : "bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed"
                      }`}
                    >
                      <span>Proceed to Day {currentDay + 1}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  ) : null}
                </div>
              </div>
            )}
          </>
        )}

        {/* 7. Key Takeaways Section */}
        {topic.takeaways?.length ? (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-4">
            <h3 className="text-base font-bold text-[var(--ink)] flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-zinc-400" /> Key Architectural Takeaways
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
              {topic.takeaways.map((takeaway: string) => (
                <li key={takeaway} className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 mt-2 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {/* Note Editor Modal */}
      {editor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#0d0d10] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-zinc-100">
                {editor.q ? "Edit Note / Question" : "Add Custom Question"}
              </h3>
              <button
                type="button"
                onClick={() => setEditor(null)}
                className="text-zinc-500 hover:text-zinc-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                dispatch({
                  type: "save-note",
                  note: {
                    id: editor.id,
                    topicId,
                    level: data.get("level"),
                    q: String(data.get("q") || "").trim(),
                    a: String(data.get("a") || "").trim(),
                  },
                });
                setEditor(null);
              }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Question / Prompt</label>
                <textarea
                  name="q"
                  defaultValue={editor.q}
                  required
                  rows={2}
                  className="w-full rounded-xl border border-zinc-800 bg-[#141418] p-3 text-xs text-zinc-200 placeholder-zinc-600 focus:border-zinc-500 focus:outline-none"
                  placeholder="Enter the interview question..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Answer / Explanation & Code</label>
                <textarea
                  name="a"
                  defaultValue={editor.a}
                  required
                  rows={6}
                  className="w-full rounded-xl border border-zinc-800 bg-[#141418] p-3 text-xs text-zinc-200 placeholder-zinc-600 focus:border-zinc-500 focus:outline-none font-mono"
                  placeholder="Enter explanation, key points, or code snippets..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Difficulty Level</label>
                <select
                  name="level"
                  defaultValue={editor.level || "basic"}
                  className="w-full rounded-xl border border-zinc-800 bg-[#141418] p-2.5 text-xs text-zinc-200 focus:border-zinc-500 focus:outline-none"
                >
                  <option value="basic">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditor(null)}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-100 hover:bg-zinc-700 transition"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </HomeLayout>
  );
}

// ---------------------------------------------------------------------------
// Practice Quiz Mode Component (Pure Stealth Dark Layout)
// ---------------------------------------------------------------------------
function QuizSession({
  quiz,
  day,
  result,
  onChoice,
  onStartQuiz,
  onNext,
}: {
  quiz: any;
  day: number;
  result: any;
  onChoice: (qIdx: number, optIdx: number) => void;
  onStartQuiz: () => void;
  onNext: () => void;
}) {
  const answered = (quiz.picks || []).filter((pick: any) =>
    Number.isInteger(pick)
  ).length;
  const correct = (quiz.marks || []).filter(Boolean).length;
  const isAllAnswered = answered === quiz.items.length;
  const isPassed = Boolean(result?.passed) || correct > PASS_SCORE;

  return (
    <div className="space-y-6">
      {/* Quiz Header Banner */}
      <div className="rounded-2xl border border-zinc-800 bg-[#0d0d10] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-0.5 text-[10px] font-semibold tracking-wider text-zinc-300 uppercase">
                Active Assessment
              </span>
              <span className="text-xs text-zinc-400">
                Pass mark: &gt; {PASS_SCORE} / {quiz.items.length}
              </span>
            </div>
            <h2 className="text-xl font-bold text-zinc-100 mt-2">
              Day {day} Practice Quiz
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Select the best answer for each question. Answers lock immediately upon selection.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-[#121215] p-3 text-center min-w-[120px]">
            <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
              Score
            </span>
            <div className="text-xl font-bold font-mono text-zinc-100">
              {correct} / {quiz.items.length}
            </div>
            <span className="text-[10px] text-zinc-400">
              {answered}/{quiz.items.length} Answered
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
          <div
            className="h-full bg-zinc-200 transition-all duration-300"
            style={{
              width: `${Math.round((answered / quiz.items.length) * 100)}%`,
            }}
          />
        </div>

        {/* Settle Message if finished */}
        {isAllAnswered && (
          <div
            className={`rounded-xl border p-4 text-xs space-y-2 ${
              isPassed
                ? "border-zinc-700 bg-zinc-900/80 text-zinc-200"
                : "border-zinc-800 bg-zinc-950 text-zinc-400"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-zinc-100">
                {isPassed
                  ? `🎉 Passed! You scored ${correct}/${quiz.items.length}.`
                  : `Score: ${correct}/${quiz.items.length}. Pass mark is > ${PASS_SCORE}.`}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onStartQuiz}
                  className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700 transition"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Retake
                </button>

                {isPassed && day < PLAN_DAYS && (
                  <button
                    type="button"
                    onClick={onNext}
                    className="flex items-center gap-1.5 rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-1.5 text-xs font-semibold text-zinc-100 hover:bg-zinc-700 transition"
                  >
                    <span>Open Day {day + 1}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quiz Questions List */}
      <div className="space-y-4">
        {quiz.items.map((prompt: any, qIdx: number) => {
          const picked = quiz.picks?.[qIdx];
          const isAnswered = Number.isInteger(picked);
          const isCorrect = isAnswered && picked === prompt.correct;

          return (
            <article
              key={`${prompt.id}-${qIdx}`}
              id={`quiz-q-${qIdx}`}
              className="rounded-2xl border border-zinc-800 bg-[#0d0d10] p-5 sm:p-6 space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-zinc-500">
                      Q{qIdx + 1} of {quiz.items.length}
                    </span>
                    {isAnswered && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          isCorrect
                            ? "border-zinc-600 bg-zinc-800 text-zinc-200"
                            : "border-zinc-800 bg-zinc-900 text-zinc-400"
                        }`}
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-zinc-200">
                    <QuizPrompt question={prompt.q || "Practice Question"} />
                  </div>
                </div>
              </div>

              {/* Multiple Choice Options */}
              <div className="grid grid-cols-1 gap-2 pt-2">
                {prompt.options.map((option: string, optIdx: number) => {
                  const letter = ["A", "B", "C", "D"][optIdx];
                  const isThisPicked = picked === optIdx;
                  const isThisCorrect = prompt.correct === optIdx;

                  let optionClass =
                    "border-zinc-800 bg-[#121215] text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/60";

                  if (isAnswered) {
                    if (isThisCorrect) {
                      optionClass =
                        "border-zinc-500 bg-zinc-800 text-zinc-100 font-semibold shadow-sm";
                    } else if (isThisPicked && !isThisCorrect) {
                      optionClass =
                        "border-zinc-800 bg-zinc-950 text-zinc-500 line-through opacity-70";
                    } else {
                      optionClass =
                        "border-zinc-850 bg-zinc-950/40 text-zinc-600 cursor-not-allowed";
                    }
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => onChoice(qIdx, optIdx)}
                      className={`flex items-start gap-3 rounded-xl border p-3 text-left text-xs transition select-none ${optionClass}`}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-[10px] font-bold text-zinc-300">
                        {letter}
                      </span>
                      <span className="leading-relaxed mt-0.5">{option}</span>
                    </button>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
