import { Plus } from "lucide-react";
import Button from "../../../shared/ui/button";
import PageHeader from "../../../shared/ui/page-heading";
import Spinner from "../../../shared/ui/Spinner";
import Modal from "../../../shared/ui/modal";
import { useGetTeamDetails } from "../../teams/hooks/use-get-team-details";
import AgendaStats from "../components/agenda-stats";
import AgendasCalendar from "../components/agendas-calendar";
import CreateEventForm from "../../events/components/create-event-form";
import AgendaTodayEvents from "../components/agenda-today-events";

function AgendasPage() {
  const { data, isPending } = useGetTeamDetails();
  if (isPending) return <Spinner />;
  return (
    <Modal>
      <div className="flex  gap-[2rem] flex-col h-screen">
        <PageHeader title={`Agendas da Equipe de ${data.name}`}>
          <div className="flex justify-between h-full items-center gap-2">
            <Modal.Open id="create-event">
              <Button>
                <Plus size={20} />
                Evento
              </Button>
            </Modal.Open>
          </div>
        </PageHeader>
        <div className="grid grid-cols-[1.5fr_1fr]">
          <AgendaStats />
          <AgendaTodayEvents />
        </div>
        <AgendasCalendar />
      </div>
      <Modal.Window id="create-event">
        <CreateEventForm />
      </Modal.Window>
    </Modal>
  );
}

export default AgendasPage;
