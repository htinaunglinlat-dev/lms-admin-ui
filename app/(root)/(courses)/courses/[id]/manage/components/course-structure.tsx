"use client";

import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import GenericFormDialog from "@/components/custom/elements/generic-form-dialog";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useReorderSection, useSections } from "@/hooks/use-section";
import { SectionType } from "@/types/section";
import { useQueryClient } from "@tanstack/react-query";
import CreateSectionForm from "./create-section-form";
import SortableSection from "./sortable-section";

interface CourseStructureProps {
  courseId: number;
}

export default function CourseStructure({ courseId }: CourseStructureProps) {
  const queryClient = useQueryClient();
  const [openSectionIds, setOpenSectionIds] = useState<string[]>([]);
  const [manualLastUpdated, setManualLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: sectionsData,
    isLoading: isLoadingSections,
    refetch: refetchSections,
    dataUpdatedAt: sectionsUpdatedAt,
  } = useSections({
    course_id: courseId,
    paginate: false,
  });
  const reorderSection = useReorderSection();

  const sections = sectionsData?.data || [];
  const lastUpdated =
    manualLastUpdated ??
    (sectionsUpdatedAt ? new Date(sectionsUpdatedAt) : null);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        refetchSections(),
        queryClient.invalidateQueries({ queryKey: ["lessons"] }),
      ]);
      setManualLastUpdated(new Date());
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSectionsReorder = (draggedId: number, targetIndex: number) => {
    const currentIndex = sections.findIndex(
      (section) => section.id === draggedId,
    );
    if (currentIndex === -1 || currentIndex === targetIndex) return;

    const previousSectionId =
      targetIndex > 0
        ? sections[targetIndex > currentIndex ? targetIndex : targetIndex - 1]
            ?.id
        : undefined;
    const nextSectionId =
      targetIndex < sections.length - 1
        ? sections[targetIndex < currentIndex ? targetIndex : targetIndex + 1]
            ?.id
        : undefined;

    reorderSection.mutate(
      {
        id: draggedId,
        payload: {
          previous_section_id: previousSectionId,
          next_section_id: nextSectionId,
        },
      },
      {
        onSuccess: () => {
          toast.success("Section order updated");
        },
        onError: () => {
          toast.error("Failed to update section order");
        },
      },
    );
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Course Structure
          </h1>
          <p className="text-muted-foreground mt-1">
            Drag sections to reorder. Click the grip icon to drag.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-sm text-muted-foreground">
              Last updated: {formatTime(lastUpdated)}
            </span>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </Button>
          <GenericFormDialog
            trigger={
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            }
            title="Create New Section"
            description="Add a new section to organize your course lessons."
          >
            {({ setOpen }) => (
              <CreateSectionForm
                courseId={courseId}
                onSuccess={() => setOpen(false)}
              />
            )}
          </GenericFormDialog>
        </div>
      </div>

      {isLoadingSections ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <DragDropProvider
          onDragEnd={({ canceled, operation }) => {
            if (canceled) return;

            const { source } = operation;
            if (!isSortable(source)) return;

            const { initialIndex, index: newIndex } = source.sortable;
            if (initialIndex === newIndex) return;

            const draggedSection = sections[initialIndex] as
              | SectionType
              | undefined;
            if (!draggedSection) return;

            handleSectionsReorder(draggedSection.id, newIndex);
          }}
        >
          <Accordion
            type="multiple"
            value={openSectionIds}
            onValueChange={setOpenSectionIds}
            className="w-full"
          >
            {sections.map((section, index) => (
              <SortableSection
                key={section.id}
                section={section}
                index={index}
                isOpen={openSectionIds.includes(String(section.id))}
              />
            ))}
          </Accordion>
        </DragDropProvider>
      )}

      {!isLoadingSections && sections.length === 0 && (
        <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
          <p>No sections yet. Add your first section to get started.</p>
        </div>
      )}
    </>
  );
}
