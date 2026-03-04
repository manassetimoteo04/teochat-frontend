import { useCallback, useEffect, useMemo, useState } from "react";
import { useCall } from "@stream-io/video-react-sdk";
import { SendHorizonal } from "lucide-react";
import { toast } from "sonner";

export function InCallChatPanel({ currentUser }) {
  const call = useCall();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!call) return;

    const off = call.on("custom", (event) => {
      const payload = event.custom || {};
      if (payload.kind !== "chat.message" || !payload.id) return;

      setMessages((prev) => {
        if (prev.some((item) => item.id === payload.id)) return prev;

        return [
          ...prev,
          {
            id: payload.id,
            text: payload.text,
            senderId: payload.senderId,
            senderName: payload.senderName,
            createdAt: payload.createdAt,
          },
        ];
      });
    });

    return () => {
      off?.();
    };
  }, [call]);

  const orderedMessages = useMemo(
    () =>
      [...messages].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      ),
    [messages],
  );

  const sendMessage = useCallback(async () => {
    const content = text.trim();
    if (!content || !call) return;

    const payload = {
      kind: "chat.message",
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      text: content,
      senderId: currentUser?.id,
      senderName: currentUser?.name,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, payload]);
    setText("");

    try {
      await call.sendCustomEvent(payload);
    } catch {
      toast.error("Falha ao enviar mensagem no chat da chamada");
    }
  }, [call, currentUser?.id, currentUser?.name, text]);

  return (
    <div className="h-full min-h-0 flex flex-col bg-transparent text-zinc-100">
      <div className="p-[1.2rem] border-b border-white/10 bg-slate-900/80">
        <h4 className="text-[1.4rem] font-semibold">Chat da chamada</h4>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-[1rem] flex flex-col gap-[0.8rem] bg-slate-900/40">
        {orderedMessages.length === 0 && (
          <p className="text-[1.2rem] text-zinc-400">Sem mensagens ainda.</p>
        )}

        {orderedMessages.map((message) => {
          const isMe = message.senderId === currentUser?.id;

          return (
            <div
              key={message.id}
              className={isMe ? "flex justify-end" : "flex justify-start"}
            >
              <div
                className={`max-w-[88%] rounded-2xl px-[1rem] py-[0.8rem] text-[1.3rem] ${
                  isMe
                    ? "bg-emerald-500 text-white"
                    : "bg-white/5 border border-white/10 text-zinc-100"
                }`}
              >
                <p className="text-[1.1rem] opacity-80 mb-[0.2rem]">
                  {isMe ? "Você" : message.senderName || "Participante"}
                </p>
                <p className="break-words">{message.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage();
        }}
        className="p-[1rem] border-t border-white/10 grid grid-cols-[1fr_3.6rem] gap-[0.6rem] bg-slate-900/80"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enviar mensagem na chamada"
          className="rounded-xl border border-white/10 bg-black/20 text-zinc-100 px-[1rem] py-[0.8rem] text-[1.3rem] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="rounded-xl bg-emerald-500 text-white grid place-items-center disabled:bg-zinc-700 disabled:text-zinc-400"
          title="Enviar"
        >
          <SendHorizonal size={16} />
        </button>
      </form>
    </div>
  );
}
