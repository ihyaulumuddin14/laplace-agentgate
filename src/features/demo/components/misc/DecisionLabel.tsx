import { cn } from "@/shared/lib/utils";

type LabelType = "allow" | "block" | "sanitize" | "need_approval" | "ask_user";

const DecisionLabel = ({
  label,
  className,
}: {
  label: LabelType;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded-full text-xs font-medium",
        "text-accent border border-accent",
        className,
      )}
    >
      {label
        .split("_")
        .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join("_")}
    </span>
  );
};

export default DecisionLabel;
