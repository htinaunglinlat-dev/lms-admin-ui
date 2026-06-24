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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useCreateEnrollment } from "@/hooks/use-enrollment";
import {
  CreateEnrollmentFormValues,
  CreateEnrollmentSchema,
} from "@/validations/enrollment.schema";
import { AppFieldError } from "@/components/custom/elements/app-field-error";
import { extractErrorMessage } from "@/lib/error";
import { useStudents } from "@/hooks/use-student";
import { useCourses } from "@/hooks/use-course";

export default function CreateEnrollmentForm() {
  const router = useRouter();
  const createEnrollment = useCreateEnrollment();
  const { data: studentsData, isLoading: isLoadingStudents } = useStudents({
    limit: 1000,
  });
  const { data: coursesData, isLoading: isLoadingCourses } = useCourses({
    limit: 1000,
  });

  const students = studentsData?.data ?? [];
  const courses = coursesData?.data ?? [];

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<CreateEnrollmentFormValues>({
    resolver: zodResolver(CreateEnrollmentSchema),
    defaultValues: {
      student_id: 0,
      course_id: 0,
      enrollment_type: "FREE",
      is_active: true,
    },
  });

  const onSubmit = (data: CreateEnrollmentFormValues) => {
    clearErrors();

    createEnrollment.mutate(data, {
      onSuccess: () => {
        toast.success("Enrollment created successfully");
        router.push("/enrollments");
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
        <CardTitle>Add Enrollment</CardTitle>
        <CardDescription>Create a new enrollment.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="add-enrollment-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="student_id"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-enrollment-form-student-id">
                    Student
                  </FieldLabel>
                  <NativeSelect
                    value={String(field.value)}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    id="add-enrollment-form-student-id"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                    disabled={isLoadingStudents}
                  >
                    <NativeSelectOption value="">
                      {isLoadingStudents ? "Loading..." : "Select student"}
                    </NativeSelectOption>
                    {students.map((student) => (
                      <NativeSelectOption
                        key={student.id}
                        value={String(student.id)}
                      >
                        {student.name} - {student.email} -{" "}
                        {student.is_active ? "active" : "inactive"}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="course_id"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-enrollment-form-course-id">
                    Course
                  </FieldLabel>
                  <NativeSelect
                    value={String(field.value)}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    id="add-enrollment-form-course-id"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                    disabled={isLoadingCourses}
                  >
                    <NativeSelectOption value="">
                      {isLoadingCourses ? "Loading..." : "Select course"}
                    </NativeSelectOption>
                    {courses.map((course) => (
                      <NativeSelectOption
                        key={course.id}
                        value={String(course.id)}
                      >
                        {course.title} ({course.level})
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  {fieldState.invalid && (
                    <AppFieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="enrollment_type"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-enrollment-form-type">
                    Enrollment Type
                  </FieldLabel>
                  <NativeSelect
                    {...field}
                    id="add-enrollment-form-type"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <NativeSelectOption value="FREE">Free</NativeSelectOption>
                    <NativeSelectOption value="GIVEAWAY">
                      Giveaway
                    </NativeSelectOption>
                  </NativeSelect>
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
                  <FieldLabel htmlFor="add-enrollment-form-status">
                    Status
                  </FieldLabel>
                  <NativeSelect
                    value={field.value ? "true" : "false"}
                    onChange={(event) =>
                      field.onChange(event.target.value === "true")
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    id="add-enrollment-form-status"
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
          disabled={createEnrollment.isPending}
          onClick={() => router.push("/enrollments")}
        >
          Cancel
        </Button>
        <Button
          disabled={createEnrollment.isPending}
          type="submit"
          form="add-enrollment-form"
        >
          {createEnrollment.isPending && <Loader2 className="animate-spin" />}
          Create Enrollment
        </Button>
      </CardFooter>
    </Card>
  );
}
