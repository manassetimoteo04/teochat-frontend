import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Spinner from "../../../../shared/ui/Spinner";
import { useGetChannelById } from "../../hooks/use-get-channel-by-id";
import { ChannelNotFound } from "./channell-not-found";
import { ChatHeader } from "./chat-header";
import { ChatMessagesForm } from "./chat-messages-form";
import { ChatMessagesList } from "./chat-messages-list";
import clsx from "clsx";
import { ChatDetails } from "./chat-details";
import {
  ensureSocketConnected,
  getSocket,
} from "../../../../shared/services/socket-client";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../../../shared/providers/context";
import { useChatScroll } from "../../../../shared/hooks/use-acroll-bottom";
import { useChannelMessages } from "../../hooks/use-list-channel-messages";

const socket = getSocket();
const ACK_TIMEOUT_MS = 12000;
const MAX_SEND_ATTEMPTS = 5;

export function ChatMessages() {
  const { hash } = useLocation();
  const { currentUser } = useAppContext();
  const { data: channel, isPending } = useGetChannelById();

  const channelId = hash.replace("#", "");
  const currentChannelRef = useRef(null);
  const realtimeMessagesRef = useRef([]);
  const sendTimeoutsRef = useRef(new Map());

  const [details, setDetails] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(
    navigator.onLine ? "reconnecting" : "offline",
  );
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
    realtimeMessagesRef.current = realtimeMessages;
  }, [realtimeMessages]);

  const {
    containerRef,
    bottomRef,
    scrollToBottom,
    scrollToBottomIfNearBottom,
    prepareForFetchMore,
    onContainerScroll,
    cleanupAnimation,
  } = useChatScroll({
    messagesLength: messages.length,
    channelId,
  });

  const clearAckTimeout = useCallback((tempId) => {
    const timeoutId = sendTimeoutsRef.current.get(tempId);
    if (timeoutId) {
      clearTimeout(timeoutId);
      sendTimeoutsRef.current.delete(tempId);
    }
  }, []);

  const markMessageAsFailed = useCallback(
    (tempId) => {
      setRealtimeMessages((prev) =>
        prev.map((msg) => {
          if (msg.tempId !== tempId) return msg;
          if (msg.status === "sent" || msg.status === "delivered") return msg;
          return { ...msg, status: "failed" };
        }),
      );
    },
    [setRealtimeMessages],
  );

  const scheduleAckTimeout = useCallback(
    (tempId) => {
      clearAckTimeout(tempId);
      const timeoutId = setTimeout(() => {
        sendTimeoutsRef.current.delete(tempId);
        markMessageAsFailed(tempId);
      }, ACK_TIMEOUT_MS);

      sendTimeoutsRef.current.set(tempId, timeoutId);
    },
    [clearAckTimeout, markMessageAsFailed],
  );

  const trySendMessage = useCallback(
    (message) => {
      if (!message?.tempId || !message?.content || !message?.channelId) return;

      if (!navigator.onLine) {
        setConnectionStatus("offline");
        setRealtimeMessages((prev) =>
          prev.map((msg) =>
            msg.tempId === message.tempId
              ? {
                  ...msg,
                  status: "queued",
                }
              : msg,
          ),
        );
        return;
      }

      ensureSocketConnected();

      if (!socket.connected) {
        setConnectionStatus("reconnecting");
        setRealtimeMessages((prev) =>
          prev.map((msg) =>
            msg.tempId === message.tempId
              ? {
                  ...msg,
                  status: "queued",
                }
              : msg,
          ),
        );
        return;
      }

      setRealtimeMessages((prev) =>
        prev.map((msg) => {
          if (msg.tempId !== message.tempId) return msg;

          const nextAttempt = (msg.attempts || 0) + 1;
          return {
            ...msg,
            attempts: nextAttempt,
            status: "pending",
          };
        }),
      );

      socket.emit("message:send", {
        channelId: message.channelId,
        content: message.content,
        tempId: message.tempId,
        type: message.type || "text",
      });

      scheduleAckTimeout(message.tempId);
    },
    [scheduleAckTimeout],
  );

  const flushPendingMessages = useCallback(() => {
    const pending = realtimeMessagesRef.current.filter((msg) => {
      const isOwn = msg?.senderId?.id === currentUser?.id;
      const canRetry = (msg.attempts || 0) < MAX_SEND_ATTEMPTS;
      const needsRetry = ["queued", "failed"].includes(msg.status);

      return isOwn && !msg.id && canRetry && needsRetry;
    });

    pending.forEach((msg) => {
      trySendMessage(msg);
    });
  }, [currentUser?.id, trySendMessage]);

  const handleSendMessage = useCallback(
    (content) => {
      if (!currentUser?.id || !channelId) return;

      const tempId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      const optimisticMessage = {
        channelId,
        content,
        tempId,
        createdAt: new Date().toISOString(),
        status: navigator.onLine ? "pending" : "queued",
        senderId: {
          id: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar,
        },
        type: "text",
        attempts: 0,
      };

      setRealtimeMessages((prev) => [...prev, optimisticMessage]);
      scrollToBottom();
      trySendMessage(optimisticMessage);
    },
    [channelId, currentUser, scrollToBottom, trySendMessage],
  );

  useEffect(() => {
    if (!channelId) return;

    currentChannelRef.current = channelId;
    setRealtimeMessages([]);

    sendTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    sendTimeoutsRef.current.clear();
  }, [channelId]);

  useEffect(() => {
    if (!currentUser?.id) return;

    const client = ensureSocketConnected();

    const onConnect = () => {
      setConnectionStatus("online");
      flushPendingMessages();
    };

    const onDisconnect = () => {
      setConnectionStatus(navigator.onLine ? "reconnecting" : "offline");
    };

    const onConnectError = () => {
      setConnectionStatus(navigator.onLine ? "reconnecting" : "offline");
    };

    const onOnline = () => {
      setConnectionStatus("reconnecting");
      ensureSocketConnected();
      flushPendingMessages();
    };

    const onOffline = () => {
      setConnectionStatus("offline");
    };

    const onNewMessage = (msg) => {
      if (msg.channelId !== currentChannelRef.current) return;

      setRealtimeMessages((prev) => [...prev, { ...msg, status: "delivered" }]);
      scrollToBottomIfNearBottom(true);
    };

    const onMessageSent = ({ tempId, message }) => {
      if (message.channelId !== currentChannelRef.current) return;

      clearAckTimeout(tempId);
      setRealtimeMessages((prev) => {
        const tempExists = prev.some((m) => m.tempId === tempId);
        if (!tempExists) {
          return [...prev, { ...message, status: "sent" }];
        }

        return prev.map((m) =>
          m.tempId === tempId ? { ...message, status: "sent" } : m,
        );
      });
    };

    client.on("connect", onConnect);
    client.on("disconnect", onDisconnect);
    client.on("connect_error", onConnectError);
    client.on("message:new", onNewMessage);
    client.on("message:sent", onMessageSent);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    if (client.connected) {
      setConnectionStatus("online");
    }

    return () => {
      client.off("connect", onConnect);
      client.off("disconnect", onDisconnect);
      client.off("connect_error", onConnectError);
      client.off("message:new", onNewMessage);
      client.off("message:sent", onMessageSent);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      cleanupAnimation();
    };
  }, [
    cleanupAnimation,
    clearAckTimeout,
    currentUser?.id,
    flushPendingMessages,
    scrollToBottom,
    scrollToBottomIfNearBottom,
  ]);

  const groupedMessages = useMemo(() => {
    return Object.groupBy(messages, (msg) => {
      const d = new Date(msg.createdAt);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    });
  }, [messages]);

  return (
    <div
      className={clsx(
        "grid absolute top-0 left-0 w-full md:relative h-full",
        details && "lg:grid-cols-2",
      )}
    >
      <div className="bg-white relative grid grid-rows-[5.5rem_1fr]">
        {!isPending && channel && (
          <>
            <ChatHeader
              setDetails={setDetails}
              data={channel}
              connectionStatus={connectionStatus}
            />

            <ChatMessagesList
              data={groupedMessages}
              bottomRef={bottomRef}
              containerRef={containerRef}
              onScroll={onContainerScroll}
              fetchNextPage={fetchNextPage}
              prepareForFetchMore={prepareForFetchMore}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              currentUser={currentUser?.id}
            />

            <ChatMessagesForm
              onSendMessage={handleSendMessage}
              isOffline={connectionStatus !== "online"}
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
