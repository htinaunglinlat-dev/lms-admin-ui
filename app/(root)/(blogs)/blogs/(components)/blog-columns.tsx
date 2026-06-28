"use client";

import { TagBadgeList } from "@/components/custom/badge/tag-badge-list";
import { PublishedBadge } from "@/components/custom/badge/published-badge";
import { SortableColumnHeader } from "@/components/custom/table/sortable-column-header";
import { formatReadableDate } from "@/lib/date";
import { BlogType } from "@/types/blog";
import { ColumnDef } from "@tanstack/react-table";
import { BlogActionMenu } from "./blog-action-menu";

export const columns: ColumnDef<BlogType>[] = [
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
    accessorKey: "excerpt",
    header: ({ column }) => {
      return <SortableColumnHeader name="Excerpt" column={column} />;
    },
    cell: ({ row }) => (
      <div className="max-w-[250px] truncate" title={row.original.excerpt}>
        {row.original.excerpt}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "view",
    header: ({ column }) => {
      return <SortableColumnHeader name="Views" column={column} />;
    },
    enableSorting: true,
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => (
      <TagBadgeList tags={row.original.tags} />
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
    cell: ({ row }) => <BlogActionMenu id={row.original.id} />,
  },
];
