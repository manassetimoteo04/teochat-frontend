import {
  AlertCircle,
  Check,
  CheckCheck,
  Clock,
  FileText,
  Sheet,
  Archive,
  FileVideo,
  FileAudio,
  File,
  Download,
  ZoomIn,
} from "lucide-react";

import clsx from "clsx";
import { useState } from "react";

function resolveStatusIcon(status) {
  if (status === "delivered") return <CheckCheck size={14} />;
  if (status === "sent") return <Check size={14} />;
  if (status === "failed") return <AlertCircle size={14} />;

  return <Clock size={14} />;
}

function formatSize(bytes) {
  if (!bytes) return "";

  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(mimeType = "", name = "") {
  const ext = name.split(".").pop()?.toLowerCase();

  if (["xlsx", "xls", "csv"].includes(ext)) return Sheet;
  if (["zip", "rar", "7z", "tar"].includes(ext)) return Archive;
  if (mimeType.startsWith("video/")) return FileVideo;
  if (mimeType.startsWith("audio/")) return FileAudio;
  if (mimeType === "application/pdf" || ext === "pdf") return FileText;

  return File;
}

function getFileLabel(mimeType = "", name = "") {
  const ext = name.split(".").pop()?.toUpperCase();

  if (mimeType === "application/pdf") return "PDF";
  if (["XLSX", "XLS"].includes(ext)) return "Spreadsheet";
  if (["ZIP", "RAR", "7Z"].includes(ext)) return "Archive";
  if (mimeType.startsWith("video/")) return "Video";
  if (mimeType.startsWith("audio/")) return "Audio";

  return ext || "File";
}

function ImageLightbox({ src, alt, onClose }) {
  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-50
        bg-black/80
        flex items-center justify-center
        p-4
      "
    >
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="
          max-w-full
          max-h-full
          rounded-xl
          object-contain
        "
      />

      <button
        type="button"
        onClick={onClose}
        className="
          absolute top-4 right-4
          rounded-full p-2
          bg-white/10 hover:bg-white/20
          text-white transition
        "
      >
        ✕
      </button>

      <a
        href={src}
        download={alt}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="
          absolute bottom-4 right-4
          rounded-full p-2
          bg-white/10 hover:bg-white/20
          text-white transition
        "
      >
        <Download size={18} />
      </a>
    </div>
  );
}

function ImageGrid({ images }) {
  const [lightbox, setLightbox] = useState(null);

  const count = images.length;

  const gridClass =
    {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-2",
      4: "grid-cols-2",
    }[Math.min(count, 4)] || "grid-cols-2";

  return (
    <>
      <div
        className={clsx(
          "grid gap-0.5 rounded-xl overflow-hidden mt-2",
          gridClass,
        )}
      >
        {images.slice(0, 4).map((img, i) => {
          const isFirstOfThree = count === 3 && i === 0;
          const isLast = i === 3 && count > 4;

          return (
            <div
              key={i}
              onClick={() =>
                setLightbox({
                  src: img.url,
                  alt: img.name || "Imagem",
                })
              }
              className={clsx(
                `
                relative overflow-hidden
                group cursor-pointer
                `,
                isFirstOfThree && "col-span-2",
                count === 1 ? "aspect-video" : "aspect-square",
              )}
            >
              <img
                src={img.url}
                alt={img.name || "Imagem"}
                className="
                  w-full h-full object-cover
                  transition-transform duration-200
                  group-hover:scale-105
                "
              />

              <div
                className="
                  absolute inset-0
                  bg-black/0 group-hover:bg-black/25
                  transition
                  flex items-center justify-center
                "
              >
                <ZoomIn
                  size={22}
                  className="
                    text-white
                    opacity-0 group-hover:opacity-100
                    transition
                  "
                />
              </div>

              {isLast && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    +{count - 4}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}

function FileChip({ file, isMe }) {
  const Icon = getFileIcon(file.mimeType, file.name);
  const label = getFileLabel(file.mimeType, file.name);

  return (
    <a
      href={file.url}
      download={file.name}
      target="_blank"
      rel="noreferrer"
      className={clsx(
        `
        flex items-center gap-2.5
        px-3 py-2 rounded-xl
        hover:opacity-80 transition
        `,
        isMe ? "bg-white/20" : "bg-emerald-50 border border-emerald-100",
      )}
    >
      <div
        className={clsx(
          "w-8 h-8 rounded-lg flex items-center justify-center",
          isMe ? "bg-white/20" : "bg-emerald-100",
        )}
      >
        <Icon size={15} className={isMe ? "text-white" : "text-emerald-600"} />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={clsx(
            "truncate text-xs font-medium",
            isMe ? "text-white" : "text-zinc-800",
          )}
        >
          {file.name}
        </p>

        <p
          className={clsx(
            "text-[1.1rem]",
            isMe ? "text-white/70" : "text-zinc-500",
          )}
        >
          {[formatSize(file.size), label].filter(Boolean).join(" · ")}
        </p>
      </div>

      <Download
        size={14}
        className={isMe ? "text-white/70" : "text-emerald-500"}
      />
    </a>
  );
}

export function MessageCard({ message, currentUserId }) {
  const senderId = message?.senderId?.id ?? message?.senderId;

  const isMe = senderId === currentUserId;

  const authorName = message?.senderId?.name || "Utilizador";

  const authorAvatar = message?.senderId?.avatar;

  const messageStatus = message?.status || "sent";

  const allFiles = message?.files || [];

  const images = allFiles.filter((f) => f.mimeType?.startsWith("image/"));

  const otherFiles = allFiles.filter((f) => !f.mimeType?.startsWith("image/"));

  return (
    <div
      className={clsx(
        "flex items-end gap-2 mb-4",
        isMe ? "justify-end" : "justify-start",
      )}
    >
      {!isMe && (
        <img
          src={authorAvatar}
          alt={authorName}
          className="
            w-9 h-9 rounded-full
            object-cover bg-zinc-100
          "
        />
      )}

      <div className={clsx("flex flex-col max-w-[78%]", isMe && "items-end")}>
        {!isMe && (
          <span className="text-[1.3rem] mb-1 ml-1 font-medium">
            {authorName}
          </span>
        )}

        <div
          className={clsx(
            `
            px-4 py-2 rounded-2xl
            shadow-sm text-[1.4rem]
            `,
            isMe
              ? "bg-green-500 text-white rounded-br-md"
              : "bg-white border border-emerald-100 rounded-bl-md",
          )}
        >
          {message?.content && <p>{message.content}</p>}

          {!!images.length && <ImageGrid images={images} />}

          {!!otherFiles.length && (
            <div className="mt-2 flex flex-col gap-1.5">
              {otherFiles.map((file, i) => (
                <FileChip key={i} file={file} isMe={isMe} />
              ))}
            </div>
          )}
        </div>

        <div
          className={clsx(
            "mt-1 flex items-center gap-1.5 text-[1.1rem]",
            isMe && "flex-row-reverse",
          )}
        >
          <span>
            {new Date(message.createdAt).toLocaleTimeString("pt-PT", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {isMe && <span>{resolveStatusIcon(messageStatus)}</span>}
        </div>
      </div>
    </div>
  );
}
