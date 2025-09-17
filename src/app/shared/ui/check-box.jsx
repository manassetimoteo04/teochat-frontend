import clsx from "clsx";
import { Check } from "lucide-react";

function CheckBox({ value, setValue }) {
  return (
    <div
      onClick={setValue}
      className={clsx(
        "bg-gray-100  flex items-center justify-center text-white cursor-pointer hover:bg-gray-200 rounded-xl w-[2rem] h-[2rem]",
        value && "!bg-blue-500"
      )}
    >
      {value && <Check size={15} />}
    </div>
  );
}

export default CheckBox;
