import { ChevronLeft, ChevronRight } from "lucide-react";

import ButtonIcon from "../../../ui/button-icon";
import useScheduleDay from "./use-schedule-day";
import DayHour from "./day-hour";
import clsx from "clsx";
import { useEffect } from "react";

export function DayView({ events, render = null, setTitle }) {
  const {
    filteredList,
    handleNext,
    handlePrev,
    isToday,
    formatDate,
    buildScheduleDatesList,
    setDays,
    hours,
    days,
    weekdays,
  } = useScheduleDay(events);
  useEffect(() => {
    setTitle(formatDate(new Date(days.at(3)), true, true));
  }, [setTitle, formatDate, days]);
  return (
    <div>
      <div className="grid grid-cols-[4rem_1fr_4rem] justify-between gap-[1px] md:gap-[1rem] p-[1rem_0] md:p-[2rem]">
        <ButtonIcon onClick={handlePrev}>
          <ChevronLeft />
        </ButtonIcon>
        <div className="grid border border-l-[0] grid-cols-7">
          {days.map((day, i) => (
            <div
              style={{ animation: "none" }}
              onClick={() => setDays(buildScheduleDatesList(day))}
              key={day}
              className={clsx(
                i === 3
                  ? "bg-gray-100 border-gray-200 border !transition-none !duration-initial !text-text-inverse border-primary"
                  : "hover:bg-background-contrast",
                isToday(day) && "border-main-color border",
                " gap-[1rem] first:border-l  last:border-r-[0px] cursor-pointer  border-r p-[0.5rem] md:p-[1rem] flex items-center justify-center text-center border-border-dark border-1"
              )}
            >
              <p
                className={`    ${isToday(day) ? "text-primary" : ""} ${
                  i === 3 ? " !text-text-inverse " : ""
                } `}
              >
                {new Date(day).getDate()}
              </p>
              <span
                className={`${
                  i === 3 ? "bg-primary !text-text-inverse border-primary" : ""
                } ${
                  isToday(day) ? "!text-primary" : ""
                } text-text-secondary text-[1rem] md:text-[1.4rem]`}
              >
                {isToday(day) ? "Hoje" : weekdays[+new Date(day).getDay()]}
              </span>
            </div>
          ))}
        </div>
        <ButtonIcon onClick={handleNext}>
          <ChevronRight />
        </ButtonIcon>
      </div>
      <div className="flex flex-col border-border-light border-1 rounded-2xl overflow-hidden">
        {hours.map((hour) => {
          const filter = filteredList
            .filter((app) => app.time.startsWith(hour.split(":").at(0)))
            .map((el, index) => ({ ...el, index }));
          return (
            <DayHour
              left={filter.length > 1}
              render={render}
              events={filter}
              key={hour}
              hour={hour}
            />
          );
        })}
      </div>
    </div>
  );
}
