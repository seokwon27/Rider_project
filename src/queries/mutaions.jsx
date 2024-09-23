import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFn, toggleFn, updateThumb } from "../api/feedApi";
import { queryKeys } from "./query.keys";

export const useDeleteMyFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFn,
    onSuccess: () => queryClient.invalidateQueries(queryKeys.boardController.myFeeds()),
    onError: (error) => {
      alert(`현재 삭제할 수 없습니다.\n잠시 후 다시 시도해주세요!`);
      console.log("error :>> ", error);
    }
  });
};

export const useToggleMyFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleFn,
    onSuccess: () => queryClient.invalidateQueries(queryKeys.boardController.myFeeds()),
    onError: (error) => {
      alert(`현재 변경할 수 없습니다.\n잠시 후 다시 시도해주세요!`);
      console.log("error :>> ", error);
    }
  });
};

export const useThumbMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateThumb,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.boardController.feeds());
    }
  });
};
