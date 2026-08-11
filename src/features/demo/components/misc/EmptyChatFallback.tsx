"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import FadeWrapperMotion from "@/shared/components/FadeWrapperMotion";

export const EmptyChatFallback = () => {
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
