import { FiClock } from "react-icons/fi";
import { ImStatsBars } from "react-icons/im";
import { IoEyeOutline } from "react-icons/io5";
import { LuNotepadText } from "react-icons/lu";
import { MdOutlineMessage } from "react-icons/md";
import type { DemoTab } from "../types";

export const DEMO_TABS: Record<"chat" | "state" | "logs", DemoTab> = {
  chat: { label: "Scenario", icon: MdOutlineMessage },
  state: { label: "State View", icon: IoEyeOutline },
  logs: { label: "Logs", icon: LuNotepadText },
};

export const LOG_TABS: Record<"audit" | "risk" | "latency", DemoTab> = {
  audit: { label: "Audit Log", icon: LuNotepadText },
  risk: { label: "Risk Dashboard", icon: ImStatsBars },
  latency: { label: "Latency Report", icon: FiClock },
};
