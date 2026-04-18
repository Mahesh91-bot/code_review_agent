import { Link } from "react-router-dom";

export default function LandingNav() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#131315]/80 shadow-[0px_20px_40px_rgba(0,255,65,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-4">
        <Link
          to="/"
          className="text-2xl font-black italic tracking-tighter text-[#00FF41]"
        >
          SAGE
        </Link>
        <div className="hidden items-center space-x-8 md:flex">
          <button
            type="button"
            onClick={() => console.log("TODO: Implement [Product]")}
            className="scale-95 font-['Inter'] text-xs font-bold uppercase tracking-tight text-[#b9ccb2] transition-transform hover:text-[#00FF41] active:scale-100"
          >
            Product
          </button>
          <a
            href="#features"
            className="scale-95 font-['Inter'] text-xs font-bold uppercase tracking-tight text-[#b9ccb2] transition-transform hover:text-[#00FF41] active:scale-100"
          >
            Features
          </a>
          <a
            href="#architecture-flow"
            className="scale-95 font-['Inter'] text-xs font-bold uppercase tracking-tight text-[#b9ccb2] transition-transform hover:text-[#00FF41] active:scale-100"
          >
            Flow
          </a>
          <a
            href="#hindsight"
            className="scale-95 font-['Inter'] text-xs font-bold uppercase tracking-tight text-[#b9ccb2] transition-transform hover:text-[#00FF41] active:scale-100"
          >
            Hindsight
          </a>
          <button
            type="button"
            onClick={() => console.log("TODO: Implement [Docs]")}
            className="scale-95 font-['Inter'] text-xs font-bold uppercase tracking-tight text-[#b9ccb2] transition-transform hover:text-[#00FF41] active:scale-100"
          >
            Docs
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="scale-95 rounded px-4 py-2 font-['Inter'] text-xs font-bold uppercase tracking-tight text-[#b9ccb2] transition-transform duration-300 hover:bg-[#00FF41]/10 hover:text-[#00FF41] active:scale-100"
          >
            Login
          </Link>
          <button
            type="button"
            onClick={() => console.log("TODO: Implement [Register / Sign Up]")}
            className="scale-95 rounded bg-primary-container px-6 py-2 font-['Inter'] text-xs font-bold uppercase tracking-tight text-on-primary-fixed transition-transform hover:opacity-90 active:scale-100"
          >
            Register
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 h-px w-full bg-[#0e0e10]/50" />
    </nav>
  );
}
