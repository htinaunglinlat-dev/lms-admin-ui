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
import { useUpdateLesson } from "@/hooks/use-lesson";
import {
  EditLessonFormValues,
  EditLessonSchema,
} from "@/validations/lesson.schema";
import { AppFieldError } from "@/components/custom/elements/app-field-error";
import { extractErrorMessage } from "@/lib/error";
import { LessonType } from "@/types/lesson";

interface EditLessonFormProps {
  lesson: LessonType;
  onSuccess?: () => void;
}

export default function EditLessonForm({
  lesson,
  onSuccess,
}: EditLessonFormProps) {
  const updateLesson = useUpdateLesson();

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<EditLessonFormValues>({
    resolver: zodResolver(EditLessonSchema),
    defaultValues: {
      title: lesson.title,
      description: lesson.description,
      video_url: lesson.video_url,
      duration: lesson.duration,
      is_preview: lesson.is_preview,
    },
  });

  const onSubmit = (data: EditLessonFormValues) => {
    clearErrors();

    updateLesson.mutate(
      { id: lesson.id, payload: data },
      {
        onSuccess: () => {
          toast.success("Lesson updated successfully");
          onSuccess?.();
        },
        onError: (error: unknown) => {
          const errorMessage = extractErrorMessage(error);
          setError("root", { message: errorMessage });
          toast.error(errorMessage);
        },
      },
    );
  };

  return (
    <form id="edit-lesson-form" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="edit-lesson-form-title">Title</FieldLabel>
              <Input
                {...field}
                id="edit-lesson-form-title"
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
              <FieldLabel htmlFor="edit-lesson-form-description">
                Description
              </FieldLabel>
              <Textarea
                {...field}
                id="edit-lesson-form-description"
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
              <FieldLabel htmlFor="edit-lesson-form-video">
                Video URL
              </FieldLabel>
              <Input
                {...field}
                id="edit-lesson-form-video"
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
              <FieldLabel htmlFor="edit-lesson-form-duration">
                Duration (seconds)
              </FieldLabel>
              <Input
                {...field}
                id="edit-lesson-form-duration"
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
              <FieldLabel htmlFor="edit-lesson-form-preview">
                Available as Preview
              </FieldLabel>
              <Switch
                id="edit-lesson-form-preview"
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
          disabled={updateLesson.isPending}
          onClick={onSuccess}
        >
          Cancel
        </Button>
        <Button
          disabled={updateLesson.isPending}
          type="submit"
          form="edit-lesson-form"
        >
          {updateLesson.isPending && (
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
          )}
          Update Lesson
        </Button>
      </div>
    </form>
  );
}
