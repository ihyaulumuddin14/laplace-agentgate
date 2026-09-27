"use client";

import type { CSSProperties } from "react";
import { ChartPieDonut } from "@/shared/components/ui/ChartPieDonut";
import { useAuditLog } from "../../hooks/useAuditLog";
import { DECISION_VARIANTS } from "../sections/StateSection";

const RiskDashboard = () => {
  const {
    totalActions,
    totalApprove,
    totalBlocked,
    totalNeedApproval,
    totalAskUser,
    totalSanitize,
  } = useAuditLog();

  const decisionItems = [
    {
      label: "Allow",
      count: totalApprove,
      accent: DECISION_VARIANTS.ALLOW.accent,
    },
    {
      label: "Block",
      count: totalBlocked,
      accent: DECISION_VARIANTS.BLOCK.accent,
    },
    {
      label: "Need Approval",
      count: totalNeedApproval,
      accent: DECISION_VARIANTS.NEED_APPROVAL.accent,
    },
    {
      label: "Sanitize",
      count: totalSanitize,
      accent: DECISION_VARIANTS.SANITIZE.accent,
    },
    {
      label: "Ask User",
      count: totalAskUser,
      accent: DECISION_VARIANTS.ASK_USER.accent,
    },
  ];

  const summaryItems = [
    {
      label: "Total Actions",
      count: totalActions,
      accent: DECISION_VARIANTS.ASK_USER.accent,
    },
    {
      label: "Approve",
      count: totalApprove,
      accent: DECISION_VARIANTS.ALLOW.accent,
    },
    {
      label: "Blocked",
      count: totalBlocked,
      accent: DECISION_VARIANTS.BLOCK.accent,
    },
    {
      label: "Pending Review",
      count: totalNeedApproval,
      accent: DECISION_VARIANTS.NEED_APPROVAL.accent,
    },
  ];

  return (
    <article className="flex h-full w-full flex-col items-center gap-10 overflow-y-auto p-3 py-7 max-lg:mask-y-from-90% minimal-scrollbar">
      <ChartPieDonut
        totalApprove={totalApprove}
        totalBlocked={totalBlocked}
        totalNeedApproval={totalNeedApproval}
        totalAskUser={totalAskUser}
        totalSanitize={totalSanitize}
      />

      <ul className="flex w-[80%] flex-col gap-2">
        {decisionItems.map((item) => (
          <li
            key={item.label}
            style={{ "--accent": item.accent } as CSSProperties}
            className="flex w-full justify-between"
          >
            <div className="flex w-full flex-1 items-center gap-7">
              <div className="size-4 aspect-square rounded-full border bg-accent" />

              <p className="line-clamp-1 text-[12px] font-medium sm:text-sm lg:text-base">
                {item.label}
              </p>
            </div>

            <p className="text-[10px] font-medium sm:text-xs lg:text-sm">
              {item.count}
            </p>
          </li>
        ))}
      </ul>

      <ul className="grid w-[80%] grid-cols-2 gap-2">
        {summaryItems.map((item) => (
          <li
            key={item.label}
            style={{ "--accent": item.accent } as CSSProperties}
            className="flex w-full flex-col items-center justify-center rounded-lg border border-white bg-white/10 p-2"
          >
            <p className="line-clamp-1 text-base font-semibold text-accent sm:text-lg md:text-lg lg:text-2xl">
              {item.count}
            </p>

            <p className="line-clamp-1 text-[12px] font-medium text-accentgray sm:text-sm lg:text-base">
              {item.label}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default RiskDashboard;
