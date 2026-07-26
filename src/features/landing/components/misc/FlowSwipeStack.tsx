"use client";

import {
  animate,
  motion,
  type PanInfo,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useState } from "react";
import {
  type FlowStep,
  FlowStepCard,
} from "@/features/landing/components/misc/FlowCard";

/** Mobile: a Tinder-style deck. The top card is draggable; flinging it left or
 *  right sends it to the bottom of the stack. */
export function FlowSwipeStack({ steps }: { steps: FlowStep[] }) {
  const [deck, setDeck] = useState(() =>
    steps.map((step, i) => ({ step, key: `flow-${i}` })),
  );
  const [locked, setLocked] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-260, 260], [-15, 15]);
  const opacity = useTransform(x, [-280, -80, 0, 80, 280], [0.2, 1, 1, 1, 0.2]);

  const cycle = () => {
    setDeck((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
    x.set(0);
    setLocked(false);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const flung =
      Math.abs(info.offset.x) > 120 || Math.abs(info.velocity.x) > 500;
    if (flung) {
      setLocked(true);
      const dir = info.offset.x > 0 ? 1 : -1;
      animate(x, dir * 680, {
        type: "spring",
        stiffness: 260,
        damping: 32,
        onComplete: cycle,
      });
    } else {
      animate(x, 0, { type: "spring", stiffness: 320, damping: 30 });
    }
  };

  return (
    <div className="relative mx-auto h-[400px] w-full max-w-sm">
      {deck.map(({ step, key }, index) => {
        if (index > 3) return null;
        const isTop = index === 0;
        const depth = Math.min(index, 3);

        return (
          <motion.div
            key={key}
            className="absolute inset-0"
            style={
              isTop
                ? { x, rotate, opacity, zIndex: 40 }
                : { zIndex: 40 - index }
            }
            initial={false}
            animate={
              isTop
                ? { scale: 1, y: 0 }
                : { scale: 1 - depth * 0.05, y: depth * 16 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag={isTop && !locked ? "x" : false}
            dragElastic={0.7}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={isTop ? handleDragEnd : undefined}
          >
            <FlowStepCard {...step} />
          </motion.div>
        );
      })}
    </div>
  );
}
