import GenericFormDialog from "@/components/custom/elements/generic-form-dialog";
import { TooltipButton } from "@/components/custom/elements/tooltip-button";
import { TagType } from "@/types/tag";

import { useRouter } from "next/navigation";
import TagForm from "./tag-form";

type Props = {
  tag: TagType;
};

export function TagActionMenu({ tag }: Props) {
  const router = useRouter();

  const { id } = tag;

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
        title="Edit Tag"
        description={`Update the details for tag #${id}.`}
      >
        {({ setOpen }) => (
          <TagForm tag={tag} setOpen={setOpen} />
        )}
      </GenericFormDialog>
      <TooltipButton type="delete" onClick={() => onDelete()} />
    </div>
  );
}
