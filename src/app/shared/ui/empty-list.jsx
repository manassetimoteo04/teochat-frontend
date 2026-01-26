import { Plus } from "lucide-react";
import Button from "./button";
import Modal from "./modal";

function EmptyList({ title, opensId }) {
  return (
    <div className="flex flex-col  items-center justify-center mt-[5rem] text-secondary-text-color">
      <span className="text-center">{title}</span>
      <div>
        <Modal.Open id={opensId}>
          <Button variation="dashed">
            <Plus size={20} />
          </Button>
        </Modal.Open>
      </div>
    </div>
  );
}

export default EmptyList;
