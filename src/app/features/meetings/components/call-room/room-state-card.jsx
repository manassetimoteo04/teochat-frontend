import { CalendarDays, Clock3, Video } from "lucide-react";
import { formatHour, rewriteStatus } from "../../../../shared/utils/helpers";

function formatLongDate(value) {
  if (!value) return "Data não definida";

  return new Intl.DateTimeFormat("pt-PT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(value));
}

function RoomStateCard({
  icon,
  title,
  description,
  meeting,
  primaryAction,
  secondaryAction,
}) {
  const Icon = icon || Video;
  const startAt = meeting?.startTime || meeting?.date;
  const endAt = meeting?.endTime || meeting?.startTime || meeting?.date;

  return (
    <div className="min-h-[100dvh] bg-main-bg-color p-[2rem] grid place-items-center">
      <div className="w-full max-w-[76rem] rounded-3xl border border-gray-200 bg-white p-[2rem] md:p-[3rem]">
        <div className="flex flex-col gap-[2rem]">
          <div className="flex items-start gap-[1.2rem]">
            <div className="flex h-[5.2rem] w-[5.2rem] items-center justify-center rounded-2xl bg-main-bg-color text-main-text-color">
              <Icon size={22} />
            </div>
            <div>
              <p className="text-[1.2rem] text-secondary-text-color">
                Sala da reunião
              </p>
              <h1 className="mt-[0.4rem] text-[2.4rem] font-semibold leading-tight text-main-text-color">
                {title}
              </h1>
              <p className="mt-[0.8rem] max-w-[56rem] text-[1.4rem] text-secondary-text-color">
                {description}
              </p>
            </div>
          </div>

          {meeting && (
            <div className="grid gap-[1rem] md:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-main-bg-color p-[1.2rem]">
                <p className="text-[1.2rem] text-secondary-text-color">Reunião</p>
                <p className="mt-[0.4rem] text-[1.5rem] font-medium text-main-text-color">
                  {meeting.title}
                </p>
                <span className="mt-[0.5rem] inline-flex rounded-full border border-gray-200 bg-white px-[0.8rem] py-[0.2rem] text-[1.1rem] text-secondary-text-color">
                  {rewriteStatus(meeting.status)}
                </span>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-main-bg-color p-[1.2rem]">
                <p className="text-[1.2rem] text-secondary-text-color">Data</p>
                <p className="mt-[0.4rem] inline-flex items-center gap-[0.5rem] text-[1.4rem] text-main-text-color">
                  <CalendarDays size={16} />
                  {formatLongDate(meeting.date)}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-main-bg-color p-[1.2rem]">
                <p className="text-[1.2rem] text-secondary-text-color">Horário</p>
                <p className="mt-[0.4rem] inline-flex items-center gap-[0.5rem] text-[1.4rem] text-main-text-color">
                  <Clock3 size={16} />
                  {formatHour(startAt)} - {formatHour(endAt)}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-[0.8rem] sm:flex-row">
            {primaryAction && (
              <button
                onClick={primaryAction.onClick}
                className="rounded-full bg-main-color px-[1.6rem] py-[1rem] text-[1.35rem] font-medium text-black"
              >
                {primaryAction.label}
              </button>
            )}
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="rounded-full border border-gray-200 bg-white px-[1.6rem] py-[1rem] text-[1.35rem] font-medium text-main-text-color"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomStateCard;
