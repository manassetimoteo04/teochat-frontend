import { createContext, useContext, useState } from "react";
import { useScheduleMonth } from "./month-view/use-schedule-month";
import useScheduleDay from "./day-view/use-schedule-day";
import { useScheduleWeek } from "./week-view/use-schedule-week";

const Provider = createContext();
function CalendarProvider({ children, list }) {
  const [currentView, setCurrentView] = useState("week");
  const month = useScheduleMonth(list);
  const day = useScheduleDay(list);
  const week = useScheduleWeek(list);
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
