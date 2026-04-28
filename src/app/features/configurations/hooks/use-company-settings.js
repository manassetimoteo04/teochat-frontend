import { useQuery } from "@tanstack/react-query";
import { getCompanySettings } from "../services/settings-services";

export function useCompanySettings(companyId) {
  const { data, isPending } = useQuery({
    queryKey: ["settings", "company", companyId],
    queryFn: () => getCompanySettings(companyId),
    enabled: Boolean(companyId),
  });

  return { company: data, isPending };
}
