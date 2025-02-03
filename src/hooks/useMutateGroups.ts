import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryOption } from '@/hooks/useGroupList';
import groupApi from '@/api/groupApi';
import { useAddedMembersStore } from '@/lib/stores';
import { User } from '@/types/User';
import { useToast } from '@/components/ui/use-toast';
import Group from '@/types/Group';
import { useEffect } from 'react';

interface AddDeleteParamType {
  members: User[];
  groupId: number;
}

export function useAddGroupMember() {
  const queryClient = useQueryClient();
  const { queryKey } = queryOption;
  const { addedMembers, setAddedMembers } = useAddedMembersStore();
  let allIdMembers: number[] = [];
  const { toast } = useToast();

  const res = useMutation({
    mutationFn: ({ members, groupId }: AddDeleteParamType) =>
      groupApi.addMemberAtGroup({
        groupId,
        members: members.flatMap((u) => u.intraId),
      }),
    onMutate: async ({ members, groupId }: AddDeleteParamType) => {
      await queryClient.cancelQueries({ queryKey });
      const prevData = queryClient.getQueryData(queryKey);
      const intraIds = members.flatMap((u) => u.intraId);
      allIdMembers = [...addedMembers, ...intraIds];
      const targGroup = prevData?.find((g) => g.groupId === groupId);
      if (!targGroup) return { prevData, members };
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
      return { prevData, members };
    },
    onSuccess: (data, _, context) => {
      toast({
        title: `'${context.members.length > 1 ? '성공적으로' : `'${context.members[0]}'님이 친구 목록에`} 추가되었습니다.`,
      });
    },
    onError: (error, _, context) => {
      if (context?.prevData) queryClient.setQueryData(queryKey, context.prevData);
    },
  });

  useEffect(() => {
    if (res.isSuccess) setAddedMembers(allIdMembers || []);
  }, [res.isSuccess]);

  return res;
}

export function useDeleteGroupMember() {
  const queryClient = useQueryClient();
  const { queryKey } = queryOption;
  const { addedMembers, setAddedMembers } = useAddedMembersStore();
  let allIdMembers: number[] = [];
  const { toast } = useToast();

  const res = useMutation({
    mutationFn: ({ members, groupId }: AddDeleteParamType) =>
      groupApi.removeMembersFromGroup({
        groupId,
        members: members.flatMap((u) => u.intraId),
      }),
    onMutate: async ({ members, groupId }: AddDeleteParamType) => {
      // await queryClient.cancelQueries({ queryKey });
      const prevData = queryClient.getQueryData(queryKey);
      const intraIds = members.flatMap((u) => u.intraId);
      allIdMembers = addedMembers.filter((id) => !intraIds.includes(id));
      const targGroup = prevData?.find((g) => g.groupId === groupId);
      console.log(prevData, intraIds, targGroup);
      if (!targGroup) return { prevData, members };
      targGroup.members = targGroup.members.filter((u) => !intraIds.includes(u.intraId));
      // queryClient.setQueryData(queryKey, (oldData) => {
      //   if (!oldData) return undefined;
      //   return {
      //     ...oldData,
      //     targGroup,
      //   };
      // });
      return { prevData, members };
    },
    onSuccess: (data, _, context) => {
      console.log(context);
      toast({
        title: `'${context.members.length > 1 ? '성공적으로' : `'${context.members[0].intraName}'님이 친구 목록에서`} 삭제되었습니다.`,
      });
    },
    onError: (error, _, context) => {
      if (context?.prevData) queryClient.setQueryData(queryKey, context.prevData);
    },
  });

  useEffect(() => {
    if (res.isSuccess) setAddedMembers(allIdMembers || []);
  }, [res.isSuccess]);

  return res;
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
    mutationFn: async (groupName: string) => {
      const { groupId, groupName: newGroupName } = await groupApi.createGroup({ groupName });
      return { groupId, groupName: newGroupName };
    },
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
  const { toast } = useToast();

  return useMutation({
    mutationFn: (group: Group) => groupApi.removeGroup({ groupId: group.groupId }),
    onMutate: async (group: Group) => {
      await queryClient.cancelQueries({ queryKey });
      const prevData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return undefined;
        return oldData.filter((g) => g.groupId !== group.groupId);
      });
      return { prevData, group };
    },
    onSuccess: (data, _, context) => {
      toast({
        title: `'${context.group.groupName}' 그룹이 삭제되었습니다.`,
      });
    },
    onError: (error, _, context) => {
      if (context?.prevData) queryClient.setQueryData(queryKey, context.prevData);
    },
  });
}
