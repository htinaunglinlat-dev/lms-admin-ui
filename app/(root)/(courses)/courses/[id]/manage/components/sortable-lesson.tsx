import GenericFormDialog from "@/components/custom/elements/generic-form-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LessonType } from "@/types/lesson";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import EditLessonForm from "./edit-lesson-form";
import { useSortable } from "@dnd-kit/react/sortable";

export default function SortableLesson({
  lesson,
  index,
}: {
  lesson: LessonType;
  index: number;
}) {
  const { ref, handleRef, isDragging } = useSortable({
    id: lesson.id,
    index,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between p-3 bg-background border rounded-md shadow-sm text-sm text-foreground hover:bg-muted/50 transition-colors",
        isDragging ? "opacity-80 shadow-lg" : "opacity-100",
      )}
    >
      <div className="flex items-center gap-2">
        <div
          ref={handleRef}
          className="cursor-grab active:cursor-grabbing p-1 rounded-md text-muted-foreground select-none hover:bg-muted hover:text-foreground transition-colors"
        >
          <GripVertical className="h-4 w-4" />
        </div>
        <span>{lesson.title}</span>
      </div>
      <div className="flex items-center gap-1">
        <GenericFormDialog
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          }
          title="Edit Lesson"
          description="Update the lesson details."
        >
          {({ setOpen }) => (
            <EditLessonForm lesson={lesson} onSuccess={() => setOpen(false)} />
          )}
        </GenericFormDialog>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive cursor-pointer"
          onClick={() => {
            // TODO: Implement delete lesson handler
          }}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
