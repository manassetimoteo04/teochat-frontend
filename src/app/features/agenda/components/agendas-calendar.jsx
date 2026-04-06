import Calendar from "../../../shared/components/calendar/calendar";
import CalendarProvider from "../../../shared/components/calendar/calendar-provider";
import { useGetTeamEvents } from "../../events/hooks/use-get-team-events";
import Spinner from "../../../shared/ui/Spinner";
import ResourceNotFound from "../../../shared/ui/resource-not-found";
function AgendasCalendar({ events, isPending: isPendingProp, error: errorProp }) {
  const shouldFetch = events === undefined;
  const { data, isPending, error } = useGetTeamEvents({}, { enabled: shouldFetch });
  const list = events || data;
  const loading = isPendingProp ?? isPending;
  const err = errorProp ?? error;
  if (loading) return <Spinner />;
  if (err) return <ResourceNotFound error={err} />;
  return (
    <div className="bg-main-bg-color-2 border-t border-gray-100">
      <CalendarProvider list={list}>
        <Calendar />
      </CalendarProvider>
    </div>
  );
}

export default AgendasCalendar;
