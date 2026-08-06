import type { IconType } from "react-icons";

export type ScenarioRunnerOptionType = {
  title: string;
  description: string;
  Icon: IconType;
  accent: string;
};

export const DemoTabs = {
  chat: "chat",
  action: "action",
  insight: "insight",
} as const;

export type DemoTab = (typeof DemoTabs)[keyof typeof DemoTabs];
