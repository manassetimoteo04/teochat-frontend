import { useEffect, useMemo, useState } from "react";
import {
  CallParticipantsList,
  CallingState,
  PaginatedGridLayout,
  ParticipantView,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import {
  ArrowLeft,
  Camera,
  CameraOff,
  Copy,
  LayoutGrid,
  Loader2,
  Mic,
  MicOff,
  MessageSquare,
  PanelRight,
  PanelRightClose,
  ScreenShare,
  ScreenShareOff,
  PhoneOff,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { InCallChatPanel } from "./in-call-chat-panel";
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

export function MeetingCallShell({ currentUser, onLeave, meetingTitle }) {
  const [layout, setLayout] = useState("speaker");
  const [sidebar, setSidebar] = useState("participants");
  const [duration, setDuration] = useState("00:00");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);

  const {
    useCallCallingState,
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
  const callingState = useCallCallingState();
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

  const roomStatusLabel = useMemo(
    () =>
      callingState === CallingState.JOINED
        ? "Ao vivo"
        : callingState === CallingState.JOINING
          ? "A conectar..."
          : "Aguardando",
    [callingState],
  );

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

  const shouldRenderLocalFallback = participants.length === 0 && !!localParticipant;

  return (
    <div className="call-room-shell relative h-full min-h-0 flex flex-col bg-slate-950 text-white">
      <header className="shrink-0 px-[1rem] md:px-[2rem] py-[1rem] flex items-center justify-between gap-[1rem] border-b border-white/10 bg-slate-950/95 backdrop-blur-sm">
        <div className="flex items-center gap-[0.8rem] min-w-0">
          <button
            onClick={onLeave}
            className="w-[3.2rem] h-[3.2rem] shrink-0 rounded-full bg-white/10 grid place-items-center hover:bg-white/20"
            title="Voltar"
          >
            <ArrowLeft size={16} />
          </button>

          <div className="min-w-0">
            <p className="text-[1.4rem] font-semibold truncate">
              {meetingTitle || "Team Room"}
            </p>
            <p className="text-[1.2rem] text-zinc-300 truncate">
              {roomStatusLabel} · {participantCount || 1} participantes · {duration}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[0.5rem] shrink-0">
          <button
            onClick={() => setLayout((prev) => (prev === "speaker" ? "grid" : "speaker"))}
            className="px-[1rem] h-[3.2rem] rounded-lg bg-white/10 hover:bg-white/20 text-[1.2rem] inline-flex items-center gap-[0.5rem]"
          >
            <LayoutGrid size={14} />
            <span className="hidden sm:inline">{layout === "speaker" ? "Grid" : "Speaker"}</span>
          </button>

          <button
            onClick={async () => {
              await navigator.clipboard.writeText(window.location.href);
              toast.success("Link da chamada copiado");
            }}
            className="px-[1rem] h-[3.2rem] rounded-lg bg-white/10 hover:bg-white/20 text-[1.2rem] inline-flex items-center gap-[0.5rem]"
          >
            <Copy size={14} /> <span className="hidden sm:inline">Copiar link</span>
          </button>

          <button
            onClick={() => openMobilePanel("participants")}
            className="lg:hidden w-[3.2rem] h-[3.2rem] rounded-lg bg-white/10 hover:bg-white/20 grid place-items-center"
            title="Pessoas"
          >
            <Users size={15} />
          </button>

          <button
            onClick={() => openMobilePanel("chat")}
            className="lg:hidden w-[3.2rem] h-[3.2rem] rounded-lg bg-white/10 hover:bg-white/20 grid place-items-center"
            title="Chat"
          >
            <MessageSquare size={15} />
          </button>

          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="hidden lg:grid w-[3.2rem] h-[3.2rem] rounded-lg bg-white/10 hover:bg-white/20 place-items-center"
            title={isSidebarOpen ? "Esconder painel" : "Mostrar painel"}
          >
            {isSidebarOpen ? <PanelRightClose size={16} /> : <PanelRight size={16} />}
          </button>
        </div>
      </header>

      <div
        className={`flex-1 min-h-0 grid gap-[0.8rem] p-[0.8rem] md:p-[1.2rem] ${
          isSidebarOpen
            ? "lg:grid-cols-[minmax(0,1fr)_minmax(30rem,36rem)]"
            : "lg:grid-cols-1"
        }`}
      >
        <section className="min-h-0 rounded-2xl border border-white/10 bg-slate-950 overflow-hidden">
          {shouldRenderLocalFallback ? (
            <div className="h-full p-[0.8rem] md:p-[1.2rem]">
              <ParticipantView participant={localParticipant} />
            </div>
          ) : layout === "speaker" ? (
            <SpeakerLayout participantsBarPosition="bottom" />
          ) : (
            <PaginatedGridLayout />
          )}
        </section>

        {isSidebarOpen && (
          <aside className="hidden lg:flex min-h-0 flex-col rounded-2xl border border-white/10 bg-slate-900/70 overflow-hidden">
            <div className="grid grid-cols-2 p-[0.5rem] gap-[0.5rem] border-b border-white/10 bg-slate-900/90">
              <button
                onClick={() => setSidebar("participants")}
                className={`rounded-lg text-[1.2rem] h-[3.4rem] inline-flex items-center justify-center gap-[0.4rem] ${
                  sidebar === "participants"
                    ? "bg-emerald-500 text-white"
                    : "bg-white/5 text-zinc-200"
                }`}
              >
                <Users size={14} /> Pessoas
              </button>
              <button
                onClick={() => setSidebar("chat")}
                className={`rounded-lg text-[1.2rem] h-[3.4rem] inline-flex items-center justify-center gap-[0.4rem] ${
                  sidebar === "chat" ? "bg-emerald-500 text-white" : "bg-white/5 text-zinc-200"
                }`}
              >
                <MessageSquare size={14} /> Chat
              </button>
            </div>

            <div className="min-h-0 flex-1 call-sidebar-content">
              {sidebar === "participants" && <CallParticipantsList />}
              {sidebar === "chat" && <InCallChatPanel currentUser={currentUser} />}
            </div>
          </aside>
        )}
      </div>

      <footer className="call-dock-wrap">
        <div className="custom-call-controls call-dock">
          <button
            onClick={toggleMic}
            disabled={isMicToggling}
            className={`call-control-btn ${isMicMuted ? "is-off" : "is-on"}`}
            data-label={isMicMuted ? "Ativar microfone" : "Desativar microfone"}
            aria-label={isMicMuted ? "Ativar microfone" : "Desativar microfone"}
            title={isMicMuted ? "Ativar microfone" : "Desativar microfone"}
          >
            {isMicToggling ? <Loader2 size={16} className="spin" /> : isMicMuted ? <MicOff size={16} /> : <Mic size={16} />}
          </button>

          <button
            onClick={toggleCamera}
            disabled={isCameraToggling}
            className={`call-control-btn ${isCameraMuted ? "is-off" : "is-on"}`}
            data-label={isCameraMuted ? "Ativar câmera" : "Desativar câmera"}
            aria-label={isCameraMuted ? "Ativar câmera" : "Desativar câmera"}
            title={isCameraMuted ? "Ativar câmera" : "Desativar câmera"}
          >
            {isCameraToggling ? (
              <Loader2 size={16} className="spin" />
            ) : isCameraMuted ? (
              <CameraOff size={16} />
            ) : (
              <Camera size={16} />
            )}
          </button>

          <button
            onClick={toggleScreenShare}
            disabled={!canToggleScreenShare}
            className={`call-control-btn ${isScreenShareMuted ? "is-off" : "is-active"}`}
            data-label={
              isScreenShareMuted ? "Iniciar compartilhamento" : "Parar compartilhamento"
            }
            aria-label={
              isScreenShareMuted ? "Iniciar compartilhamento" : "Parar compartilhamento"
            }
            title={isScreenShareMuted ? "Iniciar compartilhamento" : "Parar compartilhamento"}
          >
            {isScreenShareToggling ? (
              <Loader2 size={16} className="spin" />
            ) : isScreenShareMuted ? (
              <ScreenShare size={16} />
            ) : (
              <ScreenShareOff size={16} />
            )}
          </button>

          <button
            onClick={() => setLayout((prev) => (prev === "speaker" ? "grid" : "speaker"))}
            className="call-control-btn is-neutral"
            data-label={layout === "speaker" ? "Grid" : "Speaker"}
            aria-label={layout === "speaker" ? "Grid" : "Speaker"}
            title={layout === "speaker" ? "Alternar para grid" : "Alternar para speaker"}
          >
            <LayoutGrid size={16} />
          </button>

          <button
            onClick={() => (window.innerWidth < 1024 ? openMobilePanel("participants") : setIsSidebarOpen((prev) => !prev))}
            className="call-control-btn is-neutral"
            data-label="Pessoas"
            aria-label="Pessoas"
            title="Alternar painel lateral"
          >
            <Users size={16} />
          </button>

          <button
            onClick={leaveCall}
            className="call-control-btn is-danger"
            data-label="Sair"
            aria-label="Sair"
            title="Sair da chamada"
          >
            <PhoneOff size={16} />
          </button>
        </div>
      </footer>

      {isMobilePanelOpen && (
        <div className="lg:hidden absolute inset-0 z-30 bg-slate-950/75 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-[min(94vw,40rem)] bg-slate-900 border-l border-white/10 flex flex-col">
            <div className="p-[0.8rem] border-b border-white/10 flex items-center gap-[0.6rem]">
              <div className="grid grid-cols-2 p-[0.3rem] gap-[0.4rem] bg-black/20 rounded-xl flex-1">
                <button
                  onClick={() => setSidebar("participants")}
                  className={`rounded-lg text-[1.2rem] h-[3.2rem] inline-flex items-center justify-center gap-[0.4rem] ${
                    sidebar === "participants"
                      ? "bg-emerald-500 text-white"
                      : "bg-transparent text-zinc-200"
                  }`}
                >
                  <Users size={14} /> Pessoas
                </button>
                <button
                  onClick={() => setSidebar("chat")}
                  className={`rounded-lg text-[1.2rem] h-[3.2rem] inline-flex items-center justify-center gap-[0.4rem] ${
                    sidebar === "chat"
                      ? "bg-emerald-500 text-white"
                      : "bg-transparent text-zinc-200"
                  }`}
                >
                  <MessageSquare size={14} /> Chat
                </button>
              </div>
              <button
                onClick={() => setIsMobilePanelOpen(false)}
                className="w-[3.2rem] h-[3.2rem] rounded-lg bg-white/10 hover:bg-white/20 grid place-items-center"
                title="Fechar painel"
              >
                <X size={16} />
              </button>
            </div>

            <div className="min-h-0 flex-1 call-sidebar-content">
              {sidebar === "participants" && <CallParticipantsList />}
              {sidebar === "chat" && <InCallChatPanel currentUser={currentUser} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
