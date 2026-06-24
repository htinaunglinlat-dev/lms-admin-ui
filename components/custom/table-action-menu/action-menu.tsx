"use client";

import { Edit, Loader2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

type Props = {
  currentRoleId: number;
};

function ActionMenu({ currentRoleId }: Props) {
  const router = useRouter();

  const onEdit = () => {
    if (!currentRoleId) return;
    router.push(`/admins/edit/${currentRoleId}`);
  };

  const onDelete = () => {
    console.log("onDelete");
  };

  const isDeleting = false;

  return (
    <div className="flex gap-2">
      {/* Edit Button */}
      <TooltipProvider>
        <Tooltip delayDuration={200} disableHoverableContent={true}>
          <TooltipTrigger asChild>
            <Button
              variant={"outline"}
              className="text-blue-500 rounded-full size-10 hover:bg-blue-500 hover:text-white transition cursor-pointer"
              title="edit"
              onClick={onEdit}
            >
              <Edit />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit the content.</TooltipContent>
        </Tooltip>

        {/* Delete Button */}
        <Tooltip delayDuration={200} disableHoverableContent={true}>
          <TooltipTrigger asChild>
            <Button
              variant={"outline"}
              className="text-red-500 rounded-full size-10 hover:bg-red-400 hover:text-white transition cursor-pointer"
              onClick={onDelete}
            >
              {isDeleting ? <Loader2 className="animate-spin" /> : <Trash />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit the content.</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default ActionMenu;
