import type { CSSProperties } from "react";
import { DECISION_RESPONSE_DUMMY } from "../../constants/scenario";
import type { DecisionResponseSchema } from "../../schema/chat-schema";
import { DECISION_VARIANTS } from "../sections/StateSection";
import DecisionLabel from "./DecisionLabel";

const AuditLogs = () => {
  return (
    <article className="w-full p-3 flex flex-col gap-2 h-full overflow-y-auto py-7 max-lg:mask-y-from-90%">
      <AuditLogItem decisionPayload={DECISION_RESPONSE_DUMMY} />
      <AuditLogItem decisionPayload={DECISION_RESPONSE_DUMMY} />
      <AuditLogItem decisionPayload={DECISION_RESPONSE_DUMMY} />
      <AuditLogItem decisionPayload={DECISION_RESPONSE_DUMMY} />
    </article>
  );
};

export default AuditLogs;

const AuditLogItem = ({
  decisionPayload,
}: {
  decisionPayload: DecisionResponseSchema;
}) => {
  const variant =
    DECISION_VARIANTS[decisionPayload.decision] || DECISION_VARIANTS.ALLOW;

  return (
    <div className="w-full p-4 rounded-2xl flex gap-2 border border-white/50 bg-white/10">
      {/* INFORMATION TEXT */}
      <div className="flex flex-[1.4] min-w-0! flex-col gap-2">
        <span className="text-gray text-xs">20:38:51</span>
        <h2 className="text-white font-semibold text-sm">gmail_delete</h2>
        <h3 className="text-white text-sm">GMAIL API</h3>
        <p className="text-gray text-sm truncate">
          audit_clarified_1783777131605
        </p>
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
            LOW
          </span>
          <span className="w-fit text-xs rounded-[12px] bg-accent/50 border border-accent font-light text-white py-2 px-3">
            EXECUTED
          </span>
        </div>
      </div>
    </div>
  );
};
