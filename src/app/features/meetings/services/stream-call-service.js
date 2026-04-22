import api from "../../../shared/services/api";

function extractToken(responseData) {
  const data = responseData?.data ?? responseData;

  if (!data) return "";
  if (typeof data === "string") return data;

  return data.token || data.streamToken || data.accessToken || "";
}

export async function getStreamCallToken({ callId, teamId, companyId }) {
  try {
    const { data } = await api.post("/meetings/stream/token", {
      callId,
      teamId,
      companyId,
    });

    const token = extractToken(data);
    if (!token) {
      throw new Error("Token vazio retornado pelo servidor");
    }

    return token;
  } catch (error) {
    throw new Error(
      error?.message ||
        "Não foi possível obter o token da chamada. Configure VITE_STREAM_API_KEY e implemente o endpoint POST /api/v1/meetings/stream/token.",
    );
  }
}
