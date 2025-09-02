import api from "../../../shared/services/api";

export const getUserCompanies = async () => {
  try {
    const {
      data: { data },
    } = await api.get(`/users/companies/`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const getCurrentCompany = async (companyId) => {
  try {
    const {
      data: { data },
    } = await api.get(`/companies/${companyId}/current`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const getCompanyMembers = async (companyId) => {
  try {
    const {
      data: { data },
    } = await api.get(`/companies/${companyId}/members`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const getCompanyRecentMembers = async (companyId) => {
  try {
    const {
      data: { data },
    } = await api.get(`/companies/${companyId}/recent-members`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const selectCompanyAuth = async ({ companyId }) => {
  try {
    const { data } = await api.post("/auth/select-company", { companyId });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const createCompany = async (newData) => {
  try {
    const { data } = await api.post("/companies/", newData);
    return { data };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const inviteCompanyMember = async ({ companyId, emails }) => {
  try {
    const { data } = await api.post("/invitations/" + companyId, { emails });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const checkInvite = async (id) => {
  try {
    const {
      data: { data },
    } = await api.get("/invitations/" + id);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const acceptInvite = async (token) => {
  try {
    const { data } = await api.put("/companies/accept-invite/", {
      inviteToken: token,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
