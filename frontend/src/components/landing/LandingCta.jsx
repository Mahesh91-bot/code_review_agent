export default function LandingCta() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-zinc-100 py-40 dark:bg-surface">
      <div className="absolute inset-0 bg-emerald-500/[0.06] bg-grid-pattern dark:bg-primary-container/5" />
      <div className="relative z-10 max-w-3xl px-8 text-center">
        <div className="relative mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 dark:bg-primary-container/10">
          <div className="absolute inset-0 animate-ping rounded-full border border-emerald-500/50 opacity-50 dark:border-primary-container" />
          <span className="material-symbols-outlined text-3xl text-emerald-600 dark:text-primary-container">
            power_settings_new
          </span>
        </div>
        <h2 className="font-display mb-6 text-5xl font-black text-zinc-900 md:text-6xl dark:text-on-surface">
          Ready to compile?
        </h2>
        <p className="mb-12 font-label text-xl text-zinc-600 dark:text-on-surface-variant">
          Deploy SAGE to your repository in under 2 minutes.
        </p>
        <form
          className="mx-auto flex max-w-xl flex-col justify-center gap-4 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("TODO: Implement [Initiate Sequence / repository signup]");
          }}
        >
          <input
            className="ghost-border w-full rounded-sm bg-white px-6 py-4 font-label text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:bg-surface-container-highest dark:text-on-surface dark:placeholder:text-on-surface-variant/50 dark:focus:border-primary-container dark:focus:ring-primary-container"
            placeholder="Enter repository URL or email"
            type="email"
          />
          <button
            className="gradient-cta whitespace-nowrap rounded-sm px-8 py-4 font-headline font-bold text-on-primary-fixed shadow-md shadow-emerald-500/20 transition-all hover:brightness-110 dark:shadow-[0_0_20px_rgba(0,255,65,0.2)]"
            type="submit"
          >
            Initiate Sequence
          </button>
        </form>
      </div>
    </section>
  );
}
