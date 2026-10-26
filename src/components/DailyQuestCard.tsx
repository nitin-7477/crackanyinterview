"use client";

import { useMemo } from "react";
import Link from "next/link";
import { loadDailyHistory, getLocalDateString } from "../lib/streak";
import {
  Target,
  Flame,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";

interface DailyQuestProps {
  activity?: any[];
  className?: string;
  nextPath?: string;
  nextTitle?: string;
}

export function DailyQuestCard({
  activity,
  className = "",
  nextPath = "/javascript",
  nextTitle = "JavaScript Core",
}: DailyQuestProps) {
  const history = useMemo(() => loadDailyHistory(activity), [activity]);
  const todayKey = getLocalDateString();
  const todaySolved = history[todayKey] || 0;

  // Daily target: 3 questions per day
  const target = 3;
  const progressPct = Math.min(100, Math.round((todaySolved / target) * 100));
  const isGoalCompleted = todaySolved >= target;

  // SVG circular ring calculations
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPct / 100) * circumference;

  return (
    <div
      className={`rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-4 shadow-sm relative overflow-hidden transition-colors ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300">
              <Target className="h-3.5 w-3.5" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Daily SDE Workout
            </span>
          </div>

          <h3 className="text-base font-bold text-[var(--ink)]">
            {isGoalCompleted ? "Daily Target Crushed! 🔥" : "Today's Interview Quota"}
          </h3>
          <p className="text-xs text-[var(--ink-secondary)] max-w-sm leading-relaxed">
            {isGoalCompleted
              ? "You hit your minimum quota for today. Keep solving to increase velocity or rest."
              : `Solve ${Math.max(0, target - todaySolved)} more question${target - todaySolved === 1 ? "" : "s"} today to maintain your consecutive streak.`}
          </p>
        </div>

        {/* Circular Progress Ring */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-18 h-18 -rotate-90" viewBox="0 0 70 70">
            {/* Background ring */}
            <circle
              cx="35"
              cy="35"
              r={radius}
              stroke="currentColor"
              strokeWidth="5"
              fill="transparent"
              className="text-zinc-800"
            />
            {/* Progress ring */}
            <circle
              cx="35"
              cy="35"
              r={radius}
              stroke="currentColor"
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="text-zinc-100 transition-all duration-700"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="font-mono text-xs font-bold text-zinc-100">
              {todaySolved}/{target}
            </span>
            <span className="text-[8px] font-mono text-zinc-500 uppercase">
              Done
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[var(--line)]/60 text-xs">
        <div className="flex items-center gap-1.5 text-zinc-400">
          <Flame className="h-3.5 w-3.5 text-zinc-300" />
          <span className="font-mono text-[11px]">
            {isGoalCompleted ? "Streak Protected for Today" : "Active Streak at Risk"}
          </span>
        </div>

        <Link
          href={nextPath}
          className="flex items-center gap-1.5 font-semibold text-zinc-200 hover:text-white transition"
        >
          <span>{isGoalCompleted ? "Extra Practice" : "Continue"}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
