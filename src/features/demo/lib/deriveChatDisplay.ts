import type { SSEEvent } from "../stores/event-stores";
import type { ChatBadge } from "../types";
import {
  getApprovalQuestion,
  getInputQuestion,
} from "./getQuestionForSanitize";

export function deriveChatDisplay(event: SSEEvent): {
  content: string;
  badge?: ChatBadge;
} {
  switch (event.type) {
    case "run_started":
      return {
        content: "Starting AgentGate...",
      };

    case "planning":
      return {
        content: "Planning...",
      };

    case "plan":
      return {
        content: "Preparing execution plan...",
      };

    case "guardrail": {
      const data = event.data;

      if (data.data.decision === "BLOCK") {
        return {
          content: humanizeReason(data.data.reasons[0] ?? "Action blocked"),
          badge: { label: "Blocked", variant: "danger" },
        };
      }

      if (data.data.decision === "NEED_APPROVAL") {
        return {
          content: "⏳ This action needs your approval — check the panel →",
        };
      }

      if (data.data.decision === "ASK_USER") {
        return {
          content: "🤔 I need more information before continuing",
        };
      }

      if (data.data.decision === "ALLOW") {
        return {
          content: "✅ Action allowed — continuing to execution",
        };
      }

      if (data.data.decision === "SANITIZE") {
        return {
          content:
            "🧹 Sensitive content detected — sanitizing before continuing",
        };
      }

      return {
        content: "Guardrail evaluation completed",
      };
    }

    case "step_status":
      return {
        content: `Running step #${event.data.data.index + 1}`,
      };

    case "awaiting_approval": {
      const step = event.data.data.step;
      const question = getApprovalQuestion({
        action_type: step?.action_type,
        target: step?.target,
      });

      return {
        content: `Step #${step.index} - ${
          question ??
          "This action needs your approval, check the panel on the right side"
        }`,
        badge: {
          label: "Needs Approval",
          variant: "warning",
        },
      };
    }
    case "awaiting_input":
      return {
        content:
          getInputQuestion(event.data.data.step, event.data.data.fields) ??
          "I need more information before continuing",
        badge: {
          label: "Action Required",
          variant: "warning",
        },
      };

    case "executing": {
      const index = event.data.data.index;
      const stepsString = Array.isArray(index)
        ? index.map((i) => `#${i}`).join(", ")
        : `#${index}`;

      return {
        content: `Executing Step ${stepsString}...`,
      };
    }

    case "step_result":
      return event.data.data.status === "SUCCESS"
        ? {
            content: event.data.data.result_summary,
            badge: {
              label: "Success",
              variant: "success",
            },
          }
        : {
            content: "Execution failed",
            badge: {
              label: "Failed",
              variant: "danger",
            },
          };

    case "replanning":
      return {
        content: `Replanning #${event.data.data.iteration}, LLM decides next steps...`,
      };

    case "done": {
      const doneData = event.data.data;
      const isFailed =
        doneData.status === "declined" ||
        doneData.status === "blocked" ||
        doneData.status === "failed";

      if (isFailed) {
        return {
          content: `Action was ${doneData.status}, execution stopped`,
          badge: {
            label:
              doneData.status.charAt(0).toUpperCase() +
              doneData.status.slice(1),
            variant: "danger",
          },
        };
      }

      return {
        content: "Task completed successfully",
        badge: {
          label: "Completed",
          variant: "success",
        },
      };
    }

    case "error":
      return {
        content: "Something went wrong",
        badge: {
          label: "Error",
          variant: "danger",
        },
      };

    default:
      return {
        content: "Processing...",
      };
  }
}

export function humanizeReason(raw: string): string {
  const map: Record<string, string> = {
    "risk_hint=unknown, domain=browser":
      "This action's risk level could not be determined",
  };
  return map[raw] ?? raw;
}
