"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { IconType } from "react-icons";
import { cn } from "@/shared/lib/utils";

type DocSidebarItemProps = {
  Icon: IconType;
  label: string;
  href: string;
  active?: boolean;
  indicatorId?: string;
  onClick?: () => void;
};

export function DocSidebarItem({
  Icon,
  label,
  href,
  active = false,
  indicatorId,
  onClick,
}: DocSidebarItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-3.5 rounded-2xl px-4 py-3.5 font-poppins text-sm text-white transition-colors duration-200",
        !active && "hover:bg-white/8",
      )}
    >
      {active && indicatorId && (
        <motion.span
          aria-hidden="true"
          layoutId={indicatorId}
          transition={{ type: "spring", stiffness: 420, damping: 38 }}
          className="absolute inset-0 rounded-2xl border border-purple-300/35 bg-purple-500/22 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
        />
      )}

      <Icon
        size={20}
        aria-hidden="true"
        className="relative z-10 shrink-0 text-white"
      />
      <span className={cn("relative z-10 truncate", active && "font-semibold")}>
        {label}
      </span>
    </Link>
  );
}
