import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const COPY = {
  login: {
    title: "Welcome back",
    lead: "Log in to continue your preparation",
    submit: "Log in",
    before: "Don't have an account?",
    action: "Sign up",
    to: "/signup",
  },
  signup: {
    title: "Create your account",
    lead: "Start your preparation with one account",
    submit: "Sign up",
    before: "Already have an account?",
    action: "Log in",
    to: "/login",
  },
  forgot: {
    title: "Reset your password",
    lead: "Choose a new password for your account",
    submit: "Update password",
    before: "Remembered it?",
    action: "Log in",
    to: "/login",
  },
};

function MailIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
}

function LockIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>;
}

function EyeIcon({ off }) {
  return off ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18" /><path d="M10.6 10.6A2 2 0 0 0 12 14a2 2 0 0 0 1.4-.6" /><path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 9.3 3.1 11 7-1 2.2-2.7 4.1-4.8 5.4" /><path d="M6.1 6.1C4.2 7.4 2.7 9.2 2 11c1.2 2.7 3.6 5 6.6 6.2" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
  );
}

export function AuthPage({ mode }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [notice, setNotice] = useState(location.state?.notice || "");
  const [tone, setTone] = useState(location.state?.notice ? "success" : "");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!location.state?.notice) return;
    setNotice(location.state.notice);
    setTone("success");
  }, [location.state]);
  const copy = COPY[mode];

  async function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      password: String(data.get("password") || ""),
      confirm: String(data.get("confirm") || ""),
    };
    if (mode === "signup") {
      const result = await auth.signup(payload);
      if (result.error) {
        setNotice(result.error);
        setTone("error");
        return;
      }
      navigate("/login", { state: { notice: "Account created. Log in to continue." } });
      return;
    }
    if (mode === "forgot") {
      const result = await auth.resetPassword(payload);
      if (result.error) {
        setNotice(result.error);
        setTone("error");
        return;
      }
      navigate("/login", { state: { notice: "Password updated. Log in with the new password." } });
      return;
    }
    const result = await auth.login(payload);
    if (result.error) {
      setNotice(result.error);
      setTone("error");
      return;
    }
    navigate("/dashboard");
  }

  return (
    <>
      <AppHeader modules />
      <section className="auth-screen">
        <div className="auth-layout">
          <div className="auth-copy">
            <p className="auth-kicker">Interview preparation platform</p>
            <h1>Prepare smarter.<br />Interview stronger.</h1>
            <p className="auth-lead">Your next opportunity starts with one focused session.</p>
            <ul className="auth-points">
              <li>
                <span className="auth-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 4h9l3 3v13H6z" /><path d="M15 4v3h3" /><path d="M9 12h6M9 16h4" /></svg></span>
                <span><strong>Structured learning plans</strong>Follow curated plans from basics to advanced</span>
              </li>
              <li>
                <span className="auth-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 3h10v18H7z" /><path d="M10 8h4M10 12h4M10 16h2" /></svg></span>
                <span><strong>Practice quizzes that build confidence</strong>Read, practice and improve step by step</span>
              </li>
              <li>
                <span className="auth-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 6l-2 12" /></svg></span>
                <span><strong>JavaScript, React &amp; React Native</strong>Cover key concepts with real interview questions</span>
              </li>
            </ul>
            <div className="auth-art" aria-hidden="true">
              <svg viewBox="0 0 460 230">
                <ellipse cx="250" cy="168" rx="150" ry="46" fill="#e7f6f0" />
                <rect x="36" y="158" width="34" height="28" rx="4" fill="#f7fbfb" stroke="#d5ebe4" />
                <path d="M53 158c-1-18 14-34 14-34s1 16-4 24c10-4 16 2 16 12-12 2-20 0-26-2z" fill="#8fd9a8" />
                <path d="M53 156C51 138 34 128 34 128s4 14 12 20c-8 2-14 8-12 16 8-2 14-4 19-8z" fill="#12b887" />
                <rect x="118" y="72" width="168" height="102" rx="12" fill="#243040" />
                <rect x="130" y="84" width="144" height="76" rx="4" fill="#17202b" />
                <path d="M146 104h46M146 118h78M146 132h36" stroke="#3ddc97" strokeWidth="4" strokeLinecap="round" />
                <path d="M146 146h58" stroke="#8b7cff" strokeWidth="4" strokeLinecap="round" />
                <path d="M104 174h198l-16 18H120z" fill="#d7dee8" />
                <rect x="178" y="192" width="52" height="6" rx="2" fill="#c5ced8" />
                <rect x="70" y="86" width="54" height="42" rx="12" fill="#fff" stroke="#e4f3ee" />
                <path d="M84 104l-8 6 8 6M110 104l8 6-8 6M102 98l-6 20" stroke="#12b887" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="292" y="42" width="108" height="78" rx="14" fill="#fff" stroke="#e4f3ee" />
                <circle cx="314" cy="66" r="8" fill="#12b887" />
                <path d="m310 66 3 3 6-6" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M330 66h48" stroke="#d5ebe4" strokeWidth="4" strokeLinecap="round" />
                <circle cx="314" cy="92" r="8" fill="#12b887" />
                <path d="m310 92 3 3 6-6" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M330 92h36" stroke="#d5ebe4" strokeWidth="4" strokeLinecap="round" />
                <rect x="318" y="168" width="86" height="12" rx="2" fill="#0c8f69" />
                <rect x="326" y="156" width="74" height="14" rx="2" fill="#12b887" />
                <rect x="334" y="146" width="60" height="12" rx="2" fill="#b7ead6" />
              </svg>
            </div>
          </div>
          <form className="auth-card" onSubmit={onSubmit}>
            <h2>{copy.title}</h2>
            <p className="auth-sub">{copy.lead}</p>
            {notice ? <p className={tone === "error" ? "auth-error" : "auth-success"}>{notice}</p> : null}
            {mode === "signup" ? (
              <label className="auth-field">Name
                <span className="auth-input"><input name="name" placeholder="Your name" required autoComplete="name" /></span>
              </label>
            ) : null}
            <label className="auth-field">Email address
              <span className="auth-input">
                <MailIcon />
                <input name="email" type="email" placeholder="you@example.com" required autoComplete="email" />
              </span>
            </label>
            <label className="auth-field">Password
              <span className="auth-input">
                <LockIcon />
                <input name="password" type={show ? "text" : "password"} placeholder="Enter your password" required minLength={6} autoComplete={mode === "login" ? "current-password" : "new-password"} />
                <button type="button" className="auth-eye" onClick={() => setShow((value) => !value)} aria-label={show ? "Hide password" : "Show password"}>
                  <EyeIcon off={show} />
                </button>
              </span>
            </label>
            {mode !== "login" ? (
              <label className="auth-field">Confirm password
                <span className="auth-input">
                  <LockIcon />
                  <input name="confirm" type={show ? "text" : "password"} placeholder="Confirm your password" required minLength={6} />
                </span>
              </label>
            ) : null}
            {mode === "login" ? <div className="auth-row"><Link to="/forgot">Forgot password?</Link></div> : null}
            <button className="auth-submit" type="submit">{copy.submit}</button>
            <p className="auth-switch">{copy.before} <Link to={copy.to}>{copy.action}</Link></p>
          </form>
        </div>
      </section>
    </>
  );
}
