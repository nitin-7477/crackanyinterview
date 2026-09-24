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
} from "./plan.js";

const STORAGE_KEY = "interview-notes-v1";
const PLAN_KEY = "interview-js-plan-v1";
const minsByLevel = { basic: 10, intermediate: 15, advanced: 20 };
const levelLabel = { basic: "Beginner", intermediate: "Intermediate", advanced: "Advanced" };

const state = {
  topicId: topics[0].id,
  questionId: firstQuestionId(topics[0]),
  notes: loadNotes(),
  editingId: null,
  plan: loadPlan(),
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
  addBtn: document.getElementById("add-btn"),
  exportBtn: document.getElementById("export-btn"),
  importInput: document.getElementById("import-input"),
  editor: document.getElementById("editor"),
  form: document.getElementById("editor-form"),
  editorTitle: document.getElementById("editor-title"),
  editorClose: document.getElementById("editor-close"),
  editorCancel: document.getElementById("editor-cancel"),
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

function isPlanTopic() {
  return state.topicId === PLAN_TOPIC;
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

function wrapCodeBlocks(html) {
  return html.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (_, code) => {
    return `<div class="code-panel">
      <div class="code-head">
        <span>Code</span>
        <button type="button" class="copy-btn">Copy</button>
      </div>
      <pre><code>${code}</code></pre>
    </div>`;
  });
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

function renderPlanSidebar() {
  const day = selectedDay();
  const questions = planQuestions();
  const passedDays = Object.values(state.plan.results).filter((result) => result.passed).length;
  const pct = Math.round((passedDays / PLAN_DAYS) * 100);
  const readCount = readProgress(day);
  const today = dayQuestions(questions, day);

  els.moduleTitle.textContent = "10-day plan";
  els.moduleTagline.textContent = "JavaScript · 20 to read, then a 40-question practice";
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
  const reached = quiz ? answeredCount(quiz) : 0;
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

  if (quiz) {
    els.timeRemain.textContent = `Day ${day} · ${reached}/${quiz.items.length} answered`;
  }

  const nextUnlocked = isDayUnlocked(day + 1, state.plan.results);
  const nextDay =
    day < PLAN_DAYS
      ? `<button type="button" class="next-day" data-next-day ${nextUnlocked ? "" : "disabled"}>
          Day ${day + 1}
        </button>
        <p class="next-day-hint">${
          nextUnlocked
            ? `Day ${day} is complete. Open Day ${day + 1}.`
            : `Score more than ${PASS_SCORE} to open Day ${day + 1}.`
        }</p>`
      : `<p class="next-day-hint">${
          state.plan.results[day]?.passed ? "You finished the 10-day plan." : "This is the last day."
        }</p>`;

  const previousDay =
    day > 1
      ? `<div class="next-day-wrap prev-day-wrap">
          <button type="button" class="next-day prev-day" data-prev-day>Day ${day - 1}</button>
          <p class="next-day-hint">Go back to revise Day ${day - 1} and retake its quiz.</p>
        </div>`
      : "";

  els.sidebarNav.innerHTML = `${previousDay}${questionList}<div class="next-day-wrap">${nextDay}</div>`;
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
    "Read the 20 questions carefully. Practice is required, and the next day opens only after you score more than 30 out of 40.";
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
    els.quizList.innerHTML = `${renderQuizProgress(quiz)}${quiz.items
      .map((prompt, index) => renderQuizReview(prompt, index, byId.get(prompt.id), quiz))
      .join("")}`;
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

function answeredCount(quiz) {
  return quiz.items.filter((_, index) => Number.isInteger(quiz.picks?.[index])).length;
}

function renderQuizProgress(quiz) {
  const answered = answeredCount(quiz);
  const done = answered === quiz.items.length;
  if (!done) {
    return `<p class="plan-note">${answered}/${quiz.items.length} answered. Choose an answer on every question. The next day stays locked until you finish and score more than ${PASS_SCORE}.</p>`;
  }
  const score = quiz.marks.filter(Boolean).length;
  const passed = score > PASS_SCORE;
  const nextStep =
    quiz.day < PLAN_DAYS
      ? `Day ${quiz.day + 1} is unlocked.`
      : "This was the last day.";
  return `<div class="plan-gate">
    <p class="plan-note ${passed ? "is-pass" : "is-fail"}">You scored ${score}/${quiz.items.length}. ${
      passed ? nextStep : `Score more than ${PASS_SCORE} to unlock the next day.`
    }</p>
    ${
      passed
        ? ""
        : `<button type="button" class="btn btn-primary" data-start-quiz>Retake practice quiz</button>`
    }
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
      : `<p class="plan-note is-fail">Not quite. The correct answer is ${letters[prompt.correct]}.</p>`;
  return `
    <article class="qa practice-card" id="quiz-q-${index}">
      <div class="qa-q">
        <span class="badge q">${index + 1}</span>
        <div>
          <strong>${escapeHtml(prompt.q || item?.q || "Practice question")}</strong>
          <span class="qa-meta">${answered ? (picked === prompt.correct ? "Correct" : "Wrong") : "Choose an answer"}</span>
        </div>
      </div>
      <div class="choices">${choices}</div>
      ${verdict ? `<div class="plan-actions">${verdict}</div>` : ""}
    </article>`;
}

function render() {
  const label = document.querySelector(".topics-label");
  if (label && !isPlanTopic()) label.textContent = "Topics";
  renderModules();
  renderSidebar();
  renderLesson();
}

function handlePlanClick(event) {
  const copyBtn = event.target.closest(".copy-btn");
  if (copyBtn) return false;

  const readId = event.target.closest("[data-read]")?.dataset.read;
  if (readId) {
    const day = selectedDay();
    const current = new Set(state.plan.read[day] || []);
    if (current.has(readId)) current.delete(readId);
    else current.add(readId);
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
    if (answeredCount(quiz) === quiz.items.length) {
      const score = quiz.marks.filter(Boolean).length;
      const previous = state.plan.results[quiz.day];
      state.plan.results[quiz.day] = {
        score: Math.max(score, previous?.score || 0),
        total: quiz.items.length,
        passed: score > PASS_SCORE || Boolean(previous?.passed),
      };
    }
    savePlan();
    render();
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
  const module = topics.find((topic) => topic.id === button.dataset.module);
  state.topicId = module.id;
  state.questionId = firstQuestionId(module);
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

els.sidebarNav.addEventListener("click", (event) => {
  const prevDay = event.target.closest("[data-prev-day]");
  if (prevDay) {
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
    const day = selectedDay();
    if (nextDay.disabled || !isDayUnlocked(day + 1, state.plan.results)) return;
    const upcoming = day + 1;
    state.plan.selectedDay = upcoming;
    state.plan.activeQuiz = null;
    state.questionId = dayQuestions(planQuestions(), upcoming)[0]?.id;
    savePlan();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
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
  renderSidebar();
  els.quizList.querySelectorAll(".qa").forEach((card) => {
    card.classList.toggle("is-active", card.id === `q-${state.questionId}`);
  });
  scrollToQuestion(state.questionId);
});

els.firstTopicBtn.addEventListener("click", () => {
  if (isPlanTopic()) {
    const next = Array.from({ length: PLAN_DAYS }, (_, index) => index + 1).find(
      (day) => isDayUnlocked(day, state.plan.results) && !state.plan.results[day]?.passed
    );
    state.plan.selectedDay = next || 1;
    state.plan.activeQuiz = null;
    savePlan();
  } else {
    state.questionId = firstQuestionId(currentModule());
  }
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

els.quizList.addEventListener("click", (event) => {
  if (isPlanTopic() && handlePlanClick(event)) return;
  const copyBtn = event.target.closest(".copy-btn");
  if (copyBtn) {
    const code = copyBtn.closest(".code-panel")?.querySelector("code")?.textContent || "";
    navigator.clipboard.writeText(code).then(() => {
      copyBtn.textContent = "Copied";
      setTimeout(() => {
        copyBtn.textContent = "Copy";
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

els.addBtn.addEventListener("click", () => openEditor());
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

els.exportBtn.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state.notes, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "interview-notes.json";
  link.click();
  URL.revokeObjectURL(url);
});

els.importInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    if (!Array.isArray(parsed)) throw new Error("Invalid notes file");
    state.notes = parsed;
    saveNotes();
    render();
  } catch {
    alert("Could not import that file. Use a JSON export from this page.");
  } finally {
    event.target.value = "";
  }
});

render();
