import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import authApi from '@/api/authApi';

export default function LogoutBtn() {
  const router = useRouter();

  function logoutHandler() {
    authApi
      .logout()
      .then((r) => {
        console.log(r, 'Logged out successfully!');
        return r;
      })
      .then(() => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        router.push('/login');
      })
      .catch((err) => {
        console.error('Failed to log out:', err);
      });
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="flex size-10 items-center justify-center rounded-lg hover:bg-gray-200 lg:size-14"
            type="button"
            onClick={logoutHandler}
          >
            <Image
              src="/image/signOut.svg"
              alt="search"
              width={40}
              height={40}
              className="size-[30px] rounded-lg hover:bg-gray-200 lg:size-[40px]"
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>로그아웃</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
