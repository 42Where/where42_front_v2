import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryOption } from '@/hooks/useMyInfo';
import memberApi from '@/api/memberApi';

export function useUpdateComment(comment: string) {
  const queryClient = useQueryClient();
  const myInfo = queryClient.getQueryData(queryOption.queryKey);
  const { queryKey } = queryOption;

  useMutation({
    mutationFn: () => memberApi.updateComment({ comment }),
    onMutate: () => {
      if (!myInfo) return;
      queryClient.setQueryData(queryKey, { ...myInfo, comment });
    },
    onError: () => {
      if (!myInfo) return;
      queryClient.setQueryData(queryKey, { ...myInfo });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const myInfo = queryClient.getQueryData(queryOption.queryKey);
  const { queryKey } = queryOption;

  useMutation({
    mutationFn: memberApi.deleteComment,
    onMutate: () => {
      if (!myInfo) return;
      queryClient.setQueryData(queryKey, { ...myInfo, comment: '' });
    },
    onError: () => {
      if (!myInfo) return;
      queryClient.setQueryData(queryKey, { ...myInfo });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
}
