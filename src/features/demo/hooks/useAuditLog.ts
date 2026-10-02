import { useQuery } from "@tanstack/react-query";
import { useAgentGateSessionContext } from "@/shared/components/layout/AgentGateSessionProvider";
import { getAuditLogs } from "../services/log-services";
import type { AuditLog } from "../types";

function percentile(values: number[], percentile: number) {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);

  const index = (percentile / 100) * (sorted.length - 1);

  const lower = Math.floor(index);
  const upper = Math.ceil(index);

  if (lower === upper) {
    return sorted[lower];
  }

  const weight = index - lower;

  return sorted[lower] + (sorted[upper] - sorted[lower]) * weight;
}

export const useAuditLog = () => {
  const { sessionId } = useAgentGateSessionContext();
  const query = useQuery({
    queryFn: async () => {
      if (!sessionId) return [];
      return (await getAuditLogs(sessionId)) as AuditLog[];
    },
    refetchOnWindowFocus: false,
    queryKey: ["audit-log", sessionId],
    enabled: !!sessionId,
  });

  const audits = query.data ?? [];

  const totalActions = audits.length;
  const totalApprove = audits.filter(
    (audit) => audit.decision_json.decision === "ALLOW",
  ).length;
  const totalBlocked = audits.filter(
    (audit) => audit.decision_json.decision === "BLOCK",
  ).length;
  const totalNeedApproval = audits.filter(
    (audit) => audit.decision_json.decision === "NEED_APPROVAL",
  ).length;
  const totalSanitize = audits.filter(
    (audit) => audit.decision_json.decision === "SANITIZE",
  ).length;
  const totalAskUser = audits.filter(
    (audit) => audit.decision_json.decision === "ASK_USER",
  ).length;

  const guardrailLatencies = audits
    .map((audit) => audit.latency?.guardrail_ms)
    .filter((value): value is number => value != null);

  const totalLatencies = audits
    .map((audit) => audit.latency?.total_ms)
    .filter((value): value is number => value != null);

  const p50Total = percentile(totalLatencies, 50);
  const p95Total = percentile(totalLatencies, 95);

  const p50Guardrail = percentile(guardrailLatencies, 50);
  const p95Guardrail = percentile(guardrailLatencies, 95);

  return {
    ...query,
    totalApprove,
    totalBlocked,
    totalNeedApproval,
    totalSanitize,
    totalAskUser,
    audits,
    totalActions,
    p50Guardrail,
    p95Guardrail,
    p50Total,
    p95Total,
  };
};
