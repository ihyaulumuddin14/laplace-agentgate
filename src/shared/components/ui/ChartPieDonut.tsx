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

export function ChartPieDonut({
  totalApprove,
  totalBlocked,
  totalNeedApproval,
  totalAskUser,
  totalSanitize,
}: {
  totalApprove: number;
  totalBlocked: number;
  totalNeedApproval: number;
  totalAskUser: number;
  totalSanitize: number;
}) {
  const rawChartData = [
    {
      decision: "allow",
      count: totalApprove,
      actualCount: totalApprove,
      fill: "var(--color-allow)",
    },
    {
      decision: "block",
      count: totalBlocked,
      actualCount: totalBlocked,
      fill: "var(--color-block)",
    },
    {
      decision: "need_approval",
      count: totalNeedApproval,
      actualCount: totalNeedApproval,
      fill: "var(--color-need_approval)",
    },
    {
      decision: "ask_user",
      count: totalAskUser,
      actualCount: totalAskUser,
      fill: "var(--color-ask_user)",
    },
    {
      decision: "sanitize",
      count: totalSanitize,
      actualCount: totalSanitize,
      fill: "var(--color-sanitize)",
    },
  ];

  const hasData = rawChartData.some((item) => item.actualCount > 0);

  const chartData = hasData
    ? rawChartData
    : rawChartData.map((item) => ({
        ...item,
        count: 1,
      }));

  return (
    <div className="w-[220px] h-[220px]">
      <ChartContainer config={chartConfig} className="mx-auto h-full w-full">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />

          <Pie
            data={chartData}
            dataKey="count"
            nameKey="decision"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
            strokeWidth={0}
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
