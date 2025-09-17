import { PencilLine, Star, Trash2, UserPlus } from "lucide-react";
import TeamDetails from "../components/team-details";
import ButtonIcon from "../../../shared/ui/button-icon";
import Spinner from "../../../shared/ui/Spinner";
import Modal from "../../../shared/ui/modal";
import { useGetTeamDetails } from "../hooks/use-get-team-details";
import AddTeamMemberForm from "../components/add-team-member-form";
import ResourceNotFound from "../../../shared/ui/resource-not-found";
import EditTeamForm from "../components/edit-team-form";
import DeleteAlert from "../../../shared/ui/delete-alert";
import { useDeleteTeam } from "../hooks/use-delete-team";
import PageHeader from "../../../shared/ui/page-heading";
import TeamParticipantsList from "../components/team-participants-list";

function TeamsPage() {
  const { data, isPending, error } = useGetTeamDetails();
  const { deleteTeam, isPending: isDeleting } = useDeleteTeam();
  if (isPending) return <Spinner />;

  if (error) return <ResourceNotFound error={error.message} />;
  return (
    <Modal>
      <div>
        <PageHeader
          description="Veja as informações detalhadas da tua equipa"
          title={`Equipa de ${data?.name}`}
        >
          <div className="flex gap-[2rem]">
            <Modal.Open id="add-team-member">
              <button>
                <ButtonIcon title="Adicionar Membros">
                  <UserPlus size={20} />
                </ButtonIcon>{" "}
              </button>
            </Modal.Open>
            <Modal.Open id="edit-team-form">
              <ButtonIcon>
                <PencilLine size={20} />
              </ButtonIcon>
            </Modal.Open>
            <Modal.Open id="delete-team">
              <ButtonIcon>
                <Trash2 size={20} />
              </ButtonIcon>
            </Modal.Open>
          </div>
        </PageHeader>
        <div className="p-[0_2rem]">
          <div className="grid  border border-gray-100 rounded-2xl bg-white grid-cols-[1.5fr_1fr]">
            <TeamDetails data={data} />
            <TeamParticipantsList />
          </div>
        </div>
      </div>
      <Modal.Window id="add-team-member">
        <AddTeamMemberForm />
      </Modal.Window>
      <Modal.Window id="edit-team-form">
        <EditTeamForm />
      </Modal.Window>
      <Modal.Window id="delete-team">
        <DeleteAlert
          onConfirm={deleteTeam}
          isPending={isDeleting}
          title="Equipa"
          description="está equipa"
        />
      </Modal.Window>
    </Modal>
  );
}

export default TeamsPage;
