"use client";

import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { type CSSProperties, useEffect, useRef } from "react";
import { TbSend } from "react-icons/tb";
import logo from "@/assets/logo.png";
import FadeWrapperMotion from "@/shared/components/FadeWrapperMotion";
import { BrandWordmark } from "@/shared/components/ui/BrandWordmark";
import { Input } from "@/shared/components/ui/input";
import { SCENARIOS } from "../../constants/scenario";
import { runScenario } from "../../services/chat-services";
import { useChatStore } from "../../stores/chat-stores";
import type { ChatEvent, ScenarioRunnerOptionType } from "../../types";

const ChatSection = () => {
  const events = useChatStore((state) => state.events);

  return (
    <div className="w-full h-full relative flex flex-col">
      {/* HEADER */}
      <header className="w-full p-3 rounded-t-[20px] bg-surface-2/80 hidden lg:flex justify-center py-4 lg:py-6">
        <BrandWordmark logoSize={30} textClassName="text-sm sm:text-base" />
      </header>

      {/* BUBBLE CHAT CONTENT */}
      <main className="flex-1 relative flex flex-col p-0 lg:p-4 lg:pr-0 gap-4 overflow-y-auto mask-y-from-90% minimal-scrollbar">
        <AnimatePresence mode="popLayout">
          {events.length === 0 ? (
            <EmptyChatFallback />
          ) : (
            <EventList events={events} />
          )}
        </AnimatePresence>
      </main>

      {/* SCENARIO FORM */}
      <footer className="w-full h-fit bg-surface-2/80 border-t-5 border-purple-800 flex flex-col p-3 gap-5 rounded-b-[20px]">
        <span className="text-sm">Scenario Runner</span>

        <div className="w-full overflow-x-auto pb-2 minimal-scrollbar">
          <ul className="flex gap-3 min-w-fit">
            {SCENARIOS.map((scenario) => (
              <ScenarioRunnerOption key={scenario.title} {...scenario} />
            ))}
          </ul>
        </div>

        <form className="relative w-full">
          <Input className="w-full" placeholder="Type a task..." />
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log("test");
            }}
            type="submit"
            className="absolute h-full aspect-square top-1/2 right-1 -translate-y-1/2 flex justify-center items-center cursor-pointer hover:scale-110 active:scale-100 transition-all ease-in-out duration-200"
          >
            <TbSend size={20} color="#efe6fc" />
          </button>
        </form>
      </footer>
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
  const addEvent = useChatStore((state) => state.addEvent);
  const clearEvents = useChatStore((state) => state.clearEvents);

  async function handleClick() {
    clearEvents();

    try {
      const task = variants?.[0]?.taskText || "list calendar events";
      const expectedDecision =
        variants?.[0]?.expectedDecision || "NEED_APPROVAL";

      await runScenario(task, expectedDecision, (event) => {
        addEvent(event);
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <li
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      style={{ "--accent": accent } as CSSProperties}
      className="flex items-center gap-2 w-50 border border-white/40 bg-white/5 backdrop-blur-xl p-3 rounded-lg cursor-pointer hover:bg-white/20 active:scale-95 transition-all ease-in-out"
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
    <FadeWrapperMotion className="absolute inset-0 flex flex-col gap-4 justify-center items-center">
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

const EventList = ({ events }: { events: ChatEvent[] }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (events.length === 0) return;

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [events]);

  return (
    <FadeWrapperMotion className="w-full h-fit overflow-y-auto flex flex-col gap-3 lg:pr-3">
      {events.map((event, index) => (
        <div
          key={`${event.type}-${index}`}
          className="bg-white/5 border border-white/20 p-3 rounded-lg text-sm font-mono wrap-break-word whitespace-pre-wrap text-white"
        >
          <span className="text-accent font-bold mb-1 block">
            [{event.type?.toUpperCase() || "UNKNOWN"}]
          </span>
          {JSON.stringify(event.data, null, 2)}
        </div>
      ))}

      <div ref={bottomRef} />
    </FadeWrapperMotion>
  );
};
