import { useQuery } from '@tanstack/react-query';
import statApi from '@/api/statApi';

// fresh for 30 sec, and auto updated
export function useClusterUsage() {
  const res = useQuery({
    queryKey: ['clusterUsage'],
    queryFn: statApi.getClusterUsage,
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
    refetchIntervalInBackground: true,
  });

  return res;
}
