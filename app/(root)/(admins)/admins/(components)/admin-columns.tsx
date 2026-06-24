"use client";

import { StatusBadge } from "@/components/custom/badge/status-badge";
import ActionMenu from "@/components/custom/table-action-menu/action-menu";
import { SortableColumnHeader } from "@/components/custom/table/sortable-column-header";
import { formatReadableDate } from "@/lib/date";
import { AdminUserType } from "@/types/admin";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<AdminUserType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <SortableColumnHeader name="ID" column={column} />;
    },
    enableSorting: true,
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
    accessorKey: "role",
    header: ({ column }) => {
      return <SortableColumnHeader name="Role" column={column} />;
    },
    enableSorting: true,
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
    cell: ({ row }) => {
      const id = row.original.id;
      return <ActionMenu currentRoleId={id} />;
    },
  },
];
