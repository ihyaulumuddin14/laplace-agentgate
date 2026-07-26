import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { MdErrorOutline } from "react-icons/md";

export type RiskCardProps = {
  Icon: IconType;
  title: string;
  description: string;
  risks: string[];
  accent: string;
};

export function RiskCard({
  Icon,
  title,
  description,
  risks,
  accent,
}: RiskCardProps) {
  return (
    <article
      className="group relative flex h-full flex-col gap-4 rounded-2xl border border-purple-200/12 bg-surface-card/80 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent)_45%,transparent)] hover:shadow-[0_20px_50px_-20px_color-mix(in_srgb,var(--accent)_55%,transparent)] sm:p-8"
      style={{ "--accent": accent } as CSSProperties}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative grid size-12 place-items-center rounded-xl border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)] transition-transform duration-300 group-hover:scale-110">
        <Icon size={24} />
      </div>

      <h3 className="relative font-poppins text-xl font-semibold text-purple-50">
        {title}
      </h3>

      <p className="relative font-inter text-[15px] leading-relaxed text-purple-100/75">
        {description}
      </p>

      <ul className="relative mt-auto flex flex-col gap-2.5 pt-2">
        {risks.map((risk) => (
          <li
            key={risk}
            className="flex items-start gap-2 font-inter text-sm leading-snug text-[color-mix(in_srgb,var(--accent)_90%,white)]"
          >
            <MdErrorOutline
              className="mt-0.5 shrink-0 text-[var(--accent)]"
              size={16}
            />
            <span>{risk}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
