import { useEffect, useState } from "react";
import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { getStreamCallToken } from "../services/stream-call-service";

export function useStreamCallRoom({
  currentUser,
  callId,
  companyId,
  teamId,
  enabled = true,
}) {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!enabled) {
      setClient(null);
      setCall(null);
      setError("");
      setIsLoading(false);
      return;
    }

    if (!currentUser?.id || !callId) return;

    setIsLoading(true);
    setError("");

    const apiKey = import.meta.env.VITE_STREAM_API_KEY;

    if (!apiKey) {
      setError("Falta configurar VITE_STREAM_API_KEY no .env");
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    let videoClient;
    let nextCall;

    (async () => {
      try {
        videoClient = new StreamVideoClient({
          apiKey,
          user: {
            id: String(currentUser.id),
            name: currentUser.name || "Utilizador",
            image: currentUser.avatar || undefined,
          },
          tokenProvider: () =>
            getStreamCallToken({
              callId,
              teamId,
              companyId,
            }),
        });

        nextCall = videoClient.call("default", callId);

        await nextCall.getOrCreate({
          data: {
            created_by_id: String(currentUser.id),
            custom: {
              teamId,
              companyId,
            },
          },
        });

        await nextCall.join({ create: false });

        if (!isMounted) return;

        setClient(videoClient);
        setCall(nextCall);
        setIsLoading(false);
      } catch (err) {
        if (!isMounted) return;

        setError(err?.message || "Falha ao iniciar chamada");
        setIsLoading(false);
      }
    })();

    return () => {
      isMounted = false;
      nextCall?.leave().catch(() => null);
      videoClient?.disconnectUser().catch(() => null);
    };
  }, [callId, companyId, currentUser, enabled, teamId]);

  return {
    client,
    call,
    isLoading,
    error,
  };
}
