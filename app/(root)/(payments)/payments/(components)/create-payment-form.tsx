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
import { useCreatePayment } from "@/hooks/use-payment";
import {
  CreatePaymentFormValues,
  CreatePaymentSchema,
} from "@/validations/payment.schema";
import { ImageUpload } from "@/components/custom/elements/image-upload";
import { AppFieldError } from "@/components/custom/elements/app-field-error";
import { extractErrorMessage } from "@/lib/error";

export default function CreatePaymentForm() {
  const router = useRouter();
  const createPayment = useCreatePayment();

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreatePaymentFormValues>({
    resolver: zodResolver(CreatePaymentSchema),
    defaultValues: {
      name: "",
      account_no: "",
      is_active: true,
    },
  });

  const onImageUploadSuccess = (url: string) => {
    setValue("logo_url", url);
  };

  const onSubmit = (data: CreatePaymentFormValues) => {
    clearErrors();

    createPayment.mutate(data, {
      onSuccess: () => {
        toast.success("Payment created successfully");
        router.push("/payments");
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
        <CardTitle>Add Payment</CardTitle>
        <CardDescription>Create a new payment method.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="add-payment-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="logo_url"
              control={control}
              render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-payment-form-logo">
                    Logo
                  </FieldLabel>
                  <ImageUpload
                    endpoint="payment-images"
                    fieldName="logo"
                    onChange={onImageUploadSuccess}
                    value={watch("logo_url")}
                  />
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-payment-form-name">
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="add-payment-form-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter payment name"
                  />
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="account_no"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-payment-form-account">
                    Account Number
                  </FieldLabel>
                  <Input
                    {...field}
                    id="add-payment-form-account"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter account number"
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
                  <FieldLabel htmlFor="add-payment-form-status">
                    Status
                  </FieldLabel>
                  <NativeSelect
                    value={field.value ? "true" : "false"}
                    onChange={(event) =>
                      field.onChange(event.target.value === "true")
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    id="add-payment-form-status"
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
          disabled={createPayment.isPending}
          onClick={() => router.push("/payments")}
        >
          Cancel
        </Button>
        <Button
          disabled={createPayment.isPending}
          type="submit"
          form="add-payment-form"
        >
          {createPayment.isPending && <Loader2 className="animate-spin" />}
          Create Payment
        </Button>
      </CardFooter>
    </Card>
  );
}
