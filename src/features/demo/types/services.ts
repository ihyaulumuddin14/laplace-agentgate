export interface SessionResponse {
  session_id: string;
  idle_ttl_seconds: number;
}

export type EndSessionReason = "pagehide" | "refresh" | "reset" | "replaced";

export interface EndSessionRequest {
  session_id: string;
  reason: EndSessionReason;
}

export interface ApprovalDecisionRequest {
  action: "approve" | "decline";
  step_index: number;
}

export interface UserInputDecisionRequest {
  action: "input";
  fields: { value: string };
  step_index: number;
}

export type RunDecisionRequest =
  | ApprovalDecisionRequest
  | UserInputDecisionRequest;
