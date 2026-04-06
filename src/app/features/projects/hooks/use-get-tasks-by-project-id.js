import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTasksByProjectId } from "../services/project-services";

export function useGetTasksByProjectId(filters = {}, options = {}) {
  const { projectId } = useParams();
  const { query, status, priority, sort } = filters;
  const { enabled = true } = options;

  const { data, isPending } = useQuery({
    queryKey: ["projects", "tasks", projectId, query, status, priority, sort],
    queryFn: async () =>
      getTasksByProjectId(projectId, { query, status, priority, sort }),
    enabled: Boolean(projectId) && enabled,
  });

  return { data, isPending };
}
