import { queryOptions, useQuery } from '@tanstack/react-query';
import groupApi from '@/api/groupApi';
import { useMyInfo } from '@/hooks/my-info/useMyInfo';
import Group from '@/types/Group';

export const groupOption = queryOptions({
  queryKey: ['groupList'],
  queryFn: groupApi.getAllGroups,
});

// fresh for 5 min, and auto updated
export function useGroupList() {
  const myInfoRes = useMyInfo();

  const res = useQuery({
    ...groupOption,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: true,
    enabled: !!myInfoRes.data,
    select: (groupRes): Group[] => {
      // TODO: 이 select 부분 group 상태 단순 참조할 때도 계속 불린다. useMemo로 최적화할 것
      // get sorted groups
      if (!myInfoRes.data) return groupRes;
      // console.log('groupList select');
      const { defaultGroupId } = myInfoRes.data;
      const updatedGroups = groupRes.map((group) =>
        group.groupId === defaultGroupId ? { ...group, groupName: '친구 목록' } : group,
      );
      const sortedGroups = updatedGroups.sort((a, b) => a.groupId - b.groupId);
      const defaultGroup = sortedGroups.find((group) => group.groupId === defaultGroupId);
      if (defaultGroup) {
        sortedGroups.splice(sortedGroups.indexOf(defaultGroup), 1);
        sortedGroups.push(defaultGroup);
      }
      // allMemberIds.push(intraId);
      return sortedGroups;
    },
  });

  return res;
}

// stores.ts:13 Warning: Cannot update a component (`NewGroupModal`) while rendering a different component (`Home`). To locate the bad setState() call inside `Home`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
// setAddedMembers	@	stores.ts:13
// select	@	useGroupList.ts:40
// useGroupList	@	useGroupList.ts:16
// Home	@	index.tsx:20
// setStatus	@	webpack.js:477
// (anonymous)	@	webpack.js:647
// Promise.then
// internalApply	@	webpack.js:630
// hotApply	@	webpack.js:578
