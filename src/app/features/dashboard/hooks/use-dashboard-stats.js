import { useCompanyMembers } from "../../companies/hooks/use-company-members";
import { useGetCompanyEvents } from "../../events/hooks/use-get-company-event";
import { useCompanyTeams } from "../../teams/hooks/use-company-teams";
import { memberStatsItems, statsItems } from "../constants";

export function useDashboardStats({ currentRole, currentUserId }) {
  const { data: members } = useCompanyMembers();
  const { data: teams } = useCompanyTeams();
  const { data: events } = useGetCompanyEvents();

  const teamsList = Array.isArray(teams) ? teams : [];
  const eventsList = Array.isArray(events) ? events : [];
  const upcomingEvents = eventsList.filter((event) => {
    if (!event?.date) return false;
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  });
  const teamsWithMembers = teamsList.filter(
    (team) => (team.members?.length || 0) > 0,
  );
  const memberTeams = teamsList;
  const memberEvents = eventsList;

  const values = {
    members: members?.length || 0,
    teams: teams?.length || 0,
    events: events?.length || 0,
    upcomingEvents: upcomingEvents.length,
    teamsWithMembers: teamsWithMembers.length,
    myTeams: memberTeams.length,
    myEvents: memberEvents.length,
  };
  const baseStats = statsItems.map((stat) => ({
    ...stat,
    value: values[stat.key],
  }));
  const memberStats = memberStatsItems.map((stat) => ({
    ...stat,
    value: values[stat.key],
  }));

  return currentRole === "member" ? memberStats : baseStats;
}
