import { Trash2 } from "lucide-react";
import Button from "../../../shared/ui/button";
import SpinnerMini from "../../../shared/ui/SpinnerMini";

function RemoveMemberAlert({
  onConfirm,
  data,
  isPending,
  onCloseModal,
  title = "Membro",
  description = "este membro da equipa?",
}) {
  function onClick() {
    onConfirm(data, { onSuccess: onCloseModal });
  }
  return (
    <div className="p-[2rem] flex flex-col gap-[1rem] max-w-[35rem]">
      <div className="mt-[2rem] flex items-center gap-[1rem] ">
        <span className="flex items-center justify-center w-[5rem] text-red-600 rounded-full h-[5rem] bg-red-100">
          <Trash2 />
        </span>
        <h3 className="text-[1.8rem]">Remover {title}</h3>
      </div>
      <p className="text-secondary-text-color">
        Tens a certeza que desejsas remover {description}?
      </p>
      <div className="flex justify-start">
        <Button onClick={onClick} variation="danger">
          {isPending ? <SpinnerMini /> : "Remover " + title}
        </Button>
      </div>
    </div>
  );
}

export default RemoveMemberAlert;
