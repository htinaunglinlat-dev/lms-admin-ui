"use client";

import { SortableColumnHeader } from "@/components/custom/table/sortable-column-header";
import { StatusBadge } from "@/components/custom/badge/status-badge";
import { Button } from "@/components/ui/button";
import { formatReadableDate } from "@/lib/date";
import { ProductType } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/currency";

export const columns: ColumnDef<ProductType>[] = [
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
    accessorKey: "price",
    header: ({ column }) => {
      return <SortableColumnHeader name="Price" column={column} />;
    },
    cell: ({ row }) => (
      <div className="text-right">
        {new Intl.NumberFormat("en-US", {
          style: "decimal",
          maximumFractionDigits: 0,
        }).format(row.original.price)}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "currency",
    header: ({ column }) => {
      return <SortableColumnHeader name="Currency" column={column} />;
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
    cell: ({ row }) => (
      <Button
        asChild
        variant="outline"
        className="text-blue-500 rounded-full size-10 hover:bg-blue-500 hover:text-white transition cursor-pointer"
        title="Edit product"
      >
        <Link href={`/products/edit/${row.original.id}`}>
          <Edit />
        </Link>
      </Button>
    ),
  },
];
