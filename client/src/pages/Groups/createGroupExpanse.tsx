import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Selector from "@/components/select";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import type { SplitForm } from "@/type/index";
import CheckBox from "@/components/Checkbox";
import { api } from "@/lib/api";
import { addGroupExpanse } from "@/redux/groupSlice";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useForm,
  Controller,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";

const CreateGroupExpanse = () => {
  const dispatch = useDispatch();
  const filterGroup = useSelector(
    (state: RootState) => state.group.filterGroup
  );

  const { register, handleSubmit, control, reset } = useForm<SplitForm>({
    defaultValues: {
      amount: 0,
    },
  });

  const amount = useWatch({ control, name: "amount" });
  const split = useWatch({ control, name: "split" });

  const selectedIds = Object.entries(split || {})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, isChecked]) => isChecked)
    .map(([id]) => id);

  const perPersonAmount =
    selectedIds.length > 0 && amount > 0 ? amount / selectedIds.length : 0;

  const onSubmit: SubmitHandler<SplitForm> = async (data) => {
    const payload = {
      ...data,
      group: filterGroup[0]?._id,
      participents: filterGroup[0]?.participents.map(
        (participent) => participent._id
      ),
    };
    console.log(payload)
    try {
      const res = await api.post(`/expense/split-expense`, payload);
      console.log(res.data);
      dispatch(addGroupExpanse(res.data.expensepopulated));
      reset();
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <section>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create</Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800">
          <DialogHeader>
            <DialogTitle>Expanses</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="splitForm"
            className="w-full flex flex-col justify-center items-start gap-2"
          >
            <div className="w-full space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Title"
                {...register("title")}
              />
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="text"
                placeholder="Amount"
                {...register("amount")}
              />
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="paidBy">paidBy</Label>
              <Controller
                name="paidBy"
                control={control}
                render={({ field }) => (
                  <Selector
                    data={filterGroup[0]?.participents}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="w-full">
              <Controller
                name="split"
                control={control}
                render={({ field }) => (
                  <CheckBox
                    data={filterGroup[0]?.participents}
                    value={field.value}
                    onChange={field.onChange}
                    splitAmount={perPersonAmount}
                  />
                )}
              />
            </div>
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Close</Button>
            </DialogClose>
            <Button type="submit" form="splitForm">
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CreateGroupExpanse;
