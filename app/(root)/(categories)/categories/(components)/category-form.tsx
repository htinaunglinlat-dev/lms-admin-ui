"use client";

import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { AppFieldError } from "@/components/custom/elements/app-field-error";
import { Input } from "@/components/ui/input";
import { CategoryType } from "@/types/category";
import {
  CategoryFormValues,
  CategorySchema,
} from "@/validations/category.schema";
import { useCreateCategory, useUpdateCategory } from "@/hooks/use-category";
import { extractErrorMessage } from "@/lib/error";

type CategoryFormProps = {
  category?: CategoryType;
  setOpen: (open: boolean) => void;
};

export default function CategoryForm({ category, setOpen }: CategoryFormProps) {
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const isEdit = Boolean(category);
  const isPending = createCategory.isPending || updateCategory.isPending;

  const formValues = useMemo<CategoryFormValues>(
    () => ({
      name: category?.name ?? "",
    }),
    [category?.name],
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(CategorySchema),
    defaultValues: formValues,
    values: formValues,
  });

  const closeDialog = () => {
    setOpen(false);
    reset(formValues);
  };

  const onSubmit = (data: CategoryFormValues) => {
    if (category) {
      updateCategory.mutate(
        { id: category.id, payload: data },
        {
          onSuccess: () => {
            toast.success("Category updated successfully");
            closeDialog();
          },
          onError: (error) => {
            const errorMessage = extractErrorMessage(error);
            setError("root", { message: errorMessage });
            toast.error(errorMessage);
          },
        },
      );
      return;
    }

    createCategory.mutate(data, {
      onSuccess: () => {
        toast.success("Category created successfully");
        closeDialog();
      },
      onError: (error) => {
        const errorMessage = extractErrorMessage(error);
        setError("root", { message: errorMessage });
        toast.error(errorMessage);
      },
    });
  };

  return (
    <>
      <form id="category-form" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="category-form-name">
                  Category Name
                </FieldLabel>
                <Input
                  {...field}
                  id="category-form-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter category name"
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmit(onSubmit)();
                    }
                  }}
                />
                {fieldState.invalid && (
                  <AppFieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {errors.root?.message && (
            <AppFieldError>{errors.root.message}</AppFieldError>
          )}
        </FieldGroup>
      </form>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={closeDialog}
        >
          Cancel
        </Button>
        <Button disabled={isPending} type="submit" form="category-form">
          {isPending && <Loader2 className="animate-spin" />}
          {isEdit ? "Update Category" : "Create Category"}
        </Button>
      </DialogFooter>
    </>
  );
}
