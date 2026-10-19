"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { clearSession, hashPassword, loadAccounts, loadSession, nameFromEmail, saveAccounts, saveSession } from "../lib/auth.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => loadSession());
  const [accounts, setAccounts] = useState(() => loadAccounts());

  const account = accounts.find((item) => item.email === session?.email) || null;

  const value = useMemo(() => {
    async function signup({ name, email, password, confirm }) {
      const cleanEmail = email.trim().toLowerCase();
      if (!name.trim() || !cleanEmail || !password) return { error: "Enter your name, email, and password." };
      if (password.length < 6) return { error: "Use a password with at least 6 characters." };
      if (password !== confirm) return { error: "Those passwords do not match." };
      if (accounts.some((item) => item.email === cleanEmail)) return { error: "An account with this email already exists. Log in instead." };
      const next = [...accounts, { name: name.trim(), email: cleanEmail, passwordHash: await hashPassword(password) }];
      saveAccounts(next);
      setAccounts(next);
      return { ok: true };
    }

    async function login({ email, password }) {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail || !password) return { error: "Enter your email and password." };
      if (password.length < 6) return { error: "Use a password with at least 6 characters." };
      const passwordHash = await hashPassword(password);
      const existing = accounts.find((item) => item.email === cleanEmail);
      if (!existing) {
        const next = [...accounts, { name: nameFromEmail(cleanEmail), email: cleanEmail, passwordHash }];
        saveAccounts(next);
        setAccounts(next);
        saveSession(cleanEmail);
        setSession({ email: cleanEmail });
        return { ok: true, created: true };
      }
      if (existing.passwordHash !== passwordHash) {
        return { error: "That password does not match this email. Use the password you saved, or choose Forgot password." };
      }
      saveSession(cleanEmail);
      setSession({ email: cleanEmail });
      return { ok: true };
    }

    async function resetPassword({ email, password, confirm }) {
      const cleanEmail = email.trim().toLowerCase();
      const existing = accounts.find((item) => item.email === cleanEmail);
      if (!existing) return { error: "No account uses that email." };
      if (password.length < 6) return { error: "Use a password with at least 6 characters." };
      if (password !== confirm) return { error: "Those passwords do not match." };
      const passwordHash = await hashPassword(password);
      const updated = accounts.map((item) => (item.email === cleanEmail ? { ...item, passwordHash } : item));
      saveAccounts(updated);
      setAccounts(updated);
      return { ok: true };
    }

    function rename(name) {
      const clean = name.trim();
      if (!clean || !account) return;
      const next = accounts.map((item) => (item.email === account.email ? { ...item, name: clean } : item));
      saveAccounts(next);
      setAccounts(next);
    }

    function logout() {
      clearSession();
      setSession(null);
    }

    return { account, signup, login, resetPassword, rename, logout };
  }, [account, accounts]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
