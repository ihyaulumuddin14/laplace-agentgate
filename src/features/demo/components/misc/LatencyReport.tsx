"use client";

import type { CSSProperties } from "react";
import { ChartBarMultiple } from "@/shared/components/ui/ChartBarMultiple";
import { useAuditLog } from "../../hooks/useAuditLog";

const LatencyReport = () => {
  const { p50Guardrail, p50Total, p95Guardrail, p95Total, audits } =
    useAuditLog();

  const latencyData = ["BROWSER", "FILE", "API"].map((type) => {
    const filteredAudits = audits.filter((audit) =>
      audit.request_json.action_type.startsWith(type),
    );

    const count = filteredAudits.length;

    return {
      action_type: type,
      executor_ms:
        count > 0
          ? filteredAudits.reduce(
              (sum, audit) => sum + (audit.latency?.executor_ms ?? 0),
              0,
            ) / count
          : 0,
      guardrail_ms:
        count > 0
          ? filteredAudits.reduce(
              (sum, audit) => sum + (audit.latency?.guardrail_ms ?? 0),
              0,
            ) / count
          : 0,
    };
  });

  const summaryItems = [
    {
      label: "P50 Total",
      count: p50Total,
      accent: "#00CC96",
    },
    {
      label: "P95 Total",
      count: p95Total,
      accent: "#00CC96",
    },
    {
      label: "P50 Guardrail",
      count: p50Guardrail,
      accent: "#FFC300",
    },
    {
      label: "P95 Guardrail",
      count: p95Guardrail,
      accent: "#FFC300",
    },
  ];

  return (
    <article className="w-full p-3 flex flex-col items-center gap-10 h-full overflow-y-auto py-7 max-lg:mask-y-from-90% minimal-scrollbar">
      <h3 className="text-base lg:text-lg font-bold text-gray-50 mb-4 self-start ml-4">
        Latency Breakdown (ms)
      </h3>
      <ChartBarMultiple data={latencyData} />

      <ul className="grid w-full grid-cols-2 gap-2">
        {summaryItems.map((item) => (
          <li
            key={item.label}
            style={{ "--accent": item.accent } as CSSProperties}
            className="flex w-full flex-col items-start justify-center rounded-lg border border-white bg-white/10 p-4"
          >
            <h3 className="text-gray font-medium text-sm lg:text-base line-clamp-1">
              {item.label}
            </h3>
            <p className="text-sm font-semibold text-green md:text-base lg:text-lg line-clamp-1">
              {latencyData.length > 0 ? `${item.count.toFixed(2)}ms` : "-"}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default LatencyReport;
