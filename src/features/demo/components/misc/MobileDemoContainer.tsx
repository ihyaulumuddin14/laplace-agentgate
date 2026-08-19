"use client";

import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { type DemoTab, DemoTabs } from "../../types";
import ChatSection from "../sections/ChatSection";
import LogsSection from "../sections/LogsSection";
import StateSection from "../sections/StateSection";

export default function MobileDemoContainer() {
  const [currentTab, setCurrentTab] = useState<DemoTab>(DemoTabs.chat);
  const currentIndex = Object.values(DemoTabs).indexOf(currentTab);
  const [direction, setDirection] = useState(1);

  const handleSwitchTab = (tab: DemoTab) => {
    const nextIndex = Object.values(DemoTabs).indexOf(tab);

    setDirection(nextIndex > currentIndex ? 1 : -1);
    setCurrentTab(tab);
  };

  return (
    <div className="w-full h-full relative lg:hidden text-purple-50 p-3 pt-0">
      <nav className="w-full h-fit border z-20 rounded-t-[20px]">
        <ul className="w-full grid grid-cols-3 h-15 relative">
          {Object.values(DemoTabs).map((tab) => (
            <MobileTab
              key={tab.label}
              handleSwitchTab={handleSwitchTab}
              tab={tab}
              isActive={currentTab.label === tab.label}
            />
          ))}
          <span
            className="absolute bottom-0 left-0 h-0.5 w-1/3 bg-purple-100 transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(${currentIndex * 100}%)`,
            }}
          />
        </ul>
      </nav>

      <main className="relative w-full h-[calc(100%-62px)]">
        <AnimatePresence custom={direction}>
          {currentTab === DemoTabs.chat && (
            <DemoCardWrapperMotion
              direction={direction}
              key={DemoTabs.chat.label}
            >
              <ChatSection />
            </DemoCardWrapperMotion>
          )}
          {currentTab === DemoTabs.state && (
            <DemoCardWrapperMotion
              direction={direction}
              key={DemoTabs.state.label}
            >
              <StateSection />
            </DemoCardWrapperMotion>
          )}
          {currentTab === DemoTabs.logs && (
            <DemoCardWrapperMotion
              direction={direction}
              key={DemoTabs.logs.label}
            >
              <LogsSection />
            </DemoCardWrapperMotion>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

const MobileTab = ({
  handleSwitchTab,
  tab,
  isActive,
}: {
  handleSwitchTab: (tab: DemoTab) => void;
  tab: DemoTab;
  isActive: boolean;
}) => {
  return (
    <li className="h-full text-center text-sm hover:bg-purple-500/50 hover:text-white">
      <button
        type="button"
        onClick={() => handleSwitchTab(tab)}
        className={cn(
          "flex flex-col items-center justify-center gap-1 w-full h-full capitalize cursor-pointer! active:scale-95 transition-all duration-200",
          isActive && "text-purple-100",
        )}
      >
        <tab.icon className="text-xl" />
        {tab.label}
      </button>
    </li>
  );
};

const DemoCardWrapperMotion = ({
  children,
  direction,
}: {
  children: ReactNode;
  direction: number;
}) => {
  const variants = {
    enter: (direction: number) => ({
      translateX: direction > 0 ? "100%" : "-100%",
    }),
    center: {
      translateX: "0%",
    },
    exit: (direction: number) => ({
      translateX: direction > 0 ? "-100%" : "100%",
    }),
  };

  return (
    <motion.section
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="absolute w-full h-full"
    >
      {children}
    </motion.section>
  );
};
