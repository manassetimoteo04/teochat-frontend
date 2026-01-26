import { useEffect, useMemo, useRef, useState } from "react";
import Spinner from "../../../../shared/ui/Spinner";
import { useGetChannelById } from "../../hooks/use-get-channel-by-id";
import { ChannelNotFound } from "./channell-not-found";
import { ChatHeader } from "./chat-header";
import { ChatMessagesForm } from "./chat-messages-form";
import { ChatMessagesList } from "./chat-messages-list";
import clsx from "clsx";
import { ChatDetails } from "./chat-details";
import { getSocket } from "../../../../shared/services/socket-client";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../../../shared/providers/context";
import { useChatScroll } from "../../../../shared/hooks/use-acroll-bottom";
import { useChannelMessages } from "../../hooks/use-list-channel-messages";

const socket = getSocket();

export function ChatMessages() {
  const { hash } = useLocation();
  const { currentUser } = useAppContext();
  const { data: channel, isPending } = useGetChannelById();

  const channelId = hash.replace("#", "");
  const currentChannelRef = useRef(null);

  const [details, setDetails] = useState(false);
  const [realtimeMessages, setRealtimeMessages] = useState([]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useChannelMessages(channelId);

  const messages = useMemo(() => {
    const httpMessages = data?.pages.flatMap((p) => p.messages) ?? [];

    const map = new Map();

    [...httpMessages, ...realtimeMessages].forEach((msg) => {
      map.set(msg.id || msg.tempId, msg);
    });

    return Array.from(map.values()).sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    );
  }, [data, realtimeMessages]);

  useEffect(() => {
    if (!channelId) return;

    currentChannelRef.current = channelId;
    setRealtimeMessages([]);
  }, [channelId]);

  const {
    containerRef,
    bottomRef,
    scrollToBottom,
    prepareForFetchMore,
    isNearBottom,
  } = useChatScroll({
    messagesLength: messages.length,
    channelId,
  });

  useEffect(() => {
    if (!socket || !currentUser?.id) return;

    const onNewMessage = (msg) => {
      if (msg.channelId !== currentChannelRef.current) return;

      setRealtimeMessages((prev) => [...prev, msg]);

      if (isNearBottom()) {
        scrollToBottom();
      }
    };

    const onMessageSent = ({ tempId, message }) => {
      if (message.channelId !== currentChannelRef.current) return;

      setRealtimeMessages((prev) =>
        prev.map((m) => (m.tempId === tempId ? message : m)),
      );
    };

    socket.on("message:new", onNewMessage);
    socket.on("message:sent", onMessageSent);

    return () => {
      socket.off("message:new", onNewMessage);
      socket.off("message:sent", onMessageSent);
    };
  }, [currentUser?.id, scrollToBottom, isNearBottom]);

  const groupedMessages = useMemo(() => {
    return Object.groupBy(messages, (msg) => {
      const d = new Date(msg.createdAt);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    });
  }, [messages]);

  return (
    <div
      className={clsx(
        "grid absolute top-0 left-0  w-full md:relative h-full",
        details && "lg:grid-cols-2",
      )}
    >
      <div className="bg-white relative grid grid-rows-[5.5rem_1fr]">
        {!isPending && channel && (
          <>
            <ChatHeader setDetails={setDetails} data={channel} />

            <ChatMessagesList
              data={groupedMessages}
              bottomRef={bottomRef}
              containerRef={containerRef}
              fetchNextPage={fetchNextPage}
              prepareForFetchMore={prepareForFetchMore}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              currentUser={currentUser?.id}
            />

            <ChatMessagesForm
              currentUser={currentUser?.id}
              setRealtimeMessages={setRealtimeMessages}
              scrollToBottom={scrollToBottom}
            />
          </>
        )}

        {(isPending || isLoading) && <Spinner />}
        {!isPending && !channel && <ChannelNotFound />}
      </div>

      {details && channel && (
        <ChatDetails setConversationDetails={setDetails} data={channel} />
      )}
    </div>
  );
}
