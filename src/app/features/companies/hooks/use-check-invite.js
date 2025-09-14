import { useQuery } from "@tanstack/react-query";
import { checkInvite } from "../services/companies-services";
export function useCheckInvite(id) {
  const { data, isPending, error } = useQuery({
    queryFn: () => checkInvite(id),
    queryKey: ["invitations", id],
  });
  return { data, isPending, error };
}
