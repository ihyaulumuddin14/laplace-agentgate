import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Technical documentation for AgentGate, covering its architecture, guardrail flow, policy decisions, tool contracts, schemas, setup, demo instructions, and roadmap.",
};

export default function DocsPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-6 pt-24">
      <div
        aria-hidden="true"
        className="absolute size-125 rounded-full bg-purple-500/20 blur-3xl"
      />
      <section className="relative flex max-w-md flex-col items-center rounded-3xl border border-purple-200/15 bg-surface-card/80 px-8 py-10 text-center shadow-[0_20px_60px_-20px_rgba(92,0,225,0.65)] backdrop-blur sm:px-12">
        <h1 className="text-4xl font-semibold tracking-tight text-purple-50 sm:text-5xl">
          Coming soon
        </h1>
      </section>
    </main>
  );
}
