import { Plus } from "lucide-react";
import PageHeader from "../../../shared/ui/page-heading";
import { useAppContext } from "../../../shared/providers/context";
import Stats from "../components/stats";
import DashboardTeams from "../components/dashboard-teams";
import DashboardRecentMemebrs from "../components/dashboard-recent-members";
import DashboardSchedule from "../components/dashboard-schedule";
import Modal from "../../../shared/ui/modal";
import DashboardActions from "../components/dashboard-actions";
import DashboardInviteMember from "../components/dashboard-invite-member";
import Button from "../../../shared/ui/button";
import CreateTeamForm from "../../teams/components/create-team-form";
function DashboardPage() {
  const { currentUser } = useAppContext();
  return (
    <div>
      <Modal>
        <PageHeader
          title={"Seja bem-vindo, " + currentUser?.name}
          description="Comece a colaborar já com TeoChat."
        >
          <div className="flex gap">
            <Modal.Open id="create-new">
              <Button>
                <Plus size={20} />
                <span className="hidden sm:flex">Novo</span>
              </Button>
            </Modal.Open>
          </div>
        </PageHeader>
        <Stats />
        <div className="grid lg:grid-cols-[1fr_1.5fr] grid-cols-1 md:grid-cols-2 mt-[3rem] gap-[3rem] p-[0_2rem]">
          <DashboardTeams />
          <DashboardRecentMemebrs />
        </div>
        <DashboardSchedule />
        <Modal.Window buttonClose={true} id="create-new">
          <DashboardActions />
        </Modal.Window>
        <Modal.Window buttonClose={true} id="invite-new-member">
          <DashboardInviteMember />
        </Modal.Window>{" "}
        <Modal.Window buttonClose={true} id="create-new-team">
          <CreateTeamForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default DashboardPage;
