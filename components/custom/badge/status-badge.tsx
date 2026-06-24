import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  isActive?: boolean;
}

export function StatusBadge({ isActive }: StatusBadgeProps) {
  // Explicitly check for three states: true, false, and undefined/null
  const isTrue = isActive === true;
  const isFalse = isActive === false;

  return (
    <Badge
      variant="secondary"
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border ${
        isTrue
          ? "text-emerald-700 border-emerald-200/60 bg-emerald-50/50 dark:text-emerald-400 dark:border-emerald-800/60 dark:bg-emerald-950/50"
          : isFalse
            ? "text-rose-700 border-rose-200/60 bg-rose-50/50 dark:text-rose-400 dark:border-rose-800/60 dark:bg-rose-950/50"
            : "text-zinc-600 border-zinc-200 bg-zinc-50 dark:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50"
      }`}
    >
      {/* Dynamic Status Dot Indicator */}
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isTrue
            ? "bg-emerald-500 animate-pulse"
            : isFalse
              ? "bg-rose-500"
              : "bg-zinc-400 dark:bg-zinc-500"
        }`}
        aria-hidden="true"
      />
      {isTrue ? "Active" : isFalse ? "Inactive" : "Unknown"}
    </Badge>
  );
}
