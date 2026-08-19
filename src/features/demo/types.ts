import type { IconType } from "react-icons";
import { IoEyeOutline } from "react-icons/io5";
import { LuNotepadText } from "react-icons/lu";
import { MdOutlineMessage } from "react-icons/md";
import type {
  ActionRequestSchema,
  DecisionResponseSchema,
  ExecutionResultResponseSchema,
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
  Icon: IconType;
  accent: string;
  variants: ScenarioVariant[];
};

export type DemoTab = {
  label: string;
  icon: IconType;
};

type DemoTabType = "chat" | "state" | "logs";

export const DemoTabs: Record<DemoTabType, DemoTab> = {
  chat: {
    label: "Scenario",
    icon: MdOutlineMessage,
  },
  state: {
    label: "State View",
    icon: IoEyeOutline,
  },
  logs: {
    label: "Logs",
    icon: LuNotepadText,
  },
};

export type Role = "user" | "assistant";

export type BadgeVariant = "success" | "danger" | "warning" | "neutral";

export interface ChatBadge {
  label: string;
  variant: BadgeVariant;
}

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  status?: TurnStatus;
  isStreaming?: boolean;
  badge?: ChatBadge;
  data?: {
    decision?: DecisionType;
    status?: ExecutionStatus;
    reasons?: string[];
  };
}

type MessageEventData = { message: string };
type QuestionEventData = { question: string };
type RejectedEventData = { message: string; action_id: string };

export type EventState =
  | { type: "planning"; data: MessageEventData }
  | { type: "proposed_action"; data: ActionRequestSchema }
  | { type: "evaluating"; data: MessageEventData }
  | { type: "decision"; data: DecisionResponseSchema }
  | { type: "waiting_approval"; data: MessageEventData }
  | { type: "ask_user"; data: QuestionEventData }
  | { type: "executing"; data: MessageEventData }
  | { type: "execution_result"; data: ExecutionResultResponseSchema }
  | { type: "rejected"; data: RejectedEventData }
  | { type: "error"; data: MessageEventData };

export type TurnStatus = EventState["type"] | "idle";
