import { useQuery } from "@tanstack/react-query";
import { checkInviteToken } from "../services/companies-services";
export function useCheckInvite(token) {
  const { data, isPending, error } = useQuery({
    queryFn: () => checkInviteToken(token),
    queryKey: ["invite-token", token],
  });
  return { data, isPending, error };
}
