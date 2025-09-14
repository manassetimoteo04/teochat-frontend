import { useQuery } from "@tanstack/react-query";
import { getCompanyRecentMembers } from "../services/companies-services";
import { useAppContext } from "../../../shared/providers/context";
export function useCompanyRecentMembers() {
  const { currentCompany } = useAppContext();

  const { data, isPending } = useQuery({
    queryKey: ["recent-members", currentCompany?.id],
    queryFn: () => getCompanyRecentMembers(currentCompany?.id),
  });

  return { data, isPending };
}
