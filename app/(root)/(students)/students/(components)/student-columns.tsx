"use client";

import { StatusBadge } from "@/components/custom/badge/status-badge";
import { SortableColumnHeader } from "@/components/custom/table/sortable-column-header";
import { formatReadableDate } from "@/lib/date";
import { StudentType } from "@/types/student";
import { ColumnDef } from "@tanstack/react-table";
import { StudentActionMenu } from "./student-action-menu";

export const columns: ColumnDef<StudentType>[] = [
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
    accessorKey: "email",
    header: ({ column }) => {
      return <SortableColumnHeader name="Email" column={column} />;
    },
    enableSorting: true,
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => {
      return <SortableColumnHeader name="Status" column={column} />;
    },
    cell: ({ row }) => <StatusBadge isActive={row.original.is_active} />,
    enableSorting: true,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return <SortableColumnHeader name="Created At" column={column} />;
    },
    cell: ({ row }) => formatReadableDate(row.original.created_at),
    enableSorting: true,
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <StudentActionMenu id={row.original.id} />,
  },
];
