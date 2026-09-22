import Image from "next/image";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import pin from "@/assets/landing/pin.svg";
import { cn } from "@/shared/lib/utils";

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
  className,
}: RoadmapCardProps & { className?: string }) {
  return (
    <article
      className={cn(
        "group relative rounded-2xl border border-purple-200/12 bg-surface-card px-5 pt-16 pb-6 shadow-[0_28px_60px_-30px_rgba(0,0,0,0.85)] transition-transform duration-300 hover:-translate-y-1 sm:px-6 sm:pt-20 sm:pb-8",
        className,
      )}
      style={{ "--accent": accent } as CSSProperties}
    >
      <Image
        src={pin}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-7 left-1/2 w-16 -translate-x-1/2 drop-shadow-[0_8px_10px_rgba(0,0,0,0.45)] sm:-top-9 sm:w-20"
      />

      <div className="relative flex flex-col gap-4 rounded-xl border border-purple-50/40 bg-purple-800/25 p-5 transition-colors duration-300 group-hover:border-[color-mix(in_srgb,var(--accent)_60%,transparent)] sm:p-6 xl:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="grid size-11 place-items-center rounded-lg border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--accent)_22%,transparent)] text-(--accent) transition-transform duration-300 group-hover:scale-110">
            <Icon size={22} />
          </div>
          <span className="font-poppins text-5xl font-bold leading-none text-(--accent)">
            {index}
          </span>
        </div>

        <h3 className="font-poppins text-lg font-semibold text-purple-50">
          {title}
        </h3>

        <p className="font-poppins text-sm leading-relaxed text-purple-50 sm:text-justify">
          {description}
        </p>
      </div>
    </article>
  );
}
