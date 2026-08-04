import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { MdWarningAmber } from "react-icons/md";

export type ScenarioCardProps = {
  Icon: IconType;
  title: string;
  tag: string;
  description: string;
  risks: string[];
  decision: string;
  policy: string;
  accent: string;
};

export function ScenarioCard({
  Icon,
  title,
  tag,
  description,
  risks,
  decision,
  policy,
  accent,
}: ScenarioCardProps) {
  return (
    <article
      className="group relative flex h-full flex-col gap-4 rounded-2xl border border-purple-200/12 bg-surface-card/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent)_45%,transparent)] hover:shadow-[0_20px_50px_-20px_color-mix(in_srgb,var(--accent)_55%,transparent)] sm:p-7"
      style={{ "--accent": accent } as CSSProperties}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="grid size-11 place-items-center rounded-xl border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)] transition-transform duration-300 group-hover:scale-110">
          <Icon size={22} />
        </div>
        <span className="rounded-full border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] px-3 py-1 font-poppins text-xs font-semibold text-[var(--accent)]">
          {tag}
        </span>
      </div>

      <h3 className="relative font-poppins text-lg font-semibold text-purple-50">
        {title}
      </h3>

      <p className="relative font-inter text-sm leading-relaxed text-purple-50 font-light">
        {description}
      </p>

      <ul className="relative flex flex-col gap-2 pt-1">
        {risks.map((risk) => (
          <li
            key={risk}
            className="flex items-start gap-2 font-inter text-[13px] leading-snug text-purple-50 font-light"
          >
            <MdWarningAmber
              className="mt-0.5 shrink-0 text-[var(--accent)]"
              size={15}
            />
            <span>{risk}</span>
          </li>
        ))}
      </ul>

      <div
        className="relative mt-auto border-t pt-4"
        style={{
          borderColor: "color-mix(in srgb, var(--accent) 45%, transparent)",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] px-3 py-1 font-poppins text-xs font-semibold text-[var(--accent)]">
            {decision}
          </span>
          <span className="font-inter text-xs text-purple-100/55">
            {policy}
          </span>
        </div>
      </div>
    </article>
  );
}
