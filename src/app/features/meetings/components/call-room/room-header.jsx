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
    <span className="inline-flex max-w-full items-center gap-[0.45rem] rounded-full border border-white/10 bg-white/5 px-[0.8rem] py-[0.3rem] text-[1.1rem] text-zinc-200">
      {Icon && <Icon size={14} />}
      <span className="truncate">{children}</span>
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
    <header className="shrink-0 border-b border-white/10 bg-slate-950/95 px-[0.8rem] py-[0.8rem] backdrop-blur-sm md:px-[1.6rem] md:py-[1rem]">
      <div className="flex items-start justify-between gap-[0.8rem]">
        <div className="min-w-0 flex items-start gap-[0.9rem]">
          <button
            onClick={onBack}
            className="grid h-[3.2rem] w-[3.2rem] shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 md:h-[3.4rem] md:w-[3.4rem]"
            title="Voltar"
          >
            <ArrowLeft size={17} />
          </button>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-[0.6rem]">
              <p className="truncate text-[1.35rem] font-semibold text-white md:text-[1.6rem]">
                {meeting?.title || "Sala da reunião"}
              </p>
              <HeaderPill icon={Video}>Ao vivo</HeaderPill>
            </div>

            <div className="mt-[0.45rem] flex flex-wrap items-center gap-[0.45rem] text-[1.2rem] text-zinc-300">
              <HeaderPill icon={Users}>{participantCount || 1} participantes</HeaderPill>
              <HeaderPill icon={Clock3}>{duration}</HeaderPill>
              {meeting?.date && (
                <div className="hidden sm:block">
                  <HeaderPill icon={CalendarDays}>
                    {new Intl.DateTimeFormat("pt-PT", {
                      day: "numeric",
                      month: "short",
                    }).format(new Date(meeting.date))}
                  </HeaderPill>
                </div>
              )}
              {startAt && endAt && (
                <div className="hidden md:block">
                  <HeaderPill icon={Clock3}>
                    {formatHour(startAt)} - {formatHour(endAt)}
                  </HeaderPill>
                </div>
              )}
              {screenShareName && (
                <div className="max-w-[18rem] sm:max-w-[24rem]">
                  <HeaderPill>
                    <span className="sm:hidden">A apresentar</span>
                    <span className="hidden sm:inline">A partilhar: {screenShareName}</span>
                  </HeaderPill>
                </div>
              )}
              {networkStatus && (
                <div className="hidden sm:block">
                  <HeaderPill>{networkStatus}</HeaderPill>
                </div>
              )}
            </div>

            {meeting?.teamId?.name && (
              <div className="mt-[0.45rem] hidden md:flex">
                <HeaderPill>{meeting.teamId.name}</HeaderPill>
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-[0.4rem]">
          <button
            onClick={onToggleLayout}
            className="grid h-[3.1rem] w-[3.1rem] place-items-center rounded-full border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10 md:hidden"
            title={layout === "speaker" ? "Mudar para grade" : "Mudar para destaque"}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={onToggleLayout}
            className="hidden h-[3.4rem] items-center gap-[0.45rem] rounded-full border border-white/10 bg-white/5 px-[1rem] text-[1.2rem] text-zinc-100 hover:bg-white/10 md:inline-flex"
          >
            <LayoutGrid size={15} />
            {layout === "speaker" ? "Grade" : "Destaque"}
          </button>
          <button
            onClick={onCopyLink}
            className="hidden h-[3.4rem] items-center gap-[0.45rem] rounded-full border border-white/10 bg-white/5 px-[1rem] text-[1.2rem] text-zinc-100 hover:bg-white/10 lg:inline-flex"
          >
            <Copy size={15} />
            Copiar link
          </button>
          <button
            onClick={onOpenParticipants}
            className="grid h-[3.1rem] w-[3.1rem] place-items-center rounded-full border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10 lg:hidden"
            title="Participantes"
          >
            <Users size={15} />
          </button>
          <button
            onClick={onOpenChat}
            className="grid h-[3.1rem] w-[3.1rem] place-items-center rounded-full border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10 lg:hidden"
            title="Conversa"
          >
            <MessageSquare size={15} />
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
