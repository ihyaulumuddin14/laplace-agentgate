"use client";

import { useEffect, useRef, useState } from "react";
import { IoEyeOutline, IoWarningOutline } from "react-icons/io5";
import { MdOutlineCheckCircle, MdOutlineShield } from "react-icons/md";
import FadeWrapperMotion from "@/shared/components/FadeWrapperMotion";
import { Progress } from "@/shared/components/ui/progress";
import { Spinner } from "@/shared/components/ui/spinner";
import type {
  ActionRequestSchema,
  DecisionResponseSchema,
} from "../../schema/chat-schema";
import { useChatStore } from "../../stores/chat-stores";
import { useStateStore } from "../../stores/state-stores";
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
  const states = useStateStore((state) => state.states);
  const status = useChatStore((state) => state.status);
  const [planningDone, setPlanningDone] = useState<boolean>(false);

  useEffect(() => {
    if (status === "proposed_action") {
      setPlanningDone(true);
    }
  }, [status]);

  useEffect(() => {
    if (states.length === 0) return;

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [states.length]);

  return (
    <>
      <ul className="flex flex-col gap-4">
        {status === "planning" ? (
          <StatePlanningAction isComplete={planningDone} />
        ) : (
          states.map((state) => {
            if (state.type === "proposed_action") {
              return (
                <FadeWrapperMotion key={state.type}>
                  <StateProposedAction proposedActionPayload={state.data} />
                </FadeWrapperMotion>
              );
            } else if (state.type === "evaluating") {
              return (
                <FadeWrapperMotion key={state.type}>
                  <StateEvaluatingAction />
                </FadeWrapperMotion>
              );
            } else if (state.type === "decision") {
              return (
                <FadeWrapperMotion key={state.type}>
                  <StateActionDecision decisionPayload={state.data} />
                </FadeWrapperMotion>
              );
            } else {
              return null;
            }
          })
        )}
      </ul>
      <div ref={bottomRef} />
    </>
  );
};

const DECISION_VARIANTS = {
  ALLOW: {
    accent: "#4dff0c",
    label: "allow" as const,
  },
  BLOCK: {
    accent: "#EF4444",
    label: "block" as const,
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
};

const StatePlanningAction = ({ isComplete }: { isComplete: boolean }) => {
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
        Planning Next Action
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
        <li className="flex gap-2 items-center">
          <MdOutlineCheckCircle className="text-green size-6" />
          <p className="text-sm font-extralight">Sensitive Data </p>
        </li>
        <li className="flex gap-2 items-center">
          <MdOutlineCheckCircle className="size-6" />
          <p className="text-sm font-extralight">Policy engine</p>
        </li>
        <li className="flex gap-2 items-center">
          <MdOutlineCheckCircle className="size-6" />
          <p className="text-sm font-extralight">Policy engine</p>
        </li>
        <li className="flex gap-2 items-center">
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
  proposedActionPayload: ActionRequestSchema;
}) => {
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
            {proposedActionPayload.action_type}
          </p>
        </div>

        <div>
          <h3 className="text-md font-normal">Target System</h3>
          <p className="text-sm font-light">
            {proposedActionPayload.target_system}
          </p>
        </div>

        <div>
          <h3 className="text-md font-normal">Target</h3>
          <p className="text-sm font-light">
            {proposedActionPayload.target_system}
            {", "}
            {proposedActionPayload.target}
          </p>
        </div>

        <div>
          <h3 className="text-md font-normal">Domain</h3>
          <p className="text-sm font-light">{proposedActionPayload.domain}</p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <h3>Payload Summary</h3>
        <div className="rounded-[12px] bg-[#EFE6FC]/50 text-sm font-light text-white py-3 px-4">
          {proposedActionPayload.payload_summary}
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <h3>Risk Hints</h3>
        <div className="w-fit rounded-[12px] bg-blue/50 text-sm border border-blue font-light text-white p-2">
          {proposedActionPayload.risk_hint}
        </div>
      </div>
    </ActionCard>
  );
};

const StateActionDecision = ({
  decisionPayload,
}: {
  decisionPayload: DecisionResponseSchema;
}) => {
  const variant =
    DECISION_VARIANTS[decisionPayload.decision] || DECISION_VARIANTS.ALLOW;

  return (
    <ActionCard accent={variant.accent} className="text-white">
      <h2 className="flex gap-3 text-lg font-semibold items-center text-accent">
        <MdOutlineShield className="size-6" />
        AgentGate Decision
        <DecisionLabel className="ml-auto" label={variant.label} />
      </h2>

      <div className="grid grid-cols-3 gap-2">
        <div className="border border-accent rounded-md p-3 flex flex-col items-center gap-1">
          <h3 className="text-xs font-light line-clamp-1 text-[#B9B9B9]">
            Risk Level
          </h3>
          <p className="text-accent text-sm line-clamp-1 font-semibold uppercase">
            {decisionPayload.risk_level}
          </p>
        </div>
        <div className="border border-accent rounded-md p-3 flex flex-col items-center gap-1">
          <h3 className="text-xs font-light line-clamp-1 text-[#B9B9B9]">
            Risk Score
          </h3>
          <p className="text-accent text-sm line-clamp-1 font-semibold">
            {decisionPayload.risk_score}%
          </p>
        </div>
        <div className="border border-accent rounded-md p-3 flex flex-col items-center gap-1">
          <h3 className="text-xs font-light line-clamp-1 text-[#B9B9B9]">
            Audit ID
          </h3>
          <p className="text-accent text-sm line-clamp-1 font-semibold">
            {decisionPayload.action_id.slice(0, 8)}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-base font-semibold text-white">Reasons</h3>

          <ul className="w-full flex flex-col gap-2">
            {decisionPayload.reasons.map((reason) => (
              <li key={reason} className="flex gap-3 items-center">
                <IoWarningOutline className="size-5 shrink-0 text-accent" />
                <p className="text-sm font-extralight">{reason}</p>
              </li>
            ))}
          </ul>
        </div>

        {decisionPayload.decision !== "ALLOW" && (
          <>
            <div className="w-full flex flex-col gap-2">
              <h3 className="text-base font-semibold text-white">
                Triggered Policies
              </h3>

              <ul className="w-full flex flex-wrap gap-3">
                {decisionPayload.triggered_policies.length > 0 ? (
                  decisionPayload.triggered_policies.map((triggered_policy) => (
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
                {decisionPayload.sensitive_entities.length > 0 ? (
                  decisionPayload.sensitive_entities.map((sensitive_entity) => (
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
          <h3 className="font-semibold text-sm">Next Step</h3>
          <p className="text-xs font-extralight">{decisionPayload.next_step}</p>
        </div>
      </div>
    </ActionCard>
  );
};
