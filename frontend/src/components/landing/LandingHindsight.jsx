export default function LandingHindsight() {
  return (
    <section
      className="relative border-y border-outline-variant/10 bg-surface-container-low py-32"
      id="hindsight"
    >
      <div className="mx-auto max-w-[1440px] px-8">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          <div className="lg:w-1/2">
            <span className="font-label mb-4 block text-sm uppercase tracking-widest text-primary-container">
              Stateful Audit Engine
            </span>
            <h2 className="font-display mb-8 text-4xl font-black leading-tight text-on-surface md:text-5xl">
              Deep Dive:
              <br />
              <span className="text-on-surface-variant">Hindsight</span>
            </h2>
            <div className="font-body mb-12 space-y-6 text-lg text-on-surface-variant">
              <p>
                Hindsight is the foundational memory layer of SAGE. It doesn&apos;t just read
                code; it understands the history, the &apos;why&apos; behind architectural choices,
                and structural drift.
              </p>
              <p>
                It acts as a persistent ledger, auditing PRs against historical intent rather
                than just static rules.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => console.log("TODO: Implement [View Hindsight GitHub]")}
                className="glass-panel ghost-border flex items-center justify-center gap-2 rounded-sm px-6 py-3 font-headline text-sm font-bold text-on-surface transition-all hover:bg-surface-variant/60"
              >
                <span className="material-symbols-outlined text-xl">code</span>
                <span>View Hindsight GitHub</span>
              </button>
              <a
                href="https://hindsight.vectorize.io"
                target="_blank"
                rel="noreferrer"
                className="glass-panel ghost-border flex items-center justify-center gap-2 rounded-sm px-6 py-3 font-headline text-sm font-bold text-on-surface transition-all hover:bg-surface-variant/60"
              >
                <span className="material-symbols-outlined text-xl">language</span>
                <span>Visit Website</span>
              </a>
            </div>
          </div>
          <div className="glow-shadow relative flex w-full flex-col overflow-hidden rounded-lg border border-outline-variant/15 bg-surface font-label text-xs text-on-surface-variant lg:w-1/2">
            <div className="flex items-center justify-between border-b border-outline-variant/15 bg-surface-container-high p-3">
              <span className="uppercase tracking-widest">hindsight_cli</span>
              <div className="flex gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-outline-variant/40" />
                <div className="h-2.5 w-2.5 rounded-full bg-outline-variant/40" />
                <div className="h-2.5 w-2.5 rounded-full bg-outline-variant/40" />
              </div>
            </div>
            <div className="h-[300px] flex-grow space-y-3 overflow-y-auto bg-surface p-6 opacity-90">
              <div className="flex gap-4">
                <span className="w-4 text-outline-variant">01</span>
                <span className="text-primary-container">
                  &gt; hindsight init --ledger=core_auth
                </span>
              </div>
              <div className="flex gap-4">
                <span className="w-4 text-outline-variant">02</span>
                <span>[INFO] Initializing stateful vector ledger...</span>
              </div>
              <div className="flex gap-4">
                <span className="w-4 text-outline-variant">03</span>
                <span>[INFO] Indexing historical commit tree (depth: 50)</span>
              </div>
              <div className="flex gap-4">
                <span className="w-4 text-outline-variant">04</span>
                <span className="text-primary-container">&gt; hindsight audit pr_1042</span>
              </div>
              <div className="flex gap-4">
                <span className="w-4 text-outline-variant">05</span>
                <span>[WARN] Structural drift detected in Auth module.</span>
              </div>
              <div className="flex gap-4">
                <span className="w-4 text-outline-variant">06</span>
                <span>[ANALYSIS] PR violates architectural decision ADR-004.</span>
              </div>
              <div className="flex gap-4">
                <span className="w-4 text-outline-variant">07</span>
                <span className="text-error">Rejecting PR. See report for details.</span>
              </div>
              <div className="flex gap-4">
                <span className="w-4 text-outline-variant">08</span>
                <span className="animate-pulse text-primary-container">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
