"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { DOC_NAV_ITEMS } from "@/features/documentation/data/navItems";
import { DocSidebar } from "./DocSidebar";

type DocumentationLayoutProps = {
  children: ReactNode;
};

/**
 * Two-column documentation shell: a sticky, scrollable sidebar next to the
 * article content. On small screens the sidebar collapses into a toggle.
 */
export function DocumentationLayout({ children }: DocumentationLayoutProps) {
  const pathname = usePathname();
  const activeId = pathname.split("/")[2] ?? DOC_NAV_ITEMS[0]?.id ?? "";
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebar = (
    <DocSidebar
      items={DOC_NAV_ITEMS}
      activeId={activeId}
      onSelect={() => setMobileOpen(false)}
      className="h-full rounded-3xl border border-purple-200/12 bg-surface-card/40 p-4"
    />
  );

  return (
    <div className="min-h-screen bg-surface px-4 pb-16 pt-28 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1680px]">
        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          className="mb-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-purple-200/15 bg-surface-card/50 px-5 py-3 font-poppins text-sm font-semibold text-purple-50 lg:hidden"
        >
          Documentation menu
          {mobileOpen ? <MdClose size={20} /> : <MdMenu size={20} />}
        </button>

        {mobileOpen && <div className="mb-4 lg:hidden">{sidebar}</div>}

        <div className="flex gap-6 lg:gap-8">
          <aside className="hidden w-[320px] shrink-0 self-start lg:sticky lg:top-28 lg:block lg:max-h-[calc(100vh-8rem)]">
            {sidebar}
          </aside>

          <div className="min-w-0 flex-1 rounded-3xl border border-purple-200/12 bg-surface-card/25 p-6 sm:p-8 lg:p-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
