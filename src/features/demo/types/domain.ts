export type Decision =
  | "ALLOW"
  | "BLOCK"
  | "NEED_APPROVAL"
  | "SANITIZE"
  | "ASK_USER";

export type ExecutionStatus = "SUCCESS" | "FAILED" | "PARTIAL";

/** Fields that identify every action produced by the planner. */
export interface ActionStep<
  TPayload = Record<string, unknown>,
  TDecision = string | null,
  TExecution = unknown | null,
> {
  source: string;
  domain: string;
  action_type: string;
  target_system: string;
  target: string;
  risk_hint: string;
  payload: TPayload;
  index: number;
  action_id: string;
  status: string;
  decision: TDecision;
  execution: TExecution;
}

export interface PlanPayload {
  action: string;
  path: string;
}

export interface BrowserActionPayload {
  url: string;
  action_type: string;
  element_id: string;
  label: string;
  role: string;
  value: string;
}

export type PlannedStep = ActionStep<PlanPayload>;

export interface InputField {
  key: string;
  label: string;
}
