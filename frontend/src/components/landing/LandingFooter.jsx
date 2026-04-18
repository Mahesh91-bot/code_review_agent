export default function LandingFooter() {
  return (
    <footer className="full-width bottom-0 border-t border-[#00FF41]/10 bg-[#0e0e10] py-12">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-8 px-12 md:grid-cols-2">
        <div className="text-lg font-bold text-[#00FF41]">SAGE</div>
        <div className="flex flex-wrap gap-6 md:justify-end">
          {["Privacy", "Terms", "Security", "Status"].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => console.log(`TODO: Implement [Footer ${label}]`)}
              className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-[#b9ccb2] underline underline-offset-4 opacity-80 transition-opacity hover:text-[#00FF41] hover:opacity-100"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="font-['Space_Grotesk'] mt-8 space-y-1 text-center text-[10px] uppercase tracking-widest text-on-surface-variant opacity-50 md:col-span-2 md:text-left">
          <div>© 2026 SAGE code reviewing agent</div>
          <div>MIT licence open source</div>
        </div>
      </div>
    </footer>
  );
}
