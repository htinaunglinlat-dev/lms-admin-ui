import { Badge } from "@/components/ui/badge";
import { EnrollmentTypeEnum } from "@/types/enrollment";

interface EnrollmentTypeBadgeProps {
  enrollmentType?: EnrollmentTypeEnum;
}

const enrollmentTypeConfig: Record<
  EnrollmentTypeEnum,
  { label: string; dotClass: string; badgeClass: string }
> = {
  FREE: {
    label: "Free",
    dotClass: "bg-sky-500",
    badgeClass:
      "text-sky-700 border-sky-200/60 bg-sky-50/50 dark:text-sky-400 dark:border-sky-800/60 dark:bg-sky-950/50",
  },
  GIVEAWAY: {
    label: "Giveaway",
    dotClass: "bg-violet-500",
    badgeClass:
      "text-violet-700 border-violet-200/60 bg-violet-50/50 dark:text-violet-400 dark:border-violet-800/60 dark:bg-violet-950/50",
  },
  ORDER: {
    label: "Order",
    dotClass: "bg-amber-500",
    badgeClass:
      "text-amber-700 border-amber-200/60 bg-amber-50/50 dark:text-amber-400 dark:border-amber-800/60 dark:bg-amber-950/50",
  },
};

export function EnrollmentTypeBadge({ enrollmentType }: EnrollmentTypeBadgeProps) {
  if (!enrollmentType || !(enrollmentType in enrollmentTypeConfig)) {
    return (
      <Badge
        variant="secondary"
        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border text-gray-700 border-gray-200/60 bg-gray-50/50 dark:text-gray-400 dark:border-gray-800/60 dark:bg-gray-950/50"
      >
        Unknown
      </Badge>
    );
  }

  const config = enrollmentTypeConfig[enrollmentType];

  return (
    <Badge
      variant="secondary"
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border ${config.badgeClass}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${config.dotClass}`}
        aria-hidden="true"
      />
      {config.label}
    </Badge>
  );
}
