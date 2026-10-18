import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useStudy } from "../context/StudyContext.jsx";

export function SettingsPage() {
  const { account, rename } = useAuth();
  const { state, dispatch } = useStudy();
  const [note, setNote] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    rename(String(data.get("name") || ""));
    dispatch({ type: "set-goal", goal: String(data.get("goal") || "").trim() || "Land your dream job" });
    setNote("Saved.");
  }

  return (
    <>
      <p className="home-kicker">Account</p>
      <h1>Settings</h1>
      <form className="settings-form" onSubmit={onSubmit}>
        <label>Name<input name="name" defaultValue={account?.name || ""} required /></label>
        <label>Email<input value={account?.email || ""} disabled readOnly /></label>
        <label>Your goal<input name="goal" defaultValue={state.goal} /></label>
        <button className="dash-go" type="submit">Save</button>
      </form>
      <p className="home-lead">{note}</p>
    </>
  );
}
