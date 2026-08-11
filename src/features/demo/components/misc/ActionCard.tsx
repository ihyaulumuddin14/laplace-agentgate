import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

const ActionCard = ({
  children,
  className,
  accent,
}: {
  children: ReactNode;
  className?: string;
  accent?: string;
}) => {
  return (
    <div
      style={
        {
          "--accent": accent,
        } as CSSProperties
      }
      className={cn(
        "bg-surface-2/40 border border-[#8D5BFF]/40 rounded-[20px] overflow-hidden p-5 flex flex-col gap-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ActionCard;
