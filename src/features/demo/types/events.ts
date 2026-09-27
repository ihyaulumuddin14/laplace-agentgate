import type {
  DecisionResponseSchema,
  ExecutionResponse,
} from "../schema/chat-schema";
import type {
  ActionStep,
  BrowserActionPayload,
  Decision,
  ExecutionStatus,
  InputField,
  PlannedStep,
  PlanPayload,
} from "./domain";

/** The envelope used by every message received from the execution stream. */
export interface StreamMessage<TData = unknown> {
  run_id: string;
  type: string;
  data: TData;
}

export interface PlanEventPayload {
  run_id: string;
  plan: PlannedStep[];
  summary: string;
  llm_provider: string;
  raw_prompt: string;
}

export interface StepStatusEventPayload {
  run_id: string;
  index: number;
  status: string;
}

export type EvaluatedStep = ActionStep<
  PlanPayload,
  DecisionResponseSchema,
  unknown | null
>;

export interface GuardrailEventPayload {
  run_id: string;
  index: number;
  decision: Decision;
  risk_level: string;
  risk_score: number;
  reasons: string[];
  triggered_policies: string[];
  step: EvaluatedStep;
}

export interface AwaitingInputEventPayload {
  run_id: string;
  index: number;
  sanitize: boolean;
  fields: InputField[];
  step: ActionStep<
    BrowserActionPayload,
    DecisionResponseSchema,
    unknown | null
  > & {
    browser_element?: unknown;
  };
}

export interface BrowserAction {
  type: string;
  label: string;
  role: string;
  value?: string;
}

export interface ExecutingEventPayload {
  run_id: string;
  index: number[];
  target_system: string;
  url?: string;
  action_type?: string;
  actions?: BrowserAction[];
}

export interface StepResultEventPayload {
  run_id: string;
  index: number[];
  status: ExecutionStatus | string;
  result_summary: string;
  observation: string;
}

export interface DoneStep
  extends ActionStep<
    PlanPayload,
    DecisionResponseSchema,
    ExecutionResponse | null
  > {
  status: "done" | "declined" | string;
}

export interface DoneEventPayload {
  run_id: string;
  status: "done" | "declined" | string;
  steps: DoneStep[];
}

export interface StreamEventPayloads {
  run_started: unknown;
  planning: unknown;
  plan: PlanEventPayload;
  guardrail: GuardrailEventPayload;
  step_status: StepStatusEventPayload;
  awaiting_approval: GuardrailEventPayload;
  awaiting_input: AwaitingInputEventPayload;
  executing: ExecutingEventPayload;
  step_result: StepResultEventPayload;
  replanning: { run_id: string; iteration: number };
  done: DoneEventPayload;
  error: unknown;
}

export type StreamEvent = {
  [TType in keyof StreamEventPayloads]: {
    type: TType;
    data: StreamMessage<StreamEventPayloads[TType]>;
  };
}[keyof StreamEventPayloads];

export type RunStatus = StreamEvent["type"] | "idle";

export type AuditLog = {
  schema_version: string;
  audit_id: string;
  run_id: string;
  action_id: string;

  request_json: {
    domain?: string;
    run_id?: string;
    source?: string;
    target?: string;
    owner_id?: string;
    action_id?: string;
    risk_hint?: string;
    user_goal?: string;
    confidence?: number;
    created_at?: string;
    session_id?: string;

    action_type: string;
    target_system?: string;

    schema_version?: string;
    browser_element?: unknown;
    content_context?: string;
    payload_summary?: string;

    resolved_recipient?: unknown;
    rollback_available?: boolean;
    recipient_reference?: unknown;
  };

  decision_json: {
    run_id?: string;
    reasons?: string[];

    decision: string;
    action_id?: string;
    next_step?: string;
    created_at?: string;

    latency_ms?: number;

    risk_level?: string;
    risk_score?: number;

    schema_version?: string;
    evaluation_error?: unknown;
    initial_decision?: string | null;
    approval_decision?: string | null;
    sanitized_payload?: unknown;

    guardrail_audit_id?: string | null;

    sensitive_entities?: unknown[];
    triggered_policies?: string[];
  };

  execution_json?: {
    data?: unknown;
    error?: {
      code?: string;
      message?: string;
    } | null;

    run_id?: string;
    status?: string;
    executor?: string;
    action_id?: string;
    created_at?: string;
    latency_ms?: number;
    result_summary?: string;
    schema_version?: string;
  };

  execution_status?: string;
  error_type?: string | null;

  policy_version?: string;
  detector_version?: string;

  latency?: {
    total_ms?: number;
    executor_ms?: number;
    guardrail_ms?: number;
  };

  created_at?: string;
};
