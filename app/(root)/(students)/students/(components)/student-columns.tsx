"use client";

import { StatusBadge } from "@/components/custom/badge/status-badge";
import { SortableColumnHeader } from "@/components/custom/table/sortable-column-header";
import { Button } from "@/components/ui/button";
import { formatReadableDate } from "@/lib/date";
import { StudentType } from "@/types/student";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";

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
    cell: ({ row }) => (
      <Button
        asChild
        variant="outline"
        className="text-blue-500 rounded-full size-10 hover:bg-blue-500 hover:text-white transition cursor-pointer"
        title="Edit student"
      >
        <Link href={`/students/edit/${row.original.id}`}>
          <Edit />
        </Link>
      </Button>
    ),
  },
];
