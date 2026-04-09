import { CalendarDays, ListChecks, Plus, SlidersHorizontal } from "lucide-react";
import Button from "../../../shared/ui/button";
import PageHeader from "../../../shared/ui/page-heading";
import Spinner from "../../../shared/ui/Spinner";
import Modal from "../../../shared/ui/modal";
import { useGetTeamDetails } from "../../teams/hooks/use-get-team-details";
import AgendaStats from "../components/agenda-stats";
import AgendasCalendar from "../components/agendas-calendar";
import CreateEventForm from "../../events/components/create-event-form";
import AgendaTodayEvents from "../components/agenda-today-events";
import ButtonIcon from "../../../shared/ui/button-icon";
import InputSearch from "../../../shared/ui/input-search";
import Tag from "../../../shared/ui/tag";
import { useEffect, useState } from "react";
import { useGetTeamEvents } from "../../events/hooks/use-get-team-events";
import { formatDate, formatHour, rewriteStatus } from "../../../shared/utils/helpers";
import Pagination from "../../../shared/ui/pagination";

function AgendasPage() {
  const { data, isPending } = useGetTeamDetails();
  const [query, setQuery] = useState("");
  const [range, setRange] = useState("week");
  const [view, setView] = useState("calendar");
  const [page, setPage] = useState(1);
  const limit = 10;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const {
    data: events,
    meta,
    isPending: isLoadingEvents,
    error: eventsError,
  } = useGetTeamEvents({ query, range, timezone, view, page, limit });
  useEffect(() => {
    setPage(1);
  }, [query, range, view]);
  if (isPending) return <Spinner />;
  return (
    <Modal>
      <div className="flex gap-[2rem] flex-col min-h-screen">
        <PageHeader
          title={`Agendas da Equipe de ${data.name}`}
          description="Organize eventos, sprints e reunioes com uma visao clara do tempo."
        >
          <div className="flex justify-between h-full items-center gap-2">
            <Modal.Open id="create-event">
              <Button>
                <Plus size={20} />
                <span className="hidden sm:inline"> Evento</span>
              </Button>
            </Modal.Open>
          </div>
        </PageHeader>
        <section className="mx-[2rem] grid gap-[1.5rem] lg:grid-cols-[2fr_1fr]">
          <div className="p-[2rem] rounded-2xl border border-gray-100 bg-white">
            <div className="flex items-start justify-between gap-[1rem]">
              <div>
                <p className="text-[1.2rem] text-secondary-text-color">
                  Visao geral
                </p>
                <h3 className="text-[2rem] text-main-text-color">
                  Planeamento da Equipe
                </h3>
                <p className="text-[1.3rem] text-secondary-text-color max-w-[48rem]">
                  Centralize eventos, cadencias e prioridades para manter a
                  equipa alinhada.
                </p>
              </div>
              <div className="flex gap-[0.5rem]">
                <ButtonIcon
                  title="Calendario"
                  onClick={() => setView("calendar")}
                  active={view === "calendar"}
                >
                  <CalendarDays size={18} />
                </ButtonIcon>
                <ButtonIcon
                  title="Lista"
                  onClick={() => setView("list")}
                  active={view === "list"}
                >
                  <ListChecks size={18} />
                </ButtonIcon>
                <ButtonIcon title="Filtros">
                  <SlidersHorizontal size={18} />
                </ButtonIcon>
              </div>
            </div>
            <div className="flex flex-col gap-[1rem] mt-[1.5rem] md:flex-row md:items-center md:justify-between">
              <div className="w-full md:max-w-[32rem]">
                <InputSearch value={query} setValue={setQuery} />
              </div>
              <div className="flex flex-wrap gap-[0.5rem]">
                <Tag
                  type={range === "week" ? "active" : "pending"}
                  onClick={() => setRange("week")}
                  className="cursor-pointer"
                >
                  Esta semana
                </Tag>
                <Tag
                  type={range === "all" ? "active" : "pending"}
                  onClick={() => setRange("all")}
                  className="cursor-pointer"
                >
                  Todos os eventos
                </Tag>
                <Tag type="settled">{timezone || "GMT+1"}</Tag>
              </div>
            </div>
            <AgendaStats className="mt-[1.5rem]" />
          </div>
          <AgendaTodayEvents events={events} isPending={isLoadingEvents} />
        </section>
        {view === "calendar" && (
          <div className="bg-white border border-gray-100 rounded-2xl mx-[2rem] overflow-hidden">
            <AgendasCalendar
              events={events}
              isPending={isLoadingEvents}
              error={eventsError}
            />
          </div>
        )}
        {view === "list" && (
          <div className="bg-white border border-gray-100 rounded-2xl mx-[2rem] overflow-hidden">
            <div className="p-[2rem]">
              <div className="flex items-center justify-between">
                <h3 className="text-[1.6rem] text-main-text-color">
                  Lista de Eventos
                </h3>
                <span className="text-[1.2rem] text-secondary-text-color">
                  {events?.length || 0} itens
                </span>
              </div>
              <div className="mt-[1.5rem] flex flex-col">
                {(events || [])
                  .slice()
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((event) => (
                    <div
                      key={event.id}
                      className="flex flex-col gap-[0.5rem] border-b border-gray-100 py-[1.2rem] last:border-b-0"
                    >
                      <div className="flex items-center justify-between gap-[1rem]">
                        <div>
                          <p className="text-[1.4rem] text-main-text-color">
                            {event.title}
                          </p>
                          <span className="text-[1.2rem] text-secondary-text-color">
                            {formatDate(new Date(event.date), true, true)} ·{" "}
                            {formatHour(event.startTime)}
                          </span>
                        </div>
                        <Tag type={event.status}>
                          {rewriteStatus(event.status)}
                        </Tag>
                      </div>
                    </div>
                  ))}
                {!isLoadingEvents && (!events || events.length < 1) && (
                  <div className="text-secondary-text-color text-[1.3rem]">
                    Nenhum evento encontrado.
                  </div>
                )}
              </div>
              <Pagination
                page={page}
                totalPages={
                  meta?.totalPages
                    ? meta.totalPages
                    : events.length < limit
                      ? page
                      : page + 1
                }
                onPageChange={setPage}
                isLoading={isLoadingEvents}
              />
            </div>
          </div>
        )}
      </div>
      <Modal.Window id="create-event">
        <CreateEventForm />
      </Modal.Window>
    </Modal>
  );
}

export default AgendasPage;
