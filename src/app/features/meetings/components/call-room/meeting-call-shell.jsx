import { useEffect, useMemo, useState } from "react";
import {
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import {
} from "lucide-react";
import { toast } from "sonner";
import RoomHeader from "./room-header";
import RoomControlDock from "./room-control-dock";
import { MobileRoomSidebar, RoomSidebar } from "./room-sidebar";
import RoomStage from "./room-stage";
import "./meeting-call-shell.css";

function formatDuration(startedAt) {
  if (!startedAt) return "00:00";

  const diffSeconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000),
  );

  const h = Math.floor(diffSeconds / 3600);
  const m = Math.floor((diffSeconds % 3600) / 60);
  const s = diffSeconds % 60;

  if (h > 0) {
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function MeetingCallShell({ currentUser, onLeave, meeting }) {
  const [layout, setLayout] = useState("speaker");
  const [sidebar, setSidebar] = useState("participants");
  const [duration, setDuration] = useState("00:00");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);

  const {
    useCallSettings,
    useCameraState,
    useMicrophoneState,
    useScreenShareState,
    useHasOngoingScreenShare,
    useParticipantCount,
    useCallStartedAt,
    useParticipants,
    useLocalParticipant,
  } =
    useCallStateHooks();

  const call = useCall();
  const callSettings = useCallSettings();
  const { microphone, optionsAwareIsMute: isMicMuted, isTogglePending: isMicToggling } =
    useMicrophoneState();
  const { camera, optionsAwareIsMute: isCameraMuted, isTogglePending: isCameraToggling } =
    useCameraState();
  const {
    screenShare,
    optionsAwareIsMute: isScreenShareMuted,
    isTogglePending: isScreenShareToggling,
  } = useScreenShareState();
  const isSomeoneScreenSharing = useHasOngoingScreenShare();
  const participantCount = useParticipantCount();
  const startedAt = useCallStartedAt();
  const participants = useParticipants();
  const localParticipant = useLocalParticipant();
  const [networkStatus, setNetworkStatus] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(formatDuration(startedAt));
    }, 1000);

    return () => clearInterval(timer);
  }, [startedAt]);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    const update = () => setNetworkStatus(navigator.onLine ? "" : "Conexão instável");
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  const openMobilePanel = (nextSidebar) => {
    setSidebar(nextSidebar);
    setIsMobilePanelOpen(true);
  };

  const toggleMic = async () => {
    try {
      await microphone.toggle();
    } catch {
      toast.error("Não foi possível alternar o microfone");
    }
  };

  const toggleCamera = async () => {
    try {
      await camera.toggle();
    } catch {
      toast.error("Não foi possível alternar a câmera");
    }
  };

  const isScreenSharingAllowed = callSettings?.screensharing?.enabled !== false;
  const amIScreenSharing = !isScreenShareMuted;
  const canToggleScreenShare =
    !isScreenShareToggling &&
    !(!amIScreenSharing && (!isScreenSharingAllowed || isSomeoneScreenSharing));

  const toggleScreenShare = async () => {
    if (!canToggleScreenShare) return;

    try {
      await screenShare.toggle();
    } catch {
      toast.error("Não foi possível alternar o compartilhamento de tela");
    }
  };

  const leaveCall = async () => {
    try {
      await call?.leave();
    } catch {
      toast.error("Falha ao sair da chamada");
    } finally {
      onLeave?.();
    }
  };

  const screenShareParticipant = participants.find((participant) => participant.isScreenSharing);
  const screenShareName =
    screenShareParticipant?.user?.name || screenShareParticipant?.name || "";

  return (
    <div className="call-room-shell relative h-full min-h-0 flex flex-col bg-slate-950 text-white">
      <RoomHeader
        onBack={onLeave}
        meeting={meeting}
        participantCount={participantCount}
        duration={duration}
        layout={layout}
        onToggleLayout={() => setLayout((prev) => (prev === "speaker" ? "grid" : "speaker"))}
        onCopyLink={async () => {
          await navigator.clipboard.writeText(window.location.href);
          toast.success("Link da chamada copiado");
        }}
        onOpenParticipants={() => openMobilePanel("participants")}
        onOpenChat={() => openMobilePanel("chat")}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        isSidebarOpen={isSidebarOpen}
        screenShareName={screenShareName}
        networkStatus={networkStatus}
      />

      <div
        className={`flex-1 min-h-0 grid gap-[0.8rem] p-[0.8rem] md:p-[1.2rem] ${
          isSidebarOpen
            ? "lg:grid-cols-[minmax(0,1fr)_minmax(30rem,36rem)]"
            : "lg:grid-cols-1"
        }`}
      >
        <section className="min-h-0 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-[0.8rem] md:p-[1.2rem]">
          <RoomStage
            layout={isSomeoneScreenSharing ? "speaker" : layout}
            participants={participants}
            localParticipant={localParticipant}
          />
        </section>

        {isSidebarOpen && (
          <RoomSidebar
            sidebar={sidebar}
            setSidebar={setSidebar}
            currentUser={currentUser}
          />
        )}
      </div>

      <RoomControlDock
        isMicMuted={isMicMuted}
        isMicToggling={isMicToggling}
        onToggleMic={toggleMic}
        isCameraMuted={isCameraMuted}
        isCameraToggling={isCameraToggling}
        onToggleCamera={toggleCamera}
        isScreenShareMuted={isScreenShareMuted}
        isScreenShareToggling={isScreenShareToggling}
        canToggleScreenShare={canToggleScreenShare}
        onToggleScreenShare={toggleScreenShare}
        layout={layout}
        onToggleLayout={() => setLayout((prev) => (prev === "speaker" ? "grid" : "speaker"))}
        onOpenSidebar={() =>
          window.innerWidth < 1024
            ? openMobilePanel("participants")
            : setIsSidebarOpen((prev) => !prev)
        }
        onOpenChat={() =>
          window.innerWidth < 1024
            ? openMobilePanel("chat")
            : (() => {
                setSidebar("chat");
                setIsSidebarOpen(true);
              })()
        }
        onLeave={leaveCall}
      />

      {isMobilePanelOpen && (
        <MobileRoomSidebar
          sidebar={sidebar}
          setSidebar={setSidebar}
          setIsMobilePanelOpen={setIsMobilePanelOpen}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}
