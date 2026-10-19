"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext.jsx";
import { useStudy } from "@/context/StudyContext.jsx";
import { Icon } from "@/components/Icons.jsx";
import { HomeLayout } from "@/components/HomeLayout";
import { activityLabel, catalogStats, continueTarget, timeAgo, todayItems } from "@/lib/catalog.js";

export default function DashboardPage() {
  const { account } = useAuth();
  const { state } = useStudy();
  const router = useRouter();

  useEffect(() => {
    if (!account) {
      router.replace("/login");
    }
  }, [account, router]);

  if (!account) return null;

  const stats = catalogStats(state);
  const next = continueTarget(state);
  const plan = todayItems(state);
  const circumference = 2 * Math.PI * 48;
  const offset = circumference * (1 - stats.pct / 100);
  const dateLabel = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const activity = state.activity.slice(0, 5);
  const recent: any[] = [];
  for (const item of state.activity) {
    if (recent.some((entry) => entry.topicId === item.topicId && entry.title === item.title)) continue;
    recent.push(item);
    if (recent.length === 4) break;
  }

  function open(path: string, extra?: any) {
    router.push(path);
  }

  return (
    <HomeLayout>
      <p className="home-kicker">Welcome back,</p>
      <h1>{account?.name} 👋</h1>
      <p className="home-lead">Consistent practice today builds a stronger you tomorrow.</p>
      <div className="dash-grid">
        <section className="dash-card">
          <h2>Overall Progress</h2>
          <div className="ring-row">
            <div className="ring">
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <circle cx="60" cy="60" r="48" fill="none" stroke="#d5dee3" strokeWidth="12" />
                <circle cx="60" cy="60" r="48" fill="none" stroke="#28502e" strokeWidth="12" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} transform="rotate(-90 60 60)" />
              </svg>
              <div className="ring-label"><strong>{stats.pct}%</strong><span>Completed</span></div>
            </div>
            <div className="stat-list">
              <div><strong>{stats.total}</strong><small>Total questions</small></div>
              <div><strong>{stats.done}</strong><small>Completed</small></div>
              <div><strong>{stats.remaining}</strong><small>Remaining</small></div>
            </div>
          </div>
        </section>
        <section className="dash-card motivate">
          <svg className="plant" viewBox="0 0 80 90" aria-hidden="true">
            <path d="M40 88V42" stroke="#28502e" strokeWidth="3" />
            <path d="M40 58c-16-2-24-14-22-28 14 2 22 14 22 28z" fill="#28502e" />
            <path d="M40 48c16-4 26-2 30 12-16 2-26 0-30-12z" fill="#ff8200" />
            <circle cx="40" cy="28" r="8" fill="#310d20" />
          </svg>
          <h2>Small steps. Big results.</h2>
          <p>Keep going! You&apos;re {stats.pct}% through your preparation. Focus on consistency and you&apos;ll get there.</p>
          <button type="button" className="dash-go" onClick={() => open(next.path, { focus: next.focus, quiz: next.quiz })}>Continue Learning →</button>
        </section>
        <section className="dash-card">
          <div className="dash-card-head"><h2>Today&apos;s Plan</h2><p>{dateLabel}</p></div>
          {plan.map((item: any) => (
            <button type="button" className="plan-item" key={item.title} onClick={() => open(item.path, { quiz: item.quiz })}>
              <span className={`check ${item.done ? "" : "is-open"}`}>{item.done ? "✓" : ""}</span>
              <span><strong>{item.title}</strong><small>{item.detail}</small></span>
            </button>
          ))}
          <button type="button" className="dash-link" onClick={() => router.push("/progress")}>View full plan →</button>
        </section>
      </div>
      <div className="dash-split">
        <section className="dash-card">
          <div className="dash-card-head"><h2>Subject-wise Progress</h2><button type="button" className="dash-link" onClick={() => router.push("/progress")}>View all →</button></div>
          {stats.rows.map((row: any) => {
            const pct = row.total ? Math.round((row.done / row.total) * 100) : 0;
            return (
              <button type="button" className="subject-row" key={row.topic.id} onClick={() => router.push(`/${row.topic.id}`)}>
                <span className="subject-ico"><Icon name={row.topic.id} /></span>
                <strong>{row.topic.title}</strong>
                <span className="meter" aria-hidden="true"><span style={{ width: `${pct}%` }} /></span>
                <span className="subject-meta">{row.done} / {row.total} &nbsp; {pct}%</span>
              </button>
            );
          })}
        </section>
        <section className="dash-card">
          <div className="dash-card-head"><h2>Recent Activity</h2><button type="button" className="dash-link" onClick={() => router.push("/progress")}>View all →</button></div>
          {activity.length ? activity.map((item: any) => (
            <button type="button" className="activity-item" key={item.id || `${item.at}-${item.title}`} onClick={() => router.push(`/${item.topicId}`)}>
              <span className="activity-ico"><Icon name={item.topicId} /></span>
              <span><strong>{activityLabel(item.kind)}: {item.title}</strong><small>{timeAgo(item.at)}</small></span>
            </button>
          )) : <p className="empty-note">Completed questions and practice scores will show up here.</p>}
        </section>
      </div>
      <div className="dash-split">
        <section className="dash-card">
          <div className="dash-card-head"><h2>Recently Practiced</h2></div>
          {recent.length ? (
            <div className="recent-row">
              {recent.map((item: any) => (
                <button type="button" className="recent-card" key={`${item.at}-${item.title}`} onClick={() => router.push(`/${item.topicId}`)}>
                  <span className="recent-ico"><Icon name={item.topicId} /></span>
                  <strong>{item.title}</strong>
                  <small>{stats.rows.find((row: any) => row.topic.id === item.topicId)?.topic.title}</small>
                </button>
              ))}
            </div>
          ) : <p className="empty-note">Open a topic to start a session. It will be listed here.</p>}
        </section>
        <section className="dash-card quote-card">
          <p>“Discipline is the bridge between your goals and your success.”</p>
          <span>— Unknown</span>
          <p className="home-lead">Your goal: {state.goal}</p>
        </section>
      </div>
    </HomeLayout>
  );
}
