import { AlertCircle, Check, CheckCheck, Clock } from "lucide-react";
import clsx from "clsx";

function resolveStatusIcon(status) {
  if (status === "delivered") return <CheckCheck size={14} />;
  if (status === "sent") return <Check size={14} />;
  if (status === "failed") return <AlertCircle size={14} />;
  return <Clock size={14} />;
}

export function MessageCard({ message, currentUserId }) {
  const senderId = message?.senderId?.id ?? message?.senderId;
  const isMe = senderId === currentUserId;
  const authorName = message?.senderId?.name || "Utilizador";
  const authorAvatar = message?.senderId?.avatar;
  const messageStatus = message?.status || "sent";

  return (
    <div className={clsx("flex items-end gap-2 mb-4", isMe ? "justify-end" : "justify-start")}>
      {!isMe && (
        <img
          src={authorAvatar}
          alt={authorName}
          className="w-9 h-9 rounded-full object-cover self-end bg-zinc-100"
        />
      )}

      <div className={clsx("flex flex-col max-w-[78%]", isMe && "items-end")}>
        {!isMe && (
          <span className="text-[1.3rem] text-secondary-text-color font-medium mb-1 ml-1">
            {authorName}
          </span>
        )}

        <div
          className={clsx(
            "relative px-4 py-2 rounded-2xl text-[1.4rem] leading-relaxed shadow-sm",
            isMe
              ? "bg-emerald-500 text-white rounded-br-md"
              : "bg-white border border-emerald-100 text-zinc-900 rounded-bl-md",
          )}
        >
          {message.type === "text" && <p className="break-words">{message.content}</p>}

          {message.type === "image" && (
            <img
              src={message.image.url}
              alt="Imagem enviada"
              className="mt-2 rounded-xl max-h-60 object-cover"
            />
          )}

          {message.reactions?.length > 0 && (
            <div className="flex gap-1 mt-2">
              {message.reactions.map((r, i) => (
                <span
                  key={i}
                  className={clsx(
                    "text-[1.2rem] px-2 py-0.5 rounded-full",
                    isMe ? "bg-white/20" : "bg-black/10",
                  )}
                >
                  {r.emoji}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-1 text-[1.1rem] text-secondary-text-color">
          <span>
            {new Date(message.createdAt).toLocaleTimeString("pt-PT", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {isMe && (
            <span
              className={clsx(
                "opacity-80",
                messageStatus === "failed" && "text-rose-600",
              )}
            >
              {resolveStatusIcon(messageStatus)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
