"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { TbSend } from "react-icons/tb";
import { useShallow } from "zustand/react/shallow";
import FadeWrapperMotion from "@/shared/components/FadeWrapperMotion";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/components/ui/resizable";
import { Spinner } from "@/shared/components/ui/spinner";
import { cn } from "@/shared/lib/utils";
import { SCENARIOS } from "../../constants/scenario";
import { useApproveDecision } from "../../hooks/useApproveDecision";
import { useAskUserDecision } from "../../hooks/useAskUserDecision";
import { useTaskRunner } from "../../hooks/useTaskRunner";
import { useChatStore } from "../../stores/chat-stores";
import { useStateStore } from "../../stores/state-stores";
import { ChatList } from "../misc/ChatList";
import { EmptyChatFallback } from "../misc/EmptyChatFallback";
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
  const { states } = useStateStore(
    useShallow((state) => ({ states: state.states })),
  );
  const [inputValue, setInputValue] = useState("");
  const [askInputValue, setAskInputValue] = useState("");

  const proposedAction = [...states]
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
    <div className="w-full h-full relative flex flex-col rounded-[20px] overflow-hidden">
      <ResizablePanelGroup orientation="vertical" className=" h-full">
        <ResizablePanel defaultSize={"60%"} minSize={200}>
          <div className="w-full h-full flex flex-col justify-start items-start p-3 pt-5 gap-3">
            <span className="text-sm">Scenario Runner</span>

            <div className="w-full overflow-y-auto pb-2 minimal-scrollbar max-lg:mask-y-from-90%">
              <ul className="flex flex-col gap-3 w-full p-3 pl-0">
                {SCENARIOS.map((scenario) => (
                  <ScenarioRunnerOption key={scenario.title} {...scenario} />
                ))}
              </ul>
            </div>
          </div>
        </ResizablePanel>
        <ResizablePanel defaultSize={"40%"} minSize={200}>
          <div className="flex flex-col w-full h-full relative bg-surface-2/80 border-t-5 border-purple-800">
            {/* BUBBLE CHAT CONTENT */}
            <main className="flex-1 relative flex flex-col p-4 gap-4 overflow-y-auto mask-b-from-80% minimal-scrollbar">
              <AnimatePresence mode="popLayout">
                {chats.length === 0 ? (
                  <EmptyChatFallback />
                ) : (
                  <ChatList chats={chats} />
                )}
              </AnimatePresence>
            </main>

            <AnimatePresence mode="wait">
              {status === "waiting_approval" ? (
                <FadeWrapperMotion
                  key="approval"
                  className={cn(
                    "relative w-full p-5 bg-surface-2 backdrop-blur-md rounded-t-[20px] flex flex-col gap-3 border-5 border-dotted",
                    isApproveProcessing && "pointer-events-none opacity-70",
                  )}
                >
                  {isApproveProcessing && (
                    <FadeWrapperMotion className="absolute inset-0 flex justify-center items-center bg-black/50">
                      <Spinner strokeWidth={3} className="size-5" />
                    </FadeWrapperMotion>
                  )}

                  <span className="text-sm font-bold">
                    Approve this action?
                  </span>
                  <span className="text-xs">
                    {chats[chats.length - 1].content}
                  </span>

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
                    "relative w-full p-5 bg-surface backdrop-blur-md rounded-t-[20px] flex flex-col gap-3 border-5 border-dotted",
                    isAskProcessing && "pointer-events-none opacity-70",
                  )}
                >
                  {isAskProcessing && (
                    <FadeWrapperMotion className="absolute inset-0 flex justify-center items-center bg-black/50">
                      <Spinner strokeWidth={3} className="size-5" />
                    </FadeWrapperMotion>
                  )}

                  <span className="text-sm font-bold">Action Required</span>
                  <span className="text-xs">
                    {chats[chats.length - 1].content}
                  </span>

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
                      disabled={
                        isAskProcessing || !askInputValue.trim() || !actionId
                      }
                      className="absolute h-full aspect-square top-1/2 right-1 -translate-y-1/2 flex justify-center items-center cursor-pointer hover:scale-110 active:scale-100 transition-all ease-in-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <TbSend size={20} color="#efe6fc" />
                    </button>
                  </form>
                </FadeWrapperMotion>
              ) : (
                <FadeWrapperMotion
                  key="scenario-runner"
                  className="w-full h-fit flex flex-col p-3 gap-5 rounded-b-[20px]"
                >
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
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ChatSection;
