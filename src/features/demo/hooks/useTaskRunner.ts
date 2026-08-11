"use client";

import { useShallow } from "zustand/react/shallow";
import { runScenario } from "../services/chat-services";
import { useActionStore } from "../stores/action-stores";
import { useChatStore } from "../stores/chat-stores";
import type {
  ChatEvent,
  ChatMessage,
  DecisionType,
  TurnStatus,
} from "../types";

export function getContentForEvent(event: ChatEvent): string {
  switch (event.type) {
    case "planning":
      return event.data.message;

    case "proposed_action": {
      return `Preparing action: ${event.data.payload_summary}`;
    }

    case "evaluating":
      return event.data.message;

    case "decision": {
      const decision = event.data.decision;
      switch (decision) {
        case "ALLOW":
          return "✅ Action allowed — continuing to execution";
        case "BLOCK":
          return `🚫 Action blocked — ${event.data.reasons[0] ?? "policy violation"}`;
        case "NEED_APPROVAL":
          return "⏳ This action needs your approval — check the panel →";
        case "SANITIZE":
          return "🧹 Sensitive content detected — sanitizing before continuing";
        case "ASK_USER":
          return "🤔 I need more information before continuing";
        default:
          return "Decision received";
      }
    }

    case "waiting_approval":
      return event.data.message;

    case "ask_user": {
      return event.data.question;
    }

    case "executing":
      return event.data.message;

    case "execution": {
      if (event.data.status === "FAILED") {
        return `❌ Execution failed — ${event.data.error ?? "unknown error"}`;
      }
      return `✅ ${event.data.result_summary}`;
    }

    case "rejected":
      return "❌ Action rejected by reviewer";

    case "error":
      return "⚠️ Something went wrong, please try again";

    default:
      return "Processing...";
  }
}

export const useTaskRunner = () => {
  const {
    addMessage,
    updateLastMessage,
    isStreaming,
    setStreaming,
    setStatus,
    status,
    setCurrentActiveMessageId,
  } = useChatStore(
    useShallow((state) => ({
      addMessage: state.addMessage,
      updateLastMessage: state.updateLastMessage,
      isStreaming: state.isStreaming,
      setStreaming: state.setStreaming,
      setStatus: state.setStatus,
      status: state.status,
      setCurrentActiveMessageId: state.setCurrentActiveMessageId,
    })),
  );

  const { addEvent, clearEvents } = useActionStore(
    useShallow((state) => ({
      addEvent: state.addEvent,
      clearEvents: state.clearEvents,
    })),
  );

  const handleRunTask = async (
    taskText: string,
    expectedDecision: DecisionType = "NEED_APPROVAL",
  ) => {
    if (isStreaming) return;
    clearEvents();

    const userMsgId = `user-${Date.now()}`;
    addMessage({
      id: userMsgId,
      role: "user",
      content: taskText,
    });

    setStreaming(true);
    setStatus("planning");

    const assistantMsgId = `assistant-active-${Date.now()}`;
    addMessage({
      id: assistantMsgId,
      role: "assistant",
      content: "planning",
      status,
    });
    setCurrentActiveMessageId(assistantMsgId);

    try {
      await runScenario(taskText, expectedDecision, (event) => {
        addEvent(event);

        const statusVal: TurnStatus = event.type as TurnStatus;
        const contentVal = getContentForEvent(event);

        setStatus(statusVal);

        updateLastMessage((msg: ChatMessage) => {
          if (msg.id === assistantMsgId) {
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
      addMessage({
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: `Failed to process request: ${(error as Error).message}`,
        status: "error",
      });
    } finally {
      const currentStatus = useChatStore.getState().status;
      if (
        currentStatus !== "waiting_approval" &&
        currentStatus !== "ask_user"
      ) {
        setStreaming(false);
        setStatus("idle");
        setCurrentActiveMessageId(null);
        updateLastMessage((msg) => {
          if (msg.id === assistantMsgId) {
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

  return { handleRunTask, isStreaming };
};
