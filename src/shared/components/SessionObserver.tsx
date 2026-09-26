/** biome-ignore-all lint/suspicious/noExplicitAny: NavigationEvent is not available in the Event Inheritance Type */
"use client";

import { useEffect } from "react";
import { useAgentGateSessionContext } from "@/shared/components/layout/AgentGateSessionProvider";

export function SessionObserver() {
  const { handleReplaced, handlePageHide, handleRefresh } =
    useAgentGateSessionContext();

  useEffect(() => {
    const navigation = (window as any).navigation;

    if (!navigation) {
      console.warn("Navigation API is not supported");
      return;
    }

    const handleNavigate = (event: any) => {
      const currentPath = window.location.pathname;
      const destination = new URL(event.destination.url);

      const leavingDemo =
        currentPath === "/demo" &&
        destination.origin === window.location.origin &&
        destination.pathname !== "/demo";

      if (!leavingDemo) return;

      // not run for router.push and reload
      if (event.navigationType === "push" || event.navigationType === "reload")
        return;

      // Browser navigation Back / Forward
      if (event.navigationType === "traverse") {
        const confirmed = window.confirm(
          "Your demo session will be terminated if you navigate away from the demo. Are you sure you want to continue?",
        );

        if (!confirmed) {
          event.preventDefault();
          return;
        }

        void handleReplaced();
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";

      handleRefresh();
    };

    navigation.addEventListener("navigate", handleNavigate);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      navigation.removeEventListener("navigate", handleNavigate);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [handleReplaced, handleRefresh, handlePageHide]);

  return null;
}
