import { useMemo } from "react";
import { useGetCompanyEvents } from "../../events/hooks/use-get-company-event";
import { useCompanyTeams } from "../../teams/hooks/use-company-teams";
import { useAppContext } from "../../../shared/providers/context";
import CardBox from "../ui/card-box";
import Spinner from "../../../shared/ui/Spinner";
import { formatDate, formatHour } from "../../../shared/utils/helpers";

function DashboardUpcomingEvents() {
  const { currentRole, currentUser } = useAppContext();
  const { data: events, isPending } = useGetCompanyEvents();
  const { data: teams } = useCompanyTeams();

  const upcomingEvents = useMemo(() => {
    const eventsList = Array.isArray(events) ? events : [];
    const teamsList = Array.isArray(teams) ? teams : [];
    const memberTeamIds = new Set(
      teamsList
        .filter((team) =>
          team.members?.some((member) => member.id === currentUser?.id),
        )
        .map((team) => team.id),
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return eventsList
      .filter((event) => event?.date)
      .filter((event) => {
        const eventDate = new Date(event.date);
        if (eventDate < today) return false;
        if (currentRole !== "member") return true;
        const eventTeamId = event.teamId || event.team?.id;
        return memberTeamIds.has(eventTeamId);
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 4);
  }, [events, teams, currentRole, currentUser?.id]);

  return (
    <CardBox title="Próximos eventos">
      <div className="min-h-[22rem] px-[2rem] pb-[2rem]">
        {isPending && <Spinner />}
        {!isPending && upcomingEvents.length < 1 && (
          <div className="text-secondary-text-color text-[1.3rem]">
            Nenhum evento próximo encontrado.
          </div>
        )}
        {!isPending &&
          upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between border-b border-gray-100 py-[1.2rem] last:border-b-0"
            >
              <div>
                <p className="text-main-text-color font-medium">
                  {event.title}
                </p>
                <p className="text-[1.2rem] text-secondary-text-color">
                  {formatDate(new Date(event.date), true, true)}
                </p>
              </div>
              <div className="text-[1.2rem] text-secondary-text-color">
                {event.startTime ? formatHour(event.startTime) : "--:--"}
              </div>
            </div>
          ))}
      </div>
    </CardBox>
  );
}

export default DashboardUpcomingEvents;
