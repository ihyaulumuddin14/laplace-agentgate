import Link from "next/link";
import type { IconType } from "react-icons";

type DocSidebarItemProps = {
  Icon: IconType;
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
};

/** A single sidebar entry: icon + label, with an active state. */
export function DocSidebarItem({
  Icon,
  label,
  href,
  active = false,
  onClick,
}: DocSidebarItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`group flex items-center gap-3 rounded-2xl border px-4 py-3 font-inter text-sm transition-all duration-200 ${
        active
          ? "border-purple-300/30 bg-purple-500/15 font-semibold text-purple-50"
          : "border-transparent text-purple-100/75 hover:border-purple-200/15 hover:bg-white/5 hover:text-purple-50"
      }`}
    >
      <Icon
        size={20}
        className={`shrink-0 transition-colors duration-200 ${
          active
            ? "text-purple-200"
            : "text-purple-100/70 group-hover:text-purple-100"
        }`}
      />
      <span className="truncate">{label}</span>
    </Link>
  );
}
