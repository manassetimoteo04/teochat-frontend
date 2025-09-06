import { Filter, Plus } from "lucide-react";
import Button from "../../../shared/ui/button";
import Heading from "../../../shared/ui/heading";
import PageHeader from "../../../shared/ui/page-heading";
import Spinner from "../../../shared/ui/Spinner";
import { useGetTeamDetails } from "../../teams/hooks/use-get-team-details";
import AgendaStats from "../components/agenda-stats";
import AgendaUpcomingEvents from "../components/agenda-upcoming-events";
import AgendasCalendar from "../components/agendas-calendar";

function AgendasPage() {
  const { data, isPending } = useGetTeamDetails();
  if (isPending) return <Spinner />;
  return (
    <div className="flex flex-col h-screen">
      <PageHeader title={`Agendas da Equipe de ${data.name}`}>
        <div className="flex justify-between h-full items-center gap-2">
          <Button variation="secondary">
            <Filter size={18} /> Filtro
          </Button>
          <Button>
            <Plus size={20} />
            Evento
          </Button>
        </div>
      </PageHeader>
      <div className="grid grid-cols-[1.5fr_1fr]">
        <AgendaStats />
        <AgendaUpcomingEvents />
      </div>
      <AgendasCalendar />
    </div>
  );
}

export default AgendasPage;
