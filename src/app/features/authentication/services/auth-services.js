import api from "../../../shared/services/api";

export const signUp = async ({ password, email, name }) => {
  try {
    const { data } = await api.post("/auth/sign-up", { password, email, name });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const signIn = async ({ password, email }) => {
  try {
    const { data } = await api.post("/auth/sign-in", { password, email });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
