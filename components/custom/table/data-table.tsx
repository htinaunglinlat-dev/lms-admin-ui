"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { DataTablePagination } from "./data-table-pagination";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | undefined;
  isPending: boolean;
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  pageCount: number;
  totalRowCount?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isPending,
  sorting,
  setSorting,
  pagination,
  setPagination,
  pageCount,
  totalRowCount = 0,
}: DataTableProps<TData, TValue>) {
  useEffect(() => {
    console.log("sorting status", sorting);
  }, [sorting]);

  const tableData = useMemo(() => data ?? [], [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    manualSorting: true,
    enableMultiSort: false,
    manualPagination: true,
    pageCount: pageCount,
  });

  return (
    <div>
      <div className="flex w-full items-center justify-between px-2">
        <div
          className={cn(
            "text-sm font-medium text-gray-500 dark:text-gray-400",
            isPending && "invisible",
          )}
          aria-hidden={isPending}
        >
          Results:{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalRowCount}
          </span>{" "}
          total rows
        </div>

        <DataTablePagination
          pageIndex={pagination.pageIndex}
          pageCount={pageCount || 1}
          canNextPage={table.getCanNextPage()}
          canPreviousPage={table.getCanPreviousPage()}
          onNextPage={() => table.nextPage()}
          onPreviousPage={() => table.previousPage()}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isPending ? (
              /* Show loading indicator when the data fetch is active */
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-80 text-center"
                >
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin text-muted-foreground" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              /* Render rows when pending state finishes and data exists */
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              /* Show empty fallback state when no data matches the queries */
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Table Footer - Pagination */}
      <DataTablePagination
        pageIndex={pagination.pageIndex}
        pageCount={pageCount || 1}
        canNextPage={table.getCanNextPage()}
        canPreviousPage={table.getCanPreviousPage()}
        onNextPage={() => table.nextPage()}
        onPreviousPage={() => table.previousPage()}
      />
    </div>
  );
}
