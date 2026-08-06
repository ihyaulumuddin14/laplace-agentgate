import { CiCalendar } from "react-icons/ci";
import { IoBookmarksOutline, IoCodeSlash } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import type { ScenarioRunnerOptionType } from "../types";

export const SCENARIOS: ScenarioRunnerOptionType[] = [
  {
    title: "Calendar Event",
    description:
      "Agent reads today's calendar because the request is safe and read-only.",
    Icon: CiCalendar,
    accent: "#4dff0c",
  },
  {
    title: "Booking message",
    description: "Agent proposes to send a payment confirmation message.",
    Icon: IoBookmarksOutline,
    accent: "#d440e5",
  },
  {
    title: "Sensitive Code Check",
    description: "Agent reads a repository or local file.",
    Icon: IoCodeSlash,
    accent: "#0fc3fc",
  },
  {
    title: "Productivity assistant",
    description: "Agent proposes bulk email archive.",
    Icon: TfiEmail,
    accent: "#ebd234",
  },
] as const;
