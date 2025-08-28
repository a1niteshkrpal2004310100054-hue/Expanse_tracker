import { SelectPortal } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Participents } from "@/type/index";

type SelectProps = {
  data: Participents[];
  value: string;
  onChange: (value: string) => void;
};

const Selector = ({ data, value, onChange }: SelectProps) => {
  return (
    <>
      <Select value={value ?? ""} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="select" />
        </SelectTrigger>
        <SelectContent className=" bg-gray-800 capitalize">
          <SelectGroup>
            {data?.map((data, index) => (
              <SelectItem key={index} value={data._id} className="capitalize">
                {data.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default Selector;

interface DropDownProps {
  data: string[];
  value: string;
  onChange: (value: string) => void;
}
export const DropDown = ({ data, value, onChange }: DropDownProps) => {
  return (
    <>
      <Select value={value ?? ""} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="select" className="text-white" />
        </SelectTrigger>
        <SelectPortal container={document.getElementById("dialog-portal-root")}>
          <SelectContent className=" bg-gray-800 capitalize">
            <SelectGroup>
              {data?.map((data, index) => (
                <SelectItem
                  key={index}
                  value={data}
                  className="capitalize text-white"
                >
                  {data}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </SelectPortal>
      </Select>
    </>
  );
};
