"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TagType } from "@/types/tag";

interface TagBadgeListProps {
  tags?: TagType[];
}

export function TagBadgeList({ tags }: TagBadgeListProps) {
  if (!tags || tags.length === 0)
    return <span className="text-sm text-muted-foreground">—</span>;

  const [first, ...rest] = tags;

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        <Badge variant="secondary" className="text-xs">
          # {first.name}
        </Badge>
        {rest.length > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="cursor-pointer text-xs">
                +{rest.length}
              </Badge>
            </TooltipTrigger>
            <TooltipContent className="flex flex-col justify-start">
              {rest.map((t) => (
                <div key={t.id}># {t.name}</div>
              ))}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
