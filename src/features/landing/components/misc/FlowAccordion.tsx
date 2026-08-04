"use client";

import { useState } from "react";
import type { FlowStep } from "@/features/landing/components/misc/FlowCard";

/** Desktop: horizontal accordion. Click a step to expand it (revealing its
 *  content); the rest collapse to slim icon + label rails. */
export function FlowAccordion({ steps }: { steps: FlowStep[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex h-[360px] gap-4">
      {steps.map((step, index) => {
        const isActive = index === active;
        const Icon = step.Icon;

        return (
          <button
            type="button"
            key={step.title}
            aria-expanded={isActive}
            onClick={() => setActive(index)}
            className={`group relative overflow-hidden rounded-3xl border text-left transition-all duration-500 ease-out ${
              isActive
                ? "flex-[3_1_0%] border-purple-300/40 bg-surface-card/85 shadow-[0_24px_60px_-30px_rgba(129,51,241,0.7)]"
                : "flex-[0_0_104px] border-purple-200/12 bg-surface-card/50 hover:border-purple-300/30 hover:bg-surface-card/70"
            }`}
          >
            {isActive ? (
              <div className="flex h-full flex-col justify-center gap-5 p-8">
                <div className="grid size-14 place-items-center rounded-2xl border border-purple-200/25 bg-purple-500/12 text-purple-100">
                  <Icon size={26} className="text-purple-50" />
                </div>
                <h3 className="font-poppins text-2xl font-semibold text-purple-50">
                  {step.title}
                </h3>
                <p className="max-w-sm font-inter text-sm leading-relaxed text-purple-50">
                  {step.description}
                </p>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-6 py-8">
                <div className="grid size-11 shrink-0 place-items-center rounded-2xl border border-purple-200/25 bg-purple-500/12 text-purple-50 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={22} className="text-purple-50" />
                </div>
                <span className="mt-1 px-1 text-center font-poppins text-sm font-semibold leading-tight text-purple-50">
                  {step.title}
                </span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
