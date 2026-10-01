import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createSession, endSession } from "../services/session-services";
import { useChatStore } from "../stores/chat-stores";
import { useEventStore } from "../stores/event-stores";
import type { EndSessionReason } from "../types/services";

export const SESSION_STORAGE_KEY = "agentgate-session";

export const useAgentGateSession = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const pathname = usePathname();
  const { clearChats } = useChatStore();
  const { clearEvents } = useEventStore();

  const createAgentGateSession = useMutation({
    mutationFn: createSession,
    onSuccess: (data) => {
      sessionStorage.setItem(SESSION_STORAGE_KEY, data.session_id);
      setSessionId(data.session_id);
    },
    onError: (error) => console.log(error.message),
  });

  const endAgentGateSession = useMutation({
    mutationFn: async (reason: EndSessionReason) => {
      if (!sessionId) return;

      await endSession({
        session_id: sessionId,
        reason,
      });
    },
    onSuccess: () => {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      setSessionId(null);
      clearChats();
      clearEvents();
    },
    onError: () => console.log("Failed to end session"),
  });

  useEffect(() => {
    if (pathname !== "/demo") return;

    createAgentGateSession.mutate();
  }, [createAgentGateSession.mutate, pathname]);

  const handleReset = useCallback(async () => {
    if (!sessionId) return;

    await endAgentGateSession.mutateAsync("reset");
  }, [sessionId, endAgentGateSession]);

  const handleReplaced = useCallback(async () => {
    if (!sessionId) return;

    await endAgentGateSession.mutateAsync("replaced");
  }, [sessionId, endAgentGateSession]);

  const handleRefresh = useCallback(() => {
    const currentSessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);

    if (!currentSessionId) return;

    const body = JSON.stringify({
      session_id: currentSessionId,
      reason: "refresh",
    });

    const blob = new Blob([body], {
      type: "application/json",
    });

    navigator.sendBeacon("/api/v1/sessions/end", blob);
  }, []);

  const handlePageHide = useCallback(() => {
    const currentSessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);

    if (!currentSessionId) return;

    const body = JSON.stringify({
      session_id: currentSessionId,
      reason: "pagehide",
    });

    const blob = new Blob([body], {
      type: "application/json",
    });

    navigator.sendBeacon("/api/v1/sessions/end", blob);
  }, []);

  return {
    sessionId,

    isLoadingCreateSession: createAgentGateSession.isPending,
    isLoadingEndSession: endAgentGateSession.isPending,

    handleReset,
    handleReplaced,
    handleRefresh,
    handlePageHide,
  };
};
