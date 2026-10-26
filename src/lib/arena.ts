import { questionsOf } from "./catalog.js";
import { QUIZ_BANK, answerChoice } from "../js/plan.js";

export interface ArenaQuestion {
  id: string;
  topicId: string;
  topicTitle: string;
  q: string;
  a?: string;
  code?: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface ArenaExam {
  id: string;
  title: string;
  topicId: string;
  mode: "sprint" | "standard" | "deep";
  durationMinutes: number;
  totalQuestions: number;
  passScore: number;
  items: ArenaQuestion[];
  startedAt: number;
}

export interface ArenaResult {
  id: string;
  examId: string;
  topicId: string;
  topicTitle: string;
  mode: string;
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  violations: number;
  completedAt: number;
  answers: Record<number, number>; // questionIndex -> pickedOption
}

export const ARENA_STORAGE_KEY = "interview-arena-history-v1";

const TOPIC_NAMES: Record<string, string> = {
  all: "Full-Stack SDE Screening",
  javascript: "JavaScript Core Engine",
  react: "React 19 & Next.js Architecture",
  "react-native": "React Native & Mobile SDE",
  output: "Tricky JS Output & Traps",
  strings: "DSA & LeetCode Patterns",
};

// Shuffle an array
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Generate an interactive proctored exam
export function generateArenaExam({
  topicId = "all",
  mode = "standard",
  count = 20,
}: {
  topicId?: string;
  mode?: "sprint" | "standard" | "deep";
  count?: number;
}): ArenaExam {
  let questionPool: any[] = [];

  if (topicId === "all") {
    const js = questionsOf("javascript");
    const react = questionsOf("react");
    const rn = questionsOf("react-native");
    const output = questionsOf("output");
    const dsa = questionsOf("strings");
    questionPool = [...js, ...react, ...rn, ...output, ...dsa];
  } else {
    questionPool = questionsOf(topicId);
  }

  // Shuffle candidate questions
  const shuffledPool = shuffle(questionPool);
  const selectedPool = shuffledPool.slice(0, Math.min(count, shuffledPool.length));

  // Build items
  const items: ArenaQuestion[] = selectedPool.map((qItem, idx) => {
    // Check if authored in QUIZ_BANK
    const authored = (QUIZ_BANK as any)?.[qItem.id];
    if (authored && authored.options && authored.options.length >= 4) {
      const options = shuffle([...authored.options]);
      const correctText = authored.options[authored.correct];
      return {
        id: qItem.id,
        topicId: qItem.topicId || topicId,
        topicTitle: TOPIC_NAMES[qItem.topicId || topicId] || "Technical Core",
        q: authored.q || qItem.q,
        options,
        correct: options.indexOf(correctText),
        explanation: authored.a || qItem.a || "Key conceptual explanation provided in course material.",
      };
    }

    // Extract correct answer summary
    const correctText = answerChoice(qItem.a);

    // Pick 3 random distractors from peer questions
    const peers = questionPool.filter((p) => p.id !== qItem.id);
    const peerChoices = shuffle(peers)
      .map((p) => answerChoice(p.a))
      .filter((choice) => choice && choice !== correctText);

    const distinctDistractors: string[] = [];
    for (const c of peerChoices) {
      if (distinctDistractors.length >= 3) break;
      if (!distinctDistractors.includes(c)) distinctDistractors.push(c);
    }

    // Fallbacks if not enough peers
    while (distinctDistractors.length < 3) {
      distinctDistractors.push(`Alternative evaluation mechanism ${distinctDistractors.length + 1}`);
    }

    const options = shuffle([correctText, ...distinctDistractors]);

    return {
      id: qItem.id,
      topicId: qItem.topicId || topicId,
      topicTitle: TOPIC_NAMES[qItem.topicId || topicId] || "Technical Core",
      q: qItem.q,
      a: qItem.a,
      options,
      correct: options.indexOf(correctText),
      explanation: qItem.a || "Refer to detailed architecture breakdown in course sheets.",
    };
  });

  const durationMinutes = mode === "sprint" ? 15 : mode === "deep" ? 45 : 30;
  const passScore = Math.ceil(items.length * 0.75); // 75% to pass

  return {
    id: `exam-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: `${TOPIC_NAMES[topicId] || "SDE Technical"} Mock Assessment`,
    topicId,
    mode,
    durationMinutes,
    totalQuestions: items.length,
    passScore,
    items,
    startedAt: Date.now(),
  };
}

// Load past exam history from LocalStorage
export function loadArenaHistory(): ArenaResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ARENA_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Save an exam result to LocalStorage
export function saveArenaResult(result: ArenaResult): ArenaResult[] {
  if (typeof window === "undefined") return [];
  try {
    const history = loadArenaHistory();
    const next = [result, ...history].slice(0, 50);
    localStorage.setItem(ARENA_STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return [];
  }
}
