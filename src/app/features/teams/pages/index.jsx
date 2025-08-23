import { Ellipsis, Star, UserPlus } from "lucide-react";
import TeamDetails from "../components/team-details";
import ButtonIcon from "../../../shared/ui/button-icon";
import Spinner from "../../../shared/ui/Spinner";
import Modal from "../../../shared/ui/modal";
import { useGetTeamDetails } from "../hooks/use-get-team-details";
import AddTeamMemberForm from "../components/add-team-member-form";
import CompanyListMembers from "../components/company-members-list";

function TeamsPage() {
  const { data, isPending } = useGetTeamDetails();
  if (isPending) return <Spinner />;
  return (
    <Modal>
      <div>
        <header className="flex  items-center  text-secondary-text-color  justify-between p-[2rem_3rem]">
          <div>
            <span className="text-[1.4rem]">
              teams | {data?.name.toLowerCase()}
            </span>
          </div>
          <div className="flex gap-[2rem]">
            <ButtonIcon>
              <Star size={20} />
            </ButtonIcon>
            <Modal.Open id="add-team-member">
              <button>
                <ButtonIcon title="Adicionar Membros">
                  <UserPlus size={20} />
                </ButtonIcon>{" "}
              </button>
            </Modal.Open>
            <ButtonIcon>
              <Ellipsis size={20} />
            </ButtonIcon>
          </div>
        </header>
        <TeamDetails data={data} />
        <CompanyListMembers />
      </div>
      <Modal.Window id="add-team-member">
        <AddTeamMemberForm />
      </Modal.Window>
    </Modal>
  );
}

export default TeamsPage;
