"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import githubMark from "@/assets/profil.png";
import { BrandWordmark } from "@/shared/components/ui/BrandWordmark";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Documentation", href: "/docs" },
  { label: "Demo Console", href: "/demo" },
] as const;

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Floating navbar: wide when pinned to the top, compact once scrolled down.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:top-6 sm:px-6 lg:px-10">
      <nav
        aria-label="Main navigation"
        className={`mx-auto w-full rounded-4xl border border-purple-200/15 backdrop-blur-xl transition-all duration-500 ease-out lg:rounded-full ${
          isScrolled
            ? "max-w-5xl bg-[#150a24]/80 shadow-[0_6px_28px_-14px_rgba(93,0,225,0.55)]"
            : "max-w-[1700px] bg-[#150a24]/55 shadow-[0_10px_44px_-12px_rgba(93,0,225,0.45)]"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-4 py-4 sm:py-4.5 transition-all duration-500 ease-out ${
            isScrolled ? "px-5 sm:px-14" : "px-5 sm:px-14"
          }`}
        >
          <Link href="#hero" className="transition-opacity hover:opacity-80">
            <BrandWordmark logoSize={30} textClassName="text-base sm:text-lg" />
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-8 lg:flex xl:gap-12">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative block pb-1 font-poppins font-semibold leading-[100%] text-base transition-colors duration-200 ${
                      isActive
                        ? "text-purple-300"
                        : "text-purple-50 hover:text-purple-200"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0 h-px origin-center rounded-full bg-linear-to-r from-purple-400 to-purple-200 transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/ihyaulumuddin14/laplace-agentgate"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AgentGate on GitHub"
              className="transition-transform duration-200 hover:scale-110"
            >
              <Image
                src={githubMark}
                alt="github-logo"
                width={34}
                height={34}
                className="h-7.5 w-7.5 sm:h-8.5 sm:w-8.5"
              />
            </Link>

            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="grid size-9 place-items-center rounded-full text-purple-50 transition-colors hover:bg-white/10 lg:hidden"
            >
              {isMenuOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <ul className="flex flex-col gap-1 border-t border-purple-200/10 px-5 py-3 lg:hidden">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    className={`block rounded-xl px-3 py-2 font-poppins text-base font-semibold transition-colors ${
                      isActive
                        ? "bg-purple-500/15 text-purple-300"
                        : "text-purple-50 hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </header>
  );
}
