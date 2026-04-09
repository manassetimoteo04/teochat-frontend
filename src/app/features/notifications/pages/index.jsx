import { useEffect, useState } from "react";
import { Bell, Inbox, RefreshCcw } from "lucide-react";
import PageHeader from "../../../shared/ui/page-heading";
import Pagination from "../../../shared/ui/pagination";
import Spinner from "../../../shared/ui/Spinner";
import NotificationItem from "../components/notification-item";
import { useNotifications } from "../hooks/use-notifications";

function NotificationsPage() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const {
    notifications,
    error,
    isPending,
    isFetching,
    refetch,
    meta,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
    openNotification,
    isMarkingAllAsRead,
    isDeletingAll,
  } = useNotifications({
    page,
    limit: 12,
    status: filter === "unread" ? "unread" : undefined,
  });

  useEffect(() => {
    setPage(1);
  }, [filter]);

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Centro de notificações"
        description="Acompanhe convites, alterações em equipas e atualizações de eventos num só lugar."
      >
        <div className="flex items-center gap-[0.75rem]">
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-full border border-gray-200 bg-white p-[0.85rem] text-secondary-text-color transition hover:bg-main-bg-color hover:text-main-text-color"
            title="Atualizar"
          >
            <RefreshCcw size={18} className={isFetching ? "animate-spin" : ""} />
          </button>
        </div>
      </PageHeader>

      <div className="px-[2rem] pb-[2rem]">
        <section className="rounded-3xl border border-gray-100 bg-white p-[2rem]">
          <div className="flex flex-col gap-[1rem] lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[1.8rem] font-semibold text-main-text-color">
                {meta.unreadCount > 0
                  ? `${meta.unreadCount} notificações por ler`
                  : "Sem pendências no momento"}
              </p>
              <span className="text-[1.3rem] text-secondary-text-color">
                {meta.total > 0
                  ? `${meta.total} notificações no resultado atual`
                  : "As novas notificações aparecem aqui em tempo real."}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-[0.75rem]">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`rounded-full border px-[1.1rem] py-[0.55rem] text-[1.25rem] transition ${
                  filter === "all"
                    ? "border-gray-200 bg-main-text-color text-white"
                    : "border-gray-200 bg-white text-secondary-text-color hover:text-main-text-color"
                }`}
              >
                Todas
              </button>
              <button
                type="button"
                onClick={() => setFilter("unread")}
                className={`rounded-full border px-[1.1rem] py-[0.55rem] text-[1.25rem] transition ${
                  filter === "unread"
                    ? "border-gray-200 bg-main-text-color text-white"
                    : "border-gray-200 bg-white text-secondary-text-color hover:text-main-text-color"
                }`}
              >
                Não lidas
              </button>
              <button
                type="button"
                onClick={() => markAllAsRead()}
                disabled={isMarkingAllAsRead || meta.unreadCount < 1}
                className="rounded-full border border-gray-200 px-[1.1rem] py-[0.55rem] text-[1.25rem] text-secondary-text-color transition hover:bg-main-bg-color hover:text-main-text-color disabled:cursor-not-allowed disabled:opacity-50"
              >
                Marcar tudo como lido
              </button>
              <button
                type="button"
                onClick={() => deleteAllNotifications()}
                disabled={isDeletingAll || meta.total < 1}
                className="rounded-full border border-gray-200 px-[1.1rem] py-[0.55rem] text-[1.25rem] text-secondary-text-color transition hover:bg-main-bg-color hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Eliminar tudo
              </button>
            </div>
          </div>
        </section>

        <section className="mt-[2rem] rounded-3xl border border-gray-100 bg-white p-[1.5rem]">
          {isPending && (
            <div className="flex min-h-[24rem] items-center justify-center">
              <Spinner />
            </div>
          )}

          {!isPending && error && (
            <div className="flex min-h-[24rem] flex-col items-center justify-center gap-[1rem] text-center text-secondary-text-color">
              <Bell size={28} />
              <p className="text-[1.4rem] text-main-text-color">
                Não foi possível carregar as notificações.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="rounded-full bg-main-text-color px-[1.25rem] py-[0.75rem] text-[1.25rem] text-white"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {!isPending && !error && notifications.length < 1 && (
            <div className="flex min-h-[24rem] flex-col items-center justify-center gap-[1rem] text-center text-secondary-text-color">
              <Inbox size={28} />
              <p className="text-[1.5rem] text-main-text-color">
                {filter === "unread"
                  ? "Não existem notificações por ler."
                  : "Ainda não recebeu notificações."}
              </p>
              <span className="max-w-[40rem] text-[1.25rem]">
                Quando alguém o adicionar a uma equipa, promover a liderança ou
                atualizar um evento, a informação aparece aqui.
              </span>
            </div>
          )}

          {!isPending && !error && notifications.length > 0 && (
            <div className="flex flex-col gap-[1rem]">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onOpen={openNotification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                />
              ))}
            </div>
          )}

          {!isPending && !error && meta.pages > 1 && (
            <Pagination
              className="mt-[1rem]"
              page={page}
              totalPages={meta.pages}
              onPageChange={setPage}
              isLoading={isFetching}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default NotificationsPage;
