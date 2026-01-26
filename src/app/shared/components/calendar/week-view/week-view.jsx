import clsx from "clsx";
import WeekHours from "./week-hours";

import { useCalendar } from "../calendar-provider";

function WeekView() {
  const {
    week: { dates, weekdays, times, days, events },
  } = useCalendar();

  return (
    <>
      <div>
        <div className="lg:w-[calc(100dvw-30rem)] w-full  overflow-x-scroll ">
          <div className="grid grid-cols-[3rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr] md:grid-cols-[5rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b">
            <div className=" h-full w-full items-center border-r md:text-[1.2rem] text-[1rem] flex justify-center">
              <span>H</span>
            </div>
            {dates.map((date) => {
              const isToday =
                new Date(date).toDateString() === new Date().toDateString();
              return (
                <div
                  key={date}
                  className={clsx(
                    "md:p-[1rem_2rem] py-[1rem] flex-col text-[1rem] flex justify-center gap-[0.5rem] text-secondary-text-color items-center border-r",
                    isToday && "bg-gray-50",
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
