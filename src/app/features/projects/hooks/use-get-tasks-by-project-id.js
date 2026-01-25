import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTasksByProjectId } from "../services/project-services";

export function useGetTasksByProjectId() {
  const { projectId } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ["projects", "tasks", projectId],
    queryFn: async () => getTasksByProjectId(projectId),
  });

  return { data, isPending };
}
