import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Copy,
  LayoutGrid,
  MessageSquare,
  PanelRight,
  PanelRightClose,
  Users,
  Video,
} from "lucide-react";
import { formatHour } from "../../../../shared/utils/helpers";

function HeaderPill({ icon, children }) {
  const Icon = icon;

  return (
    <span className="inline-flex items-center gap-[0.45rem] rounded-full border border-white/10 bg-white/5 px-[0.9rem] py-[0.35rem] text-[1.15rem] text-zinc-200">
      {Icon && <Icon size={14} />}
      {children}
    </span>
  );
}

function RoomHeader({
  onBack,
  meeting,
  participantCount,
  duration,
  layout,
  onToggleLayout,
  onCopyLink,
  onOpenParticipants,
  onOpenChat,
  onToggleSidebar,
  isSidebarOpen,
  screenShareName,
  networkStatus,
}) {
  const startAt = meeting?.startTime || meeting?.date;
  const endAt = meeting?.endTime || meeting?.startTime || meeting?.date;

  return (
    <header className="shrink-0 border-b border-white/10 bg-slate-950/95 px-[1rem] py-[1rem] backdrop-blur-sm md:px-[1.6rem]">
      <div className="flex items-start justify-between gap-[1rem]">
        <div className="min-w-0 flex items-start gap-[0.9rem]">
          <button
            onClick={onBack}
            className="grid h-[3.4rem] w-[3.4rem] shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
            title="Voltar"
          >
            <ArrowLeft size={17} />
          </button>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-[0.6rem]">
              <p className="truncate text-[1.6rem] font-semibold text-white">
                {meeting?.title || "Sala da reunião"}
              </p>
              <HeaderPill icon={Video}>Ao vivo</HeaderPill>
            </div>

            <div className="mt-[0.5rem] flex flex-wrap items-center gap-[0.55rem] text-[1.2rem] text-zinc-300">
              <HeaderPill icon={Users}>{participantCount || 1} participantes</HeaderPill>
              <HeaderPill icon={Clock3}>{duration}</HeaderPill>
              {meeting?.date && (
                <HeaderPill icon={CalendarDays}>
                  {new Intl.DateTimeFormat("pt-PT", {
                    day: "numeric",
                    month: "short",
                  }).format(new Date(meeting.date))}
                </HeaderPill>
              )}
              {startAt && endAt && (
                <HeaderPill icon={Clock3}>
                  {formatHour(startAt)} - {formatHour(endAt)}
                </HeaderPill>
              )}
              {meeting?.teamId?.name && <HeaderPill>{meeting.teamId.name}</HeaderPill>}
              {screenShareName && <HeaderPill>A partilhar: {screenShareName}</HeaderPill>}
              {networkStatus && <HeaderPill>{networkStatus}</HeaderPill>}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-[0.5rem]">
          <button
            onClick={onToggleLayout}
            className="hidden h-[3.4rem] items-center gap-[0.45rem] rounded-full border border-white/10 bg-white/5 px-[1rem] text-[1.2rem] text-zinc-100 hover:bg-white/10 md:inline-flex"
          >
            <LayoutGrid size={15} />
            {layout === "speaker" ? "Grade" : "Destaque"}
          </button>
          <button
            onClick={onCopyLink}
            className="hidden h-[3.4rem] items-center gap-[0.45rem] rounded-full border border-white/10 bg-white/5 px-[1rem] text-[1.2rem] text-zinc-100 hover:bg-white/10 md:inline-flex"
          >
            <Copy size={15} />
            Copiar link
          </button>
          <button
            onClick={onOpenParticipants}
            className="grid h-[3.4rem] w-[3.4rem] place-items-center rounded-full border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10 lg:hidden"
            title="Participantes"
          >
            <Users size={16} />
          </button>
          <button
            onClick={onOpenChat}
            className="grid h-[3.4rem] w-[3.4rem] place-items-center rounded-full border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10 lg:hidden"
            title="Conversa"
          >
            <MessageSquare size={16} />
          </button>
          <button
            onClick={onToggleSidebar}
            className="hidden h-[3.4rem] w-[3.4rem] place-items-center rounded-full border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10 lg:grid"
            title={isSidebarOpen ? "Esconder painel" : "Mostrar painel"}
          >
            {isSidebarOpen ? <PanelRightClose size={16} /> : <PanelRight size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default RoomHeader;
