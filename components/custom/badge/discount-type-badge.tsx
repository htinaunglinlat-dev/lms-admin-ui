import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DiscountTypeEnum } from "@/types/coupon";

interface Props {
  discountType: DiscountTypeEnum;
}

export function DiscountTypeBadge({ discountType }: Props) {
  const isPercentage = discountType === "PERCENTAGE";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="secondary"
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border ${
              isPercentage
                ? "text-blue-700 border-blue-200/60 bg-blue-50/50 dark:text-blue-400 dark:border-blue-800/60 dark:bg-blue-950/50"
                : "text-amber-700 border-amber-200/60 bg-amber-50/50 dark:text-amber-400 dark:border-amber-800/60 dark:bg-amber-950/50"
            }`}
          >
            {isPercentage ? "%" : "MMK"}
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="flex flex-col justify-start">
          {discountType}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
