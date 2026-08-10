import type { ReactNode } from "react";

const DemoCard = ({ children }: { children: ReactNode }) => {
  return (
    <article className="w-full h-full bg-surface-card/10 rounded-[20px] flex relative border">
      {children}
    </article>
  );
};

export default DemoCard;
