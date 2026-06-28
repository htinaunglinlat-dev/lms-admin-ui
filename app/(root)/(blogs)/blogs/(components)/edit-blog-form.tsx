"use client";

import React, { useMemo } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { ImageUpload } from "@/components/custom/elements/image-upload";
import { TagSelect } from "@/components/custom/elements/tag-select";
import { CourseSelect } from "@/components/custom/elements/course-select";
import { Tiptap } from "@/components/custom/tiptap/tiptap";
import { AppFieldError } from "@/components/custom/elements/app-field-error";
import { extractErrorMessage } from "@/lib/error";
import { BlogType } from "@/types/blog";
import { useUpdateBlog } from "@/hooks/use-blog";
import {
  BlogFormValues,
  BlogSchema,
} from "@/validations/blog.schema";

type EditBlogFormProps = {
  blogId: number;
  blog: BlogType;
};

export default function EditBlogForm({
  blogId,
  blog,
}: EditBlogFormProps) {
  const router = useRouter();
  const updateBlog = useUpdateBlog();

  const formValues = useMemo<BlogFormValues>(
    () => ({
      title: blog.title,
      excerpt: blog.excerpt ?? "",
      content: blog.content ?? "",
      cover_image_url: blog.cover_image_url ?? "",
      cover_image_public_id: blog.cover_image_public_id ?? "",
      og_image_url: blog.og_image_url ?? "",
      og_image_public_id: blog.og_image_public_id ?? "",
      is_published: blog.is_published,
      tag_ids: blog.tags?.map((t) => t.id) ?? [],
      course_ids: blog.courses?.map((c) => c.id) ?? [],
    }),
    [
      blog.title,
      blog.excerpt,
      blog.content,
      blog.cover_image_url,
      blog.cover_image_public_id,
      blog.og_image_url,
      blog.og_image_public_id,
      blog.is_published,
      blog.tags,
      blog.courses,
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
  } = useForm<BlogFormValues>({
    resolver: zodResolver(BlogSchema),
    defaultValues: formValues,
    values: formValues,
  });

  const onCoverUploadSuccess = (url: string) => {
    setValue("cover_image_url", url);
  };

  const onOgUploadSuccess = (url: string) => {
    setValue("og_image_url", url);
  };

  const onSubmit = (data: BlogFormValues) => {
    clearErrors();

    updateBlog.mutate(
      {
        id: blogId,
        payload: data,
      },
      {
        onSuccess: () => {
          toast.success("Blog post updated successfully");
          router.push("/blogs");
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
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Edit Blog</CardTitle>
        <CardDescription>Update blog details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="edit-blog-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="cover_image_url"
                control={control}
                render={({ fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Cover Image</FieldLabel>
                    <ImageUpload
                      endpoint="blog-images"
                      fieldName="cover_image"
                      onChange={onCoverUploadSuccess}
                      value={watch("cover_image_url")}
                    />
                    {fieldState.invalid && (
                      <AppFieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="og_image_url"
                control={control}
                render={({ fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>OG Image</FieldLabel>
                    <ImageUpload
                      endpoint="blog-images"
                      fieldName="og_image"
                      onChange={onOgUploadSuccess}
                      value={watch("og_image_url")}
                    />
                    {fieldState.invalid && (
                      <AppFieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-blog-form-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="edit-blog-form-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter blog title"
                  />
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="excerpt"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-blog-form-excerpt">Excerpt</FieldLabel>
                  <Textarea
                    {...field}
                    id="edit-blog-form-excerpt"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter brief excerpt"
                    rows={3}
                  />
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="content"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-blog-form-content">Content</FieldLabel>
                  <Tiptap
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Write your blog post content here..."
                  />
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="tag_ids"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tags</FieldLabel>
                  <TagSelect
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
              name="course_ids"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Related Courses</FieldLabel>
                  <CourseSelect
                    value={field.value?.[0]}
                    onChange={(id) => field.onChange(id ? [id] : [])}
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
                  <FieldLabel htmlFor="edit-blog-form-status">Status</FieldLabel>
                  <NativeSelect
                    value={field.value ? "true" : "false"}
                    onChange={(event) =>
                      field.onChange(event.target.value === "true")
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    id="edit-blog-form-status"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <NativeSelectOption value="true">Published</NativeSelectOption>
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
          disabled={updateBlog.isPending}
          onClick={() => router.push("/blogs")}
        >
          Cancel
        </Button>
        <Button
          disabled={updateBlog.isPending}
          type="submit"
          form="edit-blog-form"
        >
          {updateBlog.isPending && <Loader2 className="animate-spin" />}
          Update Blog
        </Button>
      </CardFooter>
    </Card>
  );
}
