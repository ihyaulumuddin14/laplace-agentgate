import { CiChat2 } from "react-icons/ci";
import { FaRegChartBar } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { GoPackageDependents } from "react-icons/go";
import { HiOutlineCpuChip } from "react-icons/hi2";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineReceiptLong, MdOutlineShield } from "react-icons/md";
import { RiTerminalFill } from "react-icons/ri";
import {
  FeatureCard,
  type FeatureCardProps,
} from "@/features/landing/components/misc/FeatureCard";
import { FeaturesCoverflow } from "@/features/landing/components/misc/FeaturesCoverflow";
import { Reveal } from "@/shared/components/ui/Reveal";

const FEATURES: FeatureCardProps[] = [
  {
    Icon: RiTerminalFill,
    title: "Demo Console",
    description:
      "Main MVP product interface for running scenarios and viewing decisions",
  },
  {
    Icon: CiChat2,
    title: "Web Chat",
    description:
      "Natural language task input with run, loading, and error states",
  },
  {
    Icon: GoPackageDependents,
    title: "Scenario Runner",
    description:
      "Predefined Booking, code protection, and productivity scenarios",
  },
  {
    Icon: IoEyeOutline,
    title: "Action Preview",
    description:
      "Tool name, target system, target element, and payload summary",
  },
  {
    Icon: MdOutlineShield,
    title: "Decision Card",
    description: "Decision badge, risk score, reasons, entities, and next step",
  },
  {
    Icon: FaRegCircleCheck,
    title: "Approval Queue",
    description:
      "Approve, reject, edit, pending, and resolved states for reviewers",
  },
  {
    Icon: MdOutlineReceiptLong,
    title: "Audit Log",
    description:
      "Table with timestamp, action, decision, risk, status, and detail view",
  },
  {
    Icon: FaRegChartBar,
    title: "Risk Dashboard",
    description:
      "Decision distribution, high risk count, blocked and approval metrics",
  },
  {
    Icon: FiClock,
    title: "Latency Report",
    description:
      "P50/P95 latency, raw vs guarded overhead percentage, slow paths",
  },
  {
    Icon: HiOutlineCpuChip,
    title: "CLI Demo",
    description:
      "Developer scenario replay, detector debugging, and benchmark runs",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 h-120 w-[min(1000px,110vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(92,0,225,0.2)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1680px]">
        <Reveal>
          <header className="mx-auto max-w-4xl text-center">
            <h2 className="font-poppins text-4xl font-bold leading-tight tracking-tight text-purple-50 sm:text-5xl lg:text-[54px]">
              <span className="heading-gradient-text">Everything</span> You Need
              to <span className="heading-gradient-text">Evaluate</span> Safety
            </h2>
          </header>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 md:hidden">
            <FeaturesCoverflow
              items={FEATURES.map((f) => ({
                id: f.title,
                node: <FeatureCard {...f} />,
              }))}
            />
          </div>

          <div className="mt-14 hidden gap-5 md:grid md:grid-cols-3 lg:grid-cols-5">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
