import Image from "next/image";
import glasmorph from "@/assets/Glasmorph.svg";
import { cn } from "@/shared/lib/utils";

type GlowProps = {
  className?: string;
  imageClassName?: string;
};

export function Glow({ className, imageClassName }: GlowProps) {
  return (
    <span className={cn("pointer-events-none absolute block", className)}>
      <Image
        src={glasmorph}
        alt=""
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-0 h-auto max-w-none -translate-x-[24%] -translate-y-[75%] select-none [mix-blend-mode:plus-lighter]",
          imageClassName,
        )}
      />
    </span>
  );
}

export function GlowBackdrop({ className }: GlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <Glow
        className="left-[13%] top-[71%]"
        imageClassName="w-[34rem] sm:w-[42rem] lg:w-[48rem]"
      />
      <Glow
        className="left-[89%] top-[38%] -rotate-90"
        imageClassName="w-[26rem] sm:w-[32rem] lg:w-[38rem]"
      />
      <Glow
        className="left-[85%] top-[77%] rotate-90"
        imageClassName="w-[20rem] sm:w-[25rem] lg:w-[30rem]"
      />
    </div>
  );
}
