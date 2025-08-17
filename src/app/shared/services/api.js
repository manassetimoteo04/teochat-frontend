import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Ocorreu um erro inesperado. Tente novamente.";
    if (error.code === "ECONNABORTED") {
      message = "A requisição demorou muito. Por favor, tente novamente.";
    } else if (!error.response) {
      message = "Erro de conexão. Verifique sua internet.";
    } else {
      const status = error.response.status;
      const data = error.response.data;
      if (status === 400) message = data.message || "Dados inválidos.";
      if (status === 401)
        message = data.error || "Sessão expirada. Faça login novamente.";
      if (status === 403)
        message = data.message || "Você não tem permissão para esta ação.";
      if (status === 404) message = data.error || "Recurso não encontrado.";
      if (status === 409) message = data.error || "Conflito de recursos";
      if (status === 500)
        message = "Erro no servidor. Tente novamente mais tarde.";
    }

    Promise.reject(error);
    throw new Error(message);
  }
);

export default api;
