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
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          asChild
          variant="outline"
          className="text-emerald-600 rounded-full size-10 hover:bg-emerald-600 hover:text-white transition cursor-pointer"
          title="Manage list items"
        >
          <Link href={`/courses/manage/${row.original.id}`}>
            <ListPlus />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="text-blue-500 rounded-full size-10 hover:bg-blue-500 hover:text-white transition cursor-pointer"
          title="Edit course"
        >
          <Link href={`/courses/edit/${row.original.id}`}>
            <Edit />
          </Link>
        </Button>
      </div>
    ),
  },
];
