import { create } from "zustand";
import type { ChatMessage, TurnStatus } from "../types";

interface ChatState {
  chats: ChatMessage[];
  isStreaming: boolean;
  status: TurnStatus;
  currentActiveMessageId: string | null;
  addMessage: (message: ChatMessage) => void;
  updateLastMessage: (updater: (msg: ChatMessage) => ChatMessage) => void;
  clearChats: () => void;
  setCurrentActiveMessageId: (id: string | null) => void;
  setStreaming: (isStreaming: boolean) => void;
  setStatus: (status: TurnStatus) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  isStreaming: false,
  status: "idle",
  currentActiveMessageId: null,
  addMessage: (message) =>
    set((state) => ({
      chats: [...state.chats, message],
    })),
  updateLastMessage: (updater) =>
    set((state) => {
      if (state.chats.length === 0) return state;
      const updatedChats = [...state.chats];
      const lastIndex = updatedChats.length - 1;
      updatedChats[lastIndex] = updater(updatedChats[lastIndex]);
      return { chats: updatedChats };
    }),
  setCurrentActiveMessageId: (id) => set({ currentActiveMessageId: id }),
  clearChats: () => set({ chats: [] }),
  setStreaming: (isStreaming) => set({ isStreaming }),
  setStatus: (status) => set({ status }),
}));
