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
import { useCreateProduct } from "@/hooks/use-product";
import {
  CreateProductFormValues,
  CreateProductSchema,
} from "@/validations/product.schema";
import { CourseSelect } from "@/components/custom/elements/course-select";
import { AppFieldError } from "@/components/custom/elements/app-field-error";
import { extractErrorMessage } from "@/lib/error";

export default function CreateProductForm() {
  const router = useRouter();
  const createProduct = useCreateProduct();

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<CreateProductFormValues>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      currency: "MMK",
      is_active: true,
      course_id: 0,
    },
  });

  const onSubmit = (data: CreateProductFormValues) => {
    clearErrors();

    createProduct.mutate(data, {
      onSuccess: () => {
        toast.success("Product created successfully");
        router.push("/products");
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
        <CardTitle>Add Product</CardTitle>
        <CardDescription>Create a new product.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="add-product-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-product-form-name">
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="add-product-form-name"
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
                  <FieldLabel htmlFor="add-product-form-description">
                    Description
                  </FieldLabel>
                  <Input
                    {...field}
                    id="add-product-form-description"
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
                  <FieldLabel htmlFor="add-product-form-price">
                    Price
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    id="add-product-form-price"
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
                  <FieldLabel htmlFor="add-product-form-currency">
                    Currency
                  </FieldLabel>
                  <NativeSelect
                    {...field}
                    id="add-product-form-currency"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <NativeSelectOption value="MMK">
                      MMK
                    </NativeSelectOption>
                    <NativeSelectOption value="USD">
                      USD
                    </NativeSelectOption>
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
                  <FieldLabel htmlFor="add-product-form-status">
                    Status
                  </FieldLabel>
                  <NativeSelect
                    value={field.value ? "true" : "false"}
                    onChange={(event) =>
                      field.onChange(event.target.value === "true")
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    id="add-product-form-status"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <NativeSelectOption value="true">
                      Active
                    </NativeSelectOption>
                    <NativeSelectOption value="false">Inactive</NativeSelectOption>
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
          disabled={createProduct.isPending}
          onClick={() => router.push("/products")}
        >
          Cancel
        </Button>
        <Button
          disabled={createProduct.isPending}
          type="submit"
          form="add-product-form"
        >
          {createProduct.isPending && <Loader2 className="animate-spin" />}
          Create Product
        </Button>
      </CardFooter>
    </Card>
  );
}
