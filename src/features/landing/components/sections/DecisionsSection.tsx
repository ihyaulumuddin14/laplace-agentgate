import { CgCloseO } from "react-icons/cg";
import { CiChat2 } from "react-icons/ci";
import { FiRepeat } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlineCheckCircle } from "react-icons/md";
import {
  DecisionCard,
  type DecisionCardProps,
} from "@/features/landing/components/misc/DecisionCard";
import { CoverflowCarousel } from "@/shared/components/ui/CoverflowCarousel";
import { Reveal } from "@/shared/components/ui/Reveal";

const DECISIONS: DecisionCardProps[] = [
  {
    Icon: MdOutlineCheckCircle,
    name: "Allow",
    description:
      "Action is safe. Execute immediately through the API or the browser executor.",
    accent: "#4dff0c",
  },
  {
    Icon: CgCloseO,
    name: "Block",
    description:
      "Action violates policy or is far too risky. Stop immediately. No execution.",
    accent: "#ff0c0c",
  },
  {
    Icon: HiOutlineUsers,
    name: "Need_Approval",
    description:
      "High risk action requires human reviewer approval before proceeding.",
    accent: "#fff600",
  },
  {
    Icon: FiRepeat,
    name: "Sanitize",
    description:
      "Sensitive data detected. The payload is redacted and a safe version is available.",
    accent: "#ff9900",
  },
  {
    Icon: CiChat2,
    name: "Ask_User",
    description:
      "AgentGate needs additional confirmation or clarification from the user.",
    accent: "#00d4ff",
  },
];

export function DecisionsSection() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(92,0,225,0.30)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1680px]">
        <Reveal>
          <header className="mx-auto max-w-4xl text-center">
            <h2 className="font-poppins text-4xl font-bold leading-tight tracking-tight text-purple-50 sm:text-5xl lg:text-[54px]">
              One Guardrail,{" "}
              <span className="heading-gradient-text">Five Decisions</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl font-inter text-base leading-relaxed text-purple-100/75 sm:text-lg">
              AgentGate evaluates every proposed tool action and returns one of
              five decisions before any real action is executed.
            </p>
          </header>
        </Reveal>

        <Reveal delay={120}>
          {/* Mobile: all five in one coverflow carousel */}
          <CoverflowCarousel
            className="mt-14 md:hidden"
            items={DECISIONS.map((decision) => ({
              id: decision.name,
              node: <DecisionCard {...decision} />,
            }))}
          />

          {/* Desktop */}
          <div className="mt-14 hidden gap-7 md:flex flex-wrap justify-center w-full max-w-[1280px] mx-auto">
            {DECISIONS.map((decision) => (
              <DecisionCard key={decision.name} {...decision} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
