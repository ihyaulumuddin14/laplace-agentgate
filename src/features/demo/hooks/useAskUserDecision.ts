"use client";

import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useAgentGateSessionContext } from "@/shared/components/layout/AgentGateSessionProvider";
import { askUserDecisionService } from "../services/chat-services";
import { useChatStore } from "../stores/chat-stores";

export const useAskUserDecision = () => {
  const [isAskProcessing, setIsAskProcessing] = useState(false);

  const { runId, currentStepIndex } = useChatStore(
    useShallow((state) => ({
      runId: state.runId,
      currentStepIndex: state.currentStepIndex,
    })),
  );

  const { sessionId } = useAgentGateSessionContext();

  const handleAskUserDecision = async (input: string) => {
    if (!runId || !sessionId) return;
    if (isAskProcessing) return;
    setIsAskProcessing(true);

    try {
      await askUserDecisionService(runId, sessionId, {
        action: "input",
        fields: { value: input },
        step_index: currentStepIndex || 0,
      });
    } catch (error) {
      console.error("Failed to process response:", error);
    } finally {
      setIsAskProcessing(false);
    }
  };

  return { handleAskUserDecision, isAskProcessing };
};
