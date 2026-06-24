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
import { StudentType } from "@/types/student";
import { useUpdateStudent } from "@/hooks/use-student";
import {
  EditStudentFormValues,
  EditStudentSchema,
} from "@/validations/student.schema";

type EditStudentFormProps = {
  studentId: number;
  student: StudentType;
};

export default function EditStudentForm({
  studentId,
  student,
}: EditStudentFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const updateStudent = useUpdateStudent();

  const formValues = useMemo<EditStudentFormValues>(
    () => ({
      name: student.name,
      email: student.email,
      phone: student.phone ?? "",
      password: "",
      password_confirmation: "",
      is_active: student.is_active,
    }),
    [student.email, student.is_active, student.name, student.phone],
  );

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<EditStudentFormValues>({
    resolver: zodResolver(EditStudentSchema),
    defaultValues: formValues,
    values: formValues,
  });

  const onSubmit = (data: EditStudentFormValues) => {
    clearErrors();

    updateStudent.mutate(
      {
        id: studentId,
        payload: {
          name: data.name,
          email: data.email,
          ...(data.phone ? { phone: data.phone } : {}),
          ...(data.password ? { password: data.password } : {}),
          is_active: data.is_active,
        },
      },
      {
        onSuccess: () => {
          toast.success("Student updated successfully");
          router.push("/students");
        },
        onError: () => {
          toast.error("Failed to update student");
        },
      },
    );
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Edit Student</CardTitle>
        <CardDescription>Update student account details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="edit-student-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-student-form-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="edit-student-form-name"
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
                  <FieldLabel htmlFor="edit-student-form-email">
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="edit-student-form-email"
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
                  <FieldLabel htmlFor="edit-student-form-phone">
                    Phone
                  </FieldLabel>
                  <Input
                    {...field}
                    id="edit-student-form-phone"
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
                  <FieldLabel htmlFor="edit-student-form-status">
                    Status
                  </FieldLabel>
                  <NativeSelect
                    value={field.value ? "true" : "false"}
                    onChange={(event) =>
                      field.onChange(event.target.value === "true")
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    id="edit-student-form-status"
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
                  <FieldLabel htmlFor="edit-student-form-password">
                    Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="edit-student-form-password"
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
          disabled={updateStudent.isPending}
          onClick={() => router.push("/students")}
        >
          Cancel
        </Button>
        <Button
          disabled={updateStudent.isPending}
          type="submit"
          form="edit-student-form"
        >
          {updateStudent.isPending && <Loader2 className="animate-spin" />}
          Update Student
        </Button>
      </CardFooter>
    </Card>
  );
}
