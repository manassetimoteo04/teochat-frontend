import clsx from "clsx";
import { MapPin, Video } from "lucide-react";

export default function Event({ event }) {
  const [startTime, startMin] = event?.time?.split(":") || [];
  const [endTime, endMin] = event?.end?.split(":") || [];
  let heights = "";
  let styles = {};
  if (startMin !== "00") heights = "top-1/2 ";
  if (startTime === endTime) {
    heights = heights + " h-full ";
  }
  if (+startTime < +endTime) {
    const diference = +endTime - +startTime;
    heights += ` !h-[${100 * diference}%]`;
    styles.height = `${100 * diference}%`;
  }
  return (
    <div
      style={styles}
      className={clsx(
        "w-full  absolute flex flex-col p-[0.5rem] rounded-2xl bg-blue-100",
        heights
      )}
    >
      <p className="truncate text-[1.4rem] text-blue-700">{event.title}</p>
      <span className="text-[1.2rem] text-secondary-text-color">
        {event.team}
      </span>
      <div className="flex gap-[0.5rem]">
        <span className="text-[1.2rem] text-secondary-text-color">
          {event.time}
        </span>
        <span className="text-[1.2rem] items-center flex gap-[0.3rem] text-secondary-text-color">
          {event.type}
          {event.type === "meeting" ? (
            <Video size={14} />
          ) : (
            <MapPin size={14} />
          )}
        </span>
      </div>
    </div>
  );
}
