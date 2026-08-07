import type { IconType } from "react-icons";
export type ScenarioVariant = {
  taskText: string;
  expectedDecision: DecisionType;
};

export type DecisionType =
  | "ALLOW"
  | "BLOCK"
  | "NEED_APPROVAL"
  | "SANITIZE"
  | "ASK_USER";

export type ScenarioRunnerOptionType = {
  title: string;
  description: string;
  Icon: IconType;
  accent: string;
  variants: ScenarioVariant[];
};

export const DemoTabs = {
  chat: "chat",
  action: "action",
  insight: "insight",
} as const;

export type DemoTab = (typeof DemoTabs)[keyof typeof DemoTabs];

export type ChatEvent = {
  type: string;
  data: unknown;
};
