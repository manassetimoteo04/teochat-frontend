import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCompanyEvents } from "../services/event-services";

export function useGetCompanyEvents() {
  const { companyId } = useParams();
  const { data, isPending } = useQuery({
    queryFn: () => getCompanyEvents({ companyId }),
    queryKey: ["events", companyId],
  });
  return { data, isPending };
}
