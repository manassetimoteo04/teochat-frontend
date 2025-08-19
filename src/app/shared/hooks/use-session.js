import { useQuery } from "@tanstack/react-query";
import { getSession } from "../services/get-session";
import { useLocalStorage } from "../hooks/use-localstorage";
export function useSession() {
  const { value } = useLocalStorage("token");
  const { data, isPending, error } = useQuery({
    queryKey: ["session", JSON.parse(value)],
    queryFn: () => getSession({ token: JSON.parse(value) }),
  });
  return { session: data, isPending, error };
}
