import {
  CalendarDays,
  Lock,
  Plus,
  TagIcon,
  Text,
  UserCheck,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import Tag from "../../../shared/ui/tag";
import TeamDetailsNav from "./team-details-nav";
import { formatDate } from "../../../shared/utils/helpers";
import Button from "../../../shared/ui/button";
import Modal from "../../../shared/ui/modal";
import SetLider from "./set-lider";
import RemoveMemberAlert from "./remove-member-alert";
import { useRemoveTeamLider } from "../hooks/use-remove-team-lider";
function TeamDetails({ data }) {
  const { name, description, members, tags, createdBy, createdAt, teamLider } =
    data;
  const { removeLider, isPending } = useRemoveTeamLider();
  return (
    <Modal>
      <div className="p-[3rem] pt-[0]">
        <div className="bg-white p-[3rem] rounded-2xl border border-gray-100">
          <div className="flex  p-[1rem_0] items-center gap-[1rem]">
            <img src="/default-user.jpg" className="w-[6.4rem]" alt="" />
            <div>
              <h2 className="text-[2.4rem] ">{name}</h2>
              <div className="flex gap-[0.5rem]">
                {tags.map((tag) => (
                  <Tag type="pending" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <div className="grid grid-cols-[20rem_1fr] mt-[2rem]">
              <span className="flex items-center gap-[0.5rem] text-secondary-text-color">
                <Lock size={20} /> Privacidade
              </span>
              <div>
                <Tag type="active">Público</Tag>
              </div>
            </div>
            <div className="grid grid-cols-[20rem_1fr] mt-[2rem]">
              <span className="flex items-center gap-[0.5rem] text-secondary-text-color">
                <Users size={20} /> Participantes
              </span>
              <div>{members?.length}</div>
            </div>{" "}
            <div className="grid grid-cols-[20rem_1fr] mt-[2rem]">
              <span className="flex items-center gap-[0.5rem] text-secondary-text-color">
                <UserCircle size={20} /> Líder da Equipe
              </span>
              <div className="flex ">
                <div>
                  {!teamLider && (
                    <Modal.Open id="set-lider">
                      <Button variation="dashed">
                        <Plus size={20} /> Adicionar
                      </Button>
                    </Modal.Open>
                  )}
                  {teamLider && (
                    <div className="flex items-center gap-[0.5rem] p-[0.5rem] bg-gray-100 rounded-full border">
                      <img
                        src="/default-user.jpg"
                        className="w-[2rem] rounded-full"
                        alt=""
                      />
                      <p className="text-[1.3rem]">
                        {teamLider?.name || "nenhum líder"}
                      </p>
                      <Modal.Open id="remove-lider">
                        <span className="cursor-pointer text-red-600">
                          <X size={20} />
                        </span>
                      </Modal.Open>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[20rem_1fr] mt-[2rem]">
              <span className="flex items-center gap-[0.5rem] text-secondary-text-color">
                <CalendarDays size={20} /> Criado aos
              </span>
              <div>
                <span>{formatDate(new Date(createdAt || new Date()))}</span>
              </div>
            </div>
            <div className="grid grid-cols-[20rem_1fr] mt-[2rem]">
              <span className="flex items-center gap-[0.5rem] text-secondary-text-color">
                <UserCheck size={20} /> Criado por
              </span>
              <div>
                <div className="flex justify-start">
                  <div className="flex items-center gap-[0.5rem] p-[0.5rem] bg-gray-100 rounded-full border">
                    <img
                      src="/default-user.jpg"
                      className="w-[2rem] rounded-full"
                      alt=""
                    />
                    <p className="text-[1.3rem]">{createdBy.name}</p>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="grid items-start grid-cols-[20rem_1fr] mt-[2rem]">
              <span className="flex items-center gap-[0.5rem] text-secondary-text-color">
                <Text size={20} /> Descrição
              </span>
              <div>
                <span>{description}</span>
              </div>
            </div>
          </div>
          <TeamDetailsNav />
        </div>
      </div>
      <Modal.Window id="set-lider">
        <SetLider />
      </Modal.Window>
      <Modal.Window id="remove-lider">
        <RemoveMemberAlert
          onConfirm={removeLider}
          isPending={isPending}
          title="Líder"
          description="este usuário como líder da equipe"
        />
      </Modal.Window>
    </Modal>
  );
}

export default TeamDetails;
