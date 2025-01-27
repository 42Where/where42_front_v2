import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryOption } from '@/hooks/useGroupList';
import groupApi from '@/api/groupApi';
import { useAddedMembersStore } from '@/lib/stores';
import { User } from '@/types/User';

interface AddDeleteParamType {
  members: User[];
  groupId: number;
}

export function useAddGroupMember() {
  const queryClient = useQueryClient();
  const { queryKey } = queryOption;
  const { addedMembers, setAddedMembers } = useAddedMembersStore();

  return useMutation({
    mutationFn: ({ members, groupId }: AddDeleteParamType) =>
      groupApi.addMemberAtGroup({
        groupId,
        members: members.flatMap((u) => u.intraId),
      }),
    onMutate: async ({ members, groupId }: AddDeleteParamType) => {
      await queryClient.cancelQueries({ queryKey });
      const prevData = queryClient.getQueryData(queryKey);
      const intraIds = members.flatMap((u) => u.intraId);
      setAddedMembers([...addedMembers, ...intraIds]);
      const targGroup = prevData?.find((g) => g.groupId === groupId);
      if (!targGroup) return { prevData };
      targGroup.members.forEach((u) => {
        if (!intraIds.includes(u.intraId)) targGroup.members.push(u);
      });
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return undefined;
        return {
          ...oldData,
          targGroup,
        };
      });
      return { prevData };
    },
    onError: (error, _, context) => {
      if (context?.prevData) queryClient.setQueryData(queryKey, context.prevData);
    },
  });
}

export function useDeleteGroupMember() {
  const queryClient = useQueryClient();
  const { queryKey } = queryOption;
  const { addedMembers, setAddedMembers } = useAddedMembersStore();

  return useMutation({
    mutationFn: ({ members, groupId }: AddDeleteParamType) =>
      groupApi.removeMembersFromGroup({
        groupId,
        members: members.flatMap((u) => u.intraId),
      }),
    onMutate: async ({ members, groupId }: AddDeleteParamType) => {
      await queryClient.cancelQueries({ queryKey });
      const prevData = queryClient.getQueryData(queryKey);
      const intraIds = members.flatMap((u) => u.intraId);
      setAddedMembers(addedMembers.filter((id) => !intraIds.includes(id)));
      const targGroup = prevData?.find((g) => g.groupId === groupId);
      if (!targGroup) return { prevData };
      targGroup.members = targGroup.members.filter((u) => !intraIds.includes(u.intraId));
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return undefined;
        return {
          ...oldData,
          targGroup,
        };
      });
      return { prevData };
    },
    onError: (error, _, context) => {
      if (context?.prevData) queryClient.setQueryData(queryKey, context.prevData);
    },
  });
}

interface CreateRenameParamType {
  groupId: number;
  groupName: string;
}

// We don't do optimistic update here because we need to get the new group id from the server.
export function useCreateGroup() {
  const queryClient = useQueryClient();
  const { queryKey } = queryOption;

  return useMutation({
    mutationFn: (groupName: string) => groupApi.createGroup({ groupName }),
    onSuccess: ({ groupId, groupName }: CreateRenameParamType) => {
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return undefined;
        return [...oldData, { groupId, groupName, members: [], isInEdit: false, isFolded: false }];
      });
    },
  });
}

export function useRenameGroup() {
  const queryClient = useQueryClient();
  const { queryKey } = queryOption;

  return useMutation({
    mutationFn: ({ groupId, groupName }: CreateRenameParamType) =>
      groupApi.renameGroup({ groupId, groupName }),
    onMutate: async ({ groupId, groupName }: CreateRenameParamType) => {
      await queryClient.cancelQueries({ queryKey });
      const prevData = queryClient.getQueryData(queryKey);
      const targGroup = prevData?.find((g) => g.groupId === groupId);
      if (!targGroup) return { prevData };
      targGroup.groupName = groupName;
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return undefined;
        return {
          ...oldData,
          targGroup,
        };
      });
      return { prevData };
    },
    onError: (error, _, context) => {
      if (context?.prevData) queryClient.setQueryData(queryKey, context.prevData);
    },
  });
}

export function useDeleteGroup() {
  const queryClient = useQueryClient();
  const { queryKey } = queryOption;

  return useMutation({
    mutationFn: (groupId: number) => groupApi.removeGroup({ groupId }),
    onMutate: async (groupId: number) => {
      await queryClient.cancelQueries({ queryKey });
      const prevData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return undefined;
        return oldData.filter((g) => g.groupId !== groupId);
      });
      return { prevData };
    },
    onError: (error, _, context) => {
      if (context?.prevData) queryClient.setQueryData(queryKey, context.prevData);
    },
  });
}
