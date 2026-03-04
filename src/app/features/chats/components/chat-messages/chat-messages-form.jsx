import { Paperclip, SendHorizonal } from "lucide-react";
import ButtonIcon from "../../../../shared/ui/button-icon";
import { useState } from "react";

export function ChatMessagesForm({ onSendMessage, isOffline = false }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const content = text.trim();
    if (!content) return;

    onSendMessage(content);
    setText("");
  }

  return (
    <div className="p-[1.6rem] absolute h-[8.4rem] bg-gradient-to-t from-white via-white to-transparent bottom-0 left-0 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-xl grid grid-cols-[4rem_1fr_4rem] border shadow-sm focus-within:shadow-md border-emerald-200 rounded-2xl"
      >
        <div className="flex items-center w-full px-[1rem] justify-center text-zinc-500">
          <ButtonIcon title="Anexar Arquivo">
            <Paperclip size={20} />
          </ButtonIcon>
        </div>

        <input
          type="text"
          placeholder={isOffline ? "Sem internet... mensagem será enviada ao reconectar" : "Escreva uma mensagem"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-transparent py-[1rem] pr-[1rem] focus:outline-none transition-none w-full h-full"
        />

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="h-[3.5rem] w-[3.5rem] bg-emerald-500 text-white rounded-2xl flex items-center justify-center hover:opacity-80 disabled:bg-zinc-300"
            disabled={!text.trim()}
          >
            <SendHorizonal size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
