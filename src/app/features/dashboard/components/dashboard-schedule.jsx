import Calendar, { events } from "../../../shared/components/calendar/calendar";
import CalendarProvider from "../../../shared/components/calendar/calendar-provider";
import Spinner from "../../../shared/ui/Spinner";
import { useGetCompanyEvents } from "../../events/hooks/use-get-company-event";

function DashboardSchedule() {
  const { data, isPending } = useGetCompanyEvents();
  if (isPending) return <Spinner />;
  return (
    <div className="bg-white border-t border-gray-100 mt-[3rem] h-full">
      <CalendarProvider view="month" list={data}>
        <Calendar />
      </CalendarProvider>
    </div>
  );
}

export default DashboardSchedule;
