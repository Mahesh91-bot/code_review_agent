export default function LandingFlow() {
  return (
    <section
      className="relative overflow-hidden bg-zinc-100 py-32 dark:bg-surface-container-lowest"
      id="architecture-flow"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-8">
        <div className="mb-24 text-center">
          <h2 className="font-display mb-4 text-4xl font-bold text-zinc-900 md:text-5xl dark:text-on-surface">
            Architecture Flow
          </h2>
          <p className="font-label text-sm uppercase tracking-widest text-zinc-600 dark:text-on-surface-variant">
            The Processing Pipeline
          </p>
        </div>
        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-12 lg:flex-row lg:gap-4">
          <div className="z-10 flex w-full flex-1 flex-col items-center lg:w-48">
            <div className="glass-panel ghost-border glow-shadow relative mb-6 flex h-32 w-full items-center justify-center overflow-hidden rounded-xl p-5">
              <pre className="w-full overflow-hidden font-mono text-[10px] leading-tight text-zinc-600 dark:text-on-surface-variant">
                {`function processData() {
  let raw = fetch();
  return parse(raw);
}`}
              </pre>
            </div>
            <h4 className="font-display mb-2 text-lg font-bold text-zinc-900 dark:text-on-surface">
              1. Code Input
            </h4>
            <p className="text-center font-body text-xs text-zinc-600 dark:text-on-surface-variant">
              Raw snippet ingested.
            </p>
          </div>
          <div className="hidden w-16 items-center justify-center lg:flex">
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-emerald-500/30 dark:bg-primary-container/30">
              <div className="animate-pulse-line absolute inset-0 bg-emerald-500 dark:bg-primary-container" />
            </div>
            <span className="material-symbols-outlined z-10 -ml-2 rounded-full text-xl text-emerald-600 shadow-sm dark:text-primary-container dark:shadow-[0_0_10px_rgba(0,255,65,0.5)]">
              chevron_right
            </span>
          </div>
          <span className="material-symbols-outlined animate-pulse text-2xl text-emerald-600 dark:text-primary-container lg:hidden lg:rotate-90">
            arrow_downward
          </span>
          <div className="z-10 flex w-full flex-1 flex-col items-center lg:w-48">
            <div className="glass-panel ghost-border glow-shadow relative mb-6 flex h-28 w-28 items-center justify-center rounded-full p-6">
              <div className="absolute inset-0 animate-[ping_3s_ease-in-out_infinite] rounded-full border border-emerald-500/40 opacity-50 dark:border-primary-container/40" />
              <span className="material-symbols-outlined text-4xl text-emerald-600 dark:text-primary-container">
                memory
              </span>
            </div>
            <h4 className="font-display mb-2 text-center text-lg font-bold text-zinc-900 dark:text-on-surface">
              2. Hindsight Memory
            </h4>
            <p className="text-center font-body text-xs text-zinc-600 dark:text-on-surface-variant">
              Historical context analyzed.
            </p>
          </div>
          <div className="hidden w-16 items-center justify-center lg:flex">
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-emerald-500/30 dark:bg-primary-container/30">
              <div
                className="animate-pulse-line absolute inset-0 bg-emerald-500 dark:bg-primary-container"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
            <span className="material-symbols-outlined z-10 -ml-2 rounded-full text-xl text-emerald-600 shadow-sm dark:text-primary-container dark:shadow-[0_0_10px_rgba(0,255,65,0.5)]">
              chevron_right
            </span>
          </div>
          <span
            className="material-symbols-outlined animate-pulse text-2xl text-emerald-600 dark:text-primary-container lg:hidden lg:rotate-90"
            style={{ animationDelay: "0.5s" }}
          >
            arrow_downward
          </span>
          <div className="z-10 flex w-full flex-1 flex-col items-center lg:w-48">
            <div className="glass-panel ghost-border glow-shadow mb-6 flex h-32 w-full flex-col items-center justify-center rounded-xl p-5">
              <div className="w-full space-y-2">
                <div className="h-1.5 w-full rounded bg-emerald-500/40 dark:bg-primary-container/40" />
                <div className="h-1.5 w-3/4 rounded bg-emerald-500/70 dark:bg-primary-container/70" />
                <div className="h-1.5 w-1/2 rounded bg-emerald-500/20 dark:bg-primary-container/20" />
              </div>
              <span className="material-symbols-outlined mt-3 animate-bounce text-2xl text-emerald-600 dark:text-primary-container">
                account_tree
              </span>
            </div>
            <h4 className="font-display mb-2 text-lg font-bold text-zinc-900 dark:text-on-surface">
              3. Cascade Flow
            </h4>
            <p className="text-center font-body text-xs text-zinc-600 dark:text-on-surface-variant">
              Decision logic routed.
            </p>
          </div>
          <div className="hidden w-16 items-center justify-center lg:flex">
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-emerald-500/30 dark:bg-primary-container/30">
              <div
                className="animate-pulse-line absolute inset-0 bg-emerald-500 dark:bg-primary-container"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <span className="material-symbols-outlined z-10 -ml-2 rounded-full text-xl text-emerald-600 shadow-sm dark:text-primary-container dark:shadow-[0_0_10px_rgba(0,255,65,0.5)]">
              chevron_right
            </span>
          </div>
          <span
            className="material-symbols-outlined animate-pulse text-2xl text-emerald-600 dark:text-primary-container lg:hidden lg:rotate-90"
            style={{ animationDelay: "1s" }}
          >
            arrow_downward
          </span>
          <div className="z-10 flex w-full flex-1 flex-col items-center lg:w-56">
            <div className="glass-panel ghost-border glow-shadow relative mb-6 flex h-32 w-full flex-col justify-center rounded-xl border-l-2 border-l-emerald-500 p-4 dark:border-l-primary-container">
              <div className="font-label mb-2 flex items-center text-[10px] uppercase text-emerald-600 dark:text-primary-container">
                <span className="material-symbols-outlined mr-1 text-[12px]">auto_awesome</span>{" "}
                AI Review
              </div>
              <pre className="overflow-hidden font-mono text-[10px] leading-relaxed">
                <span className="text-error line-through opacity-60">let raw = fetch();</span>
                {"\n"}
                <span className="text-emerald-600 dark:text-primary-container">
                  + const data = await fetchCached();
                </span>
              </pre>
            </div>
            <h4 className="font-display mb-2 text-center text-lg font-bold text-zinc-900 dark:text-on-surface">
              4. Smart Review
            </h4>
            <p className="text-center font-body text-xs text-zinc-600 dark:text-on-surface-variant">
              Annotated output delivered.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
