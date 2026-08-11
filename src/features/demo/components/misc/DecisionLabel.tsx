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
        label === "allow" && "text-green border border-green",
        label === "block" && "text-red border border-red",
        label === "sanitize" && "text-orange border border-orange",
        label === "need_approval" && "text-yellow border border-yellow",
        label === "ask_user" && "text-blue border border-blue",
        className,
      )}
    >
      {label
        .split("_")
        .map((word) => `${word.charAt(0)}${word.slice(1)}`)
        .join(" ")}
    </span>
  );
};

export default DecisionLabel;
