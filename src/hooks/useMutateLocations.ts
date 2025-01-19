import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryOption } from '@/hooks/useMyInfo';
import locationApi from '@/api/locationApi';

export function useUpdateLocation(location: string) {
  const queryClient = useQueryClient();
  const myInfo = queryClient.getQueryData(queryOption.queryKey);
  const { queryKey } = queryOption;

  useMutation({
    mutationFn: () => locationApi.setCustomLocation({ location }),
    onMutate: () => {
      if (!myInfo) return;
      queryClient.setQueryData(queryKey, { ...myInfo, location });
    },
    onError: () => {
      if (!myInfo) return;
      queryClient.setQueryData(queryKey, { ...myInfo });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
}

// After deletion, we need to refetch the location data
export function useDeleteLocation() {
  const queryClient = useQueryClient();
  const myInfo = queryClient.getQueryData(queryOption.queryKey);
  const { queryKey } = queryOption;

  useMutation({
    mutationFn: locationApi.deleteCustomLocation,
    onMutate: () => {
      if (!myInfo) return;
      queryClient.setQueryData(queryKey, { ...myInfo, location: undefined });
    },
    onError: () => {
      if (!myInfo) return;
      queryClient.setQueryData(queryKey, { ...myInfo });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
}
