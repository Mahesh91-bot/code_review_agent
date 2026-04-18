import { Link, useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-surface font-body text-on-surface">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(to right, #3b4b37 1px, transparent 1px), linear-gradient(to bottom, #3b4b37 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-container/5 blur-[120px]" />
      <main className="relative z-10 flex flex-grow items-center justify-center p-6">
        <div className="relative grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-xl bg-surface-container-low shadow-[0px_20px_40px_rgba(0,255,65,0.04)] md:grid-cols-2">
          <div className="pointer-events-none absolute inset-0 rounded-xl border border-outline-variant/15" />
          <div className="relative hidden flex-col justify-between overflow-hidden bg-surface-container-lowest p-12 md:flex">
            <div className="absolute inset-0 opacity-20">
              <img
                alt="Abstract visualization of server racks and data flow"
                className="h-full w-full object-cover grayscale mix-blend-overlay"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc5UVEGVfg9Ve746wltrMtVvEw8g-5L6hA9nUuS0H67y79Te8BdQg6FkY6lKsd6fP8cNKfWQ6xRXKVFJ9glepI_BDCxqKAzCqfsHR2KD7a2WDZ48mALKhMMqdUyylTt4Jno0B1Y1P2IuTJBT_txV9sNXVuNvmn6DlroJa0Hzo24J8Bo7ipKraAQ9CXXD2Lgw1vxfP5ECAU9kBrYCIluFjjrvuy7K6rc4X8W_Z12cbEEcbTp1aJ2Cf698qKKcnQBgzi8VQ0Z4jXzWv9"
              />
            </div>
            <div className="relative z-10">
              <h1 className="font-headline mb-4 text-4xl font-black italic tracking-tighter text-primary-container">
                SAGE
              </h1>
              <p className="font-label text-sm uppercase tracking-widest text-on-surface-variant">
                Kinetic Ledger System
              </p>
            </div>
            <div className="relative z-10 mt-auto">
              <p className="font-headline max-w-sm text-3xl font-bold leading-tight tracking-tight text-on-surface">
                Stateful audit engine for high-end editorial experiences.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center bg-surface/40 p-8 backdrop-blur-3xl md:p-12 lg:p-16">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 md:hidden">
                <h1 className="font-headline text-3xl font-black italic tracking-tighter text-primary-container">
                  SAGE
                </h1>
              </div>
              <div className="mb-10 text-center md:text-left">
                <h2 className="font-headline mb-2 text-3xl font-bold tracking-tight">Access Portal</h2>
                <p className="font-label text-sm uppercase tracking-widest text-on-surface-variant">
                  Authenticate to continue
                </p>
              </div>
              <div className="mb-8 space-y-4">
                <button
                  type="button"
                  onClick={() => console.log("TODO: Implement [Continue with Google]")}
                  className="flex w-full items-center justify-center gap-3 rounded-sm border border-outline-variant/20 bg-surface-variant/20 px-4 py-3 font-label text-sm uppercase tracking-wider text-on-surface backdrop-blur-md transition-colors hover:bg-surface-container-highest"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                  </svg>
                  Continue with Google
                </button>
                <button
                  type="button"
                  onClick={() => console.log("TODO: Implement [Continue with GitHub]")}
                  className="flex w-full items-center justify-center gap-3 rounded-sm border border-outline-variant/20 bg-surface-variant/20 px-4 py-3 font-label text-sm uppercase tracking-wider text-on-surface backdrop-blur-md transition-colors hover:bg-surface-container-highest"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                      fillRule="evenodd"
                    />
                  </svg>
                  Continue with GitHub
                </button>
              </div>
              <div className="relative mb-6 flex items-center py-5">
                <div className="flex-grow border-t border-outline-variant/30" />
                <span className="mx-4 flex-shrink-0 font-label text-xs uppercase tracking-widest text-on-surface-variant">
                  Or
                </span>
                <div className="flex-grow border-t border-outline-variant/30" />
              </div>
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate("/dashboard");
                }}
              >
                <div>
                  <label
                    className="mb-2 block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className="w-full rounded-sm border-none bg-surface-container-highest px-4 py-3 font-body text-on-surface placeholder:text-on-surface-variant/50 transition-all focus:shadow-[0_0_10px_rgba(0,255,65,0.1)] focus:ring-1 focus:ring-primary"
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-baseline justify-between">
                    <label
                      className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => console.log("TODO: Implement [Password Reset]")}
                      className="font-label text-xs uppercase tracking-wider text-primary-container transition-colors hover:text-primary-fixed-dim"
                    >
                      Reset
                    </button>
                  </div>
                  <input
                    className="w-full rounded-sm border-none bg-surface-container-highest px-4 py-3 font-body text-on-surface placeholder:text-on-surface-variant/50 transition-all focus:shadow-[0_0_10px_rgba(0,255,65,0.1)] focus:ring-1 focus:ring-primary"
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                  />
                </div>
                <button
                  className="mt-8 w-full rounded-none bg-gradient-to-br from-primary-container to-primary-fixed-dim py-4 font-headline text-sm font-bold uppercase tracking-wider text-on-primary-fixed shadow-[0px_10px_20px_rgba(0,255,65,0.1)] transition-opacity hover:opacity-90"
                  type="submit"
                >
                  Authenticate
                </button>
              </form>
              <div className="mt-8 text-center">
                <p className="font-body text-sm text-on-surface-variant">
                  No access?{" "}
                  <button
                    type="button"
                    onClick={() => console.log("TODO: Implement [Request provisioning]")}
                    className="ml-1 border-b border-primary-container/30 pb-0.5 text-primary-container transition-colors hover:border-primary-container hover:text-primary-fixed-dim"
                  >
                    Request provisioning
                  </button>
                </p>
              </div>
              <p className="mt-6 text-center font-label text-xs text-on-surface-variant">
                <Link to="/" className="text-primary-container hover:underline">
                  ← Back to landing
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
