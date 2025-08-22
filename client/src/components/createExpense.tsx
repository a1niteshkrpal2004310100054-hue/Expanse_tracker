import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { api } from "@/lib/api";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getNewGroup } from "@/redux/groupSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type Participents = {
  name: string;
};
interface SplitInput {
  title: string;
  participents: Participents[] | null;
}

const Create = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState<Participents[]>([{ name: "" }]);

  const handleChange = (
    index: number,
    field: keyof Participents,
    value: string
  ) => {
    const updated = [...inputs];
    updated[index] = { ...updated[index], [field]: value };
    setInputs(updated);
  };

  const addInput = () => {
    setInputs([...inputs, { name: "" }]);
  };

  const removeIndex = (index: number) => {
    // const updated = inputs.filter((_, i) => i != index);
    setInputs((prev) => prev.filter((_, i) => i != index));
  };

  // console.log(inputs);
  const { handleSubmit, register, reset } = useForm<SplitInput>({
    defaultValues: {
      title: "",
      participents: null,
    },
  });

  const onSubmit: SubmitHandler<SplitInput> = async (data) => {
    const payload = {
      ...data,
      participents: inputs,
    };
    // console.log(payload);
    try {
      const res = await api.post(`/expense/create-group`, payload);
      dispatch(getNewGroup(res.data.groups));
      toast.success(res.data.message);
      reset();
      setInputs([{ name: "" }]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create</Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800">
          <DialogHeader>
            <DialogTitle>Create Expanse</DialogTitle>
          </DialogHeader>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-2"
              id="Split-form"
            >
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                placeholder="Enter Title"
                {...register("title")}
              />
              <Label htmlFor="participents">Participents</Label>
              {inputs.map((value, index) => (
                <>
                  <div className="relative space-y-1">
                    <Input
                      key={index}
                      value={value.name}
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value)
                      }
                      placeholder="participents name"
                    />
                    {inputs.length > 1 && (
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => removeIndex(index)}
                        size="icon"
                        className="absolute top-0 right-0 p-0 cursor-pointer hover:bg-none"
                      >
                        <X />
                      </Button>
                    )}
                  </div>
                </>
              ))}
              <Button
                type="button"
                onClick={() => addInput()}
                className="mx-auto"
              >
                Add Participents
              </Button>
            </form>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="text-black">
                Cancel
              </Button>
            </DialogClose>
            <Button form="Split-form" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Create;
