import { Download, FileText } from "lucide-react";

export function AttachmentsCard() {
  return (
    <div className="border hover:border-main-color cursor-pointer gap-[1rem] flex items-center text-secondary-text-color border-gray-100 p-[1rem] rounded-xl ">
      <span>
        <FileText />
      </span>
      <div>
        <span className="text-main-text-color leading-none">relatorio.pdf</span>
        <div className="flex justify-between w-full items-center  gap-[1rem]">
          <span className="text-[1.3rem]">1.2MB</span>
          <span>
            <Download size={18} />
          </span>
        </div>
      </div>
    </div>
  );
}
