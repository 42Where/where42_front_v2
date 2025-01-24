import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryOption } from '@/hooks/useGroupList';
import groupApi from '@/api/groupApi';
import { useAddedMembersStore } from '@/lib/stores';

// no onSuccess handler.

export function useAddGroupMember(members: number[], groupId: number) {
  const queryClient = useQueryClient();
  const groups = queryClient.getQueryData(queryOption.queryKey);
  const { queryKey } = queryOption;
  const { addedMembers, setAddedMembers } = useAddedMembersStore();

  return useMutation({
    mutationFn: () =>
      groupApi.addMemberAtGroup({
        groupId,
        members,
      }),
    onMutate: () => {
      if (!groups) return;
      queryClient.setQueryData(queryKey, { ...groups, {

      }, });
    },
    onError: () => {
      if (!groups) return;
      queryClient.setQueryData(queryKey, { ...groups });
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
