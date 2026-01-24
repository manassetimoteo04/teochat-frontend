import api from "../../../shared/services/api";

export async function listChannelsByTeam(teamId) {
  try {
    const { data } = await api.get(`/channels/${teamId}/team`);
    return data.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createChatChannel(channel) {
  try {
    const { data } = await api.post(`/channels`, channel);
    return data.data;
  } catch (error) {
    throw new Error(error);
  }
}
