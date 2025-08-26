const roles = {
  admin: "administrador",
  super_admin: "administrador",
  member: "membro",
  maganer: "gerente",
  team_leader: "líder",
};
export const rewriteRoles = (role) => {
  return roles[role];
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
  locale = "pt-AO"
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
    const hourPassed = calcTimePassed(new Date(), date, "hour");
    if (hourPassed === 0) {
      const minPassed = calcTimePassed(new Date(), date, "min");
      return `há ${minPassed} min`;
    }
    if (hourPassed > 0) return `há ${hourPassed} horas`;
    return "Hoje";
  }
  if (daysPassed === 1) return "Ontem";
  if (daysPassed <= 7) return `há ${daysPassed} dias`;

  return new Intl.DateTimeFormat(locale).format(date);
};

export function getRandomAvatars(type = "user") {
  const unsplashBase = "https://source.unsplash.com/random/100x100";
  const dicebearBase = "https://api.dicebear.com/7.x";

  const queries = {
    user: "portrait,person",
    team: "abstract,gradient,pattern,geometry",
  };

  const sig = Math.floor(Math.random() * 10000);

  const unsplashUrl = `${unsplashBase}/?${queries[type]}&sig=${sig}`;

  const dicebearStyle = type === "user" ? "avataaars" : "shapes";
  const dicebearUrl = `${dicebearBase}/${dicebearStyle}/svg?seed=${sig}`;

  const useUnsplash = Math.random() > 0.3;

  return useUnsplash ? unsplashUrl : dicebearUrl;
}
