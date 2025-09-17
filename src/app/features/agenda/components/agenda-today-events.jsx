import Heading from "../../../shared/ui/heading";
import Modal from "../../../shared/ui/modal";
import EmptyList from "../../../shared/ui/empty-list";
import Tag from "../../../shared/ui/tag";
import { formatHour, rewriteStatus } from "../../../shared/utils/helpers";
import EventDetails from "../../events/components/event-details";
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
    <aside className="bg-main-bg-color-2 p-[2rem] pb-[0.5rem] border-gray-100 border rounded-3xl ">
      <Heading as="h3">Eventos de Hoje</Heading>
      <ul className="max-h-[21rem] overflow-y-scroll">
        <>
          {todayEvents?.length > 0 &&
            todayEvents?.map((event) => (
              <>
                <Modal.Open id={event.id + "today"}>
                  <li
                    key={event.id}
                    className="py-2 border-b bg-white  last:border-b-0 hover:bg-gray-50  cursor-pointer "
                  >
                    <div className="flex justify-between">
                      <p className="text-main-text-color">{event.title}</p>
                      <Tag type={event.status}>
                        {rewriteStatus(event.status)}
                      </Tag>
                    </div>
                    <div className="flex text-[1.2rem] justify-between items-center">
                      <span className=" text-gray-500">
                        Hoje - {formatHour(event.startTime)}
                      </span>
                    </div>
                  </li>
                </Modal.Open>
                <Modal.Window id={event.id + "today"}>
                  <EventDetails eventId={event.id} />
                </Modal.Window>
              </>
            ))}
          {todayEvents?.length < 1 && (
            <EmptyList
              title="Nenhum evento para o dia de hoje"
              opensId="create-event"
            />
          )}
        </>
      </ul>
    </aside>
  );
}

export default AgendaTodayEvents;
