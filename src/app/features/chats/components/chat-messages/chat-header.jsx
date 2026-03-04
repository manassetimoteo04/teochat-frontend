import {
  ArrowLeft,
  EllipsisVertical,
  Search,
  Video,
  Wifi,
  WifiOff,
} from "lucide-react";
import ButtonIcon from "../../../../shared/ui/button-icon";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const connectionMap = {
  online: {
    label: "Ligado",
    icon: Wifi,
    color: "text-emerald-600",
  },
  reconnecting: {
    label: "A reconectar...",
    icon: Wifi,
    color: "text-amber-600",
  },
  offline: {
    label: "Sem internet",
    icon: WifiOff,
    color: "text-rose-600",
  },
};

export function ChatHeader({ data, setDetails, connectionStatus = "online" }) {
  const navigate = useNavigate();
  const currentConnection =
    connectionMap[connectionStatus] || connectionMap.reconnecting;
  const ConnectionIcon = currentConnection.icon;

  return (
    <header className="h-full px-[2rem] flex items-center justify-between border-b bg-white/95 backdrop-blur-sm">
      <div className="flex items-center gap-[1rem] ">
        <div className="md:hidden">
          <ButtonIcon onClick={() => navigate(-1)}>
            <ArrowLeft />
          </ButtonIcon>
        </div>
        <span className="w-[4rem] h-[4rem] bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center">
          #
        </span>
        <div className="flex flex-col gap-[0.4rem]">
          <span className="flex font-semibold leading-none">{data.name}</span>
          <span
            className={clsx(
              "text-[1.1rem] leading-none flex items-center gap-1",
              currentConnection.color,
            )}
          >
            <ConnectionIcon size={12} />
            {currentConnection.label}
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
