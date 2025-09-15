import api from "../../../shared/services/api";

export const createNewEvent = async (newEvent) => {
  try {
    console.log(newEvent);
    const {
      data: { data },
    } = await api.post("events/", newEvent);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export async function createMany(events) {
  await Promise.all(events.map((event) => createNewEvent(event)));
}

export const getTeamEvents = async (teamId) => {
  try {
    const {
      data: { data },
    } = await api.get("events/team/" + teamId);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const getEvent = async (eventId) => {
  try {
    const {
      data: { data },
    } = await api.get("events/" + eventId);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const updateEvent = async ({ eventId, ...updateData }) => {
  try {
    const {
      data: { data },
    } = await api.put("events/" + eventId, { ...updateData });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const cancelEvent = async ({ eventId }) => {
  try {
    const {
      data: { data },
    } = await api.put(`events/${eventId}/cancel`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
