"use client";

import { useEffect, useRef, useState } from "react";
import { IoEyeOutline, IoWarningOutline } from "react-icons/io5";
import { MdOutlineCheckCircle, MdOutlineShield } from "react-icons/md";
import FadeWrapperMotion from "@/shared/components/FadeWrapperMotion";
import { Progress } from "@/shared/components/ui/progress";
import { Spinner } from "@/shared/components/ui/spinner";
import type { DecisionResponseSchema } from "../../schema/chat-schema";
import { useChatStore } from "../../stores/chat-stores";
import { useEventStore } from "../../stores/event-stores";
import type { PlanEventPayload, StreamEvent, StreamMessage } from "../../types";
import ActionCard from "../misc/ActionCard";
import DecisionLabel from "../misc/DecisionLabel";

const StateSection = () => {
  return (
    <div className="w-full h-full relative flex flex-col overflow-hidden rounded-[20px]">
      <main className="flex-1 h-full relative flex flex-col p-4 gap-4 overflow-y-auto max-lg:mask-y-from-90% minimal-scrollbar">
        <ActionList />
      </main>
    </div>
  );
};

export default StateSection;

const ActionList = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const events = useEventStore((state) => state.events);
  const status = useChatStore((state) => state.status);
  const [planningDone, setPlanningDone] = useState<boolean>(false);

  useEffect(() => {
    if (status === "plan") {
      setPlanningDone(true);
    }
  }, [status]);

  useEffect(() => {
    if (events.length === 0) return;

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [events.length]);

  return (
    <>
      <ul className="flex flex-col gap-4">
        {events.map((event, index) => {
          if (event.type === "planning" || event.type === "replanning") {
            return (
              <FadeWrapperMotion key={event.type}>
                <StatePlanningAction
                  isComplete={planningDone}
                  eventType={event.type}
                />
              </FadeWrapperMotion>
            );
          } else if (event.type === "plan") {
            return (
              <FadeWrapperMotion key="plan">
                <StateProposedAction proposedActionPayload={event.data} />
              </FadeWrapperMotion>
            );
          } else if (
            event.type === "step_status" &&
            event.data.data.status === "running"
          ) {
            return (
              <FadeWrapperMotion key={`evaluating-${event.data.data.index}`}>
                <StateEvaluatingAction />
              </FadeWrapperMotion>
            );
          } else if (event.type === "guardrail" || event.type === "done") {
            return (
              <FadeWrapperMotion
                key={
                  event.type === "guardrail"
                    ? `guardrail-${event.data.data.index}-${event.data.data.step?.action_id ?? index}`
                    : "done"
                }
              >
                <StateActionDecision event={event} />
              </FadeWrapperMotion>
            );
          } else {
            return null;
          }
        })}
      </ul>
      <div ref={bottomRef} />
    </>
  );
};

export const DECISION_VARIANTS = {
  ALLOW: {
    accent: "#4dff0c",
    label: "allow" as const,
  },
  BLOCK: {
    accent: "#EF4444",
    label: "block" as const,
  },
  FAILED: {
    accent: "#EF4444",
    label: "failed" as const,
  },
  SANITIZE: {
    accent: "#FF9900",
    label: "sanitize" as const,
  },
  NEED_APPROVAL: {
    accent: "#ebd234",
    label: "need_approval" as const,
  },
  ASK_USER: {
    accent: "#00D4FF",
    label: "ask_user" as const,
  },
  DECLINED: {
    accent: "#EF4444",
    label: "declined" as const,
  },
};

const StatePlanningAction = ({
  isComplete,
  eventType,
}: {
  isComplete: boolean;
  eventType: "planning" | "replanning";
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isComplete) {
      setProgress(100);
      return;
    }
    const timer = setInterval(() => setProgress((prev) => prev + 20), 150);
    return () => {
      clearInterval(timer);
    };
  }, [isComplete]);

  return (
    <ActionCard className="text-white">
      <h2 className="flex gap-3 text-lg font-semibold text-purple-100 items-center">
        <Spinner strokeWidth={3} className="size-5" />
        {eventType === "planning" ? "Planning Next Action" : "Replanning"}
      </h2>
      <p className="text-sm">
        LLM planner is processing your goal and preparing a proposed tool action
        through the custom function calling loop...
      </p>
      <Progress value={progress} className="w-full" />
    </ActionCard>
  );
};

const StateEvaluatingAction = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setProgress((prev) => (prev >= 80 ? prev : prev + 20)),
      2000,
    );
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <ActionCard className="text-white">
      <h2 className="flex gap-3 text-lg font-semibold text-green items-center">
        <Spinner strokeWidth={3} className="size-5" />
        Evaluating with AgentGate
      </h2>
      <p className="text-sm">
        Running detectors, policy engine, risk scoring, and decision engine. No
        action has been executed yet.
      </p>
      <ul className="w-full flex flex-col gap-3">
        <li
          className={`${progress > 20 ? "text-green" : ""} flex gap-2 items-center`}
        >
          <MdOutlineCheckCircle className="size-6" />
          <p className="text-sm font-extralight">Sensitive Data </p>
        </li>
        <li
          className={`${progress > 40 ? "text-green" : ""} flex gap-2 items-center`}
        >
          <MdOutlineCheckCircle className="size-6" />
          <p className="text-sm font-extralight">Policy engine</p>
        </li>
        <li
          className={`${progress > 60 ? "text-green" : ""} flex gap-2 items-center`}
        >
          <MdOutlineCheckCircle className="size-6" />
          <p className="text-sm font-extralight">Policy engine</p>
        </li>
        <li
          className={`${progress === 100 ? "text-green" : ""} flex gap-2 items-center`}
        >
          <MdOutlineCheckCircle className="size-6" />
          <p className="text-sm font-extralight">Decision engine</p>
        </li>
      </ul>
    </ActionCard>
  );
};

const StateProposedAction = ({
  proposedActionPayload,
}: {
  proposedActionPayload: StreamMessage<PlanEventPayload>;
}) => {
  const currentStepIndex = useChatStore((state) => state.currentStepIndex);

  return (
    <ActionCard className="text-white">
      <h2 className="flex gap-5 text-lg font-semibold text-blue items-center">
        <IoEyeOutline className="size-6" />
        Proposed Action
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_1fr] gap-2">
        <div>
          <h3 className="text-md font-normal">Tool Name</h3>
          <p className="text-sm font-light">
            {
              proposedActionPayload.data.plan[currentStepIndex || 0]
                ?.action_type
            }
          </p>
        </div>

        <div>
          <h3 className="text-md font-normal">Target System</h3>
          <p className="text-sm font-light">
            {
              proposedActionPayload.data.plan[currentStepIndex || 0]
                ?.target_system
            }
          </p>
        </div>

        <div>
          <h3 className="text-md font-normal">Target</h3>
          <p className="text-sm font-light">
            {proposedActionPayload.data.plan[currentStepIndex || 0]?.target}
          </p>
        </div>

        <div>
          <h3 className="text-md font-normal">Domain</h3>
          <p className="text-sm font-light">
            {proposedActionPayload.data.plan[currentStepIndex || 0]?.domain}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <h3>Payload Summary</h3>
        <div className="rounded-[12px] bg-[#EFE6FC]/50 text-sm font-light text-white py-3 px-4 whitespace-pre-line">
          {proposedActionPayload.data.summary.startsWith("\n")
            ? proposedActionPayload.data.summary.replace("\n", "")
            : "-"}
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <h3>Risk Hints</h3>
        <div className="w-fit rounded-[12px] bg-blue/50 text-sm border border-blue font-light text-white p-2">
          {proposedActionPayload.data.plan[currentStepIndex || 0]?.risk_hint}
        </div>
      </div>
    </ActionCard>
  );
};

const StateActionDecision = ({
  event,
}: {
  event: Extract<StreamEvent, { type: "guardrail" | "done" }>;
}) => {
  const isDone = event.type === "done";
  const doneData = isDone ? event.data.data : null;
  const isDeclined =
    doneData?.status === "declined" ||
    doneData?.steps?.some(
      (s) =>
        s.status === "declined" || s.decision?.approval_decision === "declined",
    );

  const decisionData: DecisionResponseSchema | undefined =
    event.type === "guardrail"
      ? event.data.data.step.decision
      : event.data.data.steps.at(-1)?.decision;

  const decisionType = isDeclined
    ? "DECLINED"
    : event.type === "done"
      ? (doneData?.status === "failed" && "FAILED") ||
        (doneData?.status === "blocked" && "BLOCK")
      : (decisionData?.decision ?? "ALLOW");

  const variant =
    DECISION_VARIANTS[decisionType as keyof typeof DECISION_VARIANTS] ||
    DECISION_VARIANTS.ALLOW;

  const formattedRiskScore =
    decisionData?.risk_score != null
      ? decisionData.risk_score <= 1
        ? `${Math.round(decisionData.risk_score * 100)}%`
        : `${decisionData.risk_score}%`
      : "-";

  const riskLevel = decisionData?.risk_level || "-";

  return (
    <ActionCard accent={variant.accent} className="text-white">
      <h2 className="flex gap-3 text-lg font-semibold items-center text-accent line-clamp-1">
        <MdOutlineShield className="size-6 shrink-0" />
        AgentGate Decision{" "}
        {event.type === "guardrail" && `Step #${event.data.data.index}`}
        <DecisionLabel className="ml-auto" label={variant.label} />
      </h2>

      <div className="grid grid-cols-3 gap-2">
        <div className="border border-accent rounded-md p-3 flex flex-col items-center gap-1">
          <h3 className="text-xs font-light line-clamp-1 text-[#B9B9B9]">
            Risk Level
          </h3>
          <p className="text-accent text-sm line-clamp-1 font-semibold uppercase">
            {riskLevel}
          </p>
        </div>
        <div className="border border-accent rounded-md p-3 flex flex-col items-center gap-1">
          <h3 className="text-xs font-light line-clamp-1 text-[#B9B9B9]">
            Risk Score
          </h3>
          <p className="text-accent text-sm line-clamp-1 font-semibold">
            {formattedRiskScore}
          </p>
        </div>
        <div className="border border-accent rounded-md p-3 flex flex-col items-center gap-1">
          <h3 className="text-xs font-light line-clamp-1 text-[#B9B9B9]">
            Audit ID
          </h3>
          <p className="text-accent text-sm line-clamp-1 font-semibold">
            {decisionData?.action_id ? decisionData.action_id.slice(0, 8) : "-"}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-base font-semibold text-white">Reasons</h3>

          <ul className="w-full flex flex-col gap-2">
            {decisionData?.reasons && decisionData.reasons.length > 0 ? (
              decisionData?.reasons?.map((reason) => (
                <li key={reason} className="flex gap-3 items-center">
                  <IoWarningOutline className="size-5 shrink-0 text-accent" />
                  <p className="text-sm font-extralight">{reason}</p>
                </li>
              ))
            ) : (
              <p className="text-sm font-extralight text-[#B9B9B9]">
                No reasons
              </p>
            )}
          </ul>
        </div>

        {decisionData?.decision !== "ALLOW" && (
          <>
            <div className="w-full flex flex-col gap-2">
              <h3 className="text-base font-semibold text-white">
                Triggered Policies
              </h3>

              <ul className="w-full flex flex-wrap gap-3">
                {(decisionData?.triggered_policies?.length ?? 0) > 0 ? (
                  decisionData?.triggered_policies.map((triggered_policy) => (
                    <li
                      key={triggered_policy}
                      className="w-fit rounded-[12px] bg-blue/50 text-sm border border-blue font-light text-white p-2"
                    >
                      {triggered_policy}
                    </li>
                  ))
                ) : (
                  <p className="text-sm font-extralight text-[#B9B9B9]">
                    No triggered policies
                  </p>
                )}
              </ul>
            </div>

            <div className="w-full flex flex-col gap-2">
              <h3 className="text-base font-semibold text-white">
                Sensitive Entities Detected
              </h3>

              <ul className="w-full flex flex-wrap gap-3">
                {(decisionData?.sensitive_entities?.length ?? 0) > 0 ? (
                  decisionData?.sensitive_entities.map((sensitive_entity) => (
                    <li
                      key={sensitive_entity}
                      className="w-fit rounded-[12px] bg-red/50 text-sm border border-red font-light text-white p-2"
                    >
                      {sensitive_entity}
                    </li>
                  ))
                ) : (
                  <p className="text-sm font-extralight text-[#B9B9B9]">
                    No sensitive entities detected
                  </p>
                )}
              </ul>
            </div>
          </>
        )}

        <div className="w-full border border-accent rounded-md bg-accent/30 px-4 py-3 text-white flex flex-col gap-2">
          <h3 className="font-semibold text-sm">
            {event.type === "done" ? "Result Summary" : "Next Step"}
          </h3>
          <p className="text-xs font-extralight">
            {event.type === "done"
              ? isDeclined
                ? "Action was declined — execution stopped."
                : event.data.data.status === "failed"
                  ? "Action failed — execution stopped."
                  : (event.data.data.steps.at(-1)?.execution?.result_summary ??
                    "-")
              : decisionData?.next_step}
          </p>
        </div>
      </div>
    </ActionCard>
  );
};
