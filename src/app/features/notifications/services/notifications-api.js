import api from "../../../shared/services/api";

export async function getNotifications({ page = 1, limit = 10, status } = {}) {
  const params = { page, limit, status };

  Object.keys(params).forEach((key) => {
    if (params[key] === undefined || params[key] === null || params[key] === "") {
      delete params[key];
    }
  });

  const {
    data: { data },
  } = await api.get("/notifications", { params });

  return data;
}

export async function getNotificationsUnreadCount() {
  const {
    data: { data },
  } = await api.get("/notifications/unread-count");

  return data;
}

export async function markNotificationAsRead(notificationId) {
  const {
    data: { data },
  } = await api.patch(`/notifications/${notificationId}/read`);

  return data;
}

export async function markAllNotificationsAsRead() {
  const {
    data: { data },
  } = await api.patch("/notifications/read-all");

  return data;
}

export async function deleteNotification(notificationId) {
  const {
    data: { data },
  } = await api.delete(`/notifications/${notificationId}`);

  return data;
}

export async function deleteAllNotifications() {
  const {
    data: { data },
  } = await api.delete("/notifications");

  return data;
}
