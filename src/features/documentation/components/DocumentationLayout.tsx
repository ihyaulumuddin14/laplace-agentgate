"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { DOC_NAV_ITEMS } from "@/features/documentation/data/navItems";
import { GlassPanel } from "@/shared/components/ui/GlassPanel";
import { DocMobileNav } from "./DocMobileNav";
import { DocSidebar } from "./DocSidebar";

type DocumentationLayoutProps = {
  children: ReactNode;
};

export function DocumentationLayout({ children }: DocumentationLayoutProps) {
  const pathname = usePathname();
  const activeId = pathname.split("/")[2] ?? DOC_NAV_ITEMS[0]?.id ?? "";
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative bg-surface px-4 pb-10 pt-32 sm:px-6 sm:pt-36 lg:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-60 bottom-0 h-140 w-140 rounded-full bg-[radial-gradient(circle,rgba(129,51,241,0.32)_0%,transparent_70%)]" />
        <div className="absolute -right-56 top-0 h-120 w-120 rounded-full bg-[radial-gradient(circle,rgba(92,0,225,0.22)_0%,transparent_70%)]" />
        <div className="absolute -right-44 bottom-12 h-100 w-100 rounded-full bg-[radial-gradient(circle,rgba(129,51,241,0.12)_0%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto flex max-w-[1680px] flex-col gap-4 lg:h-[calc(100svh-11.5rem)] lg:flex-row lg:gap-7">
        <DocMobileNav
          items={DOC_NAV_ITEMS}
          activeId={activeId}
          open={mobileOpen}
          onToggle={() => setMobileOpen((open) => !open)}
          onSelect={() => setMobileOpen(false)}
        />

        <motion.aside
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block lg:h-full lg:min-h-0 lg:w-80 lg:shrink-0 xl:w-88"
        >
          <GlassPanel
            className="h-full"
            innerClassName="flex h-full min-h-0 flex-col overflow-hidden p-4"
          >
            <DocSidebar
              items={DOC_NAV_ITEMS}
              activeId={activeId}
              indicatorId="doc-nav-active-desktop"
            />
          </GlassPanel>
        </motion.aside>

        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0 flex-1 lg:h-full lg:min-h-0"
        >
          <GlassPanel
            className="lg:h-full"
            innerClassName="lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:overflow-hidden"
          >
            <div className="doc-scrollbar p-6 sm:p-8 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:p-10 xl:p-12">
              {children}
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </div>
  );
}
