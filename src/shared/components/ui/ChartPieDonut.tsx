"use client";

import { Pie, PieChart } from "recharts";

import { Card } from "@/shared/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";

export const description = "A donut chart";

const chartData = [
  { decision: "allow", count: 275, fill: "var(--color-allow)" },
  { decision: "block", count: 200, fill: "var(--color-block)" },
  { decision: "need_approval", count: 187, fill: "var(--color-need_approval)" },
  { decision: "ask_user", count: 173, fill: "var(--color-ask_user)" },
  { decision: "sanitize", count: 90, fill: "var(--color-sanitize)" },
];

const chartConfig = {
  count: {
    label: "Count",
  },
  allow: {
    label: "Allow",
    color: "var(--allow)",
  },
  block: {
    label: "Block",
    color: "var(--block)",
  },
  need_approval: {
    label: "Need Approval",
    color: "var(--need-approval)",
  },
  ask_user: {
    label: "Ask User",
    color: "var(--ask-user)",
  },
  sanitize: {
    label: "Sanitize",
    color: "var(--sanitize)",
  },
} satisfies ChartConfig;

export function ChartPieDonut() {
  return (
    <Card className="flex flex-col bg-transparent">
      {/* <CardContent className="flex-1 pb-0"> */}
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-[250px] w-[250px] bg-transparent"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="decision"
            innerRadius={50}
          />
        </PieChart>
      </ChartContainer>
      {/* </CardContent> */}
    </Card>
  );
}
