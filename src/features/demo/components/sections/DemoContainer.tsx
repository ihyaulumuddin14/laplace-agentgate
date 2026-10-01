"use client";

import { useAgentGateSessionContext } from "@/shared/components/layout/AgentGateSessionProvider";
import { Spinner } from "@/shared/components/ui/spinner";
import DesktopDemoContainer from "../misc/DesktopDemoContainer";
import MobileDemoContainer from "../misc/MobileDemoContainer";

const DemoContainer = () => {
  const { isLoadingCreateSession } = useAgentGateSessionContext();

  if (isLoadingCreateSession) {
    return (
      <section className="relative mt-25 flex h-[calc(100vh-100px)] w-full items-center justify-center overflow-hidden lg:mt-30 lg:h-[calc(100vh-120px)]">
        <div
          aria-hidden="true"
          className="absolute size-96 rounded-full bg-purple-500/20 blur-3xl"
        />
        <output
          aria-live="polite"
          className="relative flex min-w-64 flex-col items-center gap-4 rounded-3xl border border-purple-200/15 bg-surface-card/80 px-10 py-9 text-center shadow-[0_20px_60px_-20px_rgba(92,0,225,0.65)] backdrop-blur"
        >
          <span className="grid size-14 place-items-center rounded-2xl border border-purple-300/25 bg-purple-500/15 text-purple-200">
            <Spinner className="size-7" strokeWidth={2.5} />
          </span>
          <p className="font-poppins text-base font-medium text-purple-50">
            Creating session...
          </p>
        </output>
      </section>
    );
  }

  return (
    <section className="w-full h-[calc(100vh-100px)] lg:h-[calc(100vh-120px)] relative mt-25 lg:mt-30 lg:p-7 pt-0">
      <DesktopDemoContainer />
      <MobileDemoContainer />
    </section>
  );
};

export default DemoContainer;
