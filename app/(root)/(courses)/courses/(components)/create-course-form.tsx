"use client";

import React from "react";
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useCreateCourse } from "@/hooks/use-course";
import {
  CreateCourseFormValues,
  CreateCourseSchema,
} from "@/validations/course.schema";
import { ImageUpload } from "@/components/custom/elements/image-upload";
import { CategorySelect } from "@/components/custom/elements/category-select";
import { AppFieldError } from "@/components/custom/elements/app-field-error";
import { extractErrorMessage } from "@/lib/error";

export default function CreateCourseForm() {
  const router = useRouter();
  const createCourse = useCreateCourse();

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateCourseFormValues>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      title: "We Love A Me San",
      short_description: "How to train a dragon/",
      level: "BEGINNER",
      thumbnail_public_id: "",
      thumbnail_url: "https://i.ytimg.com/vi/3FK-RDJW8WY/maxresdefault.jpg",
      language: "Dragonese",
      is_published: true,
    },
  });

  const onImageUploadSuccess = (url: string) => {
    setValue("thumbnail_url", url);
  };

  const onSubmit = (data: CreateCourseFormValues) => {
    clearErrors();

    createCourse.mutate(data, {
      onSuccess: () => {
        toast.success("Course created successfully");
        router.push("/courses");
      },
      onError: (error: unknown) => {
        const errorMessage = extractErrorMessage(error);
        setError("root", { message: errorMessage });
        toast.error(errorMessage);
      },
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add Course</CardTitle>
        <CardDescription>Create a new course.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="add-course-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="thumbnail_url"
              control={control}
              render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-course-form-title">
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
                  <FieldLabel htmlFor="add-course-form-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="add-course-form-title"
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
                  <FieldLabel htmlFor="add-course-form-description">
                    Short Description
                  </FieldLabel>
                  <Input
                    {...field}
                    id="add-course-form-description"
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
                  <FieldLabel htmlFor="add-course-form-level">Level</FieldLabel>
                  <NativeSelect
                    {...field}
                    id="add-course-form-level"
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
                  <FieldLabel htmlFor="add-course-form-language">
                    Language
                  </FieldLabel>
                  <Input
                    {...field}
                    id="add-course-form-language"
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
                  <FieldLabel htmlFor="add-course-form-status">
                    Status
                  </FieldLabel>
                  <NativeSelect
                    value={field.value ? "true" : "false"}
                    onChange={(event) =>
                      field.onChange(event.target.value === "true")
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    id="add-course-form-status"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <NativeSelectOption value="true">
                      Published
                    </NativeSelectOption>
                    <NativeSelectOption value="false">Draft</NativeSelectOption>
                  </NativeSelect>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
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
          disabled={createCourse.isPending}
          onClick={() => router.push("/courses")}
        >
          Cancel
        </Button>
        <Button
          disabled={createCourse.isPending}
          type="submit"
          form="add-course-form"
        >
          {createCourse.isPending && <Loader2 className="animate-spin" />}
          Create Course
        </Button>
      </CardFooter>
    </Card>
  );
}
