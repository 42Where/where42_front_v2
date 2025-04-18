import { queryOptions, useQuery } from '@tanstack/react-query';
import { authApi } from '@/api/authApi';
import Cookies from 'js-cookie';

export const userOption = queryOptions({
  queryKey: ['userInfo'],
  queryFn: authApi.getMyInfo,
  staleTime: Infinity,
  select: (u) => {
    Cookies.set('intraId', String(u.intraId), { domain: '.where42.kr' });
    return u;
  },
});

export function useMyInfo() {
  return useQuery(userOption);
}
