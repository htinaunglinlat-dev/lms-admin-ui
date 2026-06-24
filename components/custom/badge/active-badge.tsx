import { Badge } from "@/components/ui/badge";

interface ActiveBadgeProps {
  isActive: boolean | string;
}

export function ActiveBadge({ isActive }: ActiveBadgeProps) {
  const isTrue = isActive === true || isActive === "true";

  return (
    <Badge
      variant="secondary"
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border ${
        isTrue
          ? "text-emerald-700 border-emerald-200/60 bg-emerald-50/50 dark:text-emerald-400 dark:border-emerald-800/60 dark:bg-emerald-950/50"
          : "text-rose-700 border-rose-200/60 bg-rose-50/50 dark:text-rose-400 dark:border-rose-800/60 dark:bg-rose-950/50"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isTrue ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
        }`}
        aria-hidden="true"
      />
      {isTrue ? "Active" : "Inactive"}
    </Badge>
  );
}
