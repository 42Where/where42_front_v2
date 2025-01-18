import { useQuery } from '@tanstack/react-query';
import groupApi from '@/api/groupApi';
import useMyInfo from '@/hooks/useMyInfo';
import { useAddedMembersStore } from '@/lib/stores';
import Group from '@/types/Group';

// fresh for 5 min, and auto updated
export default function useGroupList() {
  const { setAddedMembers } = useAddedMembersStore();
  const myInfoRes = useMyInfo();
  const queryRes = useQuery({
    queryKey: ['groupList'],
    queryFn: groupApi.getAllGroups,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: true,
    enabled: !!myInfoRes.data,
    select: (groupRes): Group[] => {
      if (!myInfoRes.data) return groupRes;
      const { defaultGroupId, intraId } = myInfoRes.data;
      const updatedGroups = groupRes.map((group) =>
        group.groupId === defaultGroupId ? { ...group, groupName: '친구 목록' } : group,
      );
      const sortedGroups = updatedGroups.sort((a, b) => a.groupId - b.groupId);
      const defaultGroup = sortedGroups.find((group) => group.groupId === defaultGroupId);
      if (defaultGroup) {
        sortedGroups.splice(sortedGroups.indexOf(defaultGroup), 1);
        sortedGroups.push(defaultGroup);
      }
      // 모든 멤버 ID 수집
      const allMemberIds = groupRes.flatMap((group) =>
        group.members.map((member) => member.intraId),
      );
      allMemberIds.push(intraId);
      setAddedMembers(allMemberIds);
      return sortedGroups;
    },
  });
  return queryRes;
}
