import Link from "next/link";
import { MdArrowOutward, MdMenuBook } from "react-icons/md";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-6 pt-32 pb-10 sm:px-10 sm:pt-40 lg:pt-48"
    >
      {/* Ambient light — broad glow washing down from the top of the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-64 left-1/2 h-[620px] w-[min(1100px,140vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(129,51,241,0.42)_0%,rgba(92,0,225,0.16)_42%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[min(620px,90vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(180,138,241,0.55)_0%,transparent_68%)]"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <h1 className="hero-gradient-text font-poppins text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
          AgentGate
        </h1>

        <p className="mt-4 font-poppins text-lg font-semibold leading-[150%] text-purple-100 sm:text-xl lg:text-2xl">
          Guardrails for AI Agent Actions
        </p>

        <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center">
          <Link
            href="#demo-console"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-cta px-6 py-3 font-poppins text-sm font-semibold text-purple-50 shadow-[0_10px_30px_-10px_rgba(129,51,241,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgba(129,51,241,1)] sm:text-base"
          >
            Open Demo Console
            <MdArrowOutward
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              size={18}
            />
          </Link>

          <Link
            href="#documentation"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl border-[1.5px] border-purple-50 px-6 py-3 font-poppins text-sm font-semibold text-purple-50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-50/10 sm:text-base"
          >
            Read Documentation
            <MdMenuBook
              className="transition-transform duration-300 group-hover:scale-110"
              size={18}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
