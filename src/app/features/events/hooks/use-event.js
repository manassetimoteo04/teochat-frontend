import { useQuery } from "@tanstack/react-query";
import { getEvent } from "../services/event-services";
import { useParams } from "react-router-dom";
export function useEvent(eventId) {
  const { companyId } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["events", eventId],
    queryFn: () => getEvent({ eventId, companyId }),
  });
  return { data, isPending };
}
