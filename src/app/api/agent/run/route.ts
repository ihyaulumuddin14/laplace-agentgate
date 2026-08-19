import type { NextRequest } from "next/server";
import type {
  ActionRequestSchema,
  DecisionResponseSchema,
  ExecutionResultResponseSchema,
} from "@/features/demo/schema/chat-schema";
import type { DecisionType, EventState } from "@/features/demo/types";

function getScenarioEvents(decision: DecisionType) {
  const proposedAction: ActionRequestSchema = {
    schema_version: "0.1",
    run_id: "run_709c199e5cd6",
    action_id: "act_9d916fa9e390",
    source: "api",
    domain: "browser",
    action_type: "BROWSER_PROTOTYPE_ACTION",
    target_system: "browser",
    target: "https://youtube.com",
    content_context: "",
    payload_summary:
      "3 browser actions on https://youtube.com: fill, submit, screenshot",
    browser_element: null,
    risk_hint: "unknown",
    rollback_available: false,
    confidence: 1.0,
    created_at: "2026-08-07T07:18:59.587418Z",
  };

  const decisionResponse: DecisionResponseSchema = {
    schema_version: "0.1",
    run_id: "run_709c199e5cd6",
    action_id: "act_9d916fa9e390",
    decision,
    risk_level: "LOW",
    risk_score: 0.1,
    reasons: ["risk_hint=unknown, domain=browser"],
    triggered_policies: [],
    sensitive_entities: [],
    sanitized_payload:
      decision === "SANITIZE" ? "REDACTED_PAYLOAD_EXAMPLE" : null,
    next_step:
      decision === "BLOCK" ||
      decision === "NEED_APPROVAL" ||
      decision === "ASK_USER"
        ? "stop_or_wait"
        : "execute",
    latency_ms: 0,
    created_at: "2026-08-07T07:18:59.587430Z",
  };

  const executionResultResponse: ExecutionResultResponseSchema = {
    schema_version: "0.1",
    run_id: "run_709c199e5cd6",
    action_id: "act_9d916fa9e390",
    executor: "browser_prototype_agent",
    status: "SUCCESS",
    result_summary: "executed 3 browser actions",
    data: {
      url: "https://youtube.com",
      final_url: "https://www.youtube.com/results?search_query=prabowo",
      snapshot: [
        {
          element_id: "1",
          role: "button",
          label: "Guide",
          risk_hint: "low_risk",
          dom: {
            tag: "button",
            id: "button",
            class: "style-scope yt-icon-button",
            text: null,
            name: null,
            title: null,
            placeholder: null,
            aria_label: "Guide",
            test_id: null,
            href: null,
            visible: true,
            disabled: false,
          },
        },
      ],
      selector_map: {
        "1": {
          primary: {
            strategy: "role",
            role: "button",
            name: "Skip navigation",
          },
          fallbacks: [
            { strategy: "label", value: "Skip navigation" },
            { strategy: "text", value: "Skip navigation" },
          ],
        },
      },
      locator_candidates: [],
      final_snapshot: [],
      final_selector_map: [],
      action: null,
      actions: [],
      action_results: [],
      executed: false,
    },
    error: null,
    latency_ms: 0,
    created_at: "2026-08-07T07:18:59.587430Z",
    execution_status: "SUCCESS",
  };

  const events: EventState[] = [
    { type: "planning", data: { message: "LLM planner is processing..." } },
    { type: "proposed_action", data: proposedAction },
    { type: "evaluating", data: { message: "Running detectors..." } },
    { type: "decision", data: decisionResponse },
  ];

  switch (decision) {
    case "BLOCK":
      return events;

    case "NEED_APPROVAL":
      events.push({
        type: "waiting_approval",
        data: { message: "Accessing bank accounts..." },
      });
      return events;

    case "ASK_USER":
      events.push({
        type: "ask_user",
        data: {
          question: "Which folder should I delete — invoices, logs, or drafts?",
        },
      });
      return events;

    case "ALLOW":
    case "SANITIZE": {
      events.push({
        type: "executing",
        data: { message: "Executing action..." },
      });
      events.push({ type: "execution_result", data: executionResultResponse });
      return events;
    }

    default: {
      const _exhaustive: never = decision;
      throw new Error(`Unhandled decision: ${_exhaustive}`);
    }
  }
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
