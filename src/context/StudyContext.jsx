import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { buildQuizItems, emptyPlan, quizMatchesBank, QUIZ_BANK_VERSION } from "../js/plan.js";
import {
  ACTIVITY_KEY,
  BOOKMARK_KEY,
  GOAL_KEY,
  NOTES_KEY,
  PLAN_STORAGE_KEY,
  PLAN_TOPIC,
  READ_PLANS,
  VISIT_KEY,
  planQuestionList,
} from "../lib/catalog.js";

const StudyContext = createContext(null);

function loadJson(key, fallback) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "");
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function loadJsPlan() {
  const stored = loadJson(PLAN_STORAGE_KEY, null);
  const plan = stored && typeof stored === "object" ? { ...emptyPlan(), ...stored } : emptyPlan();
  plan.read = plan.read || {};
  plan.results = plan.results || {};
  if (plan.activeQuiz && !quizMatchesBank(plan.activeQuiz)) plan.activeQuiz = null;
  return plan;
}

function loadReadPlan(key) {
  const stored = loadJson(key, null);
  if (!stored || typeof stored !== "object") return { selectedDay: 1, read: {} };
  return { selectedDay: stored.selectedDay || 1, read: stored.read || {} };
}

function initialState() {
  return {
    notes: loadJson(NOTES_KEY, []),
    plan: loadJsPlan(),
    readPlans: {
      react: loadReadPlan(READ_PLANS.react.key),
      "react-native": loadReadPlan(READ_PLANS["react-native"].key),
    },
    visits: loadJson(VISIT_KEY, {}),
    activity: loadJson(ACTIVITY_KEY, []),
    bookmarks: loadJson(BOOKMARK_KEY, []),
    goal: localStorage.getItem(GOAL_KEY) || "Land your dream job",
  };
}

function pushActivity(state, entry) {
  return [{ id: crypto.randomUUID(), at: Date.now(), ...entry }, ...state.activity].slice(0, 40);
}

function quizScore(quiz) {
  const total = quiz?.items?.length || 0;
  let answered = 0;
  let correct = 0;
  for (let index = 0; index < total; index += 1) {
    if (!Number.isInteger(quiz.picks?.[index])) continue;
    answered += 1;
    if (quiz.marks?.[index]) correct += 1;
  }
  return { answered, correct, total, done: total > 0 && answered === total };
}

function settle(plan, quiz) {
  const score = quizScore(quiz);
  const previous = plan.results[quiz.day];
  const passed = score.correct > 15 || Boolean(previous?.passed);
  const kept = Math.max(score.correct, previous?.score || 0);
  const same = previous && previous.score === kept && previous.total === score.total && previous.passed === passed;
  const activity = same ? [] : [{
    kind: passed && !previous?.passed ? "passed" : "quiz",
    topicId: PLAN_TOPIC,
    title: `JavaScript day ${quiz.day} quiz`,
    detail: `${kept}/${score.total}`,
  }];
  return {
    plan: {
      ...plan,
      activeQuiz: quiz,
      results: {
        ...plan.results,
        [quiz.day]: { score: kept, total: score.total, passed, at: previous?.at || Date.now() },
      },
    },
    activity,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "select-js-day":
      return { ...state, plan: { ...state.plan, selectedDay: action.day } };
    case "select-read-day":
      return {
        ...state,
        readPlans: {
          ...state.readPlans,
          [action.topicId]: { ...state.readPlans[action.topicId], selectedDay: action.day },
        },
      };
    case "toggle-js-read": {
      const current = new Set(state.plan.read[action.day] || []);
      const wasRead = current.has(action.id);
      if (wasRead) current.delete(action.id);
      else current.add(action.id);
      const activity = wasRead
        ? state.activity
        : pushActivity(state, { kind: "completed", topicId: PLAN_TOPIC, title: action.title, detail: "JavaScript" });
      return {
        ...state,
        activity,
        plan: { ...state.plan, read: { ...state.plan.read, [action.day]: [...current] } },
      };
    }
    case "toggle-read": {
      const plan = state.readPlans[action.topicId];
      const current = new Set(plan.read[action.day] || []);
      const wasRead = current.has(action.id);
      if (wasRead) current.delete(action.id);
      else current.add(action.id);
      const activity = wasRead
        ? state.activity
        : pushActivity(state, { kind: "completed", topicId: action.topicId, title: action.title, detail: action.detail });
      return {
        ...state,
        activity,
        readPlans: {
          ...state.readPlans,
          [action.topicId]: { ...plan, read: { ...plan.read, [action.day]: [...current] } },
        },
      };
    }
    case "visit": {
      const seen = new Set(state.visits[action.topicId] || []);
      if (seen.has(action.id)) return state;
      seen.add(action.id);
      return {
        ...state,
        visits: { ...state.visits, [action.topicId]: [...seen] },
        activity: pushActivity(state, { kind: "opened", topicId: action.topicId, title: action.title, detail: action.detail }),
      };
    }
    case "bookmark": {
      const exists = state.bookmarks.includes(action.id);
      return {
        ...state,
        bookmarks: exists ? state.bookmarks.filter((id) => id !== action.id) : [action.id, ...state.bookmarks],
      };
    }
    case "start-quiz": {
      const questions = planQuestionList();
      return {
        ...state,
        plan: {
          ...state.plan,
          activeQuiz: {
            day: action.day,
            bankVersion: QUIZ_BANK_VERSION,
            items: buildQuizItems(questions, action.day),
            index: 0,
            selected: null,
            marks: [],
            picks: [],
          },
        },
      };
    }
    case "pick-choice": {
      const quiz = state.plan.activeQuiz;
      if (!quiz || Number.isInteger(quiz.picks?.[action.questionIndex])) return state;
      const prompt = quiz.items?.[action.questionIndex];
      if (!prompt) return state;
      const picks = [...(quiz.picks || [])];
      const marks = [...(quiz.marks || [])];
      picks[action.questionIndex] = action.optionIndex;
      marks[action.questionIndex] = action.optionIndex === prompt.correct;
      const nextQuiz = { ...quiz, picks, marks, index: action.questionIndex };
      if (!quizScore(nextQuiz).done) {
        return { ...state, plan: { ...state.plan, activeQuiz: nextQuiz } };
      }
      const settled = settle({ ...state.plan, activeQuiz: nextQuiz }, nextQuiz);
      return {
        ...state,
        plan: settled.plan,
        activity: [...settled.activity.map((entry) => ({ id: crypto.randomUUID(), at: Date.now(), ...entry })), ...state.activity].slice(0, 40),
      };
    }
    case "set-goal":
      return { ...state, goal: action.goal };
    case "save-note": {
      const notes = state.notes.filter((note) => note.id !== action.note.id);
      return { ...state, notes: [action.note, ...notes] };
    }
    case "delete-note":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.id),
        bookmarks: state.bookmarks.filter((id) => id !== action.id),
      };
    default:
      return state;
  }
}

export function StudyProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, initialState);

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(state.notes));
    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(state.plan));
    localStorage.setItem(READ_PLANS.react.key, JSON.stringify(state.readPlans.react));
    localStorage.setItem(READ_PLANS["react-native"].key, JSON.stringify(state.readPlans["react-native"]));
    localStorage.setItem(VISIT_KEY, JSON.stringify(state.visits));
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(state.activity));
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(state.bookmarks));
    localStorage.setItem(GOAL_KEY, state.goal);
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  const value = useContext(StudyContext);
  if (!value) throw new Error("useStudy must be used inside StudyProvider");
  return value;
}
