"use client";

import { useCourses } from "@/hooks/use-course";
import { Loader2 } from "lucide-react";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

interface CourseSelectProps {
  value?: number;
  onChange: (id: number | undefined) => void;
}

export function CourseSelect({ value, onChange }: CourseSelectProps) {
  const { data, isPending } = useCourses({ limit: 100 });

  const courses = data?.data ?? [];

  if (isPending) {
    return (
      <div className="flex items-center gap-2 py-2">
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Loading courses...</span>
      </div>
    );
  }

  return (
    <NativeSelect
      value={value ?? ""}
      onChange={(e) => {
        const val = e.target.value;
        onChange(val ? Number(val) : undefined);
      }}
      className="w-full"
    >
      <NativeSelectOption value="">Select a course...</NativeSelectOption>
      {courses.map((course) => (
        <NativeSelectOption key={course.id} value={course.id}>
          {course.title} ({course.level} - {course.language})
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
}
