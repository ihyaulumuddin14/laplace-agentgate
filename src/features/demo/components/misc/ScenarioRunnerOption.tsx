"use client";

import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/utils";
import { useTaskRunner } from "../../hooks/useTaskRunner";
import type { ScenarioRunnerOptionType } from "../../types";

export const ScenarioRunnerOption = ({
  title,
  description,
  Icon,
  accent,
  variants,
}: ScenarioRunnerOptionType) => {
  const { handleRunTask, isStreaming } = useTaskRunner();

  async function handleClick() {
    const taskText = variants[0]?.taskText || "list calendar events";
    const expectedDecision = variants[0]?.expectedDecision || "NEED_APPROVAL";
    handleRunTask(taskText, expectedDecision);
  }

  return (
    <li
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          if (isStreaming) return;
          e.preventDefault();
          handleClick();
        }
      }}
      style={{ "--accent": accent } as CSSProperties}
      className={cn(
        "flex items-center gap-2 w-50 border border-white/40 bg-white/5 backdrop-blur-xl p-3 rounded-lg cursor-pointer hover:bg-white/20 active:scale-95 transition-all ease-in-out",
        isStreaming && "pointer-events-none opacity-50",
      )}
    >
      <div className="relative grid size-8 aspect-square place-items-center rounded-md border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-accent transition-transform duration-300 group-hover:scale-110">
        <Icon size={16} />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-xs font-semibold line-clamp-1">{title}</h2>
        <p className="text-[10px] line-clamp-1">{description}</p>
      </div>
    </li>
  );
};
