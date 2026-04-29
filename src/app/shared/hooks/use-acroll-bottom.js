import { useCallback, useLayoutEffect, useRef } from "react";

export function useChatScroll({ messagesLength, channelId }) {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const rafRef = useRef(null);

  const prependSnapshotRef = useRef(null);
  const isFirstLoadRef = useRef(true);
  const stickToBottomRef = useRef(true);
  // REMOVIDO: pendingScrollRef — era a raiz da race condition

  const isNearBottom = useCallback((threshold = 120) => {
    const container = containerRef.current;
    if (!container) return false;
    const { scrollTop, scrollHeight, clientHeight } = container;
    return scrollHeight - scrollTop - clientHeight <= threshold;
  }, []);

  const performScrollToBottom = useCallback((behavior = "smooth") => {
    const container = containerRef.current;
    if (!container) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      // Lê scrollHeight DENTRO do rAF — DOM já foi pintado
      container.scrollTo({ top: container.scrollHeight, behavior });
      rafRef.current = null;
    });
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // Prioridade 1: restaurar posição após carregar mais msgs (infinite scroll up)
    if (prependSnapshotRef.current) {
      const container = containerRef.current;
      const { scrollTop, scrollHeight } = prependSnapshotRef.current;
      container.scrollTop = scrollTop + (container.scrollHeight - scrollHeight);
      prependSnapshotRef.current = null;
      return;
    }

    // Prioridade 2: primeira carga do canal — sempre vai pro fundo
    if (isFirstLoadRef.current) {
      performScrollToBottom("auto");
      isFirstLoadRef.current = false;
      stickToBottomRef.current = true;
      return;
    }

    // Prioridade 3: nova mensagem — só scrolla se estava colado no fundo
    // stickToBottomRef é atualizado pelo onContainerScroll em tempo real,
    // então aqui ele já reflete a posição ANTES da nova mensagem chegar
    if (stickToBottomRef.current) {
      performScrollToBottom("smooth");
    }
  }, [messagesLength, channelId, performScrollToBottom]);

  // Reset ao trocar de canal
  useLayoutEffect(() => {
    isFirstLoadRef.current = true;
    stickToBottomRef.current = true;
  }, [channelId]);

  const scrollToBottom = useCallback(() => {
    stickToBottomRef.current = true;
    performScrollToBottom("smooth");
  }, [performScrollToBottom]);

  const scrollToBottomIfNearBottom = useCallback(
    (smooth = true, threshold = 140) => {
      // Não testa isNearBottom() aqui — deixa o useLayoutEffect decidir
      // via stickToBottomRef que já foi atualizado pelo scroll event
      if (!stickToBottomRef.current) return false;
      performScrollToBottom(smooth ? "smooth" : "auto");
      return true;
    },
    [performScrollToBottom],
  );

  const prepareForFetchMore = useCallback(() => {
    if (!containerRef.current) return;
    prependSnapshotRef.current = {
      scrollHeight: containerRef.current.scrollHeight,
      scrollTop: containerRef.current.scrollTop,
    };
  }, []);

  const onContainerScroll = useCallback(() => {
    stickToBottomRef.current = isNearBottom(120);
  }, [isNearBottom]);

  const cleanupAnimation = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    if (prependSnapshotRef.current) {
      const container = containerRef.current;
      const { scrollTop, scrollHeight } = prependSnapshotRef.current;
      container.scrollTop = scrollTop + (container.scrollHeight - scrollHeight);
      prependSnapshotRef.current = null;
      return;
    }

    if (isFirstLoadRef.current) {
      performScrollToBottom("auto");
      isFirstLoadRef.current = false;
      stickToBottomRef.current = true;
      return;
    }

    if (stickToBottomRef.current) {
      performScrollToBottom("smooth");
    }
  }, [messagesLength, channelId, performScrollToBottom]);
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
