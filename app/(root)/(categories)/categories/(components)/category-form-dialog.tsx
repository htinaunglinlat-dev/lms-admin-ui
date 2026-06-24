"use client";

import { ReactNode } from "react";
import GenericFormDialog from "@/components/custom/elements/generic-form-dialog";
import { CategoryType } from "@/types/category";
import CategoryForm from "./category-form";

type CategoryFormDialogProps = {
  category?: CategoryType;
  trigger: ReactNode;
};

export default function CategoryFormDialog({
  category,
  trigger,
}: CategoryFormDialogProps) {
  const isEdit = Boolean(category);

  return (
    <GenericFormDialog
      trigger={trigger}
      title={isEdit ? "Edit Category" : "Add Category"}
      description={
        isEdit
          ? "Update the category name."
          : "Create a category for organizing courses."
      }
    >
      {({ setOpen }) => <CategoryForm category={category} setOpen={setOpen} />}
    </GenericFormDialog>
  );
}
