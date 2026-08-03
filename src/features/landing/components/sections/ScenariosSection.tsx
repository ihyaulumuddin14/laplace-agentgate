import {
  MdLockOutline,
  MdOutlineChatBubbleOutline,
  MdOutlineMarkEmailUnread,
} from "react-icons/md";
import {
  ScenarioCard,
  type ScenarioCardProps,
} from "@/features/landing/components/misc/ScenarioCard";
import { CoverflowCarousel } from "@/shared/components/ui/CoverflowCarousel";
import { Reveal } from "@/shared/components/ui/Reveal";

const SCENARIOS: ScenarioCardProps[] = [
  {
    Icon: MdOutlineChatBubbleOutline,
    title: "Booking Messaging Safety",
    tag: "booking_style",
    description: "Agent proposes to send a payment confirmation to a customer.",
    risks: [
      "External customer target",
      "Payment confirmation pattern",
      "Browser submit action",
    ],
    decision: "Need_Approval",
    policy: "Booking messaging policy",
    accent: "#fff600",
  },
  {
    Icon: MdLockOutline,
    title: "Internal Data & Code Protection",
    tag: "Code_Security",
    description:
      "Agent accesses repositories and local files containing sensitive code and data.",
    risks: [
      "Source code exposure",
      "API keys / private keys",
      "Environment file access",
    ],
    decision: "Block",
    policy: "Code/data protection policy",
    accent: "#ff0c0c",
  },
  {
    Icon: MdOutlineMarkEmailUnread,
    title: "Productivity Assistant Safety",
    tag: "productivity",
    description:
      "Agent proposes bulk archiving of 320+ emails while preserving important messages.",
    risks: [
      "Bulk email operation",
      "Affected items > threshold",
      "Difficult to undo",
    ],
    decision: "Need_Approval",
    policy: "Productivity assistant policy",
    accent: "#00d4ff",
  },
];

export function ScenariosSection() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(129,51,241,0.22)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1680px]">
        <Reveal>
          <header className="mx-auto max-w-3xl text-center">
            <h2 className="font-poppins text-4xl font-bold leading-tight tracking-tight text-purple-50 sm:text-5xl lg:text-[54px]">
              Real <span className="heading-gradient-text">Risk</span>, Real{" "}
              <span className="heading-gradient-text">Protection.</span>
            </h2>
          </header>
        </Reveal>

        <Reveal delay={120}>
          <CoverflowCarousel
            className="mt-14 md:hidden"
            items={SCENARIOS.map((s) => ({
              id: s.tag,
              node: <ScenarioCard {...s} />,
            }))}
          />

          <div className="mt-14 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
            {SCENARIOS.map((s) => (
              <ScenarioCard key={s.tag} {...s} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
