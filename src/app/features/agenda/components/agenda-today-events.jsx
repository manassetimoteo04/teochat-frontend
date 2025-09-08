import Heading from "../../../shared/ui/heading";
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
          <li
            key={event.id}
            className="py-3 bg-white  last:border-b-0 hover:bg-gray-50 border-b "
          >
            <p className="">{event.title}</p>
            <div className="flex justify-between items-center">
              <span className=" text-gray-500">
                Hoje - {formatHour(event.startTime)}
              </span>
              <div className="flex">
                <img
                  className="w-[2.4rem] border-[2px] border-white translate-x-1 z-1 h-[2.4rem] rounded-full"
                  src="/default-user.jpg"
                  alt=""
                />
                <img
                  className="w-[2.4rem] h-[2.4rem] border-[2px] border-white z-20 -translate-x-2 rounded-full"
                  src="/default-user.jpg"
                  alt=""
                />
                <img
                  className="w-[2.4rem] h-[2.4rem] border-[2px] border-white z-30 -translate-x-4 rounded-full"
                  src="/default-user.jpg"
                  alt=""
                />
                <img
                  className="w-[2.4rem] h-[2.4rem] border-[2px] border-white z-40 -translate-x-6 rounded-full"
                  src="/default-user.jpg"
                  alt=""
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default AgendaTodayEvents;
