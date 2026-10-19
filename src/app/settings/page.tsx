"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext.jsx";
import { useStudy } from "@/context/StudyContext.jsx";
import { HomeLayout } from "@/components/HomeLayout";
import { useTheme } from "@/context/ThemeContext";

export default function SettingsPage() {
  const { account, rename } = useAuth();
  const { state, dispatch } = useStudy();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!account) {
      router.replace("/login");
    }
  }, [account, router]);

  if (!account) return null;

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    rename(String(data.get("name") || ""));
    dispatch({ type: "set-goal", goal: String(data.get("goal") || "").trim() || "Land your dream job" });
    setNote("✓ Profile & preferences saved successfully.");
    setTimeout(() => setNote(""), 3000);
  }

  return (
    <HomeLayout>
      <div className="home-kicker">Preferences & Account</div>
      <h1>Profile Settings</h1>
      <p className="home-lead">Manage your profile information, study targets, and visual interface preferences.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, maxWidth: 900 }}>
        {/* Account & Goal Card */}
        <form className="settings-form" onSubmit={onSubmit} style={{ maxWidth: "100%" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 16, color: "var(--ink)" }}>Profile & Target Role</h3>
          
          <label>
            Full Name
            <input name="name" defaultValue={account?.name || ""} required placeholder="Your full name" />
          </label>

          <label>
            Email Address (Read-only)
            <input value={account?.email || ""} disabled readOnly />
          </label>

          <label>
            Target Goal / Role
            <input name="goal" defaultValue={state.goal} placeholder="e.g. Senior Frontend Engineer at FAANG" />
          </label>

          <button className="dash-go" type="submit" style={{ marginTop: 8 }}>
            Save Changes
          </button>

          {note && <p style={{ margin: "8px 0 0", color: "var(--brand)", fontSize: 13, fontWeight: 600 }}>{note}</p>}
        </form>

        {/* Appearance & Interface Card */}
        <div className="settings-form" style={{ maxWidth: "100%", alignContent: "start" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 16, color: "var(--ink)" }}>Appearance & Theme</h3>
          <p style={{ margin: "0 0 16px", color: "var(--muted)", fontSize: 13, lineHeight: 1.5 }}>
            Switch between dark and light mode for optimal contrast when studying or coding.
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12 }}>
            <div>
              <strong style={{ display: "block", fontSize: 14, color: "var(--ink)" }}>Dark Mode (LeetCode Theme)</strong>
              <small style={{ color: "var(--muted)" }}>Currently: {theme === "dark" ? "Dark Active" : "Light Active"}</small>
            </div>
            <button
              type="button"
              className="dash-go"
              onClick={toggleTheme}
              style={{ padding: "8px 16px", fontSize: 12.5 }}
            >
              Toggle to {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>

          <div style={{ marginTop: 24, padding: "14px 16px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12 }}>
            <strong style={{ display: "block", fontSize: 14, color: "var(--ink)", marginBottom: 4 }}>💡 Interview Preparation Tip</strong>
            <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
              Studying 20 questions every single day with consistent mock quizzes outperforms weekend cramming by 4x in retention rate.
            </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
