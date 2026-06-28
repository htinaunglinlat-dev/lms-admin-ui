"use client";

import { useSortable } from "@dnd-kit/react/sortable";
import { ChevronDown, Grip, Pencil, Plus, Trash2 } from "lucide-react";
import GenericFormDialog from "@/components/custom/elements/generic-form-dialog";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionType } from "@/types/section";
import CreateLessonForm from "./create-lesson-form";
import CreateSectionForm from "./create-section-form";
import SectionLessons from "./section-lessons";

interface SortableSectionProps {
  section: SectionType;
  index: number;
  isOpen: boolean;
}

export default function SortableSection({
  section,
  index,
  isOpen,
}: SortableSectionProps) {
  const { ref, handleRef, isDragging } = useSortable({
    id: section.id,
    index,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "border rounded-lg mb-3 bg-card transition-all shadow-sm hover:shadow-md",
        isDragging ? "opacity-50 shadow-lg scale-[1.02]" : "opacity-100",
      )}
    >
      <AccordionItem value={String(section.id)} className="border-b-0">
        <div className="flex items-center px-4 gap-3">
          <div
            ref={handleRef}
            className="cursor-grab active:cursor-grabbing p-1.5 rounded-md text-muted-foreground select-none hover:bg-muted hover:text-foreground transition-colors"
          >
            <Grip className="h-5 w-5" />
          </div>

          <AccordionTrigger
            hideIcon
            className="flex-1 py-2 hover:no-underline font-semibold text-left"
          >
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center h-6 w-6 rounded-md bg-muted text-muted-foreground group-data-[state=open]/accordion-item:bg-primary group-data-[state=open]/accordion-item:text-primary-foreground transition-colors">
                <ChevronDown className="h-4 w-4 group-data-[state=open]/accordion-item:rotate-180 transition-transform" />
              </span>
              {section.title}
            </div>
          </AccordionTrigger>

          <div className="flex items-center gap-0.5 ml-auto">
            <GenericFormDialog
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              }
              title="Edit Section"
              description="Update the section title."
            >
              {({ setOpen }) => (
                <CreateSectionForm
                  courseId={section.course_id}
                  onSuccess={() => setOpen(false)}
                />
              )}
            </GenericFormDialog>
            <GenericFormDialog
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              }
              title="Create New Lesson"
              description="Add a new lesson to this section."
            >
              {({ setOpen }) => (
                <CreateLessonForm
                  sectionId={section.id}
                  onSuccess={() => setOpen(false)}
                />
              )}
            </GenericFormDialog>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={() => {
                // TODO: Implement delete section handler
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <AccordionContent className="px-6 pb-4 pt-0 border-t bg-muted/30">
          {isOpen && <SectionLessons sectionId={section.id} />}
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
