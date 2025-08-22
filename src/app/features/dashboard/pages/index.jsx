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
function DashboardPage() {
  const { currentUser } = useAppContext();
  return (
    <div>
      <Modal>
        <PageHeader
          title={"Seja bem-vindo, " + currentUser?.name}
          description="Análise a productividade das tuas equipes, eventos próximos e mais"
        >
          <div className="flex gap">
            <Modal.Open id="create-new">
              <button className="bg-green-500 p-[0.8rem_1.5rem] hover:bg-green-600 overflow-hidden active:shadow-md active:-translate-y-1 flex gap-2 items-center justify-center  text-white rounded-full">
                <Plus size={20} />
                Novo
              </button>
            </Modal.Open>
          </div>
        </PageHeader>
        <Stats />
        <div className="grid grid-cols-[1fr_1.5fr] mt-[3rem] gap-[3rem] p-[0_2rem]">
          <DashboardTeams />
          <DashboardRecentMemebrs />
        </div>
        <DashboardSchedule />
        <Modal.Window buttonClose={true} id="create-new">
          <DashboardActions />
        </Modal.Window>
        <Modal.Window buttonClose={true} id="invite-new-member">
          <DashboardInviteMember />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default DashboardPage;
