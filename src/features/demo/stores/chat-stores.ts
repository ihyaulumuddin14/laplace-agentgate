import { create } from "zustand";
import type { ChatEvent } from "../types";

interface ChatState {
  events: ChatEvent[];
  isStreaming: boolean;
  addEvent: (event: ChatEvent) => void;
  clearEvents: () => void;
  setStreaming: (status: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  events: [],
  isStreaming: false,
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  clearEvents: () => set({ events: [] }),
  setStreaming: (status) => set({ isStreaming: status }),
}));
