import api from "./api";
export const getSession = async ({ token }) => {
  try {
    const {
      data: { data },
    } = await api.get(`/auth/session/${token}`);
    return data;
  } catch (error) {
    throw new error(error);
  }
};
