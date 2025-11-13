import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination() {
  return (
    <div className="flex justify-end gap-[1rem] py-[1rem]">
      <button className=" w-[3rem] h-[3rem] items-center flex bg-gray-200  justify-center rounded-full text-[1.4rem]">
        <ChevronLeft size={20} />
      </button>{" "}
      <div className="w-[3rem] h-[3rem] text-[1.4rem] text-white flex items-center justify-center rounded-full bg-blue-600">
        02
      </div>
      <button className=" w-[3rem] h-[3rem] items-center flex bg-gray-200  justify-center rounded-full text-[1.4rem]">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export default Pagination;
