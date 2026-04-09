import clsx from "clsx";
import PropTypes from "prop-types";
import { CheckCheck, Trash2 } from "lucide-react";
import {
  createAvatarFallback,
  getNotificationAccentMeta,
  formatNotificationRelativeTime,
  getNotificationActor,
  getNotificationCategoryMeta,
  getNotificationPrimaryLabel,
  getNotificationSecondaryLabel,
} from "../utils/notification-utils";

function NotificationItem({
  notification,
  onOpen,
  onMarkAsRead,
  onDelete,
  disabled = false,
  compact = false,
}) {
  const actor = getNotificationActor(notification);
  const categoryMeta = getNotificationCategoryMeta(notification);
  const { Icon, iconClassName } = getNotificationAccentMeta(notification);
  const secondaryLabel = getNotificationSecondaryLabel(notification);

  return (
    <article
      className={clsx(
        "group rounded-3xl border p-[1.4rem] transition",
        notification.status === "unread"
          ? "border-gray-200 bg-main-bg-color"
          : "border-gray-100 bg-white",
        compact ? "min-h-[11rem]" : "min-h-[12rem]",
      )}
    >
      <div className="flex items-start gap-[1rem]">
        <button
          type="button"
          onClick={() => onOpen?.(notification)}
          disabled={disabled}
          className="flex min-w-0 flex-1 items-start gap-[1rem] text-left disabled:cursor-not-allowed"
        >
          <div className="relative mt-[0.1rem]">
            {actor?.avatar ? (
              <img
                src={actor.avatar}
                alt={actor.name}
                className="h-[4.4rem] w-[4.4rem] rounded-full object-cover"
              />
            ) : (
              <div
                className={clsx(
                  "flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-full text-[1.4rem] font-semibold",
                  notification.category === "tasks"
                    ? "bg-[#fef3c7] text-[#92400e]"
                    : notification.category === "events"
                      ? "bg-[#dbeafe] text-[#1d4ed8]"
                      : "bg-slate-200 text-slate-700",
                )}
              >
                {actor?.name ? (
                  createAvatarFallback(actor.name)
                ) : (
                  <Icon size={18} className={iconClassName} />
                )}
              </div>
            )}
            {notification.status === "unread" && (
              <span className="absolute right-0 top-0 h-[1rem] w-[1rem] rounded-full bg-main-color ring-2 ring-white" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-[0.75rem]">
              <span
                className={clsx(
                  "inline-flex items-center gap-[0.35rem] rounded-full border px-[0.8rem] py-[0.2rem] text-[1.1rem] font-medium",
                  categoryMeta.badgeClassName,
                )}
              >
                <Icon size={14} className={categoryMeta.iconClassName} />
                {categoryMeta.label}
              </span>
              <span className="text-[1.15rem] text-secondary-text-color">
                {formatNotificationRelativeTime(notification.createdAt)}
              </span>
            </div>

            <div className="mt-[0.7rem]">
              <p className="truncate text-[1.45rem] font-semibold text-main-text-color">
                {notification.title || getNotificationPrimaryLabel(notification)}
              </p>
              {secondaryLabel && (
                <p className="mt-[0.25rem] text-[1.15rem] font-medium text-secondary-text-color">
                  {secondaryLabel}
                </p>
              )}
              <p className="mt-[0.35rem] line-clamp-2 text-[1.3rem] text-secondary-text-color">
                {notification.message}
              </p>
            </div>

            {(actor?.name || notification.action?.label) && (
              <div className="mt-[0.85rem] flex flex-wrap items-center gap-[0.75rem] text-[1.15rem] text-secondary-text-color">
                {actor?.name && <span>{actor.name}</span>}
                {notification.action?.label && (
                  <span className="rounded-full border border-gray-200 bg-white px-[0.8rem] py-[0.2rem] text-[1.1rem] text-main-text-color">
                    {notification.action.label}
                  </span>
                )}
              </div>
            )}
          </div>
        </button>

        <div className="flex shrink-0 items-center gap-[0.25rem] opacity-100 md:opacity-0 md:group-hover:opacity-100">
          {notification.status === "unread" && (
            <button
              type="button"
              title="Marcar como lida"
              onClick={(event) => {
                event.stopPropagation();
                onMarkAsRead?.(notification.id);
              }}
              disabled={disabled}
              className="rounded-full p-[0.55rem] text-secondary-text-color transition hover:bg-gray-100 hover:text-main-text-color disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CheckCheck size={17} />
            </button>
          )}
          <button
            type="button"
            title="Eliminar notificação"
            onClick={(event) => {
              event.stopPropagation();
              onDelete?.(notification.id);
            }}
            disabled={disabled}
            className="rounded-full p-[0.55rem] text-secondary-text-color transition hover:bg-gray-100 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

NotificationItem.propTypes = {
  compact: PropTypes.bool,
  disabled: PropTypes.bool,
  notification: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onMarkAsRead: PropTypes.func,
  onOpen: PropTypes.func,
};

export default NotificationItem;
