import type { StreamEvent, StreamEventPayloads } from "../types/events";
import type {
  ApprovalDecisionRequest,
  UserInputDecisionRequest,
} from "../types/services";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function handleFrame(raw: string, onEvent: (event: StreamEvent) => void) {
  if (!raw.trim() || raw.trim().startsWith(":")) {
    return;
  }

  let eventName: keyof StreamEventPayloads = "done";
  let dataStr = "";

  for (const line of raw.split(/\r?\n/)) {
    if (line.startsWith("event:")) {
      eventName = line.slice(6).trim() as keyof StreamEventPayloads;
    } else if (line.startsWith("data:")) {
      dataStr += `${line.slice(5).trim()}\n`;
    }
  }

  if (!dataStr.trim()) {
    return;
  }

  try {
    const message = JSON.parse(dataStr.trim());

    onEvent({
      type: eventName,
      data: message,
    } as StreamEvent);
  } catch (error) {
    const errorData = JSON.stringify({
      raw,
      dataStr,
      error,
    });
    throw new Error(`Failed to parse SSE data: ${errorData}`);
  }
}

export async function startRunService(
  prompt: string,
  sessionId: string,
  onEvent: (event: StreamEvent) => void,
) {
  const response = await fetch(`${API_URL}/api/v1/chat/execute/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      "X-AgentGate-Session": sessionId,
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");

    throw new Error(
      `HTTP ${response.status}: ${text.slice(0, 300) || response.statusText}`,
    );
  }

  if (!response.body) {
    throw new Error("Response body is empty");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      // Kalau masih ada sisa frame
      if (buffer.trim()) {
        handleFrame(buffer, onEvent);
      }

      break;
    }

    buffer += decoder.decode(value, { stream: true });

    while (true) {
      const index = buffer.indexOf("\n\n");
      if (index === -1) {
        break;
      }

      const frame = buffer.slice(0, index);

      // Buang frame yang sudah diproses
      buffer = buffer.slice(index + 2);

      handleFrame(frame, onEvent);
    }
  }
}

export async function approveDecisionService(
  runId: string,
  sessionId: string,
  approvalBody: ApprovalDecisionRequest,
  onEvent?: () => void,
) {
  const response = await fetch(
    `${API_URL}/api/v1/chat/execute/${runId}/respond`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AgentGate-Session": sessionId,
      },
      body: JSON.stringify(approvalBody),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to process decision");
  }

  if (onEvent) onEvent();
}

export async function askUserDecisionService(
  runId: string,
  sessionId: string,
  askUserBody: UserInputDecisionRequest,
  onEvent?: () => void,
) {
  const response = await fetch(
    `${API_URL}/api/v1/chat/execute/${runId}/respond`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AgentGate-Session": sessionId,
      },
      body: JSON.stringify(askUserBody),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to process input decision");
  }

  if (onEvent) onEvent();
}
