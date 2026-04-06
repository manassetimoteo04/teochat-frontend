import { CalendarDays, Clock3, MapPin, UsersRound, Video } from "lucide-react";
import Tag from "../../../shared/ui/tag";
import { formatHour, rewriteStatus } from "../../../shared/utils/helpers";
import { useNavigate, useParams } from "react-router-dom";

function formatFullDate(value) {
  return new Intl.DateTimeFormat("pt-PT", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function duration(startTime, endTime) {
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  const diffMinutes = Math.max(0, Math.floor((end - start) / 60000));
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  if (!hours) return `${minutes} min`;
  if (!minutes) return `${hours}h`;

  return `${hours}h ${minutes}m`;
}

export function MeetingDetailsPanel({ meeting, teamName }) {
  const navigate = useNavigate();
  const { companyId, teamId } = useParams();
  const startAt = meeting.startTime || meeting.date;
  const endAt = meeting.endTime || meeting.startTime || meeting.date;

  return (
    <section className="h-auto  overflow-y-auto bg-main-bg-color p-[1.5rem] sm:p-[2rem] lg:p-[3rem]">
      <div className="max-w-[72rem] mx-auto flex flex-col gap-[1.5rem]">
        <div className="bg-white border border-gray-200 rounded-3xl p-[1.5rem] sm:p-[2rem] md:p-[2.6rem]">
          <div className="flex items-start justify-between gap-[1rem]">
            <div>
              <p className="text-[1.3rem] text-secondary-text-color">
                Reuniões • {meeting.teamId?.name || teamName || "-"}
              </p>
              <h1 className="text-[2.2rem] sm:text-[2.6rem] leading-tight font-semibold text-main-text-color mt-[0.3rem]">
                {meeting.title}
              </h1>
            </div>
            <Tag type={meeting.status}>{rewriteStatus(meeting.status)}</Tag>
          </div>

          <p className="mt-[1rem] text-[1.5rem] text-secondary-text-color">
            {meeting.description ||
              "Sem descrição adicionada para esta reunião."}
          </p>

          <div className="mt-[2rem] grid sm:grid-cols-2 gap-[1rem] text-[1.4rem]">
            <div className="rounded-2xl border border-gray-200 bg-main-bg-color p-[1rem]">
              <p className="text-[1.2rem] text-secondary-text-color">Data</p>
              <p className="mt-[0.5rem] inline-flex items-center gap-[0.5rem]">
                <CalendarDays size={16} /> {formatFullDate(meeting.date)}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-main-bg-color p-[1rem]">
              <p className="text-[1.2rem] text-secondary-text-color">Hora</p>
              <p className="mt-[0.5rem] inline-flex items-center gap-[0.5rem]">
                <Clock3 size={16} /> {formatHour(startAt)} - {formatHour(endAt)}{" "}
                ({duration(startAt, endAt)})
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-main-bg-color p-[1rem]">
              <p className="text-[1.2rem] text-secondary-text-color">Tipo</p>
              <p className="mt-[0.5rem] inline-flex items-center gap-[0.5rem]">
                {meeting.type === "video-call" ? (
                  <Video size={16} />
                ) : (
                  <MapPin size={16} />
                )}
                {meeting.type === "video-call"
                  ? "Video chamada"
                  : meeting.location || "Presencial"}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-main-bg-color p-[1rem]">
              <p className="text-[1.2rem] text-secondary-text-color">Equipa</p>
              <p className="mt-[0.5rem] inline-flex items-center gap-[0.5rem]">
                <UsersRound size={16} />{" "}
                {meeting.teamId?.name || teamName || "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-[1.5rem] sm:p-[2rem] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[1rem]">
          <div className="flex items-center gap-[0.8rem]">
            <div className="w-[3.2rem] h-[3.2rem] rounded-full bg-green-100 text-green-700 flex items-center justify-center">
              <Video size={16} />
            </div>
            <div>
              <p className="text-[1.3rem] text-secondary-text-color">Chamada</p>
              <p className="text-[1.6rem] font-semibold text-main-text-color">
                {meeting.type === "video-call" ? "Video chamada" : "Presencial"}
              </p>
            </div>
          </div>

          {meeting.type === "video-call" && meeting.status === "started" && (
            <button
              onClick={() =>
                navigate(`/${companyId}/meetings/${teamId}/call/${meeting.id}`)
              }
              className="w-full sm:w-auto px-[1.6rem] py-[1rem] rounded-xl bg-main-color text-white text-[1.4rem] font-medium hover:opacity-90"
            >
              Entrar na chamada
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
