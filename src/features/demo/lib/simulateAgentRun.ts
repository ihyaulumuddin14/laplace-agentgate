/** biome-ignore-all lint/suspicious/noExplicitAny: temporary type bypass */
export async function runAgentTask(
  task: string,
  expectedDecision: string,
  onEvent: (event: { type: string; data: any }) => void,
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
      const event = JSON.parse(part.replace("data: ", ""));
      onEvent(event);
    }
  }
}
