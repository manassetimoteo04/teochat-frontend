import { useQuery } from "@tanstack/react-query";
import { getTeamParticipants } from "../services/teams-services";
import { useParams } from "react-router-dom";

export function useTeamParticipants() {
  const { teamId, companyId } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["teams", "participants", teamId],
    queryFn: () => getTeamParticipants({ teamId, companyId }),
  });
  return { data, isPending };
}
