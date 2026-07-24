import type { CSSProperties } from "react";
import type { IconType } from "react-icons";

export type DecisionCardProps = {
  Icon: IconType;
  /** Decision name exactly as the engine returns it, e.g. `need_approval`. */
  name: string;
  description: string;
  /** Accent colour taken from the design system palette. */
  accent: string;
};

export function DecisionCard({
  Icon,
  name,
  description,
  accent,
}: DecisionCardProps) {
  return (
    <article
      className="group relative flex h-full flex-col gap-4 rounded-2xl border border-purple-200/12 bg-surface-card/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent)_45%,transparent)] hover:shadow-[0_20px_50px_-20px_color-mix(in_srgb,var(--accent)_55%,transparent)]"
      style={{ "--accent": accent } as CSSProperties}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative grid size-11 place-items-center rounded-xl border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)] transition-transform duration-300 group-hover:scale-110">
        <Icon size={22} />
      </div>

      <span className="relative w-fit rounded-lg border border-[color-mix(in_srgb,var(--accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-3 py-1 font-poppins text-xs font-semibold text-[var(--accent)]">
        {name}
      </span>

      <p className="relative font-inter text-sm leading-relaxed text-purple-100/70">
        {description}
      </p>
    </article>
  );
}
