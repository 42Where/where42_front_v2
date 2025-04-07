import { useQuery } from '@tanstack/react-query';
import { statApi } from '@/api/statApi';

export function useMyFavoriteSeats() {
  const res = useQuery({
    queryKey: ['myFavoriteSeats'],
    queryFn: () => statApi.getMyFavoriteSeats({}),
    staleTime: Infinity,
  });

  return res;
}
