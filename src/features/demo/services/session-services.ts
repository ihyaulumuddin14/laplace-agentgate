const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type SessionResponse = {
  session_id: string;
  idle_ttl_seconds: number;
};

export type EndSessionReason = "pagehide" | "refresh" | "reset" | "replaced";

export async function createSession(): Promise<SessionResponse> {
  const response = await fetch(`${API_URL}/api/v1/sessions`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Gagal membuat sesi demo");
  }

  return response.json();
}

export async function endSession(endSessionBody: {
  session_id: string;
  reason: EndSessionReason;
}): Promise<void> {
  const response = await fetch(`${API_URL}/api/v1/sessions/end`, {
    method: "POST",
    body: JSON.stringify(endSessionBody),
  });

  if (!response.ok) {
    throw new Error("Gagal mengakhiri sesi demo");
  }

  return response.json();
}
