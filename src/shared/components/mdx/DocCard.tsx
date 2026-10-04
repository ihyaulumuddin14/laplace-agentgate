import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

type DocCardProps = {
  title?: string;
  children: ReactNode;
  accent?: string;
  className?: string;
};

export function DocCard({ title, children, accent, className }: DocCardProps) {
  return (
    <div
      style={accent ? ({ "--accent": accent } as CSSProperties) : undefined}
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-purple-200/15 bg-white/4 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:p-6",
        className,
      )}
    >
      {title && (
        <h2
          className={cn(
            "font-poppins text-xl font-bold leading-snug sm:text-2xl",
            accent ? "text-[var(--accent)]" : "text-purple-200",
          )}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
