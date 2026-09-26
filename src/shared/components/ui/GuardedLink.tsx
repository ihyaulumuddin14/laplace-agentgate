"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { useAgentGateSessionContext } from "@/shared/components/layout/AgentGateSessionProvider";

type GuardedLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function GuardedLink({ children, onClick, ...props }: GuardedLinkProps) {
  const pathname = usePathname();
  const { handleReplaced } = useAgentGateSessionContext();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) return;
    if (pathname !== "/demo") return;

    const destination = new URL(props.href.toString(), window.location.origin);

    const leavingDemo =
      destination.origin === window.location.origin &&
      destination.pathname !== "/demo";

    if (!leavingDemo) return;

    const confirmed = window.confirm(
      "Your demo session will be terminated if you leave the demo. Are you sure you want to continue?",
    );

    if (!confirmed) {
      event.preventDefault();
      return;
    }

    void handleReplaced();
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
