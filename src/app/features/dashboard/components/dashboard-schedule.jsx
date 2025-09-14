import Calendar, { events } from "../../../shared/components/calendar/calendar";
import CalendarProvider from "../../../shared/components/calendar/calendar-provider";

function DashboardSchedule() {
  return (
    <div className="bg-white border-t border-gray-100 mt-[3rem] h-full">
      <CalendarProvider view="month" list={events}>
        <Calendar />
      </CalendarProvider>
    </div>
  );
}

export default DashboardSchedule;
