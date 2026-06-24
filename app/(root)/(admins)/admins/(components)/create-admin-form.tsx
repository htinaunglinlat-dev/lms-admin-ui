"use client";

import React, { useState } from "react";
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
  CreateAdminFormValues,
  CreateAdminSchema,
} from "@/validations/admin.schema";

type FormValues = CreateAdminFormValues;

export default function CreateAdminForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { createAdminMutation } = useAdmins();

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(CreateAdminSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "ADMIN",
    },
  });

  const onSubmit = (data: FormValues) => {
    clearErrors();

    createAdminMutation.mutate(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      },
      {
        onSuccess: () => {
          toast.success("Admin created successfully");
          router.push("/admins");
        },
        onError: () => {
          toast.error("Failed to create admin");
        },
      },
    );
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add Admin</CardTitle>
        <CardDescription>
          Create an administrator account with dashboard access.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="add-admin-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-admin-form-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="add-admin-form-name"
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
                  <FieldLabel htmlFor="add-admin-form-email">
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="add-admin-form-email"
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
                  <FieldLabel htmlFor="add-admin-form-role">Role</FieldLabel>
                  <NativeSelect
                    {...field}
                    id="add-admin-form-role"
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
                  <FieldLabel htmlFor="add-admin-form-password">
                    Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="add-admin-form-password"
                      type={showPassword ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter password"
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
                  <FieldLabel htmlFor="add-admin-form-password-confirmation">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="add-admin-form-password-confirmation"
                    type={showPassword ? "text" : "password"}
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm password"
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
          disabled={createAdminMutation.isPending}
          onClick={() => router.push("/admins")}
        >
          Cancel
        </Button>
        <Button
          disabled={createAdminMutation.isPending}
          type="submit"
          form="add-admin-form"
        >
          {createAdminMutation.isPending && (
            <Loader2 className="animate-spin" />
          )}
          Create Admin
        </Button>
      </CardFooter>
    </Card>
  );
}
