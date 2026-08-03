import type { IconType } from "react-icons";

export type FeatureCardProps = {
  Icon: IconType;
  title: string;
  description: string;
};

export function FeatureCard({ Icon, title, description }: FeatureCardProps) {
  return (
    <article className="group relative flex h-full flex-col gap-4 rounded-2xl border border-purple-200/12 bg-surface-card/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-300/40 hover:shadow-[0_18px_46px_-22px_rgba(129,51,241,0.7)] sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(146,84,235,0.14),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative grid size-11 place-items-center rounded-xl border border-purple-200/25 bg-purple-500/12 text-purple-100 transition-transform duration-300 group-hover:scale-110">
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
