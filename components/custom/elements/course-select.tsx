"use client";

import { useCourses } from "@/hooks/use-course";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseSelectProps {
  value?: number[];
  onChange: (ids: number[]) => void;
}

export function CourseSelect({ value = [], onChange }: CourseSelectProps) {
  const { data, isPending } = useCourses({ limit: 100 });

  const courses = data?.data ?? [];

  const toggleCourse = (id: number) => {
    const isSelected = value.includes(id);
    if (isSelected) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">{value.length} selected</p>

      <div className="flex flex-wrap gap-2">
        {courses.map((course) => {
          const isSelected = value.includes(course.id);
          return (
            <button
              key={course.id}
              type="button"
              onClick={() => toggleCourse(course.id)}
              className={cn(
                "w-full rounded-lg border p-3 text-left text-sm transition-all",
                isSelected
                  ? "border-primary/30 bg-primary/5 shadow-xs"
                  : "border-border bg-background hover:bg-muted dark:bg-input/30 dark:hover:bg-input/50",
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm border transition-all",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30",
                  )}
                >
                  {isSelected && <Check className="size-3.5" />}
                </span>
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="truncate font-medium text-foreground">{course.title}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                      {course.level}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                      {course.language}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
        {courses.length === 0 && (
          <p className="text-sm text-muted-foreground">No courses available.</p>
        )}
      </div>
    </div>
  );
}
