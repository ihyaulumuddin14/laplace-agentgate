import type { ChatBadge, EventState } from "../types";

export function deriveChatDisplay(state: EventState): {
  content: string;
  badge?: ChatBadge;
} {
  switch (state.type) {
    case "planning":
      return { content: state.data.message };

    case "proposed_action":
      return { content: `Preparing action: ${state.data.payload_summary}` };

    case "evaluating":
      return { content: state.data.message };

    case "decision": {
      const data = state.data;
      if (data.decision === "BLOCK") {
        return {
          content: humanizeReason(data.reasons[0] ?? "Action blocked"),
          badge: { label: "Blocked", variant: "danger" },
        };
      }
      if (data.decision === "NEED_APPROVAL") {
        return {
          content: "⏳ This action needs your approval — check the panel →",
        };
      }
      if (data.decision === "ASK_USER") {
        return { content: "🤔 I need more information before continuing" };
      }
      if (data.decision === "ALLOW") {
        return { content: "✅ Action allowed — continuing to execution" };
      }
      if (data.decision === "SANITIZE") {
        return {
          content:
            "🧹 Sensitive content detected — sanitizing before continuing",
        };
      }
      return { content: "Decision received" };
    }

    case "waiting_approval":
      return {
        content: state.data.message,
        badge: { label: "Needs Approval", variant: "warning" },
      };

    case "ask_user":
      return {
        content: state.data.question,
        badge: { label: "Action Required", variant: "warning" },
      };

    case "executing":
      return { content: state.data.message };

    case "execution_result":
      return state.data.status === "SUCCESS"
        ? {
            content: state.data.result_summary,
            badge: { label: "Success", variant: "success" },
          }
        : {
            content: state.data.error ?? "Execution failed",
            badge: { label: "Failed", variant: "danger" },
          };

    case "rejected":
      return { content: "❌ Action rejected by reviewer" };

    case "error":
      return { content: state.data.message };

    default:
      return { content: "Processing..." };
  }
}

function humanizeReason(raw: string): string {
  const map: Record<string, string> = {
    "risk_hint=unknown, domain=browser":
      "This action's risk level could not be determined",
  };
  return map[raw] ?? raw;
}
