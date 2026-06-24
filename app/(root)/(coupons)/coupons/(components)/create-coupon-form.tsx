"use client";

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
import { useCreateCoupon, useGenerateCouponCode } from "@/hooks/use-coupon";
import {
  CreateCouponFormValues,
  CreateCouponSchema,
} from "@/validations/coupon.schema";
import { cn } from "@/lib/utils";

export default function CreateCouponForm() {
  const router = useRouter();
  const createCoupon = useCreateCoupon();
  const generateCode = useGenerateCouponCode();

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    setValue,
    formState: { errors },
  } = useForm<CreateCouponFormValues>({
    resolver: zodResolver(CreateCouponSchema),
    defaultValues: {
      code: "",
      discount_type: "FIXED",
      discount_value: 0,
    },
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

  const onSubmit = (data: CreateCouponFormValues) => {
    clearErrors();

    createCoupon.mutate(data, {
      onSuccess: () => {
        toast.success("Coupon created successfully");
        router.push("/coupons");
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
        <CardTitle>Add Coupon</CardTitle>
        <CardDescription>Create a new coupon.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="add-coupon-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="code"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-coupon-form-code">Code</FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      {...field}
                      id="add-coupon-form-code"
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
                  <FieldLabel htmlFor="add-coupon-form-type">
                    Discount Type
                  </FieldLabel>
                  <NativeSelect
                    {...field}
                    id="add-coupon-form-type"
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
                  <FieldLabel htmlFor="add-coupon-form-value">
                    Discount Value
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    id="add-coupon-form-value"
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
                  <FieldLabel htmlFor="add-coupon-form-max-uses">
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
                    id="add-coupon-form-max-uses"
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
                  <FieldLabel htmlFor="add-coupon-form-expires-at">
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
                    id="add-coupon-form-expires-at"
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
                  <FieldLabel htmlFor="add-coupon-form-active">
                    Active
                  </FieldLabel>
                  <NativeSelect
                    value={field.value ? "true" : "false"}
                    onChange={(event) =>
                      field.onChange(event.target.value === "true")
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    id="add-coupon-form-active"
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
          disabled={createCoupon.isPending}
          onClick={() => router.push("/coupons")}
        >
          Cancel
        </Button>
        <Button
          disabled={createCoupon.isPending}
          type="submit"
          form="add-coupon-form"
        >
          {createCoupon.isPending && <Loader2 className="animate-spin" />}
          Create Coupon
        </Button>
      </CardFooter>
    </Card>
  );
}
