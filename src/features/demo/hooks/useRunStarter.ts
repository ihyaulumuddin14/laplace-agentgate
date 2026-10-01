import { useShallow } from "zustand/shallow";
import { useAgentGateSessionContext } from "@/shared/components/layout/AgentGateSessionProvider";
import { deriveChatDisplay } from "../lib/deriveChatDisplay";
import { startRunService } from "../services/chat-services";
import { useChatStore } from "../stores/chat-stores";
import { type RunStatus, useEventStore } from "../stores/event-stores";
import type { ChatMessage } from "../types";
import { useAuditLog } from "./useAuditLog";

export const useRunStarter = () => {
  const {
    addChat,
    updateLastChat,
    isStreaming,
    setStreaming,
    setStatus,
    setCurrentActiveChatId,
    finishRun,
  } = useChatStore(
    useShallow((state) => ({
      addChat: state.addChat,
      updateLastChat: state.updateLastChat,
      isStreaming: state.isStreaming,
      setStreaming: state.setStreaming,
      setStatus: state.setStatus,
      setCurrentActiveChatId: state.setCurrentActiveChatId,
      finishRun: state.finishRun,
    })),
  );
  const { refetch: refetchAuditLogs } = useAuditLog();

  const { sessionId } = useAgentGateSessionContext();

  const { addEvent, clearEvents } = useEventStore(
    useShallow((state) => ({
      addEvent: state.addEvent,
      clearEvents: state.clearEvents,
    })),
  );

  const handleRunStart = async (prompt: string) => {
    if (!sessionId) return;
    if (isStreaming) return;
    clearEvents();

    // create user chat run
    const userMessageId = `user-${Date.now()}`;
    addChat({
      id: userMessageId,
      role: "user",
      content: prompt,
    });

    // init global state
    setStreaming(true);
    setStatus("planning");

    const assistantMessageId = `assistant-${Date.now()}`;
    addChat({
      id: assistantMessageId,
      role: "assistant",
      content: "Planning",
      status: useChatStore.getState().status,
      isStreaming: true,
    });

    setCurrentActiveChatId(assistantMessageId);

    const handleFinishRun = (updates: Partial<ChatMessage> = {}) => {
      finishRun();

      updateLastChat((chat) => {
        // only update the last chat with role assistant on the left side,
        // not user or error chat
        if (chat.id === assistantMessageId) {
          return {
            ...chat,
            ...updates,
          };
        }
        return chat;
      });

      refetchAuditLogs();
    };

    try {
      await startRunService(prompt, sessionId, (event) => {
        addEvent(event);

        const runStatus: RunStatus = event.type as RunStatus;
        const badgeDisplay = deriveChatDisplay(event);

        switch (runStatus) {
          case "done":
          case "error":
            // always use the final chunk of content when run is done or error
            handleFinishRun({
              content: badgeDisplay.content,
              badge: badgeDisplay.badge,
              status: runStatus,
              isStreaming: false,
            });
            break;
          default: {
            const currentRunId = useChatStore.getState().runId;
            if (!currentRunId) {
              useChatStore.getState().setRunId(event.data.run_id);
            }

            // always update run status every event chunk has retrieved
            // for ask user this set status is trigger to render the input ui
            setStatus(runStatus);
            updateLastChat((chat) => {
              if (chat.id === assistantMessageId) {
                return {
                  ...chat,
                  content: badgeDisplay.content,
                  badge: badgeDisplay.badge,
                };
              }
              return chat;
            });
            break;
          }
        }
      });
    } catch (_error) {
      addChat({
        id: `error-${Date.now()}`,
        role: "assistant",
        content: `Failed to process request, try again`,
        status: "error",
      });
    } finally {
      const currentStatus = useChatStore.getState().status;

      if (currentStatus !== "done" && currentStatus !== "error") {
        handleFinishRun();
      }
    }
  };

  return { handleRunStart, isStreaming };
};
