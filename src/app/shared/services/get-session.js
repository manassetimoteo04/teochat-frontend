import api from "./api";
export const getSession = async () => {
  try {
    const {
      data: { data },
    } = await api.get(`/auth/session/`);
    return data;
  } catch (error) {
    throw new error(error);
  }
};
