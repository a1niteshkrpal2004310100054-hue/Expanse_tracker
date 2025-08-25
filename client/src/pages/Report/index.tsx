import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { DropDown } from "@/components/select";
import type { ReportForm } from "@/type/report";
import Expansetable from "@/components/expansetable";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { converToCSV } from "@/lib/convertToCSV";

const Report = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [reportData, setReportData] = useState([]);

  const handleClick = () => {
    setOpen(!open);
  };

  const categoryData: string[] = [
    "Food & Groceries",
    "Rent & Utilities",
    "Transportation",
    "Entertainment",
    "Health & Wellness",
    "Subscriptions",
    "Education",
  ];

  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      category: "",
      isYearly: false,
      month: "",
    },
  });

  const onSubmit: SubmitHandler<ReportForm> = async (data) => {
    const [year, month] = data.month.split("-");
    const payload = {
      ...data,
      year,
      month,
    };
    try {
      const res = await api.post(`/expense/generate-report`, payload);
      // console.log(res.data);
      setReportData(res.data.expanses);
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error("failed to generate report");
    }
  };

  const downloadCSV = () => {
    const csv = converToCSV(reportData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "monthly-expense-report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

 
  return (
    <section>
      <nav className="w-full h-14 bg-gray-800 px-4">
        <div className="h-full max-w-screen-xl flex flex-wrap justify-between items-center mx-auto gep-5">
          <h2 className="">Generate Report</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" onClick={handleClick}>
              Generate
            </Button>
            <Button onClick={downloadCSV}>Download CSV</Button>
          </div>
        </div>
      </nav>
      <div className="w-full space-y-5 mt-5 mx-auto px-4">
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
          <DialogContent className="bg-gray-800">
            <DialogHeader>
              <DialogTitle>Generate Report Form</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              id="report-form"
              className="space-y-2"
            >
              <div className="flex flex-row justify-center items-center gap-5">
                <Label htmlFor="isYearly">Yearly</Label>
                <Controller
                  name="isYearly"
                  rules={{ required: false }}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="isYearly"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />

                <Label>
                  Month
                  <Input
                    type="month"
                    {...register("month", { required: true })}
                  />
                  "
                </Label>
              </div>
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DropDown
                    data={categoryData}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </form>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button">Close</Button>
              </DialogClose>
              <Button type="submit" form="report-form">
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Data Table */}

        <Expansetable data={reportData} />
      </div>
    </section>
  );
};

export default Report;
