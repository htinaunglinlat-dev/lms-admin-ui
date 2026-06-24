import type { Column } from "@tanstack/react-table";
import { MoveDown, MoveUp } from "lucide-react";

interface Props<T> {
  name: string;
  column: Column<T>;
}

export function SortableColumnHeader<T>({ name, column }: Props<T>) {
  const getIsSorted = column.getIsSorted();
  // console.log("getIsSorted", getIsSorted);

  return (
    <button
      onClick={() => column.toggleSorting(getIsSorted === "asc")}
      type="button"
      className="flex items-center gap-1.5 cursor-pointer"
    >
      <span className="inline-flex items-center space-x-[-5px]">
        <MoveDown
          className={`size-2.5 shrink-0 ${
            getIsSorted === "desc" ? "text-black" : "text-gray-400"
          }`}
        />
        <MoveUp
          className={`size-2.5 shrink-0 ${
            getIsSorted === "asc" ? "text-black" : "text-gray-400"
          }`}
        />
      </span>
      {name}
    </button>
  );
}
