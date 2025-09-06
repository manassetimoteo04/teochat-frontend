import { useCalendar } from "../calendar-provider";
import MonthDay from "./month-day";

function MonthView() {
  const {
    month: { weekdays, list, events },
  } = useCalendar();
  return (
    <div>
      <div className="grid  grid-cols-7">
        {weekdays.map((day) => (
          <div className="p-[1rem] flex items-center justify-center text-secondary-text-color border-r">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7  border-t-[1px] border-b-[1px] ">
        {list.map((day) => (
          <MonthDay key={day} day={day} />
        ))}
      </div>
    </div>
  );
}

export default MonthView;
