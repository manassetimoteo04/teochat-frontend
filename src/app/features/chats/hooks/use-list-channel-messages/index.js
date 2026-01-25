import { useInfiniteQuery } from "@tanstack/react-query";
import { listChannelMessages } from "../../services";

export function useChannelMessages(channelId, options = {}) {
  const { limit = 10, type, enabled = true } = options;

  return useInfiniteQuery({
    queryKey: ["channel-messages", channelId, type],

    queryFn: ({ pageParam = null }) =>
      listChannelMessages(channelId, {
        limit,
        cursor: pageParam,
        type,
      }),

    getNextPageParam: (lastPage) => {
      return lastPage?.nextCursor ?? undefined;
    },

    enabled: Boolean(channelId) && enabled,

    staleTime: 1000 * 30,
  });
}
