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
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { ImageUpload } from "@/components/custom/elements/image-upload";
import { AppFieldError } from "@/components/custom/elements/app-field-error";
import { extractErrorMessage } from "@/lib/error";
import { PaymentType } from "@/types/payment";
import { useUpdatePayment } from "@/hooks/use-payment";
import {
  EditPaymentFormValues,
  EditPaymentSchema,
} from "@/validations/payment.schema";

type EditPaymentFormProps = {
  paymentId: number;
  payment: PaymentType;
};

export default function EditPaymentForm({
  paymentId,
  payment,
}: EditPaymentFormProps) {
  const router = useRouter();
  const updatePayment = useUpdatePayment();

  const formValues = useMemo<EditPaymentFormValues>(
    () => ({
      name: payment.name,
      logo_url: payment.logo_url ?? "",
      logo_public_id: payment.logo_public_id ?? "",
      account_no: payment.account_no,
      is_active: payment.is_active,
    }),
    [
      payment.name,
      payment.logo_url,
      payment.logo_public_id,
      payment.account_no,
      payment.is_active,
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
  } = useForm<EditPaymentFormValues>({
    resolver: zodResolver(EditPaymentSchema),
    defaultValues: formValues,
    values: formValues,
  });

  const onImageUploadSuccess = (url: string) => {
    setValue("logo_url", url);
  };

  const onSubmit = (data: EditPaymentFormValues) => {
    clearErrors();

    updatePayment.mutate(
      {
        id: paymentId,
        payload: data,
      },
      {
        onSuccess: () => {
          toast.success("Payment updated successfully");
          router.push("/payments");
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
        <CardTitle>Edit Payment</CardTitle>
        <CardDescription>Update payment method details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="edit-payment-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="logo_url"
              control={control}
              render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-payment-form-logo">
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
                  <FieldLabel htmlFor="edit-payment-form-name">
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="edit-payment-form-name"
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
                  <FieldLabel htmlFor="edit-payment-form-account">
                    Account Number
                  </FieldLabel>
                  <Input
                    {...field}
                    id="edit-payment-form-account"
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
                  <FieldLabel htmlFor="edit-payment-form-status">
                    Status
                  </FieldLabel>
                  <NativeSelect
                    value={field.value ? "true" : "false"}
                    onChange={(event) =>
                      field.onChange(event.target.value === "true")
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    id="edit-payment-form-status"
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
          disabled={updatePayment.isPending}
          onClick={() => router.push("/payments")}
        >
          Cancel
        </Button>
        <Button
          disabled={updatePayment.isPending}
          type="submit"
          form="edit-payment-form"
        >
          {updatePayment.isPending && <Loader2 className="animate-spin" />}
          Update Payment
        </Button>
      </CardFooter>
    </Card>
  );
}
