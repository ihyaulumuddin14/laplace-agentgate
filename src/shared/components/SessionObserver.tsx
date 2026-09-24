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
      if (!event.canIntercept) return;

      const currentPath = window.location.pathname;
      const destination = new URL(event.destination.url);

      const leavingDemo =
        currentPath === "/demo" && destination.pathname !== "/demo";

      if (!leavingDemo) return;

      const confirmed = window.confirm("Yakin ingin keluar dari Demo?");

      if (!confirmed) {
        event.preventDefault();
        return;
      }

      handleReplaced();
    };

    navigation.addEventListener("navigate", handleNavigate);
    window.addEventListener("beforeunload", handleRefresh);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      navigation.removeEventListener("navigate", handleNavigate);
      window.removeEventListener("beforeunload", handleRefresh);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [handleReplaced, handleRefresh, handlePageHide]);

  return null;
}
