import api from "./api";
export const getSession = async ({ token }) => {
  try {
    const {
      data: { data },
    } = await api.get(`/auth/session/${token}`);
    console.log(data);
    return data;
  } catch (error) {
    throw new error(error);
  }
};
