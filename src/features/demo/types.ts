import type { IconType } from "react-icons";
import { FiClock } from "react-icons/fi";
import { ImStatsBars } from "react-icons/im";
import { IoEyeOutline } from "react-icons/io5";
import { LuNotepadText } from "react-icons/lu";
import { MdOutlineMessage } from "react-icons/md";
import type {
  ActionRequestSchema,
  DecisionResponseSchema,
  ExecutionResultResponseSchema,
} from "@/features/demo/schema/chat-schema";
import type { SSEMessage } from "./services/chat-services";
import type { RunStatus } from "./stores/event-stores";

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

type LogsTabType = "audit" | "risk" | "latency";

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

export const LogsTabs: Record<LogsTabType, DemoTab> = {
  audit: {
    label: "Audit Log",
    icon: LuNotepadText,
  },
  risk: {
    label: "Risk Dashboard",
    icon: ImStatsBars,
  },
  latency: {
    label: "Latency Report",
    icon: FiClock,
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
  status?: RunStatus;
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

export type PlanEventData = SSEMessage<{
  run_id: string;
  plan: PlanItem[];
  summary: string;
  llm_provider: string;
  raw_prompt: string;
}>;

export interface PlanItem {
  source: string;
  domain: string;
  action_type: string;
  target_system: string;
  target: string;
  risk_hint: string;
  payload: PlanPayload;
  index: number;
  action_id: string;
  status: string;
  decision: string | null;
  execution: unknown | null;
}

export interface PlanPayload {
  action: string;
  path: string;
}

export type StepStatusEventData = SSEMessage<{
  run_id: string;
  index: number;
  status: string;
}>;

export type GuardrailEventData = SSEMessage<{
  run_id: string;
  index: number;
  decision: DecisionType;
  risk_level: string;
  risk_score: number;
  reasons: string[];
  triggered_policies: string[];
  step: {
    source: string;
    domain: string;
    action_type: string;
    target_system: string;
    target: string;
    risk_hint: string;
    payload: {
      action: string;
      path: string;
    };
    index: number;
    action_id: string;
    status: string;
    decision: DecisionResponseSchema;
    execution: unknown | null;
  };
}>;

export type AwaitingApprovalEventData = GuardrailEventData;

export type AwaitingInputEventData = SSEMessage<{
  run_id: string;
  index: number;
  sanitize: boolean;
  fields: {
    key: string;
    label: string;
  }[];
  step: {
    source: string;
    domain: string;
    action_type: string;
    target_system: string;
    target: string;
    risk_hint: string;
    payload: {
      url: string;
      action_type: string;
      element_id: string;
      label: string;
      role: string;
      value: string;
    };
    browser_element?: unknown | undefined;
    index: number;
    action_id: string;
    status: string;
    decision: DecisionResponseSchema;
    execution: unknown | null;
  };
}>;

export type ExecutingEventData = SSEMessage<{
  run_id: string;
  index: number[];
  target_system: string;
  url?: string;
  action_type?: string;
  actions?: [
    {
      type: string;
      label: string;
      role: string;
      value: string;
    },
    {
      type: "fill";
      label: string;
      role: string;
      value: string;
    },
    {
      type: "click";
      label: string;
      role: string;
    },
  ];
}>;

export type StepResultEventData = SSEMessage<{
  run_id: string;
  index: number[];
  status: "SUCCESS" | "FAILED" | unknown;
  result_summary: string;
  observation: string;
}>;

export type ReplanningEventData = SSEMessage<{
  run_id: string;
  iteration: number;
}>;

export interface ExecutionResponse {
  schema_version: string;
  run_id: string;
  action_id: string;
  executor: string;
  status: "SUCCESS" | "FAILED";
  result_summary: string;
  data: {
    path: string;
    content_preview: string;
  };
  error: string | null;
  latency_ms: number;
  created_at: string;
}

export interface Step {
  source: string;
  domain: string;
  action_type: string;
  target_system: string;
  target: string;
  risk_hint: string;
  payload: PlanPayload;
  index: number;
  action_id: string;
  status: string;
}

export interface PlanItem extends Step {
  decision: string | null;
  execution: unknown | null;
}

export interface DoneStep extends Step {
  status: "done" | "declined" | string;
  decision: DecisionResponseSchema;
  execution: ExecutionResponse | null;
}

export type DoneEventData = SSEMessage<{
  run_id: string;
  status: "done" | "declined" | string;
  steps: DoneStep[];
}>;
