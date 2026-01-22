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

export async function getProjectById(projectId, teamId) {
  try {
    const {
      data: { data },
    } = await api.get(`/projects/${projectId}/${teamId}`);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getTasksByProjectId(projectId) {
  try {
    const { data } = await api.get(`/tasks/${projectId}/projects`);
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
export async function createProjectTask(projectId, values) {
  try {
    const { data } = await api.post(`/tasks/${projectId}`, values);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
