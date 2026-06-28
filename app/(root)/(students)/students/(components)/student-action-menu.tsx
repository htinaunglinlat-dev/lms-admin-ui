import { TooltipButton } from "@/components/custom/elements/tooltip-button";

import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export function StudentActionMenu({ id }: Props) {
  const router = useRouter();

  const onEdit = () => {
    if (!id) return;
    router.push(`/students/${id}/edit`);
  };

  const onDelete = () => {
    console.log("onDelete");
  };

  return (
    <div className="flex gap-2">
      <TooltipButton type="edit" onClick={() => onEdit()} />
      <TooltipButton type="delete" onClick={() => onDelete()} />
    </div>
  );
}
