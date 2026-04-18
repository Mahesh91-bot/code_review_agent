export default function LandingFeatures() {
  return (
    <section
      className="relative bg-zinc-200/50 py-32 dark:bg-surface-container-low"
      id="features"
    >
      <div className="mx-auto max-w-[1440px] px-8">
        <div className="mb-20 text-center">
          <h2 className="font-display mb-4 text-4xl font-bold text-zinc-900 md:text-5xl dark:text-on-surface">
            Core Capabilities
          </h2>
          <p className="font-label text-sm uppercase tracking-widest text-zinc-600 dark:text-on-surface-variant">
            Engineered for Velocity
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "psychology",
              title: "Stateful Team Memory",
              body: "SAGE doesn’t just review syntax; it builds institutional knowledge. Powered by a persistent memory engine, SAGE remembers every piece of feedback, architectural decision, and past mistake your team has made, ensuring you never review the same anti-pattern twice."
            },
            {
              icon: "tune",
              title: "Hyper-Personalized Code Standards",
              body: "Ditch the generic AI advice. SAGE adapts to your codebase. Whether your team strictly uses const over let, prefers fetch over axios, or has highly specific security guards, SAGE enforces your unique internal rules with zero manual configuration."
            },
            {
              icon: "auto_fix_high",
              title: "1-Click Auto-Remediation",
              body: "Finding technical debt is only half the battle. SAGE doesn't just leave comments—it generates the exact, corrected code block instantly. Review, approve, and merge fixes with a single click, accelerating your PR velocity."
            },
            {
              icon: "loop",
              title: "The Continuous Learning Loop",
              body: "SAGE gets smarter with every interaction. Disagree with a review? Give it a correction once, and SAGE permanently updates its internal model. It grows and adapts alongside your evolving codebase in real-time."
            },
            {
              icon: "query_stats",
              title: "Engineering Analytics Dashboard",
              body: "Turn code reviews into actionable metrics. Get a bird’s-eye view of your team's technical health. Identify recurring code smells, track technical debt reduction, and pinpoint exactly where junior developers need more training."
            },
            {
              icon: "integration_instructions",
              title: "Seamless Workflow Integration",
              body: "SAGE lives where your developers live. From an intuitive web portal to automated GitHub Pull Request analysis, SAGE provides instant, contextual feedback before a human reviewer ever has to look at the code."
            }
          ].map((card) => (
            <div
              key={card.title}
              className="glass-panel ghost-border rounded-xl p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-white/90 hover:shadow-2xl hover:shadow-emerald-500/20 dark:hover:bg-surface-variant/40 dark:hover:shadow-primary-container/20"
            >
              <span className="material-symbols-outlined mb-6 text-4xl text-emerald-600 dark:text-primary-container">
                {card.icon}
              </span>
              <h3 className="font-display mb-3 text-xl font-bold text-zinc-900 dark:text-on-surface">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-on-surface-variant">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
