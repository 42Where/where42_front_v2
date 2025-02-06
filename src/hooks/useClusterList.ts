// import { queryOptions, useQuery } from '@tanstack/react-query';
// import clusterApi from '@/api/clusterApi';
// import { ClusterName, ActiveClusterUser } from '@/types/Cluster';

// // cluster varies by clusterName
// export function clusterOptions(cluster: ClusterName) {
//   return queryOptions({
//     queryKey: ['clusterUsers', cluster],
//     queryFn: () => clusterApi.getClusterUsers({ cluster }),
//     staleTime: 5 * 60 * 1000,
//     refetchInterval: 5 * 60 * 1000,
//     refetchIntervalInBackground: true,
//   });
// }

// // fresh for 5 min, and auto updated
// export default function useGroupList() {
//   const res = useQuery({
//     ...clusterOptions('c1'),

//     select: (groupRes): Group[] => {
//       // TODO: 이 select 부분 group 상태 단순 참조할 때도 계속 불린다. useMemo로 최적화할 것
//       // get sorted groups
//       if (!myInfoRes.data) return groupRes;
//       // console.log('groupList select');
//       const { defaultGroupId } = myInfoRes.data;
//       const updatedGroups = groupRes.map((group) =>
//         group.groupId === defaultGroupId ? { ...group, groupName: '친구 목록' } : group,
//       );
//       const sortedGroups = updatedGroups.sort((a, b) => a.groupId - b.groupId);
//       const defaultGroup = sortedGroups.find((group) => group.groupId === defaultGroupId);
//       if (defaultGroup) {
//         sortedGroups.splice(sortedGroups.indexOf(defaultGroup), 1);
//         sortedGroups.push(defaultGroup);
//       }
//       // allMemberIds.push(intraId);
//       return sortedGroups;
//     },
//   });

//   return res;
// }
