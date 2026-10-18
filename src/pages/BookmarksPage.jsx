import { useNavigate } from "react-router-dom";
import { useStudy } from "../context/StudyContext.jsx";
import { locateQuestion } from "../lib/catalog.js";

export function BookmarksPage() {
  const { state, dispatch } = useStudy();
  const navigate = useNavigate();

  return (
    <>
      <p className="home-kicker">Saved</p>
      <h1>Bookmarks</h1>
      <p className="home-lead">Star a question while you study and it stays here.</p>
      <div className="page-list">
        {state.bookmarks.map((id) => {
          const located = locateQuestion(id, state.notes);
          if (!located) return null;
          return (
            <article key={id}>
              <div><strong>{located.question.q}</strong><small>{located.topic.title}</small></div>
              <span>
                <button type="button" className="dash-link" onClick={() => navigate(located.path, { state: { focus: id } })}>Open</button>
                <button type="button" className="dash-link" onClick={() => dispatch({ type: "bookmark", id })}>Remove</button>
              </span>
            </article>
          );
        })}
        {state.bookmarks.length === 0 ? <p className="empty-note">No bookmarks yet.</p> : null}
      </div>
    </>
  );
}
