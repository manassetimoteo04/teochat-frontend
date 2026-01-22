import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProjectById } from "../services/project-services";

export function useGetProjectById() {
  const { teamId, projectId } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ["projects", projectId],
    queryFn: async () => getProjectById(projectId, teamId),
  });

  return { data, isPending };
}
