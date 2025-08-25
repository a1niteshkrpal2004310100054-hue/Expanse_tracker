import { useState } from "react";
import {
  type ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { SquarePen } from "lucide-react";
import { formatDate } from "@/lib/date";
import type { Table } from "@/type";
import { SingleExpense } from "@/components/createSingleExpanse";

// const columns: ColumnDef<Table>[] = [
//   {
//     id: "Select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "intermediate")
//         }
//         // checked={
//         //   table.getIsAllPageRowsSelected()
//         //     ? true
//         //     : table.getIsSomePageRowsSelected()
//         //     ? "indeterminate"
//         //     : false
//         // }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="select all"
//       />
//     ),
//     cell: ({ row }) => {
//       // const expenseIds = row.original;
//       // console.log(expenseIds._id);
//       return (
//         <Checkbox
//           checked={row.getIsSelected()}
//           onCheckedChange={(value) => {
//             row.toggleSelected(!!value);

//             const selectedRows = row.getSelectedRowModel().rows;
//             console.log(selectedRows);
//           }}
//           aria-label="select row"
//         />
//       );
//     },
//   },
//   {
//     accessorKey: "category",
//     header: "Category",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("category")}</div>
//     ),
//   },
//   {
//     accessorKey: "title",
//     header: "Title",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("title")}</div>
//     ),
//   },
//   {
//     accessorKey: "amount",
//     header: "Amount",
//     cell: ({ row }) => (
//       <div className="capitalize ">{row.getValue("amount")}</div>
//     ),
//   },
//   {
//     accessorKey: "createdAt",
//     header: "CreatedAt",
//     cell: ({ row }) => {
//       const rowDate: string = row.getValue("createdAt");
//       return <div>{formatDate(rowDate)}</div>;
//     },
//   },
//   {
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => {
//       const [open, setOpen] = useState<boolean>(false);
//       const expense = row.original;
//       // console.log(expense);
//       return (
//         <div>
//           <SquarePen
//             size={20}
//             className="mx-auto"
//             onClick={() => setOpen(!open)}
//           />
//           {open && (
//             <SingleExpense
//               name={"Edit Expanse"}
//               mode={"edit"}
//               open={open}
//               onOpenChange={setOpen}
//               expense={expense}
//             />
//           )}
//         </div>
//       );
//     },
//   },
// ];

const Expansetable = ({ data }: { data: Table[] }) => {
  // const data = [
  //   { _id: 1, title: "hbvc", amount: 54 },
  //   { _id: 2, title: "vbcvb", amount: 87 },
  //   { _id: 3, title: "fghdfh", amount: 786 },
  //   { _id: 4, title: "dfhfh", amount: 456 },
  //   { _id: 5, title: "dfhh", amount: 76 },
  //   { _id: 6, title: "dghdfh", amount: 869 },
  // ];

  const [open, setOpen] = useState<boolean>(false);

  const columns: ColumnDef<Table>[] = [
    {
      id: "Select",
      header: ({ table }) => (
        <Checkbox
          // checked={
          //   table.getIsAllPageRowsSelected() ||
          //   (table.getIsSomePageRowsSelected() && "intermediate")
          // }
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="select all"
        />
      ),
      cell: ({ row }) => {
        // const expenseIds = row.original;
        // console.log(expenseIds._id);
        return (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
            }}
            aria-label="select row"
          />
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("category")}</div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <div className="capitalize ">{row.getValue("amount")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "CreatedAt",
      cell: ({ row }) => {
        const rowDate: string = row.getValue("createdAt");
        return <div>{formatDate(rowDate)}</div>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const expense = row.original;
        // console.log(expense);
        return (
          <div>
            <SquarePen
              size={20}
              className="mx-auto"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <SingleExpense
                name={"Edit Expanse"}
                mode={"edit"}
                open={open}
                onOpenChange={setOpen}
                expense={expense}
              />
            )}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // delet method for selected Ids
  // const selectedIds = table
  //   .getFilteredSelectedRowModel()
  //   .rows.map((row) => row.original._id);
  // console.log(selectedIds);

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
