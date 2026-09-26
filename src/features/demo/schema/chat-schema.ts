import type { Decision } from "../types/domain";

export interface ActionRequestSchema {
  schema_version: string;
  run_id: string;
  action_id: string;
  source: string;
  domain: string;
  action_type: string;
  target_system: string;
  target: string;
  content_context?: string;
  payload_summary: string;
  browser_element: string | null;
  risk_hint: string;
  rollback_available?: boolean;
  confidence?: number;
  created_at: string;
}

export interface DecisionResponseSchema {
  schema_version: string;
  run_id: string;
  action_id: string;
  decision: Decision;
  risk_level: string;
  risk_score: number;
  reasons: string[];
  triggered_policies: string[];
  sensitive_entities: string[];
  sanitized_payload: string | null;
  next_step: string;
  latency_ms: number;
  created_at: string;
  initial_decision?: string;
  approval_decision?: "approved" | "declined" | string;
  guardrail_audit_id?: string;
  evaluation_error?: string | null;
}

export interface ExecutionResponse {
  schema_version: string;
  run_id: string;
  action_id: string;
  executor: string;
  status: "SUCCESS" | "FAILED";
  result_summary: string;
  data: ExecutionData;
  error: string | null;
  latency_ms: number;
  created_at: string;
  execution_status: "SUCCESS" | "FAILED";
}

export interface ExecutionData {
  url: string;
  final_url: string;
  snapshot: Snapshot[];
  selector_map: Record<string, SelectorMap>;
  locator_candidates: LocatorCandidate[];
  final_snapshot: Snapshot[];
  final_selector_map: SelectorMap[];
  action: BrowserAction | null;
  actions: BrowserAction[];
  action_results: ActionResult[];
  executed: boolean;
}

export interface BrowserAction {
  type: string;
  label: string;
  element_id: string;
  role: string;
  value: string;
}

export interface ActionResult {
  index: number;
  type: string;
  status: "SUCCESS" | "FAILED";
  action: BrowserAction;
  final_url: string;
}

export interface Snapshot {
  element_id: string;
  role: string;
  label: string;
  risk_hint: string;
  dom: {
    tag: string;
    id: string;
    class: string;
    text: string | null;
    name: string | null;
    title: string | null;
    placeholder: string | null;
    aria_label: string | null;
    test_id: string | null;
    href: string | null;
    visible: boolean;
    disabled: boolean;
  };
}

export interface LocatorCandidate {
  element_id: string;
  role: string;
  label: string;
  risk_hint: string;
  locator_candidates: {
    strategy: string;
    role: string;
    name: string;
  }[];
}

export interface SelectorMap {
  primary: {
    strategy: string;
    role: string;
    name: string;
  };
  fallbacks: {
    strategy: string;
    value: string;
  }[];
}
