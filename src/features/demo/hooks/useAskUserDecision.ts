"use client";

import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useAgentGateSessionContext } from "@/shared/components/layout/AgentGateSessionProvider";
import { askUserDecisionService } from "../services/chat-services";
import { useChatStore } from "../stores/chat-stores";
import { useAskInputStore } from "../stores/input-stores";

export const useAskUserDecision = () => {
  const [isAskProcessing, setIsAskProcessing] = useState(false);
  const { askUserBodyBuffer, clearFields } = useAskInputStore(
    useShallow((state) => ({
      askUserBodyBuffer: state.askUserBodyBuffer,
      clearFields: state.clearFields,
    })),
  );
  const { runId, currentStepIndex } = useChatStore(
    useShallow((state) => ({
      runId: state.runId,
      currentStepIndex: state.currentStepIndex,
    })),
  );

  const { sessionId } = useAgentGateSessionContext();

  const handleAskUserDecision = async () => {
    if (
      !runId ||
      !sessionId ||
      !askUserBodyBuffer ||
      Object.keys(askUserBodyBuffer).length === 0
    )
      return;
    if (isAskProcessing) return;
    setIsAskProcessing(true);

    try {
      await askUserDecisionService(runId, sessionId, {
        action: "input",
        fields: askUserBodyBuffer,
        step_index: currentStepIndex || 0,
      });
    } catch (error) {
      console.error("Failed to process response:", error);
    } finally {
      setIsAskProcessing(false);
      clearFields();
    }
  };

  return { handleAskUserDecision, isAskProcessing };
};
