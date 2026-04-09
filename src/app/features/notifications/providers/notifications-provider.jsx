import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  clearNotificationQueries,
  getNotificationFromQueries,
  incrementUnreadCountInQuery,
  markAllNotificationsAsReadInQueries,
  removeNotificationFromQueries,
  setUnreadCountInQuery,
  upsertNotificationInQueries,
} from "../hooks/use-notifications";
import { ensureSocketConnected } from "../../../shared/services/socket-client";

const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const queryClient = useQueryClient();
  const location = useLocation();
  const { companyId } = useParams();

  useEffect(() => {
    setIsPanelOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!companyId) return undefined;

    const socket = ensureSocketConnected();

    function handleNewNotification(payload) {
      const notification = payload?.notification;

      if (!notification?.id) return;

      const previous = getNotificationFromQueries(queryClient, notification.id);

      upsertNotificationInQueries(queryClient, notification, { prepend: true });

      if (!previous && notification.status === "unread") {
        incrementUnreadCountInQuery(queryClient, 1);
      }
    }

    function handleUpdatedNotification(payload) {
      const notification = payload?.notification;

      if (!notification?.id) return;

      const previous = getNotificationFromQueries(queryClient, notification.id);

      upsertNotificationInQueries(queryClient, notification);

      if (previous?.status !== notification.status) {
        if (previous?.status === "unread" && notification.status === "read") {
          incrementUnreadCountInQuery(queryClient, -1);
        }

        if (previous?.status === "read" && notification.status === "unread") {
          incrementUnreadCountInQuery(queryClient, 1);
        }
      }
    }

    function handleDeletedNotification(payload) {
      const notificationId = payload?.notificationId;

      if (!notificationId) return;

      const previous = getNotificationFromQueries(queryClient, notificationId);

      removeNotificationFromQueries(queryClient, notificationId);

      if (previous?.status === "unread") {
        incrementUnreadCountInQuery(queryClient, -1);
      }
    }

    function handleAllRead(payload) {
      markAllNotificationsAsReadInQueries(queryClient);
      setUnreadCountInQuery(queryClient, payload?.unreadCount || 0);
    }

    function handleAllDeleted() {
      clearNotificationQueries(queryClient);
      setUnreadCountInQuery(queryClient, 0);
    }

    function handleUnreadCount(payload) {
      setUnreadCountInQuery(queryClient, payload?.unreadCount || 0);
    }

    socket.on("notification:new", handleNewNotification);
    socket.on("notification:updated", handleUpdatedNotification);
    socket.on("notification:deleted", handleDeletedNotification);
    socket.on("notification:all-read", handleAllRead);
    socket.on("notification:all-deleted", handleAllDeleted);
    socket.on("notification:unread-count", handleUnreadCount);

    return () => {
      socket.off("notification:new", handleNewNotification);
      socket.off("notification:updated", handleUpdatedNotification);
      socket.off("notification:deleted", handleDeletedNotification);
      socket.off("notification:all-read", handleAllRead);
      socket.off("notification:all-deleted", handleAllDeleted);
      socket.off("notification:unread-count", handleUnreadCount);
    };
  }, [companyId, queryClient]);

  const value = useMemo(
    () => ({
      isPanelOpen,
      openPanel: () => setIsPanelOpen(true),
      closePanel: () => setIsPanelOpen(false),
      togglePanel: () => setIsPanelOpen((open) => !open),
    }),
    [isPanelOpen],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotificationsCenter() {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error("Notifications context must be used inside NotificationsProvider.");
  }

  return context;
}
