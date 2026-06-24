"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AppFieldError } from "@/components/custom/elements/app-field-error";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { extractErrorMessage } from "@/lib/error";
import { useUpdateOrder } from "@/hooks/use-order";
import { OrderType } from "@/types/order";
import {
  EditOrderFormValues,
  EditOrderSchema,
} from "@/validations/order.schema";

type EditOrderFormProps = {
  order: OrderType;
  setOpen: (open: boolean) => void;
};

export default function EditOrderForm({
  order,
  setOpen,
}: EditOrderFormProps) {
  const updateOrder = useUpdateOrder();

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    reset,
    formState: { errors },
  } = useForm<EditOrderFormValues>({
    resolver: zodResolver(EditOrderSchema),
    defaultValues: {
      status: order.status,
      note: "",
    },
  });

  const onSubmit = (data: EditOrderFormValues) => {
    clearErrors();

    updateOrder.mutate(
      { id: order.id, payload: data },
      {
        onSuccess: () => {
          toast.success("Order updated successfully");
          setOpen(false);
          reset({ status: data.status, note: "" });
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
    <>
      <form id="order-form" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="status"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="order-form-status">Status</FieldLabel>
                <NativeSelect
                  {...field}
                  id="order-form-status"
                  aria-invalid={fieldState.invalid}
                  className="w-full"
                >
                  <NativeSelectOption value="PENDING">Pending</NativeSelectOption>
                  <NativeSelectOption value="APPROVED">
                    Approved
                  </NativeSelectOption>
                  <NativeSelectOption value="REJECTED">
                    Rejected
                  </NativeSelectOption>
                </NativeSelect>
                {fieldState.invalid && (
                  <AppFieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="note"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="order-form-note">Note</FieldLabel>
                <Input
                  {...field}
                  id="order-form-note"
                  aria-invalid={fieldState.invalid}
                  placeholder="Optional review note"
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
      </form>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          disabled={updateOrder.isPending}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          disabled={updateOrder.isPending}
          type="submit"
          form="order-form"
        >
          {updateOrder.isPending && <Loader2 className="animate-spin" />}
          Update Order
        </Button>
      </DialogFooter>
    </>
  );
}
