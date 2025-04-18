import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupOption } from '@/hooks/group/useGroupList';
import { groupApi } from '@/api/groupApi';
import { User, Group } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { getSortedGroups } from '@/lib/utils';

type AddParamType = {
  addMembers: User[];
  groupId: number;
};

type DeleteParamType = {
  deleteMembers: User[];
  groupId: number;
  isDefaultGroup?: boolean;
};

export function useAddGroupMember() {
  const queryClient = useQueryClient();
  const { queryKey } = groupOption;
  const { toast } = useToast();

  const res = useMutation({
    mutationFn: ({ addMembers, groupId }: AddParamType) =>
      groupApi.addMemberAtGroup({
        groupId,
        members: addMembers.flatMap((u) => u.intraId),
      }),
    onMutate: async ({ addMembers, groupId }: AddParamType) => {
      const prevData = queryClient.getQueryData(queryKey);
      return { prevData, addMembers, groupId };
    },
    onSuccess: (data, _, context) => {
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return undefined;
        const sortedGroups = getSortedGroups(oldData);
        const updatedGroups = sortedGroups.map((group) => {
          if (group.groupId !== context.groupId) return group;
          // 대상 그룹의 멤버 배열도 새로운 배열로 업데이트 (불변성 유지)
          return {
            ...group,
            members: [
              ...group.members,
              ...context.addMembers.filter(
                (u) => !group.members.some((m) => m.intraId === u.intraId),
              ),
            ],
          };
        });
        const updatedDefaultGroup = updatedGroups[updatedGroups.length - 1];
        const updatedNormalGroup = updatedGroups.slice(0, -1);
        return {
          defaultGroup: updatedDefaultGroup,
          groups: updatedNormalGroup,
        };
      });
      toast({
        title: `'${context.addMembers.length > 1 ? '성공적으로' : `'${context.addMembers[0].intraName}'님이 친구 목록에`} 추가되었습니다.`,
      });
    },
    onError: (error, _, context) => {
      if (context?.prevData) queryClient.setQueryData(queryKey, context.prevData);
    },
  });

  return res;
}

export function useDeleteGroupMember() {
  const queryClient = useQueryClient();
  const { queryKey } = groupOption;
  const { toast } = useToast();

  const res = useMutation({
    mutationFn: ({ deleteMembers, groupId }: DeleteParamType) =>
      groupApi.removeMembersFromGroup({
        groupId,
        members: deleteMembers.flatMap((u) => u.intraId),
      }),
    onMutate: async ({ deleteMembers, groupId, isDefaultGroup }: DeleteParamType) => {
      const prevData = queryClient.getQueryData(queryKey);
      return { prevData, deleteMembers, groupId, isDefaultGroup };
    },
    onSuccess: (data, _, context) => {
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return undefined;
        const sortedGroups = getSortedGroups(oldData);
        const updatedGroups = sortedGroups.map((group) => {
          // 기본 그룹에서 삭제할 경우 모든 그룹에서 삭제
          if (group.groupId !== context.groupId && !context.isDefaultGroup) return group;
          return {
            ...group,
            members: group.members.filter(
              (m) => !context.deleteMembers.some((u) => u.intraId === m.intraId),
            ),
          };
        });
        const updatedDefaultGroup = updatedGroups[updatedGroups.length - 1];
        const updatedNormalGroup = updatedGroups.slice(0, -1);
        return {
          defaultGroup: updatedDefaultGroup,
          groups: updatedNormalGroup,
        };
      });
      toast({
        title: `'${context.deleteMembers.length > 1 ? '성공적으로' : `'${context.deleteMembers[0].intraName}'님이 친구 목록에서`} 삭제되었습니다.`,
      });
    },
    onError: (error, _, context) => {
      if (context?.prevData) queryClient.setQueryData(queryKey, context.prevData);
    },
  });

  return res;
}

type CreateRenameParamType = {
  groupId: number;
  groupName: string;
};

// We don't do optimistic update here because we need to get the new group id from the server.
export function useCreateGroup() {
  const queryClient = useQueryClient();
  const { queryKey } = groupOption;

  return useMutation({
    mutationFn: async (groupName: string) => {
      const { groupId, groupName: newGroupName } = await groupApi.createGroup({ groupName });
      return { groupId, groupName: newGroupName };
    },
    onSuccess: ({ groupId, groupName }: CreateRenameParamType) => {
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return undefined;
        return {
          defaultGroup: oldData.defaultGroup,
          groups: [
            ...oldData.groups,
            { groupId, groupName, members: [], isInEdit: false, isFolded: false },
          ],
        };
      });
    },
  });
}

export function useRenameGroup() {
  const queryClient = useQueryClient();
  const { queryKey } = groupOption;

  return useMutation({
    mutationFn: ({ groupId, groupName }: CreateRenameParamType) =>
      groupApi.renameGroup({ groupId, groupName }),
    onMutate: async ({ groupId, groupName }: CreateRenameParamType) => {
      const prevData = queryClient.getQueryData(queryKey);
      return { prevData, groupId, groupName };
    },
    onSuccess: (data, _, context) => {
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return undefined;
        const updatedGroups = oldData.groups.map((group) => {
          if (group.groupId !== context.groupId) return group;
          return { ...group, groupName: context.groupName };
        });
        return {
          defaultGroup: oldData.defaultGroup,
          groups: updatedGroups,
        };
      });
    },
    onError: (error, _, context) => {
      if (context?.prevData) queryClient.setQueryData(queryKey, context.prevData);
    },
  });
}

export function useDeleteGroup() {
  const queryClient = useQueryClient();
  const { queryKey } = groupOption;
  const { toast } = useToast();

  return useMutation({
    mutationFn: (group: Group) => groupApi.removeGroup({ groupId: group.groupId }),
    onMutate: async (group: Group) => {
      const prevData = queryClient.getQueryData(queryKey);
      return { prevData, group };
    },
    onSuccess: (data, _, context) => {
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return undefined;
        return {
          defaultGroup: oldData.defaultGroup,
          groups: oldData.groups.filter((group) => group.groupId !== context.group.groupId),
        };
      });
      toast({
        title: `'${context.group.groupName}' 그룹이 삭제되었습니다.`,
      });
    },
    onError: (error, _, context) => {
      if (context?.prevData) queryClient.setQueryData(queryKey, context.prevData);
    },
  });
}
