import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 640;

export const useIsMobile = (mobileBreakpoint?: number) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(
      `(max-width: ${mobileBreakpoint ?? MOBILE_BREAKPOINT}px)`,
    );
    const update = () => setIsMobile(mql.matches);

    update();
    mql.addEventListener("change", update);

    return () => mql.removeEventListener("change", update);
  }, [mobileBreakpoint]);

  return isMobile;
};
