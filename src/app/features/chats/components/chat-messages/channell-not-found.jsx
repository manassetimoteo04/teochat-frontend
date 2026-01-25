import { AlertTriangle } from "lucide-react";

export function ChannelNotFound() {
  return (
    <div className="flex-1 absolute flex flex-col items-center justify-center gap-4 h-full w-full">
      <div className="w-[10rem] h-[10rem] rounded-full bg-red-50 flex items-center justify-center">
        <AlertTriangle size={36} className="text-red-500" />
      </div>

      <div className="text-center max-w-2xl">
        <h3 className="text-[1.8rem] font-semibold text-main-text-color">
          Canal não encontrado
        </h3>
        <p className="text-[1.4rem] text-secondary-text-color mt-1">
          O canal que tentaste aceder não existe ou foi removido.
        </p>
      </div>
    </div>
  );
}
