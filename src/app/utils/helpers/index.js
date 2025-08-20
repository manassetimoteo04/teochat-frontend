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
