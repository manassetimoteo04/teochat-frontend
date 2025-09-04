import { useQuery } from "@tanstack/react-query";
import { getCompanyMembers } from "../services/companies-services";
import { useAppContext } from "../../../shared/providers/context";
export function useCompanyMembers() {
  const { currentCompany } = useAppContext();
  const { data, isPending } = useQuery({
    queryKey: ["members", currentCompany.id],
    queryFn: () => getCompanyMembers(currentCompany.id),
  });

  return { data, isPending };
}
