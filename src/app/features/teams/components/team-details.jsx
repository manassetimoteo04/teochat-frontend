import {
  CalendarCheck,
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
import { formatDate } from "../../../shared/utils/helpers";
import Button from "../../../shared/ui/button";
import Modal from "../../../shared/ui/modal";
import SetLider from "./set-lider";
import RemoveMemberAlert from "./remove-member-alert";
import { useRemoveTeamLider } from "../hooks/use-remove-team-lider";
import TeamDetailBox from "../ui/team-detail-box";
function TeamDetails({ data }) {
  const {
    name,
    description,
    members,
    tags,
    createdBy,
    createdAt,
    updatedAt,
    teamLider,
  } = data;
  const { removeLider, isPending } = useRemoveTeamLider();
  return (
    <Modal>
      <div className=" p-[3rem] bg-white  border-r h-full border-gray-200">
        <div className="flex  items-center gap-[1rem]">
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
        <div className="grid lg:grid-cols-2 mt-[2rem] gap-[1rem]">
          <TeamDetailBox
            icon={<Lock size={20} />}
            label="Privacidade"
            value={<Tag type="active">Público</Tag>}
          />
          <TeamDetailBox
            icon={<Users size={20} />}
            label="Participantes"
            value={members?.length}
          />{" "}
          <TeamDetailBox
            icon={<UserCircle size={20} />}
            label="Líder da Equipe"
            value={
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
            }
          />
          <TeamDetailBox
            icon={<UserCheck size={20} />}
            label="Criado por"
            value={
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
            }
          />
          <TeamDetailBox
            icon={<CalendarCheck size={20} />}
            label="Criado aos"
            value={formatDate(new Date(createdAt || new Date()), true, true)}
          />{" "}
          <TeamDetailBox
            icon={<CalendarDays size={20} />}
            label="Última Actualização"
            value={formatDate(new Date(updatedAt || new Date()), true, true)}
          />{" "}
          <div className="col-span-2">
            <TeamDetailBox
              icon={<Text size={20} />}
              label="Descrição"
              value={description}
            />
          </div>
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
