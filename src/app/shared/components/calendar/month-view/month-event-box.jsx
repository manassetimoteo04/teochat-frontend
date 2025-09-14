import clsx from "clsx";
import Modal from "../../../ui/modal";
import EventDetails from "../../../../features/events/components/event-details";
import UpdateEventForm from "../../../../features/events/components/update-event-form";

function MonthEventBox({ event }) {
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
    <>
      <Modal.Open id={event.id}>
        <div
          className={clsx(
            bg[event.status],
            "mt-1 p-3 items-self-start w-full rounded-xl cursor-pointer border   text-secondary-text-color "
          )}
        >
          <p className={clsx(text[event.status], "text-[1rem]  truncate")}>
            {event.title}
          </p>
        </div>
      </Modal.Open>
      <Modal.Window id={event.id}>
        <EventDetails eventId={event.id} />
      </Modal.Window>{" "}
      <Modal.Window id={event.id + "-update"}>
        <UpdateEventForm eventId={event.id} />
      </Modal.Window>
    </>
  );
}

export default MonthEventBox;
