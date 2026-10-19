"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext.jsx";
import { useStudy } from "@/context/StudyContext.jsx";
import { HomeLayout } from "@/components/HomeLayout";
import { locateQuestion } from "@/lib/catalog.js";

export default function BookmarksPage() {
  const { account } = useAuth();
  const { state, dispatch } = useStudy();
  const router = useRouter();

  useEffect(() => {
    if (!account) {
      router.replace("/login");
    }
  }, [account, router]);

  if (!account) return null;

  return (
    <HomeLayout>
      <p className="home-kicker">Saved</p>
      <h1>Bookmarks</h1>
      <p className="home-lead">Star a question while you study and it stays here.</p>
      <div className="page-list">
        {state.bookmarks.map((id: string) => {
          const located = locateQuestion(id, state.notes);
          if (!located) return null;
          return (
            <article key={id}>
              <div><strong>{located.question.q}</strong><small>{located.topic.title}</small></div>
              <span>
                <button type="button" className="dash-link" onClick={() => router.push(located.path)}>Open</button>
                <button type="button" className="dash-link" onClick={() => dispatch({ type: "bookmark", id })}>Remove</button>
              </span>
            </article>
          );
        })}
        {state.bookmarks.length === 0 ? <p className="empty-note">No bookmarks yet.</p> : null}
      </div>
    </HomeLayout>
  );
}
