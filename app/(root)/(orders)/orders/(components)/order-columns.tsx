"use client";

import { formatValue } from "@/app/(root)/(orders)/orders/(components)/order-format";
import { SortableColumnHeader } from "@/components/custom/table/sortable-column-header";
import { Button } from "@/components/ui/button";
import { formatReadableDate } from "@/lib/date";
import { OrderType } from "@/types/order";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/currency";
import { OrderStatusBadge } from "@/components/custom/badge/order-status-badge";
import OrderFormDialog from "@/app/(root)/(orders)/orders/(components)/order-form-dialog";
import { ZoomedImage } from "@/components/custom/elements/zoomed-image";

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <SortableColumnHeader name="ID" column={column} />;
    },
    enableSorting: true,
  },
  {
    accessorKey: "proofImages",
    header: "Proof",
    cell: ({ row }) => {
      const images = row.original.proofImages;
      if (!images?.length) {
        return <span className="text-muted-foreground text-xs">—</span>;
      }
      return <ZoomedImage src={images[0].url} width={40} height={40} />;
    },
    enableSorting: false,
  },
  {
    accessorKey: "student.name",
    header: "Student",
    cell: ({ row }) => (
      <div className="min-w-36">
        <div className="font-medium">
          {formatValue(row.original.student?.name)}
        </div>
        <div className="text-xs text-muted-foreground">
          {formatValue(row.original.student?.email)}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "product.name",
    header: "Product",
    cell: ({ row }) => formatValue(row.original.product?.name),
  },
  {
    accessorKey: "payment.name",
    header: "Payment",
    cell: ({ row }) => formatValue(row.original.payment?.name),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return <SortableColumnHeader name="Amount" column={column} />;
    },
    cell: ({ row }) => (
      <div className="text-right">
        {formatCurrency(row.original.amount, row.original.currency)}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "discount_amount",
    header: ({ column }) => {
      return <SortableColumnHeader name="Discount" column={column} />;
    },
    cell: ({ row }) => (
      <div className="text-right">
        {formatCurrency(row.original.discount_amount, row.original.currency)}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <SortableColumnHeader name="Status" column={column} />;
    },
    cell: ({ row }) => <OrderStatusBadge order_status={row.original.status} />,
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
          className="text-slate-600 rounded-full size-10 hover:bg-slate-600 hover:text-white transition cursor-pointer"
          title="View order"
        >
          <Link href={`/orders/detail/${row.original.id}`}>
            <Eye />
          </Link>
        </Button>
        <OrderFormDialog
          order={row.original}
          trigger={
            <Button
              variant="outline"
              className="text-blue-500 rounded-full size-10 hover:bg-blue-500 hover:text-white transition cursor-pointer"
              title="Edit order"
            >
              <Edit />
            </Button>
          }
        />
      </div>
    ),
  },
];
