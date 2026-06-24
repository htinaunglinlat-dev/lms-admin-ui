"use client";

import React, { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
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
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { AppFieldError } from "@/components/custom/elements/app-field-error";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useAdmins } from "@/hooks/use-admin";
import {
  EditAdminFormValues,
  EditAdminSchema,
} from "@/validations/admin.schema";
import { AdminUserType } from "@/types/admin";

type FormValues = EditAdminFormValues;

type EditAdminFormProps = {
  adminId: number;
  admin: AdminUserType;
};

export default function EditAdminForm({ adminId, admin }: EditAdminFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { updateAdminMutation } = useAdmins();

  console.log("admin", admin);

  const formValues = useMemo<FormValues>(
    () => ({
      name: admin.name,
      email: admin.email,
      password: "",
      password_confirmation: "",
      role: admin.role,
    }),
    [admin.email, admin.name, admin.role],
  );

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(EditAdminSchema),
    defaultValues: formValues,
    values: formValues,
  });

  const onSubmit = (data: FormValues) => {
    clearErrors();

    const payload: Omit<EditAdminFormValues, "password_confirmation"> = {
      name: data.name,
      email: data.email,
      role: data.role,
      ...(data.password ? { password: data.password } : {}),
    };

    updateAdminMutation.mutate(
      {
        id: adminId,
        data: payload,
      },
      {
        onSuccess: () => {
          toast.success("Admin updated successfully");
          router.push("/admins");
        },
        onError: () => {
          toast.error("Failed to update admin");
        },
      },
    );
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Edit Admin</CardTitle>
        <CardDescription>
          Update administrator account details and access role.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="edit-admin-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-admin-form-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="edit-admin-form-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter admin name"
                    autoComplete="name"
                  />
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-admin-form-email">
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="edit-admin-form-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter email address"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="role"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-admin-form-role">Role</FieldLabel>
                  <NativeSelect
                    {...field}
                    id="edit-admin-form-role"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <NativeSelectOption value="ADMIN">Admin</NativeSelectOption>
                    <NativeSelectOption value="SUPER_ADMIN">
                      Super Admin
                    </NativeSelectOption>
                  </NativeSelect>
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-admin-form-password">
                    Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="edit-admin-form-password"
                      type={showPassword ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      placeholder="Leave blank to keep current password"
                      autoComplete="new-password"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-1 size-8 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password_confirmation"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-admin-form-password-confirmation">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="edit-admin-form-password-confirmation"
                    type={showPassword ? "text" : "password"}
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
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
      </CardContent>
      <CardFooter className="justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={updateAdminMutation.isPending}
          onClick={() => router.push("/admins")}
        >
          Cancel
        </Button>
        <Button
          disabled={updateAdminMutation.isPending}
          type="submit"
          form="edit-admin-form"
        >
          {updateAdminMutation.isPending && (
            <Loader2 className="animate-spin" />
          )}
          Update Admin
        </Button>
      </CardFooter>
    </Card>
  );
}
