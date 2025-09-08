import Calendar, { events } from "../../../shared/components/calendar/calendar";
import CalendarProvider from "../../../shared/components/calendar/calendar-provider";
import { useGetTeamEvents } from "../../events/hooks/use-get-team-events";
import Spinner from "../../../shared/ui/Spinner";
import ResourceNotFound from "../../../shared/ui/resource-not-found";
function AgendasCalendar() {
  const { data, isPending, error } = useGetTeamEvents();
  if (isPending) return <Spinner />;
  if (error) return <ResourceNotFound error={error} />;
  return (
    <div className="bg-main-bg-color-2 border-t border-gray-100">
      <CalendarProvider list={data}>
        <Calendar />
      </CalendarProvider>
    </div>
  );
}

export default AgendasCalendar;
