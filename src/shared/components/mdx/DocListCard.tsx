import type { CSSProperties } from "react";

type DocListCardProps = {
  title: string;
  items: string[];
  /** Accent colour for the border + heading (e.g. a green / red hex). */
  accent: string;
  className?: string;
};

/** Bordered, colour-accented list — e.g. "What it is" / "What it is not". */
export function DocListCard({
  title,
  items,
  accent,
  className = "",
}: DocListCardProps) {
  return (
    <div
      className={`rounded-2xl border p-6 ${className}`}
      style={
        {
          "--accent": accent,
          borderColor: "color-mix(in srgb, var(--accent) 40%, transparent)",
          background: "color-mix(in srgb, var(--accent) 6%, transparent)",
        } as CSSProperties
      }
    >
      <h4 className="font-poppins text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
        {title}
      </h4>
      <ul className="mt-4 flex flex-col gap-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 font-inter text-sm leading-relaxed text-purple-50"
          >
            <span className="text-[var(--accent)]">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
