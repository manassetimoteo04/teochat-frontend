import { MessageCard } from "./message-card";
import { useEffect, useRef } from "react";
import { getSocket } from "../../../../shared/services/socket-client";
import { useGetChannelById } from "../../hooks/use-get-channel-by-id";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const users = [
  {
    id: "user_01",
    username: "timoteo",
    displayName: "Timóteo",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "user_02",
    username: "carlos_dev",
    displayName: "Carlos",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: "user_03",
    username: "ana_ui",
    displayName: "Ana",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "user_04",
    username: "joao_backend",
    displayName: "João",
    avatar: "https://i.pravatar.cc/150?img=18",
  },
  {
    id: "user_05",
    username: "maria_pm",
    displayName: "Maria",
    avatar: "https://i.pravatar.cc/150?img=25",
  },
];

const messages = Array.from({ length: 3 }, (_, i) => {
  const sender = users[i % users.length];
  const isImage = i % 7 === 0;

  return {
    id: `msg_${String(i + 1).padStart(3, "0")}`,
    channelId: "channel_01",
    type: isImage ? "image" : "text",
    content: isImage
      ? "Screenshot do progresso"
      : `Mensagem número ${i + 1} no canal`,

    image: isImage
      ? {
          url: `https://picsum.photos/400/25${i % 10}`,
          width: 400,
          height: 250,
        }
      : undefined,

    createdAt: new Date(Date.now() - (200 - i) * 1000 * 60 * 3).toISOString(),

    status: i % 3 === 0 ? "read" : i % 3 === 1 ? "delivered" : "sent",

    sender: {
      ...sender,
      role: i % 5 === 0 ? "admin" : "member",
      isOnline: i % 2 === 0,
      lastSeen: new Date(
        Date.now() - Math.random() * 1000 * 60 * 60,
      ).toISOString(),
    },

    reactions:
      i % 5 === 0
        ? [{ emoji: "🔥", userId: "user_02" }]
        : i % 8 === 0
          ? [{ emoji: "👍", userId: "user_01" }]
          : [],

    replyTo: i > 0 && i % 6 === 0 ? `msg_${String(i).padStart(3, "0")}` : null,

    metadata: {
      device: i % 2 === 0 ? "desktop" : "mobile",
      edited: i % 9 === 0,
    },
  };
});

const socket = getSocket();
export function ChatMessagesList() {
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  );
  const { hash } = useLocation();
  const groupedMessages = Object.groupBy(sortedMessages, (msg) => {
    const d = new Date(msg.createdAt);

    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });

  const currentChannelRef = useRef(null);
  useEffect(() => {
    const channelId = hash.replace("#", "");
    if (!channelId) return;

    socket.on("connect", () => {
      if (currentChannelRef.current) {
        socket.emit("channel:leave", {
          channelId: currentChannelRef.current,
        });
      }

      socket.emit("channel:join", { channelId });

      socket.on("message:new", (msg) => {
        console.log("Recebi:", msg);
        toast("NOVA MENSAGEM");
      });

      socket.on("message:sent", (msg) => {
        console.log("Enviei:", msg);
      });

      currentChannelRef.current = channelId;
    });

    return () => {
      socket.off("connect");
    };
  }, [hash]);

  return (
    <div className="relative p-[4rem_2rem] overflow-y-scroll h-[calc(100dvh-11rem)]">
      {Object.entries(groupedMessages).map(([date, msgs]) => (
        <div key={date}>
          <div className="text-center sticky text-zinc-500 my-3">
            <span className="flex items-center justify-center p-[0.5rem] rounded-full bg-white ">
              {date}
            </span>
          </div>

          {msgs.map((msg) => (
            <MessageCard key={msg.id} message={msg} />
          ))}
        </div>
      ))}
    </div>
  );
}
