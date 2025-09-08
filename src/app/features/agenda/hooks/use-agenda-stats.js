import { isAfter } from "date-fns";
import { useGetTeamEvents } from "../../events/hooks/use-get-team-events";

export function useAgendaStats() {
  const { data } = useGetTeamEvents();
  const todayEvents = data?.filter(
    (event) => new Date(event.date).toDateString() === new Date().toDateString()
  ).length;
  const canceledEvents = data?.filter(
    (event) => event.status === "canceled"
  ).length;
  const upcomingEvents = data?.filter((event) =>
    isAfter(new Date(event.date), new Date())
  ).length;
  const statsItems = [
    {
      title: "Total Eventos",
      value: data.length,
    },
    {
      title: "Eventos de Hoje",
      value: todayEvents,
    },
    {
      title: "Eventos Próximos",
      value: upcomingEvents,
    },
    {
      title: "Eventos Cancelados",
      value: canceledEvents,
    },
  ];
  return statsItems;
}
