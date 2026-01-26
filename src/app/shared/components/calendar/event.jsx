import clsx from "clsx";
import { MapPin, Video } from "lucide-react";
import { useEffect, useRef } from "react";
import Modal from "../../ui/modal";
import EventDetails from "../../../features/events/components/event-details";
import UpdateEventForm from "../../../features/events/components/update-event-form";
export default function Event({ event, titleOnly = false }) {
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
  const bg = {
    pending: "border-blue-300 bg-blue-100",
    active: "border-yellow-300 bg-yellow-100",
    canceled: "border-red-300 bg-red-100",
    finished: "border-gray-300 bg-gray-100",
  };
  const text = {
    pending: "text-blue-700",
    active: "text-yellow-700",
    canceled: "text-red-700",
    finished: "text-gray-700",
  };
  return (
    <Modal>
      <Modal.Open id={event.id}>
        <div
          ref={ref}
          className={clsx(
            bg[event.status],
            "w-full hover:z-50  overflow-hidden z-40 hover:shadow-md cursor-pointer border absolute flex flex-col p-[0.5rem] rounded-2xl  transition-all duration-200",
          )}
        >
          <p className={clsx("truncate text-[1.4rem] ", text[event.status])}>
            {event.title}
          </p>
          <span className="text-[1.2rem] truncate text-secondary-text-color">
            {event.team}
          </span>{" "}
          <span className="text-[1.2rem] truncate text-secondary-text-color">
            {event.status}
          </span>
          <div className="flex gap-[0.5rem] flex-col">
            <span className="text-[1.2rem] truncate text-secondary-text-color">
              {event.time} &mdash;
              {event.end}
            </span>
            <span className="text-[1.2rem] truncate items-center  gap-[0.3rem] text-secondary-text-color">
              {event.type === "video-call" ? "Video Chamada" : "Presencial"}
              {event.type === "video-call" ? (
                <Video size={14} />
              ) : (
                <MapPin size={14} />
              )}
            </span>
          </div>
        </div>
      </Modal.Open>
      <Modal.Window id={event.id}>
        <EventDetails eventId={event.id} />
      </Modal.Window>{" "}
      <Modal.Window id={event.id + "-update"}>
        <UpdateEventForm eventId={event.id} />
      </Modal.Window>
    </Modal>
  );
}
