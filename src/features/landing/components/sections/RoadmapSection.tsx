import { Fragment } from "react";
import { AiOutlineChrome } from "react-icons/ai";
import { LuHistory } from "react-icons/lu";
import { MdArrowForward } from "react-icons/md";
import { RiGitBranchFill, RiServerLine } from "react-icons/ri";
import {
  RoadmapCard,
  type RoadmapCardProps,
} from "@/features/landing/components/misc/RoadmapCard";
import { Reveal } from "@/shared/components/ui/Reveal";

const ROADMAP: RoadmapCardProps[] = [
  {
    index: "01",
    Icon: AiOutlineChrome,
    title: "Chrome/Browser Extension",
    description:
      "Active page snapshot, element highlight, and extension based browser control without Playwright.",
    accent: "#00d4ff",
  },
  {
    index: "02",
    Icon: RiServerLine,
    title: "MCP Compatible Path",
    description:
      "Server / client adapter reusing ActionRequest and DecisionResponse contracts over MCP protocol.",
    accent: "#fff600",
  },
  {
    index: "03",
    Icon: RiGitBranchFill,
    title: "LangGraph Adapter",
    description:
      "Workflow graph integration after the core evaluation engine is stable, fast, and well benchmarked.",
    accent: "#ff9900",
  },
  {
    index: "04",
    Icon: LuHistory,
    title: "OpenClaw Adapter",
    description:
      "Optional integration after framework agnostic engine quality is fully proven in production. Incrementally.",
    accent: "#9254eb",
  },
];

export function RoadmapSection() {
  return (
    <section className="relative overflow-visible px-6 py-20 sm:px-10 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-110 w-140 rounded-full bg-[radial-gradient(circle,rgba(92,0,225,0.24)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1680px]">
        <Reveal>
          <header className="mx-auto max-w-3xl text-center">
            <h2 className="font-poppins text-4xl font-bold leading-tight tracking-tight text-purple-50 sm:text-5xl lg:text-[54px]">
              <span className="heading-gradient-text">Post MVP</span> Roadmap
              Preview
            </h2>
          </header>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
            {ROADMAP.map((item, i) => (
              <Fragment key={item.index}>
                <RoadmapCard {...item} />
                {i < ROADMAP.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="grid shrink-0 place-items-center self-center text-purple-50"
                  >
                    <MdArrowForward
                      className="rotate-90 lg:rotate-0"
                      size={26}
                    />
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
