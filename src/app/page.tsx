import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "AgentGate",
  description:
    "AgentGate provides guardrails for AI agent actions before they are executed.",
};

const RootPage = () => {
  redirect("/home");
};

export default RootPage;
