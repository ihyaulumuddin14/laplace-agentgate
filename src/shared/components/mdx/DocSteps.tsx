import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/shared/lib/utils";

type DocStepProps = {
  title?: string;
  children: ReactNode;
  number?: number;
  className?: string;
};

export function DocStep({ title, children, number, className }: DocStepProps) {
  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-purple-200/15 bg-white/4 px-4 py-3.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] sm:gap-4 sm:px-5 sm:py-4",
        className,
      )}
    >
      <span className="w-5 shrink-0 text-right font-poppins text-sm text-white/65">
        {number}.
      </span>
      <div className="min-w-0 flex-1">
        {title && (
          <p className="font-poppins text-[15px] font-bold leading-snug text-purple-200 sm:text-base">
            {title}
          </p>
        )}
        <div className={cn("flex flex-col gap-2", title && "mt-1")}>
          {children}
        </div>
      </div>
    </li>
  );
}

export function DocSteps({ children }: { children: ReactNode }) {
  const steps = Children.toArray(children).filter(
    (child): child is ReactElement<DocStepProps> => isValidElement(child),
  );

  return (
    <ol className="flex list-none flex-col gap-3.5 pl-0">
      {steps.map((step, index) => cloneElement(step, { number: index + 1 }))}
    </ol>
  );
}
