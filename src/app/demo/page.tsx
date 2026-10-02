import type { Metadata } from "next";
import DemoContainer from "@/features/demo/components/sections/DemoContainer";

export const metadata: Metadata = {
  title: "Demo Console",
  description:
    "Test AgentGate's pre-action guardrail flow through web chat, scenario runs, proposed actions, risk decisions, approvals, audit logs, and latency results.",
};

export default function DemoConsolePage() {
  return <DemoContainer />;
}
