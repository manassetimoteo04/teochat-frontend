import api from "../../../shared/services/api";

export async function getMyProfile() {
  const {
    data: { data },
  } = await api.get("/users/me");

  return data;
}

export async function updateMyProfile(payload) {
  const isFormData = payload instanceof FormData;

  const {
    data: { data },
  } = await api.patch(
    "/users/me",
    payload,
    isFormData
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      : undefined,
  );

  return data;
}
export async function updateMyPassword(payload) {
  const {
    data: { data },
  } = await api.patch("/users/me/password", payload);

  return data;
}

export async function getCompanySettings(companyId) {
  const {
    data: { data },
  } = await api.get(`/companies/${companyId}`);

  return data;
}

export async function updateCompanySettings({ companyId, payload }) {
  const isFormData = payload instanceof FormData;

  const {
    data: { data },
  } = await api.patch(`/companies/${companyId}/settings`, payload, {
    headers: isFormData
      ? {
          "Content-Type": "multipart/form-data",
        }
      : undefined,
  });

  return data;
}

export async function deactivateCompany(companyId) {
  const {
    data: { data },
  } = await api.patch(`/companies/${companyId}/deactivate`);

  return data;
}

export async function getCompanyInvitations(companyId) {
  const {
    data: { data },
  } = await api.get(`/companies/${companyId}/invitations`);

  return data;
}

export async function promoteCompanyMember({ companyId, memberId }) {
  const {
    data: { data },
  } = await api.patch(`/companies/${companyId}/members/${memberId}/promote`);

  return data;
}

export async function removeCompanyMember({ companyId, memberId }) {
  const {
    data: { data },
  } = await api.delete(`/companies/${companyId}/members/${memberId}`);

  return data;
}
