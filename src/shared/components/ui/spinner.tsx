import { Loader2Icon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      data-slot="spinner"
      aria-label="Loading"
      className={cn("size-4 animate-spin origin-center", className)}
      {...props}
    />
  );
}

export { Spinner };
