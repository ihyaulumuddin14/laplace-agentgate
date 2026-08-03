"use client";

import { type ReactNode, useEffect, useRef } from "react";

export type CarouselItem = {
  id: string;
  node: ReactNode;
};

type CoverflowCarouselProps = {
  items: CarouselItem[];
  className?: string;
};

/**
 * Touch-friendly "coverflow" carousel: native scroll-snap handles the paging,
 * while a scroll listener scales / rotates / dims each card by its distance
 * from the viewport centre — the centred card sits flat and large, neighbours
 * fan back in 3D. No animation library required.
 */
export function CoverflowCarousel({
  items,
  className = "",
}: CoverflowCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const center = rect.left + rect.width / 2;

      for (const child of Array.from(track.children) as HTMLElement[]) {
        const box = child.getBoundingClientRect();
        const childCenter = box.left + box.width / 2;
        const dist = (childCenter - center) / rect.width;
        const abs = Math.min(Math.abs(dist), 1);

        child.style.transform = `perspective(1400px) rotateY(${(-dist * 26).toFixed(2)}deg) scale(${(1 - abs * 0.2).toFixed(3)})`;
        child.style.opacity = (1 - abs * 0.5).toFixed(3);
        child.style.zIndex = String(100 - Math.round(abs * 100));
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className={`no-scrollbar flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto scroll-px-4 px-4 pb-6 [perspective:1400px] ${className}`}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="w-[80vw] max-w-[26rem] shrink-0 snap-center transition-[transform,opacity] duration-200 ease-out [transform-style:preserve-3d] sm:w-[58vw]"
        >
          {item.node}
        </div>
      ))}
    </div>
  );
}
