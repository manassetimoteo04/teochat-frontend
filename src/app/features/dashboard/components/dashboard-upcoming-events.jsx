import { useMemo } from "react";
import { useGetCompanyEvents } from "../../events/hooks/use-get-company-event";
import { useAppContext } from "../../../shared/providers/context";
import CardBox from "../ui/card-box";
import Spinner from "../../../shared/ui/Spinner";
import { formatDate, formatHour } from "../../../shared/utils/helpers";

function DashboardUpcomingEvents() {
  const { currentRole } = useAppContext();
  const { data: events, isPending } = useGetCompanyEvents();

  const upcomingEvents = useMemo(() => {
    const eventsList = Array.isArray(events) ? events : [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return eventsList
      .filter((event) => event?.date)
      .filter((event) => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 4);
  }, [events]);

  return (
    <CardBox title="Próximos eventos">
      <div className="min-h-[22rem] px-[2rem] pb-[2rem]">
        {isPending && <Spinner />}
        {!isPending && upcomingEvents.length < 1 && (
          <div className="text-secondary-text-color text-[1.3rem]">
            {currentRole === "member"
              ? "Nenhum evento da sua equipa foi encontrado."
              : "Nenhum evento próximo encontrado."}
          </div>
        )}
        {!isPending &&
          upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between border-b border-gray-100 py-[1.2rem] last:border-b-0"
            >
              <div>
                <p className="text-main-text-color font-medium">
                  {event.title}
                </p>
                <p className="text-[1.2rem] text-secondary-text-color">
                  {formatDate(new Date(event.date), true, true)}
                </p>
              </div>
              <div className="text-[1.2rem] text-secondary-text-color">
                {event.startTime ? formatHour(event.startTime) : "--:--"}
              </div>
            </div>
          ))}
      </div>
    </CardBox>
  );
}

export default DashboardUpcomingEvents;
