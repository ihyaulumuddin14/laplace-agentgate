import { useShallow } from "zustand/shallow";
import { useAgentGateSessionContext } from "@/shared/components/layout/AgentGateSessionProvider";
import { deriveChatDisplay } from "../lib/deriveChatDisplay";
import { startRun } from "../services/chat-services";
import { useChatStore } from "../stores/chat-stores";
import { type RunStatus, useEventStore } from "../stores/event-stores";
import type { ChatMessage } from "../types";

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
    });

    setCurrentActiveChatId(assistantMessageId);

    const handleFinishRun = (updates: Partial<ChatMessage> = {}) => {
      finishRun();

      updateLastChat((chat) => {
        if (chat.id === assistantMessageId) {
          return {
            ...chat,
            id: `msg-${Date.now()}`,
            ...updates,
          };
        }
        return chat;
      });
    };

    try {
      await startRun(prompt, sessionId, (event) => {
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
            });
            break;
          default: {
            const currentRunId = useChatStore.getState().runId;
            if (!currentRunId) {
              useChatStore.getState().setRunId(event.data.run_id);
            }

            // always update run status every event chunk has retrieved
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
    } catch (error) {
      addChat({
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: `Failed to process request: ${(error as Error).message}`,
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
