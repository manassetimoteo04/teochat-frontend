import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTeamDetails } from "../services/teams-services";
export function useGetTeamDetails() {
  const { teamId } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["teams", "details", teamId],
    queryFn: () => getTeamDetails(teamId),
  });
  return { data, isPending };
}
