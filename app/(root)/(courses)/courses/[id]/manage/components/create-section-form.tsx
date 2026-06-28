"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCreateSection } from "@/hooks/use-section";
import {
  CreateSectionFormValues,
  CreateSectionSchema,
} from "@/validations/section.schema";
import { AppFieldError } from "@/components/custom/elements/app-field-error";
import { extractErrorMessage } from "@/lib/error";

interface CreateSectionFormProps {
  courseId: number;
  onSuccess?: () => void;
}

export default function CreateSectionForm({ courseId, onSuccess }: CreateSectionFormProps) {
  const createSection = useCreateSection();

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<CreateSectionFormValues>({
    resolver: zodResolver(CreateSectionSchema),
    defaultValues: {
      course_id: courseId,
      title: "",
    },
  });

  const onSubmit = (data: CreateSectionFormValues) => {
    clearErrors();

    createSection.mutate(data, {
      onSuccess: () => {
        toast.success("Section created successfully");
        onSuccess?.();
      },
      onError: (error: unknown) => {
        const errorMessage = extractErrorMessage(error);
        setError("root", { message: errorMessage });
        toast.error(errorMessage);
      },
    });
  };

  return (
    <form id="create-section-form" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-section-form-title">Title</FieldLabel>
              <Input
                {...field}
                id="create-section-form-title"
                aria-invalid={fieldState.invalid}
                placeholder="Enter section title"
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

      <div className="flex justify-end gap-3 mt-6">
        <Button
          type="button"
          variant="outline"
          disabled={createSection.isPending}
          onClick={onSuccess}
        >
          Cancel
        </Button>
        <Button
          disabled={createSection.isPending}
          type="submit"
          form="create-section-form"
        >
          {createSection.isPending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
          Create Section
        </Button>
      </div>
    </form>
  );
}
