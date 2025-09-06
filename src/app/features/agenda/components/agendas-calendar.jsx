import Calendar, { events } from "../../../shared/components/calendar/calendar";
import CalendarProvider from "../../../shared/components/calendar/calendar-provider";

function AgendasCalendar() {
  return (
    <div className="bg-main-bg-color-2 border-t border-gray-100">
      <CalendarProvider list={events}>
        <Calendar />
      </CalendarProvider>
    </div>
  );
}

export default AgendasCalendar;
