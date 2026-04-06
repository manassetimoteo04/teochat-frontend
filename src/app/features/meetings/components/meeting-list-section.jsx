import Modal from "../../../shared/ui/modal";
import { MeetingPreviewItem } from "./meeting-preview-item";

export function MeetingListSection({
  title,
  count,
  meetings,
  selectedMeetingId,
  onSelectMeeting,
  emptyMessage,
  useModal = false,
  modalId = "meeting-details",
}) {
  return (
    <section className="mb-[2rem]">
      <div className="flex items-center justify-between mb-[0.8rem] px-[0.6rem]">
        <h3 className="text-[1.2rem] uppercase tracking-[0.05em] font-semibold text-secondary-text-color">
          {title}
        </h3>
        <span className="text-[1.2rem] text-secondary-text-color bg-gray-100 px-[0.6rem] py-[0.2rem] rounded-full">
          {count}
        </span>
      </div>

      <ul className="flex flex-col gap-[0.6rem]">
        {meetings.length > 0 &&
          meetings.map((meeting) => (
            useModal ? (
              <Modal.Open id={modalId} key={meeting.id}>
                <MeetingPreviewItem
                  meeting={meeting}
                  selected={selectedMeetingId === meeting.id}
                  onClick={() => onSelectMeeting(meeting.id)}
                />
              </Modal.Open>
            ) : (
              <MeetingPreviewItem
                key={meeting.id}
                meeting={meeting}
                selected={selectedMeetingId === meeting.id}
                onClick={() => onSelectMeeting(meeting.id)}
              />
            )
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
