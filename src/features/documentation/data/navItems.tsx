import type { IconType } from "react-icons";
import {
  MdOutlineCheckCircle,
  MdOutlineCode,
  MdOutlineDataObject,
  MdOutlineDescription,
  MdOutlineLanguage,
  MdOutlineLayers,
  MdOutlineMenuBook,
  MdOutlineShield,
  MdOutlineTerminal,
  MdOutlineWarningAmber,
} from "react-icons/md";

export type DocNavItem = {
  /** Stable slug — also used as the in-page anchor id. */
  id: string;
  label: string;
  Icon: IconType;
};

/**
 * Placeholder documentation navigation. Real content / final ordering is
 * filled in later — the components read from this list so nothing is hardcoded.
 */
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
];
