import { useNavigate } from "react-router-dom";
import { useStudy } from "../context/StudyContext.jsx";
import {
  PLAN_DAYS,
  PLAN_TOPIC,
  READ_PLANS,
  activityLabel,
  catalogStats,
  dayQuestions,
  isDayUnlocked,
  planQuestionList,
  questionsForDay,
  questionsOf,
  readDayUnlocked,
  timeAgo,
} from "../lib/catalog.js";

export function ProgressPage() {
  const { state } = useStudy();
  const navigate = useNavigate();
  const stats = catalogStats(state);

  return (
    <>
      <p className="home-kicker">Tracking</p>
      <h1>Progress</h1>
      <p className="home-lead">{stats.done} of {stats.total} questions completed.</p>
      <div className="page-list">
        {stats.rows.map((row) => {
          const pct = row.total ? Math.round((row.done / row.total) * 100) : 0;
          return (
            <section className="dash-card" key={row.topic.id}>
              <div className="dash-card-head"><h2>{row.topic.title}</h2><span>{row.done}/{row.total} · {pct}%</span></div>
              <div className="meter"><span style={{ width: `${pct}%` }} /></div>
              <div className="page-list" style={{ marginTop: 12 }}>
                {row.topic.id === PLAN_TOPIC ? Array.from({ length: PLAN_DAYS }, (_, index) => {
                  const day = index + 1;
                  const today = dayQuestions(planQuestionList(), day);
                  const read = new Set(state.plan.read[day] || []);
                  const count = today.filter((item) => read.has(item.id)).length;
                  const unlocked = isDayUnlocked(day, state.plan.results);
                  return (
                    <article key={day}>
                      <div><strong>Day {day}</strong><small>{count}/{today.length} read{state.plan.results[day]?.passed ? " · quiz passed" : ""}{unlocked ? "" : " · locked"}</small></div>
                      {unlocked ? <button type="button" className="dash-link" onClick={() => navigate(`/javascript/day/${day}`)}>Open</button> : null}
                    </article>
                  );
                }) : null}
                {READ_PLANS[row.topic.id] ? Array.from({ length: row.days }, (_, index) => {
                  const day = index + 1;
                  const questions = questionsOf(row.topic.id);
                  const today = questionsForDay(questions, day, READ_PLANS[row.topic.id].perDay);
                  const plan = state.readPlans[row.topic.id];
                  const read = new Set(plan.read[day] || []);
                  const count = today.filter((item) => read.has(item.id)).length;
                  const unlocked = readDayUnlocked(day, plan.read, questions, READ_PLANS[row.topic.id].perDay);
                  return (
                    <article key={day}>
                      <div><strong>Day {day}</strong><small>{count}/{today.length} read{unlocked ? "" : " · locked"}</small></div>
                      {unlocked ? <button type="button" className="dash-link" onClick={() => navigate(`/${row.topic.id}/day/${day}`)}>Open</button> : null}
                    </article>
                  );
                }) : null}
              </div>
            </section>
          );
        })}
      </div>
      <section className="dash-card" style={{ marginTop: 16 }}>
        <h2>Recent activity</h2>
        {state.activity.slice(0, 12).map((item) => (
          <article key={item.id || item.at}><div><strong>{activityLabel(item.kind)}: {item.title}</strong><small>{timeAgo(item.at)}</small></div></article>
        ))}
        {state.activity.length === 0 ? <p className="empty-note">No activity yet.</p> : null}
      </section>
    </>
  );
}
