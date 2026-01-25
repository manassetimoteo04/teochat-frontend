import { EllipsisVertical, Search, Video } from "lucide-react";
import ButtonIcon from "../../../../shared/ui/button-icon";

export function ChatHeader({ data, setDetails }) {
  return (
    <header className="h-full px-[2rem] flex items-center justify-between border-b">
      <div className="flex items-center gap-[1rem] ">
        <span className="w-[4rem] h-[4rem] bg-green-100 text-main-color rounded-2xl flex items-center justify-center">
          #
        </span>
        <div className="flex flex-col gap-[0.4rem]">
          <span className="flex font-semibold leading-none">{data.name}</span>
          <span className="text-[1rem] text-secondary-text-color leading-none flex items-center gap-1">
            <span className="block w-[0.5rem] h-[0.5rem] rounded-full bg-main-color"></span>{" "}
            Activo
          </span>
        </div>
      </div>

      <div className="flex items-center gap-[2rem]">
        <ButtonIcon title="Iniciar Meeting">
          <Video size={20} />
        </ButtonIcon>
        <ButtonIcon title="Procurar Mensagem">
          <Search size={20} />
        </ButtonIcon>
        <ButtonIcon onClick={() => setDetails((s) => !s)} title="Configurações">
          <EllipsisVertical size={20} />
        </ButtonIcon>
      </div>
    </header>
  );
}
