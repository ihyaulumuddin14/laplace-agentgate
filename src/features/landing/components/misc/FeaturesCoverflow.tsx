"use client";

import { useAnimationFrame } from "motion/react";
import { type ReactNode, useRef } from "react";

type CoverflowItem = { id: string; node: ReactNode };

/**
 * Auto-rotating 3D coverflow. Cards fan out on a curved arc, the deck advances
 * on its own, and the user can grab it to swipe or hold it still. Transforms
 * are written straight to the DOM each frame (no React re-render).
 */
export function FeaturesCoverflow({ items }: { items: CoverflowItem[] }) {
  const n = items.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pos = useRef(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startPos = useRef(0);

  useAnimationFrame((_, delta) => {
    const container = containerRef.current;
    if (!container || container.offsetParent === null) return; // hidden (desktop)

    if (!dragging.current) {
      pos.current = (pos.current + (delta / 1000) * 0.3) % n;
    }

    for (let i = 0; i < cardRefs.current.length; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;

      let off = (((i - pos.current) % n) + n) % n;
      if (off > n / 2) off -= n;
      const abs = Math.min(Math.abs(off), 3.4);

      const x = off * 132;
      const z = -abs * 120;
      const rotateY = Math.max(-52, Math.min(52, -off * 34));
      const scale = Math.max(0.62, 1 - abs * 0.14);
      const opacity = Math.max(0, 1 - abs * 0.42);

      el.style.transform = `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`;
      el.style.opacity = opacity.toFixed(3);
      el.style.zIndex = String(200 - Math.round(Math.abs(off) * 10));
      el.style.pointerEvents = Math.abs(off) < 0.5 ? "auto" : "none";
    }
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    startX.current = e.clientX;
    startPos.current = pos.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    pos.current = startPos.current - (e.clientX - startX.current) / 190;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // capture may already be released
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-75 w-full max-w-md touch-pan-y select-none perspective-distant"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {items.map((item, i) => (
        <div
          key={item.id}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="absolute left-1/2 top-1/2 h-62 w-[64%] transform-3d will-change-transform"
        >
          {item.node}
        </div>
      ))}
    </div>
  );
}
