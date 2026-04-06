import {
  CalendarDays,
  Crown,
  PencilLine,
  Plus,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
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
import Tag from "../../../shared/ui/tag";
import { formatDate } from "../../../shared/utils/helpers";
import SetLider from "../components/set-lider";
import RemoveMemberAlert from "../components/remove-member-alert";
import { useRemoveTeamLider } from "../hooks/use-remove-team-lider";

function TeamsPage() {
  const { data, isPending, error } = useGetTeamDetails();
  const { deleteTeam, isPending: isDeleting } = useDeleteTeam();
  const { removeLider, isPending: isRemovingLider } = useRemoveTeamLider();
  if (isPending) return <Spinner />;

  if (error) return <ResourceNotFound error={error.message} />;
  const membersCount = data?.members?.length || 0;
  const tagsCount = data?.tags?.length || 0;
  const hasDescription = Boolean(data?.description);
  const hasLeader = Boolean(data?.teamLider?.id);
  const hasTags = tagsCount > 0;
  const completenessList = [
    { label: "Descricao", done: hasDescription },
    { label: "Lider definido", done: hasLeader },
    { label: "Tags atribuida(s)", done: hasTags },
  ];
  const completenessTotal = completenessList.length;
  const completenessDone = completenessList.filter((item) => item.done).length;
  const completenessPercent = Math.round(
    (completenessDone / completenessTotal) * 100,
  );
  return (
    <Modal>
      <div>
        <PageHeader
          description="Veja as informações detalhadas da tua equipa"
          title={`Equipa de ${data?.name}`}
        >
          <div className="flex gap-[1rem]">
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
        <div className="lg:p-[0_2rem]">
          <section className="grid gap-[1.5rem] mb-[1.5rem] lg:grid-cols-[2fr_1fr]">
            <div className="p-[2rem] border border-gray-100 rounded-2xl bg-gradient-to-br from-gray-50 to-white">
              <div className="flex items-start justify-between gap-[1rem]">
                <div>
                  <div className="flex items-center gap-[0.75rem]">
                    <h2 className="text-[2.4rem] text-main-text-color">
                      {data?.name}
                    </h2>
                    <Tag type="active">Ativa</Tag>
                  </div>
                  <p className="text-secondary-text-color mt-[0.5rem] max-w-[48rem]">
                    {data?.description || "Sem descricao definida ainda."}
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-[0.5rem] text-secondary-text-color">
                  <CalendarDays size={18} />
                  <span className="text-[1.3rem]">
                    Atualizado em{" "}
                    {formatDate(new Date(data?.updatedAt || new Date()), true, true)}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-[0.5rem] mt-[1rem]">
                {data?.tags?.length > 0 ? (
                  data.tags.map((tag) => (
                    <Tag type="pending" key={tag}>
                      {tag}
                    </Tag>
                  ))
                ) : (
                  <Tag type="inactive">Sem tags</Tag>
                )}
              </div>
              <div className="grid gap-[1rem] mt-[1.5rem] md:grid-cols-3">
                <div className="p-[1.25rem] rounded-2xl bg-white border border-gray-100">
                  <p className="text-secondary-text-color text-[1.2rem]">
                    Membros
                  </p>
                  <p className="text-[2.2rem] text-main-text-color font-semibold">
                    {membersCount}
                  </p>
                </div>
                <div className="p-[1.25rem] rounded-2xl bg-white border border-gray-100">
                  <p className="text-secondary-text-color text-[1.2rem]">
                    Lider
                  </p>
                  <div className="flex items-center justify-between gap-[0.75rem]">
                    <p className="text-[1.6rem] text-main-text-color font-semibold flex items-center gap-[0.5rem]">
                      <Crown size={16} />
                      {data?.teamLider?.name || "Nao definido"}
                    </p>
                    {!data?.teamLider && (
                      <Modal.Open id="set-lider">
                        <ButtonIcon title="Definir líder">
                          <Plus size={18} />
                        </ButtonIcon>
                      </Modal.Open>
                    )}
                    {data?.teamLider && (
                      <Modal.Open id="remove-lider">
                        <ButtonIcon title="Remover líder">
                          <X size={18} />
                        </ButtonIcon>
                      </Modal.Open>
                    )}
                  </div>
                </div>
                <div className="p-[1.25rem] rounded-2xl bg-white border border-gray-100">
                  <p className="text-secondary-text-color text-[1.2rem]">
                    Tags
                  </p>
                  <p className="text-[2.2rem] text-main-text-color font-semibold">
                    {tagsCount}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-[2rem] border border-gray-100 rounded-2xl bg-white">
              <div className="flex items-center justify-between">
                <h3 className="text-[1.6rem] text-main-text-color">
                  Saude da Equipa
                </h3>
                <span className="text-[1.4rem] text-secondary-text-color">
                  {completenessPercent}%
                </span>
              </div>
              <div className="w-full h-[0.6rem] bg-gray-100 rounded-full mt-[1rem] overflow-hidden">
                <div
                  className="h-full bg-main-text-color"
                  style={{ width: `${completenessPercent}%` }}
                />
              </div>
              <div className="mt-[1.25rem] flex flex-col gap-[0.5rem] text-secondary-text-color">
                {completenessList.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between text-[1.3rem]"
                  >
                    <span>{item.label}</span>
                    <span className={item.done ? "text-green-600" : ""}>
                      {item.done ? "Completo" : "Pendente"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-[1.5rem] p-[1rem] rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-[1.2rem] text-secondary-text-color">
                  Criado em{" "}
                  {formatDate(new Date(data?.createdAt || new Date()), true, true)}
                </p>
              </div>
            </div>
          </section>
          <div className="border border-gray-100 rounded-2xl bg-white">
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
      <Modal.Window id="set-lider">
        <SetLider />
      </Modal.Window>
      <Modal.Window id="remove-lider">
        <RemoveMemberAlert
          onConfirm={removeLider}
          isPending={isRemovingLider}
          title="Líder"
          description="este usuário como líder da equipe"
        />
      </Modal.Window>
    </Modal>
  );
}

export default TeamsPage;
