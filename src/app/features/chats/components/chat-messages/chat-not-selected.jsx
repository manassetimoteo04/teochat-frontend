import { MessageSquarePlus } from "lucide-react";

export function EmptyChatSelected() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-white">
      <div className="w-[10rem] h-[10rem] rounded-full bg-gray-100 flex items-center justify-center">
        <MessageSquarePlus size={36} className="text-secondary-text-color" />
      </div>

      <div className="text-center max-w-2xl">
        <h3 className="text-[1.8rem] font-semibold text-main-text-color">
          Nenhum canal seleccionado
        </h3>
        <p className="text-[1.4rem] text-secondary-text-color mt-1">
          Escolhe um canal à esquerda para começar uma conversa com a tua
          equipa.
        </p>
      </div>
    </div>
  );
}
