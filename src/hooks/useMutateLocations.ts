import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryOption } from '@/hooks/useMyInfo';
import locationApi from '@/api/locationApi';

// We don't need queryInvalidation since we do know the updated information
export function useUpdateLocation() {
  const queryClient = useQueryClient();
  const { queryKey } = queryOption;

  return useMutation({
    mutationFn: (newLocation: string) => locationApi.setCustomLocation({ location: newLocation }),
    onMutate: async (newLocation) => {
      await queryClient.cancelQueries({ queryKey });
      const prevData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return undefined;
        return {
          ...oldData,
          location: newLocation,
        };
      });
      return { prevData };
    },
    onError: (error, newLocation, context) => {
      if (context?.prevData) queryClient.setQueryData(queryKey, context.prevData);
    },
  });
}

export function useDeleteLocation() {
  const queryClient = useQueryClient();
  const { queryKey } = queryOption;

  return useMutation({
    mutationFn: locationApi.deleteCustomLocation,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const prevData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return undefined;
        return {
          ...oldData,
          location: undefined,
        };
      });
      return { prevData };
    },
    onError: (error, _, context) => {
      if (context?.prevData) queryClient.setQueryData(queryKey, context.prevData);
    },
  });
}
