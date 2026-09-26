import type { IconType } from "react-icons";
import type { Decision, ExecutionStatus } from "./domain";
import type { RunStatus } from "./events";

export interface ScenarioVariant {
  taskText: string;
  expectedDecision: Decision;
}

export interface ScenarioRunnerOption {
  title: string;
  Icon: IconType;
  accent: string;
  variants: readonly ScenarioVariant[];
}

export interface DemoTab {
  label: string;
  icon: IconType;
}

export type ChatRole = "user" | "assistant";
export type BadgeVariant = "success" | "danger" | "warning" | "neutral";

export interface ChatBadge {
  label: string;
  variant: BadgeVariant;
}

export interface ChatMessageData {
  decision?: Decision;
  status?: ExecutionStatus;
  reasons?: string[];
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  status?: RunStatus;
  isStreaming?: boolean;
  badge?: ChatBadge;
  data?: ChatMessageData;
}
