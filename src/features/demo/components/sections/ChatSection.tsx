"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { TbSend } from "react-icons/tb";
import logo from "@/assets/logo.png";
import { BrandWordmark } from "@/shared/components/ui/BrandWordmark";
import { Input } from "@/shared/components/ui/input";
import { SCENARIOS } from "../../constants/scenario";
import type { ScenarioRunnerOptionType } from "../../types";

const ChatSection = () => {
  return (
    <div className="w-full h-full relative flex flex-col">
      {/* HEADER */}
      <header className="w-full p-3 rounded-t-[20px] bg-surface-2/80 hidden lg:flex justify-center py-4 lg:py-6">
        <BrandWordmark logoSize={30} textClassName="text-sm sm:text-base" />
      </header>

      {/* BUBBLE CHAT CONTENT */}
      <main className="flex-1 relative">
        <EmptyChatFallback />
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
}: ScenarioRunnerOptionType) => {
  return (
    <li
      style={{ "--accent": accent } as CSSProperties}
      className="flex items-center gap-2 w-50 border border-white/40 bg-white/5 backdrop-blur-xl p-3 rounded-lg"
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
    <div className="absolute w-full h-full flex flex-col gap-4 justify-center items-center">
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
    </div>
  );
};
