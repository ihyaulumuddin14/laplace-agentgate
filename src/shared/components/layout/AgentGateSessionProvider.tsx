"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useAgentGateSession } from "../../../features/demo/hooks/useAgentGateSession";

interface AgentGateSessionContextProps {
  sessionId: string | null;

  isLoadingCreateSession: boolean;
  isLoadingEndSession: boolean;

  handleReset: () => Promise<void>;
  handleReplaced: () => Promise<void>;
  handleRefresh: () => void;
  handlePageHide: () => void;
}

const AgentGateSessionContext = createContext<
  AgentGateSessionContextProps | undefined
>(undefined);

const AgentGateSessionProvider = ({ children }: { children: ReactNode }) => {
  const session = useAgentGateSession();

  return (
    <AgentGateSessionContext.Provider value={session}>
      {children}
    </AgentGateSessionContext.Provider>
  );
};

export const useAgentGateSessionContext = () => {
  const context = useContext(AgentGateSessionContext);
  if (!context) {
    throw new Error(
      "useAgentGateSessionContext must be used within an AgentGateSessionProvider",
    );
  }
  return context;
};

export default AgentGateSessionProvider;
