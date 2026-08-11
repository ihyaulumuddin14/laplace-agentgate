"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { TbSend } from "react-icons/tb";
import { useShallow } from "zustand/react/shallow";
import FadeWrapperMotion from "@/shared/components/FadeWrapperMotion";
import { BrandWordmark } from "@/shared/components/ui/BrandWordmark";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Spinner } from "@/shared/components/ui/spinner";
import { cn } from "@/shared/lib/utils";
import { SCENARIOS } from "../../constants/scenario";
import { useApproveDecision } from "../../hooks/useApproveDecision";
import { useAskUserDecision } from "../../hooks/useAskUserDecision";
import { useTaskRunner } from "../../hooks/useTaskRunner";
import { useActionStore } from "../../stores/action-stores";
import { useChatStore } from "../../stores/chat-stores";
import { EmptyChatFallback } from "../misc/EmptyChatFallback";
import { EventList } from "../misc/EventList";
import { ScenarioRunnerOption } from "../misc/ScenarioRunnerOption";

const ChatSection = () => {
  const { chats, status } = useChatStore(
    useShallow((state) => ({
      chats: state.chats,
      status: state.status,
    })),
  );

  const { handleRunTask, isStreaming } = useTaskRunner();
  const { handleDecision, isApproveProcessing } = useApproveDecision();
  const { handleResponse, isAskProcessing } = useAskUserDecision();
  const { events } = useActionStore(
    useShallow((state) => ({ events: state.events })),
  );
  const [inputValue, setInputValue] = useState("");
  const [askInputValue, setAskInputValue] = useState("");

  const proposedAction = [...events]
    .reverse()
    .find((e) => e.type === "proposed_action");
  const actionId = proposedAction?.data?.action_id;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isStreaming) return;
    handleRunTask(inputValue, "NEED_APPROVAL");
    setInputValue("");
  };

  const onAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askInputValue.trim() || isAskProcessing || !actionId) return;
    handleResponse(actionId, askInputValue);
    setAskInputValue("");
  };

  return (
    <div className="w-full h-full relative flex flex-col">
      {/* HEADER */}
      <header className="w-full p-3 rounded-t-[20px] bg-surface-2/80 hidden lg:flex justify-center py-4 lg:py-6">
        <BrandWordmark logoSize={30} textClassName="text-sm sm:text-base" />
      </header>

      {/* BUBBLE CHAT CONTENT */}
      <main className="flex-1 relative flex flex-col p-0 lg:p-4 lg:pr-0 gap-4 overflow-y-auto mask-b-from-90% minimal-scrollbar">
        <AnimatePresence mode="popLayout">
          {chats.length === 0 ? (
            <EmptyChatFallback />
          ) : (
            <EventList chats={chats} />
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence mode="wait">
        {status === "waiting_approval" ? (
          <FadeWrapperMotion
            key="approval"
            className={cn(
              "relative w-full p-5 bg-surface-2 backdrop-blur-md rounded-t-[20px] flex flex-col gap-3",
              isApproveProcessing && "pointer-events-none opacity-70",
            )}
          >
            {isApproveProcessing && (
              <FadeWrapperMotion className="absolute inset-0 flex justify-center items-center bg-black/50">
                <Spinner strokeWidth={3} className="size-5" />
              </FadeWrapperMotion>
            )}

            <span className="text-sm font-bold">Approve this action?</span>
            <span className="text-xs">{chats[chats.length - 1].content}</span>

            <div className="w-full flex justify-end">
              <Button
                size={"xs"}
                variant={"secondary"}
                onClick={() => {
                  if (actionId) handleDecision(actionId, "rejected");
                }}
                disabled={isApproveProcessing || !actionId}
              >
                Cancel
              </Button>
              <Button
                size={"xs"}
                variant={"default"}
                onClick={() => {
                  if (actionId) handleDecision(actionId, "approved");
                }}
                disabled={isApproveProcessing || !actionId}
              >
                Approve
              </Button>
            </div>
          </FadeWrapperMotion>
        ) : status === "ask_user" ? (
          <FadeWrapperMotion
            key="ask-user"
            className={cn(
              "relative w-full p-5 bg-surface-2 backdrop-blur-md rounded-t-[20px] flex flex-col gap-3",
              isAskProcessing && "pointer-events-none opacity-70",
            )}
          >
            {isAskProcessing && (
              <FadeWrapperMotion className="absolute inset-0 flex justify-center items-center bg-black/50">
                <Spinner strokeWidth={3} className="size-5" />
              </FadeWrapperMotion>
            )}

            <span className="text-sm font-bold">Action Required</span>
            <span className="text-xs">{chats[chats.length - 1].content}</span>

            <form className="relative w-full mt-2" onSubmit={onAskSubmit}>
              <Input
                className="w-full pr-10"
                placeholder="Type your response..."
                value={askInputValue}
                onChange={(e) => setAskInputValue(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                disabled={isAskProcessing || !askInputValue.trim() || !actionId}
                className="absolute h-full aspect-square top-1/2 right-1 -translate-y-1/2 flex justify-center items-center cursor-pointer hover:scale-110 active:scale-100 transition-all ease-in-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <TbSend size={20} color="#efe6fc" />
              </button>
            </form>
          </FadeWrapperMotion>
        ) : (
          <FadeWrapperMotion
            key="scenario-runner"
            className="w-full h-fit bg-surface-2/80 border-t-5 border-purple-800 flex flex-col p-3 gap-5 rounded-b-[20px]"
          >
            <span className="text-sm">Scenario Runner</span>

            <div className="w-full overflow-x-auto pb-2 minimal-scrollbar">
              <ul className="flex gap-3 min-w-fit">
                {SCENARIOS.map((scenario) => (
                  <ScenarioRunnerOption key={scenario.title} {...scenario} />
                ))}
              </ul>
            </div>

            <form className="relative w-full" onSubmit={onSubmit}>
              <Input
                className="w-full pr-10"
                placeholder="Type a task..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                disabled={isStreaming || !inputValue.trim()}
                className="absolute h-full aspect-square top-1/2 right-1 -translate-y-1/2 flex justify-center items-center cursor-pointer hover:scale-110 active:scale-100 transition-all ease-in-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <TbSend size={20} color="#efe6fc" />
              </button>
            </form>
          </FadeWrapperMotion>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatSection;
