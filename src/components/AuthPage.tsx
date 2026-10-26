"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext.jsx";
import { CAILogo } from "./CAILogo";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Code2,
  Binary,
  Layers,
} from "lucide-react";

const COPY = {
  login: {
    title: "Welcome back",
    lead: "Log in to continue your structured interview preparation",
    submit: "Sign in to Workspace",
    before: "Don't have an account?",
    action: "Create free account",
    to: "/signup",
  },
  signup: {
    title: "Create your account",
    lead: "Access 665+ high-yield interview questions, roadmaps & mock arena",
    submit: "Create Account & Start",
    before: "Already have an account?",
    action: "Sign in",
    to: "/login",
  },
  forgot: {
    title: "Reset your password",
    lead: "Enter your account email to set a new password",
    submit: "Update password",
    before: "Remembered your credentials?",
    action: "Sign in",
    to: "/login",
  },
};

export function AuthPage({
  mode,
  initialNotice,
}: {
  mode: "login" | "signup" | "forgot";
  initialNotice?: string;
}) {
  const auth = useAuth();
  const router = useRouter();
  const [notice, setNotice] = useState(initialNotice || "");
  const [tone, setTone] = useState(initialNotice ? "success" : "");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const copy = COPY[mode];

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setNotice("");

    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      password: String(data.get("password") || ""),
      confirm: String(data.get("confirm") || ""),
    };

    if (mode === "signup") {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok) {
          if (res.status === 409 || (res.status === 400 && json.error)) {
            setNotice(json.error);
            setTone("error");
            setSubmitting(false);
            return;
          }
        }
      } catch {
        // Fallback to local auth
      }

      const result = await auth.signup(payload);
      if (result.error) {
        setNotice(result.error);
        setTone("error");
        setSubmitting(false);
        return;
      }
      router.push("/login?notice=Account+created.+Log+in+to+continue.");
      return;
    }

    if (mode === "forgot") {
      const result = await auth.resetPassword(payload);
      if (result.error) {
        setNotice(result.error);
        setTone("error");
        setSubmitting(false);
        return;
      }
      router.push("/login?notice=Password+updated.+Log+in+with+new+password.");
      return;
    }

    // Login mode
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.user) {
          auth.login({ email: payload.email, password: payload.password });
          router.push("/dashboard");
          return;
        }
      }
    } catch {
      // Fallback to local auth
    }

    const result = await auth.login(payload);
    if (result.error) {
      setNotice(result.error);
      setTone("error");
      setSubmitting(false);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[var(--bg)] text-[var(--ink)] transition-colors duration-200">
      {/* Top Simple Header */}
      <header className="flex h-16 items-center justify-between border-b border-[var(--line)] px-6 lg:px-12 bg-[var(--surface)]/60 backdrop-blur-md">
        <CAILogo href="/login" />
        <Link
          href={copy.to}
          className="text-xs font-medium text-zinc-400 hover:text-white transition"
        >
          {copy.before} <span className="text-zinc-200 underline font-semibold ml-1">{copy.action}</span>
        </Link>
      </header>

      {/* Main Form Centerpiece */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column: Platform Value Props */}
          <div className="hidden lg:flex flex-col space-y-6 pr-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-800/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-300 w-fit">
              <Sparkles className="h-3.5 w-3.5" />
              <span>SDE Preparation Platform</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-[var(--ink)] leading-tight">
                Prepare Smarter.<br />
                Interview Stronger.
              </h1>
              <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
                Structured 10-day roadmaps, deep-dive JavaScript execution engine questions, and timed mock arenas designed for top tech interviews.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200">
                  <Code2 className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-[var(--ink)]">Curated 10-Day Roadmaps</h2>
                  <p className="text-[11px] text-[var(--ink-secondary)] mt-0.5">
                    Step-by-step mastery covering JavaScript Core, React 19, and React Native mobile architecture.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200">
                  <Binary className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-[var(--ink)]">Tricky Code Output Challenges</h2>
                  <p className="text-[11px] text-[var(--ink-secondary)] mt-0.5">
                    50 high-frequency traps: closures, prototype chains, microtask order, and coercion drills.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-[var(--ink)]">Revision Vault & Mock Arena</h2>
                  <p className="text-[11px] text-[var(--ink-secondary)] mt-0.5">
                    Bookmark tricky questions into your revision vault and practice under timed interview conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stealth Auth Card */}
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
                {copy.title}
              </h2>
              <p className="text-xs text-[var(--ink-secondary)]">
                {copy.lead}
              </p>
            </div>

            {notice && (
              <div
                className={`rounded-xl border p-3 text-xs ${
                  tone === "error"
                    ? "border-rose-800/80 bg-rose-950/40 text-rose-300"
                    : "border-zinc-700 bg-zinc-800/80 text-zinc-200"
                }`}
              >
                {notice}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                    <input
                      name="name"
                      type="text"
                      placeholder="Bittu Kumar"
                      required
                      autoComplete="name"
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] py-2 pl-9 pr-3 text-xs text-[var(--ink)] placeholder-zinc-500 focus:border-zinc-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                  <input
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] py-2 pl-9 pr-3 text-xs text-[var(--ink)] placeholder-zinc-500 focus:border-zinc-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-zinc-300">
                    Password
                  </label>
                  {mode === "login" && (
                    <Link
                      href="/forgot"
                      className="text-[11px] text-zinc-400 hover:text-zinc-200 transition"
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password (min 6 characters)"
                    required
                    minLength={6}
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] py-2 pl-9 pr-10 text-xs text-[var(--ink)] placeholder-zinc-500 focus:border-zinc-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-0.5"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              {mode !== "login" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                    <input
                      name="confirm"
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      required
                      minLength={6}
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] py-2 pl-9 pr-3 text-xs text-[var(--ink)] placeholder-zinc-500 focus:border-zinc-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold py-2.5 px-4 text-xs transition active:scale-95 shadow-sm disabled:opacity-50"
              >
                <span>{submitting ? "Processing..." : copy.submit}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>

            <div className="text-center pt-2">
              <p className="text-xs text-zinc-400">
                {copy.before}{" "}
                <Link
                  href={copy.to}
                  className="font-semibold text-zinc-200 hover:text-white underline transition ml-1"
                >
                  {copy.action}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-[11px] text-zinc-500 border-t border-[var(--line)]">
        CrackAnyInterview · Free & Open Interview Preparation Platform · Monochrome Stealth Edition
      </footer>
    </div>
  );
}
