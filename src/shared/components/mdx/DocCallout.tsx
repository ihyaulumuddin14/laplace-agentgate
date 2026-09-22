import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { MdOutlineInfo } from "react-icons/md";

type DocCalloutProps = {
  children: ReactNode;
  Icon?: IconType;
  className?: string;
};

/** Highlighted note / "Important" box used inside documentation articles. */
export function DocCallout({
  children,
  Icon = MdOutlineInfo,
  className = "",
}: DocCalloutProps) {
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border border-purple-300/25 bg-purple-500/10 p-5 ${className}`}
    >
      <Icon
        aria-hidden="true"
        className="mt-0.5 shrink-0 text-purple-200"
        size={22}
      />
      <div className="font-inter text-sm leading-relaxed text-purple-50">
        {children}
      </div>
    </div>
  );
}
