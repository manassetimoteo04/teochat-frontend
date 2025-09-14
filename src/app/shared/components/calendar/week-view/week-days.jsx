import clsx from "clsx";
import Event from "../event";

function WeekDays({ day, time, events }) {
  const event = events.filter((ev) => {
    return (
      ev.time.startsWith(time.slice(0, 2)) &&
      new Date(ev.date).toDateString() === new Date(day).toDateString()
    );
  });

  return (
    <div className={clsx("border-r-[1px] relative  border-gray-100")}>
      {event.map((ev) => (
        <Event event={ev} key={ev.id} />
      ))}
    </div>
  );
}
export default WeekDays;
