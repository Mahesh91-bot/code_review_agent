import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/useTheme.js";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center rounded-md border border-zinc-300/90 bg-white/90 p-2 text-zinc-800 shadow-sm transition-colors hover:bg-zinc-100 dark:border-outline-variant/25 dark:bg-surface-container-high/90 dark:text-on-surface dark:shadow-none dark:hover:bg-surface-variant/50 ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" strokeWidth={2} /> : <Moon className="h-4 w-4" strokeWidth={2} />}
    </button>
  );
}
