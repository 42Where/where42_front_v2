import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function LogoutBtn() {
  const router = useRouter();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="flex size-10 items-center justify-center rounded-lg hover:bg-gray-200 lg:size-14"
            type="button"
            onClick={() => {
              Cookies.remove('accessToken');
              Cookies.remove('refreshToken');
              router.push('/login');
            }}
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
