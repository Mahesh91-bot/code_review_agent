import { Linkedin, Rss } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="full-width bottom-0 border-t border-zinc-200 bg-zinc-100 py-12 dark:border-[#00FF41]/10 dark:bg-[#0e0e10]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-8 px-12 md:grid-cols-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:justify-start md:gap-8">
          <div className="text-lg font-bold text-emerald-600 dark:text-[#00FF41]">SAGE</div>
          <div className="flex items-center gap-3">
            <a
              href="https://linkedin.com/in/YOUR_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 bg-white text-zinc-700 transition-colors hover:border-emerald-500 hover:text-emerald-600 dark:border-outline-variant/30 dark:bg-surface-container-high dark:text-on-surface dark:hover:border-primary-container dark:hover:text-primary-container"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" strokeWidth={2} />
            </a>
            <a
              href="https://medium.com/@YOUR_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 bg-white text-zinc-700 transition-colors hover:border-emerald-500 hover:text-emerald-600 dark:border-outline-variant/30 dark:bg-surface-container-high dark:text-on-surface dark:hover:border-primary-container dark:hover:text-primary-container"
              aria-label="Medium blog"
            >
              <Rss className="h-5 w-5" strokeWidth={2} />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 md:justify-end">
          {["Privacy", "Terms", "Security", "Status"].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => console.log(`TODO: Implement [Footer ${label}]`)}
              className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-zinc-600 underline underline-offset-4 opacity-90 transition-opacity hover:text-emerald-600 hover:opacity-100 dark:text-[#b9ccb2] dark:hover:text-[#00FF41]"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="font-['Space_Grotesk'] mt-8 space-y-1 text-center text-[10px] uppercase tracking-widest text-zinc-500 opacity-80 dark:text-on-surface-variant dark:opacity-50 md:col-span-2 md:text-left">
          <div>© 2026 SAGE code reviewing agent</div>
          <div>MIT licence open source</div>
        </div>
      </div>
    </footer>
  );
}
