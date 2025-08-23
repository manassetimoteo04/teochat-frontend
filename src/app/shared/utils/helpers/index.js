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
