import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import clsx from "clsx";
import { Bell, Inbox, RefreshCcw } from "lucide-react";
import { useNotifications } from "../hooks/use-notifications";
import { useNotificationsCenter } from "../providers/notifications-provider";
import NotificationItem from "./notification-item";

function FilterButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-full border px-[1rem] py-[0.45rem] text-[1.2rem] transition",
        active
          ? "border-gray-200 bg-main-text-color text-white"
          : "border-gray-200 bg-white text-secondary-text-color hover:text-main-text-color",
      )}
    >
      {children}
    </button>
  );
}

function NotificationsPanel() {
  const [filter, setFilter] = useState("all");
  const { companyId } = useParams();
  const { closePanel } = useNotificationsCenter();
  const {
    notifications,
    unreadCount,
    error,
    isPending,
    isFetching,
    refetch,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
    openNotification,
    isMarkingAllAsRead,
    isDeletingAll,
  } = useNotifications({
    page: 1,
    limit: 8,
    status: filter === "unread" ? "unread" : undefined,
  });

  return (
    <div className="absolute right-0 top-[calc(100%+1rem)] z-30 w-[min(92vw,38rem)] overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.10)]">
      <div className="border-b border-gray-100 p-[1.5rem_2rem]">
        <div className="flex items-start justify-between gap-[1rem]">
          <div>
            <p className="text-[1.6rem] font-semibold text-main-text-color">
              Notificações
            </p>
            <span className="text-[1.2rem] text-secondary-text-color">
              {unreadCount > 0
                ? `${unreadCount} por ler`
                : "Tudo em dia por aqui."}
            </span>
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-full border border-gray-200 p-[0.55rem] text-secondary-text-color transition hover:bg-main-bg-color hover:text-main-text-color"
            title="Atualizar notificações"
          >
            <RefreshCcw size={16} className={clsx(isFetching && "animate-spin")} />
          </button>
        </div>

        <div className="mt-[1.25rem] flex items-center justify-between gap-[1rem]">
          <div className="flex gap-[0.5rem]">
            <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
              Todas
            </FilterButton>
            <FilterButton
              active={filter === "unread"}
              onClick={() => setFilter("unread")}
            >
              Não lidas
            </FilterButton>
          </div>

          <div className="flex gap-[0.5rem] text-[1.15rem]">
            <button
              type="button"
              onClick={() => markAllAsRead()}
              disabled={isMarkingAllAsRead || unreadCount < 1}
              className="rounded-full border border-gray-200 px-[0.9rem] py-[0.4rem] text-secondary-text-color transition hover:bg-main-bg-color hover:text-main-text-color disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isMarkingAllAsRead ? "A marcar..." : "Ler tudo"}
            </button>
            <button
              type="button"
              onClick={() => deleteAllNotifications()}
              disabled={isDeletingAll || notifications.length < 1}
              className="rounded-full border border-gray-200 px-[0.9rem] py-[0.4rem] text-secondary-text-color transition hover:bg-main-bg-color hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDeletingAll ? "A limpar..." : "Limpar"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-h-[48rem] overflow-y-auto p-[1.2rem_1.5rem]">
        {isPending && (
          <div className="flex min-h-[18rem] flex-col items-center justify-center gap-[1rem] text-secondary-text-color">
            <RefreshCcw size={18} className="animate-spin" />
            <span className="text-[1.25rem]">A carregar notificações...</span>
          </div>
        )}

        {!isPending && error && (
          <div className="flex min-h-[18rem] flex-col items-center justify-center gap-[1rem] text-center text-secondary-text-color">
            <Bell size={24} />
            <p className="max-w-[24rem] text-[1.25rem]">
              Não foi possível carregar as notificações agora.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-full bg-main-text-color px-[1.2rem] py-[0.55rem] text-[1.2rem] text-white"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!isPending && !error && notifications.length < 1 && (
          <div className="flex min-h-[18rem] flex-col items-center justify-center gap-[1rem] text-center text-secondary-text-color">
            <Inbox size={28} />
            <p className="text-[1.35rem] text-main-text-color">
              {filter === "unread"
                ? "Nenhuma notificação por ler."
                : "Ainda não existem notificações."}
            </p>
            <span className="max-w-[24rem] text-[1.2rem]">
              Novos convites, mudanças em equipas e eventos vão aparecer aqui em
              tempo real.
            </span>
          </div>
        )}

        {!isPending && !error && notifications.length > 0 && (
          <div className="flex flex-col gap-[0.9rem]">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                compact
                notification={notification}
                onOpen={(item) =>
                  openNotification(item, {
                    onBeforeNavigate: closePanel,
                  })
                }
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 p-[1.2rem_1.5rem]">
        <Link
          to={`/${companyId}/notifications`}
          onClick={() => closePanel()}
          className="flex items-center justify-center rounded-full border border-gray-200 bg-white px-[1.2rem] py-[0.95rem] text-[1.25rem] font-medium text-main-text-color transition hover:bg-main-bg-color"
        >
          Ver todas as notificações
        </Link>
      </div>
    </div>
  );
}

export default NotificationsPanel;
