import type { MDXComponents } from "mdx/types";
import { DocCallout } from "@/shared/components/mdx/DocCallout";
import { DocCard } from "@/shared/components/mdx/DocCard";
import { DocLabel } from "@/shared/components/mdx/DocLabel";
import { DocListCard } from "@/shared/components/mdx/DocListCard";
import { DocStep, DocSteps } from "@/shared/components/mdx/DocSteps";
import { DocToken } from "@/shared/components/mdx/DocToken";
import {
  Anchor,
  Blockquote,
  CodeBlock,
  Divider,
  H1,
  H2,
  H3,
  H4,
  InlineCode,
  OrderedList,
  Paragraph,
  Strong,
  Table,
  TableCell,
  TableHeaderCell,
  UnorderedList,
} from "@/shared/components/typography/DocTypography";

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Paragraph,
  strong: Strong,
  a: Anchor,
  ul: UnorderedList,
  ol: OrderedList,
  blockquote: Blockquote,
  code: InlineCode,
  pre: CodeBlock,
  table: Table,
  th: TableHeaderCell,
  td: TableCell,
  hr: Divider,

  DocCallout,
  DocCard,
  DocLabel,
  DocListCard,
  DocStep,
  DocSteps,
  DocToken,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
