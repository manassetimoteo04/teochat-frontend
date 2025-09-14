import { useQuery } from "@tanstack/react-query";
import { getSession } from "../services/get-session";
export function useSession() {
  const { data, isPending, error } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });
  return { session: data, isPending, error };
}
