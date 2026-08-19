"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { type DemoTab, LogsTabs } from "../../types";
import { DemoCardWrapperMotion, MobileTab } from "../misc/MobileDemoContainer";

const LogsSection = () => {
  const [currentTab, setCurrentTab] = useState<DemoTab>(LogsTabs.audit);
  const currentIndex = Object.values(LogsTabs).indexOf(currentTab);
  const [direction, setDirection] = useState(1);

  const handleSwitchTab = (tab: DemoTab) => {
    const nextIndex = Object.values(LogsTabs).indexOf(tab);
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setCurrentTab(tab);
  };

  return (
    <div className="w-full h-full relative flex flex-col">
      <nav className="w-full h-fit border z-20 rounded-t-[20px]">
        <ul className="w-full grid grid-cols-3 h-12 relative">
          {Object.values(LogsTabs).map((tab) => (
            <MobileTab
              key={tab.label}
              handleSwitchTab={handleSwitchTab}
              tab={tab}
              isActive={currentTab.label === tab.label}
              className="flex text-[9px] items-center justify-center gap-1 w-full h-full capitalize cursor-pointer! active:scale-95 transition-all duration-200"
              iconClassName="text-sm"
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
      <main className="flex-1 h-full relative flex flex-col">
        <AnimatePresence custom={direction}>
          {currentTab === LogsTabs.audit && (
            <DemoCardWrapperMotion
              direction={direction}
              key={LogsTabs.audit.label}
            >
              Audit Log
            </DemoCardWrapperMotion>
          )}
          {currentTab === LogsTabs.risk && (
            <DemoCardWrapperMotion
              direction={direction}
              key={LogsTabs.risk.label}
            >
              Risk Dashboard
            </DemoCardWrapperMotion>
          )}
          {currentTab === LogsTabs.latency && (
            <DemoCardWrapperMotion
              direction={direction}
              key={LogsTabs.latency.label}
            >
              Latency Report
            </DemoCardWrapperMotion>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default LogsSection;
