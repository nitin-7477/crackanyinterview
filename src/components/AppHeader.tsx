"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { initials } from "../lib/auth.js";
import { searchQuestions, topics } from "../lib/catalog.js";
import { TopicBadge } from "./Icons.jsx";

export function AppHeader({ home, account, topicId, onLogout, modules }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const matches = searchQuestions(query);

  useEffect(() => {
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  function openMatch(match: any) {
    setQuery("");
    router.push(match.path);
  }

  return (
    <header className={`app-header${home ? " is-home" : ""}${modules && !account ? " is-auth" : ""}${account && !home ? " is-study" : ""}`}>
      <Link className="logo" href={account ? "/dashboard" : "/login"}>
        <svg className="logo-mark" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.2 21C7.8 18.6 5 14.6 5 10.4 5 6.2 8.2 3 12 3c.3 3.2-.3 5.8-1.7 7.6 1.8-1.2 3.6-3.4 4-6.6 3.2 1.6 5.7 5 5.7 8.4 0 4.8-3.6 8.6-7.8 8.6Z" />
        </svg>
        Interview
      </Link>
      {home ? (
        <form
          className="dash-search"
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            if (matches[0]) openMatch(matches[0]);
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input type="search" placeholder="Search" aria-label="Search questions" value={query} onChange={(event) => setQuery(event.target.value)} autoComplete="off" />
          <div className="search-results" hidden={matches.length === 0}>
            {matches.map((match: any) => (
              <button type="button" key={match.question.id} onClick={() => openMatch(match)}>
                <strong>{match.question.q}</strong>
                <small>{match.topic.title}</small>
              </button>
            ))}
          </div>
        </form>
      ) : account || modules ? (
        <nav className="module-nav" aria-label="Modules">
          {topics.map((topic: any) => {
            const isActive = topic.id === topicId || pathname.startsWith(`/${topic.id}`);
            return (
              <Link key={topic.id} href={`/${topic.id}`} className={`module-btn${isActive ? " is-active" : ""}`}>
                {isActive ? <TopicBadge id={topic.id} /> : null}
                {topic.title}
              </Link>
            );
          })}
        </nav>
      ) : <span />}
      {home && account ? (
        <div className="account-menu">
          <button
            type="button"
            className="account-btn"
            aria-expanded={open}
            onClick={(event) => {
              event.stopPropagation();
              setOpen((value) => !value);
            }}
          >
            <span className="avatar">{initials(account.name)}</span>
            <span>{account.name}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
          </button>
          <div className="account-pop" hidden={!open} onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => router.push("/settings")}>Settings</button>
            <button type="button" onClick={onLogout}>Log out</button>
          </div>
        </div>
      ) : account ? (
        <button type="button" className="text-btn logout-btn" onClick={onLogout}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 7V5a2 2 0 0 1 2-2h7v18h-7a2 2 0 0 1-2-2v-2" /><path d="M15 12H3m0 0 3-3m-3 3 3 3" /></svg>
          Log out
        </button>
      ) : null}
    </header>
  );
}
