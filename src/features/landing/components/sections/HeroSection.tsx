import Link from "next/link";
import { HiOutlineBookOpen } from "react-icons/hi";
import { RiTerminalFill } from "react-icons/ri";
import { Reveal } from "@/shared/components/ui/Reveal";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-visible px-6 pt-28 pb-16 sm:px-10 sm:pt-32"
    >
      <HeroBackgroundAccent />
      <Reveal className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
        <h1 className="hero-gradient-text font-poppins text-5xl font-bold leading-tight tracking-tight sm:text-7xl lg:text-8xl xl:text-[8.5rem]">
          AgentGate
        </h1>

        <p className="mt-6 font-poppins text-lg font-semibold leading-[150%] text-purple-100 sm:text-xl lg:text-3xl">
          Guardrails for AI Agent Actions
        </p>

        <div className="mt-12 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-5">
          <Link
            href="#demo-console"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-cta px-8 py-4 font-poppins text-base font-semibold text-purple-50 shadow-[0_12px_36px_-10px_rgba(129,51,241,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_46px_-12px_rgba(129,51,241,1)] sm:text-lg"
          >
            Open Demo Console
            <RiTerminalFill
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              size={20}
            />
          </Link>

          <Link
            href="#documentation"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl border-[1.5px] border-purple-50 px-8 py-4 font-poppins text-base font-semibold text-purple-50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-50/10 sm:text-lg"
          >
            Read Documentation
            <HiOutlineBookOpen
              className="transition-transform duration-300 group-hover:scale-110"
              size={20}
            />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

const HeroBackgroundAccent = () => {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 h-275 w-[min(1700px,170vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_56%_52%_at_50%_0%,rgba(129,51,241,0.55)_0%,rgba(92,0,225,0.22)_36%,rgba(39,0,95,0.08)_58%,transparent_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-170 w-[min(1000px,110vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(146,84,235,0.34)_0%,rgba(92,0,225,0.12)_46%,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-[38%] h-105 w-105 rounded-full bg-[radial-gradient(circle,rgba(125,51,231,0.20)_0%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-[52%] h-115 w-115 rounded-full bg-[radial-gradient(circle,rgba(146,84,235,0.18)_0%,transparent_70%)]"
      />
    </>
  );
};
