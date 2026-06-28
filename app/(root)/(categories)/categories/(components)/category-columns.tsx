"use client";

import { SortableColumnHeader } from "@/components/custom/table/sortable-column-header";
import { CategoryType } from "@/types/category";
import { ColumnDef } from "@tanstack/react-table";
import { CategoryActionMenu } from "./category-action-menu";

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
    cell: ({ row }) => <CategoryActionMenu category={row.original} />,
  },
];
