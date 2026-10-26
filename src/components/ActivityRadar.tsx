"use client";

import { useMemo, useState } from "react";
import {
  DayActivity,
  calculateStreakStats,
  getLocalDateString,
  loadDailyHistory,
} from "../lib/streak";
import {
  Flame,
  Trophy,
  Calendar,
  Zap,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight,
  Info,
} from "lucide-react";

interface ActivityRadarProps {
  activity?: any[];
  className?: string;
}

const DAYS_SHORT = ["M", "T", "W", "T", "F", "S", "S"];

export function ActivityRadar({ activity, className = "" }: ActivityRadarProps) {
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    dayName: string;
    weekIdx: number;
    dayIdx: number;
  } | null>(null);

  const [viewMode, setViewMode] = useState<"stream" | "compact">("stream");

  // Load and memoize daily history and streak stats
  const history = useMemo(() => loadDailyHistory(activity), [activity]);
  const stats = useMemo(() => calculateStreakStats(history), [history]);

  // Generate 16 weeks of calendar columns (112 days total)
  const weeksData = useMemo(() => {
    const weeks = [];
    const today = new Date();

    // End on current week Sunday or Saturday
    const currentDayOfWeek = (today.getDay() + 6) % 7; // 0 = Mon, 6 = Sun
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + (6 - currentDayOfWeek));

    // 16 weeks backwards = 112 days
    const numWeeks = 16;
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - (numWeeks * 7 - 1));

    let iter = new Date(startDate);

    for (let w = 0; w < numWeeks; w++) {
      const days = [];
      let weekTotal = 0;
      let monthLabel = "";

      for (let d = 0; d < 7; d++) {
        const dateKey = getLocalDateString(iter.getTime());
        const count = history[dateKey] || 0;
        weekTotal += count;

        const isToday = dateKey === getLocalDateString(today.getTime());
        const isFuture = iter.getTime() > today.getTime();

        const dayName = iter.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

        if (d === 0 || iter.getDate() === 1) {
          monthLabel = iter.toLocaleDateString("en-US", { month: "short" });
        }

        days.push({
          date: dateKey,
          count,
          dayName,
          isToday,
          isFuture,
          dayIndex: d,
        });

        iter.setDate(iter.getDate() + 1);
      }

      weeks.push({
        weekIndex: w,
        days,
        weekTotal,
        monthLabel,
      });
    }

    return weeks;
  }, [history]);

  const getIntensityClass = (count: number, isFuture: boolean, isToday: boolean) => {
    if (isFuture) return "bg-transparent border border-dashed border-zinc-850/40 opacity-20 cursor-default";
    if (count === 0) {
      return isToday
        ? "bg-zinc-900 border-2 border-zinc-500/80 animate-pulse"
        : "bg-zinc-900/60 border border-zinc-800/50 hover:border-zinc-700";
    }
    if (count === 1) return "bg-zinc-700 border border-zinc-600/70 shadow-sm";
    if (count <= 3) return "bg-zinc-500 border border-zinc-400 text-black";
    if (count <= 6) return "bg-zinc-300 border border-zinc-200 text-black shadow-[0_0_8px_rgba(255,255,255,0.25)]";
    return "bg-white border border-white text-black shadow-[0_0_12px_rgba(255,255,255,0.5)]";
  };

  return (
    <div
      className={`rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-6 transition-colors shadow-sm ${className}`}
    >
      {/* 1. Velocity Top Bar Metrics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-zinc-400 animate-ping" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Personal Study Velocity
            </span>
          </div>
          <h2 className="text-lg font-bold tracking-tight text-[var(--ink)] flex items-center gap-2">
            Activity & Momentum Stream
          </h2>
        </div>

        {/* 3 Metric Pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Active Streak */}
          <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#0d0d10] px-3.5 py-2">
            <Flame className="h-4 w-4 text-zinc-300 animate-bounce" />
            <div>
              <span className="text-[10px] text-zinc-500 block uppercase font-mono">Streak</span>
              <span className="text-xs font-bold text-zinc-100 font-mono">
                {stats.currentStreak} Days
              </span>
            </div>
          </div>

          {/* Longest Streak */}
          <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#0d0d10] px-3.5 py-2">
            <Trophy className="h-4 w-4 text-zinc-400" />
            <div>
              <span className="text-[10px] text-zinc-500 block uppercase font-mono">Record</span>
              <span className="text-xs font-bold text-zinc-100 font-mono">
                {stats.maxStreak} Days
              </span>
            </div>
          </div>

          {/* Total Days */}
          <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#0d0d10] px-3.5 py-2">
            <Calendar className="h-4 w-4 text-zinc-400" />
            <div>
              <span className="text-[10px] text-zinc-500 block uppercase font-mono">Total Active</span>
              <span className="text-xs font-bold text-zinc-100 font-mono">
                {stats.totalActiveDays} Days
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Bespoke Velocity Stream Matrix (16 Weeks Columns) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="flex items-center gap-1.5 font-medium">
            <TrendingUp className="h-3.5 w-3.5 text-zinc-400" />
            16-Week Velocity Wave (Monday – Sunday)
          </span>

          {/* Discrete legend */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
            <span>Rest</span>
            <span className="h-2.5 w-2 rounded-full bg-zinc-900 border border-zinc-800 inline-block" />
            <span className="h-2.5 w-2 rounded-full bg-zinc-700 inline-block" />
            <span className="h-2.5 w-2 rounded-full bg-zinc-400 inline-block" />
            <span className="h-2.5 w-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.4)] inline-block" />
            <span>High Intensity</span>
          </div>
        </div>

        {/* Scrollable Columns Container */}
        <div className="overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-zinc-800">
          <div className="inline-flex gap-2 min-w-full justify-between items-end">
            {/* Day of Week Labels Column */}
            <div className="flex flex-col justify-between h-[154px] pr-2 pb-6 text-[10px] font-mono text-zinc-500 select-none">
              {DAYS_SHORT.map((day, idx) => (
                <span key={`${day}-${idx}`} className="h-4 leading-4">
                  {day}
                </span>
              ))}
            </div>

            {/* 16 Weekly Columns */}
            {weeksData.map((week) => (
              <div
                key={week.weekIndex}
                className="flex flex-col items-center gap-1 shrink-0 group"
              >
                {/* Month label header if available */}
                <span className="text-[9px] font-mono text-zinc-500 h-3 leading-3 truncate">
                  {week.monthLabel || ""}
                </span>

                {/* 7 Vertical Micro-Pills */}
                <div className="flex flex-col gap-1.5 p-1 rounded-xl bg-[#09090b] border border-zinc-850/60 group-hover:border-zinc-700 transition">
                  {week.days.map((day, dIdx) => {
                    const intensityClass = getIntensityClass(
                      day.count,
                      day.isFuture,
                      day.isToday
                    );

                    return (
                      <div
                        key={day.date}
                        onMouseEnter={() =>
                          !day.isFuture &&
                          setHoveredDay({
                            date: day.date,
                            count: day.count,
                            dayName: day.dayName,
                            weekIdx: week.weekIndex,
                            dayIdx: dIdx,
                          })
                        }
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`h-4 w-3 sm:w-3.5 rounded-full transition-all duration-200 cursor-pointer ${intensityClass}`}
                        title={`${day.dayName}: ${day.count} solved`}
                      />
                    );
                  })}
                </div>

                {/* Weekly Volume Micro-Bar */}
                <div className="w-full flex flex-col items-center gap-0.5 pt-1">
                  <div
                    className="w-1.5 rounded-full bg-zinc-700 group-hover:bg-zinc-400 transition"
                    style={{
                      height: `${Math.min(20, Math.max(2, week.weekTotal * 2))}px`,
                    }}
                    title={`Week ${week.weekIndex + 1}: ${week.weekTotal} questions`}
                  />
                  <span className="text-[8px] font-mono text-zinc-500">
                    {week.weekTotal > 0 ? week.weekTotal : "·"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hover / Tooltip HUD Strip */}
        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-[#0d0d10] px-4 py-2.5 text-xs text-zinc-300">
          {hoveredDay ? (
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-zinc-200" />
              <span className="font-semibold text-zinc-100">{hoveredDay.dayName}</span>
              <span className="text-zinc-500">•</span>
              <span className="font-mono font-medium text-zinc-200">
                {hoveredDay.count === 0
                  ? "Rest Day (No activity logged)"
                  : `${hoveredDay.count} Question${hoveredDay.count === 1 ? "" : "s"} Completed`}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
              <Info className="h-3.5 w-3.5 text-zinc-400" />
              <span>Hover over any daily pill capsule or weekly frequency bar to inspect activity volume.</span>
            </div>
          )}

          <span className="font-mono text-[11px] text-zinc-400">
            {stats.todaySolved} Solved Today
          </span>
        </div>
      </div>
    </div>
  );
}
