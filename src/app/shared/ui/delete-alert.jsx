import { Trash2 } from "lucide-react";
import Button from "./button";
import SpinnerMini from "./SpinnerMini";

function DeleteAlert({
  onConfirm,
  deleteId,
  isPending,
  onCloseModal,
  title = "Membro",
  description = "membro",
}) {
  function onClick() {
    onConfirm(deleteId, { onSuccess: onCloseModal });
  }
  return (
    <div className="p-[2rem] flex flex-col gap-[1rem] max-w-[35rem]">
      <div className="mt-[2rem] flex items-center gap-[1rem] ">
        <span className="flex items-center justify-center w-[5rem] text-red-600 rounded-full h-[5rem] bg-red-100">
          <Trash2 />
        </span>
        <h3 className="text-[1.8rem]">Eliminar {title}</h3>
      </div>
      <p className="text-secondary-text-color">
        Tens a certeza que desejas eliminar {description} pernamentemente?
      </p>
      <div className="flex justify-start">
        <Button onClick={onClick} variation="danger">
          {isPending ? <SpinnerMini /> : "Eliminar " + title}
        </Button>
      </div>
    </div>
  );
}

export default DeleteAlert;
