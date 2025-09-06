import clsx from "clsx";
import { MapPin, Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Event({ event, left }) {
  const [startTime, startMin] = event?.time?.split(":") || [];
  const [endTime, endMin] = event?.end?.split(":") || [];
  const [over, setOver] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const startHour = Number(startTime);
    const startMinutes = Number(startMin);
    const endHour = Number(endTime);
    const endMinutes = Number(endMin);

    ref.current.style.top = `${(startMinutes / 60) * 100}%`;

    const durationHours = endHour - startHour;
    const durationMinutes = durationHours * 60 + (endMinutes - startMinutes);
    const heightPercent = (durationMinutes / 60) * 100;
    ref.current.style.height = `${heightPercent}%`;
  }, [startTime, startMin, endTime, endMin]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setOver(true)}
      onMouseOut={() => setOver(false)}
      className={clsx(
        over && "index-9",
        "w-full cursor-pointer border border-gray-200 absolute flex flex-col p-[0.5rem] rounded-2xl bg-blue-100 transition-all duration-200"
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
