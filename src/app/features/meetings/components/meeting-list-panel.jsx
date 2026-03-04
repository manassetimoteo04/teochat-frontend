import { Search, Video } from "lucide-react";
import { normalizeText } from "../../../shared/utils/helpers";
import { MeetingListSection } from "./meeting-list-section";

export function MeetingListPanel({
  search,
  onSearch,
  teamName,
  upcomingMeetings,
  pastMeetings,
  selectedMeetingId,
  onSelectMeeting,
}) {
  const normalizedSearch = normalizeText(search);

  const matchesSearch = (meeting) => {
    if (!normalizedSearch) return true;

    const haystack = normalizeText(
      `${meeting.title || ""} ${meeting.description || ""} ${meeting.location || ""}`,
    );

    return haystack?.includes(normalizedSearch);
  };

  const filteredUpcoming = upcomingMeetings.filter(matchesSearch);
  const filteredPast = pastMeetings.filter(matchesSearch);

  return (
    <aside className="h-[calc(100dvh-5.5rem)] border-r border-gray-200 bg-white overflow-y-auto">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-[2rem] flex flex-col gap-[1rem]">
        <div className="flex items-center gap-[1rem]">
          <div className="w-[3.6rem] h-[3.6rem] rounded-full bg-green-100 text-green-700 flex items-center justify-center">
            <Video size={18} />
          </div>
          <div>
            <h2 className="font-semibold text-[2.2rem] leading-none text-main-text-color">
              Meetings
            </h2>
            <p className="text-[1.3rem] text-secondary-text-color mt-[0.4rem]">
              Team {teamName || "-"}
            </p>
          </div>
        </div>

        <div className="relative rounded-2xl border border-gray-200 focus-within:border-main-color bg-main-bg-color px-[1.2rem] py-[1rem]">
          <Search
            size={18}
            className="text-secondary-text-color absolute left-[1rem] top-1/2 -translate-y-1/2"
          />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search meetings..."
            className="pl-[2.8rem] w-full bg-transparent focus:outline-none text-[1.4rem]"
          />
        </div>
      </header>

      <div className="px-[1.6rem] py-[1rem]">
        <MeetingListSection
          title="Upcoming Meetings"
          meetings={filteredUpcoming}
          selectedMeetingId={selectedMeetingId}
          onSelectMeeting={onSelectMeeting}
          emptyMessage="No upcoming meetings"
        />

        <MeetingListSection
          title="Past Meeting Events"
          meetings={filteredPast}
          selectedMeetingId={selectedMeetingId}
          onSelectMeeting={onSelectMeeting}
          emptyMessage="No past meetings"
        />
      </div>
    </aside>
  );
}
