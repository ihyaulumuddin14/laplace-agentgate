"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { LOG_TABS } from "../../constants/navigation";
import type { DemoTab } from "../../types";
import AuditLogs from "../misc/AuditLogs";
import LatencyReport from "../misc/LatencyReport";
import { DemoCardWrapperMotion, MobileTab } from "../misc/MobileDemoContainer";
import RiskDashboard from "../misc/RiskDashboard";

const LogsSection = () => {
  const [currentTab, setCurrentTab] = useState<DemoTab>(LOG_TABS.audit);
  const currentIndex = Object.values(LOG_TABS).indexOf(currentTab);
  const [direction, setDirection] = useState(1);

  const handleSwitchTab = (tab: DemoTab) => {
    const nextIndex = Object.values(LOG_TABS).indexOf(tab);
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setCurrentTab(tab);
  };

  return (
    <div className="w-full h-full relative flex flex-col">
      <nav className="w-full h-fit border z-20 rounded-t-[20px]">
        <ul className="w-full grid grid-cols-3 h-12 relative">
          {Object.values(LOG_TABS).map((tab) => (
            <MobileTab
              key={tab.label}
              handleSwitchTab={handleSwitchTab}
              tab={tab}
              isActive={currentTab.label === tab.label}
              className="flex text-[9px] sm:text-[10px] sm:font-semibold lg:text-sm items-center justify-center gap-1 w-full h-full capitalize cursor-pointer! active:scale-95 transition-all duration-200"
              iconClassName="text-sm sm:text-base lg:text-xl sm:font-semibold"
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
          {currentTab === LOG_TABS.audit && (
            <DemoCardWrapperMotion
              direction={direction}
              key={LOG_TABS.audit.label}
            >
              <AuditLogs />
            </DemoCardWrapperMotion>
          )}
          {currentTab === LOG_TABS.risk && (
            <DemoCardWrapperMotion
              direction={direction}
              key={LOG_TABS.risk.label}
            >
              <RiskDashboard />
            </DemoCardWrapperMotion>
          )}
          {currentTab === LOG_TABS.latency && (
            <DemoCardWrapperMotion
              direction={direction}
              key={LOG_TABS.latency.label}
            >
              <LatencyReport />
            </DemoCardWrapperMotion>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default LogsSection;
