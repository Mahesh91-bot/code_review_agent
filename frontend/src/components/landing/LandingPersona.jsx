export default function LandingPersona() {
  return (
    <section className="relative border-y border-zinc-200 bg-zinc-50 py-32 dark:border-outline-variant/10 dark:bg-surface-container-lowest">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-16 px-8 lg:grid-cols-2">
        <div className="relative">
          <img
            alt="Server room with abstract green data streams"
            className="aspect-square w-full rounded-xl object-cover opacity-60 grayscale contrast-125 filter"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnI62Bfz68_rsM9xdDUOG-xxiUCCPRUnKBchW9MFdgOqibnjT05Q77TBEUJ5OjZeVaIiuv0BLL95tHN-Mo7XvViVUah2AwmnlFVZVbjymVpTyz5iucTnoGBsUK6vxhMOcv7C6tkI7TMlUjEDbF7bgCdPo32rYIcdSXUZV1X2b949mYDOtouhrUpIZGZH5_mRlv0F3DnD4gnUbxenHiABX1vsrQVj7XdBA3lhMU672qT2gUwHJy9HRvBRX0Eu9XGgs3mHIC-7XRjRAR"
          />
          <div className="absolute inset-0 rounded-xl bg-primary-container/10 mix-blend-overlay" />
          <div className="glass-panel ghost-border glow-shadow absolute -bottom-8 -left-8 rounded-lg p-6">
            <div className="font-label mb-1 text-xs text-emerald-600 dark:text-primary-container">
              PERSONA ACTIVE
            </div>
            <div className="font-display text-xl font-bold text-zinc-900 dark:text-on-surface">
              The Veteran Senior
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-display mb-8 text-5xl font-black leading-tight text-zinc-900 dark:text-on-surface">
            Not just a linter.
            <br />A partner.
          </h2>
          <p className="mb-8 font-body text-xl text-zinc-600 dark:text-on-surface-variant">
            We trained SAGE on the communication patterns of top staff engineers. It
            doesn&apos;t just point out errors; it explains the architectural reasoning
            behind them, mentoring your team as they code.
          </p>
          <ul className="space-y-6">
            <li className="flex items-start">
              <span className="material-symbols-outlined mr-4 mt-1 text-emerald-600 dark:text-primary-container">
                check_circle
              </span>
              <span className="text-lg text-zinc-800 dark:text-on-surface">
                Adapts to your internal jargon and naming conventions.
              </span>
            </li>
            <li className="flex items-start">
              <span className="material-symbols-outlined mr-4 mt-1 text-emerald-600 dark:text-primary-container">
                check_circle
              </span>
              <span className="text-lg text-zinc-800 dark:text-on-surface">
                Links comments directly to internal documentation.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
