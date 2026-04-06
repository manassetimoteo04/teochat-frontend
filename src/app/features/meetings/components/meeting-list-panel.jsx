import { CalendarDays, Search, Video } from "lucide-react";
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
  useModal = false,
  modalId = "meeting-details",
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
    <aside className="h-auto lg:h-[calc(100dvh-5.5rem)] lg:border-r border-gray-200 bg-white overflow-y-auto">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-[1.5rem] sm:p-[2rem] flex flex-col gap-[1rem]">
        <div className="flex items-center gap-[1rem]">
          <div className="w-[3.6rem] h-[3.6rem] rounded-full bg-green-100 text-green-700 flex items-center justify-center">
            <Video size={18} />
          </div>
          <div>
            <h2 className="font-semibold text-[2.2rem] leading-none text-main-text-color">
              Reuniões
            </h2>
            <p className="text-[1.3rem] text-secondary-text-color mt-[0.4rem]">
              Equipa {teamName || "-"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[0.8rem]">
          <div className="rounded-2xl border border-gray-200 bg-main-bg-color p-[0.8rem]">
            <p className="text-[1.1rem] text-secondary-text-color">Próximas</p>
            <p className="text-[1.8rem] font-semibold text-main-text-color">
              {filteredUpcoming.length}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-main-bg-color p-[0.8rem]">
            <p className="text-[1.1rem] text-secondary-text-color">Passadas</p>
            <p className="text-[1.8rem] font-semibold text-main-text-color">
              {filteredPast.length}
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
            placeholder="Pesquisar reuniões..."
            className="pl-[2.8rem] w-full bg-transparent focus:outline-none text-[1.4rem]"
          />
        </div>
      </header>

      <div className="px-[1.2rem] sm:px-[1.6rem] py-[1rem]">
        <MeetingListSection
          title="Próximas Reuniões"
          count={filteredUpcoming.length}
          meetings={filteredUpcoming}
          selectedMeetingId={selectedMeetingId}
          onSelectMeeting={onSelectMeeting}
          useModal={useModal}
          modalId={modalId}
          emptyMessage="Sem reuniões próximas"
        />

        <MeetingListSection
          title="Reuniões Passadas"
          count={filteredPast.length}
          meetings={filteredPast}
          selectedMeetingId={selectedMeetingId}
          onSelectMeeting={onSelectMeeting}
          useModal={useModal}
          modalId={modalId}
          emptyMessage="Sem reuniões passadas"
        />
      </div>
    </aside>
  );
}
