import { AiOutlineChrome } from "react-icons/ai";
import { LuHistory } from "react-icons/lu";
import { RiGitBranchFill, RiServerLine } from "react-icons/ri";
import {
  RoadmapCard,
  type RoadmapCardProps,
} from "@/features/landing/components/misc/RoadmapCard";
import { Reveal } from "@/shared/components/ui/Reveal";
import { cn } from "@/shared/lib/utils";

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

const DESKTOP_LAYOUT = [
  {
    placement: "lg:self-start lg:rotate-3",
    connector: {
      className: "top-[31%] bottom-22 left-full w-[52%]",
      path: "M0 0 C 35 10, 75 35, 100 100",
    },
  },
  {
    placement: "lg:self-end lg:-mt-24 lg:-rotate-3",
    connector: {
      className: "top-[56%] -bottom-10 right-full w-[46%]",
      path: "M100 0 C 70 25, 25 55, 0 100",
    },
  },
  {
    placement: "lg:self-start lg:mt-8 lg:rotate-3",
    connector: {
      className: "top-[44%] bottom-4 left-full w-[52%]",
      path: "M0 0 C 30 12, 75 40, 100 100",
    },
  },
  {
    placement: "lg:self-end lg:-mt-6 lg:-rotate-3",
    connector: null,
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
          <div className="mx-auto mt-20 flex flex-col items-center gap-20 lg:w-2/3 lg:items-stretch lg:gap-0">
            {ROADMAP.map((item, i) => {
              const { placement, connector } = DESKTOP_LAYOUT[i];

              return (
                <div
                  key={item.index}
                  className={cn(
                    "relative w-full max-w-[26rem] lg:w-[44%] lg:max-w-none",
                    placement,
                  )}
                >
                  {connector && (
                    <>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-full left-1/2 h-20 -translate-x-1/2 border-l-[1.5px] border-dashed border-purple-200/60 lg:hidden"
                      />
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className={cn(
                          "pointer-events-none absolute hidden overflow-visible text-purple-200/60 lg:block",
                          connector.className,
                        )}
                      >
                        <path
                          d={connector.path}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeDasharray="10 10"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </>
                  )}
                  <RoadmapCard {...item} />
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
