"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useCreateLesson } from "@/hooks/use-lesson";
import {
  CreateLessonFormValues,
  CreateLessonSchema,
} from "@/validations/lesson.schema";
import { AppFieldError } from "@/components/custom/elements/app-field-error";
import { extractErrorMessage } from "@/lib/error";

interface CreateLessonFormProps {
  sectionId: number;
  onSuccess?: () => void;
}

export default function CreateLessonForm({
  sectionId,
  onSuccess,
}: CreateLessonFormProps) {
  const createLesson = useCreateLesson();

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<CreateLessonFormValues>({
    resolver: zodResolver(CreateLessonSchema),
    defaultValues: {
      section_id: sectionId,
      title: "",
      description: "",
      video_url: "",
      duration: 0,
      is_preview: false,
    },
  });

  const onSubmit = (data: CreateLessonFormValues) => {
    clearErrors();

    createLesson.mutate(data, {
      onSuccess: () => {
        toast.success("Lesson created successfully");
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
    <form id="create-lesson-form" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-lesson-form-title">Title</FieldLabel>
              <Input
                {...field}
                id="create-lesson-form-title"
                aria-invalid={fieldState.invalid}
                placeholder="Enter lesson title"
              />
              {fieldState.invalid && (
                <AppFieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-lesson-form-description">
                Description
              </FieldLabel>
              <Textarea
                {...field}
                id="create-lesson-form-description"
                aria-invalid={fieldState.invalid}
                placeholder="Enter lesson description"
                rows={3}
              />
              {fieldState.invalid && (
                <AppFieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="video_url"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-lesson-form-video">
                Video URL
              </FieldLabel>
              <Input
                {...field}
                id="create-lesson-form-video"
                aria-invalid={fieldState.invalid}
                placeholder="https://example.com/video.mp4"
              />
              {fieldState.invalid && (
                <AppFieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="duration"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-lesson-form-duration">
                Duration (seconds)
              </FieldLabel>
              <Input
                {...field}
                id="create-lesson-form-duration"
                type="number"
                aria-invalid={fieldState.invalid}
                placeholder="600"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {fieldState.invalid && (
                <AppFieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="is_preview"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} orientation="horizontal">
              <FieldLabel htmlFor="create-lesson-form-preview">
                Available as Preview
              </FieldLabel>
              <Switch
                id="create-lesson-form-preview"
                checked={field.value}
                onCheckedChange={field.onChange}
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
          disabled={createLesson.isPending}
          onClick={onSuccess}
        >
          Cancel
        </Button>
        <Button
          disabled={createLesson.isPending}
          type="submit"
          form="create-lesson-form"
        >
          {createLesson.isPending && (
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
          )}
          Create Lesson
        </Button>
      </div>
    </form>
  );
}
