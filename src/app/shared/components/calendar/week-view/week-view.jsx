import clsx from "clsx";
import WeekHours from "./week-hours";

import { useCalendar } from "../calendar-provider";

function WeekView({ setTitle, onNext, onPrev }) {
  const {
    week: { dates, weekdays, times, days, events },
  } = useCalendar();

  return (
    <>
      <div>
        <div className="w-[calc(100dvw-30rem)]  overflow-x-scroll ">
          <div className="grid grid-cols-[5rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b">
            <div className=" h-full w-full items-center border-r text-[1.2rem] flex justify-center">
              <span>H</span>
            </div>
            {dates.map((date) => {
              const isToday =
                new Date(date).toDateString() === new Date().toDateString();
              return (
                <div
                  key={date}
                  className={clsx(
                    "p-[1rem_2rem] flex justify-center gap-[1rem] text-secondary-text-color items-center border-r",
                    isToday && "bg-gray-50"
                  )}
                >
                  <span className={isToday ? "text-main-text-color" : ""}>
                    {weekdays[new Date(date).getDay()]}
                  </span>
                  <span className={isToday ? "text-main-text-color" : ""}>
                    {new Date(date).getDate()}
                  </span>
                </div>
              );
            })}
          </div>
          <div>
            {times.map((time) => (
              <WeekHours events={events} days={days} time={time} key={time} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default WeekView;
