import { create } from "zustand";
import type { ChatMessage, TurnStatus } from "../types";

interface ChatStore {
  chats: ChatMessage[];
  isStreaming: boolean;
  status: TurnStatus;
  currentActiveChatId: string | null;
  addChat: (message: ChatMessage) => void;
  updateLastChat: (updater: (msg: ChatMessage) => ChatMessage) => void;
  clearChats: () => void;
  setCurrentActiveChatId: (id: string | null) => void;
  setStreaming: (isStreaming: boolean) => void;
  setStatus: (status: TurnStatus) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: [],
  isStreaming: false,
  status: "idle",
  currentActiveChatId: null,
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
  clearChats: () => set({ chats: [] }),
  setStreaming: (isStreaming) => set({ isStreaming }),
  setStatus: (status) => set({ status }),
}));
