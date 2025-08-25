import { useEffect } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { api } from "@/lib/api";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addCreatedExpanse, updateExpense } from "@/redux/singleSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { DropDown } from "@/components/select";
import type { SIngleInputs, SingleExpenseProps } from "@/type";

export function SingleExpense({
  name,
  mode = "create",
  expense,
  open,
  onOpenChange,
}: SingleExpenseProps) {
  const dispatch = useDispatch();
  const { handleSubmit, register, control, reset } = useForm<SIngleInputs>({
    defaultValues: {
      title: "",
      amount: null,
      category: "",
      description: "",
      paymentMethod: "",
    },
  });

  // Pre-fill form in edit mode
  useEffect(() => {
    if (mode === "edit" && expense) {
      reset(expense);
    }
  }, [expense, reset, mode]);

  const data: string[] = [
    "Food & Groceries",
    "Rent & Utilities",
    "Transportation",
    "Entertainment",
    "Health & Wellness",
    "Subscriptions",
    "Education",
  ];

  const onSubmit: SubmitHandler<SIngleInputs> = async (formData) => {
    try {
      let res;
      if (mode === "edit" && expense?._id) {
        res = await api.patch(`/expense/edit-expanse/${expense._id}`, formData);
        dispatch(updateExpense(res.data.updatedExpanse));
        toast.success("Expense updated");
      } else {
        res = await api.post(`/expense/single-expense`, formData);
        dispatch(addCreatedExpanse(res.data.expense));
        toast.success(res.data.message);
      }

      reset();
      onOpenChange?.(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800">
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit Expense" : name}</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-2"
          onSubmit={handleSubmit(onSubmit)}
          id="single"
        >
          <Label htmlFor="category">Category</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <DropDown
                data={data}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Label htmlFor="title">Title</Label>
          <Input type="text" placeholder="Enter Title" {...register("title")} />
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" type="number" {...register("amount")} />

          <Label htmlFor="description">Description</Label>
          <Input id="description" type="text" {...register("description")} />
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Input
            id="paymentMethod"
            type="text"
            {...register("paymentMethod")}
          />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="text-black"
              onClick={() => handleReset()}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button form="single" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
