import api from "../../../shared/services/api";

export const signUp = async ({ password, email, name, avatar }) => {
  try {
    const { data } = await api.post("/auth/sign-up", {
      password,
      email,
      name,
      avatar,
    });
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
export const verifyAccount = async ({ verificationCode }) => {
  try {
    const { data } = await api.post("/auth/verify-account", {
      verificationCode,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export const resendVerificationCode = async () => {
  try {
    await api.post("/auth/verify-account/resend-code");
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
