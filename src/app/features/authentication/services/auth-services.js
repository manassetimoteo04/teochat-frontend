import api from "../../../shared/services/api";

export const signUp = async ({ password, email, name }) => {
  try {
    const { data } = await api.post("/auth/sign-up", { password, email, name });
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
