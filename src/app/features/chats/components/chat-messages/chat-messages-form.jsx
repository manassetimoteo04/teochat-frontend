import { Paperclip, Send, SendHorizonal } from "lucide-react";
import ButtonIcon from "../../../../shared/ui/button-icon";
import { useLocation } from "react-router-dom";
import { getSocket } from "../../../../shared/services/socket-client";
import { useState } from "react";

export function ChatMessagesForm() {
  const { hash } = useLocation();
  const [text, setText] = useState("");
  function handleSubmit(e) {
    e.preventDefault();

    if (!text) return;

    const socket = getSocket();
    const channelId = hash.replace("#", "");

    socket.emit("message:send", {
      channelId,
      content: text,
    });

    setText("");
  }

  return (
    <div className=" p-[2rem] absolute h-[8rem] bg-gradient-to-t from-white to-transparent bottom-0 left-0 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50/50 backdrop-blur-xl grid grid-cols-[4rem_1fr_4rem] border focus-within:shadow-md border-gray-200 rounded-2xl"
      >
        <div className="flex items-center w-full px-[1rem] justify-center">
          <ButtonIcon title="Anexar Arquivo">
            <Paperclip size={20} />
          </ButtonIcon>
        </div>
        <input
          type="text"
          placeholder="Escrever..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-transparent py-[1rem] pr-[1rem] focus:outline-none transition-none w-full h-full"
        />

        <div className="flex items-center justify-center">
          <button className="h-[3.5rem] w-[3.5rem] bg-main-color text-white rounded-2xl flex items-center justify-center hover:opacity-80">
            <SendHorizonal size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
