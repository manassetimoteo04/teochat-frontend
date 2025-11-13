import clsx from "clsx";
import { useCalendar } from "../calendar-provider";
import { useState } from "react";
import { X } from "lucide-react";
import ButtonIcon from "../../../ui/button-icon";
import { useOutsideClick } from "../../../hooks/use-outsideclick";
import MonthEventBox from "./month-event-box";
function MonthDay({ day, events }) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClick(() => setOpen(false));
  const {
    month: { currentDate },
  } = useCalendar();
  const date = new Date(day);
  const isToday = new Date().toDateString() === date.toDateString();
  const isMonth = new Date(currentDate).getMonth() === date.getMonth();
  const dayEvents = isMonth
    ? events?.filter(
        (event) => new Date(event.date).toDateString() === date.toDateString()
      )
    : [];

  return (
    <div
      className={clsx(
        !isMonth && "bg-gray-50",
        "min-h-[13rem] border-b relative  border-r items-end p-2 flex flex-col "
      )}
    >
      <span
        className={clsx(
          "text-gray-500 w-[3rem]  h-[3rem] rounded-full flex items-center justify-center",
          isToday && "bg-blue-600 text-white "
        )}
      >
        {day.getDate()}
      </span>
      {dayEvents?.slice(0, 2).map((event) => (
        <MonthEventBox key={event.id + "event"} event={event} />
      ))}
      {dayEvents?.slice(1, -1).length >= 1 && (
        <button
          onClick={() => setOpen((o) => !o)}
          className="text-[1.4rem] rounded-full border-gray-200 text-yellow-700 hover:bg-yellow-50 cursor-pointer border bg-gray-100 w-[4rem] bottom-1 flex items-center justify-center right-1 h-[2rem] absolute"
        >
          + {dayEvents?.slice(1, -1).length}
        </button>
      )}
      {open && (
        <div
          ref={ref}
          className="absolute shadow-lg border rounded-xl bg-gray-50 p-[0.5rem] bottom-2"
        >
          <header className="flex justify-between">
            <span className="text-[1.2rem]">
              Eventos do dia {day.getDate()}
            </span>
            <ButtonIcon onClick={() => setOpen(false)} title="Fechar">
              <X size={20} />
            </ButtonIcon>
          </header>
          <div className="max-h-[13rem] overflow-y-auto">
            {dayEvents.slice(1, -1).map((event) => (
              <MonthEventBox key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthDay;
