import type { ReactNode } from "react";

export function DocLabel({ children }: { children: ReactNode }) {
  return (
    <strong className="font-poppins font-bold text-purple-200">
      {children}
    </strong>
  );
}
