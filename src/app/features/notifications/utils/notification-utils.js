import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  ClipboardPenLine,
  ClipboardPlus,
  Clock3,
  FolderKanban,
  ShieldCheck,
  UserPlus2,
  Users,
} from "lucide-react";

const CATEGORY_META = {
  account: {
    label: "Conta",
    icon: ShieldCheck,
    iconClassName: "text-emerald-600",
    badgeClassName: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  events: {
    label: "Evento",
    icon: CalendarDays,
    iconClassName: "text-blue-600",
    badgeClassName: "bg-blue-50 text-blue-700 border-blue-100",
  },
  tasks: {
    label: "Tarefa",
    icon: FolderKanban,
    iconClassName: "text-amber-600",
    badgeClassName: "bg-amber-50 text-amber-700 border-amber-100",
  },
  default: {
    label: "Notificação",
    icon: Bell,
    iconClassName: "text-slate-600",
    badgeClassName: "bg-slate-100 text-slate-700 border-slate-200",
  },
};

const TYPE_META = {
  company_invite: {
    label: "Convite para empresa",
    icon: UserPlus2,
  },
  team_member_added: {
    label: "Novo membro na equipa",
    icon: Users,
  },
  team_leader_promoted: {
    label: "Promoção de líder",
    icon: ShieldCheck,
  },
  event_created: {
    label: "Novo evento",
    icon: CalendarDays,
  },
  event_updated: {
    label: "Evento atualizado",
    icon: CalendarDays,
  },
  event_canceled: {
    label: "Evento cancelado",
    icon: CalendarDays,
  },
  event_upcoming: {
    label: "Lembrete de evento",
    icon: CalendarDays,
  },
  task_created: {
    label: "Nova tarefa",
    icon: ClipboardPlus,
  },
  task_assigned: {
    label: "Tarefa atribuída",
    icon: ClipboardPenLine,
  },
  task_updated: {
    label: "Tarefa atualizada",
    icon: ClipboardPenLine,
  },
  task_completed: {
    label: "Tarefa concluída",
    icon: CheckCircle2,
  },
  task_due_soon: {
    label: "Prazo próximo",
    icon: Clock3,
  },
};

const APP_ROUTE_SEGMENTS = new Set([
  "dashboard",
  "teams",
  "chats",
  "meetings",
  "projects",
  "agendas",
  "configurations",
  "notifications",
]);

function readRouteValue(notification, keys = []) {
  for (const key of keys) {
    const value = notification?.metadata?.[key];

    if (typeof value === "string" && value.trim()) {
      return value;
    }

    if (value && typeof value === "object") {
      if (typeof value.id === "string" && value.id.trim()) return value.id;
    }
  }

  return null;
}

function replacePathParams(path, params) {
  return Object.entries(params).reduce((result, [key, value]) => {
    if (!value) return result;

    return result.replaceAll(`:${key}`, value);
  }, path);
}

function getNotificationRouteParams(notification, companyId) {
  return {
    companyId:
      readRouteValue(notification, ["companyId", "company", "company_id"]) ||
      companyId ||
      null,
    teamId:
      readRouteValue(notification, ["teamId", "team", "team_id"]) ||
      (notification?.entity?.kind === "team" ? notification?.entity?.id : null),
    eventId:
      readRouteValue(notification, ["eventId", "event", "event_id"]) ||
      (notification?.entity?.kind === "event" ? notification?.entity?.id : null),
    projectId:
      readRouteValue(notification, ["projectId", "project", "project_id"]) ||
      (notification?.entity?.kind === "project" ? notification?.entity?.id : null),
    taskId:
      readRouteValue(notification, ["taskId", "task", "task_id"]) ||
      (notification?.entity?.kind === "task" ? notification?.entity?.id : null),
    invitationId:
      readRouteValue(notification, [
        "invitationId",
        "inviteId",
        "companyInvitationId",
      ]) ||
      (notification?.entity?.kind === "invitation" ? notification?.entity?.id : null),
  };
}

export function formatNotificationRelativeTime(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  const now = Date.now();
  const diffMs = date.getTime() - now;
  const diffSeconds = Math.round(diffMs / 1000);
  const absSeconds = Math.abs(diffSeconds);
  const formatter = new Intl.RelativeTimeFormat("pt-PT", { numeric: "auto" });

  if (absSeconds < 60) return "agora";
  if (absSeconds < 3600) {
    return formatter.format(Math.round(diffSeconds / 60), "minute");
  }
  if (absSeconds < 86400) {
    return formatter.format(Math.round(diffSeconds / 3600), "hour");
  }
  if (absSeconds < 604800) {
    return formatter.format(Math.round(diffSeconds / 86400), "day");
  }

  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function getNotificationCategoryMeta(notification) {
  return (
    CATEGORY_META[notification?.category] ||
    CATEGORY_META[notification?.type] ||
    CATEGORY_META.default
  );
}

export function getNotificationTypeMeta(type) {
  return TYPE_META[type] || CATEGORY_META.default;
}

export function getNotificationPrimaryLabel(notification) {
  return TYPE_META[notification?.type]?.label || notification?.title || "Notificação";
}

export function getNotificationSecondaryLabel(notification) {
  const labels = {
    company_invite: "Novo acesso pendente",
    team_member_added: "Mudança na equipa",
    team_leader_promoted: "Atualização de função",
    event_created: "Agenda atualizada",
    event_updated: "Agenda atualizada",
    event_canceled: "Agenda atualizada",
    event_upcoming: "Lembrete automático",
    task_created: "Nova tarefa no projeto",
    task_assigned: "Atribuição de tarefa",
    task_updated: "Mudança numa tarefa",
    task_completed: "Entrega concluída",
    task_due_soon: "Prazo a aproximar-se",
  };

  return labels[notification?.type] || null;
}

export function getNotificationActor(notification) {
  if (!notification?.actor) return null;

  return {
    id: notification.actor.id,
    name: notification.actor.name || "Utilizador",
    avatar: notification.actor.avatar || null,
  };
}

export function resolveNotificationPath(notification, companyId) {
  const fallbackCompanyId =
    companyId ||
    readRouteValue(notification, ["companyId", "company", "company_id"]);

  if (!fallbackCompanyId) return null;

  const fallbackPath = `/${fallbackCompanyId}/notifications`;
  const params = getNotificationRouteParams(notification, fallbackCompanyId);
  const rawPath = notification?.action?.path;

  if (!rawPath) return fallbackPath;

  const interpolatedPath = replacePathParams(rawPath, params);

  if (interpolatedPath.startsWith("http://") || interpolatedPath.startsWith("https://")) {
    return interpolatedPath;
  }

  const normalizedPath = interpolatedPath.replace(/\/+$/, "");
  const backendMatch = normalizedPath.match(/^\/companies\/([^/]+)(\/.*)?$/);

  if (backendMatch) {
    const resolvedCompanyId = backendMatch[1] || fallbackCompanyId;
    const suffix = backendMatch[2] || "";

    const projectMatch = suffix.match(/^\/teams\/([^/]+)\/projects\/([^/?#]+)/);

    if (projectMatch) {
      const [, teamId, projectId] = projectMatch;

      return `/${resolvedCompanyId}/projects/${teamId}/${projectId}`;
    }

    if (suffix.startsWith("/teams/")) {
      return `/${resolvedCompanyId}${suffix}`;
    }

    if (suffix.startsWith("/events/")) {
      const eventId = suffix.split("/")[2];
      const teamId = params.teamId;

      if (teamId) {
        return `/${resolvedCompanyId}/agendas/${teamId}?eventId=${eventId}`;
      }

      return fallbackPath;
    }

    if (suffix.startsWith("/invitations")) {
      if (params.invitationId) {
        return `/companies/join/${params.invitationId}`;
      }

      return fallbackPath;
    }

    return `/${resolvedCompanyId}${suffix}` || fallbackPath;
  }

  const pathParts = normalizedPath.split("/").filter(Boolean);

  if (
    pathParts.length > 1 &&
    APP_ROUTE_SEGMENTS.has(pathParts[1]) &&
    pathParts[0] === fallbackCompanyId
  ) {
    return normalizedPath;
  }

  if (normalizedPath.startsWith("/notifications")) {
    return fallbackPath;
  }

  return fallbackPath;
}

export function mergeNotificationItems(items = [], incomingItems = [], { prepend = false } = {}) {
  const mergedMap = new Map();
  const source = prepend ? [...incomingItems, ...items] : [...items, ...incomingItems];

  source.forEach((item) => {
    if (!item?.id) return;

    const previous = mergedMap.get(item.id);

    if (!previous) {
      mergedMap.set(item.id, item);
      return;
    }

    const previousDate = new Date(previous.updatedAt || previous.createdAt || 0).getTime();
    const nextDate = new Date(item.updatedAt || item.createdAt || 0).getTime();

    mergedMap.set(item.id, nextDate >= previousDate ? item : previous);
  });

  return Array.from(mergedMap.values()).sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
  );
}

export function createAvatarFallback(name = "") {
  const words = name.trim().split(" ").filter(Boolean);

  if (!words.length) return "?";

  if (words.length === 1) return words[0][0].toUpperCase();

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

export function getNotificationAccentMeta(notification) {
  const categoryMeta = getNotificationCategoryMeta(notification);
  const typeMeta = getNotificationTypeMeta(notification?.type);

  return {
    Icon: typeMeta.icon || categoryMeta.icon || Bell,
    iconClassName: categoryMeta.iconClassName,
  };
}
