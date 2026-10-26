"use client";

import { useMemo } from "react";
import { computeReadinessScore } from "../lib/streak";
import {
  ShieldCheck,
  TrendingUp,
  Award,
  Zap,
  Info,
} from "lucide-react";

interface ReadinessScoreProps {
  state?: any;
  className?: string;
}

export function ReadinessScoreCard({ state, className = "" }: ReadinessScoreProps) {
  const readiness = useMemo(() => computeReadinessScore(state), [state]);

  // Scaled gauge percentage (300 to 950 scale)
  const scorePct = Math.round(((readiness.score - 300) / (950 - 300)) * 100);

  return (
    <div
      className={`rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-5 transition-colors shadow-sm relative overflow-hidden ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Predictive Interview Index
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[var(--ink)] mt-1">
            SDE Readiness Benchmark
          </h2>
        </div>

        {/* Percentile Pill */}
        <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#0d0d10] px-3.5 py-1.5 self-start sm:self-auto">
          <TrendingUp className="h-4 w-4 text-zinc-300" />
          <span className="text-xs font-bold text-zinc-100 font-mono">
            Top {readiness.percentile}% of Candidates
          </span>
        </div>
      </div>

      {/* Main Score Centerpiece */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-4 rounded-xl border border-zinc-800 bg-[#0d0d10]">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
            Readiness Metric
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-zinc-100">
              {readiness.score}
            </span>
            <span className="text-xs text-zinc-500 font-mono">/ 950 Max</span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-200">
              {readiness.tier}
            </span>
            <span className="text-[11px] text-zinc-500">Tier-1 Screening Standard</span>
          </div>
        </div>

        {/* Progress gauge bar */}
        <div className="w-full sm:w-60 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Readiness Index</span>
            <span>{scorePct}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-zinc-100 transition-all duration-700 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              style={{ width: `${scorePct}%` }}
            />
          </div>
          <span className="text-[9px] text-zinc-500 block">
            Calculated across solved volume, quiz accuracy & consistency.
          </span>
        </div>
      </div>

      {/* 3 Component Breakdown Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-zinc-850 bg-[#121215] p-3 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 text-[11px]">Curriculum Depth</span>
            <span className="font-mono text-zinc-200 text-[11px]">
              {readiness.metrics?.solvedPts || 0}/380
            </span>
          </div>
          <div className="h-1 w-full rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-zinc-300 rounded-full"
              style={{
                width: `${Math.round(((readiness.metrics?.solvedPts || 0) / 380) * 100)}%`,
              }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-zinc-850 bg-[#121215] p-3 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 text-[11px]">Assessment Accuracy</span>
            <span className="font-mono text-zinc-200 text-[11px]">
              {readiness.metrics?.quizPts || 0}/300
            </span>
          </div>
          <div className="h-1 w-full rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-zinc-300 rounded-full"
              style={{
                width: `${Math.round(((readiness.metrics?.quizPts || 0) / 300) * 100)}%`,
              }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-zinc-850 bg-[#121215] p-3 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 text-[11px]">Streak Momentum</span>
            <span className="font-mono text-zinc-200 text-[11px]">
              {readiness.metrics?.streakPts || 0}/170
            </span>
          </div>
          <div className="h-1 w-full rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-zinc-300 rounded-full"
              style={{
                width: `${Math.round(((readiness.metrics?.streakPts || 0) / 170) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
