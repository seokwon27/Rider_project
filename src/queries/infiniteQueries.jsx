import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeedsByPageNum } from "../api/feedApi";
import useUserStore from "../store/useUserStore";
import { queryKeys } from "./query.keys";

export const useMyFeedsInfiniteQuery = () => {
  const { user } = useUserStore();
  return useInfiniteQuery({
    queryKey: queryKeys.boardController.myFeeds(),
    queryFn: ({ pageParam = 1 }) => getFeedsByPageNum({ pageParam, userId: user.id }),

    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 5 ? pages.length + 1 : undefined;
    },
    select: (data) => data.pages.flat()
  });
};
