import { create } from "zustand";
import type { ChatMessage } from "../types";
import type { RunStatus } from "./event-stores";

interface ChatStore {
  runId: string | null;
  chats: ChatMessage[];
  isStreaming: boolean;
  status: RunStatus;
  currentStepIndex: number | null;
  currentActiveChatId: string | null;
  setRunId: (runId: string) => void;
  setCurrentStepIndex: (stepIndex: number) => void;
  addChat: (message: ChatMessage) => void;
  updateLastChat: (updater: (msg: ChatMessage) => ChatMessage) => void;
  clearChats: () => void;
  setCurrentActiveChatId: (id: string | null) => void;
  setStreaming: (isStreaming: boolean) => void;
  setStatus: (status: RunStatus) => void;
  finishRun: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  runId: null,
  chats: [],
  isStreaming: false,
  status: "idle",
  currentActiveChatId: null,
  currentStepIndex: null,
  setRunId: (runId) => set({ runId }),
  addChat: (chat) =>
    set((state) => ({
      chats: [...state.chats, chat],
    })),
  updateLastChat: (updater) =>
    set((state) => {
      if (state.chats.length === 0) return state;
      const updatedChats = [...state.chats];
      const lastIndex = updatedChats.length - 1;
      updatedChats[lastIndex] = updater(updatedChats[lastIndex]);
      return { chats: updatedChats };
    }),
  setCurrentActiveChatId: (id) => set({ currentActiveChatId: id }),
  setCurrentStepIndex: (stepIndex) => set({ currentStepIndex: stepIndex }),
  clearChats: () => set({ chats: [] }),
  setStreaming: (isStreaming) => set({ isStreaming }),
  setStatus: (status) => set({ status }),
  finishRun: () =>
    set({
      isStreaming: false,
      status: "idle",
      currentActiveChatId: null,
      runId: null,
    }),
}));
