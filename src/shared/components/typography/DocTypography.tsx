import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/utils";

/** Typography used for Markdown elements rendered inside documentation. */

export function H1({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "font-poppins text-3xl font-bold text-purple-50 sm:text-4xl",
        className,
      )}
      {...props}
    />
  );
}

export function H2({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "mt-4 font-poppins text-2xl font-semibold text-purple-50",
        className,
      )}
      {...props}
    />
  );
}

export function H3({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "mt-2 font-poppins text-lg font-semibold text-purple-50",
        className,
      )}
      {...props}
    />
  );
}

export function Paragraph({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "font-inter text-[15px] leading-relaxed text-purple-50",
        className,
      )}
      {...props}
    />
  );
}

export function Strong({ className, ...props }: ComponentProps<"strong">) {
  return (
    <strong
      className={cn("font-semibold text-purple-300", className)}
      {...props}
    />
  );
}

export function Anchor({
  href = "",
  className,
  ...props
}: ComponentProps<"a">) {
  const classes = cn(
    "text-purple-200 underline underline-offset-4 hover:text-purple-100",
    className,
  );

  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} className={classes} {...props} />;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={classes}
      {...props}
    />
  );
}

export function UnorderedList({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        "flex list-disc flex-col gap-2 pl-6 font-inter text-[15px] leading-relaxed text-purple-50 marker:text-purple-300",
        className,
      )}
      {...props}
    />
  );
}

export function OrderedList({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      className={cn(
        "flex list-decimal flex-col gap-2 pl-6 font-inter text-[15px] leading-relaxed text-purple-50 marker:text-purple-300",
        className,
      )}
      {...props}
    />
  );
}

export function Blockquote({
  className,
  ...props
}: ComponentProps<"blockquote">) {
  return (
    <blockquote
      className={cn(
        "border-l-2 border-purple-300/50 pl-4 font-inter text-purple-100/80 italic",
        className,
      )}
      {...props}
    />
  );
}

export function InlineCode({ className, ...props }: ComponentProps<"code">) {
  return (
    <code
      className={cn(
        "rounded-md bg-purple-500/15 px-1.5 py-0.5 font-mono text-[0.9em] text-purple-100",
        className,
      )}
      {...props}
    />
  );
}

export function CodeBlock({ className, ...props }: ComponentProps<"pre">) {
  return (
    <pre
      className={cn(
        "doc-scrollbar overflow-x-auto rounded-2xl border border-purple-200/12 bg-surface p-5 font-mono text-sm leading-relaxed text-purple-50 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit",
        className,
      )}
      {...props}
    />
  );
}

export function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <div className="doc-scrollbar overflow-x-auto rounded-2xl border border-purple-200/12">
      <table
        className={cn(
          "w-full border-collapse font-inter text-sm text-purple-50",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function TableHeaderCell({ className, ...props }: ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "border-b border-purple-200/12 bg-purple-500/10 px-4 py-3 text-left font-poppins font-semibold",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: ComponentProps<"td">) {
  return (
    <td
      className={cn("border-b border-purple-200/8 px-4 py-3", className)}
      {...props}
    />
  );
}

export function Divider({ className, ...props }: ComponentProps<"hr">) {
  return <hr className={cn("border-purple-200/12", className)} {...props} />;
}
