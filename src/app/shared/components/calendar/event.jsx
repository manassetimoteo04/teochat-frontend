import clsx from "clsx";
import { MapPin, Video } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Event({ event }) {
  const [startTime, startMin] = event?.time?.split(":") || [];
  const [endTime, endMin] = event?.end?.split(":") || [];
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
      className={clsx(
        "w-full hover:z-50  z-40 hover:shadow-md cursor-pointer border border-blue-300 absolute flex flex-col p-[0.5rem] rounded-2xl bg-blue-100 transition-all duration-200"
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
