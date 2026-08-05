import type { Metadata } from "next";
import { DocCallout } from "@/features/documentation/components/DocCallout";
import { DocListCard } from "@/features/documentation/components/DocListCard";
import { DocumentationLayout } from "@/features/documentation/components/DocumentationLayout";

export const metadata: Metadata = {
  title: "Documentation — AgentGate",
  description:
    "AgentGate documentation — a framework-agnostic AI guardrail engine that evaluates every proposed agent action before it is executed.",
};

// NOTE: placeholder content — real copy per section is filled in later.
export default function DocumentationPage() {
  return (
    <DocumentationLayout>
      <article className="max-w-3xl">
        <header>
          <h1 className="font-poppins text-4xl font-bold text-purple-50">
            Introduction
          </h1>
          <p className="mt-3 font-inter text-purple-100/60">
            What AgentGate is and what it is not.
          </p>
        </header>

        <div className="mt-8 flex flex-col gap-6">
          <p className="font-inter text-[15px] leading-relaxed text-purple-50">
            AgentGate is a{" "}
            <strong className="font-semibold text-purple-300">
              framework-agnostic Python guardrail engine
            </strong>{" "}
            for AI agent tool actions. It evaluates proposed actions before they
            are executed through APIs, browsers, files, or external systems.
          </p>

          <DocCallout>
            <strong className="font-semibold">Important:</strong> AgentGate is
            not a regular chatbot and it is not a browser extension in the MVP.
            Its focus is a pre-action guardrail for tool actions.
          </DocCallout>

          <p className="font-inter text-[15px] leading-relaxed text-purple-50">
            The system supports API-based actions such as Gmail, Google
            Calendar, GitHub, and Stripe Sandbox, as well as Playwright-based
            browser actions such as open, snapshot, click, type, select, submit,
            and screenshot.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <DocListCard
              title="What it is"
              accent="#34d399"
              items={[
                "Framework-agnostic Python guardrail engine",
                "Pre-action tool action evaluator",
                "MVP: Console-first web demo",
                "Supports API and browser tools",
              ]}
            />
            <DocListCard
              title="What it is not"
              accent="#f87171"
              items={[
                "A regular chatbot or conversational AI",
                "A Chrome/Browser Extension (Post-MVP)",
                "An MCP server implementation",
                "A LangGraph workflow integration",
              ]}
            />
          </div>
        </div>
      </article>
    </DocumentationLayout>
  );
}
