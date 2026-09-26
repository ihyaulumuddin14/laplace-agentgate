import { create } from "zustand";
import type { SSEMessage } from "../services/chat-services";
import type {
  AwaitingApprovalEventData,
  AwaitingInputEventData,
  DoneEventData,
  ExecutingEventData,
  GuardrailEventData,
  PlanEventData,
  ReplanningEventData,
  StepResultEventData,
  StepStatusEventData,
} from "../types";
import { useChatStore } from "./chat-stores";

export type SSEEvent =
  | { type: "run_started"; data: SSEMessage }
  | { type: "planning"; data: SSEMessage }
  | { type: "plan"; data: PlanEventData }
  | { type: "guardrail"; data: GuardrailEventData }
  | { type: "step_status"; data: StepStatusEventData }
  | { type: "awaiting_approval"; data: AwaitingApprovalEventData }
  | { type: "awaiting_input"; data: AwaitingInputEventData }
  | { type: "executing"; data: ExecutingEventData }
  | { type: "step_result"; data: StepResultEventData }
  | { type: "replanning"; data: ReplanningEventData }
  | { type: "done"; data: DoneEventData }
  | { type: "error"; data: SSEMessage };

export type RunStatus = SSEEvent["type"] | "idle";

interface EventStore {
  events: SSEEvent[];
  executingStatus: null | "start" | "finish";
  addEvent: (event: SSEEvent) => void;
  setExecutingStatus: (status: "start" | "finish" | null) => void;
  clearEvents: () => void;
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  executingStatus: null,
  addEvent: (event) =>
    set((prevState) => {
      switch (event.type) {
        case "planning":
        case "plan":
        case "replanning":
        case "done":
          return { events: [event] };
        case "step_status": {
          const currentStepIndex = useChatStore.getState().currentStepIndex;
          const stepIndex = event.data.data.index;

          if (
            currentStepIndex === null ||
            (currentStepIndex !== null && stepIndex > currentStepIndex)
          ) {
            useChatStore.getState().setCurrentStepIndex(stepIndex);
          }

          if (event.data.data.status === "running") {
            const alreadyRunning = prevState.events.some(
              (e) =>
                e.type === "step_status" &&
                e.data.data.index === stepIndex &&
                e.data.data.status === "running",
            );
            if (alreadyRunning) return prevState;

            return {
              ...prevState,
              events: [...prevState.events, event],
            };
          }

          return prevState;
        }

        case "guardrail": {
          const stepIndex = event.data.data.index;

          // Remove any pending evaluating step_status for this step
          const filteredEvents = prevState.events.filter(
            (e) =>
              !(e.type === "step_status" && e.data.data.index === stepIndex),
          );

          // Check if a guardrail card for this step index already exists (e.g. re-evaluation after user input/approval)
          const existingIndex = filteredEvents.findIndex(
            (e) => e.type === "guardrail" && e.data.data.index === stepIndex,
          );

          if (existingIndex !== -1) {
            const updated = [...filteredEvents];
            updated[existingIndex] = event;
            return {
              ...prevState,
              events: updated,
            };
          }

          return {
            ...prevState,
            events: [...filteredEvents, event],
          };
        }

        case "executing": {
          get().setExecutingStatus("start");
          return prevState;
        }

        case "step_result": {
          get().setExecutingStatus("finish");
          return prevState;
        }

        default:
          return prevState;
      }
    }),
  setExecutingStatus: (status) => set({ executingStatus: status }),
  clearEvents: () => set({ events: [] }),
}));
