"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cva } from "class-variance-authority";
import { Edit, Eye, ListPlus, LucideIcon, Trash } from "lucide-react";
import { ComponentProps, ReactNode } from "react";

const tooltipButtonConfig = {
  edit: {
    label: "Edit",
    icon: Edit,
  },
  delete: {
    label: "Delete",
    icon: Trash,
  },
  view: {
    label: "View",
    icon: Eye,
  },
  manage: {
    label: "Manage",
    icon: ListPlus,
  },
} as const;

const tooltipButtonVariants = cva("size-10 cursor-pointer transition", {
  variants: {
    type: {
      edit: "text-blue-500 hover:bg-blue-500 hover:text-white",
      delete: "text-red-500 hover:bg-red-500 hover:text-white",
      view: "text-gray-500 hover:bg-gray-500 hover:text-white",
      manage: "text-green-600 hover:bg-green-600 hover:text-white",
    },
  },
});

export type TooltipButtonType = keyof typeof tooltipButtonConfig;

type TooltipButtonProps = Omit<
  ComponentProps<typeof Button>,
  "children" | "type"
> & {
  type: TooltipButtonType;
  tooltipContent?: ReactNode;
  icon?: LucideIcon;
  htmlType?: ComponentProps<"button">["type"];
};

export function TooltipButton({
  type,
  tooltipContent,
  icon,
  className,
  variant = "outline",
  size,
  asChild,
  htmlType = "button",
  ...props
}: TooltipButtonProps) {
  const config = tooltipButtonConfig[type];
  const Icon = icon ?? config.icon;
  const buttonTypeProps = asChild ? {} : { type: htmlType };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200} disableHoverableContent={true}>
        <TooltipTrigger asChild>
          <Button
            {...props}
            {...buttonTypeProps}
            asChild={asChild}
            variant={variant}
            size={size}
            className={cn(tooltipButtonVariants({ type }), className)}
          >
            <Icon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tooltipContent ?? config.label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
