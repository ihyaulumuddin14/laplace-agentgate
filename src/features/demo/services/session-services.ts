import type { EndSessionRequest, SessionResponse } from "../types/services";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createSession(): Promise<SessionResponse> {
  const response = await fetch(`${API_URL}/api/v1/sessions`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Gagal membuat sesi demo");
  }

  return response.json();
}

export async function endSession(
  endSessionBody: EndSessionRequest,
): Promise<void> {
  const response = await fetch(`${API_URL}/api/v1/sessions/end`, {
    method: "POST",
    body: JSON.stringify(endSessionBody),
  });

  if (!response.ok) {
    throw new Error("Gagal mengakhiri sesi demo");
  }

  return response.json();
}
