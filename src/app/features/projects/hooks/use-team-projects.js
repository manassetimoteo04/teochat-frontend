import { useQuery } from "@tanstack/react-query";
import { getTeamProjects } from "../services/project-services";
import { useParams } from "react-router-dom";

export function useTeamProjects(filters = {}, options = {}) {
  const { teamId } = useParams();
  const { query, range, status, page, limit, sort } = filters;
  const { enabled = true } = options;
  const { data, isPending, error } = useQuery({
    queryKey: ["projects", teamId, query, range, status, page, limit, sort],
    queryFn: () =>
      getTeamProjects({
        teamId,
        query,
        range,
        status,
        page,
        limit,
        sort,
      }),
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
