"use client";

import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { TbSend } from "react-icons/tb";
import { useShallow } from "zustand/react/shallow";
import logo from "@/assets/logo.png";
import FadeWrapperMotion from "@/shared/components/FadeWrapperMotion";
import { BrandWordmark } from "@/shared/components/ui/BrandWordmark";
import { Bubble, BubbleContent } from "@/shared/components/ui/bubble";
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
import type { ChatMessage, ScenarioRunnerOptionType } from "../../types";

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

const ScenarioRunnerOption = ({
  title,
  description,
  Icon,
  accent,
  variants,
}: ScenarioRunnerOptionType) => {
  const { handleRunTask, isStreaming } = useTaskRunner();

  async function handleClick() {
    const taskText = variants[0]?.taskText || "list calendar events";
    const expectedDecision = variants[0]?.expectedDecision || "NEED_APPROVAL";
    handleRunTask(taskText, expectedDecision);
  }

  return (
    <li
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          if (isStreaming) return;
          e.preventDefault();
          handleClick();
        }
      }}
      style={{ "--accent": accent } as CSSProperties}
      className={cn(
        "flex items-center gap-2 w-50 border border-white/40 bg-white/5 backdrop-blur-xl p-3 rounded-lg cursor-pointer hover:bg-white/20 active:scale-95 transition-all ease-in-out",
        isStreaming && "pointer-events-none opacity-50",
      )}
    >
      <div className="relative grid size-8 aspect-square place-items-center rounded-md border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-accent transition-transform duration-300 group-hover:scale-110">
        <Icon size={16} />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-xs font-semibold line-clamp-1">{title}</h2>
        <p className="text-[10px] line-clamp-1">{description}</p>
      </div>
    </li>
  );
};

const EmptyChatFallback = () => {
  return (
    <FadeWrapperMotion
      key="empty"
      className="absolute inset-0 flex flex-col gap-4 justify-center items-center"
    >
      <Image
        src={logo}
        alt="AgentGate logo"
        width={30}
        height={30}
        priority
        className="shrink-0"
        style={{ width: "30px", height: "auto" }}
      />
      <span className="text-xs text-purple-50 font-semibold">
        Pick a scenario above or type a task
      </span>
    </FadeWrapperMotion>
  );
};

const EventList = ({ chats }: { chats: ChatMessage[] }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { isStreaming, currentActiveMessageId } = useChatStore(
    useShallow((state) => ({
      isStreaming: state.isStreaming,
      currentActiveMessageId: state.currentActiveMessageId,
    })),
  );

  useEffect(() => {
    if (chats.length === 0) return;

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chats]);

  return (
    <FadeWrapperMotion
      key="event-list"
      className="w-full h-fit overflow-y-auto flex flex-col gap-3 lg:pr-3"
    >
      {chats.map((chat) => {
        const isUser = chat.role === "user";

        return (
          <Bubble
            variant={chat.status === "error" ? "destructive" : "secondary"}
            key={chat.id}
            align={isUser || chat.status === "error" ? "end" : "start"}
          >
            <BubbleContent>
              {chat.status === "error" ? (
                <span className="text-sm text-red-400">{chat.content}</span>
              ) : isUser ? (
                <span className="text-sm font-medium text-white">
                  {chat.content}
                </span>
              ) : chat.isStreaming &&
                isStreaming &&
                currentActiveMessageId === chat.id ? (
                <div className="flex items-start gap-2">
                  <span className="relative flex h-2.5 w-2.5 mt-1">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-500" />
                  </span>
                  <span className="text-sm font-medium capitalize text-purple-200">
                    {chat.content}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                      Action Result
                    </span>

                    {chat.data?.decision && (
                      <span
                        className={cn(
                          "rounded-full border px-2 py-0.5 text-xs font-bold",
                          chat.data.decision === "ALLOW"
                            ? "border-green-500/20 bg-green-500/10 text-green-400"
                            : chat.data.decision === "BLOCK"
                              ? "border-red-500/20 bg-red-500/10 text-red-400"
                              : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
                        )}
                      >
                        {chat.data.decision}
                      </span>
                    )}
                  </div>

                  {chat.data?.reasons?.length ? (
                    <p className="mt-0.5 text-xs italic text-white/70">
                      "{chat.data.reasons[0]}"
                    </p>
                  ) : (
                    <span className="text-sm text-white/80">
                      {chat.content}
                    </span>
                  )}
                </div>
              )}
            </BubbleContent>
          </Bubble>
        );
      })}
      <div ref={bottomRef} />
    </FadeWrapperMotion>
  );
};
