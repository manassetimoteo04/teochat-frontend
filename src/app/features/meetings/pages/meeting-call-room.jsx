import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const { callId, companyId, teamId } = useParams();
  const { currentUser } = useAppContext();
  const { data: meetings, isPending: isLoadingMeetings } = useTeamCalls();

  const meeting = useMemo(
    () => (meetings || []).find((item) => item.id === callId),
    [callId, meetings],
  );

  const canJoinMeeting = meeting?.status === "started";

  const { client, call, isLoading, error } = useStreamCallRoom({
    currentUser,
    callId,
    companyId,
    teamId,
    enabled: canJoinMeeting,
  });

  const leaveToMeetings = useCallback(() => {
    navigate(`/${companyId}/meetings/${teamId}`);
  }, [companyId, navigate, teamId]);

  if (isLoadingMeetings || (canJoinMeeting && isLoading)) {
    return <CallRoomLoading />;
  }

  if (!meeting) {
    return (
      <RoomStateCard
        icon={Video}
        title="Reunião não encontrada"
        description="Não localizamos esta sala na lista de reuniões da equipa. Confirme se a reunião ainda existe e tente novamente."
        primaryAction={{ label: "Voltar para reuniões", onClick: leaveToMeetings }}
      />
    );
  }

  if (meeting.status !== "started") {
    return (
      <RoomStateCard
        icon={Video}
        title="A sala ainda não está disponível"
        description="O acesso à sala só é permitido quando a reunião estiver com o estado iniciado. Assim evitamos entradas antecipadas e mantemos a experiência alinhada com o calendário da equipa."
        meeting={meeting}
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
      meeting={meeting}
    />
  );
}

export default MeetingCallRoomPage;
