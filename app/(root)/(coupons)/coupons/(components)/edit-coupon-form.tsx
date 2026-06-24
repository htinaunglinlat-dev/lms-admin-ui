"use client";

import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, RefreshCw } from "lucide-react";
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
import { AppFieldError } from "@/components/custom/elements/app-field-error";
import { extractErrorMessage } from "@/lib/error";
import { CouponType } from "@/types/coupon";
import { useGenerateCouponCode, useUpdateCoupon } from "@/hooks/use-coupon";
import {
  EditCouponFormValues,
  EditCouponSchema,
} from "@/validations/coupon.schema";
import { cn } from "@/lib/utils";

type EditCouponFormProps = {
  couponId: number;
  coupon: CouponType;
};

export default function EditCouponForm({
  couponId,
  coupon,
}: EditCouponFormProps) {
  const router = useRouter();
  const updateCoupon = useUpdateCoupon();
  const generateCode = useGenerateCouponCode();

  const formValues = useMemo<EditCouponFormValues>(
    () => ({
      code: coupon.code,
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value,
      max_uses: coupon.max_uses,
      expires_at: coupon.expires_at ? new Date(coupon.expires_at) : undefined,
      is_active: coupon.is_active,
    }),
    [
      coupon.code,
      coupon.discount_type,
      coupon.discount_value,
      coupon.max_uses,
      coupon.expires_at,
      coupon.is_active,
    ],
  );

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    setValue,
    formState: { errors },
  } = useForm<EditCouponFormValues>({
    resolver: zodResolver(EditCouponSchema),
    defaultValues: formValues,
    values: formValues,
  });

  const handleGenerateCode = () => {
    generateCode.mutate(undefined, {
      onSuccess: (response) => {
        setValue("code", response.data.code);
      },
      onError: (error: unknown) => {
        toast.error(extractErrorMessage(error));
      },
    });
  };

  const onSubmit = (data: EditCouponFormValues) => {
    clearErrors();

    updateCoupon.mutate(
      {
        id: couponId,
        payload: data,
      },
      {
        onSuccess: () => {
          toast.success("Coupon updated successfully");
          router.push("/coupons");
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
        <CardTitle>Edit Coupon</CardTitle>
        <CardDescription>Update coupon details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="edit-coupon-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="code"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-coupon-form-code">Code</FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      {...field}
                      id="edit-coupon-form-code"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter coupon code"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      disabled={generateCode.isPending}
                      onClick={handleGenerateCode}
                      title="Generate random code"
                    >
                      <RefreshCw
                        className={cn(
                          "size-4",
                          generateCode.isPending && "animate-spin",
                        )}
                      />
                      {"Generate"}
                    </Button>
                  </div>
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="discount_type"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-coupon-form-type">
                    Discount Type
                  </FieldLabel>
                  <NativeSelect
                    {...field}
                    id="edit-coupon-form-type"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <NativeSelectOption value="FIXED">
                      Fixed Amount
                    </NativeSelectOption>
                    <NativeSelectOption value="PERCENTAGE">
                      Percentage
                    </NativeSelectOption>
                  </NativeSelect>
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="discount_value"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-coupon-form-value">
                    Discount Value
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    id="edit-coupon-form-value"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter discount value"
                  />
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="max_uses"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-coupon-form-max-uses">
                    Max Uses
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                    id="edit-coupon-form-max-uses"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter max uses"
                  />
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="expires_at"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-coupon-form-expires-at">
                    Expires At
                  </FieldLabel>
                  <Input
                    type="datetime-local"
                    value={
                      field.value
                        ? field.value instanceof Date
                          ? field.value.toISOString().slice(0, 16)
                          : ""
                        : ""
                    }
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? new Date(e.target.value) : undefined,
                      )
                    }
                    id="edit-coupon-form-expires-at"
                    aria-invalid={fieldState.invalid}
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
                  <FieldLabel htmlFor="edit-coupon-form-active">
                    Active
                  </FieldLabel>
                  <NativeSelect
                    value={field.value ? "true" : "false"}
                    onChange={(event) =>
                      field.onChange(event.target.value === "true")
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    id="edit-coupon-form-active"
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
          disabled={updateCoupon.isPending}
          onClick={() => router.push("/coupons")}
        >
          Cancel
        </Button>
        <Button
          disabled={updateCoupon.isPending}
          type="submit"
          form="edit-coupon-form"
        >
          {updateCoupon.isPending && <Loader2 className="animate-spin" />}
          Update Coupon
        </Button>
      </CardFooter>
    </Card>
  );
}
