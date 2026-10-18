import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { AppHeader } from "./AppHeader.jsx";
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

export function HomeLayout() {
  const { account, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <AppHeader home account={account} onLogout={() => { logout(); navigate("/login"); }} />
      <div className="home">
        <aside className="home-side">
          <nav className="home-nav" aria-label="Dashboard">
            {NAV.map(([id, label, to]) => (
              <NavLink key={id} to={to} end={id === "dashboard"} className={({ isActive }) => `home-link${isActive ? " is-active" : ""}`}>
                <Icon name={id} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="home-main">
          <Outlet />
        </div>
      </div>
    </>
  );
}
