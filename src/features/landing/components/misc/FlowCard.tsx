import type { IconType } from "react-icons";

export type FlowStep = {
  Icon: IconType;
  title: string;
  description: string;
};

/** Expanded flow card — used by the mobile swipe stack and the active
 *  desktop accordion panel. */
export function FlowStepCard({ Icon, title, description }: FlowStep) {
  return (
    <div className="flex h-full flex-col justify-center gap-5 rounded-3xl border border-purple-200/20 bg-surface-card/85 p-8 shadow-[0_24px_60px_-30px_rgba(129,51,241,0.6)] backdrop-blur-sm">
      <div className="grid size-14 place-items-center rounded-2xl border border-purple-200/25 bg-purple-500/12 text-purple-100">
        <Icon size={26} />
      </div>
      <h3 className="font-poppins text-2xl font-semibold text-purple-50">
        {title}
      </h3>
      <p className="max-w-sm font-inter text-sm leading-relaxed text-purple-100/70">
        {description}
      </p>
    </div>
  );
}
