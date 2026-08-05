import { MdSearch } from "react-icons/md";

type DocSearchProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

/** Reusable search box for the documentation sidebar. */
export function DocSearch({
  value,
  onChange,
  placeholder = "Search Documentation...",
  className = "",
}: DocSearchProps) {
  return (
    <div className={`relative ${className}`}>
      <MdSearch
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-purple-100/60"
        size={20}
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label="Search documentation"
        className="w-full rounded-2xl border border-purple-200/15 bg-surface-card/70 py-3 pl-12 pr-4 font-inter text-sm text-purple-50 placeholder:text-purple-100/45 transition-colors duration-200 focus:border-purple-300/50 focus:outline-none"
      />
    </div>
  );
}
