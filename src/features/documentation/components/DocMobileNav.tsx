"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MdExpandMore } from "react-icons/md";
import type { DocNavItem } from "@/features/documentation/data/navItems";
import { GlassPanel } from "@/shared/components/ui/GlassPanel";
import { cn } from "@/shared/lib/utils";
import { DocSidebar } from "./DocSidebar";

type DocMobileNavProps = {
  items: DocNavItem[];
  activeId: string;
  open: boolean;
  onToggle: () => void;
  onSelect: (id: string) => void;
};

export function DocMobileNav({
  items,
  activeId,
  open,
  onToggle,
  onSelect,
}: DocMobileNavProps) {
  const reduceMotion = useReducedMotion();
  const active = items.find((item) => item.id === activeId) ?? items[0];
  const ActiveIcon = active?.Icon;

  return (
    <div className="sticky top-28 z-40 sm:top-30 lg:hidden">
      <GlassPanel innerClassName="overflow-hidden">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-label="Toggle documentation menu"
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        >
          <span className="flex min-w-0 items-center gap-3">
            {ActiveIcon && (
              <ActiveIcon
                size={20}
                aria-hidden="true"
                className="shrink-0 text-white"
              />
            )}
            <span className="truncate font-poppins text-sm font-semibold text-white">
              {active?.label ?? "Documentation"}
            </span>
          </span>

          <MdExpandMore
            size={22}
            aria-hidden="true"
            className={cn(
              "shrink-0 text-white/70 transition-transform duration-300",
              open && "rotate-180",
            )}
          />
        </button>
      </GlassPanel>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: -10, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -10, scale: 0.98 }
            }
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-[calc(100%+0.5rem)] origin-top"
          >
            <GlassPanel innerClassName="overflow-hidden bg-[#1a0f2e]">
              <div className="p-3">
                <DocSidebar
                  items={items}
                  activeId={activeId}
                  indicatorId="doc-nav-active-mobile"
                  onSelect={onSelect}
                  listClassName="max-h-[52svh] overscroll-contain"
                />
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
