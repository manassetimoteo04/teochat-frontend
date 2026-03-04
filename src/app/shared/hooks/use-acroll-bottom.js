import { useCallback, useLayoutEffect, useRef } from "react";

export function useChatScroll({ messagesLength, channelId }) {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const rafRef = useRef(null);

  const prependSnapshotRef = useRef(null);
  const pendingScrollRef = useRef(null);
  const isFirstLoadRef = useRef(true);
  const stickToBottomRef = useRef(true);

  const isNearBottom = useCallback((threshold = 120) => {
    const container = containerRef.current;
    if (!container) return false;

    const { scrollTop, scrollHeight, clientHeight } = container;
    return scrollHeight - scrollTop - clientHeight <= threshold;
  }, []);

  const performScrollToBottom = useCallback((behavior = "smooth") => {
    const container = containerRef.current;
    if (!container) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior,
      });
      rafRef.current = null;
    });
  }, []);

  const requestScrollToBottom = useCallback(
    (smooth = true, force = false) => {
      const behavior = smooth ? "smooth" : "auto";
      pendingScrollRef.current = { behavior, force };
      if (force || isNearBottom()) {
        performScrollToBottom(behavior);
      }
    },
    [isNearBottom, performScrollToBottom],
  );

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    if (prependSnapshotRef.current) {
      const container = containerRef.current;
      const { scrollTop, scrollHeight } = prependSnapshotRef.current;
      const diff = container.scrollHeight - scrollHeight;
      container.scrollTop = scrollTop + diff;
      prependSnapshotRef.current = null;
      return;
    }

    if (isFirstLoadRef.current) {
      requestScrollToBottom(false, true);
      isFirstLoadRef.current = false;
      stickToBottomRef.current = true;
      return;
    }

    const pending = pendingScrollRef.current;
    if (pending) {
      if (pending.force || isNearBottom()) {
        performScrollToBottom(pending.behavior);
      }
      pendingScrollRef.current = null;
      return;
    }

    if (stickToBottomRef.current) {
      performScrollToBottom("smooth");
    }
  }, [
    channelId,
    isNearBottom,
    messagesLength,
    performScrollToBottom,
    requestScrollToBottom,
  ]);

  function scrollToBottom(smooth = true) {
    requestScrollToBottom(smooth, true);
  }

  function scrollToBottomIfNearBottom(smooth = true, threshold = 140) {
    if (!isNearBottom(threshold)) {
      return false;
    }

    requestScrollToBottom(smooth, true);
    return true;
  }

  function prepareForFetchMore() {
    if (!containerRef.current) return;

    prependSnapshotRef.current = {
      scrollHeight: containerRef.current.scrollHeight,
      scrollTop: containerRef.current.scrollTop,
    };
  }

  const onContainerScroll = useCallback(() => {
    stickToBottomRef.current = isNearBottom(120);
  }, [isNearBottom]);

  const cleanupAnimation = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  return {
    containerRef,
    bottomRef,
    scrollToBottom,
    scrollToBottomIfNearBottom,
    prepareForFetchMore,
    isNearBottom,
    onContainerScroll,
    cleanupAnimation,
  };
}
