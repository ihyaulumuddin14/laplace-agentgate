import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[16px] border border-transparent bg-clip-padding text-base sm:text-lg font-medium whitespace-nowrap transition-all duration-300 ease-in-out outline-none select-none active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "relative isolate bg-gradient-linear-2 text-primary-foreground border-3 border-transparent before:absolute before:inset-0 before:z-[-1] before:rounded-[16px] before:bg-gradient-linear-hover-2 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 focus-visible:before:opacity-100 active:before:opacity-0 active:bg-purple-800 focus-visible:border-purple-200 disabled:opacity-10 disabled:pointer-events-none",
        outline:
          "border-border bg-background shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "relative bg-transparent text-purple-50 shadow-[inset_0_0_0_2px_var(--color-purple-50)] hover:bg-purple-100 hover:text-white hover:shadow-[inset_0_0_0_2px_#8133F1] focus-visible:shadow-[inset_0_0_0_2px_var(--color-purple-800)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground before:content-[''] before:opacity-0 before:transition-all before:duration-300 before:hover:opacity-100 before:absolute before:-inset-[1.5px] before:z-[-1] before:rounded-xl before:hover:bg-gradient-linear-2 focus-visible:bg-purple-50 focus-visible:text-purple-800 focus-visible:border-purple-100 border-2 border-transparent active:bg-purple-200 active:text-purple-800",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-14 px-6 gap-1.5 rounded-xl in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-10 px-4 gap-1 rounded-2xl text-sm! in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-12 px-5 gap-1 rounded-xl in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        lg: "h-16 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 px-8 py-4 rounded-2xl",
        icon: "size-14 rounded-xl",
        "icon-xs":
          "size-10 rounded-lg in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-12 rounded-xl in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-16 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      disabled={!asChild ? disabled : undefined}
      aria-disabled={asChild ? disabled : undefined}
      className={cn(
        buttonVariants({ variant, size }),
        disabled && asChild && "pointer-events-none opacity-20 bg-black/40",
        className,
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
