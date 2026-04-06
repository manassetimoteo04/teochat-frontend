import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProjectById } from "../services/project-services";

export function useGetProjectById(projectIdOverride, options = {}) {
  const { teamId, projectId: projectIdFromParams } = useParams();
  const projectId = projectIdOverride || projectIdFromParams;
  const { enabled = true } = options;

  const { data, isPending } = useQuery({
    queryKey: ["projects", projectId],
    queryFn: async () => getProjectById(projectId, teamId),
    enabled: Boolean(projectId) && enabled,
  });

  return { data, isPending };
}
