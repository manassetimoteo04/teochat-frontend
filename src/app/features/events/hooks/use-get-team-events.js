import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTeamEvents } from "../services/event-services";

export function useGetTeamEvents() {
  const { teamId } = useParams();
  const { data, isPending, error } = useQuery({
    queryFn: () => getTeamEvents(teamId),
    queryKey: ["events", teamId],
  });
  return { data, isPending };
}
