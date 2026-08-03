import type { CSSProperties } from "react";
import type { IconType } from "react-icons";

export type RoadmapCardProps = {
  index: string;
  Icon: IconType;
  title: string;
  description: string;
  accent: string;
};

export function RoadmapCard({
  index,
  Icon,
  title,
  description,
  accent,
}: RoadmapCardProps) {
  return (
    <article
      className="group relative flex h-full flex-1 flex-col gap-4 overflow-hidden rounded-2xl border border-purple-200/12 bg-surface-card/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent)_45%,transparent)] hover:shadow-[0_20px_50px_-20px_color-mix(in_srgb,var(--accent)_55%,transparent)] sm:p-7"
      style={{ "--accent": accent } as CSSProperties}
    >
      {/* Big faded step number */}
      <span className="pointer-events-none absolute right-4 top-3 font-poppins text-5xl font-bold text-[color-mix(in_srgb,var(--accent)_35%,transparent)] transition-colors duration-300 group-hover:text-[color-mix(in_srgb,var(--accent)_55%,transparent)]">
        {index}
      </span>

      <div className="relative grid size-11 place-items-center rounded-xl border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)] transition-transform duration-300 group-hover:scale-110">
        <Icon size={22} />
      </div>

      <h3 className="relative font-poppins text-lg font-semibold text-purple-50">
        {title}
      </h3>

      <p className="relative font-inter text-sm leading-relaxed text-purple-100/70">
        {description}
      </p>
    </article>
  );
}
