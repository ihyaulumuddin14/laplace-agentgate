import { AiOutlineQuestionCircle } from "react-icons/ai";
import { CiGlobe } from "react-icons/ci";
import { MdOutlineEmail, MdPayment } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import type {
  ActionRequestSchema,
  DecisionResponseSchema,
  ExecutionResponse,
} from "../schema/chat-schema";
import type { ScenarioRunnerOption } from "../types";

export const SCENARIOS = [
  {
    title: "Open Youtube",
    Icon: CiGlobe,
    accent: "#4dff0c",
    variants: [
      {
        taskText: "Open youtube.com then search for video about AI",
      },
    ],
  },
  {
    title: "Payment",
    Icon: MdPayment,
    accent: "#EF4444",
    variants: [
      {
        taskText: "Send a payment of 50000 to partner via stripe",
      },
    ],
  },
  {
    title: "Send an email",
    Icon: MdOutlineEmail,
    accent: "#ebd234",
    variants: [
      {
        taskText: "Send an email to john@example.com saying hello",
      },
    ],
  },
  {
    title: "Login (Sanitize credentials)",
    Icon: VscAccount,
    accent: "#FF9900",
    variants: [
      {
        taskText: "Login to github.com with password <password>",
      },
    ],
  },
  {
    title: "Inbox Cleanup",
    Icon: AiOutlineQuestionCircle,
    accent: "#00D4FF",
    variants: [
      {
        taskText: "Review and delete emails older than 30 days",
      },
    ],
  },
] as const satisfies readonly ScenarioRunnerOption[];

export const PROPOSED_ACTION_DUMMY: ActionRequestSchema = {
  schema_version: "0.1",
  run_id: "run_709c199e5cd6",
  action_id: "act_9d916fa9e390",
  source: "api",
  domain: "browser",
  action_type: "BROWSER_PROTOTYPE_ACTION",
  target_system: "browser",
  target: "https://youtube.com",
  content_context: "",
  payload_summary:
    "3 browser actions on https://youtube.com: fill, submit, screenshot",
  browser_element: null,
  risk_hint: "unknown",
  rollback_available: false,
  confidence: 1.0,
  created_at: "2026-08-07T07:18:59.587418Z",
};

export const DECISION_RESPONSE_DUMMY: DecisionResponseSchema = {
  schema_version: "0.1",
  run_id: "run_709c199e5cd6",
  action_id: "act_9d916fa9e390",
  decision: "ALLOW",
  risk_level: "LOW",
  risk_score: 0.1,
  reasons: ["risk_hint=unknown, domain=browser"],
  triggered_policies: [],
  sensitive_entities: [],
  sanitized_payload: null,
  next_step: "execute",
  latency_ms: 0,
  created_at: "2026-08-07T07:18:59.587430Z",
};

export const EXECUTION_RESPONSE_DUMMY: ExecutionResponse = {
  schema_version: "0.1",
  run_id: "run_709c199e5cd6",
  action_id: "act_9d916fa9e390",
  executor: "browser_prototype_agent",
  status: "SUCCESS",
  result_summary: "executed 3 browser actions",
  data: {
    url: "https://youtube.com",
    final_url: "https://www.youtube.com/results?search_query=prabowo",
    snapshot: [
      {
        element_id: "1",
        role: "button",
        label: "Guide",
        risk_hint: "low_risk",
        dom: {
          tag: "button",
          id: "button",
          class: "style-scope yt-icon-button",
          text: null,
          name: null,
          title: null,
          placeholder: null,
          aria_label: "Guide",
          test_id: null,
          href: null,
          visible: true,
          disabled: false,
        },
      },
    ],
    selector_map: {
      "1": {
        primary: {
          strategy: "role",
          role: "button",
          name: "Skip navigation",
        },
        fallbacks: [
          { strategy: "label", value: "Skip navigation" },
          { strategy: "text", value: "Skip navigation" },
        ],
      },
    },
    locator_candidates: [],
    final_snapshot: [],
    final_selector_map: [],
    action: null,
    actions: [],
    action_results: [],
    executed: false,
  },
  error: null,
  latency_ms: 0,
  created_at: "2026-08-07T07:18:59.587430Z",
  execution_status: "SUCCESS",
};
