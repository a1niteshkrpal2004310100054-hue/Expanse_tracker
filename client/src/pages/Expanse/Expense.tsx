import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { SingleExpense } from "@/components/createSingleExpanse";
import Expansetable from "@/components/expansetable";
import { api } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { setExpanse, deleteExpense } from "@/redux/singleSlice";
import type { RootState } from "@/redux/store";
import { SquarePen } from "lucide-react";
import { formatDate } from "@/lib/date";
import { Checkbox } from "@/components/ui/checkbox";
import type { Table } from "@/type";
import type { ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";

const Expense = () => {
  const dispatch = useDispatch();
  const [loading, SetLoading] = useState<boolean>(true);
  const data = useSelector((state: RootState) => state.single.expenses);

  const [open, setOpen] = useState<boolean>(false);
  const [actionOpen, setActionOpen] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [enableSelection] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/expense/get-single-expense`);
        dispatch(setExpanse(res.data.expanse));
        // setData(res.data.expanse);
        SetLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [dispatch]);

  const handleDelete = async () => {
    console.log(selectedIds);
    try {
      const res = await api.delete(`/expense/delete-expanse`, {
        data: { expenseId: selectedIds },
      });
      dispatch(deleteExpense(selectedIds));
      setSelectedIds([]);
      toast.success(res.data?.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectionChange = useCallback((ids: string[]) => {
    setSelectedIds(ids);
  }, []);
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
        return (
          <div>
            <SquarePen
              size={20}
              className="mx-auto"
              onClick={() => setActionOpen(!actionOpen)}
            />
            {actionOpen && (
              <SingleExpense
                name={"Edit Expanse"}
                mode={"edit"}
                open={actionOpen}
                onOpenChange={setActionOpen}
                expense={expense}
              />
            )}
          </div>
        );
      },
    },
  ];

  // delet method for selected Ids
  // const selectedIds = table
  //   .getFilteredSelectedRowModel()
  //   .rows.map((row) => row.original._id);
  // console.log(selectedIds);

  return (
    <>
      <section>
        <nav className="w-full h-14 bg-gray-800 px-4">
          <div className="h-full max-w-screen-xl flex flex-wrap justify-between items-center mx-auto gap-2">
            <h1>Expanse Tracker</h1>
            <div className="flex flex-wrap items-center gap-2">
              {enableSelection && (
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  Delete
                </Button>
              )}

              <Button size="sm" onClick={() => setOpen(!open)}>
                Create
              </Button>
              <SingleExpense
                name={"Create Expanse"}
                mode={"create"}
                open={open}
                onOpenChange={setOpen}
              />
            </div>
          </div>
        </nav>
        <div className="flex flex-1 ">
          {loading ? (
            <p>loading...</p>
          ) : (
            <Expansetable
              data={data}
              columns={columns}
              enableSelection={enableSelection}
              onSelectionChange={handleSelectionChange}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Expense;
