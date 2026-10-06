import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DocumentationLayout } from "@/features/documentation/components/DocumentationLayout";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Technical documentation for AgentGate, covering its architecture, guardrail flow, policy decisions, tool contracts, schemas, setup, demo instructions, and roadmap.",
};

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <DocumentationLayout>{children}</DocumentationLayout>;
}
