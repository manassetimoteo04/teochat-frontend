import { MeetingPreviewItem } from "./meeting-preview-item";

export function MeetingListSection({
  title,
  meetings,
  selectedMeetingId,
  onSelectMeeting,
  emptyMessage,
}) {
  return (
    <section className="mb-[2rem]">
      <h3 className="text-[1.2rem] uppercase tracking-[0.05em] font-semibold text-secondary-text-color mb-[0.8rem] px-[0.6rem]">
        {title}
      </h3>

      <ul className="flex flex-col gap-[0.6rem]">
        {meetings.length > 0 &&
          meetings.map((meeting) => (
            <MeetingPreviewItem
              key={meeting.id}
              meeting={meeting}
              selected={selectedMeetingId === meeting.id}
              onClick={() => onSelectMeeting(meeting.id)}
            />
          ))}

        {meetings.length === 0 && (
          <li className="text-[1.3rem] text-secondary-text-color rounded-xl border border-dashed border-gray-200 px-[1rem] py-[1.2rem] bg-main-bg-color">
            {emptyMessage}
          </li>
        )}
      </ul>
    </section>
  );
}
