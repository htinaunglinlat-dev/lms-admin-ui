"use client";

import { SortableColumnHeader } from "@/components/custom/table/sortable-column-header";
import { TagType } from "@/types/tag";
import { ColumnDef } from "@tanstack/react-table";
import { TagActionMenu } from "./tag-action-menu";

export const columns: ColumnDef<TagType>[] = [
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
    cell: ({ row }) => <TagActionMenu tag={row.original} />,
  },
];
