import { useQuery } from "@tanstack/react-query";
import { getCompanyTeams } from "../services/teams-services";
import { useAppContext } from "../../../shared/providers/context";

export function useCompanyTeams() {
  const { currentCompany } = useAppContext();
  const { data, isPending } = useQuery({
    queryKey: ["teams", "company", currentCompany?.id ?? ""],
    queryFn: async () =>
      await getCompanyTeams({ companyId: currentCompany?.id }),
    enabled: Boolean(currentCompany),
  });

  return { data, isPending };
}
