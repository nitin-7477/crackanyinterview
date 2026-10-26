"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext.jsx";
import { useStudy } from "@/context/StudyContext.jsx";
import { HomeLayout } from "@/components/HomeLayout";
import { RichAnswer, answerHtml } from "@/components/RichAnswer";
import { locateQuestion } from "@/lib/catalog.js";
import {
  BookmarkCheck,
  Star,
  Search,
  ExternalLink,
  Trash2,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  BookOpen,
  ArrowRight,
  Code2,
  Atom,
  BrainCircuit,
  Binary,
  Smartphone,
  X,
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

export default function BookmarksPage() {
  const { account } = useAuth();
  const { state, dispatch } = useStudy();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState("all");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!account) {
      router.replace("/login");
    }
  }, [mounted, account, router]);

  // Locate all saved bookmarks
  const locatedBookmarks = useMemo(() => {
    if (!state?.bookmarks) return [];
    return state.bookmarks
      .map((id: string) => locateQuestion(id, state.notes))
      .filter(Boolean);
  }, [state?.bookmarks, state?.notes]);

  // Filtered bookmarks
  const filtered = useMemo(() => {
    return locatedBookmarks.filter((item: any) => {
      const matchTopic =
        topicFilter === "all" || item.topic.id === topicFilter;
      const matchQuery =
        !searchQuery.trim() ||
        item.question.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.question.section?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.topic.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTopic && matchQuery;
    });
  }, [locatedBookmarks, topicFilter, searchQuery]);

  const handleToggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleToggleAll = () => {
    if (expandedIds.size === filtered.length) {
      setExpandedIds(new Set());
    } else {
      setExpandedIds(new Set(filtered.map((item: any) => item.question.id)));
    }
  };

  if (!mounted || !account) {
    return (
      <HomeLayout>
        <div className="space-y-6 max-w-5xl mx-auto pb-20 animate-pulse">
          <div className="h-36 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
          <div className="h-14 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
          <div className="space-y-3">
            <div className="h-24 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
            <div className="h-24 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
            <div className="h-24 rounded-2xl border border-[var(--line)] bg-[var(--paper)]" />
          </div>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="space-y-6 max-w-5xl mx-auto pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/dashboard" className="hover:text-zinc-200 transition">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-[var(--ink)] font-medium">Revision Vault</span>
        </div>

        {/* 1. Header Banner */}
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200">
                  <BookmarkCheck className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-zinc-700/60 bg-zinc-800/40 px-3 py-1 text-[11px] font-semibold tracking-wider text-zinc-300 uppercase">
                  Personal Study Vault
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
                Revision Vault
              </h1>
              <p className="text-xs sm:text-sm text-[var(--ink-secondary)] max-w-xl leading-relaxed">
                High-yield questions you flagged for focused recall. Review answers, code snippets, and edge cases before technical rounds.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-[#0d0d10] p-4 text-center shrink-0 min-w-[140px]">
              <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                Saved Questions
              </span>
              <div className="text-2xl font-bold font-mono text-zinc-100 mt-0.5">
                {locatedBookmarks.length}
              </div>
              <span className="text-[10px] text-zinc-400">
                Ready for Review
              </span>
            </div>
          </div>
        </div>

        {/* 2. Filter & Search Controls */}
        {locatedBookmarks.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 sm:p-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search saved questions or concepts..."
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

            {/* Topic Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center rounded-xl border border-[var(--line)] bg-[var(--paper)] p-1 text-[11px] overflow-x-auto">
                {[
                  { id: "all", label: "All Sheets" },
                  { id: "javascript", label: "JavaScript" },
                  { id: "react", label: "React" },
                  { id: "react-native", label: "Native" },
                  { id: "output", label: "Output" },
                  { id: "strings", label: "Strings" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTopicFilter(t.id)}
                    className={`px-2.5 py-1 rounded-lg transition shrink-0 ${
                      topicFilter === t.id
                        ? "bg-zinc-800 text-zinc-100 font-medium border border-zinc-700"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Expand All */}
              <button
                type="button"
                onClick={handleToggleAll}
                className="flex items-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-[11px] font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition"
              >
                <ChevronsUpDown className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">
                  {expandedIds.size === filtered.length ? "Collapse All" : "Expand All"}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* 3. Bookmarked Questions List */}
        <div className="space-y-3">
          {locatedBookmarks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface)] p-12 text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800/80 border border-zinc-700 text-zinc-300">
                <Star className="h-6 w-6" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h3 className="text-base font-semibold text-[var(--ink)]">
                  Your Revision Vault is Empty
                </h3>
                <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                  While browsing interview questions, click the <span className="font-semibold text-zinc-200">★ Star</span> icon on any card to save it here for targeted revision.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                <Link
                  href="/javascript"
                  className="rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-semibold text-zinc-100 hover:bg-zinc-700 transition"
                >
                  Browse JavaScript Core
                </Link>
                <Link
                  href="/react"
                  className="rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition"
                >
                  Browse React 19
                </Link>
                <Link
                  href="/output"
                  className="rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition"
                >
                  Browse Tricky Output
                </Link>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface)] p-10 text-center space-y-3">
              <p className="text-xs text-[var(--ink-secondary)]">
                No saved questions match your search or filter criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setTopicFilter("all");
                }}
                className="inline-flex rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700 transition"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filtered.map((item: any, idx: number) => {
              const q = item.question;
              const isExpanded = expandedIds.has(q.id);
              const diffConfig =
                DIFFICULTY_CONFIG[q.level] || DIFFICULTY_CONFIG.basic;
              const TopicIcon = TOPIC_ICONS[item.topic.id] || BookOpen;

              return (
                <article
                  key={q.id}
                  className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] hover:border-zinc-700 transition-colors shadow-sm"
                >
                  {/* Card Header Row */}
                  <div
                    className="flex items-start sm:items-center justify-between gap-3 p-4 sm:p-5 cursor-pointer select-none"
                    onClick={() => handleToggleExpand(q.id)}
                  >
                    <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                      {/* Topic Icon */}
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 mt-0.5 sm:mt-0">
                        <TopicIcon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 space-y-1">
                        <h2 className="text-sm sm:text-base font-semibold leading-snug text-[var(--ink)]">
                          {q.q}
                        </h2>

                        <div className="flex flex-wrap items-center gap-2">
                          {/* Topic & Day badge */}
                          <span className="rounded-full border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
                            {item.topic.title} {item.day ? `· Day ${item.day}` : ""}
                          </span>

                          {/* Difficulty pill */}
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${diffConfig.badgeClass}`}
                          >
                            {diffConfig.label}
                          </span>

                          {/* Section */}
                          {q.section && (
                            <span className="text-[11px] text-zinc-500">
                              {q.section}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Tools: Jump, Remove, Expand */}
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <Link
                        href={item.path}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850 transition"
                        title="Open in study sheet"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch({ type: "bookmark", id: q.id });
                        }}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                        title="Remove from bookmarks"
                      >
                        <Trash2 className="h-4 w-4" />
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

                  {/* Expanded Answer with high contrast code styling */}
                  {isExpanded && (
                    <div className="border-t border-[var(--line)] bg-[var(--paper)]/40 p-5 sm:p-6 space-y-4">
                      <div className="answer">
                        <RichAnswer content={answerHtml(q)} />
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[var(--line)]/60 text-xs text-zinc-400">
                        <span>Source: {item.topic.title}</span>
                        <Link
                          href={item.path}
                          className="flex items-center gap-1 font-medium text-zinc-300 hover:text-white transition"
                        >
                          <span>Practice in {item.topic.title}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>
      </div>
    </HomeLayout>
  );
}
