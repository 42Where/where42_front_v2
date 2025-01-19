import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryOption } from '@/hooks/useMyInfo';
import memberApi from '@/api/memberApi';

// no onSuccess handler.

export function useUpdateComment(comment: string) {
  const queryClient = useQueryClient();
  const myInfo = queryClient.getQueryData(queryOption.queryKey);
  const { queryKey } = queryOption;

  return useMutation({
    mutationFn: () => memberApi.updateComment({ comment }),
    onMutate: () => {
      if (!myInfo) return;
      queryClient.setQueryData(queryKey, { ...myInfo, comment });
    },
    onError: () => {
      if (!myInfo) return;
      queryClient.setQueryData(queryKey, { ...myInfo });
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const myInfo = queryClient.getQueryData(queryOption.queryKey);
  const { queryKey } = queryOption;

  return useMutation({
    mutationFn: memberApi.deleteComment,
    onMutate: () => {
      if (!myInfo) return;
      queryClient.setQueryData(queryKey, { ...myInfo, comment: '' });
    },
    onError: () => {
      if (!myInfo) return;
      queryClient.setQueryData(queryKey, { ...myInfo });
    },
  });
}
