import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  deleteAllNotifications,
  deleteNotification,
  getNotifications,
  getNotificationsUnreadCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../services/notifications-api";
import {
  mergeNotificationItems,
  resolveNotificationPath,
} from "../utils/notification-utils";

export const notificationsKeys = {
  all: ["notifications"],
  lists: () => [...notificationsKeys.all, "list"],
  list: (params) => [...notificationsKeys.lists(), params],
  unreadCount: () => [...notificationsKeys.all, "unread-count"],
};

function getListParams(queryKey) {
  return queryKey?.[2] || {};
}

function getAllNotificationListEntries(queryClient) {
  return queryClient.getQueriesData({ queryKey: notificationsKeys.lists() });
}

function findNotificationInCache(queryClient, notificationId) {
  const entries = getAllNotificationListEntries(queryClient);

  for (const [, data] of entries) {
    const match = data?.items?.find((item) => item.id === notificationId);

    if (match) return match;
  }

  return null;
}

function updateNotificationListQueries(queryClient, updater) {
  const entries = getAllNotificationListEntries(queryClient);

  entries.forEach(([queryKey]) => {
    const params = getListParams(queryKey);

    queryClient.setQueryData(queryKey, (currentData) => updater(currentData, params));
  });
}

function snapshotNotificationsCache(queryClient) {
  return {
    lists: getAllNotificationListEntries(queryClient),
    unreadCount: queryClient.getQueryData(notificationsKeys.unreadCount()),
  };
}

function restoreNotificationsCache(queryClient, snapshot) {
  snapshot?.lists?.forEach(([queryKey, data]) => {
    queryClient.setQueryData(queryKey, data);
  });

  queryClient.setQueryData(notificationsKeys.unreadCount(), snapshot?.unreadCount);
}

function updateUnreadCountCache(queryClient, updater) {
  queryClient.setQueryData(notificationsKeys.unreadCount(), (currentData) => {
    const safeCurrent = currentData || { unreadCount: 0 };
    const nextCount =
      typeof updater === "function" ? updater(safeCurrent.unreadCount) : updater;

    return {
      unreadCount: Math.max(0, Number(nextCount) || 0),
    };
  });
}

function applyNotificationUpsert(currentData, params, notification, { prepend = false } = {}) {
  if (!currentData) return currentData;

  const filter = params?.status;
  const exists = currentData.items?.some((item) => item.id === notification.id);
  const matchesFilter = !filter || filter === notification.status;
  const shouldInsert = prepend && (!params?.page || params.page === 1);

  if (!exists && !matchesFilter) {
    return currentData;
  }

  let nextItems = currentData.items || [];

  if (exists || matchesFilter) {
    nextItems = mergeNotificationItems(nextItems, [notification], { prepend: shouldInsert });
  }

  if (!matchesFilter) {
    nextItems = nextItems.filter((item) => item.id !== notification.id);
  }

  return {
    ...currentData,
    items: nextItems,
  };
}

function applyNotificationRemoval(currentData, notificationId) {
  if (!currentData) return currentData;

  const nextItems = (currentData.items || []).filter((item) => item.id !== notificationId);

  if (nextItems.length === (currentData.items || []).length) return currentData;

  return {
    ...currentData,
    items: nextItems,
    total: Math.max(0, (currentData.total || 0) - 1),
  };
}

function applyNotificationRead(currentData, params, notificationId) {
  if (!currentData) return currentData;

  const filter = params?.status;
  const target = currentData.items?.find((item) => item.id === notificationId);

  if (!target) return currentData;

  if (filter === "unread") {
    return applyNotificationRemoval(currentData, notificationId);
  }

  return {
    ...currentData,
    items: currentData.items.map((item) =>
      item.id === notificationId
        ? {
            ...item,
            status: "read",
            readAt: item.readAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        : item,
    ),
  };
}

function applyAllRead(currentData, params) {
  if (!currentData) return currentData;

  if (params?.status === "unread") {
    return {
      ...currentData,
      items: [],
      total: 0,
    };
  }

  return {
    ...currentData,
    items: (currentData.items || []).map((item) => ({
      ...item,
      status: "read",
      readAt: item.readAt || new Date().toISOString(),
    })),
  };
}

function clearNotificationsList(currentData) {
  if (!currentData) return currentData;

  return {
    ...currentData,
    items: [],
    total: 0,
    unreadCount: 0,
    pages: 0,
  };
}

export function useUnreadNotificationsCount(enabled = true) {
  return useQuery({
    queryKey: notificationsKeys.unreadCount(),
    queryFn: getNotificationsUnreadCount,
    enabled,
    staleTime: Infinity,
  });
}

export function useNotifications({ page = 1, limit = 10, status, enabled = true } = {}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { companyId } = useParams();

  const listQuery = useQuery({
    queryKey: notificationsKeys.list({ page, limit, status: status || null }),
    queryFn: () => getNotifications({ page, limit, status }),
    enabled,
    placeholderData: (previousData) => previousData,
  });

  const unreadCountQuery = useUnreadNotificationsCount(enabled);

  const markOneAsReadMutation = useMutation({
    mutationFn: markNotificationAsRead,
    onMutate: async (notificationId) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: notificationsKeys.lists() }),
        queryClient.cancelQueries({ queryKey: notificationsKeys.unreadCount() }),
      ]);

      const snapshot = snapshotNotificationsCache(queryClient);
      const currentNotification = findNotificationInCache(queryClient, notificationId);

      updateNotificationListQueries(queryClient, (currentData, params) =>
        applyNotificationRead(currentData, params, notificationId),
      );

      if (currentNotification?.status === "unread") {
        updateUnreadCountCache(queryClient, (count) => count - 1);
      }

      return { snapshot };
    },
    onError: (error, _notificationId, context) => {
      restoreNotificationsCache(queryClient, context?.snapshot);
      toast.error(error.message);
    },
    onSuccess: (notification) => {
      updateNotificationListQueries(queryClient, (currentData, params) =>
        applyNotificationUpsert(currentData, params, notification),
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.unreadCount() });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: notificationsKeys.lists() }),
        queryClient.cancelQueries({ queryKey: notificationsKeys.unreadCount() }),
      ]);

      const snapshot = snapshotNotificationsCache(queryClient);

      updateNotificationListQueries(queryClient, (currentData, params) =>
        applyAllRead(currentData, params),
      );
      updateUnreadCountCache(queryClient, 0);

      return { snapshot };
    },
    onError: (error, _variables, context) => {
      restoreNotificationsCache(queryClient, context?.snapshot);
      toast.error(error.message);
    },
    onSuccess: ({ unreadCount }) => {
      updateUnreadCountCache(queryClient, unreadCount || 0);
      toast.success("Todas as notificações foram marcadas como lidas.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: notificationsKeys.unreadCount() });
    },
  });

  const deleteOneMutation = useMutation({
    mutationFn: deleteNotification,
    onMutate: async (notificationId) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: notificationsKeys.lists() }),
        queryClient.cancelQueries({ queryKey: notificationsKeys.unreadCount() }),
      ]);

      const snapshot = snapshotNotificationsCache(queryClient);
      const currentNotification = findNotificationInCache(queryClient, notificationId);

      updateNotificationListQueries(queryClient, (currentData) =>
        applyNotificationRemoval(currentData, notificationId),
      );

      if (currentNotification?.status === "unread") {
        updateUnreadCountCache(queryClient, (count) => count - 1);
      }

      return { snapshot };
    },
    onError: (error, _notificationId, context) => {
      restoreNotificationsCache(queryClient, context?.snapshot);
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Notificação removida.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: notificationsKeys.unreadCount() });
    },
  });

  const deleteAllMutation = useMutation({
    mutationFn: deleteAllNotifications,
    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: notificationsKeys.lists() }),
        queryClient.cancelQueries({ queryKey: notificationsKeys.unreadCount() }),
      ]);

      const snapshot = snapshotNotificationsCache(queryClient);

      updateNotificationListQueries(queryClient, (currentData) =>
        clearNotificationsList(currentData),
      );
      updateUnreadCountCache(queryClient, 0);

      return { snapshot };
    },
    onError: (error, _variables, context) => {
      restoreNotificationsCache(queryClient, context?.snapshot);
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Notificações removidas.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: notificationsKeys.unreadCount() });
    },
  });

  const openNotification = async (notification, options = {}) => {
    const path = resolveNotificationPath(notification, companyId);
    const shouldMarkAsRead = notification?.status === "unread";

    if (shouldMarkAsRead && !markOneAsReadMutation.isPending) {
      markOneAsReadMutation.mutate(notification.id);
    }

    if (options.onBeforeNavigate) {
      options.onBeforeNavigate();
    }

    if (!path) return;

    if (path.startsWith("http://") || path.startsWith("https://")) {
      window.location.assign(path);
      return;
    }

    navigate(path);
  };

  const notifications = useMemo(
    () => listQuery.data?.items || [],
    [listQuery.data?.items],
  );

  return {
    ...listQuery,
    notifications,
    meta: {
      total: listQuery.data?.total || 0,
      page: listQuery.data?.page || page,
      limit: listQuery.data?.limit || limit,
      pages: listQuery.data?.pages || 1,
      unreadCount:
        unreadCountQuery.data?.unreadCount ?? listQuery.data?.unreadCount ?? 0,
    },
    unreadCount: unreadCountQuery.data?.unreadCount ?? listQuery.data?.unreadCount ?? 0,
    isUnreadCountLoading: unreadCountQuery.isPending,
    markAsRead: markOneAsReadMutation.mutate,
    markAsReadAsync: markOneAsReadMutation.mutateAsync,
    markAllAsRead: markAllAsReadMutation.mutate,
    deleteNotification: deleteOneMutation.mutate,
    deleteAllNotifications: deleteAllMutation.mutate,
    openNotification,
    isMarkingOneAsRead: markOneAsReadMutation.isPending,
    isMarkingAllAsRead: markAllAsReadMutation.isPending,
    isDeletingOne: deleteOneMutation.isPending,
    isDeletingAll: deleteAllMutation.isPending,
  };
}

export function upsertNotificationInQueries(queryClient, notification, options = {}) {
  updateNotificationListQueries(queryClient, (currentData, params) =>
    applyNotificationUpsert(currentData, params, notification, options),
  );
}

export function removeNotificationFromQueries(queryClient, notificationId) {
  updateNotificationListQueries(queryClient, (currentData) =>
    applyNotificationRemoval(currentData, notificationId),
  );
}

export function markNotificationAsReadInQueries(queryClient, notificationId) {
  updateNotificationListQueries(queryClient, (currentData, params) =>
    applyNotificationRead(currentData, params, notificationId),
  );
}

export function markAllNotificationsAsReadInQueries(queryClient) {
  updateNotificationListQueries(queryClient, (currentData, params) =>
    applyAllRead(currentData, params),
  );
}

export function clearNotificationQueries(queryClient) {
  updateNotificationListQueries(queryClient, (currentData) =>
    clearNotificationsList(currentData),
  );
}

export function setUnreadCountInQuery(queryClient, unreadCount) {
  updateUnreadCountCache(queryClient, unreadCount);
}

export function incrementUnreadCountInQuery(queryClient, amount = 1) {
  updateUnreadCountCache(queryClient, (count) => count + amount);
}

export function getNotificationFromQueries(queryClient, notificationId) {
  return findNotificationInCache(queryClient, notificationId);
}
