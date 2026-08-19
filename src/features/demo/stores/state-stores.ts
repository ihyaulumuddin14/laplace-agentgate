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
    set((prevState) => {
      if (prevState.states[0]?.type === "planning") {
        return {
          states: [state],
        };
      } else if (prevState.states[1]?.type === "evaluating") {
        return {
          states: [prevState.states[0], state],
        };
      } else {
        return {
          states: [...prevState.states, state],
        };
      }
    }),
  clearStates: () => set({ states: [] }),
}));
