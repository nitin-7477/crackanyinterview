"use client";

import { useMemo, useState } from "react";
import { evaluateAchievements, loadDailyHistory } from "../lib/streak";
import {
  Trophy,
  Award,
  Lock,
  Sparkles,
  CheckCircle2,
  X,
  Info,
} from "lucide-react";

interface TrophyCabinetProps {
  state?: any;
  className?: string;
}

export function TrophyCabinet({ state, className = "" }: TrophyCabinetProps) {
  const [selectedBadge, setSelectedBadge] = useState<any>(null);

  const history = useMemo(() => loadDailyHistory(state?.activity), [state?.activity]);
  const achievements = useMemo(
    () => evaluateAchievements(state, history),
    [state, history]
  );

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div
      className={`rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-5 transition-colors shadow-sm ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300">
              <Trophy className="h-3.5 w-3.5" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Gamified Milestones
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[var(--ink)] mt-1">
            Achievement Trophy Cabinet
          </h2>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#0d0d10] px-3 py-1.5 self-start sm:self-auto">
          <Award className="h-4 w-4 text-zinc-300" />
          <span className="font-mono text-xs font-bold text-zinc-100">
            {unlockedCount} / {achievements.length} Unlocked
          </span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {achievements.map((badge) => {
          return (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className={`group relative flex flex-col items-center text-center p-4 rounded-xl border transition-all cursor-pointer select-none ${
                badge.unlocked
                  ? "border-zinc-700/80 bg-[#0d0d10] hover:border-zinc-500 shadow-sm"
                  : "border-zinc-850/60 bg-[#09090b]/50 opacity-40 hover:opacity-60"
              }`}
            >
              {/* Badge Icon Badge */}
              <div
                className={`relative flex h-12 w-12 items-center justify-center rounded-2xl border text-xl mb-2.5 transition-transform group-hover:scale-105 ${
                  badge.unlocked
                    ? "border-zinc-600 bg-zinc-800 shadow-[0_0_10px_rgba(255,255,255,0.08)]"
                    : "border-zinc-800 bg-zinc-900 grayscale"
                }`}
              >
                <span>{badge.icon}</span>
                {badge.unlocked && (
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-200 text-zinc-950 text-[9px] font-extrabold shadow">
                    ✓
                  </span>
                )}
              </div>

              <h3 className="text-xs font-bold text-[var(--ink)] truncate w-full">
                {badge.title}
              </h3>
              <p className="text-[10px] text-zinc-500 line-clamp-2 mt-1 leading-snug">
                {badge.desc}
              </p>

              <span
                className={`mt-2.5 text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                  badge.unlocked
                    ? "border-zinc-700 bg-zinc-800/80 text-zinc-200"
                    : "border-zinc-850 bg-zinc-950 text-zinc-600"
                }`}
              >
                {badge.unlocked ? "Claimed" : "Locked"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Detail Modal / Drawer if Badge Clicked */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-zinc-700 bg-[#0d0d10] p-6 shadow-2xl space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-600 bg-zinc-800 text-3xl shadow-lg">
              {selectedBadge.icon}
            </div>

            <div className="space-y-1">
              <span className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-0.5 text-[10px] font-mono uppercase text-zinc-400">
                {selectedBadge.category}
              </span>
              <h3 className="text-lg font-bold text-zinc-100 pt-1">
                {selectedBadge.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {selectedBadge.desc}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-zinc-800 bg-[#121215] text-xs">
              <span className="font-semibold text-zinc-300 block">
                {selectedBadge.unlocked ? "Badge Unlocked ✓" : "How to Unlock"}
              </span>
              <span className="text-[11px] text-zinc-500">
                {selectedBadge.unlocked
                  ? "This milestone has been permanently recorded in your profile."
                  : "Complete the required study sheets or arena quizzes to claim this trophy."}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedBadge(null)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-2 text-xs font-semibold text-zinc-100 hover:bg-zinc-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
