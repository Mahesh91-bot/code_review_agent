export default function LandingHero() {
  return (
    <section className="relative flex min-h-[921px] items-center justify-center overflow-hidden bg-zinc-100 bg-grid-pattern pb-32 pt-20 dark:bg-surface-container-lowest">
      <div className="pointer-events-none absolute left-[-8rem] top-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl mix-blend-multiply dark:bg-primary-container/5 dark:mix-blend-screen" />
      <div className="pointer-events-none absolute bottom-1/4 right-[-8rem] h-[500px] w-[500px] rounded-full bg-emerald-400/15 blur-[100px] mix-blend-multiply dark:bg-primary-container/10 dark:mix-blend-screen" />
      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-8 lg:grid-cols-12">
        <div className="flex flex-col items-start text-left lg:col-span-8">
          <div className="mb-8 flex items-center space-x-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 dark:bg-primary-container" />
            <span className="font-label text-sm uppercase tracking-widest text-zinc-500 dark:text-on-surface-variant">
              System Online // v2.4.1
            </span>
          </div>
          <h1 className="font-display -ml-1 mb-8 w-[120%] text-5xl font-black leading-[0.9] text-zinc-900 md:text-7xl lg:text-8xl dark:text-on-surface">
            The Sage is <br />
            <span className="text-emerald-600 dark:text-surface-tint">Watching.</span>
          </h1>
          <p className="mb-12 max-w-2xl font-body text-xl leading-relaxed text-zinc-600 md:text-2xl dark:text-on-surface-variant">
            Stateful AI code reviews that remember your team&apos;s history. Stop
            repeating the same PR comments and let the engine enforce your
            architectural intent.
          </p>
          <div className="flex w-full flex-col items-center gap-6 sm:w-auto sm:flex-row">
            <a
              href="https://youtube.com/watch?v=YOUR_VIDEO_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-cta w-full rounded-sm px-10 py-4 text-center font-headline text-lg font-bold text-on-primary-fixed shadow-md shadow-emerald-500/25 transition-all hover:brightness-110 dark:shadow-[0_0_20px_rgba(0,255,65,0.3)] sm:w-auto"
            >
              Initialize Demo
            </a>
            <a
              href="https://github.com/Mahesh91-bot/code_review_agent"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel ghost-border flex w-full items-center justify-center gap-2 rounded-sm px-8 py-4 font-headline text-lg font-bold text-zinc-900 transition-all hover:bg-zinc-100/80 sm:w-auto dark:text-on-surface dark:hover:bg-surface-variant/60"
            >
              <span className="material-symbols-outlined text-xl">terminal</span>
              View Docs
            </a>
          </div>
        </div>
        <div className="mt-32 hidden h-full flex-col justify-end lg:col-span-4 lg:flex">
          <div className="glass-panel ghost-border glow-shadow rounded-lg p-6">
            <div className="font-label mb-4 border-b border-zinc-200/80 pb-2 text-xs uppercase tracking-widest text-zinc-500 dark:border-outline-variant/15 dark:text-on-surface-variant">
              Recent Activity Log
            </div>
            <div className="space-y-4 font-label text-sm text-zinc-800 dark:text-on-surface">
              <div className="flex items-center justify-between">
                <span className="text-emerald-600 dark:text-primary-container">Auditing PR #4092</span>
                <span className="text-zinc-500 dark:text-on-surface-variant">0.4s</span>
              </div>
              <div className="flex items-center justify-between opacity-70">
                <span>Context loaded (3.2MB)</span>
                <span className="text-zinc-500 dark:text-on-surface-variant">0.1s</span>
              </div>
              <div className="flex items-center justify-between opacity-50">
                <span>Memory synced</span>
                <span className="text-zinc-500 dark:text-on-surface-variant">0.8s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
