import { Bell } from "lucide-react";
import clsx from "clsx";
import NotificationsPanel from "./notifications-panel";
import { useNotificationsCenter } from "../providers/notifications-provider";
import { useUnreadNotificationsCount } from "../hooks/use-notifications";
import { useOutsideClick } from "../../../shared/hooks/use-outsideclick";

function NotificationBell() {
  const { isPanelOpen, togglePanel, closePanel } = useNotificationsCenter();
  const { data, isPending } = useUnreadNotificationsCount();
  const unreadCount = data?.unreadCount || 0;
  const ref = useOutsideClick(() => {
    if (isPanelOpen) {
      closePanel();
    }
  });

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={togglePanel}
        className={clsx(
          "relative rounded-full border border-transparent p-[0.75rem] text-secondary-text-color transition hover:border-gray-200 hover:bg-main-bg-color hover:text-main-text-color",
          isPanelOpen && "border-gray-200 bg-main-bg-color text-main-text-color",
        )}
        aria-label="Abrir notificações"
        aria-expanded={isPanelOpen}
      >
        <Bell size={20} />
        {!isPending && unreadCount > 0 && (
          <span className="absolute right-[0.15rem] top-[0.15rem] inline-flex min-h-[1.9rem] min-w-[1.9rem] items-center justify-center rounded-full bg-main-color px-[0.4rem] text-[1rem] font-semibold text-black">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isPanelOpen && <NotificationsPanel />}
    </div>
  );
}

export default NotificationBell;
