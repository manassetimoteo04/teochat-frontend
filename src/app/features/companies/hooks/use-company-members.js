import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCompanyMembers } from "../services/companies-services";
export function useCompanyMembers() {
  const { companyId } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["members", companyId],
    queryFn: () => getCompanyMembers(companyId),
  });

  return { data, isPending };
}
