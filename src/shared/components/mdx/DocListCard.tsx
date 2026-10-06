import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/utils";

type DocListCardProps = {
  title: string;
  items: string[];
  accent: string;
  className?: string;
};

export function DocListCard({
  title,
  items,
  accent,
  className,
}: DocListCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:p-6",
        className,
      )}
      style={
        {
          "--accent": accent,
          borderColor: "color-mix(in srgb, var(--accent) 38%, transparent)",
          background: "color-mix(in srgb, var(--accent) 7%, transparent)",
        } as CSSProperties
      }
    >
      <h3 className="font-poppins text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2.5 font-poppins text-[15px] leading-relaxed text-white sm:text-base"
          >
            <span className="text-[var(--accent)]">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
