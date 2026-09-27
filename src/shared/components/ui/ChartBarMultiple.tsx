"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";

export const description = "A multiple bar chart";

// const chartData = [
//   {
//     action_type: "BROWSER_PROTOTYPE_ACTION",
//     executor_ms: 186,
//     guardrail_ms: 80,
//   },
//   {
//     action_type: "BROWSER_PROTOTYPE_ACTION",
//     executor_ms: 186,
//     guardrail_ms: 80,
//   },
//   {
//     action_type: "BROWSER_PROTOTYPE_ACTION",
//     executor_ms: 186,
//     guardrail_ms: 80,
//   },
//   {
//     action_type: "BROWSER_PROTOTYPE_ACTION",
//     executor_ms: 186,
//     guardrail_ms: 80,
//   },
//   {
//     action_type: "BROWSER_PROTOTYPE_ACTION",
//     executor_ms: 186,
//     guardrail_ms: 80,
//   },
//   {
//     action_type: "BROWSER_PROTOTYPE_ACTION",
//     executor_ms: 186,
//     guardrail_ms: 80,
//   },
//   {
//     action_type: "BROWSER_PROTOTYPE_ACTION",
//     executor_ms: 186,
//     guardrail_ms: 80,
//   },
//   {
//     action_type: "BROWSER_PROTOTYPE_ACTION",
//     executor_ms: 186,
//     guardrail_ms: 80,
//   },
//   {
//     action_type: "BROWSER_PROTOTYPE_ACTION",
//     executor_ms: 186,
//     guardrail_ms: 80,
//   },
// ];

export type BarChartData = {
  action_type: string;
  executor_ms: number;
  guardrail_ms: number;
};

const chartConfig = {
  executor_ms: {
    label: "Executor",
    color: "var(--chart-1)",
  },
  guardrail_ms: {
    label: "Guardrail",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartBarMultiple({ data }: { data: BarChartData[] }) {
  return (
    <div className="w-full px-4">
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={data}
          barCategoryGap={"20%"}
          barGap={0}
        >
          <CartesianGrid vertical={true} />
          <YAxis
            tickLine={true}
            axisLine={true}
            tickMargin={10}
            stroke="white"
          />
          <XAxis
            dataKey="action_type"
            tickLine={true}
            tickMargin={10}
            axisLine={true}
            stroke="white"
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar
            dataKey="executor_ms"
            fill="var(--color-yellow)"
            radius={[20, 20, 0, 0]}
          />
          <Bar
            dataKey="guardrail_ms"
            fill="var(--color-orange)"
            radius={[20, 20, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
