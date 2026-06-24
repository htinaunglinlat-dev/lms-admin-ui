"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { columns } from "@/app/(root)/(coupons)/coupons/(components)/coupon-columns";
import { DebounceInput } from "@/components/custom/elements/debounce-input";
import { DataTable } from "@/components/custom/table/data-table";
import { Button } from "@/components/ui/button";
import { useCoupons } from "@/hooks/use-coupon";
import { CouponQueryType, CouponSortableField } from "@/types/coupon";

export default function CouponTable() {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "created_at",
      desc: false,
    },
  ]);
  const [searchInput, setSearchInput] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useMemo<CouponQueryType>(() => {
    const sort = sorting[0];

    return {
      ...(searchInput && { search: searchInput }),
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      ...(sort && {
        sort_by: sort.id as CouponSortableField,
        sort_direction: sort.desc ? "desc" : "asc",
      }),
    };
  }, [pagination.pageIndex, pagination.pageSize, searchInput, sorting]);

  const { data, isPending } = useCoupons(query);
  const pageCount = useMemo(() => data?.meta?.total_page ?? 1, [data]);
  const totalRowCount = useMemo(() => data?.meta?.total ?? 0, [data]);

  return (
    <div>
      <div className="flex gap-5">
        <DebounceInput
          value={searchInput}
          onDebouncedChange={setSearchInput}
          placeholder="Search coupons ..."
        />
        <Button asChild>
          <Link href="/coupons/create">
            <Plus />
            Add Coupon
          </Link>
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={data?.data}
        isPending={isPending}
        sorting={sorting}
        setSorting={setSorting}
        pagination={pagination}
        setPagination={setPagination}
        pageCount={pageCount}
        totalRowCount={totalRowCount}
      />
    </div>
  );
}
