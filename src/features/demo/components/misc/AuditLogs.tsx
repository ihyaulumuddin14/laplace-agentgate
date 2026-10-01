"use client";

import type { CSSProperties } from "react";
import { useAuditLog } from "../../hooks/useAuditLog";
import type { AuditLog } from "../../types";
import { DECISION_VARIANTS } from "../sections/StateSection";
import DecisionLabel from "./DecisionLabel";

const AuditLogs = () => {
  const { audits } = useAuditLog();
  return (
    <article className="w-full p-3 flex flex-col gap-2 h-full overflow-y-auto py-7 max-lg:mask-y-from-90% minimal-scrollbar">
      {audits.length > 0 ? (
        audits.map((audit) => (
          <AuditLogItem auditLogData={audit} key={audit.audit_id} />
        ))
      ) : (
        <p className="text-gray text-sm text-center">No audit logs found</p>
      )}
    </article>
  );
};

export default AuditLogs;

const AuditLogItem = ({ auditLogData }: { auditLogData: AuditLog }) => {
  const variant =
    DECISION_VARIANTS[
      auditLogData.decision_json.decision as keyof typeof DECISION_VARIANTS
    ] || DECISION_VARIANTS.ALLOW;

  return (
    <div className="w-full p-4 rounded-2xl flex gap-2 border border-white/50 bg-white/10">
      {/* INFORMATION TEXT */}
      <div className="flex flex-[1.4] min-w-0! flex-col gap-2">
        <span className="text-gray text-xs">
          {new Date(
            (auditLogData.created_at as string) || "",
          ).toLocaleTimeString()}
        </span>
        <h2 className="text-white font-semibold text-sm">
          {auditLogData.request_json.action_type.toUpperCase()}
        </h2>
        <h3 className="text-white text-sm">
          {auditLogData.request_json.target_system}
        </h3>
        <p className="text-gray text-sm truncate">{auditLogData.audit_id}</p>
      </div>

      {/* LABELS */}
      <div
        style={
          {
            "--accent": variant.accent,
          } as CSSProperties
        }
        className="flex flex-1 justify-center min-w-0! flex-col gap-5 items-end"
      >
        <DecisionLabel
          className="ml-auto w-full max-w-17.5 text-center"
          label={variant.label}
        />
        <div className="flex flex-wrap justify-center gap-2 w-fit">
          <span className="w-fit text-xs rounded-[12px] bg-accent/50 border border-accent font-light text-white py-2 px-3">
            {auditLogData.decision_json.risk_level?.toUpperCase() ?? "-"}
          </span>
          <span className="w-fit text-xs rounded-[12px] bg-accent/50 border border-accent font-light text-white py-2 px-3">
            {auditLogData.execution_status?.toUpperCase() ?? "PENDING"}
          </span>
        </div>
      </div>
    </div>
  );
};
