import { getHours, getMinutes } from "date-fns";

export const rewriteRoles = (role) => {
  const roles = {
    admin: "administrador",
    super_admin: "administrador",
    member: "membro",
    maganer: "gerente",
    team_leader: "líder",
  };
  return roles[role];
};
export const rewriteStatus = (statu) => {
  const status = {
    pending: "pendente",
    active: "activo",
    canceled: "cancelado",
    finished: "terminado",
    inactive: "incativo",
    public: "público",
    private: "privado",
    todo: "Pendente",
    in_progress: "Em progresso",
    done: "Concluído",
    settled: "Concluído",
  };
  return status[statu];
};
export function normalizeText(string) {
  return string
    ?.normalize("NFD")
    ?.replace(/[\u0300-\u036f]/g, "")
    ?.toLowerCase();
}
function calcTimePassed(date1, date2, type) {
  const types = {
    min: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
  };
  return Math.round(Math.abs(date2 - date1) / types[type]);
}
export const formatDate = function (
  date,
  fullDate = false,
  string = false,
  locale = "pt-AO",
  notHour = false,
) {
  const opts = string
    ? {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    : {};
  if (fullDate) return new Intl.DateTimeFormat(locale, opts).format(date);
  const daysPassed = calcTimePassed(new Date(), date, "day");

  if (daysPassed === 0) {
    if (!notHour) {
      const hourPassed = calcTimePassed(new Date(), date, "hour");
      if (hourPassed === 0) {
        const minPassed = calcTimePassed(new Date(), date, "min");
        return `há ${minPassed} min`;
      }
      if (hourPassed > 0) return `há ${hourPassed} horas`;
    }
    return "Hoje";
  }
  if (daysPassed === 1) return "Ontem";
  if (daysPassed <= 7) return `há ${daysPassed} dias`;

  return new Intl.DateTimeFormat(locale).format(date);
};

export function generateAvatar(name) {
  if (!name) return { initials: "?", color: "#ccc" };

  const parts = name.trim().split(" ").filter(Boolean);

  let initials = parts[0][0].toUpperCase();
  if (parts.length > 1) {
    initials += parts[parts.length - 1][0].toUpperCase();
  }

  const color = `#ccc`;

  return { initials, color };
}

export function formatHour(time) {
  const date = new Date(time);

  const hours = getHours(date);
  const minutes = getMinutes(date);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )}`;
}
