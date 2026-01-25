import { Check, CheckCheck, Clock } from "lucide-react";

export function MessageCard({ message, currentUserId }) {
  const isMe = message.senderId.id === currentUserId;
  return (
    <div
      className={`flex items-end gap-2 mb-4 ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      {!isMe && (
        <img
          src={message.senderId.avatar}
          alt={message.senderId.name}
          className="w-9 h-9 rounded-full object-cover self-end"
        />
      )}

      <div className={`flex flex-col max-w-[70%] ${isMe && "items-end"}`}>
        {!isMe && (
          <span className="text-[1.3rem] text-secondary-text-color font-medium mb-1 ml-1">
            {message.senderId.name}
          </span>
        )}

        <div
          className={`
            relative px-4 py-2 rounded-2xl text-[1.4rem] leading-relaxed
            ${
              isMe
                ? "bg-main-color text-white rounded-br-md"
                : "bg-white border border-gray-200 text-zinc-900 rounded-bl-md"
            }
          `}
        >
          {message.type === "text" && (
            <p className="break-words">{message.content}</p>
          )}

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
                  className="text-[1.2rem] bg-black/10 px-2 py-0.5 rounded-full"
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
            <span className="opacity-70">
              {message.status === "sent" && <CheckCheck size={14} />}
              {message.status === "delivered" && <Check size={14} />}
              {message.status === "pending" && <Clock size={14} />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
