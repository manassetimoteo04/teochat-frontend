import api from "../../../shared/services/api";
export const getCompanyTeams = async ({ companyId }) => {
  try {
    const {
      data: { data },
    } = await api.get("teams/company/" + companyId);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const getTeamDetails = async (teamId) => {
  try {
    const {
      data: { data },
    } = await api.get("teams/" + teamId);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const createNewTeam = async ({ newTeam }) => {
  try {
    const {
      data: { data },
    } = await api.post("teams/", newTeam);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const addTeamMembers = async ({ teamId, members }) => {
  try {
    const {
      data: { data },
    } = await api.put(`teams/${teamId}/add-member`, { members });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
