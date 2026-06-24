"use client";

import { useCategories } from "@/hooks/use-category";
import { Check, Loader2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CategoryFormDialog from "@/app/(root)/(categories)/categories/(components)/category-form-dialog";

interface CategorySelectProps {
  value?: number[];
  onChange: (ids: number[]) => void;
}

export function CategorySelect({ value = [], onChange }: CategorySelectProps) {
  const { data, isLoading } = useCategories();

  const categories = data?.data ?? [];

  const toggleCategory = (id: number) => {
    const isSelected = value.includes(id);
    if (isSelected) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  if (isLoading) {
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
        {categories.map((category) => {
          const isSelected = value.includes(category.id);
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => toggleCategory(category.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all",
                isSelected
                  ? "border-primary/30 bg-primary/5 text-primary shadow-xs"
                  : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground dark:bg-input/30 dark:hover:bg-input/50",
              )}
            >
              <span
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-sm border transition-all",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30",
                )}
              >
                {isSelected && <Check className="size-3" />}
              </span>
              {category.name}
            </button>
          );
        })}
        {categories.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No categories available.
          </p>
        )}
      </div>

      <CategoryFormDialog
        trigger={
          <Button type="button" variant="outline" size="sm">
            <Plus className="size-3" />
            Add Category
          </Button>
        }
      />
    </div>
  );
}
