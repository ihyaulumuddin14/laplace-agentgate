"use client";

import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useAgentGateSessionContext } from "@/shared/components/layout/AgentGateSessionProvider";
import { approveDecisionService } from "../services/chat-services";
import { useChatStore } from "../stores/chat-stores";

export const useApproveDecision = () => {
  const [isApproveProcessing, setIsApproveProcessing] = useState(false);

  const { runId, currentStepIndex } = useChatStore(
    useShallow((state) => ({
      runId: state.runId,
      currentStepIndex: state.currentStepIndex,
    })),
  );

  const { sessionId } = useAgentGateSessionContext();

  const handleApproveDecision = async (decision: "approve" | "decline") => {
    if (!runId || !sessionId) return;
    if (isApproveProcessing) return;
    setIsApproveProcessing(true);

    try {
      await approveDecisionService(runId, sessionId, {
        step_index: currentStepIndex || 0,
        action: decision,
      });
    } catch (error) {
      console.error("Failed to process decision:", error);
    } finally {
      setIsApproveProcessing(false);
    }
  };

  return { handleApproveDecision, isApproveProcessing };
};
