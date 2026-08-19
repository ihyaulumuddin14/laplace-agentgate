"use client";

import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { deriveChatDisplay } from "../lib/deriveChatDisplay";
import { handleApproveDecision } from "../services/chat-services";
import { useChatStore } from "../stores/chat-stores";
import { useStateStore } from "../stores/state-stores";
import type { ChatMessage, TurnStatus } from "../types";

export const useApproveDecision = () => {
  const [isApproveProcessing, setIsApproveProcessing] = useState(false);

  const {
    updateLastMessage,
    setStreaming,
    setStatus,
    setCurrentActiveMessageId,
    currentActiveMessageId,
  } = useChatStore(
    useShallow((state) => ({
      updateLastMessage: state.updateLastChat,
      setStreaming: state.setStreaming,
      setStatus: state.setStatus,
      setCurrentActiveMessageId: state.setCurrentActiveChatId,
      currentActiveMessageId: state.currentActiveChatId,
    })),
  );

  const { addState } = useStateStore(
    useShallow((state) => ({
      addState: state.addState,
    })),
  );

  const handleDecision = async (
    actionId: string,
    decision: "approved" | "rejected",
  ) => {
    if (isApproveProcessing) return;
    setIsApproveProcessing(true);

    const finishTask = (updates: Partial<ChatMessage> = {}) => {
      setStreaming(false);
      setStatus("idle");
      setCurrentActiveMessageId(null);
      updateLastMessage((msg) => {
        if (msg.id === currentActiveMessageId) {
          return {
            ...msg,
            id: `msg-${Date.now()}`,
            ...updates,
          };
        }
        return msg;
      });
    };

    try {
      await handleApproveDecision(actionId, decision, (state) => {
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

          updateLastMessage((chat: ChatMessage) => {
            if (chat.id === currentActiveMessageId) {
              return {
                ...chat,
                status: statusVal,
                isStreaming: true,
                content: badgeDisplay.content,
                badge: badgeDisplay.badge,
                data: state.data as ChatMessage["data"],
              };
            }
            return chat;
          });
        }
      });
    } catch (error) {
      console.error("Failed to process decision:", error);
    } finally {
      setIsApproveProcessing(false);

      const currentStatus = useChatStore.getState().status;
      if (
        currentStatus !== "waiting_approval" &&
        currentStatus !== "execution_result"
      ) {
        finishTask();
      }
    }
  };

  return { handleDecision, isApproveProcessing };
};
