import type { ReactNode } from "react";
import { Footer } from "@/shared/components/layout/Footer";

export default function FooterLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
