import Image from "next/image";
import glasmorph from "@/assets/Glasmorph.svg";
import { cn } from "@/shared/lib/utils";

type GlowProps = {
  className?: string;
};

export function Glow({ className }: GlowProps) {
  return (
    <Image
      src={glasmorph}
      alt=""
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute h-auto max-w-none select-none [mix-blend-mode:plus-lighter]",
        className,
      )}
    />
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
      <Glow className="-bottom-20 -left-52 w-[34rem] sm:w-[42rem] lg:w-[48rem]" />
      <Glow className="-right-40 -top-28 w-[26rem] -rotate-90 sm:w-[32rem] lg:w-[38rem]" />
      <Glow className="-right-32 bottom-10 w-[20rem] rotate-90 sm:w-[25rem] lg:w-[30rem]" />
    </div>
  );
}
