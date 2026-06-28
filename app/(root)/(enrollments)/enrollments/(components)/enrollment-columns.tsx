"use client";

import { SortableColumnHeader } from "@/components/custom/table/sortable-column-header";
import { Button } from "@/components/ui/button";
import { formatReadableDate } from "@/lib/date";
import { EnrollmentType } from "@/types/enrollment";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye } from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "@/components/custom/badge/status-badge";
import { EnrollmentTypeBadge } from "@/components/custom/badge/enrollment-type-badge";
import GenericFormDialog from "@/components/custom/elements/generic-form-dialog";
import EditEnrollmentForm from "./edit-enrollment-form";
import { EnrollmentActionMenu } from "./enrollment-action-menu";

export const columns: ColumnDef<EnrollmentType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "student",
    header: "Student",
    cell: ({ row }) => row.original.student?.name ?? "-",
  },
  {
    accessorKey: "course",
    header: "Course",
    cell: ({ row }) => row.original.course?.title ?? "-",
  },
  {
    accessorKey: "enrollment_type",
    header: ({ column }) => {
      return <SortableColumnHeader name="Type" column={column} />;
    },
    cell: ({ row }) => (
      <EnrollmentTypeBadge enrollmentType={row.original.enrollment_type} />
    ),
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
    accessorKey: "enrolled_at",
    header: ({ column }) => {
      return <SortableColumnHeader name="Enrolled At" column={column} />;
    },
    cell: ({ row }) => formatReadableDate(row.original.enrolled_at),
    enableSorting: true,
  },
  {
    accessorKey: "expires_at",
    header: "Expires At",
    cell: ({ row }) =>
      row.original.expires_at
        ? formatReadableDate(row.original.expires_at)
        : "-",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <EnrollmentActionMenu enrollment={row.original} />,
  },
];
