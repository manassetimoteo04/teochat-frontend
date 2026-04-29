import { Hash } from "lucide-react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

import { formatDate, generateAvatar } from "../../../../shared/utils/helpers";
import { useAppContext } from "../../../../shared/providers/context";

export function ChannelItem({ channel, onClick }) {
  const { hash } = useLocation();
  const { currentUser } = useAppContext();

  const isActive = hash.replace("#", "") === channel.id;
  const isMe = channel?.lastMessage?.sent === currentUser?.id;

  const { initials, color } = generateAvatar(channel?.name);

  return (
    <button
      onClick={onClick}
      className={clsx(
        `
        w-full text-left
        px-[1.6rem] py-[1.3rem]
        border-b border-emerald-50
        transition
        `,
        isActive
          ? "bg-emerald-50 ring-1 ring-emerald-100"
          : "hover:bg-emerald-50/50",
      )}
    >
      <div className="flex gap-[1.2rem] items-start">
        <div
          style={{ backgroundColor: color }}
          className="
            h-[4.2rem] w-[4.2rem]
            rounded-2xl
            flex items-center justify-center
            shrink-0
            text-main-text-color font-semibold
            shadow-sm
          "
        >
          {channel?.avatar ? (
            <img
              src={channel.avatar}
              alt={channel.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            initials || <Hash size={18} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <p className="font-medium text-main-text-color truncate">
                #{channel.name}
              </p>

              {channel.unreadCount > 0 && (
                <span
                  className="
                  min-w-[2rem]
                  h-[2rem]
                  px-2 rounded-full
                  text-[1.1rem]
                  flex items-center justify-center
                  bg-emerald-500 text-white
                "
                >
                  {channel.unreadCount}
                </span>
              )}
            </div>

            {channel?.lastMessage && (
              <span className="text-[1.1rem] text-secondary-text-color whitespace-nowrap">
                {formatDate(
                  new Date(channel.lastMessage?.date ?? new Date()),
                  false,
                  false,
                  false,
                  false,
                )}
              </span>
            )}
          </div>

          {channel?.lastMessage?.name ? (
            <p className="mt-[.4rem] text-[1.28rem] truncate text-secondary-text-color">
              <strong className="text-main-text-color">
                {isMe ? "Eu" : channel.lastMessage.name}:
              </strong>{" "}
              {channel.lastMessage.content}
            </p>
          ) : (
            <p className="mt-[.4rem] text-[1.28rem] text-secondary-text-color">
              Nenhuma mensagem ainda
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
