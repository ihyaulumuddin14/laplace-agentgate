import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { HiOutlineBookOpen } from "react-icons/hi";
import { RiTerminalFill } from "react-icons/ri";
import { Button } from "@/shared/components/ui/button";
import { Reveal } from "@/shared/components/ui/Reveal";

export function CtaSection() {
  return (
    <section className="relative overflow-visible px-6 py-24 sm:px-10 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-115 w-[min(820px,95vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(146,84,235,0.22)_0%,transparent_70%)]"
      />

      <Reveal className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <h2 className="font-poppins text-4xl font-bold leading-[1.1] tracking-tight text-purple-50 sm:text-5xl lg:text-6xl">
          Ready to See It In <span className="hero-gradient-text">Action?</span>
        </h2>

        <p className="mt-6 max-w-2xl font-inter text-base leading-relaxed text-purple-100/75 sm:text-lg">
          Run real scenarios. Review decisions. Approve risky actions. Inspect
          audit logs. Test the guardrail engine yourself.
        </p>

        <div className="mt-11 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-5">
          <Button asChild size={"lg"}>
            <Link href="/demo">
              Open Demo Console
              <RiTerminalFill className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 size-5" />
            </Link>
          </Button>

          <Button asChild size={"lg"} variant={"secondary"}>
            <Link href="/docs">
              Read Documentation
              <HiOutlineBookOpen className="transition-transform duration-300 group-hover:scale-110 size-5" />
            </Link>
          </Button>

          <Button asChild size={"lg"} variant={"secondary"}>
            <Link
              href="https://github.com/ihyaulumuddin14/laplace-agentgate"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
              <FaGithub className="transition-transform duration-300 group-hover:scale-110 size-5" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
