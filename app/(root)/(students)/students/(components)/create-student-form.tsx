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
import { useCreateStudent } from "@/hooks/use-student";
import {
  CreateStudentFormValues,
  CreateStudentSchema,
} from "@/validations/student.schema";

export default function CreateStudentForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const createStudent = useCreateStudent();

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<CreateStudentFormValues>({
    resolver: zodResolver(CreateStudentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      is_active: true,
    },
  });

  const onSubmit = (data: CreateStudentFormValues) => {
    clearErrors();

    createStudent.mutate(
      {
        name: data.name,
        email: data.email,
        ...(data.phone ? { phone: data.phone } : {}),
        password: data.password,
        is_active: data.is_active,
      },
      {
        onSuccess: () => {
          toast.success("Student created successfully");
          router.push("/students");
        },
        onError: () => {
          toast.error("Failed to create student");
        },
      },
    );
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add Student</CardTitle>
        <CardDescription>Create a student account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="add-student-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-student-form-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="add-student-form-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter student name"
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
                  <FieldLabel htmlFor="add-student-form-email">
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="add-student-form-email"
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
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-student-form-phone">
                    Phone
                  </FieldLabel>
                  <Input
                    {...field}
                    id="add-student-form-phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter phone number"
                    autoComplete="tel"
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
                  <FieldLabel htmlFor="add-student-form-status">
                    Status
                  </FieldLabel>
                  <NativeSelect
                    value={field.value ? "true" : "false"}
                    onChange={(event) =>
                      field.onChange(event.target.value === "true")
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    id="add-student-form-status"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <NativeSelectOption value="true">Active</NativeSelectOption>
                    <NativeSelectOption value="false">
                      Inactive
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
                  <FieldLabel htmlFor="add-student-form-password">
                    Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="add-student-form-password"
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
                  <FieldLabel htmlFor="add-student-form-password-confirmation">
                    Confirm Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="add-student-form-password-confirmation"
                      type={showPassword ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      placeholder="Confirm password"
                      autoComplete="new-password"
                      className="pr-10"
                    />
                  </div>
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
          disabled={createStudent.isPending}
          onClick={() => router.push("/students")}
        >
          Cancel
        </Button>
        <Button
          disabled={createStudent.isPending}
          type="submit"
          form="add-student-form"
        >
          {createStudent.isPending && <Loader2 className="animate-spin" />}
          Create Student
        </Button>
      </CardFooter>
    </Card>
  );
}
