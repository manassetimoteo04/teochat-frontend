import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getChannelById } from "../../services";

export function useGetChannelById() {
  const { hash } = useLocation();
  const id = hash?.replace("#", "");
  const { data, isPending } = useQuery({
    queryKey: ["channels", id],
    queryFn: async () => getChannelById(id),
    enabled: !!id,
  });
  return { data, isPending };
}
