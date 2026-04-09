// Layout.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";

const Layout = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-[#030712] dark:text-slate-100">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
        className="fixed right-5 top-5 z-[120] inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-slate-900/75 dark:text-slate-100 dark:hover:bg-slate-900"
      >
        <span className="text-base">{isDarkMode ? "☀" : "☾"}</span>
        <span>{isDarkMode ? "Light" : "Dark"}</span>
      </button>
      {children}
    </div>
  );
};

export default Layout;
