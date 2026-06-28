"use client";

import { CategoryBadgeList } from "@/components/custom/badge/category-badge-list";
import { PublishedBadge } from "@/components/custom/badge/published-badge";
import { SortableColumnHeader } from "@/components/custom/table/sortable-column-header";
import { Button } from "@/components/ui/button";
import { formatReadableDate } from "@/lib/date";
import { CourseType } from "@/types/course";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, ListPlus } from "lucide-react";
import Link from "next/link";
import { CourseActionMenu } from "./course-action-menu";

export const columns: ColumnDef<CourseType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <SortableColumnHeader name="Title" column={column} />;
    },
    enableSorting: true,
  },
  {
    accessorKey: "level",
    header: ({ column }) => {
      return <SortableColumnHeader name="Level" column={column} />;
    },
    enableSorting: true,
  },
  {
    accessorKey: "language",
    header: ({ column }) => {
      return <SortableColumnHeader name="Language" column={column} />;
    },
    enableSorting: true,
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => (
      <CategoryBadgeList categories={row.original.categories} />
    ),
  },
  {
    accessorKey: "is_published",
    header: ({ column }) => {
      return <SortableColumnHeader name="Status" column={column} />;
    },
    cell: ({ row }) => (
      <PublishedBadge isPublished={row.original.is_published} />
    ),
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
    cell: ({ row }) => <CourseActionMenu id={row.original.id} />,
  },
];
