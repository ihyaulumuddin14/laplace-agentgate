import { create } from "zustand";
import type { InputField } from "../types";

interface AskInputStore {
  fields: InputField[]; // for iterating input ui
  askUserBodyBuffer: Record<string, string> | null;
  setAskUserBodyBuffer: (body: Record<string, string>) => void;
  setFields: (fields: InputField[]) => void;
  clearFields: () => void;
}

export const useAskInputStore = create<AskInputStore>((set) => ({
  fields: [],
  askUserBodyBuffer: null,
  setAskUserBodyBuffer: (body: Record<string, string>) =>
    set((prevState) => ({
      askUserBodyBuffer: {
        ...(prevState.askUserBodyBuffer ?? {}),
        ...body,
      },
    })),
  setFields: (fields) => set({ fields }),
  clearFields: () => set({ fields: [], askUserBodyBuffer: null }),
}));
