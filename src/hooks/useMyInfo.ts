import { useQuery } from '@tanstack/react-query';
import authApi from '@/api/authApi';
import Cookies from 'js-cookie';

// never stale, revalidated when mutated
export default function useMyInfo() {
  // Very idea of react useQuery is effectively a global state store.
  // This itself is global state. User store !!

  return useQuery({
    queryKey: ['userInfo'],
    queryFn: authApi.getMyInfo,
    staleTime: Infinity,
    select: (u) => {
      Cookies.set('intraId', String(u.intraId), { domain: '.where42.kr' });
      return u;
    },
  });
}
