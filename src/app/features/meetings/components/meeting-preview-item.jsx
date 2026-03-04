import clsx from "clsx";
import { CalendarDays, Clock3, MapPin, Video } from "lucide-react";
import Tag from "../../../shared/ui/tag";
import { formatHour, rewriteStatus } from "../../../shared/utils/helpers";

function formatMeetingDay(value) {
  const date = new Date(value);
  const now = new Date();

  if (date.toDateString() === now.toDateString()) return "Today";

  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export function MeetingPreviewItem({ meeting, selected, onClick }) {
  const startAt = meeting.startTime || meeting.date;

  return (
    <li>
      <button
        onClick={onClick}
        className={clsx(
          "w-full text-left rounded-2xl border px-[1rem] py-[1rem] transition-colors",
          selected
            ? "border-green-500 bg-green-50"
            : "border-gray-200 hover:bg-main-bg-color",
        )}
      >
        <div className="flex items-start justify-between gap-[1rem]">
          <div className="min-w-0">
            <p className="font-medium truncate text-[1.5rem] text-main-text-color">
              {meeting.title}
            </p>
            <p className="text-[1.2rem] mt-[0.2rem] text-secondary-text-color line-clamp-1">
              {meeting.description || "No description"}
            </p>
          </div>

          <Tag type={meeting.status}>{rewriteStatus(meeting.status)}</Tag>
        </div>

        <div className="mt-[0.8rem] grid grid-cols-2 gap-y-[0.4rem] text-[1.2rem] text-secondary-text-color">
          <span className="inline-flex items-center gap-[0.4rem]">
            <CalendarDays size={14} /> {formatMeetingDay(startAt)}
          </span>
          <span className="inline-flex items-center gap-[0.4rem] justify-self-end">
            <Clock3 size={14} /> {formatHour(startAt)}
          </span>
          <span className="inline-flex items-center gap-[0.4rem] col-span-2">
            {meeting.type === "video-call" ? <Video size={14} /> : <MapPin size={14} />}
            {meeting.type === "video-call"
              ? "Video call"
              : meeting.location || "In-person"}
          </span>
        </div>
      </button>
    </li>
  );
}
