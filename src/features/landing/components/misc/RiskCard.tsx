import type { IconType } from "react-icons";
import { MdWarningAmber } from "react-icons/md";

export type RiskCardProps = {
  Icon: IconType;
  title: string;
  description: string;
  risks: string[];
};

export function RiskCard({ Icon, title, description, risks }: RiskCardProps) {
  return (
    <article className="group relative flex h-full flex-col gap-4 rounded-2xl border border-purple-200/12 bg-surface-card/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-[0_20px_50px_-20px_rgba(255,153,0,0.45)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(255,153,0,0.12),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative grid size-11 place-items-center rounded-xl border border-orange/30 bg-orange/10 text-orange transition-transform duration-300 group-hover:scale-110">
        <Icon size={22} />
      </div>

      <h3 className="relative font-poppins text-lg font-semibold text-purple-50">
        {title}
      </h3>

      <p className="relative font-inter text-sm leading-relaxed text-purple-100/70">
        {description}
      </p>

      <ul className="relative mt-auto flex flex-col gap-2 pt-2">
        {risks.map((risk) => (
          <li
            key={risk}
            className="flex items-start gap-2 font-inter text-[13px] leading-snug text-orange/90"
          >
            <MdWarningAmber className="mt-0.5 shrink-0" size={15} />
            <span>{risk}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
