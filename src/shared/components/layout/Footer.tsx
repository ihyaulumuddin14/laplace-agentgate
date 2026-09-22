import Link from "next/link";
import {
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import { BrandWordmark } from "@/shared/components/ui/BrandWordmark";

const FOOTER_LINKS = [
  { label: "Demo Console", href: "/demo" },
  { label: "Documentation", href: "/docs" },
  { label: "Github Repository", href: "#github" },
  { label: "PRD/Report", href: "#report" },
] as const;

const SOCIAL_LINKS = [
  { label: "X", href: "#x", Icon: FaXTwitter },
  { label: "LinkedIn", href: "#linkedin", Icon: FaLinkedinIn },
  { label: "TikTok", href: "#tiktok", Icon: FaTiktok },
  { label: "Instagram", href: "#instagram", Icon: FaInstagram },
] as const;

export function Footer() {
  return (
    <footer className="border-t-[5px] border-purple-800 bg-purple-900">
      <div className="w-full px-6 py-10 sm:px-10 lg:px-16 lg:py-12 xl:px-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <BrandWordmark logoSize={38} textClassName="text-xl sm:text-2xl" />
            <p className="font-poppins text-sm font-semibold leading-[150%] text-purple-50 sm:text-base xl:text-lg">
              Guardrails for AI Agent Actions
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation" className="lg:pt-6">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 xl:gap-x-10">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm font-normal leading-[150%] text-purple-50 transition-colors duration-200 hover:text-purple-200 sm:text-base xl:text-lg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <ul className="flex items-center gap-3 lg:pt-6">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  aria-label={label}
                  className="grid size-8 place-items-center rounded-full bg-purple-50 text-purple-800 transition-all duration-200 hover:-translate-y-0.5 hover:bg-purple-200"
                >
                  <Icon size={17} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <hr className="my-8 border-purple-200/25" />

        <div className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:gap-8">
          <p className="font-poppins text-sm font-bold leading-[150%] text-purple-100 sm:text-base xl:text-lg">
            © 2026 AgentGate. All rights reserved.
          </p>
          <p className="font-poppins text-sm font-bold leading-[150%] text-purple-100 sm:text-base xl:text-lg">
            Developed with ♡ by the Laplace Team, BCC Filkom, University of
            Brawijaya
          </p>
        </div>
      </div>
    </footer>
  );
}
