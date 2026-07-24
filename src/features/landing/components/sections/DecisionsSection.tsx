import {
  MdOutlineBlock,
  MdOutlineCheckCircle,
  MdOutlineForum,
  MdOutlineHowToReg,
  MdOutlineLoop,
} from "react-icons/md";
import {
  DecisionCard,
  type DecisionCardProps,
} from "@/features/landing/components/misc/DecisionCard";

const DECISIONS: DecisionCardProps[] = [
  {
    Icon: MdOutlineCheckCircle,
    name: "allow",
    description:
      "Action is safe. Execute immediately through the API or the browser executor.",
    accent: "#4dff0c",
  },
  {
    Icon: MdOutlineBlock,
    name: "block",
    description:
      "Action violates policy or is far too risky. Stop immediately. No execution.",
    accent: "#ff0c0c",
  },
  {
    Icon: MdOutlineHowToReg,
    name: "need_approval",
    description:
      "High risk action requires human reviewer approval before proceeding.",
    accent: "#fff600",
  },
  {
    Icon: MdOutlineForum,
    name: "ask_user",
    description:
      "AgentGate needs additional confirmation or clarification from the user.",
    accent: "#00d4ff",
  },
  {
    Icon: MdOutlineLoop,
    name: "sanitize",
    description:
      "Sensitive data detected. The payload is redacted and a safe version is available.",
    accent: "#ff9900",
  },
];

export function DecisionsSection() {
  const [firstRow, secondRow] = [DECISIONS.slice(0, 3), DECISIONS.slice(3)];

  return (
    <section className="relative overflow-hidden px-6 py-16 sm:px-10 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[420px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(92,0,225,0.28)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="font-poppins text-3xl font-bold leading-tight tracking-tight text-purple-50 sm:text-4xl lg:text-[42px]">
            One Guardrail,{" "}
            <span className="accent-gradient-text">Five Decisions</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl font-inter text-sm leading-relaxed text-purple-100/70 sm:text-base">
            AgentGate evaluates every proposed tool action and returns one of
            five decisions before any real action is executed.
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {firstRow.map((decision) => (
            <DecisionCard key={decision.name} {...decision} />
          ))}
        </div>

        <div className="mx-auto mt-6 grid max-w-[calc(66.666%-0.5rem)] gap-6 md:grid-cols-2 max-lg:max-w-none">
          {secondRow.map((decision) => (
            <DecisionCard key={decision.name} {...decision} />
          ))}
        </div>
      </div>
    </section>
  );
}
