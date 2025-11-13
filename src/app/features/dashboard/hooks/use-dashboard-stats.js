import { useCompanyMembers } from "../../companies/hooks/use-company-members";
import { useGetCompanyEvents } from "../../events/hooks/use-get-company-event";
import { useCompanyTeams } from "../../teams/hooks/use-company-teams";
import { statsItems } from "../constants";

export function useDashboardStats() {
  const { data: members } = useCompanyMembers();
  const { data: teams } = useCompanyTeams();
  const { data: events } = useGetCompanyEvents();
  const values = {
    members: members?.length || 0,
    teams: teams?.length || 0,
    events: events?.length || 0,
  };
  const stats = statsItems.map((stat) => ({
    ...stat,
    value: values[stat.key],
  }));
  return stats;
}
