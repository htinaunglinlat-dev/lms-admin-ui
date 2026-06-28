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
import { CourseSelect } from "@/components/custom/elements/course-select";
import { AppFieldError } from "@/components/custom/elements/app-field-error";
import { extractErrorMessage } from "@/lib/error";
import { ProductType } from "@/types/product";
import { useUpdateProduct } from "@/hooks/use-product";
import {
  EditProductFormValues,
  EditProductSchema,
} from "@/validations/product.schema";

type EditProductFormProps = {
  productId: number;
  product: ProductType;
};

export default function EditProductForm({
  productId,
  product,
}: EditProductFormProps) {
  const router = useRouter();
  const updateProduct = useUpdateProduct();

  const formValues = useMemo<EditProductFormValues>(
    () => ({
      name: product.name,
      description: product.description ?? "",
      price: product.price,
      currency: product.currency as "MMK" | "USD",
      is_active: product.is_active,
      course_id: product.courses?.[0]?.id ?? 0,
    }),
    [
      product.name,
      product.description,
      product.price,
      product.currency,
      product.is_active,
      product.courses,
    ],
  );

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<EditProductFormValues>({
    resolver: zodResolver(EditProductSchema),
    defaultValues: formValues,
    values: formValues,
  });

  const onSubmit = (data: EditProductFormValues) => {
    clearErrors();

    updateProduct.mutate(
      {
        id: productId,
        payload: data,
      },
      {
        onSuccess: () => {
          toast.success("Product updated successfully");
          router.push("/products");
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
        <CardTitle>Edit Product</CardTitle>
        <CardDescription>Update product details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="edit-product-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-product-form-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="edit-product-form-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter product name"
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
                  <FieldLabel htmlFor="edit-product-form-description">
                    Description
                  </FieldLabel>
                  <Input
                    {...field}
                    id="edit-product-form-description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter description"
                  />
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="price"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-product-form-price">
                    Price
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    id="edit-product-form-price"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter price"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="currency"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-product-form-currency">
                    Currency
                  </FieldLabel>
                  <NativeSelect
                    {...field}
                    id="edit-product-form-currency"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <NativeSelectOption value="MMK">MMK</NativeSelectOption>
                    <NativeSelectOption value="USD">USD</NativeSelectOption>
                  </NativeSelect>
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="course_id"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Course</FieldLabel>
                  <CourseSelect
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="is_active"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-product-form-status">
                    Status
                  </FieldLabel>
                  <NativeSelect
                    value={field.value ? "true" : "false"}
                    onChange={(event) =>
                      field.onChange(event.target.value === "true")
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    id="edit-product-form-status"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <NativeSelectOption value="true">Active</NativeSelectOption>
                    <NativeSelectOption value="false">
                      Inactive
                    </NativeSelectOption>
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
          disabled={updateProduct.isPending}
          onClick={() => router.push("/products")}
        >
          Cancel
        </Button>
        <Button
          disabled={updateProduct.isPending}
          type="submit"
          form="edit-product-form"
        >
          {updateProduct.isPending && <Loader2 className="animate-spin" />}
          Update Product
        </Button>
      </CardFooter>
    </Card>
  );
}
