import { useQuery } from '@tanstack/react-query';
import { statApi } from '@/api/statApi';

export function usePopularSeats() {
  const res = useQuery({
    queryKey: ['popularSeats'],
    queryFn: () => statApi.getPopularSeats({}),
    staleTime: Infinity,
  });

  return res;
}
