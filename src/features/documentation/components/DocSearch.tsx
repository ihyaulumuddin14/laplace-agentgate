import { MdSearch } from "react-icons/md";
import { cn } from "@/shared/lib/utils";

type DocSearchProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function DocSearch({
  value,
  onChange,
  placeholder = "Search Documentation...",
  className,
}: DocSearchProps) {
  return (
    <div className={cn("relative", className)}>
      <MdSearch
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/55"
        size={20}
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        aria-label="Search documentation"
        className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 font-poppins text-sm text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] outline-none transition-colors duration-200 placeholder:text-white/45 hover:border-white/18 focus:border-purple-300/55 focus:bg-white/8 [&::-webkit-search-cancel-button]:appearance-none"
      />
    </div>
  );
}
