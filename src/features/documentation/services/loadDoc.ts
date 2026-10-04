import type { MDXContent } from "mdx/types";

export type DocMetadata = {
  title: string;
  description?: string;
};

type DocModule = {
  default: MDXContent;
  metadata: DocMetadata;
};

/** Loads a documentation page from `src/content/docs/<slug>.mdx`. */
export async function loadDoc(slug: string) {
  const doc: DocModule = await import(`@/content/docs/${slug}.mdx`);
  return { Content: doc.default, metadata: doc.metadata };
}
