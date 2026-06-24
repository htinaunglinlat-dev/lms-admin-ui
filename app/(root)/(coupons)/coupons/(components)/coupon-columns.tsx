"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";
import { SortableColumnHeader } from "@/components/custom/table/sortable-column-header";
import { Button } from "@/components/ui/button";
import { formatReadableDate } from "@/lib/date";
import { CouponType } from "@/types/coupon";
import { StatusBadge } from "@/components/custom/badge/status-badge";
import { DiscountTypeBadge } from "@/components/custom/badge/discount-type-badge";

export const columns: ColumnDef<CouponType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "code",
    header: ({ column }) => {
      return <SortableColumnHeader name="Code" column={column} />;
    },
    enableSorting: true,
  },
  {
    accessorKey: "discount_value",
    header: ({ column }) => {
      return <SortableColumnHeader name="Value" column={column} />;
    },
    enableSorting: true,
  },
  {
    accessorKey: "discount_type",
    header: ({ column }) => {
      return <SortableColumnHeader name="Type" column={column} />;
    },
    cell: ({ row }) => (
      <DiscountTypeBadge discountType={row.original.discount_type} />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "max_uses",
    header: ({ column }) => {
      return <SortableColumnHeader name="Max Uses" column={column} />;
    },
    enableSorting: true,
  },
  {
    accessorKey: "used_count",
    header: ({ column }) => {
      return <SortableColumnHeader name="Used" column={column} />;
    },
    enableSorting: true,
  },
  {
    accessorKey: "expires_at",
    header: ({ column }) => {
      return <SortableColumnHeader name="Expires At" column={column} />;
    },
    cell: ({ row }) => formatReadableDate(row.original.expires_at),
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
        title="Edit coupon"
      >
        <Link href={`/coupons/edit/${row.original.id}`}>
          <Edit />
        </Link>
      </Button>
    ),
  },
];
