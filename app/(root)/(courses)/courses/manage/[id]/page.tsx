"use client";

import React, { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Grip, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Lesson {
  id: string;
  title: string;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

function SortableSection({
  section,
  index,
}: {
  section: Section;
  index: number;
}) {
  const { ref, handleRef, isDragging } = useSortable({
    id: section.id,
    index,
  });

  return (
    <div
      ref={ref}
      className={`border rounded-lg mb-3 bg-card transition-all shadow-sm ${
        isDragging ? "opacity-50 shadow-lg scale-[1.02]" : "opacity-100"
      } hover:shadow-md`}
    >
      <AccordionItem value={section.id} className="border-b-0">
        <div className="flex items-center px-4 gap-3">
          <div
            ref={handleRef}
            className="cursor-grab active:cursor-grabbing p-1.5 rounded-md text-muted-foreground select-none hover:bg-muted hover:text-foreground transition-colors"
          >
            <Grip className="h-5 w-5" />
          </div>

          <AccordionTrigger className="flex-1 py-4 hover:no-underline font-semibold text-left">
            {section.title}
          </AccordionTrigger>

          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <AccordionContent className="px-6 pb-4 pt-0 border-t bg-muted/30">
          <div className="space-y-2 mt-3">
            {section.lessons.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                No lessons in this section.
              </p>
            ) : (
              section.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-3 bg-background border rounded-md shadow-sm text-sm text-foreground hover:bg-muted/50 transition-colors"
                >
                  <span>{lesson.title}</span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-foreground"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}

export default function ManageCourseStructure() {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "section-1",
      title: "01. Getting Started with Prisma",
      lessons: [
        { id: "l1", title: "Database Schema Setup" },
        { id: "l2", title: "Running Migrations" },
      ],
    },
    {
      id: "section-2",
      title: "02. Authentication Setup",
      lessons: [{ id: "l3", title: "Configuring Supabase Auth Tokens" }],
    },
  ]);

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Course Structure</h1>
        <p className="text-muted-foreground mt-1">
          Drag sections to reorder. Click the grip icon to drag.
        </p>
      </div>

      <DragDropProvider
        onDragEnd={({ canceled, operation }) => {
          if (canceled) return;

          const { source } = operation;
          if (!isSortable(source)) return;

          const { initialIndex, index } = source.sortable;
          if (initialIndex === index) return;

          setSections((prev) => {
            const updated = [...prev];
            const [movedSection] = updated.splice(initialIndex, 1);
            updated.splice(index, 0, movedSection);
            return updated;
          });
        }}
      >
        <Accordion type="multiple" className="w-full">
          {sections.map((section, index) => (
            <SortableSection key={section.id} section={section} index={index} />
          ))}
        </Accordion>
      </DragDropProvider>

      {sections.length === 0 && (
        <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
          <p>No sections yet. Add your first section to get started.</p>
        </div>
      )}
    </div>
  );
}
