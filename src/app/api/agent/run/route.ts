import type { NextRequest } from "next/server";
import type {
  ActionRequestSchema,
  DecisionResponseSchema,
} from "@/features/demo/schema/chat-schema";
import type { DecisionType } from "@/features/demo/types";

function getScenarioEvents(decision: DecisionType) {
  const proposedAction: ActionRequestSchema = {
    domain: "productivity",
    action_type: "API_CALL",
    target_system: "Google Calendar",
    tool_name: "google_calendar.list_events",
    target: "user calendar, date: today",
    payload_summary: "List events for current user on today's date.",
    risk_hint: "read_only",
  };

  const decisionResponse: DecisionResponseSchema = {
    decision,
    risk_level: decision === "ALLOW" ? "LOW" : "HIGH",
    risk_score: decision === "ALLOW" ? 0.08 : 0.82,
    reasons: [`dummy reason for ${decision}`],
    audit_id: `25_${Math.random().toString(36).slice(2, 8)}`,
  };

  return [
    { type: "planning", data: { message: "LLM planner is processing..." } },
    { type: "proposed_action", data: proposedAction },
    { type: "evaluating", data: { message: "Running detectors..." } },
    { type: "decision", data: decisionResponse },
  ];
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const decision: DecisionType = body.expectedDecision ?? "ALLOW";
  const events = getScenarioEvents(decision);

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for (const event of events) {
        const payload = `data: ${JSON.stringify(event)}\n\n`;
        controller.enqueue(encoder.encode(payload));
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
