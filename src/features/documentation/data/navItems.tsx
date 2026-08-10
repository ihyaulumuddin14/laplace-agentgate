import type { IconType } from "react-icons";
import {
  MdOutlineAccountTree,
  MdOutlineCheckCircle,
  MdOutlineCode,
  MdOutlineDataObject,
  MdOutlineDescription,
  MdOutlineLanguage,
  MdOutlineLayers,
  MdOutlineLeaderboard,
  MdOutlineMemory,
  MdOutlineMenuBook,
  MdOutlineSettings,
  MdOutlineShield,
  MdOutlineTerminal,
  MdOutlineWarningAmber,
} from "react-icons/md";

export type DocNavItem = {
  id: string;
  label: string;
  Icon: IconType;
};

export const DOC_NAV_ITEMS: DocNavItem[] = [
  { id: "introduction", label: "Introduction", Icon: MdOutlineMenuBook },
  { id: "core-concept", label: "Core Concept", Icon: MdOutlineShield },
  { id: "mvp-scope", label: "MVP Scope", Icon: MdOutlineCheckCircle },
  { id: "architecture", label: "Architecture", Icon: MdOutlineLayers },
  {
    id: "action-request-schema",
    label: "Action Request Schema",
    Icon: MdOutlineDescription,
  },
  {
    id: "decision-response-schema",
    label: "Decision Response Schema",
    Icon: MdOutlineDataObject,
  },
  { id: "tool-contracts", label: "Tool Contracts", Icon: MdOutlineLanguage },
  {
    id: "browser-snapshot-builder",
    label: "Browser Snapshot Builder",
    Icon: MdOutlineCode,
  },
  { id: "policy-packs", label: "Policy Packs", Icon: MdOutlineWarningAmber },
  { id: "demo-scenarios", label: "Demo Scenarios", Icon: MdOutlineTerminal },
  {
    id: "demo-console-guide",
    label: "Demo Console Guide",
    Icon: MdOutlineTerminal,
  },
  {
    id: "demo-console-ui-states",
    label: "Demo Console UI States",
    Icon: MdOutlineSettings,
  },
  { id: "cli-demo-guide", label: "CLI Demo Guide", Icon: MdOutlineMemory },
  {
    id: "benchmark-evaluation",
    label: "Benchmark & Evaluation",
    Icon: MdOutlineLeaderboard,
  },
  {
    id: "roadmap-upcoming-feature",
    label: "Roadmap / Upcoming Feature",
    Icon: MdOutlineAccountTree,
  },
];
