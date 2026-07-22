"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import githubMark from "@/assets/profil.png";
import { BrandWordmark } from "@/shared/components/ui/BrandWordmark";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Documentation", href: "#documentation" },
  { label: "Demo Console", href: "#demo-console" },
] as const;

export function Navbar() {
  const [activeItem, setActiveItem] = useState<string>("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:top-6 sm:px-6">
      <nav
        aria-label="Main navigation"
        className="mx-auto w-full max-w-6xl rounded-[2rem] border border-purple-200/15 bg-[#150a24]/60 shadow-[0_8px_40px_-12px_rgba(93,0,225,0.45)] backdrop-blur-xl sm:rounded-full"
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3 sm:px-7 sm:py-3.5">
          <Link
            href="#hero"
            onClick={() => setActiveItem("Home")}
            className="transition-opacity hover:opacity-80"
          >
            <BrandWordmark
              logoSize={30}
              textClassName="text-lg sm:text-xl md:text-[22px]"
            />
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-8 lg:flex xl:gap-12">
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.label;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setActiveItem(item.label)}
                    className={`relative block pb-1 font-poppins text-lg font-semibold leading-[150%] transition-colors duration-200 xl:text-xl ${
                      isActive
                        ? "text-purple-300"
                        : "text-purple-50 hover:text-purple-200"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 h-[3px] origin-center rounded-full bg-gradient-to-r from-purple-400 to-purple-200 transition-transform duration-300 ${
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
                alt=""
                width={34}
                height={34}
                className="h-[30px] w-[30px] sm:h-[34px] sm:w-[34px]"
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
              const isActive = activeItem === item.label;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => {
                      setActiveItem(item.label);
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
