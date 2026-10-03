import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

export function GlassPanel({
  children,
  className,
  innerClassName,
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-purple-200/15 bg-[#150a24]/55 shadow-[0_10px_44px_-12px_rgba(93,0,225,0.45)] backdrop-blur-xl",
        className,
      )}
    >
      <div className={cn("h-full w-full rounded-[27px]", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
