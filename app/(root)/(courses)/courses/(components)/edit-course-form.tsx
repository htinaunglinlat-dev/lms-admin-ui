"use client";

import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { ImageUpload } from "@/components/custom/elements/image-upload";
import { CategorySelect } from "@/components/custom/elements/category-select";
import { AppFieldError } from "@/components/custom/elements/app-field-error";
import { extractErrorMessage } from "@/lib/error";
import { CourseType } from "@/types/course";
import { useUpdateCourse } from "@/hooks/use-course";
import {
  EditCourseFormValues,
  EditCourseSchema,
} from "@/validations/course.schema";

type EditCourseFormProps = {
  courseId: number;
  course: CourseType;
};

export default function EditCourseForm({
  courseId,
  course,
}: EditCourseFormProps) {
  const router = useRouter();
  const updateCourse = useUpdateCourse();

  const formValues = useMemo<EditCourseFormValues>(
    () => ({
      title: course.title,
      short_description: course.short_description ?? "",
      level: course.level,
      language: course.language,
      is_published: course.is_published,
      thumbnail_url: course.thumbnail_url ?? "",
      thumbnail_public_id: course.thumbnail_public_id ?? "",
      category_ids: course.categories?.map((c) => c.id) ?? [],
    }),
    [
      course.title,
      course.short_description,
      course.level,
      course.language,
      course.is_published,
      course.thumbnail_url,
      course.thumbnail_public_id,
      course.categories,
    ],
  );

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
    watch,
    setValue,
  } = useForm<EditCourseFormValues>({
    resolver: zodResolver(EditCourseSchema),
    defaultValues: formValues,
    values: formValues,
  });

  const onImageUploadSuccess = (url: string) => {
    setValue("thumbnail_url", url);
  };

  const onSubmit = (data: EditCourseFormValues) => {
    clearErrors();

    updateCourse.mutate(
      {
        id: courseId,
        payload: data,
      },
      {
        onSuccess: () => {
          toast.success("Course updated successfully");
          router.push("/courses");
        },
        onError: (error: unknown) => {
          const errorMessage = extractErrorMessage(error);
          setError("root", { message: errorMessage });
          toast.error(errorMessage);
        },
      },
    );
  };

  useEffect(() => {
    console.log("category ids", watch("category_ids"));
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Edit Course</CardTitle>
        <CardDescription>Update course details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="edit-course-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="thumbnail_url"
              control={control}
              render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-course-form-title">
                    Thumbnail
                  </FieldLabel>
                  <ImageUpload
                    endpoint="course-images"
                    fieldName="thumbnail"
                    onChange={onImageUploadSuccess}
                    value={watch("thumbnail_url")}
                  />
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-course-form-title">
                    Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="edit-course-form-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter course title"
                  />
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="short_description"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-course-form-description">
                    Short Description
                  </FieldLabel>
                  <Input
                    {...field}
                    id="edit-course-form-description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter short description"
                  />
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="level"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-course-form-level">
                    Level
                  </FieldLabel>
                  <NativeSelect
                    {...field}
                    id="edit-course-form-level"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <NativeSelectOption value="BEGINNER">
                      Beginner
                    </NativeSelectOption>
                    <NativeSelectOption value="INTERMEDIATE">
                      Intermediate
                    </NativeSelectOption>
                    <NativeSelectOption value="ADVANCED">
                      Advanced
                    </NativeSelectOption>
                  </NativeSelect>
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="language"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-course-form-language">
                    Language
                  </FieldLabel>
                  <Input
                    {...field}
                    id="edit-course-form-language"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter language (e.g. English)"
                  />
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="category_ids"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Categories</FieldLabel>
                  <CategorySelect
                    value={field.value ?? []}
                    onChange={field.onChange}
                  />
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="is_published"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-course-form-status">
                    Status
                  </FieldLabel>
                  <NativeSelect
                    value={field.value ? "true" : "false"}
                    onChange={(event) =>
                      field.onChange(event.target.value === "true")
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    id="edit-course-form-status"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <NativeSelectOption value="true">
                      Published
                    </NativeSelectOption>
                    <NativeSelectOption value="false">Draft</NativeSelectOption>
                  </NativeSelect>
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
      </CardContent>
      <CardFooter className="justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={updateCourse.isPending}
          onClick={() => router.push("/courses")}
        >
          Cancel
        </Button>
        <Button
          disabled={updateCourse.isPending}
          type="submit"
          form="edit-course-form"
        >
          {updateCourse.isPending && <Loader2 className="animate-spin" />}
          Update Course
        </Button>
      </CardFooter>
    </Card>
  );
}
