import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../../shared/ui/Spinner";
import { useGetTeamEvents } from "../../events/hooks/use-get-team-events";
import { useGetTeamDetails } from "../../teams/hooks/use-get-team-details";
import { MeetingDetailsPanel } from "../components/meeting-details-panel";
import { MeetingListPanel } from "../components/meeting-list-panel";

function MeetingsPage() {
  const [search, setSearch] = useState("");
  const { hash } = useLocation();
  const navigate = useNavigate();

  const { data: team, isPending: isLoadingTeam } = useGetTeamDetails();
  const { data: meetings = [], isPending: isLoadingMeetings } = useGetTeamEvents();

  const orderedMeetings = useMemo(
    () =>
      [...meetings].sort(
        (a, b) =>
          new Date(a.startTime || a.date).getTime() -
          new Date(b.startTime || b.date).getTime(),
      ),
    [meetings],
  );

  const { upcomingMeetings, pastMeetings } = useMemo(() => {
    const now = Date.now();

    const upcoming = [];
    const past = [];

    orderedMeetings.forEach((meeting) => {
      const startsAt = new Date(meeting.startTime || meeting.date).getTime();
      if (startsAt >= now) {
        upcoming.push(meeting);
      } else {
        past.push(meeting);
      }
    });

    return {
      upcomingMeetings: upcoming,
      pastMeetings: past.reverse(),
    };
  }, [orderedMeetings]);

  const selectedMeetingId = hash.replace("#", "");
  const selectedMeeting = useMemo(
    () => orderedMeetings.find((meeting) => meeting.id === selectedMeetingId),
    [orderedMeetings, selectedMeetingId],
  );

  useEffect(() => {
    if (!orderedMeetings.length || selectedMeetingId) return;
    navigate({ hash: `#${orderedMeetings[0].id}` }, { replace: true });
  }, [navigate, orderedMeetings, selectedMeetingId]);

  useEffect(() => {
    if (!orderedMeetings.length || !selectedMeetingId || selectedMeeting) return;
    navigate({ hash: `#${orderedMeetings[0].id}` }, { replace: true });
  }, [navigate, orderedMeetings, selectedMeeting, selectedMeetingId]);

  if (isLoadingMeetings || isLoadingTeam) return <Spinner />;

  return (
    <div className="grid relative md:grid-cols-2 lg:grid-cols-[38rem_1fr]">
      <MeetingListPanel
        search={search}
        onSearch={setSearch}
        teamName={team?.name}
        upcomingMeetings={upcomingMeetings}
        pastMeetings={pastMeetings}
        selectedMeetingId={selectedMeetingId}
        onSelectMeeting={(id) => navigate({ hash: `#${id}` })}
      />

      {selectedMeeting && (
        <MeetingDetailsPanel meeting={selectedMeeting} teamName={team?.name} />
      )}

      {!selectedMeeting && orderedMeetings.length === 0 && (
        <div className="h-[calc(100dvh-5.5rem)] grid place-items-center text-center p-[2rem]">
          <div>
            <h3 className="text-[2rem] font-semibold">No meetings found</h3>
            <p className="text-secondary-text-color mt-[0.5rem]">
              Add a new event in Agendas to see meetings here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MeetingsPage;
