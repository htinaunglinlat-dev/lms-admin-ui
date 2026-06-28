"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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
import { useRouter } from "next/navigation";
import { useUpdateEnrollment } from "@/hooks/use-enrollment";
import { extractErrorMessage } from "@/lib/error";
import { EnrollmentType } from "@/types/enrollment";
import {
  EditEnrollmentSchema,
  EditEnrollmentFormValues,
} from "@/validations/enrollment.schema";

type EditEnrollmentFormProps = {
  enrollment: EnrollmentType;
  setOpen?: (open: boolean) => void;
};

export default function EditEnrollmentForm({
  enrollment,
  setOpen,
}: EditEnrollmentFormProps) {
  const router = useRouter();
  const updateEnrollment = useUpdateEnrollment();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditEnrollmentFormValues>({
    resolver: zodResolver(EditEnrollmentSchema),
    defaultValues: {
      is_active: enrollment.is_active,
      expires_at: enrollment.expires_at
        ? new Date(enrollment.expires_at)
        : undefined,
      completed_at: enrollment.completed_at
        ? new Date(enrollment.completed_at)
        : undefined,
    },
  });

  const onSubmit = (data: EditEnrollmentFormValues) => {
    updateEnrollment.mutate(
      { id: enrollment.id, payload: data },
      {
        onSuccess: () => {
          toast.success("Enrollment updated successfully");
          if (setOpen) {
            setOpen(false);
          } else {
            router.push("/enrollments");
          }
        },
        onError: (error: unknown) => {
          const errorMessage = extractErrorMessage(error);
          toast.error(errorMessage);
        },
      },
    );
  };

  return (
    <>
      <form id="edit-enrollment-form" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="is_active"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-enrollment-status">Status</FieldLabel>
                <NativeSelect
                  value={field.value ? "true" : "false"}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                  onBlur={field.onBlur}
                  name={field.name}
                  id="edit-enrollment-status"
                  aria-invalid={fieldState.invalid}
                  className="w-full"
                >
                  <NativeSelectOption value="true">Active</NativeSelectOption>
                  <NativeSelectOption value="false">Inactive</NativeSelectOption>
                </NativeSelect>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="expires_at"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-enrollment-expires-at">
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
                  id="edit-enrollment-expires-at"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="completed_at"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-enrollment-completed-at">
                  Completed At
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
                  id="edit-enrollment-completed-at"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() =>
            setOpen ? setOpen(false) : router.push("/enrollments")
          }
          disabled={updateEnrollment.isPending}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="edit-enrollment-form"
          disabled={updateEnrollment.isPending}
        >
          {updateEnrollment.isPending && (
            <Loader2 className="animate-spin mr-2" />
          )}
          Save
        </Button>
      </DialogFooter>
    </>
  );
}
