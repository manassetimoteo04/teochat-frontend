import { useEffect, useRef } from "react";

export function useChatScroll({ messagesLength, channelId }) {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const prevScrollHeightRef = useRef(0);
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollTop = containerRef.current.scrollHeight;

    isFirstLoadRef.current = false;
  }, [channelId]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!prevScrollHeightRef.current) return;

    const container = containerRef.current;
    const diff = container.scrollHeight - prevScrollHeightRef.current;

    container.scrollTop += diff;
    prevScrollHeightRef.current = 0;
  }, [messagesLength]);

  function scrollToBottom(smooth = true) {
    bottomRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
    });
  }

  function prepareForFetchMore() {
    if (!containerRef.current) return;

    prevScrollHeightRef.current = containerRef.current.scrollHeight;
  }

  function isNearBottom(threshold = 120) {
    if (!containerRef.current) return false;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    return scrollHeight - scrollTop - clientHeight < threshold;
  }

  return {
    containerRef,
    bottomRef,
    scrollToBottom,
    prepareForFetchMore,
    isNearBottom,
  };
}
