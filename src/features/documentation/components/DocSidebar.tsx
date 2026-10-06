"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import type { DocNavItem } from "@/features/documentation/data/navItems";
import { cn } from "@/shared/lib/utils";
import { DocSearch } from "./DocSearch";
import { DocSidebarItem } from "./DocSidebarItem";

type DocSidebarProps = {
  items: DocNavItem[];
  activeId: string;
  indicatorId?: string;
  onSelect?: (id: string) => void;
  className?: string;
  listClassName?: string;
};

export function DocSidebar({
  items,
  activeId,
  indicatorId,
  onSelect,
  className,
  listClassName,
}: DocSidebarProps) {
  const [query, setQuery] = useState("");
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return items;
    return items.filter((item) => item.label.toLowerCase().includes(keyword));
  }, [items, query]);

  return (
    <div className={cn("flex h-full min-h-0 flex-col gap-4", className)}>
      <DocSearch className="shrink-0" value={query} onChange={setQuery} />

      <nav
        aria-label="Documentation"
        className={cn(
          "doc-scrollbar min-h-0 flex-1 overflow-y-auto pr-2",
          listClassName,
        )}
      >
        {filtered.length === 0 ? (
          <p className="px-4 py-3 font-poppins text-sm text-white/55">
            No results found.
          </p>
        ) : (
          <div className="flex flex-col gap-1">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.35,
                  delay: reduceMotion ? 0 : index * 0.035,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <DocSidebarItem
                  Icon={item.Icon}
                  label={item.label}
                  href={`/docs/${item.id}`}
                  active={item.id === activeId}
                  indicatorId={indicatorId}
                  onClick={() => onSelect?.(item.id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}
