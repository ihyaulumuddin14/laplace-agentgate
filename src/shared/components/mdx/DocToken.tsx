import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

type DocTokenTone = "allow" | "block" | "approval" | "sanitize" | "ask";

type DocTokenProps = {
  children: ReactNode;
  tone?: DocTokenTone;
};

const TONE_CLASS: Record<DocTokenTone, string> = {
  allow: "text-green",
  block: "text-red",
  approval: "text-yellow",
  sanitize: "text-orange",
  ask: "text-blue",
};

export function DocToken({ children, tone = "allow" }: DocTokenProps) {
  return (
    <code className={cn("font-mono text-[0.9em]", TONE_CLASS[tone])}>
      {children}
    </code>
  );
}
