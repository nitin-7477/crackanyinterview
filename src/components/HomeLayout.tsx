"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext.jsx";
import { AppHeader } from "./AppHeader";
import { Icon } from "./Icons.jsx";

const NAV = [
  ["dashboard", "Dashboard", "/dashboard"],
  ["javascript", "JavaScript", "/javascript"],
  ["strings", "Strings", "/strings"],
  ["output", "Output", "/output"],
  ["react", "React", "/react"],
  ["react-native", "React Native", "/react-native"],
  ["mock", "Mock Interviews", "/mock"],
  ["progress", "Progress", "/progress"],
  ["bookmarks", "Bookmarks", "/bookmarks"],
  ["settings", "Settings", "/settings"],
];

export function HomeLayout({ children }: { children?: React.ReactNode }) {
  const { account, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <AppHeader
        home
        account={account}
        onLogout={() => {
          logout();
          router.push("/login");
        }}
      />
      <div className="home">
        <aside className="home-side">
          <nav className="home-nav" aria-label="Dashboard">
            {NAV.map(([id, label, to]) => {
              const isActive = id === "dashboard" ? pathname === "/dashboard" : pathname.startsWith(to);
              return (
                <Link key={id} href={to} className={`home-link${isActive ? " is-active" : ""}`}>
                  <Icon name={id} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="home-main">{children}</div>
      </div>
    </>
  );
}
