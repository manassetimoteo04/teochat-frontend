import Heading from "../../../shared/ui/heading";
import Modal from "../../../shared/ui/modal";
import { formatHour } from "../../../shared/utils/helpers";
import { useGetTeamEvents } from "../../events/hooks/use-get-team-events";

function AgendaTodayEvents() {
  const { data } = useGetTeamEvents();
  const todayEvents = data
    ?.filter(
      (event) =>
        new Date(event.date).toDateString() === new Date().toDateString()
    )
    .sort((a, b) => new Date(b) - new Date(a));
  return (
    <aside className="bg-main-bg-color-2 p-[2rem] border-gray-100 border rounded-3xl ">
      <Heading as="h3">Eventos de Hoje</Heading>
      <ul className="">
        {todayEvents?.map((event) => (
          <Modal.Open id={event.id}>
            <li
              key={event.id}
              className="py-3 bg-white  last:border-b-0 hover:bg-gray-50 p-[0.5rem] cursor-pointer rounded-xl"
            >
              <p className="">{event.title}</p>
              <div className="flex justify-between items-center">
                <span className=" text-gray-500">
                  Hoje - {formatHour(event.startTime)}
                </span>
              </div>
            </li>
          </Modal.Open>
        ))}
      </ul>
    </aside>
  );
}

export default AgendaTodayEvents;
