import { Badge } from "@/components/ui/badge";

interface PublishedBadgeProps {
  isPublished: boolean | string;
}

export function PublishedBadge({ isPublished }: PublishedBadgeProps) {
  const isTrue = isPublished === true || isPublished === "true";

  return (
    <Badge
      variant="secondary"
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border ${
        isTrue
          ? "text-emerald-700 border-emerald-200/60 bg-emerald-50/50 dark:text-emerald-400 dark:border-emerald-800/60 dark:bg-emerald-950/50"
          : "text-amber-700 border-amber-200/60 bg-amber-50/50 dark:text-amber-400 dark:border-amber-800/60 dark:bg-amber-950/50"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isTrue ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
        }`}
        aria-hidden="true"
      />
      {isTrue ? "Public" : "Private"}
    </Badge>
  );
}
