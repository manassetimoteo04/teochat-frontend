import { useCallback, useMemo } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  StreamCall,
  StreamTheme,
  StreamVideo,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { AlertCircle, Video } from "lucide-react";
import Spinner from "../../../shared/ui/Spinner";
import { useAppContext } from "../../../shared/providers/context";
import { useStreamCallRoom } from "../hooks/use-stream-call-room";
import { MeetingCallShell } from "../components/call-room/meeting-call-shell";
import RoomStateCard from "../components/call-room/room-state-card";
import { useTeamCalls } from "../hooks/use-team-calls";

function getErrorMessage(error) {
  if (!error) return "Ocorreu um erro inesperado.";
  if (typeof error === "string") return error;
  if (error.message) return error.message;
  return "Ocorreu um erro inesperado.";
}

function CallRoomLoading() {
  return (
    <div className="fixed inset-0 grid place-items-center bg-slate-950">
      <div className="flex flex-col items-center gap-[1rem]">
        <Spinner />
        <p className="text-[1.3rem] text-gray-300">A ligar à chamada...</p>
      </div>
    </div>
  );
}

function CallRoomError({ error, onBack }) {
  return (
    <RoomStateCard
      icon={AlertCircle}
      title="Não foi possível abrir a chamada"
      description={getErrorMessage(error)}
      primaryAction={{ label: "Voltar para reuniões", onClick: onBack }}
    />
  );
}

function CallRoomShell({ client, call, currentUser, onLeave, meeting }) {
  return (
    <div className="fixed inset-0 z-[60] h-[100dvh] w-full bg-slate-950">
      <StreamVideo client={client} className="h-[100dvh] min-h-[100dvh] w-full">
        <StreamCall call={call}>
          <StreamTheme className="h-[100dvh] min-h-[100dvh]">
            <MeetingCallShell
              currentUser={currentUser}
              onLeave={onLeave}
              meeting={meeting}
            />
          </StreamTheme>
        </StreamCall>
      </StreamVideo>
    </div>
  );
}

function MeetingCallRoomPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { callId, companyId, teamId } = useParams();
  const { currentUser } = useAppContext();
  const { data: meetings, isPending: isLoadingMeetings } = useTeamCalls();
  const eventIdFromQuery = searchParams.get("eventId");
  const instantCallData = location.state?.instantCallData;

  const meeting = useMemo(
    () =>
      (meetings || []).find(
        (item) =>
          item.callId === callId ||
          item.id === callId ||
          item.id === eventIdFromQuery ||
          item.eventId === eventIdFromQuery,
      ),
    [callId, eventIdFromQuery, meetings],
  );

  const fallbackMeeting = useMemo(() => {
    if (!instantCallData?.event || !instantCallData?.meetingCall) return null;

    return {
      id: instantCallData.meetingCall.id,
      callId: instantCallData.meetingCall.callId,
      title: instantCallData.event.title || "Chamada instantânea",
      description: instantCallData.event.description || "Sem descrição",
      type: instantCallData.event.type || "video-call",
      status: instantCallData.meetingCall.status,
      date: instantCallData.event.date || instantCallData.meetingCall.startTime,
      startTime:
        instantCallData.event.startTime || instantCallData.meetingCall.startTime,
      endTime:
        instantCallData.event.endTime || instantCallData.meetingCall.endTime,
      location: instantCallData.event.location,
      teamId: instantCallData.event.teamId || instantCallData.meetingCall.teamId,
      eventId: instantCallData.event.id || instantCallData.meetingCall.eventId,
      eventStatus: instantCallData.event.status,
    };
  }, [instantCallData]);

  const resolvedMeeting = meeting || fallbackMeeting;
  const canJoinMeeting =
    resolvedMeeting?.status === "started" ||
    instantCallData?.meetingCall?.status === "started";

  const { client, call, isLoading, error } = useStreamCallRoom({
    currentUser,
    callId,
    companyId,
    teamId,
    initialToken: location.state?.initialStreamToken || "",
    enabled: canJoinMeeting,
  });

  const leaveToMeetings = useCallback(() => {
    navigate(`/${companyId}/meetings/${teamId}`);
  }, [companyId, navigate, teamId]);

  if (isLoadingMeetings || (canJoinMeeting && isLoading)) {
    return <CallRoomLoading />;
  }

  if (!resolvedMeeting) {
    return (
      <RoomStateCard
        icon={Video}
        title="Reunião não encontrada"
        description="Não localizamos esta sala na lista de reuniões da equipa. Confirme se a reunião ainda existe e tente novamente."
        primaryAction={{ label: "Voltar para reuniões", onClick: leaveToMeetings }}
      />
    );
  }

  if (resolvedMeeting.status !== "started") {
    return (
      <RoomStateCard
        icon={Video}
        title="A sala ainda não está disponível"
        description="O acesso à sala só é permitido quando a reunião estiver com o estado iniciado. Assim evitamos entradas antecipadas e mantemos a experiência alinhada com o calendário da equipa."
        meeting={resolvedMeeting}
        primaryAction={{ label: "Voltar para reuniões", onClick: leaveToMeetings }}
      />
    );
  }

  if (error || !client || !call) {
    return <CallRoomError error={error} onBack={leaveToMeetings} />;
  }

  return (
    <CallRoomShell
      client={client}
      call={call}
      currentUser={currentUser}
      onLeave={leaveToMeetings}
      meeting={resolvedMeeting}
    />
  );
}

export default MeetingCallRoomPage;
