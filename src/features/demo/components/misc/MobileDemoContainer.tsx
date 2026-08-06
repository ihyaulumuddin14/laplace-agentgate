"use client";

import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useState } from "react";
import { type DemoTab, DemoTabs } from "../../types";
import ActionSection from "../sections/ActionSection";
import ChatSection from "../sections/ChatSection";
import InsightSection from "../sections/InsightSection";

export default function MobileDemoContainer() {
  const [currentTab, setCurrentTab] = useState<DemoTab>("chat");
  const currentIndex = Object.values(DemoTabs).indexOf(currentTab);
  const [direction, setDirection] = useState(1);

  const handleSwitchTab = (tab: DemoTab) => {
    const nextIndex = Object.values(DemoTabs).indexOf(tab);

    setDirection(nextIndex > currentIndex ? 1 : -1);
    setCurrentTab(tab);
  };

  return (
    <div className="w-full h-full block lg:hidden text-purple-50">
      <nav className="w-full h-fit sticky top-25 border">
        <ul className="w-full grid grid-cols-3 py-3 relative">
          {Object.values(DemoTabs).map((tab) => (
            <MobileTab key={tab} handleSwitchTab={handleSwitchTab} tab={tab} />
          ))}
          <span
            className="absolute bottom-0 left-0 h-[2px] w-1/3 bg-purple-50 transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(${currentIndex * 100}%)`,
            }}
          />
        </ul>
      </nav>

      <main className="w-full h-[calc(100%-46px)] overflow-hidden border relative">
        <AnimatePresence custom={direction}>
          {currentTab === DemoTabs.chat && (
            <DemoCardWrapperMotion direction={direction} key={DemoTabs.chat}>
              <ChatSection />
            </DemoCardWrapperMotion>
          )}
          {currentTab === DemoTabs.action && (
            <DemoCardWrapperMotion direction={direction} key={DemoTabs.action}>
              <ActionSection />
            </DemoCardWrapperMotion>
          )}
          {currentTab === DemoTabs.insight && (
            <DemoCardWrapperMotion direction={direction} key={DemoTabs.insight}>
              <InsightSection />
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
}: {
  handleSwitchTab: (tab: DemoTab) => void;
  tab: DemoTab;
}) => {
  return (
    <li className="text-center text-sm">
      <button
        type="button"
        onClick={() => handleSwitchTab(tab)}
        className="w-full h-full capitalize cursor-pointer hover:bg-purple-500 hover:text-white active:scale-95 transition-all duration-200"
      >
        {tab}
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
      className="absolute inset-0 w-full h-full p-3"
    >
      {children}
    </motion.section>
  );
};
