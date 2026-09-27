type ApprovalStep = {
  action_type: string;
  target?: string;
};

export function getApprovalQuestion(step: ApprovalStep): string {
  const target = step?.target || "the specified target";

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

function formatFieldLabels(fields: InputField[]): string {
  const labels = fields.map((field) => field.label);

  if (labels.length === 1) {
    return labels[0];
  }

  if (labels.length === 2) {
    return `${labels[0]} and ${labels[1]}`;
  }

  return `${labels.slice(0, -1).join(", ")}, and ${labels.at(-1)}`;
}

export function getInputQuestion(
  step: InputStep,
  fields: InputField[],
): string {
  if (fields.length === 0) {
    return "What information should AgentGate provide to continue?";
  }

  const fieldLabels = formatFieldLabels(fields);

  if (step.action_type === "BROWSER_TYPE") {
    const hostname = getHostname(step?.target ?? "");

    if (fields.length === 1) {
      const fieldName = fields[0].label.toLowerCase();

      if (hostname) {
        return `What ${fieldName} should AgentGate enter on ${hostname}?`;
      }

      return `What ${fieldName} should AgentGate enter?`;
    }

    if (hostname) {
      return `What information should AgentGate enter for ${fieldLabels} on ${hostname}?`;
    }

    return `What information should AgentGate enter for ${fieldLabels}?`;
  }

  if (step.action_type === "API_CALL") {
    const system = step?.target_system || "the target system";

    return `What information should AgentGate provide for ${fieldLabels} to continue the ${system} request?`;
  }

  return `What information should AgentGate provide for ${fieldLabels} to continue?`;
}
