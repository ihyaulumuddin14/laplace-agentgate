"use client";

import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import FadeWrapperMotion from "@/shared/components/FadeWrapperMotion";
import { Bubble, BubbleContent } from "@/shared/components/ui/bubble";
import { cn } from "@/shared/lib/utils";
import { useChatStore } from "../../stores/chat-stores";
import type { ChatMessage } from "../../types";

export const EventList = ({ chats }: { chats: ChatMessage[] }) => {
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
