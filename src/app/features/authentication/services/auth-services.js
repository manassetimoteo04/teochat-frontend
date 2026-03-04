import api from "../../../shared/services/api";

function getStoredToken() {
  const token = localStorage.getItem("token");

  if (!token) return "";

  try {
    return JSON.parse(token);
  } catch {
    return token;
  }
}

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
export const verifyAccount = async ({ code }) => {
  try {
    const { data } = await api.post("/auth/verify-account", {
      code,
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

export const logout = async () => {
  try {
    await api.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      },
    );
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
