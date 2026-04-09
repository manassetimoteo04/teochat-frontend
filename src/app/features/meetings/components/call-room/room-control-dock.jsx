import {
  Camera,
  CameraOff,
  LayoutGrid,
  Loader2,
  MessageSquare,
  Mic,
  MicOff,
  PhoneOff,
  ScreenShare,
  ScreenShareOff,
  Users,
} from "lucide-react";

function RoomControlButton({
  label,
  title,
  onClick,
  disabled,
  variant,
  icon,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`call-control-btn ${variant}`}
      data-label={label}
      aria-label={title || label}
      title={title || label}
    >
      {icon}
    </button>
  );
}

function RoomControlDock({
  isMicMuted,
  isMicToggling,
  onToggleMic,
  isCameraMuted,
  isCameraToggling,
  onToggleCamera,
  isScreenShareMuted,
  isScreenShareToggling,
  canToggleScreenShare,
  onToggleScreenShare,
  layout,
  onToggleLayout,
  onOpenSidebar,
  onOpenChat,
  onLeave,
}) {
  return (
    <footer className="call-dock-wrap">
      <div className="custom-call-controls call-dock">
        <RoomControlButton
          onClick={onToggleMic}
          disabled={isMicToggling}
          variant={isMicMuted ? "is-off" : "is-on"}
          label={isMicMuted ? "Ativar microfone" : "Desativar microfone"}
          icon={
            isMicToggling ? (
              <Loader2 size={16} className="spin" />
            ) : isMicMuted ? (
              <MicOff size={16} />
            ) : (
              <Mic size={16} />
            )
          }
        />

        <RoomControlButton
          onClick={onToggleCamera}
          disabled={isCameraToggling}
          variant={isCameraMuted ? "is-off" : "is-on"}
          label={isCameraMuted ? "Ativar câmera" : "Desativar câmera"}
          icon={
            isCameraToggling ? (
              <Loader2 size={16} className="spin" />
            ) : isCameraMuted ? (
              <CameraOff size={16} />
            ) : (
              <Camera size={16} />
            )
          }
        />

        <RoomControlButton
          onClick={onToggleScreenShare}
          disabled={!canToggleScreenShare}
          variant={isScreenShareMuted ? "is-off" : "is-active"}
          label={isScreenShareMuted ? "Partilhar ecrã" : "Parar partilha"}
          icon={
            isScreenShareToggling ? (
              <Loader2 size={16} className="spin" />
            ) : isScreenShareMuted ? (
              <ScreenShare size={16} />
            ) : (
              <ScreenShareOff size={16} />
            )
          }
        />

        <RoomControlButton
          onClick={onToggleLayout}
          variant="is-neutral"
          label={layout === "speaker" ? "Mudar para grade" : "Mudar para destaque"}
          icon={<LayoutGrid size={16} />}
        />

        <RoomControlButton
          onClick={onOpenSidebar}
          variant="is-neutral"
          label="Participantes"
          icon={<Users size={16} />}
        />

        <RoomControlButton
          onClick={onOpenChat}
          variant="is-neutral"
          label="Conversa"
          icon={<MessageSquare size={16} />}
        />

        <RoomControlButton
          onClick={onLeave}
          variant="is-danger"
          label="Sair da chamada"
          icon={<PhoneOff size={16} />}
        />
      </div>
    </footer>
  );
}

export default RoomControlDock;
