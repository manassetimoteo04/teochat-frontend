import { MessageSquare, Users, X } from "lucide-react";
import { InCallChatPanel } from "./in-call-chat-panel";
import { ParticipantsPanel } from "./participants-panel";

function SidebarTab({ active, icon, children, onClick }) {
  const Icon = icon;

  return (
    <button
      onClick={onClick}
      className={`inline-flex h-[3.4rem] items-center justify-center gap-[0.45rem] rounded-full px-[1rem] text-[1.2rem] ${
        active
          ? "bg-main-color text-black"
          : "border border-white/10 bg-white/5 text-zinc-200"
      }`}
    >
      <Icon size={14} />
      {children}
    </button>
  );
}

export function RoomSidebar({ sidebar, setSidebar, currentUser }) {
  return (
    <aside className="hidden min-h-0 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 lg:flex">
      <div className="flex gap-[0.6rem] border-b border-white/10 bg-slate-900/90 p-[0.8rem]">
        <SidebarTab
          active={sidebar === "participants"}
          icon={Users}
          onClick={() => setSidebar("participants")}
        >
          Pessoas
        </SidebarTab>
        <SidebarTab
          active={sidebar === "chat"}
          icon={MessageSquare}
          onClick={() => setSidebar("chat")}
        >
          Conversa
        </SidebarTab>
      </div>
      <div className="call-sidebar-content min-h-0 flex-1">
        {sidebar === "participants" && <ParticipantsPanel currentUser={currentUser} />}
        {sidebar === "chat" && <InCallChatPanel currentUser={currentUser} />}
      </div>
    </aside>
  );
}

export function MobileRoomSidebar({
  sidebar,
  setSidebar,
  setIsMobilePanelOpen,
  currentUser,
}) {
  return (
    <div className="absolute inset-0 z-30 bg-slate-950/75 backdrop-blur-sm lg:hidden">
      <div className="absolute right-0 top-0 flex h-full w-[min(94vw,40rem)] flex-col border-l border-white/10 bg-slate-900">
        <div className="flex items-center gap-[0.6rem] border-b border-white/10 p-[0.8rem]">
          <div className="flex flex-1 gap-[0.5rem]">
            <SidebarTab
              active={sidebar === "participants"}
              icon={Users}
              onClick={() => setSidebar("participants")}
            >
              Pessoas
            </SidebarTab>
            <SidebarTab
              active={sidebar === "chat"}
              icon={MessageSquare}
              onClick={() => setSidebar("chat")}
            >
              Conversa
            </SidebarTab>
          </div>
          <button
            onClick={() => setIsMobilePanelOpen(false)}
            className="grid h-[3.2rem] w-[3.2rem] place-items-center rounded-full border border-white/10 bg-white/5 text-zinc-100"
            title="Fechar painel"
          >
            <X size={16} />
          </button>
        </div>
        <div className="call-sidebar-content min-h-0 flex-1">
          {sidebar === "participants" && <ParticipantsPanel currentUser={currentUser} />}
          {sidebar === "chat" && <InCallChatPanel currentUser={currentUser} />}
        </div>
      </div>
    </div>
  );
}
