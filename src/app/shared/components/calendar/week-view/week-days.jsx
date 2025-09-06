import clsx from "clsx";
import Event from "../event";

function WeekDays({ day, time, events }) {
  const isToday = new Date(day).toDateString() === new Date().toDateString();
  const isNow = +time === new Date().getHours();
  const event = events.filter((ev) => {
    return (
      ev.time.startsWith(time.slice(0, 2)) &&
      new Date(ev.date).toDateString() === new Date(day).toDateString()
    );
  });

  return (
    <div
      className={clsx(
        "border-r-[1px] relative  border-gray-100",
        (isToday || isNow) && "bg-gray-50"
      )}
    >
      {event.map((ev) => (
        <Event event={ev} key={ev.id} />
      ))}
    </div>
  );
}
export default WeekDays;
