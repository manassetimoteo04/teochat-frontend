import { useQuery } from "@tanstack/react-query";
import { getCompanyInvitations } from "../services/settings-services";

export function useCompanyInvitations(companyId) {
  const { data, isPending } = useQuery({
    queryKey: ["settings", "invitations", companyId],
    queryFn: () => getCompanyInvitations(companyId),
    enabled: Boolean(companyId),
  });

  return { invitations: data, isPending };
}
