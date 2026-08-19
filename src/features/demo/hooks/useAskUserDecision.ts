"use client";

import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { deriveChatDisplay } from "../lib/deriveChatDisplay";
import { handleAskUserDecision } from "../services/chat-services";
import { useChatStore } from "../stores/chat-stores";
import { useStateStore } from "../stores/state-stores";
import type { ChatMessage, TurnStatus } from "../types";

export const useAskUserDecision = () => {
  const [isAskProcessing, setIsAskProcessing] = useState(false);

  const {
    updateLastChat,
    setStreaming,
    setStatus,
    setCurrentActiveChatId,
    currentActiveChatId,
  } = useChatStore(
    useShallow((state) => ({
      updateLastChat: state.updateLastChat,
      setStreaming: state.setStreaming,
      setStatus: state.setStatus,
      setCurrentActiveChatId: state.setCurrentActiveChatId,
      currentActiveChatId: state.currentActiveChatId,
    })),
  );

  const { addState } = useStateStore(
    useShallow((state) => ({
      addState: state.addState,
    })),
  );

  const handleResponse = async (actionId: string, responseText: string) => {
    if (isAskProcessing) return;
    setIsAskProcessing(true);

    const finishTask = (updates: Partial<ChatMessage> = {}) => {
      setStreaming(false);
      setStatus("idle");
      setCurrentActiveChatId(null);
      updateLastChat((msg) => {
        if (msg.id === currentActiveChatId) {
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
      await handleAskUserDecision(actionId, responseText, (state) => {
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

          updateLastChat((msg: ChatMessage) => {
            if (msg.id === currentActiveChatId) {
              return {
                ...msg,
                status: statusVal,
                content: badgeDisplay.content,
                isStreaming: true,
                data: state.data as ChatMessage["data"],
              };
            }
            return msg;
          });
        }
      });
    } catch (error) {
      console.error("Failed to process response:", error);
    } finally {
      setIsAskProcessing(false);

      const currentStatus = useChatStore.getState().status;
      if (
        currentStatus !== "ask_user" &&
        currentStatus !== "execution_result"
      ) {
        finishTask();
      }
    }
  };

  return { handleResponse, isAskProcessing };
};
