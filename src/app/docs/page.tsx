import { redirect } from "next/navigation";
import { DOC_NAV_ITEMS } from "@/features/documentation/data/navItems";

export default function DocsPage() {
  redirect(`/docs/${DOC_NAV_ITEMS[0].id}`);
}
