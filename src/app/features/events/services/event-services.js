import api from "../../../shared/services/api";

export const createNewEvent = async ({ companyId, ...newEvent }) => {
  try {
    const {
      data: { data },
    } = await api.post(`events/${companyId}`, newEvent);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export async function createMany(events) {
  await Promise.all(events.map((event) => createNewEvent(event)));
}

export const getTeamEvents = async ({ companyId, teamId }) => {
  try {
    const {
      data: { data },
    } = await api.get(`events/${companyId}/team/${teamId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const getCompanyEvents = async ({ companyId }) => {
  try {
    const {
      data: { data },
    } = await api.get(`events/${companyId}/`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const getEvent = async ({ eventId, companyId }) => {
  try {
    const {
      data: { data },
    } = await api.get(`events/${companyId}/${eventId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const updateEvent = async ({ companyId, eventId, ...updateData }) => {
  try {
    const {
      data: { data },
    } = await api.put(`events/${companyId}/${eventId}`, {
      ...updateData,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const cancelEvent = async ({ eventId, companyId }) => {
  try {
    const {
      data: { data },
    } = await api.put(`events/${companyId}/${eventId}/cancel`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
