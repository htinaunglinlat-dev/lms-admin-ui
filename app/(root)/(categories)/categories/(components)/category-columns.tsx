"use client";

import CategoryFormDialog from "@/app/(root)/(categories)/categories/(components)/category-form-dialog";
import { SortableColumnHeader } from "@/components/custom/table/sortable-column-header";
import { Button } from "@/components/ui/button";
import { CategoryType } from "@/types/category";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";

export const columns: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <SortableColumnHeader name="Name" column={column} />;
    },
    enableSorting: true,
  },
  {
    accessorKey: "slug",
    header: ({ column }) => {
      return <SortableColumnHeader name="Slug" column={column} />;
    },
    enableSorting: true,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return <SortableColumnHeader name="Created At" column={column} />;
    },
    enableSorting: true,
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return <SortableColumnHeader name="Updated At" column={column} />;
    },
    enableSorting: true,
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => (
      <CategoryFormDialog
        category={row.original}
        trigger={
          <Button
            variant="outline"
            className="text-blue-500 rounded-full size-10 hover:bg-blue-500 hover:text-white transition cursor-pointer"
            title="Edit category"
          >
            <Edit />
          </Button>
        }
      />
    ),
  },
];
