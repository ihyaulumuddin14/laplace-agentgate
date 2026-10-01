import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/shared/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "AgentGate",
    template: "%s | AgentGate",
  },
  description:
    "Explore AgentGate's AI agent guardrails, decision policies, and implementation guidance.",
};

export default function FooterLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
