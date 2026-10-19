import { topics } from "../data/index.js";
import {
  PLAN_TOPIC,
  PLAN_DAYS,
  READ_PER_DAY,
  QUIZ_SIZE,
  PASS_SCORE,
  dayQuestions,
  isDayUnlocked,
  orderForPlan,
  questionsForDay,
  readDayUnlocked,
} from "../js/plan.js";

export const READ_PLANS = {
  react: { key: "interview-react-plan-v1", perDay: 25, days: 10, title: "React" },
  "react-native": { key: "interview-react-native-plan-v1", perDay: 25, title: "React Native" },
};

export const PLAN_STORAGE_KEY = "interview-js-plan-v1";
export const NOTES_KEY = "interview-notes-v1";
export const ACTIVITY_KEY = "interview-activity-v1";
export const VISIT_KEY = "interview-visits-v1";
export const BOOKMARK_KEY = "interview-bookmarks-v1";
export const GOAL_KEY = "interview-goal-v1";

const minsByLevel = { basic: 10, intermediate: 15, advanced: 20 };

export function topicById(topicId) {
  return topics.find((topic) => topic.id === topicId) || null;
}

export function questionsOf(topicId) {
  const module = topicById(topicId);
  if (!module) return [];
  return module.sections.flatMap((section) =>
    section.questions.map((item) => ({
      ...item,
      topicId,
      level: item.level || section.level,
      section: section.title,
      source: "seed",
    }))
  );
}

export function withNotes(topicId, notes) {
  const seeded = questionsOf(topicId);
  const custom = (notes || [])
    .filter((note) => note.topicId === topicId)
    .map((note) => ({ ...note, source: "you", section: "Your notes" }));
  return [...seeded, ...custom];
}

export function planQuestionList() {
  return orderForPlan(questionsOf(PLAN_TOPIC));
}

export function readPlanDayCount(topicId) {
  const config = READ_PLANS[topicId];
  if (!config) return 1;
  if (config.days) return config.days;
  return Math.max(1, Math.ceil(questionsOf(topicId).length / config.perDay));
}

export function readCount(ids, questions) {
  const today = new Set(questions.map((item) => item.id));
  let count = 0;
  for (const id of ids || []) if (today.has(id)) count += 1;
  return count;
}

export function dayComplete(ids, questions) {
  const read = new Set(ids || []);
  return questions.length > 0 && questions.every((item) => read.has(item.id));
}

export function selectedJsDay(plan) {
  const day = Number(plan.selectedDay) || 1;
  return isDayUnlocked(day, plan.results) ? day : 1;
}

export function selectedReadDay(topicId, plan) {
  const questions = questionsOf(topicId);
  const perDay = READ_PLANS[topicId].perDay;
  let day = Math.min(readPlanDayCount(topicId), Math.max(1, Number(plan.selectedDay) || 1));
  while (day > 1 && !readDayUnlocked(day, plan.read, questions, perDay)) day -= 1;
  return day;
}

export function countedReads(topicId, state) {
  if (topicId === PLAN_TOPIC) {
    const questions = planQuestionList();
    let done = 0;
    for (let day = 1; day <= PLAN_DAYS; day += 1) {
      const today = dayQuestions(questions, day);
      done += readCount(state.plan.read[day], today);
    }
    const passed = Object.values(state.plan.results).filter((item) => item?.passed).length;
    return { done, total: questions.length, days: PLAN_DAYS, passed };
  }
  const config = READ_PLANS[topicId];
  if (config) {
    const questions = questionsOf(topicId);
    const days = readPlanDayCount(topicId);
    const plan = state.readPlans[topicId];
    let done = 0;
    let doneDays = 0;
    for (let day = 1; day <= days; day += 1) {
      const today = questionsForDay(questions, day, config.perDay);
      const hits = readCount(plan.read[day], today);
      done += hits;
      if (today.length && hits === today.length) doneDays += 1;
    }
    return { done, total: questions.length, days, doneDays };
  }
  const questions = questionsOf(topicId);
  const seen = new Set(state.visits[topicId] || []);
  return { done: questions.filter((item) => seen.has(item.id)).length, total: questions.length };
}

export function catalogStats(state) {
  const rows = topics.map((topic) => ({ topic, ...countedReads(topic.id, state) }));
  const done = rows.reduce((sum, row) => sum + row.done, 0);
  const total = rows.reduce((sum, row) => sum + row.total, 0);
  const pct = total ? Math.round((done / total) * 100) : 0;
  return { rows, done, total, pct, remaining: Math.max(0, total - done) };
}

export function daySnapshot(topicId, state) {
  const config = READ_PLANS[topicId];
  const questions = questionsOf(topicId);
  const days = readPlanDayCount(topicId);
  const plan = state.readPlans[topicId];
  let day = 1;
  while (day < days) {
    const today = questionsForDay(questions, day, config.perDay);
    if (!dayComplete(plan.read[day], today)) break;
    day += 1;
  }
  const today = questionsForDay(questions, day, config.perDay);
  return {
    day,
    done: readCount(plan.read[day], today),
    total: today.length,
    path: `/${topicId}/day/${day}`,
    next: today.find((item) => !new Set(plan.read[day] || []).has(item.id)),
  };
}

export function continueTarget(state) {
  const jsDay = selectedJsDay(state.plan);
  const jsToday = dayQuestions(planQuestionList(), jsDay);
  const jsRead = new Set(state.plan.read[jsDay] || []);
  const jsNext = jsToday.find((item) => !jsRead.has(item.id));
  if (jsNext) {
    return { path: `/javascript/day/${jsDay}`, title: `JavaScript · Day ${jsDay}`, detail: jsNext.q };
  }
  if (!state.plan.results[jsDay]?.passed) {
    return {
      path: `/javascript/day/${jsDay}`,
      quiz: true,
      title: `JavaScript practice · Day ${jsDay}`,
      detail: `Score more than ${PASS_SCORE} of ${QUIZ_SIZE} to open the next day.`,
    };
  }
  for (const topicId of ["react", "react-native"]) {
    const snap = daySnapshot(topicId, state);
    if (snap.next) return { path: snap.path, title: `${READ_PLANS[topicId].title} · Day ${snap.day}`, detail: snap.next.q };
  }
  for (const topicId of ["strings", "output"]) {
    const questions = questionsOf(topicId);
    const seen = new Set(state.visits[topicId] || []);
    const next = questions.find((item) => !seen.has(item.id));
    if (next) return { path: `/${topicId}`, focus: next.id, title: topicById(topicId).title, detail: next.q };
  }
  return { path: "/progress", title: "You are caught up", detail: "Review any topic from the dashboard." };
}

export function todayItems(state) {
  const jsDay = selectedJsDay(state.plan);
  const jsToday = dayQuestions(planQuestionList(), jsDay);
  const jsDone = readCount(state.plan.read[jsDay], jsToday);
  const react = daySnapshot("react", state);
  const items = [
    {
      path: `/javascript/day/${jsDay}`,
      title: `JavaScript · Day ${jsDay}`,
      detail: `${jsDone}/${jsToday.length} questions`,
      done: jsDone === jsToday.length,
    },
    {
      path: react.path,
      title: `React · Day ${react.day}`,
      detail: `${react.done}/${react.total} questions`,
      done: react.total > 0 && react.done === react.total,
    },
  ];
  if (jsDone === jsToday.length && !state.plan.results[jsDay]?.passed) {
    items.push({
      path: `/javascript/day/${jsDay}`,
      quiz: true,
      title: "Mock interview",
      detail: `${QUIZ_SIZE} questions · 30 mins`,
      done: false,
    });
  } else {
    const native = daySnapshot("react-native", state);
    items.push({
      path: native.path,
      title: `React Native · Day ${native.day}`,
      detail: `${native.done}/${native.total} questions`,
      done: native.total > 0 && native.done === native.total,
    });
  }
  return items;
}

export function locateQuestion(id, notes) {
  for (const topic of topics) {
    const questions = topic.id === PLAN_TOPIC ? planQuestionList() : withNotes(topic.id, notes);
    const index = questions.findIndex((item) => item.id === id);
    if (index < 0) continue;
    if (topic.id === PLAN_TOPIC) {
      const day = Math.floor(index / READ_PER_DAY) + 1;
      return { topic, question: questions[index], path: `/javascript/day/${day}`, day };
    }
    if (READ_PLANS[topic.id]) {
      const day = Math.floor(index / READ_PLANS[topic.id].perDay) + 1;
      return { topic, question: questions[index], path: `/${topic.id}/day/${day}`, day };
    }
    return { topic, question: questions[index], path: `/${topic.id}` };
  }
  return null;
}

export function searchQuestions(needle) {
  const query = needle.trim().toLowerCase();
  if (query.length < 2) return [];
  const matches = [];
  for (const topic of topics) {
    const questions = topic.id === PLAN_TOPIC ? planQuestionList() : questionsOf(topic.id);
    for (const question of questions) {
      if (!question.q.toLowerCase().includes(query)) continue;
      const located = locateQuestion(question.id, []);
      matches.push({ topic, question, path: located?.path || `/${topic.id}` });
      if (matches.length === 8) return matches;
    }
  }
  return matches;
}

export function minutes(item) {
  return minsByLevel[item.level] || 12;
}

export function timeAgo(timestamp) {
  const minutesAgo = Math.max(0, Math.round((Date.now() - timestamp) / 60000));
  if (minutesAgo < 1) return "Just now";
  if (minutesAgo < 60) return `${minutesAgo} min ago`;
  const hours = Math.round(minutesAgo / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

export function activityLabel(kind) {
  if (kind === "completed") return "Completed";
  if (kind === "passed") return "Passed";
  if (kind === "quiz") return "Attempted";
  return "Opened";
}

export function quizScore(quiz) {
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

export function resolvedJsDay(plan, requested) {
  const fallback = selectedJsDay(plan);
  const day = Number(requested);
  if (!Number.isInteger(day) || day < 1) return fallback;
  return isDayUnlocked(day, plan.results) ? Math.min(day, PLAN_DAYS) : fallback;
}

export function resolvedReadDay(topicId, plan, requested) {
  const questions = questionsOf(topicId);
  const perDay = READ_PLANS[topicId].perDay;
  const fallback = selectedReadDay(topicId, plan);
  const day = Number(requested);
  if (!Number.isInteger(day) || day < 1) return fallback;
  if (!readDayUnlocked(day, plan.read, questions, perDay)) return fallback;
  return Math.min(day, readPlanDayCount(topicId));
}

export function difficultyStats(state) {
  let easyTotal = 0, easyDone = 0;
  let medTotal = 0, medDone = 0;
  let hardTotal = 0, hardDone = 0;

  for (const topic of topics) {
    const questions = questionsOf(topic.id);
    const readSet = new Set();
    if (topic.id === PLAN_TOPIC) {
      for (const day in state?.plan?.read || {}) {
        (state.plan.read[day] || []).forEach((id) => readSet.add(id));
      }
    } else if (READ_PLANS[topic.id]) {
      const plan = state?.readPlans?.[topic.id];
      for (const day in plan?.read || {}) {
        (plan.read[day] || []).forEach((id) => readSet.add(id));
      }
    } else {
      (state?.visits?.[topic.id] || []).forEach((id) => readSet.add(id));
    }

    for (const q of questions) {
      const isDone = readSet.has(q.id);
      if (q.level === "basic") {
        easyTotal++;
        if (isDone) easyDone++;
      } else if (q.level === "advanced") {
        hardTotal++;
        if (isDone) hardDone++;
      } else {
        medTotal++;
        if (isDone) medDone++;
      }
    }
  }

  return {
    easy: { done: easyDone, total: easyTotal, pct: easyTotal ? Math.round((easyDone / easyTotal) * 100) : 0 },
    medium: { done: medDone, total: medTotal, pct: medTotal ? Math.round((medDone / medTotal) * 100) : 0 },
    hard: { done: hardDone, total: hardTotal, pct: hardTotal ? Math.round((hardDone / hardTotal) * 100) : 0 },
  };
}

export { topics, PLAN_TOPIC, PLAN_DAYS, READ_PER_DAY, QUIZ_SIZE, PASS_SCORE, isDayUnlocked, dayQuestions, questionsForDay, readDayUnlocked };
