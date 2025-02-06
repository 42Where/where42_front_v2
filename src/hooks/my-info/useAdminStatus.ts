import { useQuery } from '@tanstack/react-query';
import adminApi from '@/api/adminApi';

// Never stale, revalidated when mutated.
// For now, we don't change admin status on frontend, so.
export function useAdminStatus() {
  return useQuery({
    queryKey: ['adminStatus'],
    queryFn: adminApi.getMyStatus,
    staleTime: Infinity,
  });
}
