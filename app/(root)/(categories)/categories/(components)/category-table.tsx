"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { columns } from "@/app/(root)/(categories)/categories/(components)/category-columns";
import CategoryFormDialog from "@/app/(root)/(categories)/categories/(components)/category-form-dialog";
import { DebounceInput } from "@/components/custom/elements/debounce-input";
import { DataTable } from "@/components/custom/table/data-table";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/use-category";
import { CategoryQueryType, CategorySortableField } from "@/types/category";

export default function CategoryTable() {
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

  const query = useMemo<CategoryQueryType>(() => {
    const sort = sorting[0];

    return {
      ...(searchInput && { search: searchInput }),
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      ...(sort && {
        sort_by: sort.id as CategorySortableField,
        sort_direction: sort.desc ? "desc" : "asc",
      }),
    };
  }, [pagination.pageIndex, pagination.pageSize, searchInput, sorting]);

  const { data, isPending } = useCategories(query);
  const pageCount = useMemo(() => data?.meta?.total_page ?? 1, [data]);
  const totalRowCount = useMemo(() => data?.meta?.total ?? 0, [data]);

  return (
    <div>
      <div className="flex gap-5">
        <DebounceInput
          value={searchInput}
          onDebouncedChange={setSearchInput}
          placeholder="Search categories ..."
        />
        <CategoryFormDialog
          trigger={
            <Button>
              <Plus />
              Add Category
            </Button>
          }
        />
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
