type ApprovalStep = {
  action_type: string;
  target?: string;
};

export function getApprovalQuestion(step: ApprovalStep): string {
  const target = step.target || "the specified target";

  switch (step.action_type) {
    case "BROWSER_OPEN":
      return `Allow AgentGate to open ${target}?`;

    case "BROWSER_CLICK":
      return `Allow AgentGate to click the target element on ${target}?`;

    case "BROWSER_TYPE":
      return `Allow AgentGate to enter information into ${target}?`;

    case "BROWSER_SCROLL":
      return `Allow AgentGate to scroll on ${target}?`;

    case "BROWSER_SCREENSHOT":
      return `Allow AgentGate to capture a screenshot of ${target}?`;

    case "BROWSER_SUBMIT":
      return `Allow AgentGate to submit the form on ${target}?`;

    case "BROWSER_SELECT":
      return `Allow AgentGate to select an option on ${target}?`;

    case "API_CALL":
      return `Allow AgentGate to make an API request to ${target}?`;

    case "FILE_READ":
      return `Allow AgentGate to read "${target}" from the local filesystem?`;

    default:
      return `Allow AgentGate to perform ${formatActionType(step.action_type)} on ${target}?`;
  }
}

function formatActionType(actionType: string): string {
  return actionType.toLowerCase().replace(/_/g, " ");
}

type InputField = {
  key: string;
  label: string;
};

type InputStep = {
  action_type: string;
  target_system: string;
  target?: string;
  payload?: {
    label?: string;
    role?: string;
  };
};

function getHostname(url?: string) {
  if (!url) return null;

  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

export function getInputQuestion(
  step: InputStep,
  fields: InputField[],
): string {
  const field = fields[0];

  if (step.action_type === "BROWSER_TYPE" && field) {
    const fieldName = field.label.toLowerCase();
    const hostname = getHostname(step.target);

    if (hostname) {
      return `What ${fieldName} should AgentGate enter on ${hostname}?`;
    }

    return `What ${fieldName} should AgentGate enter?`;
  }

  return "What information should AgentGate provide to continue?";
}
