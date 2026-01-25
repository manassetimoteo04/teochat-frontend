import { FileText, Paperclip, Plus } from "lucide-react";
import { AttachmentsCard } from "./attachement-card";

export function TaskAttachments() {
  return (
    <div className="pt-[1rem] border-t ">
      <span className="cursor-pointer flex items-center gap-[0.5rem] text-secondary-text-color">
        <Paperclip size={20} /> Arquivos Anexados
      </span>

      <div className=" border-gray-100 overflow-x-scroll gap-[1rem] rounded-xl flex mt-[1.4rem]">
        <AttachmentsCard />
        <AttachmentsCard />
        <label
          htmlFor="file"
          className="border hover:border-black hover:text-black gap-[1rem] w-[6rem] bg-gray-50 justify-center cursor-pointer flex items-center text-secondary-text-color border-gray-100 p-[1rem] rounded-xl "
        >
          <Plus />
        </label>
        <input type="file" hidden name="file" />
      </div>
    </div>
  );
}
