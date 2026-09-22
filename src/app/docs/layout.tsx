import type { ReactNode } from "react";
import { DocumentationLayout } from "@/features/documentation/components/DocumentationLayout";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <DocumentationLayout>{children}</DocumentationLayout>;
}
