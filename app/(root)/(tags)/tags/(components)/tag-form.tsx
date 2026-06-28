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
import { TagType } from "@/types/tag";
import {
  TagFormValues,
  TagSchema,
} from "@/validations/tag.schema";
import { useCreateTag, useUpdateTag } from "@/hooks/use-tag";
import { extractErrorMessage } from "@/lib/error";

type TagFormProps = {
  tag?: TagType;
  setOpen: (open: boolean) => void;
};

export default function TagForm({ tag, setOpen }: TagFormProps) {
  const createTag = useCreateTag();
  const updateTag = useUpdateTag();
  const isEdit = Boolean(tag);
  const isPending = createTag.isPending || updateTag.isPending;

  const formValues = useMemo<TagFormValues>(
    () => ({
      name: tag?.name ?? "",
    }),
    [tag?.name],
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<TagFormValues>({
    resolver: zodResolver(TagSchema),
    defaultValues: formValues,
    values: formValues,
  });

  const closeDialog = () => {
    setOpen(false);
    reset(formValues);
  };

  const onSubmit = (data: TagFormValues) => {
    if (tag) {
      updateTag.mutate(
        { id: tag.id, payload: data },
        {
          onSuccess: () => {
            toast.success("Tag updated successfully");
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

    createTag.mutate(data, {
      onSuccess: () => {
        toast.success("Tag created successfully");
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
      <form id="tag-form" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="tag-form-name">
                  Tag Name
                </FieldLabel>
                <Input
                  {...field}
                  id="tag-form-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter tag name"
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
        <Button disabled={isPending} type="submit" form="tag-form">
          {isPending && <Loader2 className="animate-spin" />}
          {isEdit ? "Update Tag" : "Create Tag"}
        </Button>
      </DialogFooter>
    </>
  );
}
