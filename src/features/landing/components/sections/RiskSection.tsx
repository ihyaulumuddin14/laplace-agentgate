import {
  MdOutlineDescription,
  MdOutlineMail,
  MdOutlineWeb,
} from "react-icons/md";
import {
  RiskCard,
  type RiskCardProps,
} from "@/features/landing/components/misc/RiskCard";
import { CoverflowCarousel } from "@/shared/components/ui/CoverflowCarousel";
import { Reveal } from "@/shared/components/ui/Reveal";

const RISK_CARDS: RiskCardProps[] = [
  {
    Icon: MdOutlineMail,
    title: "Email & Message",
    accent: "#fff600",
    description:
      "Agents can send emails to customers containing sensitive payment data, wrong recipients, or harmful payloads all without your review.",
    risks: [
      "Send wrong email to customer",
      "Expose payment information",
      "Bulk send 300+ emails at once",
    ],
  },
  {
    Icon: MdOutlineWeb,
    title: "Browser & Forms",
    accent: "#ffa629",
    description:
      "Agents can click submit buttons, fill forms, cancel bookings, or make purchases irreversible actions with a single wrong command.",
    risks: [
      "Click cancel booking",
      "Submit payment forms",
      "Trigger destructive actions",
    ],
  },
  {
    Icon: MdOutlineDescription,
    title: "Files & APIs",
    accent: "#ff0c0c",
    description:
      "Agents can read repositories, expose API keys, open confidential files, or call external APIs while carrying sensitive credentials.",
    risks: [
      "Read .env files",
      "Expose access tokens",
      "Call external APIs with secrets",
    ],
  },
];

export function RiskSection() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(129,51,241,0.24)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <header className="mx-auto max-w-4xl text-center">
            <h2 className="font-poppins text-4xl font-bold leading-tight tracking-tight text-purple-50 sm:text-5xl lg:text-[54px]">
              <span className="block">
                AI Agents Are{" "}
                <span className="heading-gradient-text">Powerful.</span>
              </span>
              <span className="block">
                And <span className="heading-gradient-text">Dangerous.</span>
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl font-inter text-base leading-relaxed text-purple-100/75 sm:text-lg">
              Modern AI agents can already perform real actions. The more tools
              they access, the higher the risk of action level failures. These
              actions need validation before execution.
            </p>
          </header>
        </Reveal>

        {/* Mobile: coverflow carousel */}
        <Reveal delay={120}>
          <CoverflowCarousel
            className="mt-14 md:hidden"
            items={RISK_CARDS.map((card) => ({
              id: card.title,
              node: <RiskCard {...card} />,
            }))}
          />

          {/* Desktop: grid */}
          <div className="mt-14 hidden gap-7 md:grid md:grid-cols-2 lg:grid-cols-3">
            {RISK_CARDS.map((card) => (
              <RiskCard key={card.title} {...card} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
