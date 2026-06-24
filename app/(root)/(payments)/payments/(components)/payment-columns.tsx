"use client";

import { ActiveBadge } from "@/components/custom/badge/active-badge";
import { SortableColumnHeader } from "@/components/custom/table/sortable-column-header";
import { Button } from "@/components/ui/button";
import { formatReadableDate } from "@/lib/date";
import { PaymentType } from "@/types/payment";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<PaymentType>[] = [
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
    accessorKey: "logo_url",
    header: "Logo",
    cell: ({ row }) =>
      row.original.logo_url ? (
        <img
          src={row.original.logo_url}
          alt="Logo"
          className="w-10 h-10 rounded-xs"
        />
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    accessorKey: "account_no",
    header: "Account No",
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => {
      return <SortableColumnHeader name="Status" column={column} />;
    },
    cell: ({ row }) => <ActiveBadge isActive={row.original.is_active} />,
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
        title="Edit payment"
      >
        <Link href={`/payments/edit/${row.original.id}`}>
          <Edit />
        </Link>
      </Button>
    ),
  },
];
