import { create } from "zustand";
import type { EventState } from "../types";

interface StateStore {
  states: EventState[];
  addState: (event: EventState) => void;
  clearStates: () => void;
}

export const useStateStore = create<StateStore>((set) => ({
  states: [],
  addState: (state) =>
    set((prevState) => ({
      states: [...prevState.states, state],
    })),
  clearStates: () => set({ states: [] }),
}));
