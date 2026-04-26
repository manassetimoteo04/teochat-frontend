import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../services/settings-services";

export function useSettingsProfile() {
  const { data, isPending } = useQuery({
    queryKey: ["settings", "profile"],
    queryFn: getMyProfile,
  });

  return { profile: data, isPending };
}
