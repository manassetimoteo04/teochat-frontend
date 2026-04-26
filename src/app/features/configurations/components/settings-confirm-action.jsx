import { AlertTriangle } from "lucide-react";
import Button from "../../../shared/ui/button";
import SpinnerMini from "../../../shared/ui/SpinnerMini";

function SettingsConfirmAction({
  title,
  description,
  actionLabel,
  onConfirm,
  isPending,
  onCloseModal,
  variation = "danger",
}) {
  function handleConfirm() {
    onConfirm?.(onCloseModal);
  }

  return (
    <div className="max-w-[40rem] p-[2rem]">
      <div className="mt-[2rem] flex items-center gap-[1rem]">
        <span className="flex h-[5rem] w-[5rem] items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertTriangle />
        </span>
        <div>
          <h3 className="text-[1.8rem] font-semibold text-main-text-color">
            {title}
          </h3>
        </div>
      </div>
      <p className="mt-[1.2rem] text-[1.4rem] text-secondary-text-color">
        {description}
      </p>
      <div className="mt-[2rem] flex justify-start">
        <Button onClick={handleConfirm} variation={variation} className="w-auto">
          {isPending ? <SpinnerMini /> : actionLabel}
        </Button>
      </div>
    </div>
  );
}

export default SettingsConfirmAction;
