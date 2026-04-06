import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTeamEvents } from "../services/event-services";

export function useGetTeamEvents(filters = {}, options = {}) {
  const { teamId, companyId } = useParams();
  const { query, range, timezone, view, page, limit } = filters;
  const { enabled = true } = options;
  const { data, isPending, error } = useQuery({
    queryFn: () =>
      getTeamEvents({
        teamId,
        companyId,
        query,
        range,
        timezone,
        view,
        page,
        limit,
      }),
    queryKey: ["events", teamId, query, range, timezone, view, page, limit],
    enabled,
  });
  const normalized = Array.isArray(data) ? { data, meta: null } : data || {};
  return {
    data: normalized.data || [],
    meta: normalized.meta || null,
    isPending,
    error,
  };
}
