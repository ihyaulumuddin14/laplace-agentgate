"use client";

import { useMemo, useState } from "react";
import type { DocNavItem } from "@/features/documentation/data/navItems";
import { DocSearch } from "./DocSearch";
import { DocSidebarItem } from "./DocSidebarItem";

type DocSidebarProps = {
  items: DocNavItem[];
  activeId: string;
  onSelect?: (id: string) => void;
  className?: string;
};

/** Documentation sidebar: search box + a scrollable list of nav entries. */
export function DocSidebar({
  items,
  activeId,
  onSelect,
  className = "",
}: DocSidebarProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.label.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      <DocSearch value={query} onChange={setQuery} />

      <nav
        aria-label="Documentation"
        className="doc-scrollbar flex flex-1 flex-col gap-1.5 overflow-y-auto pr-1.5"
      >
        {filtered.length === 0 ? (
          <p className="px-4 py-3 font-inter text-sm text-purple-100/45">
            No results found.
          </p>
        ) : (
          filtered.map((item) => (
            <DocSidebarItem
              key={item.id}
              Icon={item.Icon}
              label={item.label}
              href={`/docs/${item.id}`}
              active={item.id === activeId}
              onClick={() => onSelect?.(item.id)}
            />
          ))
        )}
      </nav>
    </div>
  );
}
