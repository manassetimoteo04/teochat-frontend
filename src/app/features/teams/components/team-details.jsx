import {
  CalendarDays,
  Lock,
  TagIcon,
  Text,
  UserCheck,
  UserCircle,
  Users,
} from "lucide-react";
import Tag from "../../../shared/ui/tag";
import TeamDetailsNav from "./team-details-nav";
import { formatDate } from "../../../shared/utils/helpers";
function TeamDetails({ data }) {
  const { name, description, members, tags, createdBy, createdAt, teamLider } =
    data;
  return (
    <div className="p-[3rem] pt-[0]  ">
      <div className="bg-white p-[3rem] rounded-2xl border border-gray-100">
        <h2 className="text-[3.4rem] ">{name}</h2>
        <div className="flex flex-col gap-[0.5rem]">
          <div className="grid grid-cols-[20rem_1fr] mt-[2rem]">
            <span className="flex items-center gap-[0.5rem] text-secondary-text-color">
              <Lock size={20} /> Privacidade
            </span>
            <div>
              <Tag>Privado</Tag>
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
              <UserCircle size={20} /> Team Líder
            </span>
            <div className="flex justify-start">
              <div className="flex items-center gap-[0.5rem] p-[0.5rem] bg-gray-100 rounded-full border">
                <img
                  src="/default-user.jpg"
                  className="w-[2rem] rounded-full"
                  alt=""
                />
                <p className="text-[1.3rem]">
                  {teamLider?.name || "nenhum líder"}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[20rem_1fr] mt-[2rem]">
            <span className="flex items-center gap-[0.5rem] text-secondary-text-color">
              <CalendarDays size={20} /> Criado aos
            </span>
            <div>
              <span>{formatDate(new Date(createdAt))}</span>
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
          <div className="grid items-start grid-cols-[20rem_1fr] mt-[2rem]">
            <span className="flex items-center gap-[0.5rem] text-secondary-text-color">
              <TagIcon size={20} /> Tags
            </span>
            <div className="flex gap-[0.5rem]">
              {tags.map((tag) => (
                <Tag key={tag}>#{tag}</Tag>
              ))}
            </div>
          </div>
        </div>
        <TeamDetailsNav />
      </div>
    </div>
  );
}

export default TeamDetails;
