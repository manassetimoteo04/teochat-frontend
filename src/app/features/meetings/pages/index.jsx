import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../../shared/ui/Spinner";
import Modal from "../../../shared/ui/modal";
import { useTeamCalls } from "../hooks/use-team-calls";
import { useGetTeamDetails } from "../../teams/hooks/use-get-team-details";
import { MeetingDetailsPanel } from "../components/meeting-details-panel";
import { MeetingListPanel } from "../components/meeting-list-panel";
import { useBreakpoint } from "../../../shared/hooks/use-breakpont";

function MeetingsPage() {
  const [search, setSearch] = useState("");
  const [selectedMeetingIdLocal, setSelectedMeetingIdLocal] = useState("");
  const { hash } = useLocation();
  const navigate = useNavigate();
  const { isLg } = useBreakpoint();
  const isMobile = !isLg;

  const closeMobileModal = () => {
    setSelectedMeetingIdLocal("");
  };

  const { data: team, isPending: isLoadingTeam } = useGetTeamDetails();
  const { data: meetings, isPending: isLoadingMeetings } = useTeamCalls();

  const orderedMeetings = useMemo(
    () =>
      [...(meetings || [])].sort(
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

  const selectedMeetingId = isMobile
    ? selectedMeetingIdLocal
    : hash.replace("#", "");
  const selectedMeeting = useMemo(
    () => orderedMeetings.find((meeting) => meeting.id === selectedMeetingId),
    [orderedMeetings, selectedMeetingId],
  );

  useEffect(() => {
    if (isMobile) return;
    if (!orderedMeetings.length || selectedMeetingId) return;
    navigate({ hash: `#${orderedMeetings[0].id}` }, { replace: true });
  }, [isMobile, navigate, orderedMeetings, selectedMeetingId]);

  useEffect(() => {
    if (isMobile) return;
    if (!orderedMeetings.length || !selectedMeetingId || selectedMeeting) return;
    navigate({ hash: `#${orderedMeetings[0].id}` }, { replace: true });
  }, [isMobile, navigate, orderedMeetings, selectedMeeting, selectedMeetingId]);

  if (isLoadingMeetings || isLoadingTeam) return <Spinner />;

  const layout = (
    <div className="grid relative lg:grid-cols-[38rem_1fr]">
      <MeetingListPanel
        search={search}
        onSearch={setSearch}
        teamName={team?.name}
        upcomingMeetings={upcomingMeetings}
        pastMeetings={pastMeetings}
        selectedMeetingId={selectedMeetingId}
        onSelectMeeting={(id) => {
          if (isMobile) {
            setSelectedMeetingIdLocal(id);
            return;
          }
          navigate({ hash: `#${id}` });
        }}
        useModal={isMobile}
        modalId="meeting-details"
      />

      {selectedMeeting && !isMobile && (
        <MeetingDetailsPanel meeting={selectedMeeting} teamName={team?.name} />
      )}

      {!selectedMeeting && !isMobile && orderedMeetings.length > 0 && (
        <section className="h-[calc(100dvh-5.5rem)] bg-main-bg-color p-[2rem] lg:p-[3rem]">
          <div className="max-w-[72rem] mx-auto flex flex-col gap-[1.5rem]">
            <div className="bg-white border border-gray-200 rounded-3xl p-[2.4rem]">
              <p className="text-[1.3rem] text-secondary-text-color">
                Reuniões • {team?.name || "-"}
              </p>
              <h2 className="text-[2.4rem] font-semibold text-main-text-color mt-[0.4rem]">
                Seleciona uma reunião
              </h2>
              <p className="text-secondary-text-color mt-[0.6rem] max-w-[48rem]">
                Escolhe uma reunião à esquerda para ver detalhes, participantes e
                opções da chamada.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-[1rem]">
              <div className="bg-white border border-gray-200 rounded-2xl p-[1.5rem]">
                <p className="text-[1.2rem] text-secondary-text-color">Próximas</p>
                <p className="text-[2.2rem] font-semibold text-main-text-color">
                  {upcomingMeetings.length}
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-[1.5rem]">
                <p className="text-[1.2rem] text-secondary-text-color">Passadas</p>
                <p className="text-[2.2rem] font-semibold text-main-text-color">
                  {pastMeetings.length}
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-[1.5rem]">
                <p className="text-[1.2rem] text-secondary-text-color">Total</p>
                <p className="text-[2.2rem] font-semibold text-main-text-color">
                  {orderedMeetings.length}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {!selectedMeeting && orderedMeetings.length === 0 && (
        <div className="h-[calc(100dvh-5.5rem)] grid place-items-center text-center p-[2rem]">
          <div className="bg-white border border-gray-200 rounded-3xl p-[2.5rem] max-w-[38rem]">
            <h3 className="text-[2rem] font-semibold">Sem reuniões</h3>
            <p className="text-secondary-text-color mt-[0.5rem]">
              Crie um novo evento na área de Agendas para vê-lo aqui.
            </p>
          </div>
        </div>
      )}
    </div>
  );

  if (!isMobile) return layout;

  return (
    <Modal>
      {layout}
      {selectedMeeting && (
        <Modal.Window id="meeting-details" onClose={closeMobileModal}>
          <MeetingDetailsPanel meeting={selectedMeeting} teamName={team?.name} />
        </Modal.Window>
      )}
    </Modal>
  );
}

export default MeetingsPage;
