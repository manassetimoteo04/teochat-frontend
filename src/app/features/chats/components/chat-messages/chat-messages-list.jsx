import { MessageCard } from "./message-card";
import { formatDate } from "../../../../shared/utils/helpers";
import { Loader } from "lucide-react";

export function ChatMessagesList({
  data,
  currentUser,
  bottomRef,
  containerRef,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  prepareForFetchMore,
}) {
  function handleScroll(e) {
    const { scrollTop } = e.currentTarget;

    if (scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      prepareForFetchMore();
      fetchNextPage();
    }
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="relative p-[4rem_2rem] overflow-y-auto flex flex-col gap-[1rem] h-[calc(100dvh-11rem)]"
    >
      <div className="flex justify-center min-h-[3rem]">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <Loader className="w-4 h-4 animate-spin" />
            <span>A carregar mensagens anteriores…</span>
          </div>
        )}

        {!hasNextPage && (
          <span className="text-zinc-400 text-xs">Não há mais mensagens</span>
        )}
      </div>

      {Object.entries(data).map(([date, msgs]) => (
        <div key={date} className="flex flex-col gap-[2rem]">
          <div className="text-center relative my-4 w-full">
            <span className="h-[1px] w-full bg-gray-100 absolute top-1/2 left-0" />
            <span className="relative px-3 py-1 rounded-full border bg-white text-[1.2rem] text-zinc-500">
              {formatDate(new Date(date), false, false, false, true)}
            </span>
          </div>

          {msgs.map((msg) => (
            <MessageCard
              key={msg.id || msg.tempId}
              message={msg}
              currentUserId={currentUser}
            />
          ))}
        </div>
      ))}

      <div className="mt-[16rem] bg-red-500" />
      <div ref={bottomRef} />
    </div>
  );
}
