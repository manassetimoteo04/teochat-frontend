import { useQuery } from "@tanstack/react-query";
import { getCompanyTeams } from "../services/teams-services";
import { useAppContext } from "../../../shared/providers/context";
export function useCompanyTeams() {
  const { currentCompany } = useAppContext();
  const { data, isPending } = useQuery({
    queryKey: ["teams", currentCompany?.id],
    queryFn: () => getCompanyTeams({ companyId: currentCompany?.id }),
  });
  return { data, isPending };
}
