import { queryOptions, useQuery } from '@tanstack/react-query';
import { groupApi } from '@/api/groupApi';
import { Group } from '@/types';
import { getSortedGroups } from '@/lib/utils';

export const groupOption = queryOptions({
  queryKey: ['groupList'],
  queryFn: groupApi.getAllGroups,
});

// fresh for 5 min, and auto updated
export function useGroupList() {
  const res = useQuery({
    ...groupOption,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: true,
    select: (groupRes): Group[] => {
      // TODO: 이 select 부분 group 상태 단순 참조할 때도 계속 불린다. useMemo로 최적화할 것
      const sortedGroups = getSortedGroups(groupRes);
      return sortedGroups;
    },
  });

  return res;
}
