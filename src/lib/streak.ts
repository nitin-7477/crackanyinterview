"use client";

export const ACTIVITY_HISTORY_KEY = "cai-activity-history-v1";
export const ACHIEVEMENTS_KEY = "cai-achievements-v1";

export interface DayActivity {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  desc: string;
  unlocked: boolean;
  unlockedAt?: number;
  category: "streak" | "accuracy" | "mastery" | "engagement";
}

// Format local date YYYY-MM-DD
export function getLocalDateString(timestamp: number = Date.now()): string {
  const d = new Date(timestamp);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Record an activity event in daily history
export function recordDailyActivity(amount: number = 1): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const existing = JSON.parse(localStorage.getItem(ACTIVITY_HISTORY_KEY) || "{}");
    const today = getLocalDateString();
    existing[today] = (existing[today] || 0) + amount;
    localStorage.setItem(ACTIVITY_HISTORY_KEY, JSON.stringify(existing));
    return existing;
  } catch {
    return {};
  }
}

// Load daily history map
export function loadDailyHistory(stateActivity?: any[]): Record<string, number> {
  let history: Record<string, number> = {};
  if (typeof window !== "undefined") {
    try {
      history = JSON.parse(localStorage.getItem(ACTIVITY_HISTORY_KEY) || "{}");
    } catch {
      history = {};
    }
  }

  // Backfill from state.activity if available
  if (stateActivity && Array.isArray(stateActivity)) {
    for (const act of stateActivity) {
      if (act.at) {
        const key = getLocalDateString(act.at);
        history[key] = Math.max(history[key] || 0, 1);
      }
    }
  }

  // Ensure today has at least some activity if recently active
  return history;
}

// Calculate streaks from daily history
export function calculateStreakStats(history: Record<string, number>) {
  const todayStr = getLocalDateString();
  const todayDate = new Date();

  let currentStreak = 0;
  let maxStreak = 0;
  let totalActiveDays = Object.keys(history).filter((k) => (history[k] || 0) > 0).length;

  // Check today or yesterday for active streak
  let checkDate = new Date(todayDate);
  let key = getLocalDateString(checkDate.getTime());

  // If didn't do anything today yet, check if yesterday was active
  if (!history[key] || history[key] === 0) {
    checkDate.setDate(checkDate.getDate() - 1);
    key = getLocalDateString(checkDate.getTime());
  }

  // Count backwards consecutive days
  while (history[key] && history[key] > 0) {
    currentStreak += 1;
    checkDate.setDate(checkDate.getDate() - 1);
    key = getLocalDateString(checkDate.getTime());
  }

  // Calculate longest streak across history
  const sortedDates = Object.keys(history)
    .filter((k) => history[k] > 0)
    .sort();

  let tempStreak = 0;
  let prevTimestamp = 0;

  for (const dateStr of sortedDates) {
    const ts = new Date(dateStr).getTime();
    if (prevTimestamp === 0) {
      tempStreak = 1;
    } else {
      const diffDays = Math.round((ts - prevTimestamp) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        tempStreak += 1;
      } else {
        tempStreak = 1;
      }
    }
    prevTimestamp = ts;
    if (tempStreak > maxStreak) maxStreak = tempStreak;
  }

  maxStreak = Math.max(maxStreak, currentStreak, totalActiveDays > 0 ? 1 : 0);

  return {
    currentStreak: Math.max(currentStreak, totalActiveDays > 0 ? 1 : 0),
    maxStreak,
    longestStreak: maxStreak,
    totalActiveDays,
    todaySolved: history[todayStr] || 0,
  };
}

// Compute SDE Readiness Score (Scale: 300 to 950)
export function computeReadinessScore(state: any) {
  if (!state) return { score: 320, tier: "Initiate", percentile: 15 };

  // 1. Solved Volume (max 380 pts)
  const totalReadCount = (state.plan?.read ? Object.values(state.plan.read).flat().length : 0) +
    (state.readPlans?.react?.read ? Object.values(state.readPlans.react.read).flat().length : 0) +
    (state.readPlans?.["react-native"]?.read ? Object.values(state.readPlans["react-native"].read).flat().length : 0) +
    (state.visits ? Object.values(state.visits).flat().length : 0);

  const solvedPts = Math.min(380, Math.round((totalReadCount / 200) * 380));

  // 2. Quiz Performance & Accuracy (max 300 pts)
  const passedQuizzes = Object.values(state.plan?.results || {}).filter((r: any) => r?.passed).length;
  const quizPts = Math.min(300, passedQuizzes * 30);

  // 3. Consistency & Streak (max 170 pts)
  const history = loadDailyHistory(state.activity);
  const { currentStreak, totalActiveDays } = calculateStreakStats(history);
  const streakPts = Math.min(170, currentStreak * 15 + totalActiveDays * 8);

  // Base score 300
  const score = Math.min(950, Math.max(300, 300 + solvedPts + quizPts + streakPts));

  let tier = "Initiate";
  let percentile = 20;

  if (score >= 850) {
    tier = "Principal Architect";
    percentile = 98;
  } else if (score >= 750) {
    tier = "Senior SDE Ready";
    percentile = 89;
  } else if (score >= 620) {
    tier = "Mid-Level Competitor";
    percentile = 72;
  } else if (score >= 480) {
    tier = "Junior SDE Contender";
    percentile = 48;
  }

  return {
    score,
    tier,
    percentile,
    metrics: {
      solvedPts,
      quizPts,
      streakPts,
    },
  };
}

// Evaluate unlockable achievements
export function evaluateAchievements(state: any, history: Record<string, number>): Achievement[] {
  const { currentStreak } = calculateStreakStats(history);
  const passedQuizzes = Object.values(state?.plan?.results || {}).filter((r: any) => r?.passed).length;
  const totalBookmarks = state?.bookmarks?.length || 0;
  const jsReadCount = state?.plan?.read ? Object.values(state.plan.read).flat().length : 0;
  const reactReadCount = state?.readPlans?.react?.read ? Object.values(state.readPlans.react.read).flat().length : 0;

  return [
    {
      id: "first_blood",
      title: "First Blood",
      icon: "🚀",
      desc: "Completed your first interview question.",
      unlocked: jsReadCount > 0 || reactReadCount > 0 || (state?.activity?.length || 0) > 0,
      category: "engagement",
    },
    {
      id: "speed_demon",
      title: "Speed Demon",
      icon: "⚡",
      desc: "Passed a 20-question timed practice assessment.",
      unlocked: passedQuizzes >= 1,
      category: "accuracy",
    },
    {
      id: "streak_warrior",
      title: "Streak Warrior",
      icon: "🔥",
      desc: "Maintained a 7-day continuous study streak.",
      unlocked: currentStreak >= 7 || (history && Object.keys(history).length >= 7),
      category: "streak",
    },
    {
      id: "js_architect",
      title: "JavaScript Engine Master",
      icon: "🧠",
      desc: "Completed 50+ core JavaScript engine & closure questions.",
      unlocked: jsReadCount >= 50,
      category: "mastery",
    },
    {
      id: "react_reconciler",
      title: "React 19 Architect",
      icon: "⚛️",
      desc: "Mastered Fiber reconciler & Server Components roadmap.",
      unlocked: reactReadCount >= 25,
      category: "mastery",
    },
    {
      id: "vault_curator",
      title: "Vault Curator",
      icon: "⭐️",
      desc: "Flagged 10+ tricky edge cases into your Revision Vault.",
      unlocked: totalBookmarks >= 10,
      category: "engagement",
    },
    {
      id: "arena_champion",
      title: "Flawless Victor",
      icon: "🏆",
      desc: "Cleared 5 distinct timed mock arena rounds.",
      unlocked: passedQuizzes >= 5,
      category: "accuracy",
    },
    {
      id: "marathon_dev",
      title: "Fullstack Centurion",
      icon: "🛡️",
      desc: "Solved 100+ total technical interview challenges.",
      unlocked: jsReadCount + reactReadCount >= 100,
      category: "mastery",
    },
  ];
}
