import { useState } from "react";
import {
  HiOutlineFaceSmile,
  HiOutlineMicrophone,
  HiOutlinePaperAirplane,
  HiOutlinePaperClip,
} from "react-icons/hi2";

import EmojiPicker from "emoji-picker-react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useCurrentConversation } from "../../contexts/ConversationContextProvider";
import { useDarkMode } from "../../contexts/DarkModeContext";
import AudioRecorder from "../../ui/AudioRecorder";
function ConversationMessagesForm() {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const ref = useOutsideClick(() => setShowEmoji(false));
  const { addMessage } = useCurrentConversation();
  const { isDarkMode } = useDarkMode();
  const [recording, setRecording] = useState(false);

  function getEmoji(emoji) {
    setText((prev) => prev + emoji.emoji);
  }
  function sendMessage() {
    if (!text) return;
    const msg = {
      text,
      sendAt: "2025-06-29T08:00:00.000Z",
      sended: true,
      senderId: "user_maria",
      receiverId: "user_timoteo",
      read: true,
      type: "text",
      status: "read",
      edited: false,
      isMine: true,
    };
    addMessage(msg);
    setText("");
  }
  return (
    <div className="grid bg-main-bg-color gap-[1rem] dark:bg-main-bg-color-dark fixed bottom-0 left-0 w-full border-t-[1px] border-t-main-border-color dark:border-t-main-border-color-dark z-[999999999]   min-h-[6.7rem] max-h-[15rem]  items-center grid-cols-[5rem_1fr_6rem]">
      <button className="text-[2.4rem] text-secondary-text-color dark:text-secondary-text-color-dark flex items-center  justify-center">
        <HiOutlinePaperClip />
      </button>
      <form
        action=""
        className="w-full  flex justify-between items-center px-2  overflow-hidden rounded-[1rem] border-[1px] border-main-border-color dark:border-main-border-color-dark bg-main-bg-color-2 dark:bg-main-bg-color-dark-2"
      >
        <input
          value={text}
          aria-multiline={0}
          type="text"
          onChange={(e) => setText(e.target.value)}
          placeholder="Escrever"
          className="w-full p-[1rem] text-main-text-color dark:text-main-text-color-dark h-full bg-transparent focus:outline-none"
        />
        <span
          className="text-[2.4rem] text-gray-500"
          onClick={() => setShowEmoji((s) => !s)}
        >
          <HiOutlineFaceSmile />
        </span>
      </form>
      {showEmoji && (
        <div
          className="fixed bottom-[7rem] z-[999999999] right-[7rem]"
          ref={ref}
        >
          <EmojiPicker
            theme={isDarkMode ? "dark" : "light"}
            className="bg-black"
            onEmojiClick={getEmoji}
          />
        </div>
      )}
      {(!text || text?.trim() === "") && (
        <AudioRecorder recording={recording} setRecording={setRecording}>
          <button
            title="Clique para gravar"
            className="text-[2.4rem]  w-[3.5rem] rounded-full h-[3.5rem] text-secondary-text-color self-center dark:text-secondary-text-color-dark flex items-center  justify-center"
          >
            <HiOutlineMicrophone />
          </button>
        </AudioRecorder>
      )}{" "}
      {text && (
        <button
          onClick={sendMessage}
          className="text-[2.4rem] text-black bg-main-color w-[3.5rem] rounded-full h-[3.5rem]  self-center  flex items-center  justify-center"
        >
          <HiOutlinePaperAirplane />
        </button>
      )}
    </div>
  );
}

export default ConversationMessagesForm;
