import type { Metadata } from "next";
import { DocArticle } from "@/features/documentation/components/DocArticle";
import { DOC_NAV_ITEMS } from "@/features/documentation/data/navItems";
import { loadDoc } from "@/features/documentation/services/loadDoc";

type DocPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return DOC_NAV_ITEMS.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await loadDoc(slug);

  return {
    title: `${metadata.title} — AgentGate Docs`,
    description: metadata.description,
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const { Content, metadata } = await loadDoc(slug);
  const index = DOC_NAV_ITEMS.findIndex((item) => item.id === slug);

  return (
    <DocArticle number={index + 1} title={metadata.title}>
      <Content />
    </DocArticle>
  );
}
