"use client";

import { useShallow } from "zustand/react/shallow";
import { deriveChatDisplay } from "../lib/deriveChatDisplay";
import { runScenario } from "../services/chat-services";
import { useChatStore } from "../stores/chat-stores";
import { useStateStore } from "../stores/state-stores";
import type { ChatMessage, DecisionType, TurnStatus } from "../types";

export const useTaskRunner = () => {
  const {
    addChat,
    updateLastChat,
    isStreaming,
    setStreaming,
    setStatus,
    setCurrentActiveChatId,
  } = useChatStore(
    useShallow((state) => ({
      addChat: state.addChat,
      updateLastChat: state.updateLastChat,
      isStreaming: state.isStreaming,
      setStreaming: state.setStreaming,
      setStatus: state.setStatus,
      setCurrentActiveChatId: state.setCurrentActiveChatId,
    })),
  );

  const { addState, clearStates } = useStateStore(
    useShallow((state) => ({
      addState: state.addState,
      clearStates: state.clearStates,
    })),
  );

  const handleRunTask = async (
    taskText: string,
    expectedDecision: DecisionType = "NEED_APPROVAL",
  ) => {
    if (isStreaming) return;
    clearStates();

    // create user chat
    const userMsgId = `user-${Date.now()}`;
    addChat({
      id: userMsgId,
      role: "user",
      content: taskText,
    });

    // init global state
    setStreaming(true);
    setStatus("planning");

    // create assistant chat
    const assistantMsgId = `assistant-active-${Date.now()}`;
    addChat({
      id: assistantMsgId,
      role: "assistant",
      content: "planning",
      status: useChatStore.getState().status,
    });

    setCurrentActiveChatId(assistantMsgId);

    const finishTask = (updates: Partial<ChatMessage> = {}) => {
      setStreaming(false);
      setStatus("idle");
      setCurrentActiveChatId(null);
      updateLastChat((chat) => {
        if (chat.id === assistantMsgId) {
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
      await runScenario(taskText, expectedDecision, (state) => {
        addState(state);

        const statusVal: TurnStatus = state.type as TurnStatus;
        const badgeDisplay = deriveChatDisplay(state);

        if (statusVal === "execution_result") {
          finishTask({
            isStreaming: false,
            content: badgeDisplay.content,
            badge: badgeDisplay.badge,
            data: state.data as ChatMessage["data"],
          });
        } else {
          setStatus(statusVal);

          updateLastChat((chat: ChatMessage) => {
            if (chat.id === assistantMsgId) {
              return {
                ...chat,
                status: statusVal,
                content: badgeDisplay.content,
                isStreaming: true,
                badge: badgeDisplay.badge,
                data: state.data as ChatMessage["data"],
              };
            }
            return chat;
          });
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

      if (
        currentStatus !== "waiting_approval" &&
        currentStatus !== "ask_user" &&
        currentStatus !== "execution_result"
      ) {
        finishTask();
      }
    }
  };

  return { handleRunTask, isStreaming };
};
