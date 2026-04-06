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

export async function updateProject(projectId, values) {
  try {
    const {
      data: { data },
    } = await api.put(`/projects/${projectId}`, values);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteProject(projectId) {
  try {
    await api.delete(`/projects/${projectId}`);
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

export async function getTasksByProjectId(projectId, params = {}) {
  try {
    const cleanParams = { ...params };
    Object.keys(cleanParams).forEach((key) => {
      if (
        cleanParams[key] === undefined ||
        cleanParams[key] === null ||
        cleanParams[key] === ""
      )
        delete cleanParams[key];
    });
    const { data } = await api.get(`/tasks/${projectId}/projects`, {
      params: cleanParams,
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getTeamProjects({
  teamId,
  query,
  range,
  status,
  page,
  limit,
  sort,
}) {
  try {
    const params = { query, range, status, page, limit, sort };
    Object.keys(params).forEach((key) => {
      if (params[key] === undefined || params[key] === null || params[key] === "")
        delete params[key];
    });
    const {
      data: { data, meta },
    } = await api.get(`/projects/teams/${teamId}`, {
      params,
    });
    if (meta) return { data, meta };
    return data;
  } catch (error) {
    console.log(error);
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

export async function updateProjectTask(id, values) {
  try {
    console.log(id, values);
    const { data } = await api.put(`/tasks/${id}`, values);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteProjectTask(id) {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    throw new Error(error);
  }
}
