import { useQuery } from "@tanstack/react-query";
import { getEvent } from "../services/event-services";

export function useEvent(id) {
  const { data, isPending } = useQuery({
    queryKey: ["events", id],
    queryFn: () => getEvent(id),
  });
  return { data, isPending };
}
