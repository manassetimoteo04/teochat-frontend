import { formatDate as formatFns } from "date-fns";
import Button from "../../../shared/ui/button";
import Heading from "../../../shared/ui/heading";
import Tag from "../../../shared/ui/tag";
import { useEvent } from "../hooks/use-event";
import Spinner from "../../../shared/ui/Spinner";
import { formatDate, rewriteStatus } from "../../../shared/utils/helpers";
import Modal from "../../../shared/ui/modal";
import {
  CalendarCheck,
  CalendarFold,
  Clock4Icon,
  ClockFading,
  MapPin,
  MapPinCheck,
  Text,
  UserCheck,
  Video,
  X,
} from "lucide-react";

function EventDetails({ eventId }) {
  const {
    data: {
      title,
      description,
      date,
      startTime,
      endTime,
      type,
      createdBy,
      teamId,
      status,
      createdAt,
      location,
    } = {},
    isPending,
  } = useEvent(eventId);
  if (isPending) return <Spinner />;
  return (
    <div className="p-[2rem] max-w-[50rem] min-w-[50rem] flex flex-col gap-[2rem]">
      <div className="flex flex-col gap-[1rem] ">
        <div className="flex items-center gap-[1rem]">
          <span className="flex items-center  gap-[0.5rem] text-secondary-text-color">
            <CalendarFold size={20} /> Evento
          </span>
          &mdash;
          <Tag type={status}>{rewriteStatus(status)}</Tag>
        </div>
        <div>
          <Heading as="h2">{title}</Heading>
          <span className="text-secondary-text-color">
            Criado aos {formatDate(new Date(createdAt))}
          </span>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-[1rem] mb-[2rem]">
          <span className="text-secondary-text-color">Equipa</span>
          <div className="flex gap-[1rem] items-center  ">
            <img
              src="/default-user.jpg"
              className="w-[5rem] h-[5rem] rounded-full"
              alt=""
            />
            <div className="flex flex-col">
              <Heading as="h4">{teamId.name}</Heading>
              <div>
                <Tag type="pending">
                  {type === "video-call" ? "Video Chamada" : "Presencial"}
                </Tag>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[1rem]">
          <div className="grid grid-cols-[12rem_1fr] border border-gray-200 bg-gray-50 rounded-2xl items-center gap-[1rem]  p-[1.5rem]">
            <span className="text-secondary-text-color items-center flex gap-[1rem]">
              <Text size={20} /> Descrição
            </span>
            <span>{description}</span>
          </div>{" "}
          <div className="grid grid-cols-[12rem_1fr] border border-gray-200 bg-gray-50 rounded-2xl items-center gap-[1rem]  p-[1.5rem]">
            <span className="text-secondary-text-color items-center flex gap-[1rem]">
              <MapPin size={20} />
              Local
            </span>
            <span>{location || "Video Chamada"}</span>
          </div>
          <div className="grid grid-cols-[12rem_1fr] border border-gray-200 bg-gray-50 rounded-2xl items-center gap-[1rem]  p-[1.5rem]">
            <span className="text-secondary-text-color items-center flex gap-[1rem]">
              <CalendarCheck size={20} />
              Data
            </span>
            <span>{formatDate(new Date(date), true, true)}</span>
          </div>{" "}
          <div className="grid grid-cols-[12rem_1fr] border border-gray-200 bg-gray-50 rounded-2xl items-center gap-[1rem]  p-[1.5rem]">
            <span className="text-secondary-text-color items-center flex gap-[1rem]">
              <Clock4Icon size={20} />
              Início
            </span>
            <span>
              {new Intl.DateTimeFormat("PT-pt", {
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(startTime))}
            </span>
          </div>{" "}
          <div className="grid grid-cols-[12rem_1fr] border border-gray-200 bg-gray-50 rounded-2xl items-center gap-[1rem]  p-[1.5rem]">
            <span className="text-secondary-text-color items-center flex gap-[1rem]">
              <ClockFading size={20} />
              Duração
            </span>
            <span>
              {new Intl.DateTimeFormat("PT-pt", {
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(endTime))}
            </span>
          </div>{" "}
          <div className="grid grid-cols-[12rem_1fr] border border-gray-200 bg-gray-50 rounded-2xl items-center gap-[1rem]  p-[1.5rem]">
            <span className="text-secondary-text-color items-center flex gap-[1rem]">
              <UserCheck size={20} />
              Criado por
            </span>
            <div className="flex items-center gap-[1rem]">
              <img
                src={"/default-user.jpg"}
                className="w-[2.4rem] h-[2.4rem] rounded-full"
                alt=""
              />
              <p className="">{createdBy.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-[1rem]">
        <Modal.Open id={eventId + "-update"}>
          <Button variation="secondary">Editar Evento</Button>
        </Modal.Open>
        <Button variation="danger">Cancelar Evento</Button>
      </div>
    </div>
  );
}

export default EventDetails;
