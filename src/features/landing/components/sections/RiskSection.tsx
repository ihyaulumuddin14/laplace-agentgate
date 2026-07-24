import {
  MdOutlineDescription,
  MdOutlineMail,
  MdOutlineWeb,
} from "react-icons/md";
import {
  RiskCard,
  type RiskCardProps,
} from "@/features/landing/components/misc/RiskCard";

const RISK_CARDS: RiskCardProps[] = [
  {
    Icon: MdOutlineMail,
    title: "Email & Message",
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
    <section className="relative overflow-hidden px-6 py-16 sm:px-10 lg:py-24">
      {/* Ambient light drifting in from the left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(129,51,241,0.22)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="font-poppins text-3xl font-bold leading-tight tracking-tight text-purple-50 sm:text-4xl lg:text-[42px]">
            <span className="block">
              AI Agents Are{" "}
              <span className="accent-gradient-text">Powerful.</span>
            </span>
            <span className="block">
              And <span className="danger-gradient-text">Dangerous.</span>
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl font-inter text-sm leading-relaxed text-purple-100/70 sm:text-base">
            Modern AI agents can already perform real actions. The more tools
            they access, the higher the risk of action level failures. These
            actions need validation before execution.
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RISK_CARDS.map((card) => (
            <RiskCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
