import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

export default function LandingNav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 shadow-sm backdrop-blur-md dark:border-[#0e0e10]/50 dark:bg-zinc-950/80 dark:shadow-[0px_20px_40px_rgba(0,255,65,0.04)] dark:backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <Link
          to="/"
          className="flex min-w-0 flex-shrink items-baseline gap-2 sm:gap-3"
        >
          <span className="text-2xl font-black italic tracking-tighter text-emerald-600 dark:text-[#00FF41]">
            SAGE
          </span>
          <span className="hidden max-w-[200px] font-label text-[10px] font-medium uppercase leading-snug tracking-wide text-zinc-500 sm:inline md:max-w-[240px] dark:text-zinc-400">
            Stateful Audit &amp; Generation Engine
          </span>
        </Link>
        <div className="hidden items-center space-x-8 md:flex">
          <button
            type="button"
            onClick={() => console.log("TODO: Implement [Product]")}
            className="scale-95 font-['Inter'] text-xs font-bold uppercase tracking-tight text-zinc-600 transition-transform hover:text-emerald-600 active:scale-100 dark:text-[#b9ccb2] dark:hover:text-[#00FF41]"
          >
            Product
          </button>
          <a
            href="#features"
            className="scale-95 font-['Inter'] text-xs font-bold uppercase tracking-tight text-zinc-600 transition-transform hover:text-emerald-600 active:scale-100 dark:text-[#b9ccb2] dark:hover:text-[#00FF41]"
          >
            Features
          </a>
          <a
            href="#architecture-flow"
            className="scale-95 font-['Inter'] text-xs font-bold uppercase tracking-tight text-zinc-600 transition-transform hover:text-emerald-600 active:scale-100 dark:text-[#b9ccb2] dark:hover:text-[#00FF41]"
          >
            Flow
          </a>
          <a
            href="#hindsight"
            className="scale-95 font-['Inter'] text-xs font-bold uppercase tracking-tight text-zinc-600 transition-transform hover:text-emerald-600 active:scale-100 dark:text-[#b9ccb2] dark:hover:text-[#00FF41]"
          >
            Hindsight
          </a>
          <a
            href="https://github.com/Mahesh91-bot/code_review_agent"
            target="_blank"
            rel="noopener noreferrer"
            className="scale-95 font-['Inter'] text-xs font-bold uppercase tracking-tight text-zinc-600 transition-transform hover:text-emerald-600 active:scale-100 dark:text-[#b9ccb2] dark:hover:text-[#00FF41]"
          >
            Docs
          </a>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <Link
            to="/login"
            className="scale-95 rounded px-3 py-2 font-['Inter'] text-xs font-bold uppercase tracking-tight text-zinc-600 transition-transform duration-300 hover:bg-emerald-500/10 hover:text-emerald-700 active:scale-100 dark:text-[#b9ccb2] dark:hover:bg-[#00FF41]/10 dark:hover:text-[#00FF41]"
          >
            Login
          </Link>
          <Link
            to="/login?mode=register"
            className="scale-95 rounded bg-emerald-500 px-4 py-2 font-['Inter'] text-xs font-bold uppercase tracking-tight text-white transition-transform hover:opacity-90 active:scale-100 dark:bg-primary-container dark:text-on-primary-fixed dark:hover:opacity-90"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
