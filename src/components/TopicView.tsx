"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppHeader } from "./AppHeader";
import { HtmlBlock, QuizPrompt, answerHtml } from "./HtmlBlock.jsx";
import { TopicBadge, TopicIcon } from "./Icons.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useStudy } from "../context/StudyContext.jsx";
import { quizMatchesBank } from "../lib/plan.js";
import {
  PASS_SCORE,
  PLAN_DAYS,
  PLAN_TOPIC,
  QUIZ_SIZE,
  READ_PER_DAY,
  READ_PLANS,
  dayComplete,
  dayQuestions,
  isDayUnlocked,
  minutes,
  planQuestionList,
  questionsForDay,
  questionsOf,
  readCount,
  readDayUnlocked,
  readPlanDayCount,
  resolvedJsDay,
  resolvedReadDay,
  topicById,
  withNotes,
} from "../lib/catalog.js";

const LEVELS: Record<string, string> = { basic: "Beginner", intermediate: "Intermediate", advanced: "Advanced" };

function DaySwitch({ total, current, unlocked, complete, onPick }: any) {
  return (
    <div className="day-switch" aria-label="Days">
      {Array.from({ length: total }, (_, index) => {
        const number = index + 1;
        const classes = ["day-chip"];
        if (number === current) classes.push("is-current");
        else if (complete(number)) classes.push("is-done");
        return (
          <button key={number} type="button" className={classes.join(" ")} disabled={!unlocked(number)} onClick={() => onPick(number)}>
            {number}
          </button>
        );
      })}
    </div>
  );
}

function TipBanner({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <aside className="callout">
      <span className="tip-ico" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3 11c.4.4.8 1 1 1.6V17h4v-1.4c.2-.6.6-1.2 1-1.6A6 6 0 0 0 12 3z" /></svg>
      </span>
      <div>
        <p className="callout-label">Interviewer tip</p>
        <p>{children}</p>
      </div>
      <button type="button" className="tip-close" aria-label="Dismiss tip" onClick={() => setOpen(false)}>×</button>
    </aside>
  );
}

function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <svg viewBox="0 0 220 150">
        <rect x="28" y="28" width="130" height="88" rx="14" fill="#1e293b" />
        <rect x="40" y="42" width="78" height="6" rx="3" fill="#34d399" />
        <rect x="40" y="56" width="96" height="6" rx="3" fill="#60a5fa" />
        <rect x="40" y="70" width="64" height="6" rx="3" fill="#a78bfa" />
        <rect x="40" y="84" width="52" height="6" rx="3" fill="#fbbf24" />
        <rect x="128" y="58" width="64" height="64" rx="16" fill="#f5c518" />
        <text x="160" y="96" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1f2937">JS</text>
        <path d="M18 24l4 8 8 2-8 2-4 8-4-8-8-2 8-2z" fill="#f5c518" />
        <path d="M190 18l3 6 6 1.5-6 1.5-3 6-3-6-6-1.5 6-1.5z" fill="#fbbf24" />
      </svg>
    </div>
  );
}

function Bookmark({ id, on, onToggle }: any) {
  return (
    <button type="button" className={`bookmark-btn${on ? " is-on" : ""}`} aria-label={on ? "Remove bookmark" : "Bookmark"} onClick={() => onToggle(id)}>
      {on ? "★" : "☆"}
    </button>
  );
}

export function TopicView({ topicId, dayParam }: { topicId: string; dayParam?: string }) {
  const topic = topicById(topicId);
  const router = useRouter();
  const searchParams = useSearchParams();
  const focusParam = searchParams.get("focus") || "";
  const quizParam = searchParams.get("quiz") === "true";

  const { account, logout } = useAuth();
  const { state, dispatch } = useStudy();
  const [activeId, setActiveId] = useState(focusParam);
  const [quizIndex, setQuizIndex] = useState(0);
  const [editor, setEditor] = useState<any>(null);

  useEffect(() => {
    if (!account) {
      router.replace("/login");
    }
  }, [account, router]);

  const jsDay = topicId === PLAN_TOPIC ? resolvedJsDay(state.plan, dayParam) : 1;
  const readDay = READ_PLANS[topicId] ? resolvedReadDay(topicId, state.readPlans[topicId], dayParam) : 1;

  useEffect(() => {
    if (!topic) return;
    if (topicId === PLAN_TOPIC && String(jsDay) !== String(dayParam || "")) {
      router.replace(`/javascript/day/${jsDay}`);
    }
    if (READ_PLANS[topicId] && String(readDay) !== String(dayParam || "")) {
      router.replace(`/${topicId}/day/${readDay}`);
    }
    if (topicId === PLAN_TOPIC) dispatch({ type: "select-js-day", day: jsDay });
    if (READ_PLANS[topicId]) dispatch({ type: "select-read-day", topicId, day: readDay });
  }, [topic, topicId, dayParam, jsDay, readDay, router, dispatch]);

  const jsQuestions = useMemo(() => planQuestionList(), []);
  const today = topicId === PLAN_TOPIC
    ? dayQuestions(jsQuestions, jsDay)
    : READ_PLANS[topicId]
      ? questionsForDay(questionsOf(topicId), readDay, READ_PLANS[topicId].perDay)
      : withNotes(topicId, state.notes);

  useEffect(() => {
    if (!today.length) return;
    if (!today.some((item: any) => item.id === activeId)) setActiveId(today[0].id);
  }, [today, activeId]);

  useEffect(() => {
    if (!focusParam) return;
    setActiveId(focusParam);
    const node = document.getElementById(`q-${focusParam}`);
    node?.scrollIntoView({ block: "start" });
  }, [focusParam]);

  useEffect(() => {
    if (topicId !== "strings" && topicId !== "output") return;
    const current = today.find((item: any) => item.id === activeId);
    if (!current) return;
    dispatch({ type: "visit", topicId, id: current.id, title: current.q, detail: topic?.title });
  }, [topicId, activeId, today, dispatch, topic]);

  useEffect(() => {
    if (topicId !== PLAN_TOPIC || !quizParam) return;
    const read = new Set(state.plan.read[jsDay] || []);
    if (!today.length || !today.every((item: any) => read.has(item.id))) return;
    if (state.plan.activeQuiz?.day === jsDay) return;
    dispatch({ type: "start-quiz", day: jsDay });
  }, [topicId, quizParam, today, jsDay, state.plan, dispatch]);

  if (!topic) {
    router.replace("/dashboard");
    return null;
  }

  const bookmarked = new Set(state.bookmarks);
  const quiz = topicId === PLAN_TOPIC && state.plan.activeQuiz?.day === jsDay && quizMatchesBank(state.plan.activeQuiz)
    ? state.plan.activeQuiz
    : null;

  function toggleBookmark(id: string) {
    dispatch({ type: "bookmark", id });
  }

  return (
    <>
      <AppHeader account={account} topicId={topicId} onLogout={() => { logout(); router.push("/login"); }} />
      <div className="app-body">
        <aside className="sidebar">
          <button type="button" className="back-btn" aria-label="Dashboard" onClick={() => router.push("/dashboard")}>‹</button>
          <Sidebar
            topic={topic}
            topicId={topicId}
            jsDay={jsDay}
            readDay={readDay}
            today={today}
            activeId={activeId}
            quiz={quiz}
            quizIndex={quizIndex}
            state={state}
            onSelect={(id: string, index: number) => {
              setActiveId(id);
              if (Number.isInteger(index)) setQuizIndex(index);
              document.getElementById(Number.isInteger(index) ? `quiz-q-${index}` : `q-${id}`)?.scrollIntoView({ block: "start" });
            }}
            onDay={(day: number) => router.push(topicId === PLAN_TOPIC ? `/javascript/day/${day}` : `/${topicId}/day/${day}`)}
          />
        </aside>
        <main className="lesson">
          <Lesson
            topic={topic}
            topicId={topicId}
            jsDay={jsDay}
            readDay={readDay}
            today={today}
            activeId={activeId}
            quiz={quiz}
            state={state}
            bookmarked={bookmarked}
            onBookmark={toggleBookmark}
            onComplete={(id: string, title: string) => {
              if (topicId === PLAN_TOPIC) dispatch({ type: "toggle-js-read", day: jsDay, id, title });
              else dispatch({ type: "toggle-read", topicId, day: readDay, id, title, detail: topic.title });
            }}
            onStartQuiz={() => dispatch({ type: "start-quiz", day: jsDay })}
            onClearQuiz={() => {
              dispatch({ type: "clear-quiz" });
              router.replace(`/javascript/day/${jsDay}`);
            }}
            onChoice={(questionIndex: number, optionIndex: number) => dispatch({ type: "pick-choice", questionIndex, optionIndex })}
            onNext={() => router.push(topicId === PLAN_TOPIC ? `/javascript/day/${jsDay + 1}` : `/${topicId}/day/${readDay + 1}`)}
            onEdit={(item: any) => setEditor(item)}
            onDelete={(id: string) => dispatch({ type: "delete-note", id })}
          />
        </main>
      </div>
      {editor ? (
        <dialog className="editor" open>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              dispatch({
                type: "save-note",
                note: {
                  id: editor.id,
                  topicId,
                  level: data.get("level"),
                  q: String(data.get("q") || "").trim(),
                  a: String(data.get("a") || "").trim(),
                },
              });
              setEditor(null);
            }}
          >
            <h3>Edit note</h3>
            <label>Question<textarea name="q" defaultValue={editor.q} required /></label>
            <label>Answer<textarea name="a" defaultValue={editor.a} required /></label>
            <label>Level
              <select name="level" defaultValue={editor.level || "basic"}>
                <option value="basic">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </label>
            <button className="btn btn-primary" type="submit">Save</button>
            <button className="btn" type="button" onClick={() => setEditor(null)}>Cancel</button>
          </form>
        </dialog>
      ) : null}
    </>
  );
}

function Sidebar({ topic, topicId, jsDay, readDay, today, activeId, quiz, quizIndex, state, onSelect, onDay }: any) {
  if (topicId === PLAN_TOPIC) return <JsSidebar day={jsDay} today={today} activeId={activeId} quiz={quiz} quizIndex={quizIndex} state={state} onSelect={onSelect} onDay={onDay} />;
  if (READ_PLANS[topicId]) return <ReadSidebar topicId={topicId} title={topic.title} day={readDay} today={today} activeId={activeId} state={state} onSelect={onSelect} onDay={onDay} />;
  const index = Math.max(0, today.findIndex((item: any) => item.id === activeId));
  const pct = today.length ? Math.round((index / today.length) * 100) : 0;
  const remaining = today.slice(index).reduce((sum: number, item: any) => sum + minutes(item), 0);
  return (
    <>
      <div className="step-dots">{today.map((item: any, i: number) => <span key={item.id} className={i <= index ? "is-on" : ""} />)}</div>
      <div className="module-card">
        <div className="module-title"><TopicBadge id={topicId} /><div><h2>{topic.title}</h2><p>{topic.heading}</p></div></div>
        <p className="module-kicker">{index} / {today.length} topics</p>
        <div className="progress-row"><div className="progress-track" aria-hidden="true"><div className="progress-bar" style={{ width: `${pct}%` }} /></div><span>{pct}%</span></div>
        <p className="remain">~{remaining} min remaining</p>
      </div>
      <p className="topics-label">Topics</p>
      <nav className="sidebar-nav">
        {today.map((item: any, i: number) => (
          <button type="button" key={item.id} className={`side-item${item.id === activeId ? " is-active" : ""}`} onClick={() => onSelect(item.id)}>
            <TopicIcon index={i} />
            <span className="side-copy"><strong>{i + 1}. {item.q}</strong><small>{minutes(item)} min</small></span>
          </button>
        ))}
      </nav>
    </>
  );
}

function JsSidebar({ day, today, activeId, quiz, quizIndex, state, onSelect, onDay }: any) {
  const passedDays = Object.values(state.plan.results).filter((result: any) => result?.passed).length;
  const pct = Math.round((passedDays / PLAN_DAYS) * 100);
  const read = new Set(state.plan.read[day] || []);
  const done = readCount([...read], today);
  const answered = quiz ? (quiz.picks || []).filter((pick: any) => Number.isInteger(pick)).length : 0;
  const correct = quiz ? (quiz.marks || []).filter(Boolean).length : 0;
  return (
    <>
      <div className="step-dots">{Array.from({ length: PLAN_DAYS }, (_, index) => <span key={index} className={index + 1 <= day || state.plan.results[index + 1]?.passed ? "is-on" : ""} />)}</div>
      <div className="module-card">
        <div className="module-title"><TopicBadge id="javascript" /><div><h2>10-day plan</h2><p>JavaScript · 20 to read, then a {QUIZ_SIZE}-question practice</p></div></div>
        <p className="module-kicker">{passedDays} / {PLAN_DAYS} days</p>
        <div className="progress-row"><div className="progress-track"><div className="progress-bar" style={{ width: `${pct}%` }} /></div><span>{pct}%</span></div>
        <p className="remain">{passedDays === PLAN_DAYS ? "Plan complete" : quiz ? `Day ${day} · ${correct}/${quiz.items.length} correct` : `Day ${day} · ${Math.min(done, today.length)}/${today.length} read`}</p>
      </div>
      <p className="topics-label">{quiz ? `Day ${day} quiz` : `Day ${day}`}</p>
      <nav className="sidebar-nav">
        <DaySwitch
          total={PLAN_DAYS}
          current={day}
          unlocked={(number: number) => isDayUnlocked(number, state.plan.results)}
          complete={(number: number) => Boolean(state.plan.results[number]?.passed)}
          onPick={onDay}
        />
        {quiz
          ? quiz.items.map((item: any, index: number) => {
            const picked = quiz.picks?.[index];
            const status = Number.isInteger(picked) ? (quiz.marks[index] ? "Correct" : "Wrong") : "Not answered";
            return (
              <button type="button" key={`${item.id}-${index}`} className={`side-item${index === quizIndex ? " is-active" : ""}`} onClick={() => onSelect(item.id, index)}>
                <TopicIcon index={index} />
                <span className="side-copy"><strong>{index + 1}. {item.q || "Practice question"}</strong><small>{status}</small></span>
              </button>
            );
          })
          : today.map((item: any, index: number) => (
            <button type="button" key={item.id} className={`side-item${item.id === activeId ? " is-active" : ""}`} onClick={() => onSelect(item.id)}>
              <TopicIcon index={index} />
              <span className="side-copy"><strong>{index + 1}. {item.q}</strong><small>{read.has(item.id) ? "Complete" : item.section}</small></span>
            </button>
          ))}
        <div className="next-day-wrap">
          {day < PLAN_DAYS ? (
            <>
              <button type="button" className="next-day" disabled={!isDayUnlocked(day + 1, state.plan.results)} onClick={() => onDay(day + 1)}>Day {day + 1}</button>
              <p className="next-day-hint">
                {isDayUnlocked(day + 1, state.plan.results)
                  ? `Day ${day} is complete. Open Day ${day + 1}.`
                  : `Score more than ${PASS_SCORE} to open Day ${day + 1}.${quiz ? ` ${answered}/${quiz.items.length} answered.` : ""}`}
              </p>
            </>
          ) : <p className="next-day-hint">{state.plan.results[day]?.passed ? "You finished the 10-day plan." : "This is the last day."}</p>}
        </div>
      </nav>
    </>
  );
}

function ReadSidebar({ topicId, title, day, today, activeId, state, onSelect, onDay }: any) {
  const config = READ_PLANS[topicId];
  const questions = questionsOf(topicId);
  const total = readPlanDayCount(topicId);
  const plan = state.readPlans[topicId];
  let finished = 0;
  for (let number = 1; number <= total; number += 1) {
    if (dayComplete(plan.read[number], questionsForDay(questions, number, config.perDay))) finished += 1;
  }
  const pct = Math.round((finished / total) * 100);
  const read = new Set(plan.read[day] || []);
  const done = readCount([...read], today);
  const nextUnlocked = dayComplete(plan.read[day], today) && day < total;
  return (
    <>
      <div className="step-dots">{Array.from({ length: total }, (_, index) => <span key={index} className={index + 1 === day || dayComplete(plan.read[index + 1], questionsForDay(questions, index + 1, config.perDay)) ? "is-on" : ""} />)}</div>
      <div className="module-card">
        <div className="module-title"><TopicBadge id={topicId} /><div><h2>{total}-day plan</h2><p>{title} · {config.perDay} questions a day</p></div></div>
        <p className="module-kicker">{finished} / {total} days</p>
        <div className="progress-row"><div className="progress-track"><div className="progress-bar" style={{ width: `${pct}%` }} /></div><span>{pct}%</span></div>
        <p className="remain">{finished === total ? "Plan complete" : `Day ${day} · ${Math.min(done, today.length)}/${today.length} read`}</p>
      </div>
      <p className="topics-label">Day {day}</p>
      <nav className="sidebar-nav">
        <DaySwitch
          total={total}
          current={day}
          unlocked={(number: number) => readDayUnlocked(number, plan.read, questions, config.perDay)}
          complete={(number: number) => dayComplete(plan.read[number], questionsForDay(questions, number, config.perDay))}
          onPick={onDay}
        />
        {today.map((item: any, index: number) => (
          <button type="button" key={item.id} className={`side-item${item.id === activeId ? " is-active" : ""}`} onClick={() => onSelect(item.id)}>
            <TopicIcon index={index} />
            <span className="side-copy"><strong>{index + 1}. {item.q}</strong><small>{read.has(item.id) ? "Complete" : item.section}</small></span>
          </button>
        ))}
        <div className="next-day-wrap">
          {day < total ? (
            <>
              <button type="button" className="next-day" disabled={!nextUnlocked} onClick={() => onDay(day + 1)}>Day {day + 1}</button>
              <p className="next-day-hint">{nextUnlocked ? `All ${today.length} questions are read. Open Day ${day + 1}.` : `Read all ${today.length} questions to open Day ${day + 1}. ${done}/${today.length} read.`}</p>
            </>
          ) : <p className="next-day-hint">{dayComplete(plan.read[day], today) ? `You finished the ${total}-day plan.` : "This is the last day."}</p>}
        </div>
      </nav>
    </>
  );
}

function Lesson({ topic, topicId, jsDay, readDay, today, activeId, quiz, state, bookmarked, onBookmark, onComplete, onStartQuiz, onClearQuiz, onNext, onChoice, onEdit, onDelete }: any) {
  if (topicId === PLAN_TOPIC) {
    return <JsLesson day={jsDay} today={today} quiz={quiz} result={state.plan.results[jsDay]} readIds={state.plan.read[jsDay]} bookmarked={bookmarked} onBookmark={onBookmark} onComplete={onComplete} onStartQuiz={onStartQuiz} onClearQuiz={onClearQuiz} onNext={onNext} onChoice={onChoice} />;
  }
  if (READ_PLANS[topicId]) {
    return <ReadLesson topic={topic} day={readDay} today={today} readIds={state.readPlans[topicId].read[readDay]} bookmarked={bookmarked} onBookmark={onBookmark} onComplete={onComplete} onNext={onNext} />;
  }
  const totalMins = today.reduce((sum: number, item: any) => sum + minutes(item), 0);
  return (
    <>
      <header className="hero hero-card">
        <div>
          <TopicBadge id={topic.id} />
          <p className="eyebrow">Interview prep · {topic.title}</p>
          <h1>{topic.title} Interview Questions</h1>
          <p className="lede">{topic.lede}</p>
          <div className="hero-meta"><span>{today.length} questions</span><span>{topic.heading}</span><span>~{totalMins} min to review</span></div>
        </div>
        <HeroArt />
      </header>
      <TipBanner>{topic.tip}</TipBanner>
      <section className="quiz">
        <div className="quiz-head"><h2>{topic.title} questions and answers</h2><span className="level-pill">Basic to Advanced</span></div>
        <div className="quiz-list">
          {today.map((item: any, index: number) => (
            <article key={item.id} id={`q-${item.id}`} className={`qa${item.id === activeId ? " is-active" : ""}`}>
              <div className="qa-q">
                <span className="badge q">{index + 1}</span>
                <div>
                  <strong>{index + 1}. {item.q}</strong>
                  <Bookmark id={item.id} on={bookmarked.has(item.id)} onToggle={onBookmark} />
                  <span className="qa-meta">{LEVELS[item.level] || item.level} · {item.section}</span>
                </div>
              </div>
              <div className="qa-a">
                <span className="badge a">A</span>
                <div className="answer">
                  <HtmlBlock html={answerHtml(item)} />
                  {item.source === "you" ? (
                    <div className="card-actions">
                      <button type="button" className="btn" onClick={() => onEdit(item)}>Edit</button>
                      <button type="button" className="btn" onClick={() => onDelete(item.id)}>Delete</button>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      {topic.takeaways?.length ? (
        <section className="takeaways"><h2>Key Takeaways</h2><ul>{topic.takeaways.map((line: string) => <li key={line}>{line}</li>)}</ul></section>
      ) : null}
    </>
  );
}

function JsLesson({ day, today, quiz, result, readIds, bookmarked, onBookmark, onComplete, onStartQuiz, onClearQuiz, onNext, onChoice }: any) {
  const read = new Set(readIds || []);
  const ready = today.length > 0 && today.every((item: any) => read.has(item.id));
  return (
    <>
      <header className="hero hero-card">
        <div>
          <TopicBadge id="javascript" />
          <p className="eyebrow">JavaScript plan · Day {day} of {PLAN_DAYS}</p>
          <h1>Day {day}</h1>
          <p className="lede">{quiz ? `Answer all ${QUIZ_SIZE} questions. Day ${day + 1} opens only after you score more than ${PASS_SCORE}.` : `Read these ${today.length} questions. The practice quiz unlocks after every one is marked as read.`}</p>
          <div className="hero-meta"><span>{today.length} to read</span><span>{QUIZ_SIZE} practice questions</span><span>Pass mark: more than {PASS_SCORE}</span></div>
        </div>
        <HeroArt />
      </header>
      <TipBanner>Read the {READ_PER_DAY} questions carefully. Practice is required, and the next day opens only after you score more than {PASS_SCORE} out of {QUIZ_SIZE}.</TipBanner>
      <section className="quiz">
        <div className="quiz-head"><h2>{quiz ? "Practice quiz" : "Read deeply"}</h2><span className="level-pill">{quiz ? "Practice" : "Read"}</span></div>
        <div className="quiz-list">
          {quiz ? <QuizList quiz={quiz} passed={Boolean(result?.passed)} onChoice={onChoice} onStartQuiz={onStartQuiz} onClearQuiz={onClearQuiz} onNext={onNext} /> : (
            <>
              {result?.passed ? <p className="plan-note is-pass">You scored {result.score}/{result.total}. {day < PLAN_DAYS ? `Day ${day + 1} is unlocked.` : "This was the last day."}</p> : null}
              {result && !result.passed ? <p className="plan-note is-fail">You scored {result.score}/{result.total}. Score more than {PASS_SCORE} to unlock the next day.</p> : null}
              {today.map((item: any, index: number) => (
                <article key={item.id} id={`q-${item.id}`} className={`qa${read.has(item.id) ? " is-read" : ""}`}>
                  <div className="qa-q"><span className="badge q">{index + 1}</span><div><strong>{index + 1}. {item.q}</strong><span className="qa-meta">{item.section}</span></div></div>
                  <div className="qa-a"><span className="badge a">A</span><div className="answer">
                    <HtmlBlock html={answerHtml(item)} />
                    <div className="plan-actions">
                      <Bookmark id={item.id} on={bookmarked.has(item.id)} onToggle={onBookmark} />
                      <button type="button" className={`complete-btn${read.has(item.id) ? " is-done" : ""}`} onClick={() => onComplete(item.id, item.q)}><span aria-hidden="true">✓</span>{read.has(item.id) ? "Completed" : "Mark as Complete"}</button>
                    </div>
                  </div></div>
                </article>
              ))}
              <div className="plan-gate">
                <p>{read.size > today.length ? today.length : [...read].filter((id) => today.some((item: any) => item.id === id)).length}/{today.length} marked as read</p>
                <button type="button" className="btn btn-primary" disabled={!ready} onClick={onStartQuiz}>Start practice quiz</button>
                {ready ? null : <p className="plan-hint">Practice stays locked until all {today.length} questions are marked as read.</p>}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

function QuizList({ quiz, passed, onChoice, onStartQuiz, onClearQuiz, onNext }: any) {
  const answered = (quiz.picks || []).filter((pick: any) => Number.isInteger(pick)).length;
  const correct = (quiz.marks || []).filter(Boolean).length;
  const done = answered === quiz.items.length;
  const open = passed || correct > PASS_SCORE;
  const gate = done ? (
    <div className="plan-gate">
      <p className={`plan-note ${open ? "is-pass" : "is-fail"}`}>Your score: {correct}/{quiz.items.length}. {open ? (quiz.day < PLAN_DAYS ? `Day ${quiz.day + 1} is unlocked.` : "This was the last day.") : `Score more than ${PASS_SCORE} to unlock the next day.`}</p>
      {open && quiz.day < PLAN_DAYS ? <button type="button" className="btn btn-primary" onClick={onNext}>Open Day {quiz.day + 1}</button> : null}
      <button type="button" className="btn" onClick={onClearQuiz}>Back to reading</button>
      <button type="button" className="btn" onClick={onStartQuiz}>Try again</button>
    </div>
  ) : (
    <div className="plan-gate">
      <p className="plan-note">Your score: {correct}/{quiz.items.length}. {quiz.items.length - answered} question{quiz.items.length - answered === 1 ? "" : "s"} still unanswered. The next day opens after every question is answered and the score is more than {PASS_SCORE}.</p>
      <button type="button" className="btn" onClick={onClearQuiz}>Back to reading</button>
    </div>
  );
  return (
    <>
      {gate}
      {quiz.items.map((prompt: any, index: number) => {
        const picked = quiz.picks?.[index];
        const isAnswered = Number.isInteger(picked);
        return (
          <article className="qa practice-card" id={`quiz-q-${index}`} key={`${prompt.id}-${index}`}>
            <div className="qa-q">
              <span className="badge q">{index + 1}</span>
              <div>
                <QuizPrompt question={prompt.q || "Practice question"} />
                <span className="qa-meta">{isAnswered ? (picked === prompt.correct ? "Correct" : "Wrong") : "Choose an answer"}</span>
              </div>
            </div>
            <div className="choices">
              {prompt.options.map((option: any, optionIndex: number) => {
                let mark = "";
                if (isAnswered && optionIndex === prompt.correct) mark = " is-correct";
                else if (isAnswered && optionIndex === picked) mark = " is-wrong";
                return (
                  <button type="button" key={option} className={`choice${mark}`} disabled={isAnswered} onClick={() => onChoice(index, optionIndex)}>
                    <span>{["A", "B", "C", "D"][optionIndex]}</span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
            {isAnswered ? <div className="plan-actions"><p className={`plan-note ${picked === prompt.correct ? "is-pass" : "is-fail"}`}>{picked === prompt.correct ? "Correct." : "Wrong."}</p></div> : null}
          </article>
        );
      })}
      {gate}
    </>
  );
}

function ReadLesson({ topic, day, today, readIds, bookmarked, onBookmark, onComplete, onNext }: any) {
  const configDays = readPlanDayCount(topic.id);
  const read = new Set(readIds || []);
  const done = today.every((item: any) => read.has(item.id));
  const count = today.filter((item: any) => read.has(item.id)).length;
  return (
    <>
      <header className="hero hero-card">
        <div>
          <TopicBadge id={topic.id} />
          <p className="eyebrow">{topic.title} plan · Day {day} of {configDays}</p>
          <h1>Day {day}</h1>
          <p className="lede">Questions 1–{today.length}. Mark each one complete after you have read it.</p>
          <div className="hero-meta"><span>{today.length} to read</span><span>{count}/{today.length} read</span><span>Day {day} of {configDays}</span></div>
        </div>
        <HeroArt />
      </header>
      <TipBanner>Read these {today.length} questions carefully. The next day opens only after every one is marked as read.</TipBanner>
      <section className="quiz">
        <div className="quiz-head"><h2>Read deeply</h2><span className="level-pill">Read</span></div>
        <div className="quiz-list">
          <p className={`plan-note${done ? " is-pass" : ""}`}>{done ? (day < configDays ? `All ${today.length} questions are read. Day ${day + 1} is unlocked.` : `You finished the ${configDays}-day plan.`) : `${count}/{today.length} marked as read.`}</p>
          {today.map((item: any, index: number) => (
            <article key={item.id} id={`q-${item.id}`} className={`qa${read.has(item.id) ? " is-read" : ""}`}>
              <div className="qa-q"><span className="badge q">{index + 1}</span><div><strong>{index + 1}. {item.q}</strong><span className="qa-meta">{item.section}</span></div></div>
              <div className="qa-a"><span className="badge a">A</span><div className="answer">
                <HtmlBlock html={answerHtml(item)} />
                <div className="plan-actions">
                  <Bookmark id={item.id} on={bookmarked.has(item.id)} onToggle={onBookmark} />
                  <button type="button" className={`complete-btn${read.has(item.id) ? " is-done" : ""}`} onClick={() => onComplete(item.id, item.q)}><span aria-hidden="true">✓</span>{read.has(item.id) ? "Completed" : "Mark as Complete"}</button>
                </div>
              </div></div>
            </article>
          ))}
          {day < configDays ? (
            <div className="plan-gate">
              <button type="button" className="btn btn-primary" disabled={!done} onClick={onNext}>Open Day {day + 1}</button>
              {done ? null : <p className="plan-hint">Day {day + 1} stays locked until all {today.length} questions are marked as read.</p>}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
