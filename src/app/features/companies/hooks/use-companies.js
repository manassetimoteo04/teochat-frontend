import { useQuery } from "@tanstack/react-query";
import { getUserCompanies } from "../services/companies-services";
export function useCompanies() {
  const { data, isPending } = useQuery({
    queryKey: ["companies"],
    queryFn: getUserCompanies,
  });
  return { data, isPending };
}
