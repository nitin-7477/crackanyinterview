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
  buildQuizItems,
  quizMatchesBank,
  QUIZ_BANK_VERSION,
  emptyPlan,
  questionsForDay,
  readDayUnlocked,
} from "./plan.js";

const STORAGE_KEY = "interview-notes-v1";
const ACCOUNTS_KEY = "interview-accounts-v1";
const SESSION_KEY = "interview-session-v1";
const ACTIVITY_KEY = "interview-activity-v1";
const VISIT_KEY = "interview-visits-v1";
const BOOKMARK_KEY = "interview-bookmarks-v1";
const GOAL_KEY = "interview-goal-v1";
const FOCUS_KEY = "interview-focus";
const START_QUIZ_KEY = "interview-start-quiz";
const PLAN_KEY = "interview-js-plan-v1";
const READ_PLANS = {
  react: {
    key: "interview-react-plan-v1",
    perDay: 25,
    days: 10,
    title: "React",
  },
  "react-native": {
    key: "interview-react-native-plan-v1",
    perDay: 25,
    title: "React Native",
  },
};
const minsByLevel = { basic: 10, intermediate: 15, advanced: 20 };
const levelLabel = { basic: "Beginner", intermediate: "Intermediate", advanced: "Advanced" };

const state = {
  topicId: topics[0].id,
  questionId: firstQuestionId(topics[0]),
  notes: loadNotes(),
  editingId: null,
  plan: loadPlan(),
  readPlans: Object.fromEntries(
    Object.entries(READ_PLANS).map(([id, config]) => [id, loadReadPlan(config.key)])
  ),
};

const els = {
  moduleNav: document.getElementById("module-nav"),
  sidebarNav: document.getElementById("sidebar-nav"),
  moduleTitle: document.getElementById("module-title"),
  moduleTagline: document.getElementById("module-tagline"),
  progressLabel: document.getElementById("progress-label"),
  progressPct: document.getElementById("progress-pct"),
  stepDots: document.getElementById("step-dots"),
  progressBar: document.getElementById("progress-bar"),
  timeRemain: document.getElementById("time-remain"),
  crumb: document.getElementById("crumb"),
  levelPill: document.getElementById("level-pill"),
  callout: document.getElementById("callout"),
  lessonTitle: document.getElementById("lesson-title"),
  lessonLede: document.getElementById("lesson-lede"),
  heroMeta: document.getElementById("hero-meta"),
  quizHeading: document.getElementById("quiz-heading"),
  quizList: document.getElementById("quiz-list"),
  takeawaysList: document.getElementById("takeaways-list"),
  firstTopicBtn: document.getElementById("first-topic-btn"),
  editor: document.getElementById("editor"),
  form: document.getElementById("editor-form"),
  editorTitle: document.getElementById("editor-title"),
  editorClose: document.getElementById("editor-close"),
  editorCancel: document.getElementById("editor-cancel"),
  authScreen: document.getElementById("auth-screen"),
  authCard: document.getElementById("auth-card"),
  appBody: document.querySelector(".app-body"),
  logoutBtn: document.getElementById("logout-btn"),
  header: document.querySelector(".app-header"),
  logo: document.querySelector(".logo"),
  home: document.getElementById("home"),
  homeNav: document.getElementById("home-nav"),
  homeMain: document.getElementById("home-main"),
  headerTools: document.getElementById("header-tools"),
  searchForm: document.getElementById("dash-search"),
  searchInput: document.getElementById("dash-search-input"),
  searchResults: document.getElementById("search-results"),
  accountBtn: document.getElementById("account-btn"),
  accountPop: document.getElementById("account-pop"),
  accountName: document.getElementById("account-name"),
  accountInitials: document.getElementById("account-initials"),
};

function loadNotes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.notes));
}

function loadPlan() {
  try {
    const saved = JSON.parse(localStorage.getItem(PLAN_KEY) || "null");
    if (!saved || typeof saved !== "object") return emptyPlan();
    return {
      ...emptyPlan(),
      ...saved,
      read: saved.read || {},
      results: saved.results || {},
    };
  } catch {
    return emptyPlan();
  }
}

function savePlan() {
  localStorage.setItem(PLAN_KEY, JSON.stringify(state.plan));
}

function loadReadPlan(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");
    if (!saved || typeof saved !== "object") return { selectedDay: 1, read: {} };
    return { selectedDay: saved.selectedDay || 1, read: saved.read || {} };
  } catch {
    return { selectedDay: 1, read: {} };
  }
}

function readPlanConfig() {
  return READ_PLANS[state.topicId] || null;
}

function activeReadPlan() {
  return state.readPlans[state.topicId];
}

function saveReadPlan() {
  const config = readPlanConfig();
  localStorage.setItem(config.key, JSON.stringify(activeReadPlan()));
}

function isPlanTopic() {
  return state.topicId === PLAN_TOPIC;
}

function isReadPlan() {
  return Boolean(readPlanConfig());
}

function readPlanQuestions() {
  const module = topics.find((topic) => topic.id === state.topicId);
  return module.sections.flatMap((section) =>
    section.questions.map((item) => ({
      ...item,
      level: item.level || section.level,
      section: section.title,
      source: "seed",
    }))
  );
}

function readPlanPerDay() {
  return readPlanConfig().perDay;
}

function readPlanDayCount() {
  const config = readPlanConfig();
  if (config.days) return config.days;
  return Math.max(1, Math.ceil(readPlanQuestions().length / config.perDay));
}

function selectedReadDay() {
  const questions = readPlanQuestions();
  const plan = activeReadPlan();
  let day = Number(plan.selectedDay) || 1;
  day = Math.min(readPlanDayCount(), Math.max(1, day));
  while (day > 1 && !readDayUnlocked(day, plan.read, questions, readPlanPerDay())) {
    day -= 1;
  }
  return day;
}

function readPlanIds(day) {
  return new Set(activeReadPlan().read[day] || []);
}

function readPlanToday(day) {
  return questionsForDay(readPlanQuestions(), day, readPlanPerDay());
}

function readPlanProgress(day) {
  const today = new Set(readPlanToday(day).map((item) => item.id));
  let count = 0;
  for (const id of readPlanIds(day)) {
    if (today.has(id)) count += 1;
  }
  return count;
}

function readPlanDayComplete(day) {
  const ids = readPlanToday(day).map((item) => item.id);
  const read = readPlanIds(day);
  return ids.length > 0 && ids.every((id) => read.has(id));
}

function completedReadDays() {
  let count = 0;
  for (let day = 1; day <= readPlanDayCount(); day += 1) {
    if (readPlanDayComplete(day)) count += 1;
  }
  return count;
}

function daySwitcher(total, current, unlocked, complete) {
  const chips = Array.from({ length: total }, (_, index) => {
    const number = index + 1;
    const classes = ["day-chip"];
    if (number === current) classes.push("is-current");
    else if (complete(number)) classes.push("is-done");
    return `<button type="button" class="${classes.join(" ")}" data-open-day="${number}" ${
      unlocked(number) ? "" : "disabled"
    }>${number}</button>`;
  }).join("");
  return `<div class="day-switch" aria-label="Days">${chips}</div>`;
}

function openReadDay(day) {
  const questions = readPlanQuestions();
  const plan = activeReadPlan();
  if (!readDayUnlocked(day, plan.read, questions, readPlanPerDay())) return;
  plan.selectedDay = day;
  state.questionId = questionsForDay(questions, day, readPlanPerDay())[0]?.id;
  saveReadPlan();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function planQuestions() {
  const module = topics.find((topic) => topic.id === PLAN_TOPIC);
  const questions = module.sections.flatMap((section) =>
    section.questions.map((item) => ({
      ...item,
      level: item.level || section.level,
      section: section.title,
      source: "seed",
    }))
  );
  return orderForPlan(questions);
}

function selectedDay() {
  const day = Number(state.plan.selectedDay) || 1;
  return isDayUnlocked(day, state.plan.results) ? day : 1;
}

function openDay(day) {
  if (!isDayUnlocked(day, state.plan.results)) return;
  state.plan.selectedDay = day;
  state.plan.activeQuiz = null;
  state.questionId = dayQuestions(planQuestions(), day)[0]?.id;
  savePlan();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function readIds(day) {
  return new Set(state.plan.read[day] || []);
}

function readProgress(day) {
  const today = new Set(dayQuestions(planQuestions(), day).map((item) => item.id));
  let count = 0;
  for (const id of readIds(day)) {
    if (today.has(id)) count += 1;
  }
  return count;
}

function dayIsRead(day) {
  const ids = dayQuestions(planQuestions(), day).map((item) => item.id);
  const read = readIds(day);
  return ids.length > 0 && ids.every((id) => read.has(id));
}

function currentModule() {
  return topics.find((topic) => topic.id === state.topicId);
}

function moduleIndex() {
  return topics.findIndex((topic) => topic.id === state.topicId);
}

function allQuestions(module = currentModule()) {
  const seeded = module.sections.flatMap((section) =>
    section.questions.map((item) => ({
      ...item,
      topicId: module.id,
      level: item.level || section.level,
      section: section.title,
      source: "seed",
    }))
  );
  const custom = state.notes
    .filter((note) => note.topicId === module.id)
    .map((note) => ({ ...note, source: "you", section: "Your notes" }));
  return [...seeded, ...custom];
}

function firstQuestionId(module) {
  return module.sections[0].questions[0].id;
}

function minutes(item) {
  return minsByLevel[item.level] || 12;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

const COPY_ICON = `<svg class="copy-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15V5a2 2 0 0 1 2-2h10"></path></svg><svg class="copied-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 9.2 17 19 7"></path></svg>`;

const JS_KEYWORDS = new Set(
  "let const var function return if else for while do switch case break continue new class extends super this typeof instanceof in of try catch finally throw async await yield import export from default true false null undefined".split(
    " "
  )
);

function highlightJs(escaped) {
  const text = escaped
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
  let html = "";
  let index = 0;
  const push = (kind, value) => {
    html += `<span class="tok-${kind}">${escapeHtml(value)}</span>`;
  };
  while (index < text.length) {
    if (text.startsWith("//", index)) {
      const end = text.indexOf("\n", index);
      const stop = end === -1 ? text.length : end;
      push("comment", text.slice(index, stop));
      index = stop;
      continue;
    }
    if (text.startsWith("/*", index)) {
      const end = text.indexOf("*/", index + 2);
      const stop = end === -1 ? text.length : end + 2;
      push("comment", text.slice(index, stop));
      index = stop;
      continue;
    }
    const quote = text[index];
    if (quote === '"' || quote === "'" || quote === "`") {
      let cursor = index + 1;
      while (cursor < text.length) {
        if (text[cursor] === "\\") {
          cursor += 2;
          continue;
        }
        if (text[cursor] === quote) {
          cursor += 1;
          break;
        }
        cursor += 1;
      }
      push("string", text.slice(index, cursor));
      index = cursor;
      continue;
    }
    if (text[index] === "/") {
      const previous = text.slice(0, index).trimEnd().slice(-1);
      if (!previous || "=([{,;:!&|?}".includes(previous)) {
        let cursor = index + 1;
        while (cursor < text.length && text[cursor] !== "\n") {
          if (text[cursor] === "\\") {
            cursor += 2;
            continue;
          }
          if (text[cursor] === "/") {
            cursor += 1;
            break;
          }
          cursor += 1;
        }
        while (cursor < text.length && /[a-z]/i.test(text[cursor])) cursor += 1;
        push("string", text.slice(index, cursor));
        index = cursor;
        continue;
      }
    }
    const before = index === 0 ? "" : text[index - 1];
    if (/\d/.test(text[index]) && (index === 0 || /[\s([{\],+\-*=<>!&|?:]/.test(before) || before === "/")) {
      const match = text.slice(index).match(/^\d[\d._]*/);
      push("number", match[0]);
      index += match[0].length;
      continue;
    }
    if (/[A-Za-z_$]/.test(text[index])) {
      const match = text.slice(index).match(/^[A-Za-z_$][\w$]*/);
      const word = match[0];
      const call = /^\s*\(/.test(text.slice(index + word.length));
      if (JS_KEYWORDS.has(word)) push("key", word);
      else if (call || word === "console") push("fn", word);
      else push("id", word);
      index += word.length;
      continue;
    }
    push("plain", text[index]);
    index += 1;
  }
  return html;
}

function wrapCodeBlocks(html) {
  const withCode = html.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (_, code) => {
    return `<div class="code-panel">
      <div class="code-head">
        <span class="code-lang"><span aria-hidden="true">&lt;/&gt;</span> JavaScript</span>
        <button type="button" class="copy-btn" aria-label="Copy">${COPY_ICON}</button>
      </div>
      <pre><code>${highlightJs(code)}</code></pre>
    </div>`;
  });
  return withCode.replace(
    /<p><strong>Output<\/strong><\/p>\s*<p><code>([\s\S]*?)<\/code><\/p>/g,
    (_, output) => `<p class="output-label">Output:</p>
      <div class="output-panel">
        <button type="button" class="copy-btn" aria-label="Copy output">${COPY_ICON}</button>
        <pre><code>${output.replace(/<br\s*\/?>/gi, "\n")}</code></pre>
      </div>`
  );
}

function renderModules() {
  els.moduleNav.innerHTML = topics
    .map(
      (topic) => `
      <button type="button" class="module-btn ${
        topic.id === state.topicId ? "is-active" : ""
      }" data-module="${topic.id}">${topic.title}</button>`
    )
    .join("");
}

function renderSidebar() {
  if (isPlanTopic()) {
    renderPlanSidebar();
    return;
  }
  if (isReadPlan()) {
    renderReadPlanSidebar();
    return;
  }
  const module = currentModule();
  const items = allQuestions();
  const index = Math.max(
    0,
    items.findIndex((item) => item.id === state.questionId)
  );
  const pct = Math.round((index / items.length) * 100);
  const remainingMins = items.slice(index).reduce((sum, item) => sum + minutes(item), 0);

  els.moduleTitle.textContent = `Module ${moduleIndex() + 1}`;
  els.moduleTagline.textContent = `${module.title} · ${module.heading}`;
  els.progressLabel.textContent = `${index} / ${items.length} topics`;
  els.progressPct.textContent = `${pct}%`;
  els.progressBar.style.width = `${pct}%`;
  els.timeRemain.textContent = `~${remainingMins} min remaining`;
  els.stepDots.innerHTML = items
    .map(
      (_, i) => `<span class="${i <= index ? "is-on" : ""}"></span>`
    )
    .join("");

  els.sidebarNav.innerHTML = items
    .map(
      (item, i) => `
      <button type="button" class="side-item ${
        item.id === state.questionId ? "is-active" : ""
      }" data-question="${item.id}">
        <span class="side-ico" aria-hidden="true">${topicIcon(i)}</span>
        <span class="side-copy">
          <strong>${i + 1}. ${escapeHtml(item.q)}</strong>
          <small>${minutes(item)} min</small>
        </span>
      </button>`
    )
    .join("");
}

function topicIcon(index) {
  const icons = [
    `<svg viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 10-14h-7l0-6z"/></svg>`,
    `<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L11 4.93"/><path d="M14 11a5 5 0 0 0-7.07 0L4.81 13.12a5 5 0 0 0 7.07 7.07L13 19.07"/></svg>`,
    `<svg viewBox="0 0 24 24"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/></svg>`,
    `<svg viewBox="0 0 24 24"><path d="M21 8 12 3 3 8l9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/></svg>`,
    `<svg viewBox="0 0 24 24"><path d="M12 3 4 12l8 9 8-9-8-9z"/></svg>`,
    `<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-2.64-6.36L21 8"/><path d="M21 3v5h-5"/></svg>`,
    `<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>`,
    `<svg viewBox="0 0 24 24"><path d="M5 9h14M5 15h14M9 5l-4 4 4 4M15 11l4 4-4 4"/></svg>`,
  ];
  return icons[index % icons.length];
}

function renderLesson() {
  if (isPlanTopic()) {
    renderPlanLesson();
    return;
  }
  if (isReadPlan()) {
    renderReadPlanLesson();
    return;
  }
  const module = currentModule();
  const items = allQuestions();
  const current = items.find((item) => item.id === state.questionId) || items[0];
  state.questionId = current.id;

  const totalMins = items.reduce((sum, item) => sum + minutes(item), 0);
  els.crumb.textContent = `Interview prep · Module ${moduleIndex() + 1} of ${topics.length}`;
  els.levelPill.textContent = "Basic to Advanced";
  els.callout.textContent = module.tip;
  els.lessonTitle.textContent = `${module.title} Interview Questions`;
  els.lessonLede.textContent = module.lede;
  els.heroMeta.innerHTML = `
    <span>${items.length} questions</span>
    <span>${module.heading}</span>
    <span>~${totalMins} min to review</span>`;
  els.quizHeading.textContent = `${module.title} questions and answers`;
  els.takeawaysList.closest(".takeaways").hidden = false;
  els.takeawaysList.innerHTML = (module.takeaways || [])
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join("");

  els.quizList.innerHTML = items
    .map((item, i) => {
      const raw =
        item.source === "you" ? `<p>${escapeHtml(item.a).replaceAll("\n", "<br>")}</p>` : item.a;
      const answer = wrapCodeBlocks(raw);
      const actions =
        item.source === "you"
          ? `<div class="card-actions">
              <button type="button" class="btn" data-edit="${item.id}">Edit</button>
              <button type="button" class="btn" data-delete="${item.id}">Delete</button>
            </div>`
          : "";
      return `
        <article class="qa ${item.id === state.questionId ? "is-active" : ""}" id="q-${item.id}">
          <div class="qa-q">
            <span class="badge q">Q</span>
            <div>
              <strong>${i + 1}. ${escapeHtml(item.q)}</strong>
              ${bookmarkButton(item.id)}
              <span class="qa-meta">${levelLabel[item.level] || item.level} · ${escapeHtml(item.section)}</span>
            </div>
          </div>
          <div class="qa-a">
            <span class="badge a">A</span>
            <div class="answer">${answer}${actions}</div>
          </div>
        </article>`;
    })
    .join("");
}

function renderReadPlanSidebar() {
  const day = selectedReadDay();
  const today = readPlanToday(day);
  const finished = completedReadDays();
  const totalDays = readPlanDayCount();
  const perDay = readPlanPerDay();
  const title = readPlanConfig().title;
  const pct = Math.round((finished / totalDays) * 100);
  const readCount = readPlanProgress(day);
  const read = readPlanIds(day);
  const nextUnlocked = readPlanDayComplete(day) && day < totalDays;

  els.moduleTitle.textContent = `${totalDays}-day plan`;
  els.moduleTagline.textContent = `${title} · ${perDay} questions a day`;
  els.progressLabel.textContent = `${finished} / ${totalDays} days`;
  els.progressPct.textContent = `${pct}%`;
  els.progressBar.style.width = `${pct}%`;
  els.timeRemain.textContent =
    finished === totalDays
      ? "Plan complete"
      : `Day ${day} · ${Math.min(readCount, today.length)}/${today.length} read`;
  els.stepDots.innerHTML = Array.from({ length: totalDays }, (_, index) => {
    const number = index + 1;
    const on = number === day || readPlanDayComplete(number);
    return `<span class="${on ? "is-on" : ""}"></span>`;
  }).join("");

  const label = document.querySelector(".topics-label");
  if (label) label.textContent = `Day ${day}`;

  if (!today.some((item) => item.id === state.questionId)) {
    state.questionId = today[0]?.id;
  }

  const questionList = today
    .map((item, index) => {
      const number = (day - 1) * perDay + index + 1;
      return `
      <button type="button" class="side-item ${item.id === state.questionId ? "is-active" : ""}" data-question="${item.id}">
        <span class="side-ico" aria-hidden="true">${topicIcon(index)}</span>
        <span class="side-copy">
          <strong>${number}. ${escapeHtml(item.q)}</strong>
          <small>${read.has(item.id) ? "Complete" : escapeHtml(item.section)}</small>
        </span>
      </button>`;
    })
    .join("");

  const nextDay =
    day < totalDays
      ? `<button type="button" class="next-day" data-next-day ${nextUnlocked ? "" : "disabled"}>
          Day ${day + 1}
        </button>
        <p class="next-day-hint">${
          nextUnlocked
            ? `All ${today.length} questions are read. Open Day ${day + 1}.`
            : `Read all ${today.length} questions to open Day ${day + 1}. ${readCount}/${today.length} read.`
        }</p>`
      : `<p class="next-day-hint">${
          readPlanDayComplete(day) ? `You finished the ${totalDays}-day plan.` : "This is the last day."
        }</p>`;

  const switcher = daySwitcher(
    totalDays,
    day,
    (number) => readDayUnlocked(number, activeReadPlan().read, readPlanQuestions(), readPlanPerDay()),
    (number) => readPlanDayComplete(number)
  );

  els.sidebarNav.innerHTML = `${switcher}${questionList}<div class="next-day-wrap">${nextDay}</div>`;
  els.sidebarNav.querySelector(".side-item.is-active")?.scrollIntoView({ block: "nearest" });
}

function renderReadPlanLesson() {
  const day = selectedReadDay();
  const today = readPlanToday(day);
  const read = readPlanIds(day);
  const totalDays = readPlanDayCount();
  const title = readPlanConfig().title;
  const startNumber = (day - 1) * readPlanPerDay() + 1;
  const endNumber = startNumber + today.length - 1;
  const done = readPlanDayComplete(day);

  els.crumb.textContent = `${title} plan · Day ${day} of ${totalDays}`;
  els.levelPill.textContent = "Read";
  els.callout.textContent = `Read these ${today.length} questions carefully. The next day opens only after every one is marked as read.`;
  els.lessonTitle.textContent = `Day ${day}`;
  els.lessonLede.textContent = `Questions ${startNumber}–${endNumber}. Mark each one complete after you have read it.`;
  els.heroMeta.innerHTML = `
    <span>${today.length} to read</span>
    <span>${readPlanProgress(day)}/${today.length} read</span>
    <span>Day ${day} of ${totalDays}</span>`;
  els.quizHeading.textContent = "Read deeply";
  els.takeawaysList.closest(".takeaways").hidden = true;

  const status = done
    ? `<p class="plan-note is-pass">${
        day < totalDays
          ? `All ${today.length} questions are read. Day ${day + 1} is unlocked.`
          : `You finished the ${totalDays}-day plan.`
      }</p>`
    : `<p class="plan-note">${readPlanProgress(day)}/${today.length} marked as read.</p>`;

  const cards = today
    .map((item, index) => {
      const answer = wrapCodeBlocks(item.a);
      const complete = read.has(item.id);
      const number = startNumber + index;
      return `
        <article class="qa ${complete ? "is-read" : ""}" id="q-${item.id}">
          <div class="qa-q">
            <span class="badge q">Q</span>
            <div>
              <strong>${number}. ${escapeHtml(item.q)}</strong>
              <span class="qa-meta">${escapeHtml(item.section)}</span>
            </div>
          </div>
          <div class="qa-a">
            <span class="badge a">A</span>
            <div class="answer">
              ${answer}
              <div class="plan-actions">
                ${bookmarkButton(item.id)}
                <button type="button" class="complete-btn ${complete ? "is-done" : ""}" data-read="${item.id}">
                  <span aria-hidden="true">✓</span>
                  ${complete ? "Completed" : "Mark as Complete"}
                </button>
              </div>
            </div>
          </div>
        </article>`;
    })
    .join("");

  const gate =
    day < totalDays
      ? `<div class="plan-gate">
          <button type="button" class="btn btn-primary" data-next-day ${done ? "" : "disabled"}>
            Open Day ${day + 1}
          </button>
          ${
            done
              ? ""
              : `<p class="plan-hint">Day ${day + 1} stays locked until all ${today.length} questions are marked as read.</p>`
          }
        </div>`
      : "";

  els.quizList.innerHTML = `${status}${cards}${gate}`;
}

function renderPlanSidebar() {
  const day = selectedDay();
  const questions = planQuestions();
  const passedDays = Object.values(state.plan.results).filter((result) => result.passed).length;
  const pct = Math.round((passedDays / PLAN_DAYS) * 100);
  const readCount = readProgress(day);
  const today = dayQuestions(questions, day);

  els.moduleTitle.textContent = "10-day plan";
  els.moduleTagline.textContent = `JavaScript · 20 to read, then a ${QUIZ_SIZE}-question practice`;
  els.progressLabel.textContent = `${passedDays} / ${PLAN_DAYS} days`;
  els.progressPct.textContent = `${pct}%`;
  els.progressBar.style.width = `${pct}%`;
  els.timeRemain.textContent =
    passedDays === PLAN_DAYS
      ? "Plan complete"
      : `Day ${day} · ${Math.min(readCount, today.length)}/${today.length} read`;
  els.stepDots.innerHTML = Array.from({ length: PLAN_DAYS }, (_, index) => {
    const number = index + 1;
    const on = number <= day || state.plan.results[number]?.passed;
    return `<span class="${on ? "is-on" : ""}"></span>`;
  }).join("");

  const label = document.querySelector(".topics-label");
  const quiz =
    state.plan.activeQuiz?.day === day && quizMatchesBank(state.plan.activeQuiz)
      ? state.plan.activeQuiz
      : null;
  if (label) label.textContent = quiz ? `Day ${day} quiz` : `Day ${day}`;

  const read = readIds(day);
  if (!today.some((item) => item.id === state.questionId)) {
    state.questionId = today[0]?.id;
  }

  const byId = new Map(questions.map((item) => [item.id, item]));
  const questionList = quiz
    ? quiz.items
        .map((item, index) => {
          const title = item.q || byId.get(item.id)?.q || "Practice question";
          const picked = quiz.picks?.[index];
          const status = Number.isInteger(picked) ? (quiz.marks[index] ? "Correct" : "Wrong") : "Not answered";
          return `
      <button type="button" class="side-item ${index === quiz.index ? "is-active" : ""}" data-quiz-index="${index}">
        <span class="side-ico" aria-hidden="true">${topicIcon(index)}</span>
        <span class="side-copy">
          <strong>${index + 1}. ${escapeHtml(title)}</strong>
          <small>${status}</small>
        </span>
      </button>`;
        })
        .join("")
    : today
        .map(
          (item, index) => `
      <button type="button" class="side-item ${item.id === state.questionId ? "is-active" : ""}" data-question="${item.id}">
        <span class="side-ico" aria-hidden="true">${topicIcon(index)}</span>
        <span class="side-copy">
          <strong>${index + 1}. ${escapeHtml(item.q)}</strong>
          <small>${read.has(item.id) ? "Complete" : escapeHtml(item.section)}</small>
        </span>
      </button>`
        )
        .join("");

  const liveScore = quiz ? settleQuiz(quiz) : null;
  if (quiz) {
    els.timeRemain.textContent = `Day ${day} · ${liveScore.correct}/${liveScore.total} correct`;
  }

  const nextUnlocked = isDayUnlocked(day + 1, state.plan.results);
  const nextDay =
    day < PLAN_DAYS
      ? `<button type="button" class="next-day" data-next-day ${nextUnlocked ? "" : "disabled"}>
          Day ${day + 1}
        </button>
        <p class="next-day-hint">${
          nextUnlocked
            ? `Day ${day} is complete. Your score: ${
                state.plan.results[day]?.score ?? liveScore?.correct ?? 0
              }/${state.plan.results[day]?.total ?? liveScore?.total ?? QUIZ_SIZE}. Open Day ${day + 1}.`
            : liveScore
              ? `Your score: ${liveScore.correct}/${liveScore.total}.${
                  liveScore.done
                    ? ""
                    : ` ${liveScore.total - liveScore.answered} still unanswered.`
                } Score more than ${PASS_SCORE} to open Day ${day + 1}.`
              : `Score more than ${PASS_SCORE} to open Day ${day + 1}.`
        }</p>`
      : `<p class="next-day-hint">${
          state.plan.results[day]?.passed ? "You finished the 10-day plan." : "This is the last day."
        }</p>`;

  const switcher = daySwitcher(
    PLAN_DAYS,
    day,
    (number) => isDayUnlocked(number, state.plan.results),
    (number) => Boolean(state.plan.results[number]?.passed)
  );

  els.sidebarNav.innerHTML = `${switcher}${questionList}<div class="next-day-wrap">${nextDay}</div>`;
  els.sidebarNav.querySelector(".side-item.is-active")?.scrollIntoView({ block: "nearest" });
}

function renderPlanLesson() {
  const day = selectedDay();
  const questions = planQuestions();
  const today = dayQuestions(questions, day);
  const read = readIds(day);
  const result = state.plan.results[day];
  let quiz = state.plan.activeQuiz?.day === day ? state.plan.activeQuiz : null;
  if (quiz && !quizMatchesBank(quiz)) {
    state.plan.activeQuiz = null;
    savePlan();
    quiz = null;
  }

  els.crumb.textContent = `JavaScript plan · Day ${day} of ${PLAN_DAYS}`;
  els.levelPill.textContent = quiz ? "Practice" : "Read";
  els.callout.textContent =
    `Read the 20 questions carefully. Practice is required, and the next day opens only after you score more than ${PASS_SCORE} out of ${QUIZ_SIZE}.`;
  els.lessonTitle.textContent = `Day ${day}`;
  els.lessonLede.textContent = quiz
    ? `Answer all ${QUIZ_SIZE} questions. Day ${day + 1} opens only after you score more than ${PASS_SCORE}.`
    : `Read these ${today.length} questions. The practice quiz unlocks after every one is marked as read.`;
  els.heroMeta.innerHTML = `
    <span>${today.length} to read</span>
    <span>${QUIZ_SIZE} practice questions</span>
    <span>Pass mark: more than ${PASS_SCORE}</span>`;
  els.quizHeading.textContent = quiz ? "Practice quiz" : "Read deeply";
  els.takeawaysList.closest(".takeaways").hidden = true;

  if (quiz) {
    const byId = new Map(questions.map((item) => [item.id, item]));
    const progress = renderQuizProgress(quiz);
    els.quizList.innerHTML = `${progress}${quiz.items
      .map((prompt, index) => renderQuizReview(prompt, index, byId.get(prompt.id), quiz))
      .join("")}${progress}`;
    return;
  }

  const status = result?.passed
    ? `<p class="plan-note is-pass">You scored ${result.score}/${result.total}. ${
        day < PLAN_DAYS ? `Day ${day + 1} is unlocked.` : "This was the last day."
      }</p>`
    : result
      ? `<p class="plan-note is-fail">You scored ${result.score}/${result.total}. Score more than ${PASS_SCORE} to unlock the next day.</p>`
      : "";

  const cards = today
    .map((item, index) => {
      const answer = wrapCodeBlocks(item.a);
      const done = read.has(item.id);
      return `
        <article class="qa ${done ? "is-read" : ""}" id="q-${item.id}">
          <div class="qa-q">
            <span class="badge q">Q</span>
            <div>
              <strong>${index + 1}. ${escapeHtml(item.q)}</strong>
              <span class="qa-meta">${escapeHtml(item.section)}</span>
            </div>
          </div>
          <div class="qa-a">
            <span class="badge a">A</span>
            <div class="answer">
              ${answer}
              <div class="plan-actions">
                ${bookmarkButton(item.id)}
                <button type="button" class="complete-btn ${done ? "is-done" : ""}" data-read="${item.id}">
                  <span aria-hidden="true">✓</span>
                  ${done ? "Completed" : "Mark as Complete"}
                </button>
              </div>
            </div>
          </div>
        </article>`;
    })
    .join("");

  const quizReady = dayIsRead(day);
  const start = `
    <div class="plan-gate">
      <p>${readProgress(day)}/${today.length} marked as read</p>
      <button type="button" class="btn btn-primary" data-start-quiz ${quizReady ? "" : "disabled"}>
        Start practice quiz
      </button>
      ${
        quizReady
          ? ""
          : `<p class="plan-hint">Practice stays locked until all ${today.length} questions are marked as read.</p>`
      }
    </div>`;

  els.quizList.innerHTML = `${status}${cards}${start}`;
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

function answeredCount(quiz) {
  return quizScore(quiz).answered;
}

function settleQuiz(quiz) {
  const score = quizScore(quiz);
  if (!score.done) return score;
  const previous = state.plan.results[quiz.day];
  const record = {
    score: Math.max(score.correct, previous?.score || 0),
    total: score.total,
    passed: score.correct > PASS_SCORE || Boolean(previous?.passed),
  };
  if (
    previous &&
    previous.score === record.score &&
    previous.total === record.total &&
    previous.passed === record.passed
  ) {
    return score;
  }
  state.plan.results[quiz.day] = record;
  savePlan();
  logActivity({
    topicId: "javascript",
    title: `Day ${quiz.day} practice · ${record.score}/${record.total}`,
    kind: record.passed ? "passed" : "quiz",
  });
  return score;
}

function renderQuizProgress(quiz) {
  const score = settleQuiz(quiz);
  const answered = score.answered;
  const done = score.done;
  if (!done) {
    const remaining = score.total - answered;
    return `<p class="plan-note">Your score: ${score.correct}/${score.total}. ${remaining} question${
      remaining === 1 ? "" : "s"
    } still unanswered. The next day opens after every question is answered and the score is more than ${PASS_SCORE}.</p>`;
  }
  const passed = score.correct > PASS_SCORE || Boolean(state.plan.results[quiz.day]?.passed);
  const nextStep =
    quiz.day < PLAN_DAYS
      ? `Day ${quiz.day + 1} is unlocked.`
      : "This was the last day.";
  const nextButton =
    passed && quiz.day < PLAN_DAYS
      ? `<button type="button" class="btn btn-primary" data-next-day>Open Day ${quiz.day + 1}</button>`
      : "";
  return `<div class="plan-gate">
    <p class="plan-note ${passed ? "is-pass" : "is-fail"}">Your score: ${score.correct}/${quiz.items.length}. ${
      passed ? nextStep : `Score more than ${PASS_SCORE} to unlock the next day.`
    }</p>
    ${nextButton}
    <button type="button" class="btn" data-start-quiz>Try again</button>
  </div>`;
}

function renderQuizReview(prompt, index, item, quiz) {
  const letters = ["A", "B", "C", "D"];
  if (!prompt?.options?.length) {
    return `<p class="plan-note is-fail">Question ${index + 1} is missing.</p>`;
  }
  const picked = quiz.picks?.[index];
  const answered = Number.isInteger(picked);
  const choices = prompt.options
    .map((option, optionIndex) => {
      let mark = "";
      if (answered && optionIndex === prompt.correct) mark = " is-correct";
      else if (answered && optionIndex === picked) mark = " is-wrong";
      return `
        <button type="button" class="choice${mark}" data-quiz-q="${index}" data-choice="${optionIndex}" ${answered ? "disabled" : ""}>
          <span>${letters[optionIndex]}</span>
          <span>${escapeHtml(option)}</span>
        </button>`;
    })
    .join("");
  const verdict = !answered
    ? ""
    : picked === prompt.correct
      ? `<p class="plan-note is-pass">Correct.</p>`
      : `<p class="plan-note is-fail">Wrong.</p>`;
  return `
    <article class="qa practice-card" id="quiz-q-${index}">
      <div class="qa-q">
        <span class="badge q">${index + 1}</span>
        <div>
          ${renderQuizQuestion(prompt.q || item?.q || "Practice question")}
          <span class="qa-meta">${answered ? (picked === prompt.correct ? "Correct" : "Wrong") : "Choose an answer"}</span>
        </div>
      </div>
      <div class="choices">${choices}</div>
      ${verdict ? `<div class="plan-actions">${verdict}</div>` : ""}
    </article>`;
}

function renderQuizQuestion(question) {
  const [title, ...rest] = String(question).split("\n");
  const code = rest.join("\n").trim();
  if (!code) return `<strong>${escapeHtml(title)}</strong>`;
  return `<strong>${escapeHtml(title)}</strong><pre class="quiz-code"><code>${highlightJs(escapeHtml(code))}</code></pre>`;
}

function loadJson(key, fallback) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "");
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function loadVisits() {
  const parsed = loadJson(VISIT_KEY, {});
  return parsed && typeof parsed === "object" ? parsed : {};
}

function loadActivity() {
  const parsed = loadJson(ACTIVITY_KEY, []);
  return Array.isArray(parsed) ? parsed : [];
}

function loadBookmarks() {
  const parsed = loadJson(BOOKMARK_KEY, []);
  return Array.isArray(parsed) ? parsed : [];
}

function logActivity(entry) {
  const items = loadActivity();
  items.unshift({ ...entry, at: Date.now() });
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(items.slice(0, 40)));
}

function trackVisit(topicId, questionId, title) {
  if (topicId !== "strings" && topicId !== "output") return;
  const visits = loadVisits();
  const seen = new Set(visits[topicId] || []);
  if (seen.has(questionId)) return;
  seen.add(questionId);
  visits[topicId] = [...seen];
  localStorage.setItem(VISIT_KEY, JSON.stringify(visits));
  logActivity({ topicId, questionId, title, kind: "opened" });
}

function isBookmarked(id) {
  return loadBookmarks().includes(id);
}

function toggleBookmark(id) {
  const items = loadBookmarks();
  const next = items.includes(id) ? items.filter((item) => item !== id) : [id, ...items];
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(next));
}

function bookmarkButton(id) {
  const on = isBookmarked(id);
  return `<button type="button" class="bookmark-btn ${on ? "is-on" : ""}" data-bookmark="${id}" aria-label="${
    on ? "Remove bookmark" : "Bookmark"
  }">${on ? "★" : "☆"}</button>`;
}

function currentAccount() {
  const session = loadSession();
  if (!session) return null;
  return loadAccounts().find((account) => account.email === session.email) || { name: "Learner", email: session.email };
}

function initials(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "IN";
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}

function questionsOf(topicId) {
  const module = topics.find((topic) => topic.id === topicId);
  return module.sections.flatMap((section) =>
    section.questions.map((item) => ({
      ...item,
      topicId,
      level: item.level || section.level,
      section: section.title,
    }))
  );
}

function countedReads(topicId) {
  if (topicId === PLAN_TOPIC) {
    const questions = planQuestions();
    let done = 0;
    for (let day = 1; day <= PLAN_DAYS; day += 1) {
      const ids = new Set(dayQuestions(questions, day).map((item) => item.id));
      for (const id of state.plan.read[day] || []) if (ids.has(id)) done += 1;
    }
    const passed = Object.values(state.plan.results).filter((item) => item?.passed).length;
    return { done, total: questions.length, days: PLAN_DAYS, passed };
  }
  const config = READ_PLANS[topicId];
  if (config) {
    const questions = questionsOf(topicId);
    const days = config.days || Math.max(1, Math.ceil(questions.length / config.perDay));
    const plan = state.readPlans[topicId];
    let done = 0;
    let doneDays = 0;
    for (let day = 1; day <= days; day += 1) {
      const today = questionsForDay(questions, day, config.perDay);
      const read = new Set(plan.read[day] || []);
      const hits = today.filter((item) => read.has(item.id)).length;
      done += hits;
      if (today.length && hits === today.length) doneDays += 1;
    }
    return { done, total: questions.length, days, doneDays };
  }
  const questions = questionsOf(topicId);
  const seen = new Set(loadVisits()[topicId] || []);
  return { done: questions.filter((item) => seen.has(item.id)).length, total: questions.length };
}

function catalogStats() {
  const rows = topics.map((topic) => ({ topic, ...countedReads(topic.id) }));
  const done = rows.reduce((sum, row) => sum + row.done, 0);
  const total = rows.reduce((sum, row) => sum + row.total, 0);
  const pct = total ? Math.round((done / total) * 100) : 0;
  return { rows, done, total, pct, remaining: Math.max(0, total - done) };
}

function daySnapshot(topicId) {
  const config = READ_PLANS[topicId];
  const questions = questionsOf(topicId);
  const days = config.days || Math.max(1, Math.ceil(questions.length / config.perDay));
  const plan = state.readPlans[topicId];
  let day = 1;
  while (day < days) {
    const today = questionsForDay(questions, day, config.perDay);
    const read = new Set(plan.read[day] || []);
    if (!today.every((item) => read.has(item.id))) break;
    day += 1;
  }
  const today = questionsForDay(questions, day, config.perDay);
  const read = new Set(plan.read[day] || []);
  return {
    day,
    done: today.filter((item) => read.has(item.id)).length,
    total: today.length,
    hash: `#/${topicId}/day/${day}`,
    next: today.find((item) => !read.has(item.id)),
  };
}

function continueTarget() {
  const jsDay = selectedDay();
  const jsToday = dayQuestions(planQuestions(), jsDay);
  const jsRead = new Set(state.plan.read[jsDay] || []);
  const jsNext = jsToday.find((item) => !jsRead.has(item.id));
  if (jsNext) {
    return {
      hash: `#/javascript/day/${jsDay}`,
      title: `JavaScript · Day ${jsDay}`,
      detail: jsNext.q,
    };
  }
  if (!state.plan.results[jsDay]?.passed) {
    return {
      hash: `#/javascript/day/${jsDay}`,
      quiz: true,
      title: `JavaScript practice · Day ${jsDay}`,
      detail: `Score more than ${PASS_SCORE} of ${QUIZ_SIZE} to open the next day.`,
    };
  }
  for (const topicId of ["react", "react-native"]) {
    const snap = daySnapshot(topicId);
    if (snap.next) {
      return { hash: snap.hash, title: `${READ_PLANS[topicId].title} · Day ${snap.day}`, detail: snap.next.q };
    }
  }
  for (const topicId of ["strings", "output"]) {
    const questions = questionsOf(topicId);
    const seen = new Set(loadVisits()[topicId] || []);
    const next = questions.find((item) => !seen.has(item.id));
    if (next) {
      return {
        hash: `#/${topicId}`,
        focus: next.id,
        title: topics.find((topic) => topic.id === topicId).title,
        detail: next.q,
      };
    }
  }
  return { hash: "#/progress", title: "You are caught up", detail: "Review any topic from the dashboard." };
}

function todayItems() {
  const jsDay = selectedDay();
  const jsToday = dayQuestions(planQuestions(), jsDay);
  const jsRead = new Set(state.plan.read[jsDay] || []);
  const jsDone = jsToday.filter((item) => jsRead.has(item.id)).length;
  const react = daySnapshot("react");
  const items = [
    {
      hash: `#/javascript/day/${jsDay}`,
      title: `JavaScript · Day ${jsDay}`,
      detail: `${jsDone}/${jsToday.length} questions`,
      done: jsDone === jsToday.length,
    },
    {
      hash: react.hash,
      title: `React · Day ${react.day}`,
      detail: `${react.done}/${react.total} questions`,
      done: react.total > 0 && react.done === react.total,
    },
  ];
  if (jsDone === jsToday.length && !state.plan.results[jsDay]?.passed) {
    items.push({
      hash: `#/javascript/day/${jsDay}`,
      quiz: true,
      title: "Mock interview",
      detail: `${QUIZ_SIZE} questions · 30 mins`,
      done: false,
    });
  } else {
    const native = daySnapshot("react-native");
    items.push({
      hash: native.hash,
      title: `React Native · Day ${native.day}`,
      detail: `${native.done}/${native.total} questions`,
      done: native.total > 0 && native.done === native.total,
    });
  }
  return items;
}

function timeAgo(timestamp) {
  const minutesAgo = Math.max(0, Math.round((Date.now() - timestamp) / 60000));
  if (minutesAgo < 1) return "Just now";
  if (minutesAgo < 60) return `${minutesAgo} min ago`;
  const hours = Math.round(minutesAgo / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

function activityLabel(kind) {
  if (kind === "completed") return "Completed";
  if (kind === "passed") return "Passed";
  if (kind === "quiz") return "Attempted";
  return "Opened";
}

const HOME_ICONS = {
  dashboard: `<svg viewBox="0 0 24 24"><path d="M4 11 12 4l8 7v9H4z"/><path d="M10 20v-6h4v6"/></svg>`,
  javascript: `<svg viewBox="0 0 24 24"><path d="m8 8-4 4 4 4M16 8l4 4-4 4"/></svg>`,
  strings: `<svg viewBox="0 0 24 24"><path d="M5 7h14M5 12h14M5 17h8"/></svg>`,
  output: `<svg viewBox="0 0 24 24"><path d="M7 3h8l4 4v14H7z"/><path d="M15 3v4h4"/></svg>`,
  react: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="9" ry="3.5"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)"/></svg>`,
  "react-native": `<svg viewBox="0 0 24 24"><rect x="8" y="2" width="8" height="20" rx="2"/><path d="M11 18h2"/></svg>`,
  mock: `<svg viewBox="0 0 24 24"><path d="M8 20h8M12 16v4M7 3h10v9a5 5 0 0 1-10 0z"/></svg>`,
  progress: `<svg viewBox="0 0 24 24"><path d="M4 19V5M4 19h16"/><path d="m7 14 4-4 3 3 5-6"/></svg>`,
  bookmarks: `<svg viewBox="0 0 24 24"><path d="M7 4h10v16l-5-3-5 3z"/></svg>`,
  settings: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/></svg>`,
};

const HOME_NAV = [
  ["dashboard", "Dashboard", "#/dashboard"],
  ["javascript", "JavaScript", "#/javascript"],
  ["strings", "Strings", "#/strings"],
  ["output", "Output", "#/output"],
  ["react", "React", "#/react"],
  ["react-native", "React Native", "#/react-native"],
  ["mock", "Mock Interviews", "#/mock"],
  ["progress", "Progress", "#/progress"],
  ["bookmarks", "Bookmarks", "#/bookmarks"],
  ["settings", "Settings", "#/settings"],
];

function goButton(hash, label, extra = "") {
  return `<button type="button" data-go="${hash}" ${extra}>${label}</button>`;
}

function dashboardMarkup() {
  const account = currentAccount();
  const stats = catalogStats();
  const next = continueTarget();
  const circumference = 2 * Math.PI * 48;
  const offset = circumference * (1 - stats.pct / 100);
  const dateLabel = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const goal = localStorage.getItem(GOAL_KEY) || "Land your dream job";
  const plan = todayItems()
    .map(
      (item) => `<button type="button" class="plan-item" data-go="${item.hash}" ${item.quiz ? 'data-quiz="1"' : ""}>
        <span class="check ${item.done ? "" : "is-open"}">${item.done ? "✓" : ""}</span>
        <span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.detail)}</small></span>
      </button>`
    )
    .join("");
  const subjects = stats.rows
    .map((row) => {
      const pct = row.total ? Math.round((row.done / row.total) * 100) : 0;
      return `<button type="button" class="subject-row" data-go="#/${row.topic.id}">
        <span class="subject-ico">${HOME_ICONS[row.topic.id]}</span>
        <strong>${escapeHtml(row.topic.title)}</strong>
        <span class="meter" aria-hidden="true"><span style="width:${pct}%"></span></span>
        <span class="subject-meta">${row.done} / ${row.total} &nbsp; ${pct}%</span>
      </button>`;
    })
    .join("");
  const activity = loadActivity().slice(0, 5);
  const activityHtml = activity.length
    ? activity
        .map((item) => {
          const topic = topics.find((entry) => entry.id === item.topicId);
          return `<button type="button" class="activity-item" data-go="#/${item.topicId}" ${
            item.questionId ? `data-focus="${item.questionId}"` : ""
          }>
            <span class="activity-ico">${HOME_ICONS[item.topicId] || HOME_ICONS.progress}</span>
            <span><strong>${activityLabel(item.kind)}: ${escapeHtml(item.title)}</strong><small>${timeAgo(item.at)}</small></span>
          </button>`;
        })
        .join("")
    : `<p class="empty-note">Completed questions and practice scores will show up here.</p>`;
  const recent = [];
  for (const item of loadActivity()) {
    if (recent.some((entry) => entry.topicId === item.topicId && entry.title === item.title)) continue;
    recent.push(item);
    if (recent.length === 4) break;
  }
  const recentHtml = recent.length
    ? `<div class="recent-row">${recent
        .map((item) => {
          const topic = topics.find((entry) => entry.id === item.topicId);
          return `<button type="button" class="recent-card" data-go="#/${item.topicId}" ${
            item.questionId ? `data-focus="${item.questionId}"` : ""
          }>
            <span class="recent-ico">${HOME_ICONS[item.topicId] || HOME_ICONS.progress}</span>
            <strong>${escapeHtml(item.title)}</strong>
            <small>${escapeHtml(topic?.title || "")}</small>
          </button>`;
        })
        .join("")}</div>`
    : `<p class="empty-note">Open a topic to start a session. It will be listed here.</p>`;
  return `<p class="home-kicker">Welcome back,</p>
    <h1>${escapeHtml(account.name)} 👋</h1>
    <p class="home-lead">Consistent practice today builds a stronger you tomorrow.</p>
    <div class="dash-grid">
      <section class="dash-card">
        <h2>Overall Progress</h2>
        <div class="ring-row">
          <div class="ring">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="48" fill="none" stroke="#e7f6f0" stroke-width="12"/>
              <circle cx="60" cy="60" r="48" fill="none" stroke="#12b887" stroke-width="12" stroke-linecap="round"
                stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" transform="rotate(-90 60 60)"/>
            </svg>
            <div class="ring-label"><strong>${stats.pct}%</strong><span>Completed</span></div>
          </div>
          <div class="stat-list">
            <div><strong>${stats.total}</strong><small>Total questions</small></div>
            <div><strong>${stats.done}</strong><small>Completed</small></div>
            <div><strong>${stats.remaining}</strong><small>Remaining</small></div>
          </div>
        </div>
      </section>
      <section class="dash-card motivate">
        <svg class="plant" viewBox="0 0 80 90" aria-hidden="true"><path d="M40 88V42" stroke="#7dcea0" stroke-width="3"/><path d="M40 58c-16-2-24-14-22-28 14 2 22 14 22 28z" fill="#b7ebc9"/><path d="M40 48c16-4 26-2 30 12-16 2-26 0-30-12z" fill="#8fd9a8"/><circle cx="40" cy="28" r="8" fill="#d9f6ec"/></svg>
        <h2>Small steps. Big results.</h2>
        <p>Keep going! You're ${stats.pct}% through your preparation. Focus on consistency and you'll get there.</p>
        <button type="button" class="dash-go" data-go="${next.hash}" ${next.focus ? `data-focus="${next.focus}"` : ""} ${
          next.quiz ? 'data-quiz="1"' : ""
        }>Continue Learning →</button>
      </section>
      <section class="dash-card">
        <div class="dash-card-head"><h2>Today's Plan</h2><p>${dateLabel}</p></div>
        ${plan}
        <button type="button" class="dash-link" data-go="#/progress">View full plan →</button>
      </section>
    </div>
    <div class="dash-split">
      <section class="dash-card">
        <div class="dash-card-head"><h2>Subject-wise Progress</h2><button type="button" class="dash-link" data-go="#/progress">View all →</button></div>
        ${subjects}
      </section>
      <section class="dash-card">
        <div class="dash-card-head"><h2>Recent Activity</h2><button type="button" class="dash-link" data-go="#/progress">View all →</button></div>
        ${activityHtml}
      </section>
    </div>
    <div class="dash-split">
      <section class="dash-card">
        <div class="dash-card-head"><h2>Recently Practiced</h2></div>
        ${recentHtml}
      </section>
      <section class="dash-card quote-card">
        <p>“Discipline is the bridge between your goals and your success.”</p>
        <span>— Unknown</span>
        <p class="home-lead">Your goal: ${escapeHtml(goal)}</p>
      </section>
    </div>`;
}

function progressMarkup() {
  const stats = catalogStats();
  const blocks = stats.rows
    .map((row) => {
      const pct = row.total ? Math.round((row.done / row.total) * 100) : 0;
      let days = "";
      if (row.topic.id === PLAN_TOPIC) {
        const questions = planQuestions();
        days = Array.from({ length: PLAN_DAYS }, (_, index) => {
          const day = index + 1;
          const today = dayQuestions(questions, day);
          const read = new Set(state.plan.read[day] || []);
          const count = today.filter((item) => read.has(item.id)).length;
          const passed = state.plan.results[day]?.passed;
          const unlocked = isDayUnlocked(day, state.plan.results);
          return `<article><div><strong>Day ${day}</strong><small>${count}/${today.length} read${
            passed ? " · quiz passed" : ""
          }${unlocked ? "" : " · locked"}</small></div>${
            unlocked ? `<button type="button" class="dash-link" data-go="#/javascript/day/${day}">Open</button>` : ""
          }</article>`;
        }).join("");
      } else if (READ_PLANS[row.topic.id]) {
        const config = READ_PLANS[row.topic.id];
        const questions = questionsOf(row.topic.id);
        const totalDays = config.days || Math.ceil(questions.length / config.perDay);
        const plan = state.readPlans[row.topic.id];
        days = Array.from({ length: totalDays }, (_, index) => {
          const day = index + 1;
          const today = questionsForDay(questions, day, config.perDay);
          const read = new Set(plan.read[day] || []);
          const count = today.filter((item) => read.has(item.id)).length;
          const unlocked = readDayUnlocked(day, plan.read, questions, config.perDay);
          return `<article><div><strong>Day ${day}</strong><small>${count}/${today.length} read${
            unlocked ? "" : " · locked"
          }</small></div>${
            unlocked ? `<button type="button" class="dash-link" data-go="#/${row.topic.id}/day/${day}">Open</button>` : ""
          }</article>`;
        }).join("");
      }
      return `<section class="dash-card">
        <div class="dash-card-head"><h2>${escapeHtml(row.topic.title)}</h2><span>${row.done}/${row.total} · ${pct}%</span></div>
        <div class="meter"><span style="width:${pct}%"></span></div>
        <div class="page-list" style="margin-top:12px">${days}</div>
      </section>`;
    })
    .join("");
  const activity = loadActivity()
    .slice(0, 12)
    .map(
      (item) =>
        `<article><div><strong>${activityLabel(item.kind)}: ${escapeHtml(item.title)}</strong><small>${timeAgo(
          item.at
        )}</small></div></article>`
    )
    .join("");
  return `<p class="home-kicker">Tracking</p><h1>Progress</h1>
    <p class="home-lead">${stats.done} of ${stats.total} questions completed.</p>
    <div class="page-list">${blocks}</div>
    <section class="dash-card" style="margin-top:16px"><h2>Recent activity</h2>${
      activity || `<p class="empty-note">No activity yet.</p>`
    }</section>`;
}

function bookmarksMarkup() {
  const saved = loadBookmarks();
  const cards = saved
    .map((id) => {
      const located = locateQuestion(id);
      if (!located) return "";
      return `<article><div><strong>${escapeHtml(located.question.q)}</strong><small>${escapeHtml(
        located.topic.title
      )}</small></div><span><button type="button" class="dash-link" data-focus="${id}" data-go="${
        located.hash
      }">Open</button> <button type="button" class="dash-link" data-unbookmark="${id}">Remove</button></span></article>`;
    })
    .join("");
  return `<p class="home-kicker">Saved</p><h1>Bookmarks</h1>
    <p class="home-lead">Star a question while you study and it stays here.</p>
    <div class="page-list">${cards || `<p class="empty-note">No bookmarks yet.</p>`}</div>`;
}

function mockMarkup() {
  const day = selectedDay();
  const today = dayQuestions(planQuestions(), day);
  const read = new Set(state.plan.read[day] || []);
  const done = today.filter((item) => read.has(item.id)).length;
  const ready = done === today.length;
  const result = state.plan.results[day];
  const status = result?.passed
    ? `Day ${day} practice is passed (${result.score}/${result.total}).`
    : ready
      ? `Day ${day} reading is complete. The practice quiz is ${QUIZ_SIZE} questions. Score more than ${PASS_SCORE} to unlock the next day.`
      : `Finish Day ${day} reading first. ${done}/${today.length} questions are marked complete.`;
  return `<p class="home-kicker">Practice</p><h1>Mock Interviews</h1>
    <p class="home-lead">${status}</p>
    <section class="dash-card">
      <h2>JavaScript · Day ${day}</h2>
      <p>${QUIZ_SIZE} questions · pass mark more than ${PASS_SCORE}</p>
      <button type="button" class="dash-go" data-go="#/javascript/day/${day}" ${ready ? 'data-quiz="1"' : ""}>${
        ready ? "Start practice" : "Continue reading"
      }</button>
    </section>`;
}

function settingsMarkup() {
  const account = currentAccount();
  const goal = localStorage.getItem(GOAL_KEY) || "Land your dream job";
  return `<p class="home-kicker">Account</p><h1>Settings</h1>
    <form class="settings-form" data-settings>
      <label>Name<input name="name" value="${escapeHtml(account.name)}" required /></label>
      <label>Email<input value="${escapeHtml(account.email)}" disabled /></label>
      <label>Your goal<input name="goal" value="${escapeHtml(goal)}" /></label>
      <button class="dash-go" type="submit">Save</button>
    </form>
    <p class="home-lead" id="settings-note"></p>`;
}

function locateQuestion(id) {
  for (const topic of topics) {
    const questions = topic.id === PLAN_TOPIC ? planQuestions() : questionsOf(topic.id);
    const index = questions.findIndex((item) => item.id === id);
    if (index < 0) continue;
    if (topic.id === PLAN_TOPIC) {
      const day = Math.floor(index / READ_PER_DAY) + 1;
      return { topic, question: questions[index], hash: `#/javascript/day/${day}`, day };
    }
    if (READ_PLANS[topic.id]) {
      const day = Math.floor(index / READ_PLANS[topic.id].perDay) + 1;
      return { topic, question: questions[index], hash: `#/${topic.id}/day/${day}`, day };
    }
    return { topic, question: questions[index], hash: `#/${topic.id}` };
  }
  return null;
}

function renderHomeNav(active) {
  els.homeNav.innerHTML = HOME_NAV.map(
    ([id, label, hash]) =>
      `<button type="button" class="home-link ${id === active ? "is-active" : ""}" data-go="${hash}">${
        HOME_ICONS[id]
      }<span>${label}</span></button>`
  ).join("");
}

function paintAccount() {
  const account = currentAccount();
  if (!account) return;
  els.accountName.textContent = account.name;
  els.accountInitials.textContent = initials(account.name);
}

function showHome(page) {
  els.authScreen.hidden = true;
  els.appBody.hidden = true;
  els.home.hidden = false;
  els.header.classList.add("is-home");
  els.headerTools.hidden = false;
  els.logoutBtn.hidden = true;
  els.logo.setAttribute("href", "#/dashboard");
  paintAccount();
  renderHomeNav(page);
  const view =
    page === "progress"
      ? progressMarkup()
      : page === "bookmarks"
        ? bookmarksMarkup()
        : page === "settings"
          ? settingsMarkup()
          : page === "mock"
            ? mockMarkup()
            : dashboardMarkup();
  els.homeMain.innerHTML = view;
  const titles = {
    dashboard: "Dashboard",
    progress: "Progress",
    bookmarks: "Bookmarks",
    settings: "Settings",
    mock: "Mock Interviews",
  };
  document.title = `${titles[page] || "Dashboard"} — Interview Prep`;
}

function hideHome() {
  els.home.hidden = true;
  els.header.classList.remove("is-home");
  els.headerTools.hidden = true;
  els.searchResults.hidden = true;
  els.accountPop.hidden = true;
  if (loadSession()) els.logo.setAttribute("href", "#/dashboard");
}

let replaceRoute = true;

function routeForState() {
  if (isPlanTopic()) return `/javascript/day/${selectedDay()}`;
  if (isReadPlan()) return `/${state.topicId}/day/${selectedReadDay()}`;
  return `/${state.topicId}`;
}

function writeRoute(replace) {
  const next = `#${routeForState()}`;
  if (location.hash === next) return;
  history[replace ? "replaceState" : "pushState"](null, "", next);
}

function parseRoute() {
  const parts = location.hash.replace(/^#/, "").split("/").filter(Boolean);
  const known = topics.some((topic) => topic.id === parts[0]);
  const topicId = known ? parts[0] : topics[0].id;
  const dayNumber = parts[1] === "day" ? Number(parts[2]) : null;
  const day = Number.isInteger(dayNumber) && dayNumber > 0 ? dayNumber : null;
  return { topicId, day };
}

const AUTH_PAGES = new Set(["login", "signup", "forgot"]);
const HOME_PAGES = new Set(["dashboard", "progress", "bookmarks", "settings", "mock"]);
let authNotice = "";
let authTone = "success";

function authPage() {
  const page = location.hash.replace(/^#/, "").split("/").filter(Boolean)[0] || "";
  return AUTH_PAGES.has(page) ? page : "";
}

function homePage() {
  const page = location.hash.replace(/^#/, "").split("/").filter(Boolean)[0] || "";
  return HOME_PAGES.has(page) ? page : "";
}

function loadAccounts() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function loadSession() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    return parsed?.email ? parsed : null;
  } catch {
    return null;
  }
}

function saveSession(email) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((value) => value.toString(16).padStart(2, "0")).join("");
}

function fieldMarkup(label, name, type, placeholder, icon, autocomplete) {
  const eye =
    type === "password"
      ? `<button type="button" class="auth-eye" data-toggle-password aria-label="Show password">${eyeIcon()}</button>`
      : "";
  return `<label class="auth-field">
    <span>${label}</span>
    <span class="auth-input">
      ${icon}
      <input name="${name}" type="${type}" placeholder="${placeholder}" autocomplete="${autocomplete}" required />
      ${eye}
    </span>
  </label>`;
}

function mailIcon() {
  return `<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>`;
}

function lockIcon() {
  return `<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`;
}

function userIcon() {
  return `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3"/><path d="M5 19c1.5-3 3.8-4.5 7-4.5S17.5 16 19 19"/></svg>`;
}

function eyeIcon() {
  return `<svg viewBox="0 0 24 24"><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/></svg>`;
}

function noticeMarkup() {
  if (!authNotice) return "";
  const tone = authTone === "error" ? "auth-error" : "auth-success";
  const message = authNotice;
  authNotice = "";
  return `<p class="${tone}">${escapeHtml(message)}</p>`;
}

function loginMarkup() {
  return `<h2>Welcome back</h2>
    <p class="auth-sub">Log in to continue your preparation</p>
    ${noticeMarkup()}
    <form data-auth="login">
      ${fieldMarkup("Email address", "email", "email", "you@example.com", mailIcon(), "email")}
      ${fieldMarkup("Password", "password", "password", "Enter your password", lockIcon(), "current-password")}
      <div class="auth-row"><a href="#/forgot">Forgot password?</a></div>
      <button class="auth-submit" type="submit">Log in</button>
    </form>
    <p class="auth-switch">Don't have an account? <a href="#/signup">Sign up</a></p>`;
}

function signupMarkup() {
  return `<h2>Create your account</h2>
    <p class="auth-sub">Save your details, then log in to start</p>
    ${noticeMarkup()}
    <form data-auth="signup">
      ${fieldMarkup("Full name", "name", "text", "Your name", userIcon(), "name")}
      ${fieldMarkup("Email address", "email", "email", "you@example.com", mailIcon(), "email")}
      ${fieldMarkup("Password", "password", "password", "At least 6 characters", lockIcon(), "new-password")}
      ${fieldMarkup("Confirm password", "confirm", "password", "Repeat your password", lockIcon(), "new-password")}
      <button class="auth-submit" type="submit">Create account</button>
    </form>
    <p class="auth-switch">Already have an account? <a href="#/login">Log in</a></p>`;
}

function forgotMarkup() {
  return `<h2>Reset password</h2>
    <p class="auth-sub">Enter your email and choose a new password</p>
    ${noticeMarkup()}
    <form data-auth="forgot">
      ${fieldMarkup("Email address", "email", "email", "you@example.com", mailIcon(), "email")}
      ${fieldMarkup("New password", "password", "password", "At least 6 characters", lockIcon(), "new-password")}
      <button class="auth-submit" type="submit">Save new password</button>
    </form>
    <p class="auth-switch"><a href="#/login">Back to log in</a></p>`;
}

function showAuth(page) {
  els.appBody.hidden = true;
  els.home.hidden = true;
  els.authScreen.hidden = false;
  els.header.classList.remove("is-home");
  els.headerTools.hidden = true;
  els.logoutBtn.hidden = true;
  renderModules();
  els.moduleNav.querySelectorAll(".module-btn").forEach((button) => button.classList.remove("is-active"));
  const markup = page === "signup" ? signupMarkup() : page === "forgot" ? forgotMarkup() : loginMarkup();
  els.authCard.innerHTML = markup;
  document.title = page === "signup" ? "Sign up — Interview Prep" : page === "forgot" ? "Reset password — Interview Prep" : "Log in — Interview Prep";
}

function hideAuth() {
  els.authScreen.hidden = true;
  els.appBody.hidden = false;
  els.logoutBtn.hidden = !loadSession();
}

function applyRoute() {
  const page = authPage();
  const home = homePage();
  if (!loadSession()) {
    if (!page) {
      location.hash = "#/login";
      return;
    }
    showAuth(page);
    return;
  }
  if (page || !location.hash || location.hash === "#") {
    location.hash = "#/dashboard";
    return;
  }
  if (home) {
    showHome(home);
    return;
  }
  hideAuth();
  hideHome();
  const focus = sessionStorage.getItem(FOCUS_KEY);
  if (focus) sessionStorage.removeItem(FOCUS_KEY);
  const startQuiz = sessionStorage.getItem(START_QUIZ_KEY) === "1";
  if (startQuiz) sessionStorage.removeItem(START_QUIZ_KEY);
  const { topicId, day } = parseRoute();
  state.topicId = topicId;
  if (topicId === PLAN_TOPIC && day && isDayUnlocked(day, state.plan.results)) {
    state.plan.selectedDay = day;
    state.plan.activeQuiz = null;
  }
  if (READ_PLANS[topicId] && day) {
    const plan = state.readPlans[topicId];
    const questions = readPlanQuestions();
    if (readDayUnlocked(day, plan.read, questions, READ_PLANS[topicId].perDay)) {
      plan.selectedDay = day;
    }
  }
  if (isPlanTopic()) {
    state.questionId = dayQuestions(planQuestions(), selectedDay())[0]?.id;
  } else if (isReadPlan()) {
    state.questionId = questionsForDay(readPlanQuestions(), selectedReadDay(), readPlanPerDay())[0]?.id;
  } else {
    state.questionId = firstQuestionId(currentModule());
  }
  if (focus) {
    const pool = isPlanTopic()
      ? dayQuestions(planQuestions(), selectedDay())
      : isReadPlan()
        ? questionsForDay(readPlanQuestions(), selectedReadDay(), readPlanPerDay())
        : allQuestions();
    if (pool.some((item) => item.id === focus)) state.questionId = focus;
  }
  if (startQuiz && isPlanTopic() && dayIsRead(selectedDay())) {
    state.plan.activeQuiz = {
      day: selectedDay(),
      bankVersion: QUIZ_BANK_VERSION,
      items: buildQuizItems(planQuestions(), selectedDay()),
      index: 0,
      selected: null,
      marks: [],
      picks: [],
    };
    savePlan();
  }
  replaceRoute = true;
  render();
  if (focus) scrollToQuestion(focus);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

function render() {
  if (!loadSession()) {
    showAuth(authPage() || "login");
    return;
  }
  hideAuth();
  hideHome();
  const label = document.querySelector(".topics-label");
  if (label && !isPlanTopic() && !isReadPlan()) label.textContent = "Topics";
  renderModules();
  renderSidebar();
  renderLesson();
  writeRoute(replaceRoute);
  replaceRoute = false;
  const title = currentModule()?.title || "Interview";
  const dayLabel = isPlanTopic() || isReadPlan() ? ` · Day ${isPlanTopic() ? selectedDay() : selectedReadDay()}` : "";
  document.title = `${title}${dayLabel} — Interview Prep`;
}

function handleReadPlanClick(event) {
  const copyBtn = event.target.closest(".copy-btn");
  if (copyBtn) return false;

  const readId = event.target.closest("[data-read]")?.dataset.read;
  if (readId) {
    const day = selectedReadDay();
    const plan = activeReadPlan();
    const current = new Set(plan.read[day] || []);
    if (current.has(readId)) current.delete(readId);
    else {
      current.add(readId);
      const item = readPlanToday(day).find((question) => question.id === readId);
      logActivity({ topicId: state.topicId, questionId: readId, title: item?.q || "Question", kind: "completed" });
    }
    plan.read[day] = [...current];
    saveReadPlan();
    render();
    return true;
  }

  if (event.target.closest("[data-next-day]")) {
    const button = event.target.closest("[data-next-day]");
    if (button?.disabled) return true;
    openReadDay(selectedReadDay() + 1);
    return true;
  }

  return false;
}

function handlePlanClick(event) {
  const copyBtn = event.target.closest(".copy-btn");
  if (copyBtn) return false;

  const readId = event.target.closest("[data-read]")?.dataset.read;
  if (readId) {
    const day = selectedDay();
    const current = new Set(state.plan.read[day] || []);
    if (current.has(readId)) current.delete(readId);
    else {
      current.add(readId);
      const item = dayQuestions(planQuestions(), day).find((question) => question.id === readId);
      logActivity({ topicId: "javascript", questionId: readId, title: item?.q || "Question", kind: "completed" });
    }
    state.plan.read[day] = [...current];
    savePlan();
    render();
    return true;
  }

  if (event.target.closest("[data-start-quiz]")) {
    const day = selectedDay();
    if (!dayIsRead(day)) return true;
    state.plan.activeQuiz = {
      day,
      bankVersion: QUIZ_BANK_VERSION,
      items: buildQuizItems(planQuestions(), day),
      index: 0,
      selected: null,
      marks: [],
      picks: [],
    };
    savePlan();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return true;
  }

  const choiceButton = event.target.closest("[data-choice]");
  if (choiceButton && state.plan.activeQuiz) {
    const quiz = state.plan.activeQuiz;
    const questionIndex = Number(choiceButton.dataset.quizQ);
    const optionIndex = Number(choiceButton.dataset.choice);
    const prompt = quiz.items?.[questionIndex];
    if (!prompt || Number.isInteger(quiz.picks?.[questionIndex])) return true;
    quiz.picks = quiz.picks || [];
    quiz.marks = quiz.marks || [];
    quiz.picks[questionIndex] = optionIndex;
    quiz.marks[questionIndex] = optionIndex === prompt.correct;
    quiz.index = questionIndex;
    const finished = quizScore(quiz).done;
    if (finished) settleQuiz(quiz);
    savePlan();
    render();
    if (finished) {
      const gates = document.querySelectorAll(".plan-gate");
      gates[gates.length - 1]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return true;
  }

  if (event.target.closest("[data-next-day]")) {
    openDay(selectedDay() + 1);
    return true;
  }

  return false;
}

function scrollToQuestion(id) {
  document.getElementById(`q-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openEditor(note) {
  state.editingId = note?.id || null;
  els.editorTitle.textContent = note ? "Edit answer" : "Add an answer";
  els.form.topicId.value = note?.topicId || state.topicId;
  els.form.level.value = note?.level || "basic";
  els.form.q.value = note?.q || "";
  els.form.a.value = note?.a || "";
  els.editor.showModal();
}

function closeEditor() {
  state.editingId = null;
  els.form.reset();
  els.editor.close();
}

els.moduleNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-module]");
  if (!button) return;
  location.hash = `#/${button.dataset.module}`;
});

els.sidebarNav.addEventListener("click", (event) => {
  const openDayButton = event.target.closest("[data-open-day]");
  if (openDayButton) {
    if (openDayButton.disabled) return;
    const day = Number(openDayButton.dataset.openDay);
    if (!day) return;
    if (isReadPlan()) openReadDay(day);
    else openDay(day);
    return;
  }
  const prevDay = event.target.closest("[data-prev-day]");
  if (prevDay) {
    if (isReadPlan()) {
      openReadDay(selectedReadDay() - 1);
      return;
    }
    const day = selectedDay();
    if (day <= 1) return;
    const earlier = day - 1;
    state.plan.selectedDay = earlier;
    state.plan.activeQuiz = null;
    state.questionId = dayQuestions(planQuestions(), earlier)[0]?.id;
    savePlan();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const nextDay = event.target.closest("[data-next-day]");
  if (nextDay) {
    if (nextDay.disabled) return;
    if (isReadPlan()) {
      openReadDay(selectedReadDay() + 1);
      return;
    }
    openDay(selectedDay() + 1);
    return;
  }
  const quizButton = event.target.closest("[data-quiz-index]");
  if (quizButton) {
    const quiz = state.plan.activeQuiz;
    const index = Number(quizButton.dataset.quizIndex);
    if (!quiz || Number.isNaN(index)) return;
    quiz.index = index;
    savePlan();
    render();
    document.getElementById(`quiz-q-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const button = event.target.closest("[data-question]");
  if (!button) return;
  state.questionId = button.dataset.question;
  if (!isPlanTopic() && !isReadPlan()) {
    const item = allQuestions().find((question) => question.id === state.questionId);
    trackVisit(state.topicId, state.questionId, item?.q || "");
  }
  renderSidebar();
  els.quizList.querySelectorAll(".qa").forEach((card) => {
    card.classList.toggle("is-active", card.id === `q-${state.questionId}`);
  });
  scrollToQuestion(state.questionId);
});

els.firstTopicBtn.addEventListener("click", () => {
  location.hash = "#/dashboard";
});

els.quizList.addEventListener("click", (event) => {
  const bookmarkId = event.target.closest("[data-bookmark]")?.dataset.bookmark;
  if (bookmarkId) {
    toggleBookmark(bookmarkId);
    render();
    return;
  }
  if (isReadPlan() && handleReadPlanClick(event)) return;
  if (isPlanTopic() && handlePlanClick(event)) return;
  const copyBtn = event.target.closest(".copy-btn");
  if (copyBtn) {
    const code = copyBtn.closest(".code-panel, .output-panel")?.querySelector("code")?.textContent || "";
    navigator.clipboard.writeText(code).then(() => {
      copyBtn.classList.add("is-copied");
      copyBtn.setAttribute("aria-label", "Copied");
      setTimeout(() => {
        copyBtn.classList.remove("is-copied");
        copyBtn.setAttribute("aria-label", "Copy");
      }, 1200);
    });
    return;
  }
  const editId = event.target.closest("[data-edit]")?.dataset.edit;
  const deleteId = event.target.closest("[data-delete]")?.dataset.delete;
  if (editId) {
    openEditor(state.notes.find((note) => note.id === editId));
    return;
  }
  if (deleteId) {
    state.notes = state.notes.filter((note) => note.id !== deleteId);
    saveNotes();
    state.questionId = firstQuestionId(currentModule());
    render();
  }
});

els.editorClose.addEventListener("click", closeEditor);
els.editorCancel.addEventListener("click", closeEditor);

els.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const note = {
    id: state.editingId || crypto.randomUUID(),
    topicId: els.form.topicId.value,
    level: els.form.level.value,
    q: els.form.q.value.trim(),
    a: els.form.a.value.trim(),
  };
  if (state.editingId) {
    state.notes = state.notes.map((item) => (item.id === note.id ? note : item));
  } else {
    state.notes.push(note);
  }
  saveNotes();
  state.topicId = note.topicId;
  state.questionId = note.id;
  closeEditor();
  render();
  scrollToQuestion(note.id);
});

els.logoutBtn.addEventListener("click", () => {
  clearSession();
  location.hash = "#/login";
});

els.authCard.addEventListener("click", (event) => {
  const toggle = event.target.closest("[data-toggle-password]");
  if (!toggle) return;
  const input = toggle.parentElement.querySelector("input");
  const hidden = input.type === "password";
  input.type = hidden ? "text" : "password";
  toggle.setAttribute("aria-label", hidden ? "Hide password" : "Show password");
});

els.authCard.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;
  const mode = form.dataset.auth;
  const data = new FormData(form);
  const email = String(data.get("email") || "").trim().toLowerCase();
  const password = String(data.get("password") || "");
  const name = String(data.get("name") || "").trim();
  const confirm = String(data.get("confirm") || "");
  const accounts = loadAccounts();
  const existing = accounts.find((account) => account.email === email);

  if (password.length < 6) {
    authNotice = "Use a password with at least 6 characters.";
    authTone = "error";
    showAuth(mode);
    return;
  }

  if (mode === "signup") {
    if (!name) {
      authNotice = "Enter your name.";
      authTone = "error";
      showAuth("signup");
      return;
    }
    if (password !== confirm) {
      authNotice = "Passwords do not match.";
      authTone = "error";
      showAuth("signup");
      return;
    }
    if (existing) {
      authNotice = "An account with this email already exists. Log in instead.";
      authTone = "error";
      showAuth("signup");
      return;
    }
    accounts.push({ name, email, passwordHash: await hashPassword(password) });
    saveAccounts(accounts);
    authNotice = "Account created. Log in to continue.";
    authTone = "success";
    if (location.hash === "#/login") showAuth("login");
    else location.hash = "#/login";
    return;
  }

  if (mode === "forgot") {
    if (!existing) {
      authNotice = "No account found for that email.";
      authTone = "error";
      showAuth("forgot");
      return;
    }
    existing.passwordHash = await hashPassword(password);
    saveAccounts(accounts);
    authNotice = "Password updated. Log in with the new password.";
    authTone = "success";
    if (location.hash === "#/login") showAuth("login");
    else location.hash = "#/login";
    return;
  }

  const passwordHash = await hashPassword(password);
  if (!existing) {
    const nameFromEmail = email.split("@")[0].replace(/[._-]+/g, " ").trim() || "Learner";
    accounts.push({
      name: nameFromEmail.replace(/\b\w/g, (letter) => letter.toUpperCase()),
      email,
      passwordHash,
    });
    saveAccounts(accounts);
    saveSession(email);
    location.hash = "#/dashboard";
    return;
  }
  if (existing.passwordHash !== passwordHash) {
    authNotice = "That password does not match this email. Use the password you saved, or choose Forgot password.";
    authTone = "error";
    showAuth("login");
    return;
  }
  saveSession(email);
  location.hash = "#/dashboard";
});

function openLocated(questionId) {
  const located = locateQuestion(questionId);
  if (!located) return;
  if (located.topic.id === PLAN_TOPIC && located.day && !isDayUnlocked(located.day, state.plan.results)) {
    location.hash = `#/javascript/day/${selectedDay()}`;
    return;
  }
  if (located.day && READ_PLANS[located.topic.id]) {
    const questions = questionsOf(located.topic.id);
    const plan = state.readPlans[located.topic.id];
    if (!readDayUnlocked(located.day, plan.read, questions, READ_PLANS[located.topic.id].perDay)) {
      location.hash = `#/${located.topic.id}`;
      return;
    }
  }
  sessionStorage.setItem(FOCUS_KEY, questionId);
  if (location.hash === located.hash) applyRoute();
  else location.hash = located.hash;
}

function followHomeClick(event) {
  const removeId = event.target.closest("[data-unbookmark]")?.dataset.unbookmark;
  if (removeId) {
    toggleBookmark(removeId);
    showHome("bookmarks");
    return;
  }
  const button = event.target.closest("[data-go]");
  if (!button) return;
  if (button.dataset.focus) {
    openLocated(button.dataset.focus);
    return;
  }
  if (button.dataset.quiz === "1") sessionStorage.setItem(START_QUIZ_KEY, "1");
  const hash = button.dataset.go;
  if (location.hash === hash) applyRoute();
  else location.hash = hash;
}

els.homeNav.addEventListener("click", followHomeClick);
els.homeMain.addEventListener("click", followHomeClick);
els.homeMain.addEventListener("submit", (event) => {
  if (!event.target.matches("[data-settings]")) return;
  event.preventDefault();
  const data = new FormData(event.target);
  const name = String(data.get("name") || "").trim();
  const goal = String(data.get("goal") || "").trim();
  const session = loadSession();
  const accounts = loadAccounts().map((account) =>
    account.email === session.email ? { ...account, name: name || account.name } : account
  );
  saveAccounts(accounts);
  localStorage.setItem(GOAL_KEY, goal || "Land your dream job");
  paintAccount();
  const note = document.getElementById("settings-note");
  if (note) note.textContent = "Saved.";
});

els.accountBtn.addEventListener("click", () => {
  const willOpen = els.accountPop.hidden;
  els.accountPop.hidden = !willOpen;
  els.accountBtn.setAttribute("aria-expanded", String(willOpen));
});

els.accountPop.addEventListener("click", (event) => {
  if (event.target.closest("[data-home]")) location.hash = "#/settings";
});

document.getElementById("account-logout").addEventListener("click", () => {
  clearSession();
  location.hash = "#/login";
});

els.searchInput.addEventListener("input", () => {
  const needle = els.searchInput.value.trim().toLowerCase();
  if (needle.length < 2) {
    els.searchResults.hidden = true;
    els.searchResults.innerHTML = "";
    return;
  }
  const matches = [];
  for (const topic of topics) {
    const questions = topic.id === PLAN_TOPIC ? planQuestions() : questionsOf(topic.id);
    for (const question of questions) {
      if (!question.q.toLowerCase().includes(needle)) continue;
      matches.push({ topic, question });
      if (matches.length === 8) break;
    }
    if (matches.length === 8) break;
  }
  els.searchResults.hidden = matches.length === 0;
  els.searchResults.innerHTML = matches
    .map(
      (match) => `<button type="button" data-focus="${match.question.id}">
        <strong>${escapeHtml(match.question.q)}</strong>
        <small>${escapeHtml(match.topic.title)}</small>
      </button>`
    )
    .join("");
});

els.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const first = els.searchResults.querySelector("[data-focus]");
  if (first) openLocated(first.dataset.focus);
});

els.searchResults.addEventListener("click", (event) => {
  const button = event.target.closest("[data-focus]");
  if (!button) return;
  els.searchInput.value = "";
  els.searchResults.hidden = true;
  openLocated(button.dataset.focus);
});

window.addEventListener("hashchange", applyRoute);
applyRoute();
