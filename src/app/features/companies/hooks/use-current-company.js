import { useQuery } from "@tanstack/react-query";
import { getCurrentCompany } from "../services/companies-services";

export function useCurrentCompany(id) {
  const { data, isPending } = useQuery({
    queryKey: ["companies", "current", id],
    queryFn: () => getCurrentCompany(id),
  });
  return { company: data, isPending };
}
