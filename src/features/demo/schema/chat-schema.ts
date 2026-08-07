import type { DecisionType } from "../types";

export interface ActionRequestSchema {
  domain: string;
  action_type: string;
  target_system: string;
  tool_name: string;
  target: string;
  payload_summary: string;
  risk_hint: string;
  content_context?: string;
  rollback_available?: string;
  confidence?: string;
}

export interface DecisionResponseSchema {
  decision: DecisionType;
  risk_level: string;
  risk_score: number;
  reasons: string[];
  audit_id: string;
}
