import type { IconType } from "react-icons";
import type {
  ActionRequestSchema,
  DecisionResponseSchema,
  ExecutionResponseSchema,
} from "@/features/demo/schema/chat-schema";

export type ScenarioVariant = {
  taskText: string;
  expectedDecision: DecisionType;
};

export type DecisionType =
  | "ALLOW"
  | "BLOCK"
  | "NEED_APPROVAL"
  | "SANITIZE"
  | "ASK_USER";

export type RiskLevel = "low" | "medium" | "high";

export type ExecutionStatus = "SUCCESS" | "FAILED" | "PARTIAL";

export type ScenarioRunnerOptionType = {
  title: string;
  description: string;
  Icon: IconType;
  accent: string;
  variants: ScenarioVariant[];
};

export const DemoTabs = {
  chat: "chat",
  action: "action",
  insight: "insight",
} as const;

export type DemoTab = (typeof DemoTabs)[keyof typeof DemoTabs];

export type Role = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  status?: TurnStatus;
  isStreaming?: boolean;
  data?: { decision?: DecisionType; reasons?: string[] };
}

type MessageEventData = { message: string };
type QuestionEventData = { question: string };
type RejectedEventData = { message: string; action_id: string };

export type ChatEvent =
  | { type: "planning"; data: MessageEventData }
  | { type: "proposed_action"; data: ActionRequestSchema }
  | { type: "evaluating"; data: MessageEventData }
  | { type: "decision"; data: DecisionResponseSchema }
  | { type: "waiting_approval"; data: MessageEventData }
  | { type: "ask_user"; data: QuestionEventData }
  | { type: "executing"; data: MessageEventData }
  | { type: "execution"; data: ExecutionResponseSchema }
  | { type: "rejected"; data: RejectedEventData }
  | { type: "error"; data: MessageEventData };

export type TurnStatus = ChatEvent["type"] | "idle";
