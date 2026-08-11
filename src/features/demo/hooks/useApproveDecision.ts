"use client";

import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { handleApproveDecision } from "../services/chat-services";
import { useActionStore } from "../stores/action-stores";
import { useChatStore } from "../stores/chat-stores";
import type { ChatMessage, TurnStatus } from "../types";
import { getContentForEvent } from "./useTaskRunner";

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
      updateLastMessage: state.updateLastMessage,
      setStreaming: state.setStreaming,
      setStatus: state.setStatus,
      setCurrentActiveMessageId: state.setCurrentActiveMessageId,
      currentActiveMessageId: state.currentActiveMessageId,
    })),
  );

  const { addEvent } = useActionStore(
    useShallow((state) => ({
      addEvent: state.addEvent,
    })),
  );

  const handleDecision = async (
    actionId: string,
    decision: "approved" | "rejected",
  ) => {
    if (isApproveProcessing) return;
    setIsApproveProcessing(true);

    try {
      await handleApproveDecision(actionId, decision, (event) => {
        addEvent(event);

        const statusVal: TurnStatus = event.type as TurnStatus;
        const contentVal = getContentForEvent(event);

        setStatus(statusVal);

        updateLastMessage((msg: ChatMessage) => {
          if (msg.id === currentActiveMessageId) {
            return {
              ...msg,
              status: statusVal,
              content: contentVal,
              isStreaming: true,
              data: event.data as ChatMessage["data"],
            };
          }
          return msg;
        });
      });
    } catch (error) {
      console.error("Failed to process decision:", error);
    } finally {
      setIsApproveProcessing(false);

      const currentStatus = useChatStore.getState().status;
      if (currentStatus !== "waiting_approval") {
        setStreaming(false);
        setStatus("idle");
        setCurrentActiveMessageId(null);
        updateLastMessage((msg) => {
          if (msg.id === currentActiveMessageId) {
            return {
              ...msg,
              id: `msg-${Date.now()}`,
            };
          }
          return msg;
        });
      }
    }
  };

  return { handleDecision, isApproveProcessing };
};
