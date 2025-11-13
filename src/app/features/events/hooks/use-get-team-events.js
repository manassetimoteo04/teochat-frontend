import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTeamEvents } from "../services/event-services";

export function useGetTeamEvents() {
  const { teamId, companyId } = useParams();
  const { data, isPending } = useQuery({
    queryFn: () => getTeamEvents({ teamId, companyId }),
    queryKey: ["events", teamId],
  });
  return { data, isPending };
}
