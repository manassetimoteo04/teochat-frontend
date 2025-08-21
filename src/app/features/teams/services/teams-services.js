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
