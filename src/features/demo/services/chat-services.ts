import type { DecisionType, EventState } from "../types";

export async function runScenario(
  task: string,
  expectedDecision: DecisionType,
  onEvent: (event: EventState) => void,
) {
  const response = await fetch("/api/agent/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task, expectedDecision }),
  });

  if (!response.body) throw new Error("No response body");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";

    for (const part of parts) {
      if (!part.startsWith("data: ")) continue;
      const event = JSON.parse(part.replace("data: ", "")) as EventState;
      if (event.type === "error") {
        throw new Error("Something went wrong");
      }
      onEvent(event);
    }
  }
}

export async function handleApproveDecision(
  actionId: string,
  decision: "approved" | "rejected",
  onEvent: (event: EventState) => void,
) {
  const res = await fetch("/api/agent/approve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action_id: actionId, decision }),
  });
  const event: EventState = await res.json();
  onEvent(event);
}

export async function handleAskUserDecision(
  actionId: string,
  response: string,
  onEvent: (event: EventState) => void,
) {
  const res = await fetch("/api/agent/respond", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action_id: actionId, response }),
  });
  const event: EventState = await res.json();
  onEvent(event);
}
