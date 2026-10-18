const ACCOUNTS_KEY = "interview-accounts-v1";
const SESSION_KEY = "interview-session-v1";

export function loadAccounts() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function loadSession() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    return parsed?.email ? parsed : null;
  } catch {
    return null;
  }
}

export function saveSession(email) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((value) => value.toString(16).padStart(2, "0")).join("");
}

export function initials(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "IN";
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}

export function nameFromEmail(email) {
  const raw = email.split("@")[0].replace(/[._-]+/g, " ").trim() || "Learner";
  return raw.replace(/\b\w/g, (letter) => letter.toUpperCase());
}
