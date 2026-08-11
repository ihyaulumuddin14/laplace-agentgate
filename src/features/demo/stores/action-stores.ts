import { create } from "zustand";
import type { ChatEvent } from "../types";

interface ActionState {
  events: ChatEvent[];
  addEvent: (event: ChatEvent) => void;
  clearEvents: () => void;
}

export const useActionStore = create<ActionState>((set) => ({
  events: [],
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),
  clearEvents: () => set({ events: [] }),
}));
