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
export const getTeamDetails = async ({ teamId, companyId }) => {
  try {
    const {
      data: { data },
    } = await api.get(`teams/${teamId}/${companyId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const getTeamParticipants = async ({ teamId, companyId }) => {
  try {
    const {
      data: { data },
    } = await api.get(`teams/${teamId}/members/${companyId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const createNewTeam = async ({ newTeam, companyId }) => {
  try {
    const {
      data: { data },
    } = await api.post("teams/" + companyId, newTeam);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const updateTeam = async ({ updateData, companyId, teamId }) => {
  try {
    const {
      data: { data },
    } = await api.put(`teams/${teamId}/${companyId}`, { updateData });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const addTeamMembers = async ({ teamId, companyId, members }) => {
  try {
    const {
      data: { data },
    } = await api.put(`teams/${teamId}/members/${companyId}/`, { members });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const removeTeamMembers = async ({ teamId, companyId, memberId }) => {
  try {
    const {
      data: { data },
    } = await api.delete(`teams/${teamId}/members/${companyId}/${memberId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const addTeamLider = async ({ teamId, companyId, memberId }) => {
  try {
    const {
      data: { data },
    } = await api.put(`teams/${teamId}/lider/${companyId}/`, { memberId });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const removeTeamLider = async ({ teamId, companyId }) => {
  try {
    const {
      data: { data },
    } = await api.delete(`teams/${teamId}/lider/${companyId}/`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const deleteTeam = async ({ companyId, teamId }) => {
  try {
    await api.delete(`teams/${teamId}/${companyId}`);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
