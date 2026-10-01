const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAuditLogs(sessionId: string): Promise<unknown> {
  const response = await fetch(`${API_URL}/api/v1/audits`, {
    headers: {
      "X-AgentGate-Session": sessionId,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch audit logs");
  }

  return response.json();
}
