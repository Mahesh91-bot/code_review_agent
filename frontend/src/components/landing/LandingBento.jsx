export default function LandingBento() {
  return (
    <section className="relative bg-surface py-32">
      <div className="mx-auto max-w-[1440px] px-8">
        <div className="mb-20">
          <h2 className="font-display mb-4 text-4xl font-bold text-on-surface md:text-5xl">
            Core Architecture
          </h2>
          <p className="font-label text-sm uppercase tracking-widest text-on-surface-variant">
            Beyond Syntax Checking
          </p>
        </div>
        <div className="grid auto-rows-[300px] grid-cols-1 gap-6 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-xl bg-surface-container-low p-10 md:col-span-2">
            <div className="absolute bottom-0 left-0 top-0 w-[2px] bg-primary-container" />
            <div className="absolute right-6 top-6">
              <span className="material-symbols-outlined text-3xl text-primary-container opacity-50">
                memory
              </span>
            </div>
            <h3 className="font-display mb-4 mt-8 text-3xl font-bold text-on-surface">
              Stateful Context
            </h3>
            <p className="max-w-md text-lg text-on-surface-variant">
              SAGE doesn&apos;t just read the diff. It holds the entire repository history in
              working memory, understanding architectural drift over time.
            </p>
            <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-primary-container/5 blur-2xl" />
          </div>
          <div className="ghost-border relative overflow-hidden rounded-xl bg-surface-container-lowest p-8">
            <div className="absolute right-6 top-6">
              <span className="material-symbols-outlined text-3xl text-on-surface-variant">
                robot_2
              </span>
            </div>
            <h3 className="font-display mb-4 mt-12 text-2xl font-bold text-on-surface">
              Autonomous PR Reviews
            </h3>
            <p className="text-on-surface-variant">
              Instant, actionable feedback that matches your senior engineer&apos;s exact
              pedantry level.
            </p>
          </div>
          <div className="ghost-border relative overflow-hidden rounded-xl bg-surface-container-lowest p-8">
            <div className="absolute right-6 top-6">
              <span className="material-symbols-outlined text-3xl text-on-surface-variant">
                shield_lock
              </span>
            </div>
            <h3 className="font-display mb-4 mt-12 text-2xl font-bold text-on-surface">
              Security Audits
            </h3>
            <p className="text-on-surface-variant">
              Continuous vulnerability scanning mapped against global CVE databases in
              real-time.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-surface-container-high p-0 md:col-span-2">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="relative z-10 flex h-full flex-col justify-center p-10">
              <div className="font-label mb-2 text-sm text-primary-container">
                &gt; Executing semantic analysis...
              </div>
              <div className="font-label text-lg text-on-surface">
                Analyzing 4,203 commits to determine preferred styling conventions.
              </div>
              <div className="mt-6 flex gap-2">
                <div className="h-1 w-12 bg-primary-container" />
                <div className="h-1 w-4 bg-primary-container/30" />
                <div className="h-1 w-2 bg-primary-container/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
