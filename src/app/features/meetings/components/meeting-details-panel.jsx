import { CalendarDays, Clock3, MapPin, UsersRound, Video } from "lucide-react";
import Tag from "../../../shared/ui/tag";
import { formatHour, rewriteStatus } from "../../../shared/utils/helpers";
import { useNavigate, useParams } from "react-router-dom";

function formatFullDate(value) {
  return new Intl.DateTimeFormat("en-US", {
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
    <section className="h-[calc(100dvh-5.5rem)] overflow-y-auto bg-main-bg-color p-[2rem] md:p-[3rem]">
      <div className="max-w-[72rem] mx-auto">
        <div className="bg-white border border-gray-200 rounded-3xl p-[2rem] md:p-[2.6rem]">
          <div className="flex items-start justify-between gap-[1rem]">
            <div>
              <p className="text-[1.3rem] text-secondary-text-color">Meeting event</p>
              <h1 className="text-[2.6rem] leading-tight font-semibold text-main-text-color mt-[0.3rem]">
                {meeting.title}
              </h1>
            </div>
            <Tag type={meeting.status}>{rewriteStatus(meeting.status)}</Tag>
          </div>

          <p className="mt-[1rem] text-[1.5rem] text-secondary-text-color">
            {meeting.description || "No description added for this meeting."}
          </p>

          <div className="mt-[2rem] grid sm:grid-cols-2 gap-[1rem] text-[1.4rem]">
            <div className="rounded-2xl border border-gray-200 bg-main-bg-color p-[1rem]">
              <p className="text-[1.2rem] text-secondary-text-color">Date</p>
              <p className="mt-[0.5rem] inline-flex items-center gap-[0.5rem]">
                <CalendarDays size={16} /> {formatFullDate(meeting.date)}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-main-bg-color p-[1rem]">
              <p className="text-[1.2rem] text-secondary-text-color">Time</p>
              <p className="mt-[0.5rem] inline-flex items-center gap-[0.5rem]">
                <Clock3 size={16} /> {formatHour(startAt)} - {formatHour(endAt)} ({duration(startAt, endAt)})
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-main-bg-color p-[1rem]">
              <p className="text-[1.2rem] text-secondary-text-color">Type</p>
              <p className="mt-[0.5rem] inline-flex items-center gap-[0.5rem]">
                {meeting.type === "video-call" ? <Video size={16} /> : <MapPin size={16} />}
                {meeting.type === "video-call"
                  ? "Video call"
                  : meeting.location || "In-person"}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-main-bg-color p-[1rem]">
              <p className="text-[1.2rem] text-secondary-text-color">Team</p>
              <p className="mt-[0.5rem] inline-flex items-center gap-[0.5rem]">
                <UsersRound size={16} /> {meeting.teamId?.name || teamName || "-"}
              </p>
            </div>
          </div>

          {meeting.type === "video-call" && (
            <div className="mt-[2rem] flex justify-end">
              <button
                onClick={() =>
                  navigate(`/${companyId}/meetings/${teamId}/call/${meeting.id}`)
                }
                className="px-[1.4rem] py-[0.9rem] rounded-xl bg-main-color text-white text-[1.3rem] font-medium hover:opacity-90"
              >
                Entrar na chamada
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
