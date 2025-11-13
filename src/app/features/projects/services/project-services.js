import api from "../../../shared/services/api";

export async function createProject(newProject) {
  try {
    const {
      data: { data },
    } = await api.post("/projects", newProject);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getTeamProjects(teamId) {
  try {
    const {
      data: { data },
    } = await api.get(`/projects/team/${teamId}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
