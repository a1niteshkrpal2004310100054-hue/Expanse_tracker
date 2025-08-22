import { IndianRupee } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import type { Participents } from "@/type";

type Props = {
  data: Participents[];
  value: Record<string, boolean>;
  onChange: (val: Record<string, boolean>) => void;
  splitAmount: number;
};

const CheckBox = ({ data, value, onChange, splitAmount }: Props) => {
  const handleCheckChange = (id: string) => {
    onChange({
      ...value,
      [id]: !value[id],
    });
  };

  const isAllSelected =
    data?.length > 0 && data?.every((item) => value?.[item._id] === true);

  const handleSelectAll = (val: boolean) => {
    const updated: Record<string, boolean> = {};
    data.forEach((item) => {
      updated[item._id] = val;
    });
    onChange(updated);
  };

  return (
    <section className="w-full p-4">
      {/* Select All Row */}
      <div className="flex items-center gap-2 mb-2">
        <Checkbox
          id="selectAll"
          checked={isAllSelected}
          onCheckedChange={handleSelectAll}
        />
        <Label htmlFor="selectAll" className="text-white">
          Split
        </Label>
      </div>

      {/* Individual Rows */}
      <div className="flex flex-col gap-2">
        {data?.map((item) => {
          const isChecked = !!value?.[item._id];
          return (
            <div
              key={item._id}
              className="flex items-center justify-between w-full py-1 bg-gray-800 rounded"
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`check-${item._id}`}
                  checked={!!value?.[item._id]}
                  onCheckedChange={() => handleCheckChange(item._id)}
                />
                <Label htmlFor={`check-${item._id}`} className="text-white">
                  {item.name}
                </Label>
              </div>

              <span className="flex items-center gap-1 text-white text-sm">
                <IndianRupee size={14} />
                {isChecked ? splitAmount.toFixed(2) : "00"}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CheckBox;
