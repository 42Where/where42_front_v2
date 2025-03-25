import { useQuery } from '@tanstack/react-query';
import { statApi } from '@/api/statApi';

// fresh for 30 sec, and auto updated
export function useImacUsage() {
  const res = useQuery({
    queryKey: ['imacUsage'],
    queryFn: statApi.getImacUsage,
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
    refetchIntervalInBackground: true,
  });

  return res;
}
