import { useQuery } from "@tanstack/react-query";
import { getTeamProjects } from "../services/project-services";
import { useParams } from "react-router-dom";

export function useTeamProjects() {
  const { teamId } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["projects", teamId],
    queryFn: () => getTeamProjects(teamId),
  });
  return { data, isPending };
}
