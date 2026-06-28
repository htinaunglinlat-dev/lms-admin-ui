import { TooltipButton } from "@/components/custom/elements/tooltip-button";

import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export function CourseActionMenu({ id }: Props) {
  const router = useRouter();

  const onEdit = () => {
    if (!id) return;
    router.push(`/courses/${id}/edit`);
  };

  const onManage = () => {
    if (!id) return;
    router.push(`/courses/${id}/manage`);
  };

  const onDelete = () => {
    console.log("onDelete");
  };

  return (
    <div className="flex gap-2">
      <TooltipButton type="manage" onClick={() => onManage()} />
      <TooltipButton type="edit" onClick={() => onEdit()} />
      <TooltipButton type="delete" onClick={() => onDelete()} />
    </div>
  );
}
