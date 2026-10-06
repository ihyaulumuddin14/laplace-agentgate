import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { cn } from "@/shared/lib/utils";

type DocCalloutProps = {
  children: ReactNode;
  Icon?: IconType | null;
  className?: string;
};

export function DocCallout({
  children,
  Icon = null,
  className,
}: DocCalloutProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-purple-300/40 bg-purple-500/14 px-5 py-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] backdrop-blur-md",
        className,
      )}
    >
      {Icon && (
        <Icon
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-purple-200"
          size={22}
        />
      )}
      <div className="font-poppins text-[15px] leading-relaxed text-white sm:text-base [&>p]:text-white">
        {children}
      </div>
    </div>
  );
}
