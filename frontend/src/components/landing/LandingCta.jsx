export default function LandingCta() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-surface py-40">
      <div className="absolute inset-0 bg-primary-container/5 bg-grid-pattern" />
      <div className="relative z-10 max-w-3xl px-8 text-center">
        <div className="relative mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-container/10">
          <div className="absolute inset-0 animate-ping rounded-full border border-primary-container opacity-50" />
          <span className="material-symbols-outlined text-3xl text-primary-container">
            power_settings_new
          </span>
        </div>
        <h2 className="font-display mb-6 text-5xl font-black text-on-surface md:text-6xl">
          Ready to compile?
        </h2>
        <p className="mb-12 font-label text-xl text-on-surface-variant">
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
            className="ghost-border w-full rounded-sm bg-surface-container-highest px-6 py-4 font-label text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-container focus:outline-none focus:ring-1 focus:ring-primary-container"
            placeholder="Enter repository URL or email"
            type="email"
          />
          <button
            className="gradient-cta whitespace-nowrap rounded-sm px-8 py-4 font-headline font-bold text-on-primary-fixed shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all hover:brightness-110"
            type="submit"
          >
            Initiate Sequence
          </button>
        </form>
      </div>
    </section>
  );
}
