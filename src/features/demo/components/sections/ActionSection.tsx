"use client";

import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { IoEyeOutline, IoWarningOutline } from "react-icons/io5";
import { MdOutlineCheckCircle, MdOutlineShield } from "react-icons/md";
import { Progress } from "@/shared/components/ui/progress";
import { Spinner } from "@/shared/components/ui/spinner";
import ActionCard from "../misc/ActionCard";
import DecisionLabel from "../misc/DecisionLabel";

const ActionSection = () => {
  return (
    <div className="w-full h-full relative flex flex-col">
      <main className="flex-1 h-full relative flex flex-col p-0 lg:p-4 pr-2 gap-4 overflow-y-auto mask-b-from-90% minimal-scrollbar">
        <AnimatePresence mode="popLayout">
          <ActionList />
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ActionSection;

const ActionList = () => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ul className="flex flex-col gap-4">
      {/* PLANNING */}
      <ActionCard className="text-white">
        <h2 className="flex gap-3 text-lg font-semibold text-purple-100 items-center">
          <Spinner strokeWidth={3} className="size-5" />
          Planning Next Action
        </h2>
        <p className="text-sm">
          LLM planner is processing your goal and preparing a proposed tool
          action through the custom function calling loop...
        </p>
        <Progress value={progress} className="w-full" />
      </ActionCard>

      {/* PROPOSED ACTION */}
      <ActionCard className="text-white">
        <h2 className="flex gap-5 text-lg font-semibold text-blue items-center">
          <IoEyeOutline className="size-6" />
          Proposed Action
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_1fr] gap-2">
          <div>
            <h3 className="text-md font-normal">Tool Name</h3>
            <p className="text-sm font-light">google_calendar.list_events</p>
          </div>

          <div>
            <h3 className="text-md font-normal">Target System</h3>
            <p className="text-sm font-light">Google Calendar API</p>
          </div>

          <div>
            <h3 className="text-md font-normal">Target</h3>
            <p className="text-sm font-light">
              user_calendar, date: today (read-only)
            </p>
          </div>

          <div>
            <h3 className="text-md font-normal">Domain</h3>
            <p className="text-sm font-light">productivity</p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <h3>Payload Summary</h3>
          <div className="rounded-[12px] bg-[#EFE6FC]/50 text-sm font-light text-white py-3 px-4">
            List events for current user on today's date. No write or delete
            operation.
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <h3>Risk Hints</h3>
          <div className="w-fit rounded-[12px] bg-blue/50 text-sm border border-blue font-light text-white p-2">
            read_only
          </div>
        </div>
      </ActionCard>

      {/* EVALUATING */}
      <ActionCard className="text-white">
        <h2 className="flex gap-3 text-lg font-semibold text-green items-center">
          <Spinner strokeWidth={3} className="size-5" />
          Evaluating with AgentGate
        </h2>
        <p className="text-sm">
          Running detectors, policy engine, risk scoring, and decision engine.
          No action has been executed yet.
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

      {/* ALLOW DECISION */}
      <ActionCard accent="#4dff0c" className="text-white">
        <h2 className="flex gap-3 text-lg font-semibold items-center text-accent">
          <MdOutlineShield className="size-6" />
          AgentGate Decision
          <DecisionLabel className="ml-auto" label="allow" />
        </h2>

        <div className="grid grid-cols-3 gap-2">
          <div className="border border-accent rounded-md p-3 flex flex-col items-center gap-1">
            <h3 className="text-xs font-light line-clamp-1 text-[#B9B9B9]">
              Risk Level
            </h3>
            <p className="text-accent text-sm line-clamp-1 font-light uppercase">
              Low
            </p>
          </div>
          <div className="border border-accent rounded-md p-3 flex flex-col items-center gap-1">
            <h3 className="text-xs font-light line-clamp-1 text-[#B9B9B9]">
              Risk Score
            </h3>
            <p className="text-accent text-sm line-clamp-1 font-light">8%</p>
          </div>
          <div className="border border-accent rounded-md p-3 flex flex-col items-center gap-1">
            <h3 className="text-xs font-light line-clamp-1 text-[#B9B9B9]">
              Audit ID
            </h3>
            <p className="text-accent text-sm line-clamp-1 font-light">
              25_a1b2c
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <h3 className="text-base font-semibold text-white">Reasons</h3>

          <ul className="w-full flex flex-col gap-3">
            <li className="flex gap-3 items-center">
              <IoWarningOutline className="size-5 shrink-0 text-accent" />
              <p className="text-sm font-extralight">
                Read only calendar access, no write or external send
              </p>
            </li>
            <li className="flex gap-3 items-center">
              <IoWarningOutline className="size-5 shrink-0 text-accent" />
              <p className="text-sm font-extralight">
                Target is the user's own calendar
              </p>
            </li>
            <li className="flex gap-3 items-center">
              <IoWarningOutline className="size-5 shrink-0 text-accent" />
              <p className="text-sm font-extralight">
                No sensitive payload or PII in proposed action
              </p>
            </li>
          </ul>

          <div className="w-full border border-accent rounded-md bg-accent/30 px-4 py-3 text-white flex flex-col gap-2">
            <h3 className="font-semibold text-sm">Next Step</h3>
            <p className="text-xs font-extralight">
              Action blocked. No file will be read. Contact admin for safe
              access patterns.
            </p>
          </div>
        </div>
      </ActionCard>

      {/* BLOCK DECISION */}

      {/* NEED APPROVAL DECISION */}

      {/* SANITIZE DECISION */}

      {/* ASK USER DECISION */}
    </ul>
  );
};
