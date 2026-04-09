import api from "../../../shared/services/api";

export async function getTeamCalls({ teamId, query, range, page, limit }) {
  try {
    const params = { query, range, page, limit };
    Object.keys(params).forEach((key) => {
      if (params[key] === undefined || params[key] === null || params[key] === "")
        delete params[key];
    });
    const {
      data: { data, meta },
    } = await api.get(`/meetings/teams/${teamId}/calls`, { params });
    if (meta) return { data, meta };
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
