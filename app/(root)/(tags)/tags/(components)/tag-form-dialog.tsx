"use client";

import { ReactNode } from "react";
import GenericFormDialog from "@/components/custom/elements/generic-form-dialog";
import { TagType } from "@/types/tag";
import TagForm from "./tag-form";

type TagFormDialogProps = {
  tag?: TagType;
  trigger: ReactNode;
};

export default function TagFormDialog({
  tag,
  trigger,
}: TagFormDialogProps) {
  const isEdit = Boolean(tag);

  return (
    <GenericFormDialog
      trigger={trigger}
      title={isEdit ? "Edit Tag" : "Add Tag"}
      description={
        isEdit
          ? "Update the tag name."
          : "Create a tag for organizing courses."
      }
    >
      {({ setOpen }) => <TagForm tag={tag} setOpen={setOpen} />}
    </GenericFormDialog>
  );
}
