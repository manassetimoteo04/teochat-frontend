import { createContext, useContext, useState } from "react";
import { useScheduleMonth } from "./month-view/use-schedule-month";
import useScheduleDay from "./day-view/use-schedule-day";
import { useScheduleWeek } from "./week-view/use-schedule-week";

const Provider = createContext();
function formatEventObject(event) {
  const startHour = String(new Date(event.startTime).getHours()).padStart(
    2,
    "0"
  );
  const startMin = String(new Date(event.startTime).getMinutes()).padStart(
    2,
    "0"
  );
  const endHour = String(new Date(event.endTime).getHours()).padStart(2, "0");
  const endMin = String(new Date(event.endTime).getMinutes()).padStart(2, "0");
  return {
    id: event.id,
    title: event.title,
    team: event.teamId?.name,
    date: event.date,
    time: `${startHour}:${startMin}`,
    end: `${endHour}:${endMin}`,
    type: event.type,
    status: event.status,
    createdBy: event.createdBy,
  };
}
function CalendarProvider({ children, list, view }) {
  const [currentView, setCurrentView] = useState(view || "week");
  const newList = list.map((event) => formatEventObject(event));
  const month = useScheduleMonth(newList);
  const day = useScheduleDay(newList);
  const week = useScheduleWeek(newList);
  const values = { month, day, week };
  const title = values[currentView]?.title;
  return (
    <Provider.Provider
      value={{ ...values, setCurrentView, currentView, title }}
    >
      {children}
    </Provider.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useCalendar() {
  const context = useContext(Provider);
  if (!context) throw new Error("Context was used outside the provider");
  return context;
}
export default CalendarProvider;
