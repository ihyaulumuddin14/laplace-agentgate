"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type DocArticleProps = {
  title: string;
  children: ReactNode;
};

export function DocArticle({ title, children }: DocArticleProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      key={pathname}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-7"
    >
      <motion.h1
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="font-poppins text-[30px] font-bold leading-tight text-white sm:text-[34px] lg:text-4xl xl:text-[40px] 2xl:text-[44px]"
      >
        {title}
      </motion.h1>

      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-6"
      >
        {children}
      </motion.div>
    </motion.article>
  );
}
