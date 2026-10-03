import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/utils";

export function H1({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "font-poppins text-[30px] font-bold leading-tight text-white sm:text-[34px] lg:text-4xl xl:text-[40px] 2xl:text-[44px]",
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
        "mt-4 font-poppins text-xl font-bold leading-snug text-purple-200 sm:text-2xl",
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
        "mt-2 font-poppins text-lg font-semibold leading-snug text-white sm:text-xl",
        className,
      )}
      {...props}
    />
  );
}

export function H4({ className, ...props }: ComponentProps<"h4">) {
  return (
    <h4
      className={cn(
        "mt-1 font-poppins text-base font-semibold leading-snug text-white",
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
        "font-poppins text-[15px] leading-relaxed text-white sm:text-base sm:text-justify",
        className,
      )}
      {...props}
    />
  );
}

export function Strong({ className, ...props }: ComponentProps<"strong">) {
  return (
    <strong className={cn("font-semibold text-white", className)} {...props} />
  );
}

export function Anchor({
  href = "",
  className,
  ...props
}: ComponentProps<"a">) {
  const classes = cn(
    "text-purple-200 underline underline-offset-4 transition-colors hover:text-purple-100",
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
        "flex list-disc flex-col gap-2.5 pl-5 font-poppins text-[15px] leading-relaxed text-white marker:text-purple-200 sm:text-base",
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
        "flex list-decimal flex-col gap-2.5 pl-5 font-poppins text-[15px] leading-relaxed text-white marker:text-purple-200 sm:text-base",
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
        "border-l-2 border-purple-300/50 pl-4 font-poppins italic text-white/80 [&>p]:text-white/80",
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
        "rounded-md border border-white/10 bg-white/8 px-1.5 py-0.5 font-mono text-[0.88em] text-purple-100",
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
        "doc-scrollbar overflow-x-auto rounded-2xl border border-white/18 bg-black/30 p-5 font-mono text-[13px] leading-relaxed text-white sm:text-sm [&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit",
        className,
      )}
      {...props}
    />
  );
}

export function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <div className="doc-scrollbar overflow-x-auto rounded-2xl border border-white/18">
      <table
        className={cn(
          "w-full border-collapse font-poppins text-[13px] text-white sm:text-sm",
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
        "border-r border-b border-white/14 bg-white/8 px-4 py-3 text-center font-poppins font-semibold text-white last:border-r-0",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "border-r border-b border-white/10 px-4 py-3 align-top last:border-r-0",
        className,
      )}
      {...props}
    />
  );
}

export function Divider({ className, ...props }: ComponentProps<"hr">) {
  return <hr className={cn("border-white/10", className)} {...props} />;
}
