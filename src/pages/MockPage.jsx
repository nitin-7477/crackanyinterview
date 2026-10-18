import { useNavigate } from "react-router-dom";
import { useStudy } from "../context/StudyContext.jsx";
import { PASS_SCORE, QUIZ_SIZE, dayQuestions, planQuestionList, selectedJsDay } from "../lib/catalog.js";

export function MockPage() {
  const { state } = useStudy();
  const navigate = useNavigate();
  const day = selectedJsDay(state.plan);
  const today = dayQuestions(planQuestionList(), day);
  const read = new Set(state.plan.read[day] || []);
  const done = today.filter((item) => read.has(item.id)).length;
  const ready = done === today.length;
  const result = state.plan.results[day];
  const status = result?.passed
    ? `Day ${day} practice is passed (${result.score}/${result.total}).`
    : ready
      ? `Day ${day} reading is complete. The practice quiz is ${QUIZ_SIZE} questions. Score more than ${PASS_SCORE} to unlock the next day.`
      : `Finish Day ${day} reading first. ${done}/${today.length} questions are marked complete.`;

  return (
    <>
      <p className="home-kicker">Practice</p>
      <h1>Mock Interviews</h1>
      <p className="home-lead">{status}</p>
      <section className="dash-card">
        <h2>JavaScript · Day {day}</h2>
        <p>{QUIZ_SIZE} questions · pass mark more than {PASS_SCORE}</p>
        <button type="button" className="dash-go" onClick={() => navigate(`/javascript/day/${day}`, { state: { quiz: ready } })}>
          {ready ? "Start practice" : "Continue reading"}
        </button>
      </section>
    </>
  );
}
