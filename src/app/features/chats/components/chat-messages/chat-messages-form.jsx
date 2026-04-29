import { Paperclip, SendHorizonal, X, FileText, Smile } from "lucide-react";

import EmojiPicker from "emoji-picker-react";
import ButtonIcon from "../../../../shared/ui/button-icon";
import { useEffect, useRef, useState } from "react";

const MAX_FILES = 8;

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FilePreview({ file, onRemove }) {
  const isImage = file.type.startsWith("image/");
  const url = isImage ? URL.createObjectURL(file) : null;

  return (
    <div className="relative group">
      {isImage ? (
        <div className="w-[7.2rem] h-[7.2rem] rounded-xl overflow-hidden border border-emerald-100">
          <img
            src={url}
            alt={file.name}
            className="w-full h-full object-cover"
            onLoad={() => url && URL.revokeObjectURL(url)}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-emerald-100 bg-emerald-50">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <FileText size={16} />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium truncate">{file.name}</p>

            <p className="text-[1.1rem] text-zinc-400">
              {formatSize(file.size)}
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onRemove}
        className="
          absolute -top-1 -right-1
          h-5 w-5 rounded-full
          bg-zinc-800/70 text-white
          flex items-center justify-center
        "
      >
        <X size={10} />
      </button>
    </div>
  );
}

export function ChatMessagesForm({ onSendMessage, isOffline = false }) {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const pickerRef = useRef(null);
  const fileInputRef = useRef(null);

  const canSend = text.trim().length > 0 || files.length > 0;

  useEffect(() => {
    function closeOutside(e) {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener("mousedown", closeOutside);

    return () => document.removeEventListener("mousedown", closeOutside);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (!canSend) return;

    onSendMessage({
      content: text.trim(),
      files,
    });

    setText("");
    setFiles([]);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  function handleFileChange(e) {
    const incoming = Array.from(e.target.files);

    setFiles((prev) => [...prev, ...incoming].slice(0, MAX_FILES));

    e.target.value = "";
  }

  function removeFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleEmojiClick(emojiData) {
    setText((prev) => prev + emojiData.emoji);
  }

  return (
    <div className="absolute bottom-0 left-0 w-full p-[1.6rem]">
      <div className="bg-white border border-emerald-200 rounded-2xl shadow-sm  relative">
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 pb-0">
            {files.map((file, i) => (
              <FilePreview
                key={`${file.name}-${i}`}
                file={file}
                onRemove={() => removeFile(i)}
              />
            ))}
          </div>
        )}

        {showEmojiPicker && (
          <div
            ref={pickerRef}
            className="
              absolute bottom-[6.5rem]
              left-4 z-50
              shadow-xl rounded-2xl overflow-hidden
            "
          >
            <EmojiPicker onEmojiClick={handleEmojiClick} lazyLoadEmojis />
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="
            grid
            grid-cols-[4rem_4rem_1fr_4rem]
            items-center
          "
        >
          <div className="flex justify-center">
            <ButtonIcon
              title="Anexar"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip size={20} />
            </ButtonIcon>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              accept="
                image/*,
                .pdf,.doc,.docx,
                .txt,.zip,
                .mp4,.mp3
              "
              onChange={handleFileChange}
            />
          </div>

          <div className="flex justify-center">
            <ButtonIcon
              type="button"
              title="Emoji"
              onClick={() => setShowEmojiPicker((s) => !s)}
            >
              <Smile size={20} />
            </ButtonIcon>
          </div>

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isOffline ? "Sem internet..." : "Escreva uma mensagem"}
            className="
              bg-transparent
              py-[1rem]
              pr-[1rem]
              w-full
              outline-none
            "
          />

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!canSend}
              className="
                h-[3.5rem] w-[3.5rem]
                rounded-2xl
                bg-emerald-500 text-white
                flex items-center justify-center
                disabled:bg-zinc-300
              "
            >
              <SendHorizonal size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
