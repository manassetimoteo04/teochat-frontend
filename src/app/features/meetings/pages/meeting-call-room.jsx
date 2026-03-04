import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  StreamCall,
  StreamTheme,
  StreamVideo,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import Spinner from "../../../shared/ui/Spinner";
import { useAppContext } from "../../../shared/providers/context";
import { useStreamCallRoom } from "../hooks/use-stream-call-room";
import { MeetingCallShell } from "../components/call-room/meeting-call-shell";

function MeetingCallRoomPage() {
  const navigate = useNavigate();
  const { callId, companyId, teamId } = useParams();
  const { currentUser } = useAppContext();

  const { client, call, isLoading, error } = useStreamCallRoom({
    currentUser,
    callId,
    companyId,
    teamId,
  });

  const leaveToMeetings = useCallback(() => {
    navigate(`/${companyId}/meetings/${teamId}`);
  }, [companyId, navigate, teamId]);

  const meetingTitle = useMemo(() => `Meeting · ${callId}`, [callId]);

  if (isLoading) {
    return (
      <div className=" fixed top-0 left-0 w-full h-screen grid place-items-center bg-main-bg-color">
        <Spinner />
      </div>
    );
  }

  if (error || !client || !call) {
    return (
      <div className="h-full min-h-0 grid place-items-center bg-main-bg-color p-[2rem]">
        <div className="bg-white border rounded-2xl p-[2rem] max-w-[62rem]">
          <h2 className="text-[2rem] font-semibold">
            Não foi possível abrir a chamada
          </h2>
          <p className="text-secondary-text-color mt-[1rem]">{error}</p>
          <div className="mt-[1.4rem] text-[1.3rem] text-secondary-text-color">
            Configure no `.env`:
            <pre className="bg-main-bg-color border rounded-xl p-[1rem] mt-[0.8rem] overflow-x-auto">{`VITE_STREAM_API_KEY=...
VITE_STREAM_TOKEN=... # opcional se backend já gerar token`}</pre>
          </div>
          <button
            onClick={leaveToMeetings}
            className="mt-[1.4rem] px-[1.2rem] py-[0.8rem] rounded-xl bg-main-color text-white"
          >
            Voltar para Meetings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] h-[100dvh] w-full bg-slate-950">
      <StreamVideo client={client} className="h-[100dvh] min-h-[100dvh] w-full">
        <StreamCall call={call}>
          <StreamTheme className="h-[100dvh] min-h-[100dvh]">
            <MeetingCallShell
              currentUser={currentUser}
              onLeave={leaveToMeetings}
              meetingTitle={meetingTitle}
            />
          </StreamTheme>
        </StreamCall>
      </StreamVideo>
    </div>
  );
}

export default MeetingCallRoomPage;
