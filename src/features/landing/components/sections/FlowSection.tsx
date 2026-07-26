"use client";

import {
  MdArrowForward,
  MdOutlineAccountTree,
  MdOutlineGroups,
  MdOutlineLanguage,
  MdOutlineMemory,
  MdOutlineShield,
  MdOutlineStorage,
} from "react-icons/md";
import { FlowAccordion } from "@/features/landing/components/misc/FlowAccordion";
import type { FlowStep } from "@/features/landing/components/misc/FlowCard";
import { FlowSwipeStack } from "@/features/landing/components/misc/FlowSwipeStack";
import { Reveal } from "@/shared/components/ui/Reveal";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const STEPS: FlowStep[] = [
  {
    Icon: MdOutlineGroups,
    title: "User Task",
    description:
      "Natural language goal provided by the user to begin the requested workflow.",
  },
  { Icon: MdOutlineMemory, title: "LLM Planner", description: LOREM },
  { Icon: MdArrowForward, title: "Action Request", description: LOREM },
  { Icon: MdOutlineShield, title: "Agent Gate", description: LOREM },
  { Icon: MdOutlineAccountTree, title: "Decision Router", description: LOREM },
  { Icon: MdOutlineLanguage, title: "Executor", description: LOREM },
  { Icon: MdOutlineStorage, title: "Audit Log", description: LOREM },
];

export function FlowSection() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[440px] w-[min(1000px,110vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(129,51,241,0.2)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <header className="mx-auto max-w-3xl text-center">
            <h2 className="font-poppins text-4xl font-bold leading-tight tracking-tight text-purple-50 sm:text-5xl lg:text-[54px]">
              The <span className="heading-gradient-text">Pre Action</span>{" "}
              Guardrail Flow
            </h2>
          </header>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 hidden lg:block">
            <FlowAccordion steps={STEPS} />
          </div>

          <div className="mt-14 lg:hidden">
            <FlowSwipeStack steps={STEPS} />
            <p className="mt-6 text-center font-inter text-xs text-purple-100/50">
              Swipe left or right to browse the flow
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
