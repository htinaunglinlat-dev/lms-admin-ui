"use client";

import { columns } from "@/app/(root)/(admins)/admins/(components)/admin-columns";
import { DebounceInput } from "@/components/custom/elements/debounce-input";
import { DataTable } from "@/components/custom/table/data-table";
import { Button } from "@/components/ui/button";
import { useAdmins } from "@/hooks/use-admin";
import { AdminQueryType, AdminSortableField } from "@/types/admin";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function AdminTable() {
  const { adminListQuery } = useAdmins();

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

  const query = useMemo<AdminQueryType>(() => {
    const sort = sorting[0];

    return {
      ...(searchInput && { search: searchInput }),
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      ...(sort && {
        sort_by: sort.id as AdminSortableField,
        sort_direction: sort.desc ? "desc" : "asc",
      }),
    };
  }, [sorting, pagination, searchInput]);

  const { data, isPending } = adminListQuery(query);

  const adminListData = data?.data;

  const pageCount = useMemo(() => data?.meta?.total_page ?? 1, [data]);

  const totalRowCount = useMemo(() => data?.meta?.total ?? 0, [data]);

  return (
    <div className="">
      <div className="flex gap-5">
        <DebounceInput
          value={searchInput}
          onDebouncedChange={setSearchInput}
          placeholder="Search something ..."
        />
        <Button asChild>
          <Link href="/admins/create">
            <Plus />
            Add Admin
          </Link>
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={adminListData}
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
