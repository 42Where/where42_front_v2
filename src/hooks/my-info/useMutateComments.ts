import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userOption } from '@/hooks/my-info/useMyInfo';
import { memberApi } from '@/api';

// no onSuccess handler.

export function useUpdateComment() {
  const queryClient = useQueryClient();
  const { queryKey } = userOption;

  return useMutation({
    mutationFn: (comment: string) => memberApi.updateComment({ comment }),
    onMutate: async (comment) => {
      await queryClient.cancelQueries({ queryKey });
      const prevData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return undefined;
        return { ...oldData, comment };
      });
      return { prevData };
    },
    onError: (error, _, context) => {
      if (context?.prevData) queryClient.setQueryData(queryKey, context.prevData);
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const { queryKey } = userOption;

  return useMutation({
    mutationFn: memberApi.deleteComment,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const prevData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return undefined;
        return { ...oldData, comment: undefined };
      });
      return { prevData };
    },
    onError: (error, _, context) => {
      if (context?.prevData) queryClient.setQueryData(queryKey, context.prevData);
    },
  });
}
