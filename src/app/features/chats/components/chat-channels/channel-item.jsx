import { useLocation } from "react-router-dom";
import { formatDate } from "../../../../shared/utils/helpers";

export function ChannelItem({ channel, onClick }) {
  const { hash } = useLocation();
  const isActive = hash.replace("#", "") === channel.id;
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 px-[2rem] transition-colors
        ${isActive ? "bg-main-color/10" : "hover:bg-gray-100"}`}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="font-medium text-main-text-color">
            #{channel.name}
          </span>

          {channel.lastMessage && (
            <span className="text-xs text-secondary-text-color">
              {formatDate(channel.lastMessage.createdAt)}
            </span>
          )}
        </div>

        {channel.lastMessage ? (
          <p className="text-[1.4rem] text-secondary-text-color truncate">
            <strong>{channel.lastMessage.senderName}: </strong>
            {channel.lastMessage.content}
          </p>
        ) : (
          <p className="text-sm text-secondary-text-color">
            Nenhuma mensagem ainda
          </p>
        )}
      </div>
    </button>
  );
}
