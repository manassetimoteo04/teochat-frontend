import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { listChannelsByTeam } from "../../services";

export function useListChannelsByTeam() {
  const { teamId } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["channels", teamId],
    queryFn: async () => listChannelsByTeam(teamId),
  });
  return { data, isPending };
}
