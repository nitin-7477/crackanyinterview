import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import { HomeLayout } from "./components/HomeLayout.jsx";
import { AuthPage } from "./pages/AuthPage.jsx";
import { BookmarksPage } from "./pages/BookmarksPage.jsx";
import { DashboardPage } from "./pages/DashboardPage.jsx";
import { MockPage } from "./pages/MockPage.jsx";
import { ProgressPage } from "./pages/ProgressPage.jsx";
import { SettingsPage } from "./pages/SettingsPage.jsx";
import { TopicPage } from "./pages/TopicPage.jsx";

function Guest({ children }) {
  const { account } = useAuth();
  return account ? <Navigate to="/dashboard" replace /> : children;
}

function Private({ children }) {
  const { account } = useAuth();
  return account ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { account } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Navigate to={account ? "/dashboard" : "/login"} replace />} />
      <Route path="/login" element={<Guest><AuthPage key="login" mode="login" /></Guest>} />
      <Route path="/signup" element={<Guest><AuthPage key="signup" mode="signup" /></Guest>} />
      <Route path="/forgot" element={<Guest><AuthPage key="forgot" mode="forgot" /></Guest>} />
      <Route element={<Private><HomeLayout /></Private>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/mock" element={<MockPage />} />
      </Route>
      <Route path="/:topicId/day/:day" element={<Private><TopicPage /></Private>} />
      <Route path="/:topicId" element={<Private><TopicPage /></Private>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
