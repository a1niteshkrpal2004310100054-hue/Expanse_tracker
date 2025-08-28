import {
  type ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import type { Table } from "@/type";
import { useEffect } from "react";

interface TableProps {
  data: Table[];
  columns: ColumnDef<Table>[];
  enableSelection?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
}

const Expansetable = ({
  data,
  columns,
  enableSelection = false,
  onSelectionChange,
}: TableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: enableSelection,
  });

  useEffect(() => {
    if (!enableSelection || !onSelectionChange) return;

    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original._id);

    onSelectionChange(selectedIds);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableSelection, onSelectionChange, table.getSelectedRowModel()]);

  return (
    <>
      <section className="w-full mt-5">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-700 h-10">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="[&>tr:nth-child(even)]:bg-gray-800 space-y-10 ">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="h-5">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-white text-center text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Expansetable;
