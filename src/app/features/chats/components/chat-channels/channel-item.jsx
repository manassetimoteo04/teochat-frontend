import { useLocation } from "react-router-dom";
import { formatDate } from "../../../../shared/utils/helpers";
import { useAppContext } from "../../../../shared/providers/context";

export function ChannelItem({ channel, onClick }) {
  const { hash } = useLocation();
  const isActive = hash.replace("#", "") === channel.id;
  const { currentUser } = useAppContext();
  const isMe = channel?.lastMessage?.sent === currentUser?.id;
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

          {channel?.lastMessage && (
            <span className="text-xs text-secondary-text-color">
              {formatDate(
                new Date(channel?.lastMessage?.date ?? new Date()),
                false,
                false,
                false,
                false,
              )}
            </span>
          )}
        </div>

        {channel?.lastMessage?.name ? (
          <p className="text-[1.4rem] text-secondary-text-color truncate">
            <strong>{!isMe ? channel.lastMessage.name : "Eu"}: </strong>
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
