import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTeamCalls } from "../services/meeting-services";

export function useTeamCalls(filters = {}, options = {}) {
  const { teamId } = useParams();
  const { query, range, page, limit } = filters;
  const { enabled = true } = options;
  const { data, isPending, error } = useQuery({
    queryKey: ["meetings", "calls", teamId, query, range, page, limit],
    queryFn: () => getTeamCalls({ teamId, query, range, page, limit }),
    enabled: Boolean(teamId) && enabled,
  });

  const normalized = Array.isArray(data) ? { data, meta: null } : data || {};
  const mapped = (normalized.data || []).map((call) => {
    const startTime = call.startTime || call.event?.startTime || call.createdAt;
    const endTime = call.endTime || call.event?.endTime || startTime;
    return {
      id: call.id,
      title: call.event?.title || "Reunião sem evento",
      description: call.event?.description || "Sem descrição",
      type: call.event?.type || "video-call",
      status: call.event?.status || call.status || "pending",
      date: call.event?.date || startTime,
      startTime,
      endTime,
      location: call.event?.location,
      teamId: call.teamId,
      eventId: call.eventId,
      duration: call.duration,
    };
  });
  return {
    data: mapped,
    meta: normalized.meta || null,
    isPending,
    error,
  };
}
