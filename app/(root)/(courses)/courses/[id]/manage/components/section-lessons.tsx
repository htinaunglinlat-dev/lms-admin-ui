"use client";

import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useLessons, useReorderLesson } from "@/hooks/use-lesson";
import { LessonType } from "@/types/lesson";
import SortableLesson from "./sortable-lesson";

interface SectionLessonsProps {
  sectionId: number;
}

export default function SectionLessons({ sectionId }: SectionLessonsProps) {
  const { data: lessonsData, isLoading } = useLessons({
    section_id: sectionId,
    paginate: false,
  });
  const reorderLesson = useReorderLesson();

  const lessons = lessonsData?.data || [];

  const handleLessonsReorder = (draggedId: number, targetIndex: number) => {
    const currentIndex = lessons.findIndex((lesson) => lesson.id === draggedId);
    if (currentIndex === -1 || currentIndex === targetIndex) return;

    const previousLessonId =
      targetIndex > 0
        ? lessons[targetIndex > currentIndex ? targetIndex : targetIndex - 1]
            ?.id
        : undefined;
    const nextLessonId =
      targetIndex < lessons.length - 1
        ? lessons[targetIndex < currentIndex ? targetIndex : targetIndex + 1]
            ?.id
        : undefined;

    reorderLesson.mutate(
      {
        id: draggedId,
        payload: {
          previous_lesson_id: previousLessonId,
          next_lesson_id: nextLessonId,
        },
      },
      {
        onSuccess: () => {
          toast.success("Lesson order updated");
        },
        onError: () => {
          toast.error("Failed to update lesson order");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-2 mt-3">
        {[1, 2].map((item) => (
          <Skeleton key={item} className="h-11 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="space-y-2 mt-3">
        <p className="text-sm text-muted-foreground italic">
          No lessons in this section.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 mt-3">
      <DragDropProvider
        onDragEnd={({ canceled, operation }) => {
          if (canceled) return;

          const { source } = operation;
          if (!isSortable(source)) return;

          const { initialIndex, index: newIndex } = source.sortable;
          if (initialIndex === newIndex) return;

          const draggedLesson = lessons[initialIndex] as LessonType | undefined;
          if (!draggedLesson) return;

          handleLessonsReorder(draggedLesson.id, newIndex);
        }}
      >
        {lessons.map((lesson, lessonIndex) => (
          <SortableLesson
            key={lesson.id}
            lesson={lesson}
            index={lessonIndex}
          />
        ))}
      </DragDropProvider>
    </div>
  );
}
