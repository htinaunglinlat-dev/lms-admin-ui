import GenericFormDialog from "@/components/custom/elements/generic-form-dialog";
import { TooltipButton } from "@/components/custom/elements/tooltip-button";
import { CategoryType } from "@/types/category";

import { useRouter } from "next/navigation";
import CategoryForm from "./category-form";

type Props = {
  category: CategoryType;
};

export function CategoryActionMenu({ category }: Props) {
  const router = useRouter();

  const { id } = category;

  const onEdit = () => {
    if (!id) return;
    router.push(`/admins/${id}/edit`);
  };

  const onDelete = () => {
    console.log("onDelete");
  };

  return (
    <div className="flex gap-2">
      <GenericFormDialog
        trigger={<TooltipButton type="edit" />}
        title="Edit Enrollment"
        description={`Update the status for enrollment #${id}.`}
      >
        {({ setOpen }) => (
          <CategoryForm category={category} setOpen={setOpen} />
        )}
      </GenericFormDialog>
      <TooltipButton type="delete" onClick={() => onDelete()} />
    </div>
  );
}
